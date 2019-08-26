import { FinanceService } from './services/finance.service';
import { OperationsService } from './services/operations.service';
import { HrService } from './services/hr.service';
import { MarketingService } from './services/marketing.service';
import { AdminService } from './services/admin.service';
import { ServiceService } from './services/service.service';
import { MenuItems } from './_nav';
import { PiechartService } from './services/piechart.service';
import { FarmerService } from './services/farmer.service';
import { CommonService } from './services/common.service';
import { FarmService } from './services/farm.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CustomersService } from './services/customers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarNavComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  PiechartComponent
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarNavComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  PiechartComponent
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService} from 'ngx-bootstrap/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { UserService } from './services/user.service';
import { Http } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule, BrowserAnimationsModule, ToastModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }, AuthService, CustomersService, AuthGuardService, FarmService, CommonService, FarmerService, PiechartService, MenuItems,
   ServiceService, AdminService, MarketingService, BsModalService, HrService, OperationsService, FinanceService, UserService, Http],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
