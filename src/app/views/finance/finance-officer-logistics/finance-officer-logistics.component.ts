import { OperationsService } from './../../../services/operations.service';
import { AdminService } from './../../../services/admin.service';
import { FinanceService } from './../../../services/finance.service';
import { ToastsManager } from 'ng2-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-finance-officer-logistics',
  templateUrl: './finance-officer-logistics.component.html',
  styleUrls: ['./finance-officer-logistics.component.scss']
})
export class FinanceOfficerLogisticsComponent implements OnInit {
  vendorDetails: FormGroup;
  itemDetails: FormGroup;
  priceDetails: FormGroup;
  itemForm: FormGroup;
  itemHistoryList: any = {};
  itemsList: any = {};
  serviceList: any = {};
  roleList: any = {};
  modalRef: BsModalRef;
  vendorList: any = {};
  disbursementList: any = {};
  categoryList: any = {};
  itemPriceList: any = {};
  teamCostList: any = {};
  view = true;
  transactionForm: FormGroup;
  teamForm: FormGroup;
  selected: string;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware'];

  constructor(private fb: FormBuilder, vcr: ViewContainerRef, private toastr: ToastsManager,
    private modalService: BsModalService, private finance: FinanceService, private admin: AdminService,
  private operations: OperationsService) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.finance.getVendor().subscribe(response => {
      this.vendorList = response;
    });
    this.finance.itemPrice().subscribe(response => {
      this.itemPriceList = response;
    })
    this.finance.getitemDisbursement().subscribe(response => {
      this.disbursementList = response;
    })

    this.operations.getItems().subscribe(response => {
      this.itemsList = response;
    })

    this.admin.getLogistics().subscribe(response => {
      this.categoryList = response;
    })

    this.admin.getTeam().subscribe(response => {
      this.roleList = response;
    })
    this.admin.getService().subscribe(response => {
      this.serviceList = response;
    })

    this.finance.getTeamCost().subscribe(response => {
      this.teamCostList = response;
    })
  }

  openVendor(template: TemplateRef<any>) {
    this.view = true;
    this.vendorDetails = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact_person: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    })
    this.modalRef = this.modalService.show(template);
  }
  saveVendor() {
    this.finance.vendorSave(this.vendorDetails.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Vendor Created Successfully', 'SERVICEgh');
        this.finance.getVendor().subscribe(responseVendor => {
          this.vendorList = responseVendor;
          this.modalRef.hide()
        })

      }
    })
  }

  addItem(d, template: TemplateRef<any>) {
    this.itemDetails = this.fb.group({
      item: ['', Validators.required],
      category: ['']
    });
    this.modalRef = this.modalService.show(template)
  }

  viewDetails(a, template: TemplateRef<any> ) {
    this.view = false;
    this.vendorDetails = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact_person: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    })
    this.vendorDetails.patchValue(a);
    this.vendorDetails.disable();
    this.modalRef = this.modalService.show(template)
  }



  updatePrice(a, template: TemplateRef<any>) {
    this.priceDetails = this.fb.group({
      item: ['', Validators.required],
      price: ['', Validators.required],
      id: ['', Validators.required],
      one_time: [a.one_time],
      monthly: [a.monthly],
      username: [sessionStorage.getItem('user')]
    });
    this.priceDetails.patchValue(a)
    this.priceDetails.get('item').disable();
    this.modalRef = this.modalService.show(template)
  }

  savePrice() {
    this.finance.itemSave(this.priceDetails.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Item Price Updated Successfully')
        this.finance.itemPrice().subscribe(responseItem => {
          this.itemPriceList = responseItem;
          this.modalRef.hide();
        })
      }
    })
  }

  viewHistory(a, template: TemplateRef<any>) {
    this.finance.itemHistory(a).subscribe(response => {
        this.itemHistoryList = response;
        this.modalRef = this.modalService.show(template);
    })
  }

  /** Item transaction, credit and debit */

  transaction (d, template: TemplateRef<any>) {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      quantity: ['', Validators.required],
      note: ['', Validators.required],
      item_id: [d.id],
      unit: ['', Validators.required],
      username: [sessionStorage.getItem('user')]
    })
    this.modalRef = this.modalService.show(template);

  }

  saveTransaction() {
    this.finance.itemDisbursement(this.transactionForm.value).subscribe(response => {
      if (response['status'] === 1) {
        this.toastr.success('Transaction Successful');
        this.finance.getitemDisbursement().subscribe(responseDisburse => {
          this.disbursementList = responseDisburse;
          this.modalRef.hide();
        })
      }
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

  /** Team membership costing */
  openTeam( template: TemplateRef<any>) {
    this.teamForm = this.fb.group({
      service: ['', Validators.required],
      role: ['', Validators.required],
      amount: ['', Validators.required]
    })
    this.modalRef = this.modalService.show(template)
  }

  teamCostSave() {
    this.finance.teamCostSave(this.teamForm.value).subscribe(response => {
      if (response['status'] === 1 ) {
        this.toastr.success('Cost Successfully Posted', 'SERVICEgh');
        this.finance.getTeamCost().subscribe(responseTeam => {
          this.teamCostList = responseTeam;
          this.modalRef.hide();
        })
      }
    })
  }

}
