import { Location } from '@angular/common';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, Subscription } from 'rxjs';

import { DepartamentoService } from 'src/app/departamentos/modules/departamento.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { MonografiaService } from '../modules/monografia.service';
import { Departamento } from './../../shared/model/departamento';
import { Monografia } from './../../shared/model/monografia';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ProjetoService } from 'src/app/projetos/modules/projeto.service';
import { Projeto } from 'src/app/shared/model/projeto';
import { environment } from 'src/environments/environment';

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
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.monografiaService.onChangeContext.emit(true);
    this.initForms();

    this.formGroup01.controls.projeto.valueChanges
      .subscribe((resp) => {
        this.projetoSerice.getById(resp)
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



    const formData = new FormData();
    formData.append('file', this.selectedFile);
    const request = new HttpRequest('POST', `${environment.API}/interno/mono/uploadFile?departamentoId=${this.monografia.departamento.id}&grupoId=${this.monografia.projeto.grupo.id}&paginas=${this.monografia.paginas}&projetoId=${this.monografia.projeto.id}`, formData);
    this.http.request<any>(request)
      .subscribe(res => console.log(res));

    // this.http.post(`${environment.API}/admin/mono/uploadFile1`, fd)
    //   .subscribe(res => console.log(res));


    // this.monografiaService.save(this.monografia);
    // .subscribe(
    //   (data: Monografia) => {
    //     if (!!state) {
    //       if (this.router.url.match('/edit')) {
    //         this.showUpdatedMessage();
    //       } else {
    //         this.showSavedMessage();
    //       }
    //       this.back();
    //     } else {
    //       if (this.router.url.match('/edit')) {
    //         this.showUpdatedMessage();
    //       } else {
    //         this.showSavedMessage();
    //       }
    //       stepper.reset();
    //     }
    //   },
    //   (err: HttpErrorResponse) => this.showFailerMessage(err)
    // );

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

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }


  onFileSelected(event) {
    let doc: any = document.querySelector('#file');
    this.onUpload(event);

    if (typeof (FileReader) !== 'undefined') {
      let reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer(doc.files[0]);
    }
  }

  onUpload(event) {
    this.selectedFile = event.target.files[0] as File;
  }


}
