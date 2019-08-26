import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


let jsPDF = require('jspdf');
require('jspdf-autotable');

let moment = require('moment');
// // declare let jsPDF;

// // declare var jsPDF: any;
// import 'jspdf-autotable';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  modalRef: BsModalRef;



  feesmodalForm: FormGroup;

  something: any;


  requestlist: any = {};
  currencylist: any = {};
  medicalproviderlist: any = {};
  courseproviderlist: any = {};
  travelagentlist: any = {};
  feeslist: any = [{}];
  empname: any;
  requestid: any;
  dateB: any;
  dateC: any;
  x: any;
  y: any;
  diff: any;
  condition: any;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private userservice: UserService, public toastr: ToastsManager, vRef: ViewContainerRef, private modalService: BsModalService) {
    this.toastr.setRootViewContainerRef(vRef);

  }

  ngOnInit() {




    this.loadrequest();

  }



  loadcurrency() {
    this.currencylist = {};
    this.userservice.loadexchangelist().subscribe(response => {

      this.something = response;

       console.log(this.something);

      this.currencylist = this.something;
    });


    this.medicalproviderlist = {};
    this.userservice.loadmedicalfacilitylist().subscribe(response => {

      this.something = response;

      // console.log(this.something);

      this.medicalproviderlist = this.something;
    })


    this.courseproviderlist = {};
    this.userservice.loadcourseproviderlist().subscribe(response => {

      this.something = response;

      // console.log(this.something);

      this.courseproviderlist = this.something;
    })


    this.travelagentlist = {};
    this.userservice.loadtravelagentlist().subscribe(response => {

      this.something = response;

      // console.log(this.something);

      this.travelagentlist = this.something;
    })


  }



  loadrequest() {

    this.requestlist = {};
    this.userservice.loadrequestlist().subscribe(response => {

      this.something = response;

      // console.log( this.something);
      this.requestlist = this.something;
    })

  }



  loadfees(d) {
    this.feeslist = {};
    this.userservice.loadfees(d).subscribe(response => {

      this.something = response;

       console.log( this.something);


      this.feeslist = this.something;
    })
  }



  openfeesmodal(d, template: TemplateRef<any>) {

    this.loadcurrency();

    this.empname = d.firstname + ' ' + d.lastname;
    this.requestid = d.id;

    this.feesmodalForm = this.fb.group({

      type: ['', Validators.required],

      travelagent: [''],
      invoice: [''],
      medicalprovider: [''],
      courseprovider: [''],

      employeeid: [d.employeeid],
      rank: [d.rank],
      requestid: [d.id],
      department: [d.department],

      datefrom: [d.datefrom],
      dateto: [d.dateto],
      perdiem: [d.perdiem],

      exchangerate: [''],
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      total: ['', Validators.required],
      datepaid: ['', Validators.required],


    });


    this.loadfees(this.requestid);



    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

  }



  savefees() {

    let date1 = moment(this.feesmodalForm.value.datefrom);
    let date2 = moment(this.feesmodalForm.value.dateto);


    this.diff = date2.diff(date1, 'days');

    let perdiem = parseFloat(this.feesmodalForm.value.perdiem) * ((this.diff) - 1);

    // console.log(perdiem);

    let t = {
      type: this.feesmodalForm.value.type,
      currency: this.feesmodalForm.value.currency,
      amount: this.feesmodalForm.value.amount,
      exchangerate: this.feesmodalForm.value.exchangerate,
      total: this.feesmodalForm.value.total,
      employeeid: this.feesmodalForm.value.employeeid,
      department: this.feesmodalForm.value.department,
      datepaid: this.feesmodalForm.value.datepaid,
      requestid: this.feesmodalForm.value.requestid,
      perdiem: perdiem,
    };


    if (this.feesmodalForm.value.type == 'Clothing') {

      this.userservice.findclothing(this.feesmodalForm.value).subscribe(response => {

        this.something = response;
        console.log(this.something);

        // console.log(this.something.message.length);


        if (this.something.message.length > 0) {

          this.dateB = moment(this.something.message[0].datepaid);
          this.dateC = moment(this.feesmodalForm.value.datepaid);
          // console.log(this.dateC);

          let y = this.dateC.diff(this.dateB, 'months');
          console.log(y);
          if (y > 36) {

            // console.log("it is positive");
            this.userservice.savefees(t).subscribe(response => {


              // console.log(this.feesmodalForm.value);

              if (response['status'] === 1) {


                this.feeslist.push(t);

                this.toastr.success('Saved Successfully', 'HR App')
                  .then((toast) => {

                    this.ngOnInit();
                  })

                if (this.feesmodalForm.get('type').value === 'Travel Agent') {
                  this.savetravelagentmapping();
                  // tslint:disable-next-line:max-line-length
                } else if (this.feesmodalForm.get('type').value === 'Medical Provider' || this.feesmodalForm.get('type').value === 'Course Provider') {
                  this.saveprovidermapping();
                }

                // this.feesmodalForm.reset();
                // this.modalRef.hide();

              } else if (response['status'] === 0) {
                this.toastr.error('Unsuccessful', 'HR App')
                  .then((toast) => {
                    // this.feesmodalForm.reset();
                    this.ngOnInit();
                  })

                // this.modalRef.hide();

              }
            })
          } else {
            this.toastr.error('Previous Date: ' + this.something.message[0].datepaid, 'Cannot Receive Clothing Allowance')
              .then((toast) => {



              })
          }
        } else {
          this.userservice.savefees(t).subscribe(response => {


            // console.log(this.feesmodalForm.value);

            if (response['status'] === 1) {


              this.feeslist.push(t);

              this.toastr.success('Saved Successfully', 'HR App')
                .then((toast) => {

                  this.ngOnInit();
                })

              if (this.feesmodalForm.get('type').value === 'Travel Agent') {
                this.savetravelagentmapping();
              } else if (this.feesmodalForm.get('type').value === 'Medical Provider' || this.feesmodalForm.get('type').value === 'Course Provider') {
                this.saveprovidermapping();
              }

              // this.feesmodalForm.reset();
              // this.modalRef.hide();

            } else if (response['status'] === 0) {
              this.toastr.error('Unsuccessful', 'HR App')
                .then((toast) => {
                  // this.feesmodalForm.reset();
                  this.ngOnInit();
                })

              // this.modalRef.hide();

            }
          })
        }
      })


    } else {

      this.userservice.savefees(t).subscribe(response => {

        console.log(response);
        // console.log(this.feesmodalForm.value);

        if (response['status'] === 1) {


          this.feeslist.push(t);

          this.toastr.success('Saved Successfully', 'HR App')
            .then((toast) => {

              this.ngOnInit();
            })

          if (this.feesmodalForm.get('type').value === 'Travel Agent') {
            this.savetravelagentmapping();
          } else if (this.feesmodalForm.get('type').value === 'Medical Provider' || this.feesmodalForm.get('type').value === 'Course Provider') {
            this.saveprovidermapping();
          }

          // this.feesmodalForm.reset();
          // this.modalRef.hide();

        } else if (response['status'] === 0) {
          this.toastr.error('Unsuccessful', 'HR App')
            .then((toast) => {
              // this.feesmodalForm.reset();
              this.ngOnInit();
            })

          // this.modalRef.hide();

        }
      })


    }
  }



  savetravelagentmapping() {
    this.userservice.savetravelagentmapping(this.feesmodalForm.value).subscribe(response => {


      // console.log(response);

      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'HR App')
          .then((toast) => {
            // this.feesmodalForm.reset();
            this.ngOnInit();
          })

        // this.modalRef.hide();

      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'HR App')
          .then((toast) => {
            // this.feesmodalForm.reset();
            this.ngOnInit();
          })

        this.modalRef.hide();

      }
    })

  }

  saveprovidermapping() {
    this.userservice.saveprovidermapping(this.feesmodalForm.value).subscribe(response => {


      // console.log(response);

      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'HR App')
          .then((toast) => {
            // this.feesmodalForm.reset();
            this.ngOnInit();
          })



        // this.modalRef.hide();

      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'HR App')
          .then((toast) => {
            // this.feesmodalForm.reset();
            this.ngOnInit();
          })

        // this.modalRef.hide();

      }
    })

  }

  calc() {
    this.userservice.findrate(this.feesmodalForm.value).subscribe(response => {

      this.something = response;
       console.log(this.something);


      const amnt = parseFloat(this.something[0].rate) * this.feesmodalForm.value.amount;

      this.feesmodalForm.patchValue({
        total: amnt.toFixed(2),
        exchangerate: this.something[0].rate

      });
    })
  }



  check() {


    if (this.feesmodalForm.value.type == 'Clothing') {

      this.userservice.findclothing(this.feesmodalForm.value).subscribe(response => {

        this.something = response;
        // console.log(this.something);

        // console.log(this.something.message.length);


        if (this.something.message.length > 0) {
          // console.log("here");
          this.dateB = moment(this.something.message[0].datepaid);
          this.dateC = moment();


          let y = this.dateC.diff(this.dateB, 'months');
          if (y <= 36) {


            return false;

          } else {
            return true;
          }

        } else if (this.something.message.length === 0) {

          return true;
        }



      })
    } else {
      return true;
    }

  }

  //
  // calcperdiem()
  // {
  //        this.userservice.findperdiem(this.feesmodalForm.value).subscribe(response => {
  //
  //               this.something=response;
  //               console.log(this.something);
  //
  //
  //               this.diff=this.feesmodalForm.value.datefrom.diff(this.feesmodalForm.value.dateto, 'days');
  //
  //               const amnt=parseFloat(this.something[0].perdiem) * this.diff;
  //
  //               this.feesmodalForm.patchValue({
  //                   amount: amnt.toFixed(2),
  //
  //               });
  //
  //               this.condition="true";
  //
  //         })
  // }



}
