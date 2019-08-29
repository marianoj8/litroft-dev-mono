import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Departamento } from 'src/app/shared/model/departamento';
import { DepartamentoService } from '../modules/departamento.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';

@Component({
  selector: 'app-departamento-detalhe',
  templateUrl: './departamento-detalhe.component.html',
  styleUrls: ['./departamento-detalhe.component.css']
})
export class DepartamentoDetalheComponent implements OnInit {


  departamento$: Observable<Departamento>;
  // departamentoError$: Subject<boolean>;

  constructor(
    private service: DepartamentoService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.departamento$ = this.service
      .getById(this.activatedRoute.snapshot.params['id'] as number)
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        return of(null);
      }));
  }

  getBack() {

  }

}
