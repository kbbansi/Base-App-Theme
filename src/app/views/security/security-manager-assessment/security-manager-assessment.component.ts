import { AdminService } from './../../../services/admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OperationsService } from './../../../services/operations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-security-manager-assessment',
  templateUrl: './security-manager-assessment.component.html',
  styleUrls: ['./security-manager-assessment.component.scss']
})
export class SecurityManagerAssessmentComponent implements OnInit {

  assessmentList: any = {};
  operationStaff: any = {};
  staffPerServiceList: any = {};
  operationServiceStaff: any = {};
  categoryList: any = {};
  modalRef: BsModalRef;
  assignmentForm: FormGroup;
  logisticsForm: FormGroup;
  assessmentAnalysisList: any = {};
  roleList: any = {};
  staffForm: any = {};
  serviceList: any = {};
  itemList: any = [];
  itemSelected: any = [];

  /** Modal Arrays */
  modalDetails: any = [];
  modalOthers: any = [];

  /** end of Modal Arrays */
  constructor(private operations: OperationsService, private fb: FormBuilder, vcr: ViewContainerRef, private toastr: ToastsManager,
    private modalService: BsModalService, private admin: AdminService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.operations.getAssessment(sessionStorage.getItem('service')).subscribe(response => {
      this.assessmentList = response;
    })

    this.operations.getOperationsStaff(sessionStorage.getItem('service')).subscribe(response => {
      this.operationStaff = response;
    })

    this.operations.staffService(sessionStorage.getItem('service')).subscribe(response => {
      this.operationServiceStaff = response;
    })

    this.admin.getService().subscribe(response => {
      this.serviceList = response;
    })

    this.admin.getLogistics().subscribe( response => {
      this.categoryList = response;
    })
    this.operations.getItems().subscribe(response => {
      this.itemSelected = response;
    })

    this.admin.getTeam().subscribe(response => {
      this.roleList = response;
    })
  }

  /**
   *  assessment_id: req.body.assessment_id,
                          staff_id: req.body.assignee,
                          prospect_id: req.body.prospect_id,
                          note: req.body.note,
                          date: new Date().toJSON().substr(0,10),
                          status: 'Assigned',
                          service_id: req.body.service_id
   */

  assignAssessment(b, template: TemplateRef<any>) {
    // console.log(b);
    this.assignmentForm = this.fb.group({
      assignee: ['', Validators.required],
      assessment_id: [b.assessment_id],
      prospect_id: [b.prospect_id],
      note: [''],
      service_id: [b.service_id],
      id: [b],
      user: [sessionStorage.getItem('staff_id')]
    })
    this.modalRef = this.modalService.show(template)
  }

  viewAssessment(b, template: TemplateRef<any>) {
    this.modalDetails = [];
    this.modalOthers = [];
    this.operations.assessmentAnalysis(b.assessment_id).subscribe(response => {
      this.assessmentAnalysisList = response;
      this.assessmentAnalysisList.details.forEach(element => {
          if (element.finding === null) {
              this.modalOthers.push(element);
          } else {
            this.modalDetails.push(element);
          }
      });


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
      service: [sessionStorage.getItem('service')],
      staff: ['', Validators.required],
      role: ['', Validators.required],
      prospect_id: [b.prospect_id],
      assessment_id: [b.assessment_id]
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


  selectStaff() {
    this.operations.staffService(this.staffForm.get('service').value).subscribe(response => {
        this.operationServiceStaff = response;
    })
  }

  addLogistic(a, template: TemplateRef<any>) {
    this.logisticsForm = this.fb.group({
      category: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      prospect_id: [a.prospect_id]
    })
    this.modalRef = this.modalService.show(template)
  }

  saveLogistics() {
      this.operations.saveOtherLogistics(this.logisticsForm.value).subscribe(response => {
        if (response['status'] === 1) {
            this.toastr.success('Logistics Added Successfully', 'SERVICEgh');
            this.modalRef.hide();
        }
      })
  }

  getItem() {
    // console.log(this.logisticsForm.get('category').value);
    // console.log('ghana');
    // this.operations.getItems().subscribe(response => {
    //   const obj: any = response;
    //   this.itemList = [];
    //   // console.log(obj.length);
    //   obj.forEach(element => {
    //     console.log(element);
    //       if ( element.type === this.logisticsForm.get('category').value ) {
    //           this.itemList.push(element)
    //           console.log(element);
    //       }
    //   });
    // })

    this.itemList = [];
    this.itemSelected.forEach(element => {
      if ( element.type === this.logisticsForm.get('category').value ) {
                  this.itemList.push(element)
              }
    });
  }

}
