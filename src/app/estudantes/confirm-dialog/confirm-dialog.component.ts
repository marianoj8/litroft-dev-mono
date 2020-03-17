import { catchError } from 'rxjs/operators';
import { TurmaService } from './../../turmas/modules/turma.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Turma } from 'src/app/shared/model/turma';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  turmas$: Observable<Turma[]>;

  constructor(
    private turmaService: TurmaService
  ) {

  }

  ngOnInit(): void {
    this.turmas$ = this.turmaService.list();
    this.turmaService.list().subscribe(e => console.log(e));
  }

}
