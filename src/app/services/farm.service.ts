import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class FarmService {
  url = environment.url;
  head;
  username;
  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
    const token  = localStorage.getItem('token');
    this.head = headers.append('x-access-token', token);
    this.username = localStorage.getItem('user');
   }

   farms() {
     return this.http.get(this.url + this.username + '/farm', {headers: this.head})
      .map(response => {
        return response;
      })
   }

   farmTotal() {
    return this.http.get(this.url + this.username + '/farm/total', {headers: this.head})
      .map(response => {
        return response;
      })
   }

   farmTotalRegion() {
    return this.http.get(this.url + this.username + '/farm/total_region', {headers: this.head})
      .map(response => {
        return response;
      })
   }

   cocoaTypes() {
     return this.http.get(this.url + this.username + '/farm/cocoa_types', {headers: this.head})
     .map(response => {
       return response;
     })
   }

   farmLabour() {
    return this.http.get(this.url + this.username + '/farm/labour', {headers: this.head})
     .map(response => {
       return response;
     })
   }

   farmOwnership() {
    return this.http.get(this.url + this.username + '/farm/ownership', {headers: this.head})
    .map(response => {
      return response;
    })
   }

   farmInput() {
    return this.http.get(this.url + this.username + '/farm/planting_materials', {headers: this.head})
    .map(response => {
      return response;
    })
   }

   farmExtension() {
    return this.http.get(this.url + this.username + '/farm/extension_organisation', {headers: this.head})
    .map(response => {
      return response;
    })
   }

   farmAge() {
    return this.http.get(this.url + this.username + '/farm/age', {headers: this.head})
    .map(response => {
      return response;
    })
   }
   /** Get Map details per farm, passing id of the farm */
   farmMap(id) {
    return this.http.get(this.url + this.username + '/farm/map/' + id.farm_id , {headers: this.head})
    .map(response => {
      return response;
    })
   }

  //  /** Get all farming  */
  //  farmCommunity() {
  //   return this.http.get(this.url + this.username + '/farm/community' , {headers: this.head})
  //   .map(response => {
  //     return response;
  //   })
  //  }

   /** Search for farming community when region is selected */
   searchDistrict(obj: any[], region) {
     const arr = [];
      obj.forEach(items => {
        if (items.region === region) {
          arr.push(items)
        }
      })
      return arr;
   }

    /** Search for farming community when region is selected */
    searchCommunity(obj: any[], district) {
      const arr = [];
      obj.forEach(items => {
        if (items.district === district) {
          arr.push(items)
        }
      })
      return arr;
   }

}
