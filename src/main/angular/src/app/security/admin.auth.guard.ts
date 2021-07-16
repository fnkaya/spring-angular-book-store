import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {UserService} from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {


  constructor(private router: Router,
              private authService: AuthenticationService,
              private _userService: UserService) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (token != null)
    {
      this._userService.getByUsername(token.username).subscribe(
        data => {
          if (!data.admin) {
            console.log(data.admin)
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
          }
          return true;
        });
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
