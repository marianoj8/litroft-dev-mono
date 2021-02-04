import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { Curso } from 'src/app/shared/model/curso';
import { CursoService } from '../modules/curso.service';

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
    private monografiaService: MonografiaService,
    private dialog: MatDialog) {
    this.monografiaService.emitShowAddButton.emit(true);

    console.log(this.activatedRoute.snapshot.params.id);
    
  }

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
