import { MarketingManagerProspectComponent } from './marketing-manager-prospect/marketing-manager-prospect.component';
import { MarketingManagerAssessmentComponent } from './marketing-manager-assessment/marketing-manager-assessment.component';
import { AssessmentComponent } from './assessment/assessment.component';
//import { AuthGuardService } from './../../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProspectComponent } from './prospect/prospect.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Marketing'
    },
    children: [
      {
        path: 'prospect',
        component: ProspectComponent,
        data: {
          title: 'Prospect'
        }
      },
      {
        path: 'assessment',
        component: AssessmentComponent,
        data: {
          title: 'Assessment'
        }
      },
      {
        path: 'manager-assessment',
        component: MarketingManagerAssessmentComponent,
        data: {
          title: 'Assessment'
        }
      },
      {
        path: 'manager-prospect',
        component: MarketingManagerProspectComponent,
        data: {
          title: 'Assessment'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule {}
