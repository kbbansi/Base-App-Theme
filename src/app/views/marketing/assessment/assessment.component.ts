import { AdminService } from './../../../services/admin.service';
import { ServiceService } from './../../../services/service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MarketingService } from './../../../services/marketing.service';
import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  myprospectList: any = {};
  assessmentList: any = {};
  assessmentServices: any = {};
  modalRef: BsModalRef;
  serviceList: any = {};
  servicesForm: FormGroup;
  constructor(private marketing: MarketingService, private fb: FormBuilder, private modalService: BsModalService,
    private service: ServiceService, public toastr: ToastsManager, vcr: ViewContainerRef, private admin: AdminService) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.marketing.getMyProspect().subscribe(response => {
      this.myprospectList = response;
    });

    this.marketing.getAssessmentStatus().subscribe(response => {
      this.assessmentList = response;
    })

    this.admin.getService().subscribe(response => {
      this.serviceList = response;
    })
  }

  saveService() {
    this.marketing.saveAssessmentServices(this.servicesForm.value).subscribe(response => {
        if (response['status'] === 1) {
          this.marketing.getAssessmentServices(this.servicesForm.get('assessment_id').value).subscribe(responseService => {
            this.assessmentServices = responseService;
            this.servicesForm.get('service').reset();
          })
        }
    })
  }

  addService(d, template: TemplateRef<any>) {
    this.servicesForm = this.fb.group({
      prospect: [d.name],
      service: ['', Validators.required],
      assessment_id: [d.id],
      prospect_id: [d.prospect_id]
    });

      this.marketing.getAssessmentServices(d.id).subscribe(response => {
        this.assessmentServices = response;
        this.modalRef = this.modalService.show(template);
      })
  }



}
