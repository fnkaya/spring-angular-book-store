import {Injectable} from '@angular/core';
import {CartItem} from "../models/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() {
    if (JSON.parse(localStorage.getItem('cartItems'))){
      const array = JSON.parse(localStorage.getItem('cartItems'));
      array.forEach(data => this.cartItems.push(data) )
    }
  }

  addToCart(cartItem: CartItem){
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
      alreadyExistInCart = (existingCartItem != undefined)
    }
    if(alreadyExistInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(cartItem);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice(){
    this.uploadCartItems();
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let cartItem of this.cartItems){
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity == 0){
      this.removeCartItem(cartItem);
    }
    else{
      this.calculateTotalPrice();
    }
  }

  removeCartItem(cartItem: CartItem){
    const itemIndex = this.cartItems.findIndex((tempCartItem) => {
      return tempCartItem.id === cartItem.id;
    });
    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.calculateTotalPrice();
    }
  }

  private uploadCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
