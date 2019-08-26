import { AdminService } from './../../../services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationsService } from './../../../services/operations.service';
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-security-manager-staff',
  templateUrl: './security-manager-staff.component.html',
  styleUrls: ['./security-manager-staff.component.scss']
})
export class SecurityManagerStaffComponent implements OnInit {
  staffList: any = {};
  modalRef: BsModalRef;
  logisticsDetails: FormGroup;
  categoryList: any = {};
  itemList: any = {};
  logisticsHistory: any = {};
  constructor(private operations: OperationsService, private fb: FormBuilder, vcr: ViewContainerRef, private toastr: ToastsManager,
    private modalService: BsModalService, private admin: AdminService ) {

   }

  ngOnInit() {
    this.operations.staffServiceLoad(sessionStorage.getItem('service')).subscribe(response => {
      this.staffList = response;
    })
  }

  addLogistics(d, template: TemplateRef<any>) {

// console.log(d);
    this.logisticsDetails = this.fb.group({
      category: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      staff_id: [d.id],
      debit: ['0'],
      type: ['New Item'],
      username: [sessionStorage.getItem('user')]
    })
    this.admin.getLogistics().subscribe(response => {
      this.categoryList = response;
    })

    this.modalRef = this.modalService.show(template);
  }

  getItemList () {
    this.operations.getCategoryItem(this.logisticsDetails.get('category').value).subscribe(response => {
      this.itemList = response;
    })
  }



  saveLogistics() {
    this.operations.staffLogisticsSave(this.logisticsDetails.value).subscribe(response => {
      this.toastr.success('Logistics Disbursed Successfully', 'SERVICEgh')
      this.modalRef.hide();
    })
  }

  viewLogistics(d, template: TemplateRef<any>) {
    this.operations.staffLogisticsHistory(d.id).subscribe(response => {
      this.logisticsHistory = response;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    })
  }

  /** View all incidents of a staff */
  viewIncidents(d , template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

}
