import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  url = environment.url;
  url2 = environment.url2;
  username;

  reportDate: string;

  constructor(private http: HttpClient) {

    this.username = sessionStorage.getItem('user');
  }


  savecurrency(d) {
    return this.http.post(this.url + '/hrcurrency', d)
        .map(response => {
          return response;
        })
  }


  loadcurrencylist() {
    return this.http.get(this.url + '/hrcurrency')
        .map(response => {
          return response;
        })
  }

  saveexchange(d) {
    return this.http.post(this.url2 + '/hrexchange', d)
        .map(response => {
          return response;
        })
  }

  updateexchange(d) {
    return this.http.put(this.url2 + '/hrexchange', d)
        .map(response => {
          return response;
        })
  }

  loadexchangelist() {
    return this.http.get(this.url2 + '/hrexchange')
        .map(response => {
          return response;
        })
  }


  savedepartment(d) {
    return this.http.post(this.url2 + '/add_department', d)
        .map(response => {
          return response;
        })
  }


  loaddepartmentlist() {
    return this.http.get(this.url2 + '/get_department')
        .map(response => {
          return response;
        })
  }

  updatedepartment(d) {
    return this.http.post(this.url2 + '/update_department', d)
        .map(response => {
          return response;
        })
  }


  saveunit(d) {
    return this.http.post(this.url + '/add_graunit', d)
        .map(response => {
          return response;
        })
  }


  loadunitlist() {
    return this.http.get(this.url + '/get_graunit')
        .map(response => {
          return response;
        })
  }



  saverank(d) {
    return this.http.post(this.url + '/add_grarank', d)
        .map(response => {
          return response;
        })
  }


  loadranklist() {
    return this.http.get(this.url + '/get_grarank')
        .map(response => {
          return response;
        })
  }



  saveofficelocation(d) {
    return this.http.post(this.url + '/add_graofficelocation', d)
        .map(response => {
          return response;
        })
  }


  loadofficelocationlist() {
    return this.http.get(this.url + '/get_graofficelocation')
        .map(response => {
          return response;
        })
  }


  savecourseprovider(d) {
    return this.http.post(this.url + '/get_courseprovider', d)
        .map(response => {
          return response;
        })
  }


  loadcourseproviderlist() {
    return this.http.get(this.url2 + '/hrcourse')
        .map(response => {
          return response;
        })
  }




  savecourse(d) {
    return this.http.post(this.url + '/add_gracourse', d)
        .map(response => {
          return response;
        })
  }


  loadcourselist() {
    return this.http.get(this.url + '/get_gracourses')
        .map(response => {
          return response;
        })
  }


  savemedicalfacility(d) {
    return this.http.post(this.url2 + '/hrmedicalfacility', d)
        .map(response => {
          return response;
        })
  }


  loadmedicalfacilitylist() {
    return this.http.get(this.url2 + '/hrmedicalfacility')
        .map(response => {
          return response;
        })
  }


  savetravelagent(d) {
    return this.http.post(this.url2 + '/hrtravelagent', d)
        .map(response => {
          return response;
        })
  }


  loadtravelagentlist() {
    return this.http.get(this.url2 + '/hrtravelagent')
        .map(response => {
          return response;
        })
  }



  saveemployee(d) {
    return this.http.post(this.url2 + '/add_employee', d)
        .map(response => {
          return response;
        })
  }


  updateemployee(d) {
    return this.http.post(this.url2 + '/update_employee', d)
        .map(response => {
          return response;
        })
  }



  loademployeelist() {
    return this.http.get(this.url + '/get_graemployee')
        .map(response => {
          return response;
        })
  }



  loadrequestlist() {
    return this.http.get(this.url2 + '/hrrequest')
        .map(response => {
          return response;
        })
  }


  saverequest(d) {
    return this.http.post(this.url2 + '/hrrequest', d)
        .map(response => {
          return response;
        })
  }


  findrate(d) {
    return this.http.post(this.url2 + '/hrexchange/findrate', d)
        .map(response => {
          return response;
        })

  }

  findExchangeRate(d) {
    let data = {
      currency: d
    };
    return this.http.post(this.url + '/graexchangerate/findrate', data).map( response => {
      return response;
    })
  }


  savefees(d) {
    return this.http.post(this.url2 + '/hrfees', d)
        .map(response => {
          return response;
        })

  }

  loadfeeslist() {
    return this.http.get(this.url2 + '/hrfees')
        .map(response => {
          return response;
        })

  }


  savetravelagentmapping(d) {
    return this.http.post(this.url2 + '/hrtravelagentmapping', d)
        .map(response => {
          return response;
        })

  }

  saveprovidermapping(d) {
    return this.http.post(this.url2 + '/hrprovidermapping', d)
        .map(response => {
          return response;
        })

  }


  findclothing(d) {
    return this.http.post(this.url2 + '/hrfindclothing', d)
        .map(response => {
          return response;
        })
  }

  loadfees(d) {
    return this.http.get(this.url2 + '/hrfindfee/' + d)
        .map(response => {
          return response;
        })
  }

  loadregionlist() {
    return this.http.get(this.url2 + '/hrregion')
        .map(response => {
          return response;
        })
  }

  getcountrylist(d) {
    return this.http.post(this.url2 + '/hrfindcountry', d)
        .map(response => {
          return response;
        })
  }

  getdbranklist() {
    return this.http.get(this.url2 + '/hrdbrank')
        .map(response => {
          return response;
        })
  }


  loaddepartmentexpenses(d) {
    return this.http.post(this.url2 + '/hrfeesbydepartment', d)
        .map(response => {
          return response;
        })
  }


  loadstaffexpenses(d) {
    return this.http.post(this.url2 + '/hrfeesbystaff', d)
        .map(response => {
          return response;
        })
  }

  loadtypeexpenses(d) {
    return this.http.post(this.url2 + '/hrfeesbytype', d)
        .map(response => {
          return response;
        })
  }

  // employee attendance related functions
  saveclockin(d) {
    return this.http.post(this.url + '/add_attendance', d).map(response => {
      return response;
    })
  }

  // get attendance
  loadtodayattendance(d) {

    return this.http.get(this.url + '/get_attendance_day/' + d).map(response => {
      return response;
    })
  }

  loadattendanceReport(d) {
    return this.http.get(this.url + d['reportType'] + d['reportDate']).map(response => {
      return response;
    })
  }
  // end of attendance routes

  // GRA-TRACKING ROUTES
  saveGraEmployee(d) {
    return this.http.post(this.url + '/add_graemployee', d).map(response => {
      return response;
    })
  }

  saveGraOrganization(d) {
    return this.http.post(this.url + '/add_graorganisation', d).map(response => {
      return response;
    })
  }

  saveGraCourseProvider(d) {
    return this.http.post(this.url + '/add_gracourseprovider', d).map(response => {
      return response;
    })
  }

  saveGraTravelAgent(d) {
    return this.http.post(this.url + '/add_gratravelagent', d).map(response => {
      return response;
    })
  }

  loadGraTravelAgent() {
    return this.http.get(this.url + '/get_gratravelagent').map(response => {
      return response;
    })
  }

  findTravelAgentFees (d) {
    let data = {
      travelagent: d
    };
    return this.http.post(this.url +  '/get_gratravelagentfees', data).map(response => {
      return response;
    })
  }

  saveGraDepartment(d) {
    return this.http.post(this.url + '/add_gradepartments', d).map(response => {
      return response;
    })
  }

  loadGraDepartment() {
    return this.http.get(this.url + '/get_gradepartments').map(response => {
      return response;
    })
  }

  saveGraCourse(d) {
    return this.http.post(this.url + '/add_gracourses', d).map( response => {
      return response;
    })
  }

  loadGraOrganization() {
    return this.http.get(this.url + '/get_graorganisation').map(response => {
      return response;
    })
  }

  loadGraCourses() {
    return this.http.get(this.url + '/get_gracourses').map( response => {
      return response;
    })
  }

  loadGraEmployee() {
    return this.http.get(this.url + '/get_graemployee').map(response => {
      return response;
    })
  }

  loadOneEmployee(d) {
    return this.http.get(this.url + '/get_graemployee/' + d).map(response => {
      return response;
    })
  }

  loadGraRequest () {
    return this.http.get(this.url + '/get_grarequest').map(response => {
      return response;
    })
  }

  loadGraMedicals() {
    return this.http.get(this.url + '/get_gramedfacility').map(response => {
      return response;
    })
  }

  loadGraCourseProviders() {
    return this.http.get(this.url + '/get_gracourseprovider').map(response => {
      return response;
    })
  }

  LoadGraRank() {
    return this.http.get(this.url + '/get_grarank').map(response => {
      return response;
    })
  }

  SaveGraRequest(d) {
    return this.http.post(this.url + '/add_grarequest', d).map(response => {
      return response;
    })
  }

  LoadGraExchangeRate() {
    return this.http.get(this.url + '/get_graexchangerate').map(response => {
      return response;
    })
  }

  saveGraExchangeRate(d) {
    return this.http.post(this.url + '/add_graexchangerate', d).map(response => {
      return response;
    })
  }

  findCourseProviderFees(d) {
    console.log(d);
    let data = {
      courseprovider: d
    };
    return this.http.post(this.url + '/get_gracourseproviderfees', data).map(response => {
      return response;
    })
  }
}
