import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { TokenInterceptorService } from './shared/services/security/token-interceptor.service';
import { SaveSuccessMessageComponent } from './shared/services/notification/notification-success-save.component';
import { UpdateSuccessMessageComponent } from './shared/services/notification/notification-success-update.component';
import { DeleteSuccessMessageComponent } from './shared/services/notification/notification-success-delete.component';
import { SaveFailedMessageComponent } from './shared/services/notification/notification-failed-save.component';
import { DeleteFailedMessageComponent } from './shared/services/notification/notification-failed-delete.component';
import { UpdateFailedMessageComponent } from './shared/services/notification/notification-failed-update.component';
import { LoadingFailedMessageComponent } from './shared/services/notification/notification-failed-loading.component';
import { LoginFailedMessageComponent } from './shared/services/notification/notification-failed-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { LoginFaildMessageComponent } from './shared/login-faild-message/login-faild-message.component';
import { MoreOptionsDialogComponent } from './shared/more-options-dialog/more-options-dialog.component';
import { ErrorLoadingComponent } from './shared/error-loading/error-loading.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomErrorPageComponent,
    SaveSuccessMessageComponent,
    UpdateSuccessMessageComponent,
    DeleteSuccessMessageComponent,
    SaveFailedMessageComponent,
    UpdateFailedMessageComponent,
    DeleteFailedMessageComponent,
    LoadingFailedMessageComponent,
    LoginFailedMessageComponent,
    DashboardComponent,
    DeleteDialogComponent,
    LoginFaildMessageComponent,
    MoreOptionsDialogComponent,
    ErrorLoadingComponent
  ],
  entryComponents: [
    SaveSuccessMessageComponent,
    UpdateSuccessMessageComponent,
    DeleteSuccessMessageComponent,
    SaveFailedMessageComponent,
    UpdateFailedMessageComponent,
    DeleteFailedMessageComponent,
    LoadingFailedMessageComponent,
    LoginFailedMessageComponent,
    DeleteDialogComponent,
    LoginFaildMessageComponent,
    MoreOptionsDialogComponent,
    ErrorLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


