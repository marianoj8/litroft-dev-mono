import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from '../public.component';
import { ListAllComponent } from '../list-all/list-all.component';
import { ReadModeComponent } from '../read-mode/read-mode.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent, children: [
      {
        path: '',
        component: ListAllComponent
      },
      {
        path: 'reading/:id',
        component: ReadModeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
