import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './server/login/login.component';
import { SsAdminlayoutComponent } from './server/ss-adminlayout/ss-adminlayout.component';
import { SsPanelLayoutComponent } from './server/ss-panel-layout/ss-panel-layout.component';
import { SsHomeComponent } from './server/ss-home/ss-home.component';
import { SsItemsComponent } from './server/ss-items/ss-items.component';
import { SsSalesReportComponent } from './server/ss-sales-report/ss-sales-report.component';
import { SsAddAcctComponent } from './server/ss-add-acct/ss-add-acct.component';
import { CsHomeComponent } from './client/cs-home/cs-home.component';
import { UpdateAcctInfoComponent } from './server/update-acct-info/update-acct-info.component'
import { NotFoundComponent } from './response-code/not-found/not-found.component';

import { CanActivateRouteGuard } from './guard/can-activate-route.guard';

const routes: Routes = [
  { path: '', component: CsHomeComponent },
  { path: 'admin-login', component: SsAdminlayoutComponent,
    children: [
    { path: '', component: LoginComponent }
  ]},
  { path: 'user/:username', component: SsPanelLayoutComponent,
    children: [
      { path: '', redirectTo: 'items', pathMatch: 'full', canActivate: [CanActivateRouteGuard] },
      { path: 'items', component: SsItemsComponent, canActivate: [CanActivateRouteGuard] },
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
