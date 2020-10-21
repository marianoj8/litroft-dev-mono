import { Location } from '@angular/common';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, Subscription } from 'rxjs';
import { DepartamentoService } from 'src/app/departamentos/modules/departamento.service';
import { ProjetoService } from 'src/app/projetos/modules/projeto.service';
import { Projeto } from 'src/app/shared/model/projeto';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';

import { MonografiaService } from '../modules/monografia.service';
import { Departamento } from './../../shared/model/departamento';
import { Monografia } from './../../shared/model/monografia';
import { LoadingUploadComponent } from './../../shared/loading-upload/loading-upload.component';

@Component({
  selector: 'app-mono-form',
  templateUrl: './mono-form.component.html',
  styleUrls: ['./mono-form.component.css'],
})
export class MonoFormComponent implements OnInit, OnDestroy {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  departamentos$: Observable<Departamento[]>;
  projetos$: Observable<Projeto[]>;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  monografia: Monografia = new Monografia();
  projeto: Projeto = new Projeto();
  pdfSrc = '';
  dialogRef;
  private id = 0;
  private sub: Subscription;
  private selectedFile: File = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private monografiaService: MonografiaService,
    private departamentoSerice: DepartamentoService,
    private projetoSerice: ProjetoService,
    private notificationService: NotificationService,
    private location: Location,
    private dialogService: MatDialog
  ) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.monografiaService.onChangeContext.emit(true);
    this.initForms();

    this.formGroup01.controls.projeto.valueChanges
      .subscribe((resp1) => {
        this.projetoSerice.getById(resp1)
          .subscribe((resp: Projeto) => this.projeto = resp);
      });

    this.departamentos$ = this.departamentoSerice.list();
    this.projetos$ = this.projetoSerice.list();

    if (this.router.url.match('/edit')) {
      this.sub = this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.sub = this.monografiaService.getById(this.id)
        .subscribe(data => {
          this.monografia = data;

          this.formGroup01.patchValue({
            pagina: this.monografia.paginas,
            projeto: this.monografia.projeto.id
          });

        });
    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      pagina: [20, [
        Validators.min(20),
        Validators.max(100),
        Validators.required
      ]],
      projeto: [null, [
        Validators.required]]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {
    this.monografia.paginas = this.formGroup01.controls.pagina.value;
    this.monografia.projeto = this.projeto;
    this.monografia.departamento = this.projeto.grupo.curso.departamento;
    this.monografia.file = this.selectedFile;


    if (this.selectedFile == null) {
      this.notificationService
        .componentErrorMessage(':: Nenhum arqivo PDF foi selecionado para   carregar...');

    } else {
      this.openLoadingUpload();

      this.monografiaService.save(this.monografia)
        .subscribe(
          (event) => {

            if (event.type === HttpEventType.UploadProgress) {
              this.monografiaService.emitStatusUploader.emit(event);
            } else if (event) {
              console.log(this.dialogRef);
              this.dialogRef.close();
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

            }
          },
          (err: HttpErrorResponse) => this.showFailerMessage(err)
        );
    }
  }

  private showFailerMessage(err: HttpErrorResponse): void {
    this.dialogRef.close();
    if (err.error.message === 'Required request part \'file\' is not present') {
      this.notificationService
        .componentErrorMessage(':: Nenhum arqivo PDF foi selecionado para carregar...');
    } else {
      this.notificationService
        .componentErrorMessage(':: ' + err.error.message);
    }
  }


  private showSavedMessage(): void {
    this.notificationService.componentSavedSuccessfulMessage();
  }

  private showUpdatedMessage(): void {
    this.notificationService.componentUpdatedSuccessfulMessage();
  }

  back() {
    this.router.navigate(['/monografias']);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
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
    this.dialogRef = this.dialogService.open(
      LoadingUploadComponent,
      {
        height: '165px',
        width: '380px'
      });

    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
      }
    });


  }


}
