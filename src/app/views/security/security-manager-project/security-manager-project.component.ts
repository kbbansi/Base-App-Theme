import { MarketingService } from './../../../services/marketing.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { OperationsService } from '../../../services/operations.service';

@Component({
  selector: 'app-security-manager-project',
  templateUrl: './security-manager-project.component.html',
  styleUrls: ['./security-manager-project.component.scss']
})
export class SecurityManagerProjectComponent implements OnInit {
  projectList: any = {};
  incidentForm: FormGroup;
  requestForm: FormGroup;
  staffForm: FormGroup;
  othersForm: FormGroup;
  transferForm: FormGroup;
  disciplinaryForm: FormGroup;
  replacementForm: FormGroup;
  modalRef: BsModalRef;
  projectStaffList: any = {};
  staffList: any  = {};
  itemList: any = {};
  constructor(private fb: FormBuilder, vcr: ViewContainerRef, private toastr: ToastsManager,
    private modalService: BsModalService, private marketing: MarketingService, private operations: OperationsService) {
    // this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.marketing.getProject().subscribe(response => {
      this.projectList = response;
    })

    this.operations.staffService(sessionStorage.getItem('service')).subscribe(response => {
      this.staffList = response;
    })
  }

  incident(a, template: TemplateRef<any>) {
    this.incidentForm = this.fb.group({
      type: ['', Validators.required],
      staff: ['', Validators.required],
      note: ['', Validators.required],
      category: ['', Validators.required]
    })
    this.modalRef = this.modalService.show(template);

    this.operations.getProjectStaff(a.id).subscribe(response => {
      this.projectStaffList = response;
    })

  }
  request(a, template: TemplateRef<any>) {
    this.requestForm = this.fb.group({
      item: ['', Validators.required],
      quantity: ['', Validators.required]
    })

    this.operations.getProjectLogistics(a.id).subscribe(response => {
      this.itemList = response;
      this.modalRef = this.modalService.show(template)
    })

  }
  staff(a, template: TemplateRef<any>) {
    this.transferForm = this.fb.group({
        staff: ['', Validators.required],
        project: ['', Validators.required]
    })
    this.replacementForm = this.fb.group({
      staff: ['', Validators.required],
      other: ['', Validators.required],
      note: ['', Validators.required]
    })
    this.disciplinaryForm = this.fb.group({
      staff: ['', Validators.required],
      note: ['', Validators.required]
    })
    this.modalRef = this.modalService.show(template)
    this.operations.getProjectStaff(a.id).subscribe(response => {
      this.projectStaffList = response;
    })

  }
  others(a, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  /** Save Incidents */
  saveIncident() {

  }

  /** Save Requests */
  saveRequest() {

  }

  /** Save Staff Transfer */
  saveTransfer() {

  }

}
