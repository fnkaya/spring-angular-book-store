import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../security/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Book Store';
  token = '';
  userInfos = {};

  constructor(private _authenticationService: AuthenticationService,
              private _userService: UserService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    if (this.token != null){
      this._userService.getByUsername(this.token['username']).subscribe(
        data => this.userInfos = data
      );
    }
  }

  logout() {
    localStorage.removeItem('cartItems');
    this._authenticationService.logout()
    this._router.navigateByUrl("/").then( () => location.reload())

  }

  searchBooks(keyword: string){
    if (keyword != null && keyword.trim() != "")
      this._router.navigateByUrl('/search/' + keyword);
  }
}
