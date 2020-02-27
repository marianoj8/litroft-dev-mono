import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { LocalService } from 'src/app/locals/modules/local.service';
import { Local } from 'src/app/shared/model/local';
import { Provincia } from 'src/app/shared/model/provincia';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Municipio } from '../../shared/model/municipio';
import { MunicipioService } from 'src/app/municipio/modules/municipio.service';
import { CustomFilter } from '../../shared/model/support/custom-filter';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.css']
})
export class LocalFormComponent implements OnInit {
  formGroup01: FormGroup;
  locals$: Observable<Local[]>;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  local: Local = new Local();
  provinciaError$ = new Subject<boolean>();
  provincias$: Observable<Provincia[]>;
  municipioError$ = new Subject<boolean>();
  municipios$: Observable<Municipio[]>;
  filter = new CustomFilter();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localService: LocalService,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private notificationService: NotificationService,
    private location: Location
  ) {
    // this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {

    this.localService.onChangeContext.emit(true);

    this.provincias$ = this.provinciaService.list()
      .pipe(catchError(err => {
        this.provinciaError$.next(true);
        return of(null);
      }));

    this.initForms();

    this.formGroup01.controls.provincia.valueChanges
      .subscribe(value => {
        this.filter.nome = '';
        this.filter.provinciaId = value;
        this.municipios$ = this.municipioService.filterByNomeAndProvincia(this.filter)
          .pipe(catchError(err => {
            this.municipioError$.next(true);
            return of(null);
          }));
      });

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.localService.getById(this.id)
        .subscribe(data => {
          this.local = data;

          this.formGroup01.patchValue({
            distrito: this.local.distrito,
            municipio: this.local.municipio.id,
            provincia: this.local.provincia.id
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      distrito: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],

      municipio: [null, [
        Validators.required]],

      provincia: [null, Validators.required]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.local.distrito = this.formGroup01.controls.distrito.value;
    this.local.municipio = new Municipio(this.formGroup01.controls.municipio.value);
    this.local.provincia = new Provincia(this.formGroup01.controls.provincia.value);

    this.localService.save(this.local)
      .subscribe(
        (data: Local) => {
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

