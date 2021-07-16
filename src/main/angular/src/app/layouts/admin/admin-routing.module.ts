import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {BookCategoryComponent} from "./components/book-category/book-category.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {AdminAuthGuard} from "../../security/admin.auth.guard";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'book'},
      {path: 'book', component: BookCategoryComponent},
      {path: 'book/category/:id', component: BookCategoryComponent},
      {path: 'book/search/:keyword', component: BookCategoryComponent},
      {path: 'book/:id', component: BookDetailsComponent},
      {path: 'user', component: UserListComponent},
      {path: 'user/search/:keyword', component: UserListComponent},
      {path: 'order', component: OrderListComponent}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
