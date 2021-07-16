import {Component, OnInit} from '@angular/core';
import {Book} from "../../../../../models/book";
import {BookService} from "../../../../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../../../services/cart.service";
import {CartItem} from "../../../../../models/cart-item";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {


  books: Book[] = [];
  currentCategoryId: number = -1;
  previousCategoryId: number = 1;
  currentPage: number = 1;
  pageSize: number = 6;
  totalRecords: number = 0;
  totalPages: number = 0;

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute,
              private _cartService: CartService) {   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks(){
    if (this._activatedRoute.snapshot.paramMap.has('keyword')){
      this.handleSearchBooks();
    }
    else{
      this.handleListBooks();
    }
  }

  handleListBooks(){
    if(this._activatedRoute.snapshot.paramMap.has('id')){
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId = -1;
    }
    if(this.previousCategoryId != this.currentCategoryId){
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this._bookService.getBookList(this.currentCategoryId, this.currentPage - 1, this.pageSize).subscribe(
      this.processPaginate()
    )
  }

  handleSearchBooks(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword, this.currentPage - 1, this.pageSize).subscribe(
      this.processPaginate()
    );
  }

  processPaginate(){
    return data => {
        this.books = data.content;
        this.currentPage = data.page + 1;
        this.totalRecords = data.totalElements;
        this.totalPages = data.totalPages;
        this.pageSize = data.size;
    }
  }

  addToCart(book: Book){
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

}
