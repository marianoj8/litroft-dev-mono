import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { Estudante } from 'src/app/shared/model/estudante';

import { EstudanteService } from './../modules/estudante.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ErrorLoadingComponent } from './../../shared/error-loading/error-loading.component';

@Component({
  selector: 'app-estudante-detalhe',
  templateUrl: './estudante-detalhe.component.html',
  styleUrls: ['./estudante-detalhe.component.css']
})
export class EstudanteDetalheComponent implements OnInit {

  estudante$: Observable<Estudante>;
  // estudanteError$: Subject<boolean>;

  constructor(
    private service: EstudanteService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.estudante$ = this.service
      .getById(this.activatedRoute.snapshot.params['id'] as number)
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        return of(null);
      }));
  }

  getBack() {

  }

}
