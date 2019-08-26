import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {UserService} from '../../../services/user.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-travelagents',
  templateUrl: './travelagents.component.html',
  styleUrls: ['./travelagents.component.scss']
})
export class TravelagentsComponent implements OnInit {
  travelAgentsModalForm: FormGroup;
  travelAgentsList: any = {};
  modalRef: BsModalRef;
  something: any = {};

  constructor(private userService: UserService, private Toaster: ToastsManager, vcr: ViewContainerRef,
              private modalService: BsModalService, private formBuilder: FormBuilder) {
    this.Toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.loadTravelAgents();
  }

  openTravelAgentsModal(template: TemplateRef<any>) {
    this.travelAgentsModalForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      mobileno: ['', Validators.required],
      visafees: ['', Validators.required],
    });
    this.modalRef = this.modalService.show(template)
  }

  saveGraTravelAgent() {
    this.userService.saveGraTravelAgent(this.travelAgentsModalForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.Toaster.success('Saved Successfully', 'GRA-TRACKING').
        then((toast) => {
          this.travelAgentsModalForm.reset();
          this.ngOnInit();
        });
        this.modalRef.hide();
      } else if (response['status'] === 0) {
        this.Toaster.error('Unsuccessful', 'GRA-TRACKING')
          .then((toast) => {
            this.travelAgentsModalForm.reset();
            this.ngOnInit();
          });
        this.modalRef.hide();
      }
    })
  }

  loadTravelAgents() {
    this.travelAgentsList = {};
    this.userService.loadGraTravelAgent().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.travelAgentsList = this.something.message;
    })
  }
}
