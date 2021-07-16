import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {BookListComponent} from "./components/home/book-list/book-list.component";
import {BookDetailsComponent} from "./components/book/book-details/book-details.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CategoryComponent} from "./components/category/category.component";
import {CartStatusComponent} from "./components/cart-status/cart-status.component";
import {UserRoutingModule} from "./user-routing.module";
import {BookService} from "../../services/book.service";
import {CategoryService} from "../../services/category.service";
import {ApiService} from "../../services/api.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {BookComponent} from './components/book/book.component';
import {AuthenticationService} from "../../security/authentication.service";
import {AuthGuard} from "../../security/auth.guard";
import {JwtInterceptor} from "../../security/jwt.interceptor";
import {ErrorInterceptor} from "../../security/authtentication.interceptor";
import {FooterComponent} from './components/footer/footer.component';
import {ProfileComponent} from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountComponent } from './components/profile/account/account.component';
import { OrdersComponent } from './components/profile/orders/orders.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import { OrderDetailComponent } from './components/profile/order-detail/order-detail.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    UserComponent,
    BookListComponent,
    CategoryComponent,
    BookDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    NavbarComponent,
    HomeComponent,
    BookComponent,
    FooterComponent,
    ProfileComponent,
    CheckoutComponent,
    AccountComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    UserComponent
  ],
  providers: [
    BookService,
    CategoryService,
    ApiService,
    AuthenticationService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class UserModule { }
