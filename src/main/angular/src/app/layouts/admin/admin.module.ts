import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {RouterModule} from "@angular/router";
import {AdminRoutingModule} from "./admin-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookService} from "../../services/book.service";
import {CategoryService} from "../../services/category.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {BookComponent} from './components/book-category/book/book.component';
import {ApiService} from "../../services/api.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryComponent} from './components/book-category/category/category.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookCategoryComponent} from './components/book-category/book-category.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UserListComponent} from './components/user-list/user-list.component';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../security/authentication.service";
import {AuthGuard} from "../../security/auth.guard";
import {JwtInterceptor} from "../../security/jwt.interceptor";
import {ErrorInterceptor} from "../../security/authtentication.interceptor";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import { OrderListComponent } from './components/order-list/order-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    BookComponent,
    CategoryComponent,
    BookDetailsComponent,
    BookCategoryComponent,
    SidebarComponent,
    UserListComponent,
    OrderListComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        NgxDatatableModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        MatSidenavModule,
        FormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatTableModule,
        MatDividerModule,
        MatPaginatorModule
    ],
  exports: [RouterModule],
  providers: [
    BookService,
    CategoryService,
    UserService,
    ApiService,
    BsModalService,
    AuthenticationService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class AdminModule { }
