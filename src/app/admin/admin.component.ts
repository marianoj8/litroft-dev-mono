import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from './modules/admin.service';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { Admin } from '../shared/model/admin';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { PublicService } from '../public/modules/public.service';
import { MonografiaService } from '../monografias/modules/monografia.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { CursoSearchComponent } from '../cursos/curso-search/curso-search.component';
// import { CursoSearchComponent } from '../cursos/admin-search/admin-search.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {


  state = false;
  public onChangeContext = false;
  cursos$: Observable<Admin[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  anos: number[] = [1, 2, 3, 4, 5, 6];

  constructor(
    private adminService: AdminService,
    private publicService: PublicService,
    private monografiaService: MonografiaService,
    private dialogService: MatDialog,
    private location: Location) {
    this.adminService.onChangeContextTitle.emit('Director');
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.sub = this.adminService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.cursos$ = this.adminService.list()
      .pipe(catchError(err => {
        this.cursosError$.next(true);
        return of([]);
      }));


    this.publicService.enableReadMode.emit(false);
  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.adminService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.adminService.findValueParamFromServer.emit(this.filtro);
  }

  filterByDuracao(duracao: number) {
    this.filtro.duracao = duracao;
    this.adminService.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.filtro.duracao = 1;
    this.adminService.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(nome) {
    this.filtro.nome = nome;
  }

  onFilterSearch() {
    const dialogRef = this.dialogService.open(
      CursoSearchComponent,
      {
        height: '500px',
        width: '380px'
      });
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBtnSearch() {
    const form = document.getElementsByTagName('mat-form-field');
    // form[0].(" width: 3.8%"," width: 100%")
  }
}
