import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarketingService } from './../../../services/marketing.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { OperationsService } from '../../../services/operations.service';

@Component({
  selector: 'app-marketing-manager-prospect',
  templateUrl: './marketing-manager-prospect.component.html',
  styleUrls: ['./marketing-manager-prospect.component.scss']
})
export class MarketingManagerProspectComponent implements OnInit {
  officerList: any = {};
  prospectList: any = {};
  prospectDetails: FormGroup;
  modalRef: BsModalRef;
  historyList: any = {};
  officerDash: any = {};

  assessmentAnalysis: any = {};
  constructor(private marketing: MarketingService, private fb: FormBuilder, private modalService: BsModalService,
  private operations: OperationsService) { }

  ngOnInit() {
    this.marketing.getProspect().subscribe(response => {
      this.prospectList = response;
    });

    this.marketing.getOfficerTotal().subscribe(response => {
      this.officerList = response;
    });

    this.marketing.officerDash().subscribe(response => {
      this.officerDash = response;
    })


  }

  createProspectForm () {
    this.prospectDetails = this.fb.group({
      name: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_email: ['', Validators.required],
      contact_mobile: ['', Validators.required],
      salesperson: [''],
      staff_id: [''],
      username: [],
      last_contact: [],


    })
   }
  // viewProspectDetails(a, b) {

  // }

   /** View Prospect Details */
   viewProspectDetails(d, template: TemplateRef<any>) {
      this.marketing.getProspectDetails(d).subscribe(response => {
        this.createProspectForm();
        this.prospectDetails.patchValue(response[0]);
        this.prospectDetails.disable();
        this.modalRef = this.modalService.show(template)
      })
  }

  viewHistory(d, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
      this.marketing.getProspectHistory(d.id).subscribe(response => {
          this.historyList = response;
      })
   }

   viewAssessment(b, template: TemplateRef<any>) {
    this.operations.assessmentAnalysis(b.prospect_id).subscribe(response => {
      this.assessmentAnalysis = response;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});

    })
  }
}
