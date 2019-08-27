import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

var $ = require('jquery');
require('../../../../../node_modules/jquery-csv/src/jquery.csv.js');

const URL = 'https://cragdb.herokuapp.com/api/sign-s3/';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  modalRef: BsModalRef;


  employeemodalForm: FormGroup;
  requestmodalForm: FormGroup;
  updateemployeemodalForm: FormGroup;

  employeelist: any = {};
  departmentlist: any = {};
  unitlist: any = {};
  ranklist: any = {};
  officelocationlist: any = {};
  regionlist: any = {};
  countrylist: any = {};

  something: any;
  d: any;
  settime: any;




  constructor(private fb: FormBuilder, private userservice: UserService, public toastr: ToastsManager,
    vRef: ViewContainerRef, private modalService: BsModalService) {
    this.toastr.setRootViewContainerRef(vRef);

  }

  ngOnInit() {


    this.loademployee();

  }


  /*saveemployee() {

    this.userservice.saveemployee(this.employeemodalForm.value).subscribe(response => {


      // console.log(response);

      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'HR App')
          .then((toast) => {

            this.employeemodalForm.reset();

            this.ngOnInit();
          })

        this.modalRef.hide();
        this.loademployee();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'HR App')
          .then((toast) => {
            this.employeemodalForm.reset();
            this.ngOnInit();
          })

        this.modalRef.hide();

      }
    })
  }*/

  saveGraEmployee() {
    this.userservice.saveGraEmployee(this.employeemodalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'GRA-TRACKING')
          .then((toast) => {
            this.employeemodalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.employeemodalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }




  loademployee() {
    this.employeelist = {};


    this.userservice.loademployeelist().subscribe(response => {

      this.something = response;

      console.log(this.something);
      // console.log(typeof response);
      this.employeelist = this.something.message;
      // return Object.keys(this.employeelist)
    })
  }



  loaditems() {
    this.departmentlist = {};
    this.userservice.loadGraDepartment().subscribe(response => {

      this.something = response;

      console.log(this.something);
      this.departmentlist = this.something.message;
    });

    this.unitlist = {};
    this.userservice.loadunitlist().subscribe(response => {

      this.something = response;

       console.log( this.something);
      this.unitlist = this.something.message;
    });


    this.ranklist = {};
    this.userservice.LoadGraRank().subscribe(response => {

      this.something = response;

      // console.log( this.something);
      this.ranklist = this.something.message;
    });


    this.officelocationlist = {};
    this.userservice.loadofficelocationlist().subscribe(response => {

      this.something = response;

      // console.log( this.something);
      this.officelocationlist = this.something.message;
    })
  }




  // this opens a form template loaded with one employee data to be updated
  openupdateemployeemodal(d, template: TemplateRef<any>) {
    this.loaditems();

    this.updateemployeemodalForm = this.fb.group({

      name: [d.name],
      employeeid: [d.employeeid],
      bank: ['', Validators.required],
      mobile: ['', Validators.required],
      department: ['', Validators.required],
    })
    // console.log(this.editworkerform.value);



    this.modalRef = this.modalService.show(template);
  }

  openemployeemodal(template: TemplateRef<any>) {
    this.loaditems();
    this.employeemodalForm = this.fb.group({

      employeeid: ['', Validators.required],
      employeename: ['', Validators.required],
      unit: ['', Validators.required],
      rank: ['', Validators.required],
      department: ['', Validators.required],
      officelocation: ['', Validators.required],
      mobileno: ['', Validators.required],
    });
    // console.log(this.editworkerform.value)
    this.modalRef = this.modalService.show(template);

  }

  updateemployee() {
    const someData = this.updateemployeemodalForm.value;
    console.log(someData);
    this.userservice.updateemployee(this.updateemployeemodalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Updated Successfully', 'HR App')
          .then((toast) => {
            this.updateemployeemodalForm.reset();
            this.ngOnInit();
          })

        this.modalRef.hide();
        this.loademployee();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'HR App')
          .then((toast) => {
            this.updateemployeemodalForm.reset();
            this.ngOnInit();
          })

        this.modalRef.hide();

      }
    })
  }


  openrequestmodal(d, template: TemplateRef<any>) {

    this.regionlist = {};
    this.userservice.loadregionlist().subscribe(response => {

      this.something = response;

      // console.log( this.something);
      this.regionlist = this.something;
    })




    this.loaditems();

    this.requestmodalForm = this.fb.group({


      employeeid: [d.employeeid],
      type: ['', Validators.required],
      datefrom: ['', Validators.required],
      dateto: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],



    })


    // console.log(this.editworkerform.value);



    this.modalRef = this.modalService.show(template);

  }


  getcountry() {

    this.countrylist = {};
    this.userservice.getcountrylist(this.requestmodalForm.value).subscribe(response => {

      this.something = response;

      // console.log( this.something);
      this.countrylist = this.something;
    })


  }


  saverequest() {

    this.userservice.saverequest(this.requestmodalForm.value).subscribe(response => {


      // console.log(response);

      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'HR App')
          .then((toast) => {
            this.requestmodalForm.reset();
            this.ngOnInit();
          })

        this.modalRef.hide();

      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'HR App')
          .then((toast) => {
            this.requestmodalForm.reset();
            this.ngOnInit();
          })

        this.modalRef.hide();

      }
    })
  }

  // saveclockin will save the clock in time for an employee
  saveclockin(d) {
    // this.loademployee();
    const employeeid = d.employeeid;
    const employeename = d.name;

    console.log(this.getDate());

    const clockInData = {
      employeeid: employeeid,
      date: this.getDate(),
      name: employeename,
      type: 'Clockin',
      time: this.getTime()
    }
    console.log(clockInData);
    console.log(clockInData.time);
    this.userservice.saveclockin(clockInData).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Clocked in at ' + this.getTime(), 'HR App')
      } else if (response['status'] === 0) {
        console.log(response['status'] + '\n' + response['message'])
        this.toastr.error('Unsuccessful:\n ', response['message'])
      }
    })
  }

  // saveclockout will save the clock out time for an employee
  saveclockout(d) {
    // this.loademployee();
    const employeeid = d.employeeid;
    const employeename = d.name;

    const clockOutData = {
      employeeid: employeeid,
      date: this.getDate(),
      type: 'Clockout',
      name: employeename,
      time: this.getTime()
    }
    console.log(clockOutData);
    this.userservice.saveclockin(clockOutData).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Clocked out at ' + this.getTime(), 'HR App')
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'HR App')
      }
    })
  }

  getDate() {
    const time = new Date();
    return time;
  }

  getTime() {
    const time = new Date().toJSON();
    this.settime = time.substr(11, 5)
    return this.settime;
  }

}
