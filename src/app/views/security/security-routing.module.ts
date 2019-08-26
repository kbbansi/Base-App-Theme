// import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityManagerAssessmentComponent } from './security-manager-assessment/security-manager-assessment.component';
import { SecurityManagerStaffComponent } from './security-manager-staff/security-manager-staff.component';
import { SecurityManagerLogisticsComponent } from './security-manager-logistics/security-manager-logistics.component';
import { SecurityManagerProjectComponent } from './security-manager-project/security-manager-project.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Security'
    },
    children: [
      {
        path: 'assessment',
        component: SecurityManagerAssessmentComponent,
        data: {
          title: 'Assessment'
        }
      },
      {
        path: 'staff',
        component: SecurityManagerStaffComponent,
        data: {
          title: 'Staff'
        }
      },
      {
        path: 'logistics',
        component: SecurityManagerLogisticsComponent,
        data: {
          title: 'Logistics'
        }
      },
      {
        path: 'projects',
        component: SecurityManagerProjectComponent,
        data: {
          title: 'Projects'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
