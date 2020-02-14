import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './server/login/login.component';
import { SsAdminlayoutComponent } from './server/ss-adminlayout/ss-adminlayout.component';
import { SsPanelLayoutComponent } from './server/ss-panel-layout/ss-panel-layout.component';
import { SsHomeComponent } from './server/ss-home/ss-home.component';
import { SsItemsComponent } from './server/ss-items/ss-items.component';
import { SsDailySalesComponent } from './server/ss-daily-sales/ss-daily-sales.component';
import { SsSalesReportComponent } from './server/ss-sales-report/ss-sales-report.component';
import { SsAddAcctComponent } from './server/ss-add-acct/ss-add-acct.component';
import { CsHomeComponent } from './client/cs-home/cs-home.component';
import { CsProductsComponent } from './client/cs-products/cs-products.component';
import { CsServicesComponent } from './client/cs-services/cs-services.component';
import { CsSiteLayoutComponent } from './client/cs-site-layout/cs-site-layout.component';
import { UpdateAcctInfoComponent } from './server/update-acct-info/update-acct-info.component'
import { NotFoundComponent } from './response-code/not-found/not-found.component';
import { DashboardComponent } from './server/dashboard/dashboard.component';
import { CanActivateRouteGuard } from './guard/can-activate-route.guard';
import { SsAddSalesComponent } from './server/ss-add-sales/ss-add-sales.component';
import { SsReceiveItemComponent } from './server/ss-receive-item/ss-receive-item.component';

const routes: Routes = [
  { path: '', component: CsSiteLayoutComponent,
    children: [
      { path: '', component: CsHomeComponent },
      { path: 'products', component: CsProductsComponent },
      { path: 'services', component: CsServicesComponent }
    ]
 },
  { path: 'admin-login', component: SsAdminlayoutComponent,
    children: [
    { path: '', component: LoginComponent }
  ]},
  { path: 'user/:username', component: SsPanelLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [CanActivateRouteGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'items', component: SsItemsComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'sales', component: SsDailySalesComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'sales/add', component: SsAddSalesComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'sales/receive', component: SsReceiveItemComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'report', component: SsSalesReportComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'add-acct', component: SsAddAcctComponent, canActivate: [CanActivateRouteGuard] },
      { path: 'acct-setting', component: UpdateAcctInfoComponent, canActivate: [CanActivateRouteGuard]}
  ]},
  { path: '**', redirectTo: 'path/404' },
  { path: 'path/404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
