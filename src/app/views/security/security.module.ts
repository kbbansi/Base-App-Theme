import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityManagerAssessmentComponent } from './security-manager-assessment/security-manager-assessment.component';
import { SecurityRoutingModule } from './security-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityManagerStaffComponent } from './security-manager-staff/security-manager-staff.component';
import { SecurityManagerLogisticsComponent } from './security-manager-logistics/security-manager-logistics.component';
import { SecurityManagerProjectComponent } from './security-manager-project/security-manager-project.component';

@NgModule({
  imports: [
    CommonModule, SecurityRoutingModule, ReactiveFormsModule, BsDropdownModule, TabsModule,
    ModalModule.forRoot()
  ],
  declarations: [SecurityManagerAssessmentComponent, SecurityManagerStaffComponent, SecurityManagerLogisticsComponent,
    SecurityManagerProjectComponent]
})
export class SecurityModule { }
