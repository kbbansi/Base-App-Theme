import { AuthGuardService } from '../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { OfficerDashboardComponent } from './officer-dashboard/officer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Officer Dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: OfficerDashboardComponent,
        data: {
          title: 'Officer'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerRoutingModule {}
