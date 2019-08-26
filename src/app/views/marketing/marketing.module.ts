import { TabsModule, BsDropdownModule , ModalModule, BsDatepickerModule} from 'ngx-bootstrap';
import { MarketingRoutingModule } from './marketing-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProspectComponent } from './prospect/prospect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentComponent } from './assessment/assessment.component';
import { MarketingManagerProspectComponent } from './marketing-manager-prospect/marketing-manager-prospect.component';
import { MarketingManagerAssessmentComponent } from './marketing-manager-assessment/marketing-manager-assessment.component';



@NgModule({
  imports: [
    CommonModule, MarketingRoutingModule, TabsModule, ReactiveFormsModule, BsDropdownModule, BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ProspectComponent, AssessmentComponent, MarketingManagerProspectComponent, MarketingManagerAssessmentComponent]
})
export class MarketingModule { }
