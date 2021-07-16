import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../security/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this._authenticationService.logout();
    location.reload(true);
  }
}
