import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';

import { Admin } from 'src/app/shared/model/admin';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { Especialidade } from 'src/app/shared/model/especialidade';
import { AdminService } from '../modules/admin.service';
import { EspecialidadeService } from 'src/app/especialidades/modules/especialidade.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MatVerticalStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  formGroup05: FormGroup;
  admin$: Observable<Admin>
  adminError$ = new Subject<boolean>();
  especialidadeError$ = new Subject<boolean>();

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  admin: Admin = new Admin();
  private especialidade: Especialidade = new Especialidade();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.adminService.onChangeContext.emit(true);
    this.initForms();
    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.adminService.getById(this.id)
        .subscribe(data => {
          this.admin = data;

          this.formGroup01.patchValue({
            nome: this.admin.nome,
            sobrenome: this.admin.sobreNome
          });

          this.formGroup02.patchValue({
            sexo: this.admin.sexo,
            dataNascimento: this.admin.dataNascimento
          });

          this.formGroup03.patchValue({
            bi: this.admin.bi,
            fone: this.admin.fone
          });

          this.formGroup04.patchValue({
            email: this.admin.email,
            endereco: this.admin.endereco
          });

        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
      sobrenome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
    });

    this.formGroup02 = this.formBuilder.group({
      sexo: ['M'],
      dataNascimento: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)]]
    });

    this.formGroup03 = this.formBuilder.group({
      bi: [null, Validators.required],
      fone: [null, [Validators.required]]
    });

    this.formGroup04 = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      endereco: [null]
    });

    this.formGroup05 = this.formBuilder.group({
      especialidade: [null, Validators.required],
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {

    this.admin.nome = this.formGroup01.controls.nome.value;
    this.admin.sobreNome = this.formGroup01.controls.sobrenome.value;
    this.admin.sexo = this.formGroup02.controls.sexo.value;
    this.admin.dataNascimento = this.resolveDateFormat();
    this.admin.bi = this.formGroup03.controls.bi.value;
    this.admin.fone = this.formGroup03.controls.fone.value;
    this.admin.email = this.formGroup04.controls.email.value;
    this.admin.endereco = this.formGroup04.controls.endereco.value;

    this.especialidade.id = this.formGroup05.controls.especialidade.value as number;

    this.adminService.save(this.admin)
      .subscribe(
        (data: Admin) => {
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

  private resolveDateFormat(): string {
    let date = new Date(this.formGroup02.controls.dataNascimento.value).toISOString().slice(0, 10);
    let ano: number = Number(date.substring(-1, 4));
    let mes: number = Number(date.substring(5, 7));
    let dia: number = Number(date.substring(8, 10));
    let finalDate = '';

    if (dia >= 0 && dia < 31) {
      finalDate = `${ano}-${mes}-${dia + 1}`;
    } else if (dia === 31) {
      finalDate = `${ano}-${mes + 1}-${1}`;
    }

    return finalDate;
  }

  back() {
    this.location.back();
  }

}

