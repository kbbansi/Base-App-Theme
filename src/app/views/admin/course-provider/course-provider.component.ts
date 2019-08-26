import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AdminService} from '../../../services/admin.service';
import {ToastsManager} from 'ng2-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-course-provider',
  templateUrl: './course-provider.component.html',
  styleUrls: ['./course-provider.component.scss']
})
export class CourseProviderComponent implements OnInit {
  courseProvidersModalForm: FormGroup;
  courseProvidersList: any = {};
  modalRef: BsModalRef;
  something: any = {};
  constructor(private userService: UserService, private admin: AdminService,  private toastr: ToastsManager, vcr: ViewContainerRef,
              private modalservice: BsModalService, private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.loadCourseProviders();
  }
  openCourseProviderModal(template: TemplateRef<any>) {
    this.courseProvidersModalForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.modalRef = this.modalservice.show(template);
  }

  saveGraCourseProvider() {
    this.userService.saveGraCourseProvider(this.courseProvidersModalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        console.log(response['status']);
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

  loadCourseProviders () {
    this.courseProvidersList = {};
    this.userService.loadGraCourseProviders().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.courseProvidersList = this.something.message;
    })
  }
}
