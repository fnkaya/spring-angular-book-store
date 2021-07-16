import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../../../services/order.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order = {};

  constructor(private _orderService: OrderService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  private getOrderDetail() {
    this._activatedRoute.params.subscribe(params => {
        const orderId = +params['id'];
        this._orderService.getById(orderId).subscribe(resp => {
          this.order = resp;
          console.log(this.order)
        });
      }
    )
  }
}
