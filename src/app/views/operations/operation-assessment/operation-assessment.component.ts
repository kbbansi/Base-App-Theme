import { AdminService } from './../../../services/admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { OperationsService } from './../../../services/operations.service';
import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-operation-assessment',
  templateUrl: './operation-assessment.component.html',
  styleUrls: ['./operation-assessment.component.scss']
})
export class OperationAssessmentComponent implements OnInit {
  assessmentList: any = {};
  operationStaff: any = {};
  staffPerServiceList: any = {};
  operationServiceStaff: any = {};
  modalRef: BsModalRef;
  assignmentForm: FormGroup;
  assessmentAnalysis: any = {};
  staffForm: any = {};
  serviceList: any = {};
  constructor(private operations: OperationsService, private fb: FormBuilder, vcr: ViewContainerRef, private toastr: ToastsManager,
    private modalService: BsModalService, private admin: AdminService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.operations.getAssessment(sessionStorage.getItem('service')).subscribe(response => {
      this.assessmentList = response;
    })

    this.operations.getOperationsStaff('').subscribe(response => {
      this.operationStaff = response;
    })

    this.admin.getService().subscribe(response => {
      this.serviceList = response;
    })
  }

  assignAssessment(b, template: TemplateRef<any>) {
    this.assignmentForm = this.fb.group({
      assignee: ['', Validators.required],
      id: [b]
    })
    this.modalRef = this.modalService.show(template)
  }

  viewAssessment(b, template: TemplateRef<any>) {
    this.operations.assessmentAnalysis(b.prospect_id).subscribe(response => {
      this.assessmentAnalysis = response;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    })
  }

  saveAssign() {
    this.operations.assignmentSave(this.assignmentForm.value).subscribe(response => {
        if (response['status'] === 1) {
          this.toastr.success('Assessment Assigned Successfully', 'SERVICEgh');
          this.operations.getAssessment(sessionStorage.getItem('service')).subscribe(responseAssessment => {
            this.assessmentList = responseAssessment;
            this.modalRef.hide()
          })
        }
    })
  }

addStaff(b, template: TemplateRef<any>) {
  this.staffForm = this.fb.group({
      service: ['', Validators.required],
      staff: ['', Validators.required],
      role: ['', Validators.required],
      prospect_id: [b.prospect_id]
  })
  this.operations.staffPerService(this.staffForm.get('prospect_id').value).subscribe(responseProspect => {
    this.staffPerServiceList = responseProspect;
    this.modalRef = this.modalService.show(template)
})

}

  saveStaff() {
    this.operations.staffServiceSave(this.staffForm.value).subscribe(response => {
      if (response['status' ] === 1) {
        this.toastr.success('', 'SERVICEgh');
          this.operations.staffPerService(this.staffForm.get('prospect_id').value).subscribe(responseProspect => {
            this.staffPerServiceList = responseProspect;
            this.staffForm.get('service').reset();
            this.staffForm.get('staff').reset();
            this.staffForm.get('role').reset();
          })
      }
    })
  }

  others(b, template: TemplateRef<any>) {

  }

  selectStaff() {
    this.operations.staffService(this.staffForm.get('service').value).subscribe(response => {
        this.operationServiceStaff = response;
    })
  }



}
