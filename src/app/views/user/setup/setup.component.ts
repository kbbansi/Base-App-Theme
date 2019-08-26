
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const $  = require('jquery');
require('../../../../../node_modules/jquery-csv/src/jquery.csv.js');

import * as Papa from 'papaparse';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://cragdb.herokuapp.com/api/sign-s3/';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  modalRef: BsModalRef;


  something: any;



  currencymodalForm: FormGroup;
  exchangemodalForm: FormGroup;
  updateexchangemodalForm: FormGroup;
  departmentmodalForm: FormGroup;
  unitmodalForm: FormGroup;
  rankmodalForm: FormGroup;
  officelocationmodalForm: FormGroup;
  courseprovidermodalForm: FormGroup;
  coursemodalForm: FormGroup;
  medicalfacilitymodalForm: FormGroup;
  travelagentmodalForm: FormGroup;

  currencylist: any= {};
  exchangelist: any= {};
  departmentlist: any= {};
  unitlist: any= {};
  ranklist: any= {};
  officelocationlist: any= {};
  courseproviderlist: any= {};
  courselist: any= {};
  medicalfacilitylist: any= {};
  travelagentlist: any= {};
  dbranklist: any= {};
  regionlist: any= {};

  constructor(private fb: FormBuilder, private userservice: UserService,
              public toastr: ToastsManager, vRef: ViewContainerRef, private modalService: BsModalService) {
    this.toastr.setRootViewContainerRef(vRef);

   }

  ngOnInit() {




    // this.loadcurrency();
    // this.loadexchange();
    // this.loaddepartment();
    // this.loadunit();
    // this.loadrank();
    // this.loadofficelocation();
    // this.loadcourseprovider();
    // this.loadcourse();
    // this.loadmedicalfacility();
    // this.loadtravelagent();
    this.loaditems();
  }



    loadcurrency() {
        this.currencylist = {};
        this.userservice.loadcurrencylist().subscribe(response => {

            this.something = response;
            this.currencylist = this.something;
          })
     }


      opencurrencymodal(template: TemplateRef<any>) {

                this.currencymodalForm = this.fb.group({
                  name: ['', Validators.required],


                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      savecurrency() {

                     this.userservice.savecurrency(this.currencymodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.currencymodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadcurrency();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.currencymodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }











    loadexchange() {
        this.exchangelist = {};
        this.userservice.loadexchangelist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.exchangelist = this.something;
          })
     }


    openexchangemodal(template: TemplateRef<any>) {

                this.exchangemodalForm = this.fb.group({
                  date: ['', Validators.required],
                  currency: ['', Validators.required],
                    rate: ['', Validators.required],

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }


      openupdateexchangemodal(d, template: TemplateRef<any>) {


        console.log(d);
                this.updateexchangemodalForm = this.fb.group({

                   date: ['', Validators.required],
                   currency: [d.currency],
                   rate: ['', Validators.required],

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);
      }



      saveexchange() {

                     this.userservice.saveexchange(this.exchangemodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.exchangemodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadexchange();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.exchangemodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }


     updateexchange() {

                     this.userservice.updateexchange(this.updateexchangemodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.updateexchangemodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadexchange();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.updateexchangemodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })     }


    loaddepartment() {
        this.departmentlist = {};
        this.userservice.loadGraDepartment().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.departmentlist = this.something;
          })
     }


    opendepartmentmodal(template: TemplateRef<any>) {

                this.departmentmodalForm = this.fb.group({

                    name: ['', Validators.required],

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      savedepartment() {

                     this.userservice.saveGraDepartment(this.departmentmodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.departmentmodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loaddepartment();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.departmentmodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }









   loadunit() {
        this.unitlist = {};
        this.userservice.loadunitlist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.unitlist = this.something;
          })
     }


    openunitmodal(template: TemplateRef<any>) {

                this.unitmodalForm = this.fb.group({

                    name: ['', Validators.required],

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      saveunit() {

                     this.userservice.saveunit(this.unitmodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.unitmodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadunit();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.unitmodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }





   loadrank() {
        this.ranklist = {};
        this.userservice.loadranklist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.ranklist = this.something;
          })
     }


    openrankmodal(template: TemplateRef<any>) {


             this.dbranklist = {};
              this.userservice.getdbranklist().subscribe(response => {

                  this.something = response;
                  this.dbranklist = this.something;
                })


               this.regionlist = {};
              this.userservice.loadregionlist().subscribe(response => {

                  this.something = response;
                  this.regionlist = this.something;
                })




                this.rankmodalForm = this.fb.group({

                    name: ['', Validators.required],
                    perdiem: ['', Validators.required],
                    region: ['', Validators.required],


                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      saverank() {

                     this.userservice.saverank(this.rankmodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.rankmodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadrank();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.rankmodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }








   loadofficelocation() {
        this.officelocationlist = {};
        this.userservice.loadofficelocationlist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.officelocationlist = this.something;
          })
     }


    openofficelocationmodal(template: TemplateRef<any>) {

                this.officelocationmodalForm = this.fb.group({

                    location: ['', Validators.required],

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      saveofficelocation() {

                     this.userservice.saveofficelocation(this.officelocationmodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.officelocationmodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadofficelocation();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.officelocationmodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }






   loadcourseprovider() {
        this.courseproviderlist = {};
        this.userservice.loadcourseproviderlist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.courseproviderlist = this.something;
          })
     }


    opencourseprovidermodal(template: TemplateRef<any>) {

                this.courseprovidermodalForm = this.fb.group({

                    name: ['', Validators.required],
                    address: ['', Validators.required]

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      savecourseprovider() {

                     this.userservice.savecourseprovider(this.courseprovidermodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.courseprovidermodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadcourseprovider();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.courseprovidermodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }







   loadcourse() {
        this.courselist = {};
        this.userservice.loadcourselist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.courselist = this.something;
          })
     }


    opencoursemodal(template: TemplateRef<any>) {

                this.coursemodalForm = this.fb.group({

                    name: ['', Validators.required],
                    description: ['', Validators.required]

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      savecourse() {

                     this.userservice.savecourse(this.coursemodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.coursemodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadcourse();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.coursemodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }






   loadmedicalfacility() {
        this.medicalfacilitylist = {};
        this.userservice.loadmedicalfacilitylist().subscribe(response => {

            this.something = response;

             // console.log( this.something);
            this.medicalfacilitylist = this.something;
          })
     }


    openmedicalfacilitymodal(template: TemplateRef<any>) {

                this.medicalfacilitymodalForm = this.fb.group({

                    name: ['', Validators.required],
                    address: ['', Validators.required]

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      savemedicalfacility() {

                     this.userservice.savemedicalfacility(this.medicalfacilitymodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.medicalfacilitymodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          this.loadmedicalfacility();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.medicalfacilitymodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }





   // loadtravelagent() {
   //      this.travelagentlist = {};
   //      this.userservice.loadtravelagentlist().subscribe(response => {
   //
   //          this.something = response;
   //
   //           // console.log( this.something);
   //          this.travelagentlist = this.something;
   //        })
   //   }


    opentravelagentmodal(template: TemplateRef<any>) {

                this.travelagentmodalForm = this.fb.group({

                    name: ['', Validators.required],
                    address: ['', Validators.required],
                    contact: ['', Validators.required]

                })
              // console.log(this.editworkerform.value);



             this.modalRef = this.modalService.show(template);

      }



      savetravelagent() {

                     this.userservice.savetravelagent(this.travelagentmodalForm.value).subscribe(response => {


                     // console.log(response);

                      if (response['status'] === 1) {
                            this.toastr.success('Saved Successfully', 'HR App')
                            .then((toast) => {
                              this.travelagentmodalForm.reset();
                              this.ngOnInit();
                          })

                          this.modalRef.hide();
                          // this.loadtravelagent();
                      } else if (response['status'] === 0) {
                        this.toastr.error('Unsuccessful', 'HR App')
                        .then((toast) => {
                          this.travelagentmodalForm.reset();
                          this.ngOnInit();
                          })

                        this.modalRef.hide();

                      }
               })
      }

  loaditems() {
    this.departmentlist = {};
    this.userservice.loadGraDepartment().subscribe(response => {

      this.something = response;

      console.log(this.something);
      this.departmentlist = this.something.message;
    });

    this.ranklist = {};
    this.userservice.loadranklist().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.ranklist = this.something.message;
    });

    this.unitlist = {};
    this.userservice.loadunitlist().subscribe( response => {
      this.something = response;
      console.log(this.something);
      this.unitlist = this.something.message;
    });

    this.officelocationlist = {};
    this.userservice.loadofficelocationlist().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.officelocationlist = this.something.message;
    });

    this.courseproviderlist = {};
    this.userservice.loadcourseproviderlist().subscribe(response => {
      this.something = response;
      this.courseproviderlist = this.something.message;
    });

    this.courselist = {};
    this.userservice.loadGraCourses().subscribe(response => {
      this.something = response;
      this.courselist = this.something.message;
    })
  }
}
