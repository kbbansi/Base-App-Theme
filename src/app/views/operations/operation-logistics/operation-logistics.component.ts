import { AdminService } from './../../../services/admin.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationsService } from './../../../services/operations.service';
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-operation-logistics',
  templateUrl: './operation-logistics.component.html',
  styleUrls: ['./operation-logistics.component.scss']
})
export class OperationLogisticsComponent implements OnInit {
  itemsList: any = {};
  categoryList: any = {};
  itemForm: FormGroup;
  modalRef: BsModalRef;
  constructor(private operations: OperationsService, private fb: FormBuilder, private modalService: BsModalService,
    public toastr: ToastsManager, vcr: ViewContainerRef, private admin: AdminService) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.operations.getItems().subscribe(response => {
      this.itemsList = response;
    })

    this.admin.getLogistics().subscribe(response => {
      this.categoryList = response;
    })
  }

  /** Open Item Modal */
  openItems(template: TemplateRef<any>) {
    this.itemForm = this.fb.group({
      type: ['', Validators.required],
      item: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.modalRef = this.modalService.show(template);
  }

  /** Save item */
  saveItem() {
    this.operations.itemSave(this.itemForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Item Successfully Save', 'SERVICEgh');
        this.operations.getItems().subscribe(responseItem => {
          this.itemsList = responseItem;
          this.modalRef.hide();
        })

      }
    })
  }

  /**  */

}
