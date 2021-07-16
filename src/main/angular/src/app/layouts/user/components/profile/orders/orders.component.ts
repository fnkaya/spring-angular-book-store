import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../../../services/order.service";
import {UserService} from "../../../../../services/user.service";
import {Page} from "../../../../../models/page";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: [] = [];
  page = new Page();
  currentUser: {} = {};

  constructor(private _orderService: OrderService,
              private _userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.page.size = 5;
  }


  setPage(event){
    this.page.page = event.pageIndex;
    console.log(this.page)
    this._orderService.getByCustomerId(this.currentUser['id'], this.page).subscribe(response => {
      this.page.size = response.size;
      this.page.page = response.number;
      this.page.totalElements = response.totalElements;
      this.orders = response.content;

    })
  }

  getCurrentUser(){
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (token != null){
      this._userService.getByUsername(token['username']).subscribe(
        data => {
          this.currentUser = data;
          this.setPage({offset: 0});
        }
      );
    }
  }
}
