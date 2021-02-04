import { User } from './../../shared/model/User';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { of, Subject, Subscription } from 'rxjs';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { catchError } from 'rxjs/operators';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/users/modules/user.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationUser } from 'src/app/shared/model/application-user';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';

@Component({
  selector: 'app-user-list',
  templateUrl:'./user-list.component.html',
  styleUrls:['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;
  users: MatTableDataSource<ApplicationUser>;
  cursosList: ApplicationUser[] = [];
  error$ = new Subject<boolean>();
  public perfil = localStorage.getItem('acessType');



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'username',
    'perfil',
    'detalhe',
    'edit',
    'delete'
  ];
 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    public monografiaService: MonografiaService,
    private notification: NotificationService,
    private dialogService: MatDialog) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.userService.onChangeContext.emit(false);

    if (this.perfil === 'Estudante' || this.perfil == 'Orientador'){
      this.displaydColumns = this.displaydColumns.slice(0,4);
    }

    // this.sub = this.userService.findValueParams
    //   .subscribe(next => this.onRefrash(next));

    // this.sub = this.userService.findValueParam
    //   .subscribe(next => this.cursos.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.userService.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next)
    );

    this.sub = this.userService.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next)
    );

    this.sub = this.userService.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next)
    );

    this.sub = this.userService.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next)
    );
  }

  onFilterFromServer(data: CustomFilter) {
    // this.sub = this.userService.filterByNomeDuracao(data).subscribe(
    //   (next: ApplicationUser[]) => this.userList = next
    // );
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.userService.listUser()
      .pipe(
        catchError(err => {
          console.log(err);

          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: User) => {
            return {
              ...item
            };

          });
          this.users = new MatTableDataSource(array);
          this.users.sort = this.sort;
          this.cursosList = this.users.data;
        });
  }

  private showErrorMessage() {
    this.notification.componentLoadingFailedMessage();
  }
  private showDeletedMessage() {
    this.notification.componentDeletetedSuccessfulMessage();
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  detalhe(id: number) {
    this.router.navigate(['detalhe', id], { relativeTo: this.activatedRoute });
  }
  edit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }

  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'User';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
      }
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialogService.open(
      DeleteDialogComponent,
      {
        data: id,
        height: '200px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteUser(id);
      }

    });
  }
  deleteUser(id: number) {
    throw new Error('Method not implemented.');
  }

  deleteCurso(userId: number) {
    // this.userService.deleteById(userId)
    //   .subscribe(
    //     () => {
    //       this.onRefrash(this.filtro);
    //       this.showDeletedMessage();
    //     },
    //     err => this.showErrorMessage()
    //   );
  }
}
