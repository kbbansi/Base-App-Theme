import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficerDashboardComponent } from './officer-dashboard/officer-dashboard.component';
import { OfficerRoutingModule } from './officer-routing.module';
import { TabsModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, OfficerRoutingModule, TabsModule, ReactiveFormsModule, ModalModule.forRoot(), BsDropdownModule
  ],
  declarations: [OfficerDashboardComponent]
})
export class OfficerModule { }
