import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../../services/cart.service";
import {CartItem} from "../../../../models/cart-item";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  // cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this._cartService.calculateTotalPrice();
  }
}
