import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class OperationsService {
  url = environment.url;
  username;
  constructor(private http: HttpClient) {
    this.username = sessionStorage.getItem('user');
   }

  /** Get all Logistics */
   getItems () {
    return this.http.get(this.url + this.username + '/logistics_setup')
     .map(response => {
       return response;
     })
  }

  /** Save Logistics Item */
  itemSave (data) {
    return this.http.post(this.url + this.username + '/logistics_setup', data )
     .map(response => {
       return response;
     })
  }

  /** Get All Assessment of a particular service unit  */
  getAssessment(d) {
    return this.http.get(this.url + this.username + '/operations/assessment_manager/' + d)
    .map(response => {
      return response;
    })
  }

  /*getOperationsStaff(d) {
    return this.http.get(this.url + this.username + '/operations/staff/' + d)
    .map(response => {
      return response;
    })
  }*/

  getOperationsStaff(d) {
    return this.http.get(this.url + this.username + '/operations/staff_service/' + d)
    .map(response => {
      return response;
    })
  }

  assignmentSave(data) {
    return this.http.put(this.url + this.username + '/operations/assessment_assign/' + data.assessment_id, data)
    .map(response => {
      return response;
    })
  }

  assessmentAnalysis(d) {
    return this.http.get(this.url + this.username + '/operations/assessment_analysis/' + d)
    .map(response => {
      return response;
    })
  }

  staffService(d) {
    return this.http.get(this.url + this.username + '/operations/staff_service/' + d)
    .map(response => {
      return response;
    })
  }
  staffPerService(d) {
    return this.http.get(this.url + this.username + '/operations/staff_prospect/' + d)
    .map(response => {
      return response;
    })
  }

  staffServiceSave(data) {
    return this.http.post(this.url + this.username + '/operations/staff_service/' + sessionStorage.getItem('service'), data)
    .map(response => {
      return response;
    })
  }

  /** Get Item for category */

  getCategoryItem(d) {
    return this.http.get(this.url + this.username + '/logistics_setup/' + d)
      .map(response => {
        return response;
      })
  }

  /** Get how many projects a staff is working on */
  staffServiceLoad(d) {
    return this.http.get(this.url + this.username + '/operations/staff_service_load/' + d)
    .map(response => {
      return response;
    })
  }


  /** SECURITY */


  staffLogisticsSave(d) {
    return this.http.post(this.url + this.username + '/logistics_staff',  d)
    .map(response => {
      return response;
    })
  }

  staffLogisticsHistory(d) {
    return this.http.get(this.url + this.username + '/logistics_staff/' +  d)
    .map(response => {
      return response;
    })
  }


  getLogisticsBalance(d) {
    return this.http.get(this.url + this.username + '/logistics_service/' +  d)
    .map(response => {
      return response;
    })
  }

  /** Get the history of each item per service */
  getLogisticsHistory(service, item) {
    return this.http.get(this.url + this.username + '/logistics_service_history/' +  service + '/' + item)
    .map(response => {
      return response;
    })
  }

  /** Save other logistics  */
  saveOtherLogistics(data) {
    return this.http.post(this.url + this.username + '/logistics_other/' , data)
    .map(response => {
      return response;
    })
  }
  /** Get Item Prices */



  /** Project Staff List */

  getProjectStaff(d) {
    return this.http.get(this.url + this.username + '/project/staff/' + d)
    .map(response => {
      return response;
    })
  }

  /** Project Staff List */

  getProjectLogistics(d) {
    return this.http.get(this.url + this.username + '/project/logistics/' + d + '/' + sessionStorage.getItem('service'))
    .map(response => {
      return response;
    })
  }


}
