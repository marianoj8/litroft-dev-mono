import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Municipio } from 'src/app/shared/model/monicipio';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { Router, ActivatedRoute } from '@angular/router';
import { MunicipioService } from '../modules/municipio.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatVerticalStepper } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { Provincia } from 'src/app/shared/model/provincia';
import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
import { catchError, filter } from 'rxjs/operators';
import { CustomFilter } from '../../shared/model/support/custom-filter';

@Component({
  selector: 'app-municipio-form',
  templateUrl: './municipio-form.component.html',
  styleUrls: ['./municipio-form.component.css']
})
export class MunicipioFormComponent implements OnInit {

  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  municipio: Municipio = new Municipio();
  provinciaError$ = new Subject<boolean>();
  provincias$: Observable<Provincia[]>;
  filter = new CustomFilter();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private notificationService: NotificationService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.municipioService.onChangeContext.emit(true);
    this.initForms();

    this.provincias$ = this.provinciaService.list()
      .pipe(catchError(err => {
        this.provinciaError$.next(true);
        return of(null);
      }));

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.municipioService.getById(this.id)
        .subscribe(data => {
          this.municipio = data;

          this.formGroup01.patchValue({
            nome: this.municipio.nome,
          });
          this.formGroup01.patchValue({
            provincia: this.municipio.provincia.id,
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

      provincia: [null, [Validators.required]]
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.municipio.nome = this.formGroup01.controls.nome.value;
    this.municipio.provincia = new Municipio(this.formGroup01.controls.provincia.value);

    this.municipioService.save(this.municipio)
      .subscribe(
        (data: Municipio) => {
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
