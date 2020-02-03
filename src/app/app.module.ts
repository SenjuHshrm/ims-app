import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
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
  MatPaginatorModule } from '@angular/material';
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
import { AddItemComponent } from './server/ss-items/add-item/add-item.component';
import { ImageDataPipe } from './pipes/image-data.pipe';


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
    AddItemComponent,
    ImageDataPipe
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
    MatPaginatorModule
  ],
  providers: [
    CanActivateRouteGuard,
    AuthService
  ],
  entryComponents: [
    AddItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
