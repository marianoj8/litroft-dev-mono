import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { ErrorLoadingComponent } from './shared/error-loading/error-loading.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoadingUploadComponent } from './shared/loading-upload/loading-upload.component';
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
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { AcessDenaidComponent } from './shared/acess-denaid/acess-denaid.component';
import { AreaFormacaoComponent } from './area-formacao/area-formacao.component';


@NgModule({
  declarations: [
    AppComponent,
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
    FooterComponent,
    LoadingUploadComponent,
    CustomErrorPageComponent,
    AcessDenaidComponent,
    AreaFormacaoComponent
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
    LoadingUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule
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


