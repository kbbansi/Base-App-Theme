import { SetupComponent } from './setup/setup.component';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseProviderComponent} from './course-provider/course-provider.component';
import {TravelagentsComponent} from './travelagents/travelagents.component';
import {ExchangeRatesComponent} from './exchange-rates/exchange-rates.component';
import { EmployeeComponent} from './employee/employee.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administrator'
    },
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'dashboard',
        component: SetupComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'course-providers',
        component: CourseProviderComponent,
        data: {
          title: 'Course Providers'
        }
      },
      {
        path: 'employees',
        component: EmployeeComponent,
        data: {
          title: 'Employees'
        }
      },
      {
        path: 'travel-agents',
        component: TravelagentsComponent,
        data: {
          title: 'Travel Agents'
        }
      },
      {
        path: 'exchange-rates',
        component: ExchangeRatesComponent,
        data: {
          title: 'Exchange Rates'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
