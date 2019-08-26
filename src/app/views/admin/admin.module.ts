import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetupComponent } from './setup/setup.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CourseProviderComponent } from './course-provider/course-provider.component';
import { TravelagentsComponent } from './travelagents/travelagents.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import {StockComponent} from '../user/stock/stock.component';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule, AdminRoutingModule, ReactiveFormsModule, TabsModule, ModalModule.forRoot(), BsDropdownModule
  ],
  declarations: [UserComponent, SetupComponent, CourseProviderComponent, TravelagentsComponent, ExchangeRatesComponent, StockComponent]
})
export class AdminModule { }
