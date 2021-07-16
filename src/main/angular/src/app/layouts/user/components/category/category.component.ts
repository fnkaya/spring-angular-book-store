import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {BookService} from "../../../../services/book.service";
import {CategoryService} from "../../../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];

  constructor(private _bookService: BookService,
              private _categoryService: CategoryService,
              private _router: Router) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this._categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

}
