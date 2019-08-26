import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class CommonService {
  url = environment.url;
  head;
  username;
  constructor(private http: HttpClient) {
  const headers = new HttpHeaders();
    const token  = localStorage.getItem('token');
    this.head = headers.append('x-access-token', token);
    this.username = localStorage.getItem('user');
  }

    /** Cocoa Regions */
    region() {
      return this.http.get(this.url + this.username + '/common/region' , {headers: this.head})
      .map(response => {
        return response;
      })
     }
     /** Political Regions */
     politicalRegion() {
      return this.http.get(this.url + this.username + '/common/political_region' , {headers: this.head})
      .map(response => {
        return response;
      })
     }
     /** Cocoa Districts */
     district() {
      return this.http.get(this.url + this.username + '/common/district' , {headers: this.head})
      .map(response => {
        return response;
      })
     }
     /** Cocoa Communities */
     community() {
      return this.http.get(this.url + this.username + '/common/community' , {headers: this.head})
      .map(response => {
        // const  r = response;
        // if (r.){
        //   return response;
        // } else {
        //   console.log('Initiate')
        // }
        return response

      }, error => {
          console.log('error');
      })
     }

}
