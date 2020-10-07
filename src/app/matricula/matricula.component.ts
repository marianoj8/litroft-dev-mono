import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { Curso } from '../shared/model/curso';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { InscricaoService } from '../inscricao/modules/inscricao.service';
import { CursoService } from '../cursos/modules/curso.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { EstudanteFilterComponent } from '../estudantes/estudante-filter/estudante-filter.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ForbiddenErrorDialogComponent } from '../shared/forbidden-error-dialog/forbidden-error-dialog.component';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  cursos$: Observable<Curso[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  constructor(
    public inscricaoService: InscricaoService,
    private cursoSerice: CursoService,
    private location: Location,
    private dialogService: MatDialog) {
    this.inscricaoService.onChangeContextTitle.emit('Matriculas');
  }

  ngOnInit() {
    this.subscription = this.inscricaoService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.cursos$ = this.cursoSerice.list(this.entityId)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
      }));


  }

  openLargeFilterView() {
    const dialogRef = this.dialogService.open(
      EstudanteFilterComponent,
      {
        height: '550px',
        width: '600px'
      });
  }
  openSamllFilterView() {
    const dialogRef = this.dialogService.open(
      EstudanteFilterComponent,
      {
        height: '500px',
        width: '380px'
      });
  }

  emitFormStudant() {
    this.inscricaoService.emitFormScreen.emit(true);
  }

  emitSubscriptionOption() {
    this.inscricaoService.emitSubOption.emit(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public back(): void {
    this.onChangeContext = false;
    this.location.back();
  }

}
