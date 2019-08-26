import { HrRoutingModule } from './hr-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { StaffComponent } from './staff/staff.component';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, TabsModule, HrRoutingModule
  ],
  declarations: [StaffComponent]
})
export class HrModule { }
