import { OperationManagerProspectComponent } from './operation-manager-prospect/operation-manager-prospect.component';
import { OperationManagerAssessmentComponent } from './operation-manager-assessment/operation-manager-assessment.component';
import { OperationLogisticsComponent } from './operation-logistics/operation-logistics.component';
import { OperationProspectComponent } from './operation-prospect/operation-prospect.component';

//import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationAssessmentComponent } from './operation-assessment/operation-assessment.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Operations'
    },
    children: [
      {
        path: 'prospect',
        component: OperationProspectComponent,
        data: {
          title: 'Prospect'
        }
      }, {
        path: 'logistics',
        component: OperationLogisticsComponent,
        data: {
          title: 'Logistics'
        }
      },
      {
        path: 'assessment',
        component: OperationAssessmentComponent,
        data: {
          title: 'Assessment'
        }
      },

      {
        path: 'manager-assessment',
        component: OperationManagerAssessmentComponent,
        data: {
          title: 'Assessment'
        }
      },
      {
        path: 'manager-prospect',
        component: OperationManagerProspectComponent,
        data: {
          title: 'Prospect'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule {}
