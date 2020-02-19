import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { Instituto } from 'src/app/shared/model/instituto';
import { Turma } from 'src/app/shared/model/turma';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { Estudante } from 'src/app/shared/model/estudante';
import { Provincia } from 'src/app/shared/model/provincia';
import { Municipio } from 'src/app/shared/model/municipio';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Router, ActivatedRoute } from '@angular/router';
import { EstudanteService } from 'src/app/estudantes/modules/estudante.service';
import { InscricaoService } from 'src/app/inscricao/modules/inscricao.service';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { InstitutoService } from 'src/app/institutos/modules/instituto.service';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { MunicipioService } from 'src/app/municipio/modules/municipio.service';
import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingUploadComponent } from 'src/app/shared/loading-upload/loading-upload.component';
import { EventEmitter } from 'events';
import { log } from 'util';
import { MatriculaService } from '../modules/matricula.service';

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent implements OnInit {
  public formGroup01: FormGroup;
  public formGroup02: FormGroup;
  public formGroup03: FormGroup;
  public formGroup04: FormGroup;
  public formGroup05: FormGroup;
  public formGroup06: FormGroup;
  cursos$: Observable<Curso[]>;
  institutos$: Observable<Instituto[]>;
  turmas: Turma[];
  cursoError$ = new Subject<boolean>();
  institutoError$ = new Subject<boolean>();
  turmaError$ = new Subject<boolean>();
  estudanteError$ = new Subject<boolean>();

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  estudante: Estudante = new Estudante();
  private curso: Curso = new Curso();
  private turma: Turma = new Turma();
  private provincia: Provincia = new Provincia();
  private municipio: Municipio = new Municipio();
  provinciaError$ = new Subject<boolean>();
  provincias$: Observable<Provincia[]>;
  municipioError$ = new Subject<boolean>();
  municipios$: Observable<Municipio[]>;
  filter = new CustomFilter();
  private id = 0;
  pdfSrc = '';
  dialogServiceRef;
  private selectedFile: File = null;
  private estudanteIdade: number;
  private currentYear = new Date().getFullYear();

  //Variaves auxiliar de formulario
  public nivelEnsino = 1;
  public placeHolserP2C3 = '***';
  public placeHolserP5C1 = '***';

  public tituloP2 = 'Genero, Data de nascimento & BI/Port';
  public tituloP3 = '***';
  public tituloP5 = '***';
  public tituloP6 = '***';
  public tituloP7 = '***';

  public showFields = true;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    private inscricaoService: InscricaoService,
    private cursoSerice: CursoService,
    private institutoSerice: InstitutoService,
    private turmaService: TurmaService,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private matriculaService: MatriculaService,
    private notificationService: NotificationService,
    private dialogService: MatDialog,
    private location: Location,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.inscricaoService.onChangeContext.emit(true);
    if (this.router.routerState.snapshot.url.includes('/matriculas/from/primario')) {
      this.nivelEnsino = 0;
      this.initPrimaryForms();
    }

    if (this.router.routerState.snapshot.url.includes('/matriculas/from/ciculo1')) {
      this.nivelEnsino = 1;
      this.initICicleForms();
    }

    if (this.router.routerState.snapshot.url.includes('/matriculas/from/ciculo2')) {
      this.nivelEnsino = 2;
      this.initIICicleForms();

      this.formGroup06.controls.curso.valueChanges
        .subscribe((onValue: Curso) => {
          this.turmaService.findByCursoPublic(onValue.id, onValue.adminInterno.instituto.id)
            .subscribe(onValues => {
              this.turmas = onValues;
            });
        });
    }

    this.institutos$ = this.institutoSerice.list()
      .pipe(catchError(err => {
        this.dialogService.open(ErrorLoadingComponent);
        this.institutoError$.next(true);
        return of([]);
      }));


    this.provincias$ = this.provinciaService.list()
      .pipe(catchError(err => {
        this.provinciaError$.next(true);
        return of(null);
      }));

    this.formGroup04.controls.provincia.valueChanges
      .subscribe(value => {
        this.filter.nome = '';
        this.filter.provinciaId = value;
        this.municipios$ = this.municipioService.filterByNomeAndProvincia(this.filter)
          .pipe(catchError(err => {
            this.municipioError$.next(true);
            return of(null);
          }));
      });

    this.formGroup05.controls.instituto.valueChanges
      .subscribe((onValue: Instituto) => {

        this.formGroup05.patchValue({
          sigla: onValue.sigla,
          numero: onValue.numero,
          areaFormacao: onValue.areaFormacao.descricao
        });

        this.cursos$ = this.cursoSerice.publicList(onValue.id)
          .pipe(catchError(err => {
            this.dialogService.open(ErrorLoadingComponent);
            this.cursoError$.next(true);
            return of([]);
          }));
      });

    this.formGroup02.controls.dataNascimento.valueChanges
      .subscribe((onValue: Date) => {
        if (this.formGroup02.controls.dataNascimento.value) {
          console.log(this.formGroup02.controls.dataNascimento.value);
          this.estudanteIdade = this.currentYear - onValue.getFullYear();
          if (this.estudanteIdade < 5) {
            console.log('Idade invalida!');
          }

          if (this.estudanteIdade >= 5 && this.estudanteIdade <= 8) {
            this.tituloP2 = 'Genero, Data de nascimento & Cédula';
            this.tituloP3 = 'Telefone & Email do encarregado';
            this.tituloP5 = 'Escolas do Ensino Primario';
            this.placeHolserP2C3 = 'Boletin de nascimento (Processo n:)';
            this.placeHolserP5C1 = 'Selecione uma escola';
            this.showFields = false;
          }
        }
      });

  }

  public initPrimaryForms(): void {

    this.tituloP2 = 'Genero, Data de nascimento & Cédula';
    this.tituloP3 = 'Telefone & Email do encarregado';
    this.tituloP5 = 'Escolas do Ensino Primario';
    this.tituloP6 = 'Escolas do Ensino Primario';
    this.tituloP7 = 'Cédula';
    this.placeHolserP2C3 = 'Boletin de nascimento (Processo n:)';
    this.placeHolserP5C1 = 'Selecione uma escola';
    this.showFields = false;

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
        Validators.maxLength(10)]],
      bi: [null, Validators.required]
    });

    this.formGroup03 = this.formBuilder.group({
      fone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });

    this.formGroup04 = this.formBuilder.group({
      provincia: [null, Validators.required],
      municipio: [null, Validators.required],
      endereco: [null]
    });

    this.formGroup05 = this.formBuilder.group({
      instituto: [null, Validators.required],
      sigla: [null, Validators.required],
      numero: [null, Validators.required],
      periodo: [null, Validators.required]
    });
  }

  private initICicleForms(): void {
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
        Validators.maxLength(10)]],
      bi: [null, Validators.required]
    });

    this.formGroup03 = this.formBuilder.group({
      fone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });

    this.formGroup04 = this.formBuilder.group({
      provincia: [null, Validators.required],
      municipio: [null, Validators.required],
      endereco: [null]
    });

    this.formGroup05 = this.formBuilder.group({
      instituto: [null, Validators.required],
      sigla: [null, Validators.required],
      numero: [null, Validators.required],
      areaFormacao: [null, Validators.required]
    });

    this.formGroup06 = this.formBuilder.group({
      curso: [null, Validators.required],
      turma: [null, Validators.required]
    });
  }
  private initIICicleForms(): void {
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
        Validators.maxLength(10)]],
      bi: [null, Validators.required]
    });

    this.formGroup03 = this.formBuilder.group({
      fone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });

    this.formGroup04 = this.formBuilder.group({
      provincia: [null, Validators.required],
      municipio: [null, Validators.required],
      endereco: [null]
    });

    this.formGroup05 = this.formBuilder.group({
      instituto: [null, Validators.required],
      sigla: [null, Validators.required],
      numero: [null, Validators.required],
      areaFormacao: [null, Validators.required]
    });

    this.formGroup06 = this.formBuilder.group({
      curso: [null, Validators.required],
      turma: [null, Validators.required]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {

    this.estudante.nome = this.formGroup01.controls.nome.value;
    this.estudante.sobreNome = this.formGroup01.controls.sobrenome.value;
    this.estudante.sexo = this.formGroup02.controls.sexo.value;
    this.estudante.dataNascimento = this.resolveDateFormat();
    this.estudante.bi = this.formGroup02.controls.bi.value;
    this.estudante.fone = this.formGroup03.controls.fone.value;
    this.estudante.email = this.formGroup03.controls.email.value;
    this.estudante.endereco = this.formGroup04.controls.endereco.value;
    this.estudante.numeroProcesso = this.formGroup05.controls.numeroProcesso.value;

    this.curso.id = this.formGroup05.controls.curso.value as number;
    this.turma.id = this.formGroup05.controls.turma.value as number;
    this.provincia.id = this.formGroup04.controls.provincia.value as number;
    this.municipio.id = this.formGroup04.controls.municipio.value as number;
    this.estudante.curso = this.curso;
    this.estudante.turma = this.turma;
    this.estudante.provincia = this.provincia;
    this.estudante.municipio = this.municipio;

    this.estudanteService.save(this.estudante)
      .subscribe(
        (data: Estudante) => {
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

  onFileSelected(event) {
    const doc: any = document.querySelector('#file');
    this.onUpload(event);

    if (typeof (FileReader) !== 'undefined') {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer(doc.files[0]);
    }
  }

  onUpload(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  openLoadingUpload() {
    this.dialogServiceRef = this.dialogService.open(
      LoadingUploadComponent,
      {
        height: '165px',
        width: '380px'
      });

    this.dialogServiceRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
      }
    });
  }


  back() {
    this.location.back();
  }
}