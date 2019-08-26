import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { RequestOptions } from '@angular/http/src/base_request_options';
import {  RequestOptions} from '@angular/http';


@Injectable()
export class CustomersService {

  url =  'https://apisale.herokuapp.com/api/';
  constructor(private http: HttpClient) { }

  getCustomers() {
    const headers = new HttpHeaders();
    const token  = localStorage.getItem('token');
    const t = headers.append('x-access-token', token);
    return this.http.get(this.url + 'customer', {headers: t} )
    .map(response => {
     return response;
    })
  }
}
