import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OperationsService } from './../../../services/operations.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-security-manager-logistics',
  templateUrl: './security-manager-logistics.component.html',
  styleUrls: ['./security-manager-logistics.component.scss']
})
export class SecurityManagerLogisticsComponent implements OnInit {
  stockList: any = {};
  modalRef: BsModalRef;
  historyList: any = {};
  itemList: any = {};
  constructor(private operations: OperationsService, private modalService: BsModalService, private admin: AdminService) { }

  ngOnInit() {
    this.operations.getLogisticsBalance(sessionStorage.getItem('service')).subscribe(response => {
      this.stockList = response;
    })
    this.operations.getItems().subscribe(response => {
      this.itemList = response;
    })
  }


  viewHistory(a, template: TemplateRef<any>) {
      this.operations.getLogisticsHistory(sessionStorage.getItem('service'), a.item_id).subscribe(response => {
        this.historyList = response;
        this.modalRef = this.modalService.show(template)
      })

  }

  addLogistics(a, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  allocate (a, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  returnLogistics(a, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  requisition(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
