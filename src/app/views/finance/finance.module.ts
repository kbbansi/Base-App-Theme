import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule, TypeaheadModule, TabsModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceOfficerLogisticsComponent } from './finance-officer-logistics/finance-officer-logistics.component';
import { FinanceRoutingModule } from './finance-routing.module';

@NgModule({
  imports: [
    CommonModule, FinanceRoutingModule, ReactiveFormsModule, BsDropdownModule, TabsModule,
    //  TypeaheadModule
    ModalModule.forRoot()
  ],
  declarations: [FinanceOfficerLogisticsComponent]
})
export class FinanceModule { }
