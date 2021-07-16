import { Component, OnInit } from '@angular/core';
import {Book} from "../../../../../models/book";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../../../services/book.service";
import {CartItem} from "../../../../../models/cart-item";
import {CartService} from "../../../../../services/cart.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  add_to_cart = "Add to Cart";
  back = "Back";
  book: Book = new Book();

  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,
              private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookDetails();
      }
    )
  }

  getBookDetails(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookService.getBook(id).subscribe(
      data => {
        this.book = data;
      }
    )
  }

  addToCart(){
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
  }
}
