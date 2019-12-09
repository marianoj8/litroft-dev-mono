import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';

import { Local } from '../shared/model/local';
import { CustomFilter } from '../shared/model/support/custom-filter';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  cursos$: Observable<Local[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor() { }

  ngOnInit() {
  }

}
