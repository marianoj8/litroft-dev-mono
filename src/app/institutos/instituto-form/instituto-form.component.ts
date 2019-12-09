import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { InstitutoService } from '../modules/instituto.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Instituto } from 'src/app/shared/model/instituto';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatVerticalStepper } from '@angular/material/stepper';
import { AreaFormacaoService } from 'src/app/area-formacao/modules/area-formacao.service';
import { Observable, Subject, of } from 'rxjs';
import { AreaFormacao } from './../../shared/model/AreaFormacao';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-instituto-form',
  templateUrl: './instituto-form.component.html',
  styleUrls: ['./instituto-form.component.css']
})
export class InstitutoFormComponent implements OnInit {

  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  areaFormacao$: Observable<AreaFormacao>;
  local$: Observable<AreaFormacao>;
  areaFormacaoErrorError$ = new Subject<boolean>();;
  localErrorError$ = new Subject<boolean>();;
  instituto = new Instituto();
  salasCount = [1, 2, 3, 4, 6, 7, 8];
  laboratoriosCount = [1, 2, 3, 4, 5, 6];

  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private monografiaService: MonografiaService,
    private institutoService: InstitutoService,
    private areaFormacaoService: AreaFormacaoService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.institutoService.onChangeContext.emit(true);

    this.areaFormacao$ = this.areaFormacaoService.list()
      .pipe(catchError(err => {
        this.areaFormacaoErrorError$.next(true);
        return of(null);
      }));

    this.initForms();


    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.institutoService.getById(this.id)
        .subscribe(data => {
          this.instituto = data;

          this.formGroup01.patchValue({
            nome: this.instituto.nome,
            sigla: this.instituto.sigla
          });

          // this.formGroup02.patchValue({
          //   departamento: this.instituto.departamento.id
          // });

        });

    }

  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],

      sigla: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]],
        
        numero: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(11)]],

    });

    this.formGroup02 = this.formBuilder.group({
      salas: [8, [
        Validators.min(8),
        Validators.required
      ]],
      laboratorios: [4, [Validators.required]],
    });

    this.formGroup03 = this.formBuilder.group({
      areaFormacao: [null, Validators.required],
      local: [null, Validators.required]
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.instituto.nome = this.formGroup01.controls.nome.value;
    this.instituto.sigla = this.formGroup01.controls.duracao.value;
    // this.instituto.departamento = new Departamento(this.formGroup02.controls.departamento.value);

    this.institutoService.save(this.instituto)
      .subscribe(
        (data: Instituto) => {
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
