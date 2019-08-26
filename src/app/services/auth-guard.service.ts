import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route , state: RouterStateSnapshot ) {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {

      this.router.navigate(['/pages/login'], {queryParams : {returnUrl: state.url}});
      return false;

    }
  }
}
