import { BsModalRef , BsModalService} from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr';
import { AdminService } from '../../../services/admin.service';
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  // empty json objects to hold data
  activeOfficersList: any = {};
  travelAgentsList: any = {};
  courseProvidersList: any = {};
  incentivesList: any = {};
  departmentList: any = {};
  rankList: any = {};
  unitList: any = {};
  organizationsList: any = {};
  officeLocationList: any = {};
  coursesList: any = {};
  organizations: any;
  modalRef: BsModalRef;

  // form groups to handle all form requests
  activeUsersFormModal: FormGroup;
  organizationFormModal: FormGroup;
  travelAgentsModalForm: FormGroup;
  courseProvidersModalForm: FormGroup;
  incentivesModalForm: FormGroup;
  coursesModalForm: FormGroup;
  something: any;
  activeOfficers: any;
  travelAgents: any;
  courseProviders: any;
  courseslist: any;




  constructor(private userservice: UserService, private admin: AdminService,  private toastr: ToastsManager, vcr: ViewContainerRef,
  private modalservice: BsModalService, private fb: FormBuilder) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.activeOfficers = this.loadActiveOfficers();
    // this.courseProviders = this.loadCourseProviders();
    this.organizations = this.loadOrganizations();
    this.courseslist = this.loadCourses();
    this.courseProvidersList = this.loadCourseProviders();
    this.travelAgents = this.loadTravelAgents();
    this.loaditems();

  }
  // form modals
  // Officer Modal
  openOfficerModal(template: TemplateRef<any>) {
    this.activeUsersFormModal = this.fb.group({
      employeeid: ['', Validators.required],
      name: ['', Validators.required],
      department: ['', Validators.required],
      unit: ['', Validators.required],
      rank: ['', Validators.required],
      officelocation: ['', Validators.required],
      mobileno: ['', Validators.required]
    });
    this.modalRef = this.modalservice.show(template);
  }

  loaditems() {
    this.departmentList = {};
    this.userservice.loadGraDepartment().subscribe(response => {

      this.something = response;

      console.log(this.something);
      this.departmentList = this.something.message;
    });

    this.rankList = {};
    this.userservice.loadranklist().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.rankList = this.something.message;
    });

     this.unitList = {};
     this.userservice.loadunitlist().subscribe( response => {
       this.something = response;
       console.log(this.something);
       this.unitList = this.something.message;
     });

     this.officeLocationList = {};
     this.userservice.loadofficelocationlist().subscribe(response => {
       this.something = response;
       console.log(this.something);
       this.officeLocationList = this.something.message;
     });

     this.courseProvidersList = {};
     this.userservice.loadcourseproviderlist().subscribe(response => {
       this.something = response;
       this.courseProvidersList = this.something.message;
     })
  }

  saveGraEmployee() {
    this.userservice.saveGraEmployee(this.activeUsersFormModal.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'GRA-TRACKING')
          .then((toast) => {
            this.activeUsersFormModal.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.activeUsersFormModal.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }

  openOrganizationModal(template: TemplateRef<any>) {
    this.organizationFormModal = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      telno: ['', Validators.required],
      financialyear: ['', Validators.required]
    });
    this.modalRef = this.modalservice.show(template);
  }

  saveGraOrganization() {
    this.userservice.saveGraOrganization(this.organizationFormModal.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'GRA-TRACKING')
          .then((toast) => {
            this.organizationFormModal.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.organizationFormModal.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }

  openCourseProviderModal(template: TemplateRef<any>) {
    this.courseProvidersModalForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.modalRef = this.modalservice.show(template);
  }

  saveGraCourseProvider() {
    this.userservice.saveGraCourseProvider(this.courseProvidersModalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'GRA-TRACKING')
          .then((toast) => {
            this.courseProvidersModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.courseProvidersModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }

  openTravelAgentsModal(template: TemplateRef<any>) {
    this.travelAgentsModalForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.modalRef = this.modalservice.show(template);
  }

  saveGraTravelAgent() {
    this.userservice.saveGraTravelAgent(this.travelAgentsModalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'GRA-TRACKING')
          .then((toast) => {
            this.travelAgentsModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.travelAgentsModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }

  openCoursesModal(template: TemplateRef<any>) {
    this.coursesModalForm = this.fb.group({
      courseid: ['', Validators.required],
      coursetitle: ['', Validators.required],
      description: ['', Validators.required],
      courseproviderid: ['', Validators.required]
    });
    this.modalRef =  this.modalservice.show(template);
  }

  saveGraCourse() {
    this.userservice.saveGraCourse(this.coursesModalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Saved Successfully', 'GRA-TRACKING')
          .then((toast) => {
            this.coursesModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.toastr.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.coursesModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }


  // some UI gimmicks
  loadCourseProviders () {
    this.courseProvidersList = {};
    this.userservice.loadGraCourseProviders().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.courseProvidersList = this.something.message;
    })
  }

  loadOrganizations () {
    this.organizationsList = {};
    this.userservice.loadGraOrganization().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.organizationsList = this.something.message;
    })
  }

  loadCourses () {
    this.coursesList = {};
    this.userservice.loadGraCourses().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.coursesList = this.something.message;
    })
  }

  loadTravelAgents () {
    this.travelAgentsList = {};
    this.userservice.loadGraTravelAgent().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.travelAgentsList = this.something.message;
    })
  }

  loadActiveOfficers() {
    this.activeOfficersList = {};
    this.userservice.loadGraEmployee().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.activeOfficersList = this.something.message;
    })
  }
}
