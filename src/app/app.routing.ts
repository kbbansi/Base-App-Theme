import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    // redirectTo: 'dashboard',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'user',
        loadChildren: './views/user/user.module#UserModule',
      },
      {
        path: 'admin',
        loadChildren: './views/admin/admin.module#AdminModule',
      },
      {
        path: 'hr',
        loadChildren: './views/hr/hr.module#HrModule',
      },
      {
        path: 'marketing',
        loadChildren: './views/marketing/marketing.module#MarketingModule',
      },
      {
        path: 'security',
        loadChildren: './views/security/security.module#SecurityModule',
      },
      {
        path: 'operations',
        loadChildren: './views/operations/operations.module#OperationsModule',
      },
      {
        path: 'finance',
        loadChildren: './views/finance/finance.module#FinanceModule',
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'officer',
        loadChildren: './views/officer/officer.module#OfficerModule',
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
