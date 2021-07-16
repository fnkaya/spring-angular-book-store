import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CATEGORY_PATH = "/category";



  constructor(private httpClient: HttpClient,
              private _apiService: ApiService) { }




  getAll(): Observable<any>{
    return this._apiService.get(this.CATEGORY_PATH, null).pipe(
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

  getById(id): Observable<any>{
    return this._apiService.get(this.CATEGORY_PATH +'/'+ id, null).pipe(
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

  create(category): Observable<any>{
    return this._apiService.post(this.CATEGORY_PATH, category).pipe(
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

  delete(id): Observable<any>{
    return this._apiService.delete(this.CATEGORY_PATH, id).pipe(
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
