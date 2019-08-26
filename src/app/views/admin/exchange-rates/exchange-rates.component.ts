import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRateList: any = {};
  currencyList: any = {};
  something: any = {};
  exchangeRateFormModal: FormGroup;
  updateExchangeRateFormModal: FormGroup;
  currencyFormModal: FormGroup;
  modalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder, private userService: UserService, public Toaster: ToastsManager, Vref: ViewContainerRef,
              private modalService: BsModalService) {
    this.Toaster.setRootViewContainerRef(Vref);
  }

  ngOnInit() {
    this.loadExchangeRates();
  }

  loadExchangeRates() {
    this.exchangeRateList = {};
    this.userService.LoadGraExchangeRate().subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.exchangeRateList = this.something.message;
    })
  }

  openAddRateModal(template: TemplateRef<any>) {
    this.exchangeRateFormModal = this.formBuilder.group({
      currency: ['', Validators.required],
      rate: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.modalRef = this.modalService.show(template);
  }

  addExchangeRate() {
    this.userService.saveGraExchangeRate(this.exchangeRateFormModal.value).subscribe(response => {
      if (response['status'] === 1) {
        this.Toaster.success('Saved Successfully', 'GRA-TRACKING').then((toastr) => {
          this.exchangeRateFormModal.reset();
          this.ngOnInit();
        });
        this.modalRef.hide();
        this.loadExchangeRates();
      } else if (response['status'] === 0) {
        this.Toaster.error('Unsuccessful', 'GRA-TRACKING').then((toastr) => {
          this.exchangeRateFormModal.reset();
          this.ngOnInit();
        });
        this.modalRef.hide();
      }
    })
  }

  openUpdateExchangeRateModal(d, template: TemplateRef<any>) {
    this.loadExchangeRates();
    this.updateExchangeRateFormModal = this.formBuilder.group({
      id: [d.id],
      currency: [d.currency],
      rate: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.modalRef = this.modalService.show(template);
  }
}
