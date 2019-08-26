import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AdminService {
  url = environment.user_levels_api;
  username = sessionStorage.getItem('user');
  constructor(private http: HttpClient) { }
  /** Get all Users */
  getUsers() {
    return this.http.get(this.url + 'user')
     .map(response => {
       return response;
     })
  }
  /** Get all User Types */
  getUserTypes() {
    return this.http.get(this.url + 'user_level')
    .map(response => {
      return response;
    })
  }
  /** Get all Categories of Logistics */
  getLogistics() {
    return this.http.get(this.url + this.username + '/logistics_category')
    .map(response => {
      return response;
    })
  }
  /** Get all Departments */
  getDepartment() {
    return this.http.get(this.url + this.username + '/department')
    .map(response => {
      return response;
    })
  }
  /** Save Department */
  departmentSave(data) {
    return this.http.post(this.url + this.username + '/department', data)
    .map(response => {
      return response;
    })
  }

  /** Edit Department */
  departmentEdit(data) {
    return this.http.put(this.url + this.username + '/department' + data.id, data)
    .map(response => {
      return response;
    })
  }

  /** Save Logistics */
  logisticsSave(data) {
    return this.http.post(this.url + this.username + '/logistics_category', data)
    .map(response => {
      return response;
    })
  }

  /** Edit Logistics */
  logisticsEdit(data) {
    return this.http.put(this.url + this.username + '/logistics_category' + data.id, data)
    .map(response => {
      return response;
    })
  }


  /** Get all services */
  getService() {
    return this.http.get(this.url + this.username + '/services')
     .map(response => {

       return response;
     })
  }

   /** Save Service */
   serviceSave(data) {
    return this.http.post(this.url + this.username + '/services', data)
    .map(response => {
      return response;
    })
  }

  /** Edit Service */
  serviceEdit(data) {
    return this.http.put(this.url + this.username + '/services' + data.id, data)
    .map(response => {
      return response;
    })
  }

  /** Get All teams */
  teamSave(data) {
    return this.http.post(this.url + this.username + '/team', data)
    .map(response => {
      return response;
    })
  }

  /** Save Team */
  getTeam() {
    return this.http.get(this.url + this.username + '/team')
    .map(response => {
      return response;
    })
  }

  addUser(d) {
    return this.http.post(this.url + 'user', d).map(response => {
      return response;
    })
  }
}

