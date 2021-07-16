import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../models/page";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders = [];
  page = new Page();
  error = '';

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.page.size = 5;
    this.setPage({offset: 0});
  }

  setPage(event){
    this.page.page = event.pageIndex;
    this._orderService.getAll(this.page).subscribe(response => {
      this.page.size = response.size;
      this.page.page = response.page;
      this.page.totalElements = response.totalElements;
      this.orders = response.content;
    })
  }

}
