import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HttpClientModule } from '@angular/common/http';
import {
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  MatRadioModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatPaginatorModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatTooltipModule } from '@angular/material';
import { CanActivateRouteGuard } from './guard/can-activate-route.guard';
import { AuthService } from './services/auth.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './server/login/login.component';
import { CsHomeComponent } from './client/cs-home/cs-home.component';
import { NotFoundComponent } from './response-code/not-found/not-found.component';
import { AdminNavComponent } from './server/admin-nav/admin-nav.component';
import { SsHomeComponent } from './server/ss-home/ss-home.component';
import { SsAdminlayoutComponent } from './server/ss-adminlayout/ss-adminlayout.component';
import { SsPanelLayoutComponent } from './server/ss-panel-layout/ss-panel-layout.component';
import { SsItemsComponent } from './server/ss-items/ss-items.component';
import { SsSalesReportComponent } from './server/ss-sales-report/ss-sales-report.component';
import { SsAddAcctComponent } from './server/ss-add-acct/ss-add-acct.component';
import { UpdateAcctInfoComponent } from './server/update-acct-info/update-acct-info.component';
import { ItemComponent } from './server/ss-items/item/item.component';
import { ImageDataPipe } from './pipes/image-data.pipe';
import { SsDailySalesComponent } from './server/ss-daily-sales/ss-daily-sales.component';
import { GenerateReportComponent } from './server/ss-sales-report/generate-report/generate-report.component';
import { CsSiteLayoutComponent } from './client/cs-site-layout/cs-site-layout.component';
import { CsProductsComponent } from './client/cs-products/cs-products.component';
import { CsServicesComponent } from './client/cs-services/cs-services.component';
import { CsNavComponent } from './client/cs-nav/cs-nav.component';
import { ViewProdComponent } from './client/cs-products/view-prod/view-prod.component';
import { DashboardComponent } from './server/dashboard/dashboard.component';
import { SsAddSalesComponent } from './server/ss-add-sales/ss-add-sales.component';
import { SsReceiveItemComponent } from './server/ss-receive-item/ss-receive-item.component';
import { FeatImgViewComponent } from './client/cs-home/feat-img-view/feat-img-view.component';
import { CsFooterComponent } from './client/cs-footer/cs-footer.component';
import { AcctListComponent } from './server/acct-list/acct-list.component';
import { CsGalleryComponent } from './client/cs-gallery/cs-gallery.component';
import { ViewGlimageComponent } from './client/cs-gallery/view-glimage/view-glimage.component';
import { DeleteDialogComponent } from './server/ss-items/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CsHomeComponent,
    NotFoundComponent,
    AdminNavComponent,
    SsHomeComponent,
    SsAdminlayoutComponent,
    SsPanelLayoutComponent,
    SsItemsComponent,
    SsSalesReportComponent,
    SsAddAcctComponent,
    UpdateAcctInfoComponent,
    ItemComponent,
    ImageDataPipe,
    SsDailySalesComponent,
    GenerateReportComponent,
    CsSiteLayoutComponent,
    CsProductsComponent,
    CsServicesComponent,
    CsNavComponent,
    ViewProdComponent,
    DashboardComponent,
    SsAddSalesComponent,
    SsReceiveItemComponent,
    FeatImgViewComponent,
    CsFooterComponent,
    AcctListComponent,
    CsGalleryComponent,
    ViewGlimageComponent,
    DeleteDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    LayoutModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTabsModule,
    MatCarouselModule.forRoot(),
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [
    CanActivateRouteGuard,
    AuthService
  ],
  entryComponents: [
    ItemComponent,
    GenerateReportComponent,
    ViewProdComponent,
    FeatImgViewComponent,
    ViewGlimageComponent,
    DeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
