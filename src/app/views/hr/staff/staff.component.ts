import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HrService } from './../../../services/hr.service';
import { ServiceService } from './../../../services/service.service';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  departmentList: any = {};
  serviceList: any = {};
  staffList: any = {};
  dash: any = {};
  gender: any = {};
  selectedDepartment: any = {};
  selectedService: any = {};
  staffDetails: FormGroup;
  constructor(private admin: AdminService, private service: ServiceService, private fb: FormBuilder, private hr: HrService,
  public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
      this.createForm();
  }

  ngOnInit() {
    this.admin.getDepartment().subscribe(response => {
      this.departmentList = response;
    })
    this.service.getService().subscribe(response => {
      this.serviceList = response;
    })
    
    this.hr.getStaff().subscribe(response => {
      this.staffList = response;
    })

    this.hr.getDash().subscribe(response => {
      this.dash = response;
      if (this.dash.gender[0].gender === 'Female') {
          this.gender.female = this.dash.gender[0].total;
          this.gender.male = this.dash.gender[1].total
      } else {
        this.gender.male = this.dash.gender[0].total
        this.gender.female = this.dash.gender[1].total
      }
    })

  }



  createForm() {
    this.staffDetails = this.fb.group({
       firstname: ['', Validators.required],
       lastname: ['', Validators.required],
       gender: ['', Validators.required],
       mobile: ['', Validators.required],
       department: ['', Validators],
       service: ['', Validators.required],
       address: ['', Validators.required],
       staff_id: ['', Validators.required],
       email: ['', Validators.required]
    })
  }

  saveStaff() {
    this.hr.staffSave(this.staffDetails.value).subscribe(response => {
        if (response['status'] === 1) {
          this.toastr.success('Save Successful', 'SERVICEgh')
          .then((toast) => {
            this.staffDetails.reset();
            this.ngOnInit();
          })
        }
    })
  }

  viewDepartment(d) {
      this.hr.getDepartment(d).subscribe(response => {
        this.selectedDepartment = response;
      })
  }

  viewService(d) {
    this.hr.getService(d).subscribe(response => {
        this.selectedService = response;
    })
  }

}
