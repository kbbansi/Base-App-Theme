import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-officer-dashboard',
  templateUrl: './officer-dashboard.component.html',
  styleUrls: ['./officer-dashboard.component.scss']
})
export class OfficerDashboardComponent implements OnInit {
  // empty json objects for handling data needs of the application
  requestDataList: any = {};
  employeeDataList: any = {};
  currencyList: any = {};
  something: any;

  // form groups for working with forms
  viewRequestFormModal: FormGroup;
  RequestFormModal: FormGroup;
  modalRef: BsModalRef;
  travelAgentList: any = {};
  addRequestFormModal: FormGroup;
  employeeid: any;
  travelAgent: any;
  medicalFacilityList: any = {};
  courseProviderList: any = {};
  rankList: any = {};

  constructor(private userService: UserService, private ModalService: BsModalService, private formBuilder: FormBuilder,
              private Toast: ToastsManager, viewContainerRef: ViewContainerRef) {
    this.Toast.setRootViewContainerRef(viewContainerRef)
  }

  ngOnInit() {
    this.loadData();
    this.something = sessionStorage.getItem('userID');
    console.log(this.something);
  }

  openRequestModal(d, template: TemplateRef<any>) {
    this.viewRequestFormModal = this.formBuilder.group({
      employeeid: [d.employeeid],
      type: [d.type],
      datefrom: [d.datefrom],
      dateto: [d.dateto],
      region: [d.region],
      country: [d.country],
    });
    this.modalRef = this.ModalService.show(template);
  }

  openAddRequestModal(template: TemplateRef<any>) {
    this.loadTravelAgents();
    // this.loadEmployeeID();
    this.addRequestFormModal = this.formBuilder.group({
      employeeid: ['', Validators.required],
      employeename: ['', Validators.required],
      rank: ['', Validators.required],
      type: ['', Validators.required],
      visa: ['', Validators.required],
      visafees: ['', Validators.required],
      invoice: ['', Validators.required],
      medicalfacility: ['', Validators.required],
      medical: ['', Validators.required],
      travelagent: ['', Validators.required],
      datefrom: ['', Validators.required],
      dateto: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      courseprovider: ['', Validators.required],
      coursecharge: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      exchangerate: ['', Validators.required],
      perdiem: ['', Validators.required],
      total: ['', Validators.required],
      status: ['', Validators.required],
      reviewedby: ['', Validators.required]
    });
    // this.loadOneEmployee(this.addRequestFormModal.value.employeeid);
    console.log(this.addRequestFormModal.value.employeeid);
    this.modalRef = this.ModalService.show(template, {class: 'modal-lg'});
  }

  openViewRequestModal(d, template: TemplateRef<any>) {
    this.RequestFormModal = this.formBuilder.group({
      employeeid: [d.employeeid],
      employeename: [d.employeename],
      rank: [d.rank],
      type: [d.type],
      perdiem: [d.perdiem],
      invoice: [d.invoice],
      total: [d.total],
      travelagent: [d.travelagent],
      medicalfacility: [d.medicalfacility],
      visafees: [d.visafees],
      courseprovider: [d.courseprovider],
      coursecharge: [d.coursecharge],
      exchangerate: [d.exchangerate],
      visa: [d.visa],
      datefrom: [d.datefrom],
      dateto: [d.dateto],
      currency: [d.currency],
      status: [d.status],
      reviewedby: [d.reviewedby],
      amount: [d.amount],
    });
    this.modalRef = this.ModalService.show(template, {class: 'modal-lg'});
  }

