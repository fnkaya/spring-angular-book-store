import {Component, OnInit, TemplateRef} from '@angular/core';
import {Book} from "../../../../models/book";
import {UserService} from "../../../../services/user.service";
import {Page} from "../../../../models/page";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../../../security/authentication.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  books: Book[] = [];
  page = new Page();

  modalRef: BsModalRef;
  userForm: FormGroup;
  error = '';

  constructor(private _userService: UserService,
              private _authenticationService: AuthenticationService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _modalService: BsModalService,
              private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
    this._activatedRoute.paramMap.subscribe(()=>{
      this.setPage({offset: 0});
    })
  }

  setPage(pageInfo){
    this.page.page = pageInfo.offset;
    if (this._activatedRoute.snapshot.paramMap.has('keyword')) {
      const keyword = this._activatedRoute.snapshot.paramMap.get('keyword');
      this._userService.getByName(keyword, this.page).subscribe(response => {
        this.page.size = response.size;
        this.page.page = response.page;
        this.page.totalElements = response.totalElements;
        this.books = response.content;
      })
    }
    else{
      this._userService.getAll(this.page).subscribe( data => {
        this.page.size = data.size;
        this.page.page = data.page;
        this.page.totalElements = data.totalElements;
        this.books = data.content;
      })
    }
  }

  searchUser(keyword: string) {
    if (keyword != null && keyword.trim() != "")
      this._router.navigateByUrl('/admin/user/search/' + keyword);
  }

  initForm(){
    this.userForm = this._formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'name': [null, Validators.required],
      'email': [null, Validators.required],
    });
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  closeModal(){
    this.userForm.reset();
    this.modalRef.hide();
  }

  get f() {return this.userForm.controls}

  createAccount() {
    if (this.userForm.invalid) {
      return;
    }

    this._authenticationService.registerAdmin(this.userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.setPage({offset: 0})
          this.closeModal();
        },
        error => {
          this.error = error;
        });
  }
}
