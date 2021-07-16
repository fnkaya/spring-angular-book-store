import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BookService} from "../../../../../services/book.service";
import {Page} from "../../../../../models/page";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogComponent} from "../../../../../shared/confirm-dialog/confirm-dialog.component";
import {CategoryService} from "../../../../../services/category.service";
import {Category} from "../../../../../models/category";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  //Table
  rows = [];
  cols = [];
  page = new Page();
  @ViewChild('templateActionsCell', {static: true}) templateDeleteCell: TemplateRef<any>;
  @ViewChild('templatePrice', {static: true}) templateBalanceCell: TemplateRef<any>;

  //Form
  modalRef: BsModalRef;
  bookForm: FormGroup;
  categories: Category[] = [];
  imageFile = null;


  constructor(private _bookService: BookService,
              private _categoryService: CategoryService,
              private _modalService: BsModalService,
              private _formBuilder: FormBuilder,
              private _storage: AngularFireStorage,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {
    this.initColumns();
    this.initForm();
    this.getCategories();
    this._activatedRoute.paramMap.subscribe(()=>{
      this.setPage({offset: 0});
    })
  }


  //Table
  initColumns(){
    this.cols = [
      {prop: 'name', name: 'Book Name', width: 250},
      {prop: 'author', name: 'Author Name'},
      {prop: 'unitPrice', name: 'Price', cellTemplate: this.templateBalanceCell, flexGrow: 1},
      {prop: 'unitsInStock', name: 'Stock'},
      {prop: 'category.name', name: 'Category'},
      {prop: 'id', name: 'Actions', cellTemplate: this.templateDeleteCell, flexGrow: 1, sortable: false}
    ];
  }

  setPage(pageInfo){
    this.page.page = pageInfo.offset;
    if (this._activatedRoute.snapshot.paramMap.has('id')){
      const categoryId = this._activatedRoute.snapshot.paramMap.get('id');
      this._bookService.getAllByCategoryId(categoryId, this.page).subscribe( data => {
        this.page.size = data.size;
        this.page.page = data.page;
        this.page.totalElements = data.totalElements;
        this.rows = data.content;
      })
    }
    else if (this._activatedRoute.snapshot.paramMap.has('keyword')){
      const bookName = this._activatedRoute.snapshot.paramMap.get('keyword');
      this._bookService.getAllByName(bookName, this.page).subscribe(data => {
        this.page.size = data.size;
        this.page.page = data.page;
        this.page.totalElements = data.totalElements;
        this.rows = data.content;
      })
    }
    else{
      this._bookService.getAll(this.page).subscribe( data => {
        this.page.size = data.size;
        this.page.page = data.page;
        this.page.totalElements = data.totalElements;
        this.rows = data.content;
      })
    }
  }

  showDeleteConfirm(value) :void{
    const modal = this._modalService.show(ConfirmDialogComponent);
    (<ConfirmDialogComponent>modal.content).showConfirm(
      'Are you sure you want to delete this book?'
    );
    (<ConfirmDialogComponent>modal.content).onClose.subscribe(
      result => {
        if (result === true){
          this._bookService.delete(value).subscribe(
            response => {
              if (response === true)
              {
                this.setPage({offset: 0})
                this.openSnackBar("Book successfully deleted");
              }
            });
        }
      }
    );
  }

  //Form
  initForm(){
    this.bookForm = this._formBuilder.group({
      'name': [null, Validators.required],
      'author': [null, Validators.required],
      'description': [null, Validators.required],
      'unitPrice': [null, Validators.required],
      'unitsInStock': [null, Validators.required],
      'imageUrl': [null, Validators.required],
      'category': [null, Validators.required]
    });
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  closeModal(){
    this.bookForm.reset();
    this.modalRef.hide();
  }

  saveBook(){
    if (!this.bookForm.valid)
      return;
    let filePath = `books/${this.imageFile.name}_${new Date().getTime()}`;
    const fileRef = this._storage.ref(filePath);
    this._storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.bookForm.value['imageUrl'] = url;
          this._bookService.create(this.bookForm.value).subscribe(() => {
              this.setPage({offset: 0})
              this.closeModal();
              this.openSnackBar('Book successfully added');
            });
        })
      })
    ).subscribe();
  }

  get formControls() {return this.bookForm.controls}

  getCategories(){
    this._categoryService.getAll().subscribe(data => {
        this.categories = data;
      }
    );
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]){
      this.imageFile = event.target.files[0];
    }
    else{
      this.imageFile = null;
    }
  }

  searchBooks(keyword: string) {
    if (keyword != null && keyword.trim() != "")
      this._router.navigateByUrl('/admin/book/search/' + keyword);
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'DISMISS', {
      duration: 3000,
    });
  }
}
