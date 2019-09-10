import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

import { Orientador } from 'src/app/shared/model/orientador';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { OrientadorService } from '../modules/OrientadorService.service';

@Component({
  selector: 'app-orientador-detalhe',
  templateUrl: './orientador-detalhe.component.html',
  styleUrls: ['./orientador-detalhe.component.css']
})
export class OrientadorDetalheComponent implements OnInit {

  orientador$: Observable<Orientador>;
  // orientadorError$: Subject<boolean>;

  constructor(
    private service: OrientadorService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location) { }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.orientador$ = this.service
      .getById(this.activatedRoute.snapshot.params.id as number)
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        return of(null);
      }));
  }

  back() {
    this.location.back();
  }

}
