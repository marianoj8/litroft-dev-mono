import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Especialidade } from 'src/app/shared/model/especialidade';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { EspecialidadeService } from '../modules/especialidade.service';

@Component({
  selector: 'app-especialidade-detalhe',
  templateUrl: './especialidade-detalhe.component.html',
  styleUrls: ['./especialidade-detalhe.component.css']
})
export class EspecialidadeDetalheComponent implements OnInit {

  especialidade$: Observable<Especialidade>;
  // especialidadeError$: Subject<boolean>;

  constructor(
    private service: EspecialidadeService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location) { }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.especialidade$ = this.service
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
