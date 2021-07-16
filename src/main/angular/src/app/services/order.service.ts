import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ORDER_PATH = "/order";



  constructor(private httpClient: HttpClient,
              private _apiService: ApiService) { }




  getAll(page): Observable<any>{
    return this._apiService.get(this.ORDER_PATH, page).pipe(
      map(
        response => {
          if (response) return response;
          else {
            console.log(response)
            return ;
          }
        }
      )
    );
  }

  getByCustomerId(cutomerId, page): Observable<any>{
    return this._apiService.get(this.ORDER_PATH +'/customer/' + cutomerId, page).pipe(map(response => {
      if (response) {
        return response;
      }
      else {
        console.log(response)
        return;
      }
    }));
  }

  getById(orderId): Observable<any>{
    console.log(orderId)
    return this._apiService.get(this.ORDER_PATH +'/' + orderId, null).pipe(map(response => {
      if (response) {
        return response;
      }
      else {
        console.log(response)
        return;
      }
    }));
  }

  save(order): Observable<any>{
    return this._apiService.post(this.ORDER_PATH, order).pipe(
      map(
        response => {
          if (response) return response;
          else {
            console.log(response)
            return ;
          }
        }
      )
    );
  }

}
