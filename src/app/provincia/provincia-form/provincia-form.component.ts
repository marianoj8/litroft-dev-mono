import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../modules/provincia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Provincia } from 'src/app/shared/model/provincia';
import { EventEmitter } from 'events';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { MatVerticalStepper } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provincia-form',
  templateUrl: './provincia-form.component.html',
  styleUrls: ['./provincia-form.component.css']
})
export class ProvinciaFormComponent implements OnInit {

  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  provincia: Provincia = new Provincia();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private provinciaService: ProvinciaService,
    private notificationService: NotificationService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.provinciaService.onChangeContext.emit(true);
    this.initForms();

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.provinciaService.getById(this.id)
        .subscribe(data => {
          this.provincia = data;

          this.formGroup01.patchValue({
            nome: this.provincia.nome,
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(70)]],
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.provincia.nome = this.formGroup01.controls.nome.value;

    this.provinciaService.save(this.provincia)
      .subscribe(
        (data: Provincia) => {
          if (!!state) {
            if (this.router.url.match('/edit')) {
              this.showUpdatedMessage();
            } else {
              this.showSavedMessage();
            }
            this.back();
          } else {
            if (this.router.url.match('/edit')) {
              this.showUpdatedMessage();
            } else {
              this.showSavedMessage();
            }
            stepper.reset();
          }
        },
        (err: HttpErrorResponse) => this.showFailerMessage(err)
      );

  }

  private showFailerMessage(err: HttpErrorResponse): void {
    this.notificationService
      .componentErrorMessage(':: ' + err.error.message);
  }

  private showSavedMessage(): void {
    this.notificationService.componentSavedSuccessfulMessage();
  }

  private showUpdatedMessage(): void {
    this.notificationService.componentUpdatedSuccessfulMessage();
  }

  back() {
    this.location.back();
  }

}
