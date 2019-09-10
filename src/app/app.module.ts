import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { MaterialModule } from './material/material.module';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { ErrorLoadingComponent } from './shared/error-loading/error-loading.component';
import { LoginFaildMessageComponent } from './shared/login-faild-message/login-faild-message.component';
import { MoreOptionsDialogComponent } from './shared/more-options-dialog/more-options-dialog.component';
import { DeleteFailedMessageComponent } from './shared/services/notification/notification-failed-delete.component';
import { LoadingFailedMessageComponent } from './shared/services/notification/notification-failed-loading.component';
import { LoginFailedMessageComponent } from './shared/services/notification/notification-failed-login.component';
import { SaveFailedMessageComponent } from './shared/services/notification/notification-failed-save.component';
import { UpdateFailedMessageComponent } from './shared/services/notification/notification-failed-update.component';
import { DeleteSuccessMessageComponent } from './shared/services/notification/notification-success-delete.component';
import { SaveSuccessMessageComponent } from './shared/services/notification/notification-success-save.component';
import { UpdateSuccessMessageComponent } from './shared/services/notification/notification-success-update.component';
import { TokenInterceptorService } from './shared/services/security/token-interceptor.service';
import { FooterComponent } from './shared/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CustomErrorPageComponent,
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
    ErrorLoadingComponent,
    FooterComponent
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
    ErrorLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
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


