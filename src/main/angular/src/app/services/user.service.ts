import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_PATH = "/user";


  constructor(private httpClient: HttpClient,
              private _apiService: ApiService) {

  }



  getAll(page): Observable<any>{
    return this._apiService.get(this.USER_PATH, page).pipe(map(response => {
          if (response) return response;
          else {
            console.log(response)
            return ;
          }
        }
      )
    );
  }

  getByName(name, page): Observable<any>{
    return this._apiService.get(this.USER_PATH +'/search?name='+ name, page).pipe(map(response => {
          if (response) return response;
          else {
            console.log(response)
            return ;
          }
        })
    );
  }

  getByUsername(username :HttpParams): Observable<any>{
    return this._apiService.get(this.USER_PATH +'/username?username=' + username, null).pipe(map(response => {
          if (response) {
            return response;
          }
          else {
            console.log(response)
            return;
          }
    }));
  }



  update(user): Observable<any>{
    return this._apiService.put("/user", user).pipe(map(
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
