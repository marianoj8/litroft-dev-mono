import {ClasseService} from './../../classe/modules/classe.service';
import {Classe} from './../../shared/model/classe';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, Subject, of} from 'rxjs';
import {Curso} from 'src/app/shared/model/curso';
import {Instituto} from 'src/app/shared/model/instituto';
import {Turma} from 'src/app/shared/model/turma';
import {MyErrorStateMatch} from 'src/app/shared/validators/field-validator';
import {Estudante} from 'src/app/shared/model/estudante';
import {Provincia} from 'src/app/shared/model/provincia';
import {Municipio} from 'src/app/shared/model/municipio';
import {CustomFilter} from 'src/app/shared/model/support/custom-filter';
import {Router, ActivatedRoute} from '@angular/router';
import {EstudanteService} from 'src/app/estudantes/modules/estudante.service';
import {InscricaoService} from 'src/app/inscricao/modules/inscricao.service';
import {CursoService} from 'src/app/cursos/modules/curso.service';
import {InstitutoService} from 'src/app/institutos/modules/instituto.service';
import {TurmaService} from 'src/app/turmas/modules/turma.service';
import {MunicipioService} from 'src/app/municipio/modules/municipio.service';
import {ProvinciaService} from 'src/app/provincia/modules/provincia.service';
import {NotificationService} from 'src/app/shared/services/notification/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {MatVerticalStepper} from '@angular/material/stepper';
import {MonografiaService} from 'src/app/monografias/modules/monografia.service';
import {catchError} from 'rxjs/operators';
import {ErrorLoadingComponent} from 'src/app/shared/error-loading/error-loading.component';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingUploadComponent} from 'src/app/shared/loading-upload/loading-upload.component';
import {EventEmitter} from 'events';
import {MatriculaService} from '../modules/matricula.service';
import {Periodo} from 'src/app/shared/model/periodo';
import {PeriodoService} from 'src/app/periodos/modules/periodos.service';

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
  periodos$: Observable<Periodo[]>;
  classe$: Observable<Classe[]>;
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
  private classe: Classe = new Classe();
  private instituto: Instituto = new Instituto();
  private turma: Turma = new Turma();
  private provincia: Provincia = new Provincia();
  private municipio: Municipio = new Municipio();
  private periodo: Periodo = new Periodo();
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
  optionDocs = ['Cédula', 'Acento de Nascimento', 'Bilhete de Identidade', 'Passaporte'];
  private currentYear = new Date().getFullYear();

  // Variaves auxiliar de formulario
  public nivelEnsino = 1;
  public placeHolserP2C3 = 'Documento de Identificação';
  public placeHolserP2C4 = 'Agruadando tipo de documento...';
  public placeHolserP5C1 = '***';

  public tituloP2 = 'Genero, Data de nascimento & BI/Port';
  public tituloP3 = '***';
  public tituloP5 = '***';
  public tituloP6 = 'Documentos';
  public tituloP7 = '***';
  isPassport: boolean;
  public showFields = true;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    private inscricaoService: InscricaoService,
    private cursoSerice: CursoService,
    private classeService: ClasseService,
    private institutoSerice: InstitutoService,
    private turmaService: TurmaService,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private periodoService: PeriodoService,
    private matriculaService: MatriculaService,
    private notificationService: NotificationService,
    private dialogService: MatDialog,
    private location: Location,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.inscricaoService.onChangeContext.emit(true);
    this.periodos$ = this.periodoService.list();
    if (this.router.routerState.snapshot.url.match('/matriculas/from/primario')) {
      this.classe$ = this.classeService.listClasseByNivelId(1);
      this.nivelEnsino = 0;
      this.filter.nivel = 'Ensino Primario';
      this.initPrimaryForms();

      this.formGroup02.controls.optinDoc.valueChanges
        .subscribe(onValue => {
          switch (onValue) {
            case 'Cédula':
              this.placeHolserP2C4 = 'Numero do Processo';
              this.isPassport = false;
              break;
            case 'Acento de Nascimento':
              this.placeHolserP2C4 = 'Numero do Acento';
              this.isPassport = false;
              break;
            case 'Bilhete de Identidade':
              this.placeHolserP2C4 = 'Numro do B.I';
              this.isPassport = false;
              console.log(this.placeHolserP2C4);
              break;
            case 'Passaporte':
              this.placeHolserP2C4 = 'Numero do Passaporte';
              this.isPassport = true;
              break;
          }
        });

      this.formGroup05.controls.instituto.valueChanges
        .subscribe((onValue: Instituto) => {
          this.formGroup05.patchValue({
            sigla: onValue.sigla,
            numero: onValue.numero
          });
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
              this.showFields = false;
            }

            if (this.estudanteIdade >= 5 && this.estudanteIdade < 18) {
              this.periodos$ = this.periodoService.listForStudant();
              this.showFields = false;
            }
          }
        });

      this.formGroup05.controls.classe.valueChanges
        .subscribe(onValue => {
          console.log(onValue);

          // switch (onValue) {
          //   case 'Iniciação':
          //   case '1 Class':
          //   case '2 Class':
          //     // this.periodos$ = this.periodoService.listForAdulto();
          //     break;
          //   default:
          // }
        });
    }

    if (this.router.routerState.snapshot.url.includes('/matriculas/from/ciculo1')) {
      this.classe$ = this.classeService.listClasseByNivelId(2);
      this.nivelEnsino = 1;
      this.filter.nivel = 'Ensino do I Ciclo';
      this.initICicleForms();

      this.formGroup02.controls.optinDoc.valueChanges
        .subscribe(onValue => {
          switch (onValue) {
            case 'Cédula':
              this.placeHolserP2C4 = 'Numero do Processo';
              this.isPassport = false;
              break;
            case 'Acento de Nascimento':
              this.placeHolserP2C4 = 'Numero do Acento';
              this.isPassport = false;
              break;
            case 'Bilhete de Identidade':
              this.placeHolserP2C4 = 'Numro do B.I';
              this.isPassport = false;
              console.log(this.placeHolserP2C4);
              break;
            case 'Passaporte':
              this.placeHolserP2C4 = 'Numero do Passaporte';
              this.isPassport = true;
              break;
          }
        });

      this.formGroup02.controls.dataNascimento.valueChanges
        .subscribe((onValue: Date) => {
          if (this.formGroup02.controls.dataNascimento.value) {
            console.log(this.formGroup02.controls.dataNascimento.value);
            this.estudanteIdade = this.currentYear - onValue.getFullYear();
            if (this.estudanteIdade < 5) {
              this.formGroup02.controls.dataNascimento.setErrors(Validators.nullValidator);
              this.showFailerFiealdMessage('Estudante deve ter no minimo 5 anos.');
            }

            if (this.estudanteIdade >= 5 && this.estudanteIdade <= 8) {
              this.showFields = false;
            }

            if (this.estudanteIdade >= 5 && this.estudanteIdade < 18) {
              this.periodos$ = this.periodoService.listForStudant();
              this.showFields = false;
            }

          }
        });
    }

    if (this.router.routerState.snapshot.url.includes('/matriculas/from/ciculo2')) {
      this.classe$ = this.classeService.listClasseByNivelId(3);
      this.nivelEnsino = 2;
      this.filter.nivel = 'Ensino do II Ciclo';
      this.initIICicleForms();
      this.optionDocs = ['Bilhete de Identidade', 'Passaporte'];

      this.formGroup02.controls.optinDoc.valueChanges
        .subscribe(onValue => {
          switch (onValue) {
            case 'Bilhete de Identidade':
              this.placeHolserP2C4 = 'Numro do B.I';
              this.isPassport = false;
              console.log(this.placeHolserP2C4);
              break;
            case 'Passaporte':
              this.placeHolserP2C4 = 'Numero do Passaporte';
              this.isPassport = true;
              console.log(this.placeHolserP2C4);
              break;
          }
        });

      this.formGroup06.controls.curso.valueChanges
        .subscribe((onValue: Curso) => {
          // this.turmaService.findByCursoPublic(onValue.id, onValue.adminInterno.instituto.id)
          //   .subscribe(onValues => {
          //     this.turmas = onValues;
          //   });
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
            if (this.estudanteIdade < 15) {
              this.formGroup02.controls.dataNascimento.setErrors(Validators.nullValidator);
              this.showFailerFiealdMessage('Estudante deve ter no minimo 15 anos.');
            }

            if (this.estudanteIdade >= 5 && this.estudanteIdade <= 15) {
              this.showFields = false;
            }

            if (this.estudanteIdade >= 5 && this.estudanteIdade < 18) {
              this.periodos$ = this.periodoService.listForStudant();
              this.showFields = false;
            }

          }
        });

    }

    this.institutos$ = this.institutoSerice.listFiltered(this.filter)
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
  }

  public initPrimaryForms(): void {

    // this.tituloP2 = 'Genero, Data de nascimento & Cédula';
    this.tituloP3 = 'Telefone & Email do encarregado';
    // this.tituloP5 = 'Escolas do Ensino Primario';
    // this.tituloP6 = 'Escolas do Ensino Primario';
    // this.tituloP7 = 'Cédula';
    // this.placeHolserP2C3 = 'Boletin de nascimento (Processo n:)';
    // this.placeHolserP5C1 = 'Selecione uma escola';
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
      optinDoc: [null, Validators.required],
      bi: [null, Validators.required],
      pais: [null],
      cidade: [null]
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
      classe: [null, Validators.required],
      periodo: [null, Validators.required]
    });

  }

  private initICicleForms(): void {
    this.tituloP3 = 'Telefone & Email do encarregado';
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
      optinDoc: [null, Validators.required],
      bi: [null, Validators.required],
      pais: [null],
      cidade: [null]
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
      areaFormacao: [null, Validators.required],
      classe: [null, Validators.required]
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
      optinDoc: [null, Validators.required],
      bi: [null, Validators.required],
      pais: [null],
      cidade: [null]
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
      classe: [null, Validators.required],
      periodo: [null, Validators.required]
    });
  }

  public onSaveButton(stepper: MatVerticalStepper): void {
    this.save(stepper, false);
  }

  public onSaveButtonAndList(stepper: MatVerticalStepper): void {
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
    if (this.nivelEnsino === 0) {}
    if (this.nivelEnsino === 1) {}
    if (this.nivelEnsino === 2) {
      console.log(this.nivelEnsino);
      // this.estudante.numeroProcesso = this.formGroup05.controls.numeroProcesso.value;
      this.curso = this.formGroup06.controls.curso.value;
      // this.turma.id = this.formGroup06.controls.turma.value as number;
      this.periodo.id = this.formGroup06.controls.periodo.value;
      this.estudante.curso = this.curso;
      this.estudante.turma = this.turma;
      this.estudante.periodo = this.periodo;

    }
    this.estudante.instituto = this.formGroup05.controls.instituto.value;
    this.provincia.id = this.formGroup04.controls.provincia.value as number;
    this.municipio.id = this.formGroup04.controls.municipio.value as number;
    this.estudante.provincia = this.provincia;
    this.estudante.municipio = this.municipio;
    // this.estudante.periodo = this.formGroup05.controls.periodo.value;
    this.classe = this.formGroup06.controls.classe.value;
    console.log(this.classe);
    this.estudante.classe = this.classe;
    this.estudante.nivel = this.classe.ensinoNivel.descricao;
    this.estudante.ensinoNivel = this.classe.ensinoNivel;

    console.log(this.estudante);


    this.matriculaService.matericular(this.estudante)
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

  private showFailerFiealdMessage(err: string): void {
    this.notificationService
      .componentErrorMessage(':: ' + err);
  }

  private showSavedMessage(): void {
    this.notificationService.componentSavedSuccessfulMessage();
  }

  private showUpdatedMessage(): void {
    this.notificationService.componentUpdatedSuccessfulMessage();
  }

  private resolveDateFormat(): string {
    // tslint:disable-next-line: prefer-const
    let date = new Date(this.formGroup02.controls.dataNascimento.value).toISOString().slice(0, 10);
    // tslint:disable-next-line: prefer-const
    let ano: number = Number(date.substring(-1, 4));
    // tslint:disable-next-line: prefer-const
    let mes: number = Number(date.substring(5, 7));
    // tslint:disable-next-line: prefer-const
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
