import {Component, OnInit, TemplateRef} from '@angular/core';
import {Category} from "../../../../../models/category";
import {CategoryService} from "../../../../../services/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BookService} from "../../../../../services/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  categoryForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private _categoryService: CategoryService,
              private _bookService: BookService,
              private _formBuilder: FormBuilder,
              private _modalService: BsModalService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
  }

  initForm(){
    this.categoryForm = this._formBuilder.group({
      'name': [null, Validators.required]
    });
  }

  get formControls() {return this.categoryForm.controls}

  openModal(template: TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  closeModal(){
    this.categoryForm.reset();
    this.modalRef.hide();
  }

  saveCategory(){
    if (!this.categoryForm.valid)
      return;
    this._categoryService.create(this.categoryForm.value).subscribe( () => {
      this._categoryService.getAll().subscribe(data => {
        this.categories = data;
        this.openSnackBar();
      })}
    );
    this.closeModal();
  }

  private getCategories() {
    this._categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  private openSnackBar() {
    this._snackBar.open('Category Added', 'DISMISS', {
      duration: 3000,
    });
  }
}
