import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../../services/book.service";
import {Book} from "../../../../models/book";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  categories: Category[] = [];
  currentCategory: Category = null;
  bookId: number = null;
  book: Book = null;
  bookForm: FormGroup;

  constructor(private _bookService: BookService,
              private _categoryService: CategoryService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this._activatedRoute.params.subscribe(params => {
        this.bookId = +params['id'];
        this.getBookDetails();
      }
    )
  }

  private getCategories(){
    this._categoryService.getAll().subscribe(data => {
        this.categories = data;
      }
    );
  }

  private getBookDetails() {
    this._bookService.getBook(this.bookId).subscribe( response => {
        this.bookForm = this.initForm(response);
      }
    );
  }

  initForm(response){
    this.currentCategory = response.category.name;
    return this.bookForm = this._formBuilder.group({
      id: response['id'],
      name: response['name'],
      author: response['author'],
      description: response['description'],
      imageUrl: response['imageUrl'],
      unitPrice: response['unitPrice'],
      unitsInStock: response['unitsInStock'],
      category: {
        id: response['category']['id'],
        name: response['category']['name']
      }
    });
  }

  get f() {return this.bookForm.controls}

  saveBook() {
    this._bookService.update(this.bookForm.value).subscribe(() => {
      this._router.navigateByUrl('/admin');
      this.openSnackBar()
    });
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  private openSnackBar() {
    this._snackBar.open('Book successfully edited', 'DISMISS', {
      duration: 3000,
    });
  }
}

