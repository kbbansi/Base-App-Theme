import { ServiceService } from './../../../services/service.service';
import { MarketingService } from './../../../services/marketing.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit , TemplateRef, ViewContainerRef} from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {
  prospectUpdate: FormGroup;
  prospectDetails: FormGroup;
  prospectList: any = {};
  myprospectList: any = {};
  officerDash: any = {};
  historyList: any = {};
  serviceList: any = {};
  assessmentServices: any = {};
  modalRef: BsModalRef;
  editable  = 'Save';
  assessmentDetails: FormGroup;


  constructor(private fb: FormBuilder, private marketing: MarketingService, private modalService: BsModalService,
    public toastr: ToastsManager, vcr: ViewContainerRef, private service: ServiceService) {
      this.toastr.setRootViewContainerRef(vcr);
    this.createForm();

   }

   createProspectForm () {

    this.prospectDetails = this.fb.group({
      name: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_email: ['', Validators.required],
      contact_mobile: ['', Validators.required],
      salesperson: [''],
      staff_id: [''],
      username: [sessionStorage.getItem('user')],
      last_contact: [new Date().toJSON().substr(0, 10)],


    })
   }
   /** Modal */
    openModal(template: TemplateRef<any>) {
      this.editable  = 'Save';
      this.createProspectForm()
      this.modalRef = this.modalService.show(template);
    }

  ngOnInit() {
    this.getInit();
        this.createAssessmentForm();
        this.service.getService().subscribe(response => {
          this.serviceList = response;
        })

  }

  /** Get  */
  getInit() {
      /** */
          this.marketing.getProspect().subscribe(response => {
          this.prospectList = response
        })
      /** */
        this.marketing.getMyProspect().subscribe(response => {
          this.myprospectList = response;
        })
      /** */
        this.marketing.officerDash().subscribe(response => {
          this.officerDash = response;
        })
  }
  /** */
  createForm() {
    this.prospectUpdate = this.fb.group({
      name: ['', Validators.required],
      activity: ['', Validators.required],
      notes: ['', Validators.required],
      prospect_id: [''],
      username: [sessionStorage.getItem('user')],
      next_date: [new Date().toJSON().substr(0, 10)]
    })
  }

    /** */
    viewProspect(d) {
        this.prospectUpdate.patchValue(d);
        this.prospectUpdate.get('prospect_id').setValue(d.id);
    }

    /** */
    saveActivity() {
      this.marketing.activitySave(this.prospectUpdate.value).subscribe(response => {
          if (response['status'] === 1) {
            this.toastr.success('Save Successful', 'SERVICEgh');
            this.prospectUpdate.reset();
          }
      })
    }

    /** */
    onHidden(): void {
      console.log('Dropdown is hidden');
    }
    onShown(): void {
      console.log('Dropdown is shown');
    }
    isOpenChange(): void {
      console.log('Dropdown state is changed');
    }

    /** New Prospect */
    /** Save New Prospect */
    saveProspect() {
        this.marketing.prospectSave(this.prospectDetails.value).subscribe(response => {
          if (response['status'] === 1) {
            this.toastr.success('Save Successful', 'SERVICEgh')
            .then((toast) => {
              setTimeout(() => {
                  this.prospectDetails.reset();
                  this.toastr.dismissToast(toast);
                  this.getInit();
              }, 1000);
          });
            this.modalRef.hide();
        }
      })
    }

    // openModal(template: TemplateRef<any>) {
    //   this.modalRef = this.modalService.show(template);

    /** View Prospect Details */
    viewProspectDetails(d, template: TemplateRef<any>) {
      this.editable = '';
        this.marketing.getProspectDetails(d).subscribe(response => {
          this.createProspectForm();
          this.prospectDetails.patchValue(response[0]);
          this.prospectDetails.disable();
          this.modalRef = this.modalService.show(template)
        })
    }

    editProspectDetails(d, template: TemplateRef<any>) {
      this.marketing.getProspectDetails(d).subscribe(response => {
        this.editable  = 'Update';
        this.createProspectForm();
        this.prospectDetails.patchValue(response[0]);
        this.modalRef = this.modalService.show(template)
      })
    }

   /** View Prospect History */
   viewHistory(d, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
      this.marketing.getProspectHistory(d.id).subscribe(response => {
          this.historyList = response;
      })
   }


   /** Update Prospect */
   updateProspect() {

   }


   /** Assessment */
   createAssessmentForm() {
    this.assessmentDetails = this.fb.group({
      name: [''],
      prospect: [''],
      prospect_id: [''],
      type: ['', Validators.required],
      assignTo: [sessionStorage.getItem('staff_id')]
    });
}

  /** Modal */
  openAssessmentRequest(template: TemplateRef<any>, d) {
    this.createAssessmentForm();
    this.assessmentDetails.get('name').setValue(d.name);
    this.assessmentDetails.get('prospect').setValue(d.name)
    this.assessmentDetails.get('prospect').disable();

    this.assessmentDetails.get('prospect_id').setValue(d.id);
    this.modalRef = this.modalService.show(template);

    this.marketing.getAssessmentServices(d.id).subscribe(response => {
      this.assessmentServices = response;
    })


  }

  /** Save Assessment Request */
  saveRequest() {
    this.marketing.assessmentSave(this.assessmentDetails.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Save Successful', 'SERVICEgh');
        this.modalRef.hide();
        // console.log(this.assessmentDetails.get('prospect_id').value)
        // this.marketing.getAssessmentServices(this.assessmentDetails.get('prospect_id').value).subscribe(responseService => {
        //   this.assessmentServices = responseService;
        //   this.assessmentDetails.get('service').reset();
        // })
      }
    })
  }

  /** Save Services of Assessment */




}
