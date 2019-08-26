import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class MarketingService {
  url = environment.url;
  username;
  constructor(private http: HttpClient) {
    this.username = sessionStorage.getItem('user');
   }

  getProspect () {
    return this.http.get(this.url + this.username + '/prospect')
     .map(response => {
       return response;
     })
  }

  getProspectDetails (d) {
    return this.http.get(this.url + this.username + '/prospect/' + d)
     .map(response => {
       return response;
     })
  }

  getMyProspect () {
    return this.http.get(this.url + this.username + '/prospectbyuser/' + this.username)
     .map(response => {
       return response;
     })
  }

  getProspectHistory (d) {
    return this.http.get(this.url + this.username + '/prospect_history/' + d)
      .map(response => {
        return response;
      })
  }

  officerDash () {
    return this.http.get(this.url + this.username + '/marketing/officer_dash/' + this.username)
     .map(response => {
       return response;
     })
  }

  getHistory (d) {
    return this.http.get(this.url + this.username + '/prospect_history/' + d)
     .map(response => {
       return response;
     })
  }

  activitySave (data) {
    return this.http.post(this.url + this.username + '/prospect_history', data)
     .map(response => {
       return response;
     })
  }

  /** Save New Prospect */
  prospectSave (data) {
    return this.http.post(this.url + this.username + '/prospect', data)
     .map(response => {
       return response;
     })
  }

  /** Assessment Save */
  assessmentSave (data) {
    return this.http.post(this.url + this.username + '/assessment', data)
      .map(response => {
        return response;
      })
  }

  /** Assessment List */
  getAssessmentStatus () {
    return this.http.get(this.url + this.username + '/assessment')
    .map(response => {
      return response;
    })
  }

  /** Get All officers and the total prospects */
  getOfficerTotal () {
    return this.http.get(this.url + this.username + '/marketing/officer_assignment')
    .map(response => {
      return response;
    })
  }

  /** Get total staff and costing of assessment */
  getStaffTotal (assessment_id, type) {
    return this.http.get(this.url + this.username + '/operations/assessment_staff_analysis/' + assessment_id + '/' +
    sessionStorage.getItem('service') + '/' + type)
    .map(response => {
      return response;
    })
  }

  /** Approve assessment */
  assessment_approval(d, a) {
    return this.http.put(this.url + this.username + '/assessment_approval/' + d + '/' + a , {})
    .map(response => {
      return response;
    })
  }


  /** Get Assessment Services */
  getAssessmentServices(d) {
    return this.http.get(this.url + this.username + '/assessment_services/' + d )
    .map(response => {
      return response;
    })
  }

  /** Save Assessment Service */
  saveAssessmentServices(d) {
    return this.http.post(this.url + this.username + '/assessment_services', d )
    .map(response => {
      return response;
    })
  }

  /** Save Contract */
  saveProject(d) {
    return this.http.post(this.url + this.username + '/project', d )
    .map(response => {
      return response;
    })
  }


  getProject() {
    return this.http.get(this.url + this.username + '/project')
    .map(response => {
      return response;
    })
  }
}
