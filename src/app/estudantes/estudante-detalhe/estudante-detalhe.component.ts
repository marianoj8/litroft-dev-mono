import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { Estudante } from 'src/app/shared/model/estudante';
import { ErrorLoadingComponent } from './../../shared/error-loading/error-loading.component';
import { EstudanteService } from './../modules/estudante.service';

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
    private dialog: MatDialog,
    private location: Location,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.estudante$ = this.service
      .getById(this.activatedRoute.snapshot.params.id as number)
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        return of(null);
      }));
  }

  getBack() {
    this.location.back();
  }

}
