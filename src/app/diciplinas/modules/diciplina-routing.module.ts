import { DicipliasListComponent } from './../diciplias-list/diciplias-list.component';
import { DiciplinasComponent } from './../diciplinas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { DiciplinaFormComponent } from '../diciplina-form/diciplina-form.component';


const routes: Routes = [
  {
    path: '',
    component: DiciplinasComponent,
    children: [
      {
        path: '',
        component: DicipliasListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: DiciplinaFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiciplinaRoutingModule { }
