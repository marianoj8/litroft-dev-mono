import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartamentoService } from 'src/app/departamentos/modules/departamento.service';
import { GrupoService } from 'src/app/grupos/modules/grupo.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { Departamento } from 'src/app/shared/model/departamento';
import { Grupo } from 'src/app/shared/model/grupo';
import { Projeto } from 'src/app/shared/model/projeto';
import { Turma } from 'src/app/shared/model/turma';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { TurmaService } from 'src/app/turmas/modules/turma.service';

import { ProjetoService } from '../modules/projeto.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  projetos$: Observable<Projeto[]>;
  grupos$: Observable<Grupo[]>;
  turmas$: Observable<Turma[]>;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  projeto: Projeto = new Projeto();
  departamentoError$ = new Subject<boolean>();
  departamentos$: Observable<Departamento[]>;
  private id = 0;
  filter: CustomFilter = new CustomFilter();
  grupos: Grupo[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private projetoService: ProjetoService,
    private grupoService: GrupoService,
    private turmaService: TurmaService,
    private departamentoService: DepartamentoService,
    private notificationService: NotificationService,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.projetoService.onChangeContext.emit(true);
    this.departamentos$ = this.departamentoService.list()
      .pipe(catchError(err => {
        this.departamentoError$.next(true);
        return of(null);
      }));
    this.initForms();


    this.grupoService.list().subscribe(resp => this.grupos = resp);
    this.turmas$ = this.turmaService.list();

    this.formGroup01.controls.turma.valueChanges
      .subscribe(
        resp => {
          this.grupos.forEach((e: Grupo) => {
            if (e.turma.id === resp) {
              this.grupoService.getById(e.id)
                .subscribe((resp: Grupo) => {
                  this.filter.turma = resp.turma.sigla;
                  this.filter.curso = '';
                  this.filter.descricao = '';
                  this.grupos$ = this.grupoService.filterByDescricaoAndTow(this.filter);
                });
            }
          });

        }
      );

    this.formGroup02.controls.grupo.valueChanges
      .subscribe(
        resp => {
          this.grupoService.getById(resp)
            .subscribe((value: Grupo) => {

              this.projeto.grupo = value;

              this.formGroup02.patchValue({
                curso: value.curso.nome
              });
              this.formGroup03.patchValue({
                departamento: value.curso.departamento.nome
              });

            });
        }
      );

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.projetoService.getById(this.id)
        .subscribe(data => {
          this.projeto = data;

          this.formGroup01.patchValue({
            tema: this.projeto.tema,
            turma: this.projeto.grupo.turma.id,
          });

          this.formGroup02.patchValue({
            grupo: this.projeto.grupo.id,
            curso: this.projeto.grupo.curso.nome
          });

          this.formGroup03.patchValue({
            departamento: this.projeto.departamento.id
          });

        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      tema: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],
      turma: ['', Validators.required],


    });

    this.formGroup02 = this.formBuilder.group({
      grupo: [null, [
        Validators.required]],
      curso: [{ value: '', disabled: true }, [Validators.required]]
    });

    this.formGroup03 = this.formBuilder.group({
      departamento: [{ value: '', disabled: true }, Validators.required]
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.projeto.tema = this.formGroup01.controls.tema.value;
    this.projeto.departamento = this.projeto.grupo.curso.departamento;

    this.projetoService.save(this.projeto)
      .subscribe(
        (data: Projeto) => {
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
