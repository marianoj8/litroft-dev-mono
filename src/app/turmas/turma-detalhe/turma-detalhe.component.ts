import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { TurmaService } from '../modules/turma.service';
import { Turma } from 'src/app/shared/model/turma';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-turma-detalhe',
  templateUrl: './turma-detalhe.component.html',
  styleUrls: ['./turma-detalhe.component.css']
})
export class TurmaDetalheComponent implements OnInit {

  turma$: Observable<Turma>;
  // turmaError$: Subject<boolean>;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  constructor(
    private service: TurmaService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(true);
    this.turma$ = this.service
      .getById(this.activatedRoute.snapshot.params.id as number, this.entityId)
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        return of(null);
      }));
  }

  getBack() {
    this.location.back();
  }

}
