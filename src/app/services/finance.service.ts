import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class FinanceService {
  url = environment.url
  username;
  constructor(private http: HttpClient) {
    this.username = sessionStorage.getItem('user');
   }
   /** Get All Vendors */
   getVendor () {
    return this.http.get(this.url + this.username + '/vendor')
     .map(response => {
       return response;
     })
  }
  /** Save New Vendor */
    vendorSave (data) {
      return this.http.post(this.url + this.username + '/vendor', data)
      .map(response => {
        return response;
      })
    }

  /** Update Vendor Details */
  vendorUpdate (data) {
    return this.http.put(this.url + this.username + '/vendor/' + data.id, data)
    .map(response => {
      return response;
    })
  }

  /** Get all items prices*/
  itemPrice () {
    return this.http.get(this.url + this.username + '/items/price')
    .map(response => {
      return response;
    })
  }

   /** Update items prices*/
   itemSave (data) {
     console.log(data);
    return this.http.post(this.url + this.username + '/items/price', data)
    .map(response => {
      return response;
    })
  }

  /** Get Item History */
  itemHistory(d) {
    return this.http.get(this.url + this.username + '/items/history/' + d )
    .map(response => {
      return response;
    })
  }

   /** Update items prices*/
   itemDisbursement (data) {
    return this.http.post(this.url + this.username + '/items_disburse', data)
    .map(response => {
      return response;
    })
  }

  /** Get Disbbursement Balances */
  getitemDisbursement () {
    return this.http.get(this.url + this.username + '/items_disburse')
    .map(response => {
      return response;
    })
  }

  /** Get all team cost */

  getTeamCost () {
    return this.http.get(this.url + this.username + '/team_cost')
    .map(response => {
      return response;
    })
  }

  /** Save all team cost */

  teamCostSave(data) {
    return this.http.post(this.url + this.username + '/team_cost', data)
    .map(response => {
      return response;
    })
  }

}
