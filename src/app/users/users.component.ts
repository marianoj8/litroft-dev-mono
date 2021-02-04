import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';

import { ApplicationUser } from './../shared/model/application-user';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { MonografiaService } from '../monografias/modules/monografia.service';
import { PublicService } from '../public/modules/public.service';
import { UserService } from './modules/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  users$: Observable<ApplicationUser[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;
  
  constructor(
    private cursoService: UserService,
    private publicService: PublicService,
    private monografiaService: MonografiaService,
    private dialogService: MatDialog,
    private location: Location) {
    this.cursoService.onChangeContextTitle.emit('Cursos');
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit(): void {
  }

}