  loadOneEmployee(d) {
    console.log(this.addRequestFormModal.value.employeeid);
    this.employeeDataList = {};
    this.userService.loadOneEmployee(d).subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.employeeDataList = this.something.message;
      console.log(this.employeeDataList[0].employeename);

      this.addRequestFormModal.patchValue({
        employeename: this.employeeDataList[0].employeename,
        rank: this.employeeDataList[0].rank
      })
    })
  } // brilliant idea but will be easier if Database where built around the concept

  loadData() {
    this.employeeDataList = {};
    this.userService.loadGraEmployee().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.employeeDataList = this.something.message;
    });

    this.requestDataList = {};
    this.userService.loadGraRequest().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.requestDataList = this.something.message;
    });

    this.medicalFacilityList = {};
    this.userService.loadGraMedicals().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.medicalFacilityList = this.something.message;
    });

    this.courseProviderList = {};
    this.userService.loadGraCourseProviders().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.courseProviderList = this.something.message;
    });

    this.currencyList = {};
    this.userService.loadexchangelist().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.currencyList = this.something;
    })
  }

  loadEmployeeID() {
    this.something = this.addRequestFormModal.value['employeeid'];
    this.loadOneEmployee(this.something);
  }

  compute() {
    this.userService.findrate(this.addRequestFormModal.value).subscribe(response => {
      this.something = response;
      console.log(this.something);

      const amount = parseFloat(this.something[0].rate) * this.addRequestFormModal.value.amount;
      this.addRequestFormModal.patchValue({
        exchangerate: this.something[0].rate,
        total: amount.toFixed(2)
      });
      this.calcPerDiem();
    })
  }
  // todo :: calculate perdiem
  calcPerDiem() {
    let days, number, pDiem, rank, userID;
    userID = sessionStorage.getItem('userID');
    const startDate = moment(this.addRequestFormModal.value['datefrom']);
    const endDate = moment(this.addRequestFormModal.value['dateto']);
    console.log(startDate);
    console.log(endDate);
    days = moment.duration(endDate.diff(startDate));
    number = days.asDays().valueOf();
    alert(number);
    // pDiem = number * 1000; // dry run
    rank = this.addRequestFormModal.value['rank'];
    console.log(rank);
    switch (rank) {
      case 'Manager':
        pDiem = number * 1000;
        break;

      case 'Auditor':
        pDiem = number * 2000;
        break;

      default:
        pDiem = number * 200;
        break;
    }
    // find rank and calculate pDiem
    // this.rankList = {};
    // this.userService.LoadGraRank().subscribe(response => {
    // this.something = response;
    // console.log(this.something);
    // });
    // TODO ::
    //  concept here is that we could have a
    //  for loop that creates a switch case for us and compares and set the appropriate rank per diem for us

    this.addRequestFormModal.patchValue({
      perdiem: pDiem.toFixed(2),
      reviewedby: userID
    })
}

  loadTravelAgents() {
    this.travelAgentList = {};
    this.userService.loadGraTravelAgent().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.travelAgentList = this.something.message;
    })
  }

  loadTravelAgentFees() {
    this.userService.findTravelAgentFees(this.addRequestFormModal.value).subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.addRequestFormModal.patchValue({
        visafees: this.something[0].visafees
      })
    })
  }

  loadCourseProviderFees() {
    this.userService.findCourseProviderFees(this.addRequestFormModal.value).subscribe(response => {
      this.something = response;

      this.addRequestFormModal.patchValue({
        coursecharge: this.something[0].amount
      })
    })
  }

  approveRequest() {
    this.addRequestFormModal.patchValue({
      status: 'Approved'
    });
    console.log(this.addRequestFormModal.value);
    // this.userService.SaveGraRequest(this.addRequestFormModal.value).subscribe( response => {
    //   if (response['status'] === 1) {
    //     this.Toast.success('Saved Successfully', 'GRA-TRACKING').then((toast) => {
    //       this.addRequestFormModal.reset();
    //       this.ngOnInit();
    //     });
    //     this.modalRef.hide();
    //   } else if (response['status'] === 0) {
    //     this.Toast.error('Unsuccessful', 'GRA-TRACKING').then((toast) => {
    //       this.addRequestFormModal.reset();
    //       this.ngOnInit();
    //     });
    //     this.modalRef.hide();
    //   }
    // })
  }

  rejectRequest() {
    this.addRequestFormModal.patchValue({
      status: 'Rejected'
    });
    this.userService.SaveGraRequest(this.addRequestFormModal.value).subscribe( response => {
      if (response['status'] === 1) {
        this.Toast.error('Unsuccessful, Application Rejected', 'GRA-TRACKING').then((toast) => {
          this.addRequestFormModal.reset();
          this.ngOnInit();
        });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.Toast.error('Unsuccessful', 'GRA-TRACKING').then((toast) => {
          this.addRequestFormModal.reset();
          this.ngOnInit();
        });
        this.modalRef.hide();
      }
    })
  }
}

