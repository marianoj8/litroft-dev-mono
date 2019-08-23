import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { SaveSuccessMessageComponent } from './notification-success-save.component';
import { UpdateSuccessMessageComponent } from './notification-success-update.component';
import { DeleteSuccessMessageComponent } from './notification-success-delete.component';
import { SaveFailedMessageComponent } from './notification-failed-save.component';
import { UpdateFailedMessageComponent } from './notification-failed-update.component';
import { DeleteFailedMessageComponent } from './notification-failed-delete.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  configCenter: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };


  componentSavedSuccessfulMessage() {
    this.config[`panelClass`] = [`notification`, `success`];
    this.snackBar.openFromComponent(SaveSuccessMessageComponent, this.config);
  }

  componentUpdatedSuccessfulMessage() {
    this.config[`panelClass`] = [`notification`, `success`];
    this.snackBar.openFromComponent(UpdateSuccessMessageComponent, this.config);
  }

  componentDeletetedSuccessfulMessage() {
    this.config[`panelClass`] = [`notification`, `success`];
    this.snackBar.openFromComponent(DeleteSuccessMessageComponent, this.config);
  }

  componentSavedFailedMessage() {
    this.config[`panelClass`] = [`notification`, `error`];
    this.snackBar.openFromComponent(SaveFailedMessageComponent, this.config);
  }

  componentUpdatedFailedMessage() {
    this.config[`panelClass`] = [`notification`, `error`];
    this.snackBar.openFromComponent(UpdateFailedMessageComponent, this.config);
  }

  componentDeletetedFailedMessage() {
    this.config[`panelClass`] = [`notification`, `error`];
    this.snackBar.openFromComponent(DeleteFailedMessageComponent, this.config);
  }

  componentLoadingFailedMessage() {
    this.configCenter[`panelClass`] = [`notification`, `error`];
    this.snackBar.openFromComponent(DeleteFailedMessageComponent, this.configCenter);
  }

  componentLoginFailedMessage() {
    this.configCenter[`panelClass`] = [`notification`, `error`];
    this.snackBar.openFromComponent(DeleteFailedMessageComponent, this.configCenter);
  }

}
