import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OperationsRoutingModule } from './operations-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationProspectComponent } from './operation-prospect/operation-prospect.component';
import { OperationLogisticsComponent } from './operation-logistics/operation-logistics.component';
import { TabsModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { OperationAssessmentComponent } from './operation-assessment/operation-assessment.component';
import { OperationManagerAssessmentComponent } from './operation-manager-assessment/operation-manager-assessment.component';
import { OperationManagerProspectComponent } from './operation-manager-prospect/operation-manager-prospect.component';


@NgModule({
  imports: [
    CommonModule, OperationsRoutingModule, TabsModule, ReactiveFormsModule, BsDropdownModule,
    ModalModule.forRoot()
  ],
  declarations: [OperationProspectComponent, OperationLogisticsComponent, OperationAssessmentComponent, OperationManagerAssessmentComponent,
    OperationManagerProspectComponent]
})
export class OperationsModule { }
