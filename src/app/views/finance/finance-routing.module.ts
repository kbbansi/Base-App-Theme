import { FinanceOfficerLogisticsComponent } from './finance-officer-logistics/finance-officer-logistics.component';

//import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Finance'
    },
    children: [
      {
        path: 'ologistics',
        component: FinanceOfficerLogisticsComponent,
        data: {
          title: 'Logistics'
        }
      },
      {
        path: 'payment',
        /** component: SetupComponent, */
        data: {
          title: 'Payment'
        }
      },
      {
        path: 'project',
        // component: SetupComponent,
        data: {
          title: 'Project'
        }
      },
      {
        path: 'contract',
        // component: SetupComponent,
        data: {
          title: 'Contract'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule {}
