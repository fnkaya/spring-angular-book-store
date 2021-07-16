import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book";
import {ApiService} from "./api.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/book";



  constructor(private httpClient: HttpClient,
              private _apiService: ApiService) { }



  getBookList(categoryId: number, page: number, size: number): Observable<ResponseBooks>{
    let searchUrl;
    if (categoryId == -1){
      searchUrl = `${this.baseUrl}?page=${page}&size=${size}`;
    }else{
      searchUrl = `${this.baseUrl}/category?id=${categoryId}&page=${page}&size=${size}`;
    }
    return this.httpClient.get<ResponseBooks>(searchUrl);
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<ResponseBooks>{
    const searchUrl = `${this.baseUrl}/search?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<ResponseBooks>(searchUrl);
  }

  getBook(bookId: number): Observable<Book>{
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }

  //ADMIN SAYFASINDA KULLANILACAK

  getAll(page): Observable<any>{
    return this._apiService.get("/book", page).pipe(map(
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

  getAllByCategoryId(categoryId, page): Observable<any>{
    return this._apiService.get("/book/category?id=" + categoryId, page).pipe(map(
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

  getAllByName(bookName, page): Observable<any>{
    return this._apiService.get("/book/search?name=" + bookName, page).pipe(map(
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
    return this._apiService.get("/book", id).pipe(map(
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

  create(book): Observable<any>{
    return this._apiService.post("/book", book).pipe(map(
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

  update(book): Observable<any>{
    return this._apiService.put("/book", book).pipe(map(
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
    return this._apiService.delete("/book/" + id, null).pipe(map(
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

interface ResponseBooks {
  content: {
    books: Book[]
  },
  page: number,
  size: number,
  totalPages: number,
  totalElements: number,
}
