import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class FarmerService {

  url =  environment.url;
  head;
  username;
  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
    const token  = localStorage.getItem('token');
    this.head = headers.append('x-access-token', token);
    this.username = localStorage.getItem('user');
   }

  /** Full Farmer List */
  farmer () {
    return this.http.get(this.url + this.username + '/farmer', {headers: this.head})
     .map(response => {
       return response;
     })
  }

  /** Farmer Dashboard  */
  farmerDashTab() {
    return this.http.get(this.url + this.username + '/farmer/dashboard', {headers: this.head})
     .map(response => {
       return response;
     })
  }

  /** Speciality Cocoa  */
  farmerSpeciality() {
    return this.http.get(this.url + this.username + '/farmer/speciality_distribution', {headers: this.head})
     .map(response => {
       return response;
     })
  }

  /** Farmer Household National */
  farmerHouseNational() {
    return this.http.get(this.url + this.username + '/farmer/household_national', {headers: this.head})
      .map(response => {
        return response;
      })
  }

  /** Farmer Household Region */
  farmerHouseRegion() {
    return this.http.get(this.url + this.username + '/farmer/household_region', {headers: this.head})
      .map(response => {
        return response;
      })
  }

  /** Farmer Region Listing */
  farmerRegionList() {
    return this.http.get(this.url + this.username + '/farmer/political', {headers: this.head})
      .map(response => {
        return response;
      })
  }

  /** Farmer Search */
  farmerSearch(data) {
    const t = {
      data: data
    }
    return this.http.post(this.url + this.username + '/farmer/search', t, {headers: this.head})
      // .map(response => {
      //   console.log(response);
      //   return response;
      // })
      .map(response => response)
  }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.farmerSearch(term));
  }



  // searchEntries(term) {
  //   return this.http
  //       .get(this.baseUrl + this.queryUrl + term)
  //       .map(res => res.json());
  // }




}
