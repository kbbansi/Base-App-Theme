import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any = {};
  something: any = {};
  userTypes: any = {};
  userDetails: FormGroup;
  constructor(private user: AdminService, private fb: FormBuilder, private toaster: ToastsManager,
              private modalservice: BsModalService, vcr: ViewContainerRef) {
    this.createForm();
    this.toaster.setRootViewContainerRef(vcr)
  }

  ngOnInit() {
    this.user.getUsers().subscribe(response => {
      this.something = response;
      this.userList = this.something.message;
    });

    this.user.getUserTypes().subscribe(response => {
      this.something = response;
      this.userTypes = this.something.message;
    })
  }

  changeType(data: string) {
    return data.replace('_', ' ');
  }

  createForm() {
    this.userDetails = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      usertype: ['', Validators.required]
    });
   // this.modalRef = this.modalservice.show(template);

  }

  saveForm() {
    this.user.addUser(this.userDetails.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toaster.success('Saved', 'GRA-TRACKING').then((toast) => {
          this.userDetails.reset();
          this.ngOnInit();
        });
      } else if (response['status'] === 0) {
        this.toaster.error('Unsuccessful', 'GRA-TRACKING').then((toast) => {
          this.userDetails.reset();
          this.ngOnInit();
        })
      }
    })
  }

}
