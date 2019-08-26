import { OperationsService } from './../../../services/operations.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ServiceService } from './../../../services/service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingService } from './../../../services/marketing.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-marketing-manager-assessment',
  templateUrl: './marketing-manager-assessment.component.html',
  styleUrls: ['./marketing-manager-assessment.component.scss']
})
export class MarketingManagerAssessmentComponent implements OnInit {

  myprospectList: any = {};
  assessmentList: any = {};
  modalRef: BsModalRef;
  serviceList: any = {};
  staffTotal = 0;
  projectStaff: any = {};
  detailsTotal = 0;
  othersTotal = 0;
  grandStaffTotal = 0;
  whatType;
  acceptedForm: FormGroup;
  fileDetails: any = {};
  // typeSelected; /** Type of assessment, whether monthly or one-time */

  loading = false;
  assessmentAnalysis: any = {};



  /** Modal Arrays */
  modalDetails: any = [];
  modalOthers: any = [];

  constructor(private marketing: MarketingService, private fb: FormBuilder, private modalService: BsModalService,
    private service: ServiceService, public toastr: ToastsManager, vcr: ViewContainerRef, private operations: OperationsService) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.marketing.getMyProspect().subscribe(response => {
      this.myprospectList = response;
    });

    this.marketing.getAssessmentStatus().subscribe(response => {
      this.assessmentList = response;
    })


  }

  viewAssessment(b, template: TemplateRef<any>) {
    console.log(b);
    // this.typeSelected = b.type;
    this.modalDetails = [];
    this.modalOthers = [];
    this.operations.assessmentAnalysis(b.id).subscribe(response => {
      this.whatType = b.type;
      // console.log(this.whatType);
      this.assessmentAnalysis = response;
      this.assessmentAnalysis.details.forEach(element => {
          if (element.finding === null) {
              this.modalOthers.push(element);
              this.calcOthersTotal(this.whatType, element)
              /* this.othersTotal += element.amount*/
          } else {
            this.modalDetails.push(element);
            /** this.detailsTotal += element.amount */
            this.calcDetailsTotal(this.whatType, element);
          }
      });

      this.marketing.getStaffTotal(b.id, b.type).subscribe(responseStaff => {
            this.projectStaff = responseStaff;
            this.grandStaffTotal = this.getStaffTotal();
            // console.log(responseStaff)
            // if (b.type === 'One-time') {
            //   this.grandStaffTotal = this.getStaffDailyTotal();
            // } else {
            //   this.grandStaffTotal = this.getStaffMonthlyTotal();
            // }
            this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
          })


      /** this.modalRef = this.modalService.show(template, {class: 'modal-lg'}); */
    })
  }
  calcOthersTotal (a, b) {
    if (a === 'One-time') {
      this.othersTotal += b.one_time_total;
    } else {
      this.othersTotal += b.monthly_total
    }

  }
  calcDetailsTotal (a, b) {
    if (a === 'One-time') {
      this.detailsTotal += b.one_time_total;
    } else {
      this.detailsTotal += b.monthly_total
    }
  }

/** Get Total Daily Rate */

  getStaffTotal() {
    let t = 0;
    this.projectStaff.forEach(element => {
        t += parseFloat(element.amount)
    });
    return t;
  }

/** Get Total Monthly Rate */

  getStaffMonthlyTotal() {
    let t = 0;
    this.projectStaff.forEach(element => {
       t += parseFloat(element.monthly_rate)
    });
    return t;
 }


  getTotal(d) {
    let t = 0;
    if (this.whatType === 'One-time') {
      d.forEach(element => {
        t += element.one_time_total;
     });
    } else {
      d.forEach(element => {
        t += element.monthly_total;
     });
    }

    return t;
  }

  // getTotals() {
  //   d.forEach(element => {
  //     t += element.amount;
  //  });
  // }


  addStaff(a, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  approveAssessment (a) {
    this.marketing.assessment_approval(a.id, sessionStorage.getItem('staff_id')).subscribe(response => {
        if (response['status'] === 1) {
            this.marketing.getAssessmentStatus().subscribe(responseAssessment => {
              this.assessmentList = responseAssessment;
              this.toastr.success('Assessment Approval Successful', 'SERVICEgh');
            })
        }
    })
  }

  /** Accept Assessment and change approved assessment to project */
  acceptAssessment(d, template) {
    console.log(d);
    this.acceptedForm = this.fb.group({
      prospect: [d.name],
      file: [''],
      prospect_id: [d.prospect_id],
      project_id: ['', Validators.required],
      assessment_id: [d.id],
      avatar: null
    })
    this.modalRef = this.modalService.show(template);
  }

  saveContract() {
    this.loading = true;
      // this.marketing.saveContract(this.acceptedForm.value).subscribe(response => {
      //     if (response['status'] === 1) {
      //       this.modalRef.hide();
      //       this.loading = false;
      //     } else {

      //     }
      // })
  }


  // onFileChange(event) {

  // }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileDetails = ({
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          })
        // this.acceptedForm.get('avatar').patchValue
        // ({
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // })
        // console.log(this.acceptedForm.value)
        console.log(this.fileDetails);
      };
    }
  }
}
