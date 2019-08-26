import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceService {
  url = environment.url;
  username = localStorage.getItem('user');
  constructor(private http: HttpClient, ) { }

  getService() {
    return this.http.get(this.url + this.username + '/services')
     .map(response => {

       return response;
     })
  }

}
