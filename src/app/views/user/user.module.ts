import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup/setup.component';
import { UserRoutingModule } from './user-routing.module';
import { TabsModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ReportsComponent } from './reports/reports.component';
import { StockbalanceComponent } from './stockbalance/stockbalance.component';
import { DepartmentComponent } from './departments/departments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StockComponent} from './stock/stock.component';

@NgModule({
  imports: [
    CommonModule, UserRoutingModule, TabsModule,
     ReactiveFormsModule,
     ModalModule.forRoot(),
     BsDropdownModule, FormsModule, BsDatepickerModule.forRoot()

  ],
  declarations: [SetupComponent, InputComponent,
     ReportsComponent,
     StockbalanceComponent, DepartmentComponent,
     AttendanceComponent, DatePickerComponent]
})
export class UserModule { }
