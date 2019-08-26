import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  // loginUrl = environment.url2;
  loginUrl = environment.url3;
  constructor(private http: HttpClient, private router: Router) {
  }

  login (credentials) {
     console.log(credentials);
     console.log(this.loginUrl);
    return this.http.post(this.loginUrl, credentials)
    .map (response => {

        // if (response['success'] && response['token']) {
        //     localStorage.setItem('token', response['token'] );
        //     localStorage.setItem('user', credentials.username);
        //     return true;
        // } else {
        //     return false;
        // }
        if (response['status'] === 1) {
          sessionStorage.setItem('user', response['message'].usertype);
          sessionStorage.setItem('userID', response['message'].id);
          // sessionStorage.setItem('TIN', response['message'].TIN);
          // sessionStorage.setItem('service', response['message'].service);
          // sessionStorage.setItem('staff_id', response['message'].staff_id)
          // console.log(sessionStorage.getItem('type'));
          return {state: true, response};
      } else {
          return false;
     }

    })
  }

  logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('type');
    // localStorage.removeItem('user');
    // console.log(localStorage.getItem('type'));
    sessionStorage.clear();
    this.router.navigate(['/pages/login']);
    return false;
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  getType(): Observable<any> {
    return  new Observable((observer) => {
      console.log(sessionStorage.getItem('user'));
          observer.next(sessionStorage.getItem('user'));
    })
  }
}
