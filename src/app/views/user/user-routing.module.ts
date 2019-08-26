import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup/setup.component';
import { InputComponent } from './input/input.component';
import { StockComponent } from './stock/stock.component';
import { ReportsComponent } from './reports/reports.component';
import { StockbalanceComponent } from './stockbalance/stockbalance.component';
import { DepartmentComponent } from './departments/departments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DatePickerComponent } from './date-picker/date-picker.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User'
    },
    children: [


      {
        path: 'employee',
        component: StockComponent,
        data: {
          title: 'Employee'
        }
      },
      {
        path: 'request',
        component: InputComponent,
        data: {
          title: 'Request'
        }
      },
      {
        path: 'departments',
        component: DepartmentComponent,
        data: {
          title: 'Departments'
        }
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        data: {
          title: 'Attendance'
        }
      },

      {
        path: 'date-picker',
        component: DatePickerComponent,
        data: {
          title: 'Date-Picker test'
        }
      },
      {
        path: 'setup',
        component: SetupComponent,
        data: {
          title: 'Setup'
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Setup'
        }
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
