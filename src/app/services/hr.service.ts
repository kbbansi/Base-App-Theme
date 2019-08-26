import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class HrService {
  url = environment.url;
  username;
  constructor(private http: HttpClient) {
    this.username = sessionStorage.getItem('user');
  }

  getStaff () {
    return this.http.get(this.url + this.username + '/staff')
     .map(response => {
       return response;
     })
  }
  staffSave (d) {
    return this.http.post(this.url + this.username + '/staff', d)
     .map(response => {
       return response;
     })
  }

  getDash() {
    return this.http.get(this.url + this.username + '/hr/dash')
    .map(response => {
      return response;
    })
  }

  getDepartment(d) {
    return this.http.get(this.url + this.username + '/staff/department/' + d)
    .map(response => {
      return response;
    })
  }

  getService(d) {
    return this.http.get(this.url + this.username + '/staff/service/' + d)
    .map(response => {
      return response;
    })
  }

}
