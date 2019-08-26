//import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff/staff.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'HR'
    },
    children: [
      {
        path: 'staff',
        component: StaffComponent,
        data: {
          title: 'Staff'
        }
      },
      // {
      //   path: 'setup',
      //   component: SetupComponent,
      //   data: {
      //     title: 'Setup'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule {}
