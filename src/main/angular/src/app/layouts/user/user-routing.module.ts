import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";
import {HomeComponent} from "./components/home/home.component";
import {BookComponent} from "./components/book/book.component";
import {AuthGuard} from "../../security/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {AccountComponent} from "./components/profile/account/account.component";
import {OrdersComponent} from "./components/profile/orders/orders.component";
import {OrderDetailComponent} from "./components/profile/order-detail/order-detail.component";


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'category/:id', component: HomeComponent},
      {path: 'search/:keyword', component: HomeComponent},
      {path: 'book/:id', component: BookComponent},
      {path: 'cart', component: CartDetailsComponent, canActivate: [AuthGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
      children: [
        {path: '', pathMatch: 'full', redirectTo: 'order'},
        {path: 'account', component: AccountComponent},
        {path: 'order', component: OrdersComponent},
        {path: 'order/:id', component: OrderDetailComponent}
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
