import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { CursoService } from '../modules/curso.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  curso$: Observable<Curso>;
  // cursoError$: Subject<boolean>;

  constructor(
    private service: CursoService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.curso$ = this.service
      .getById(this.activatedRoute.snapshot.params.id as number)
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        return of(null);
      }));
  }

  getBack() {

  }

}
