import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CartItem} from "../../../../models/cart-item";
import {CartService} from "../../../../services/cart.service";
import {UserService} from "../../../../services/user.service";
import {OrderService} from "../../../../services/order.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  cc: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  shippingPrice: number = 10;

  expirationMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
  expirationYear = [2020,2021,2022,2023,2024,2025];


  constructor(private _formBuilder: FormBuilder,
              private _cartService: CartService,
              private _userService: UserService,
              private _orderService: OrderService,
              private _router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartDetails();
    this.customerDetails();

    this.cc = this._formBuilder.group({
      nameOnCC: [null],
      ccNumber: [null],
      cvv: [null],
      expMonth: [null],
      expYear: [null]
    })
  }

  onSubmit() {
    console.log('purchase');
    console.log(this.checkoutForm.value);
    this._orderService.save(this.checkoutForm.value).subscribe(
      response => {
        localStorage.removeItem('cartItems');
        this._router.navigateByUrl("/").then( () => {
          location.reload()
          this.openSnackBar();
        });
      }
    );
  }

  cartDetails(){
    this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(
      data => {
        if (data >= 50)
          this.totalPrice = data
        else
          this.totalPrice = data + this.shippingPrice
      }
    )
    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    this._cartService.calculateTotalPrice();
  }

  private customerDetails() {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (token != null){
      this._userService.getByUsername(token['username']).subscribe(
        data => {
          this.checkoutForm = this.initForm(data);
        }
      );
    }
  }

  private initForm(data) {
    return this._formBuilder.group({
      customerId: data['id'],
      cartItems: [this.cartItems],
      totalQuantity: [this.totalQuantity],
      totalPrice: [this.totalPrice, ],
      name: data['name'],
      phoneNumber: data['phoneNumber'],
      address: data['address'],
      city: data['city'],
      state: data['state'],
      zipcode: data['zipcode']
    })
  }

  private openSnackBar() {
    this._snackBar.open('Payment Completed', 'DISMISS', {
      duration: 3000,
    });
  }
}
