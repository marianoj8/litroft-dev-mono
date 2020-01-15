import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinciaComponent } from '../provincia.component';
import { ProvinciaListComponent } from '../provincia-list/provincia-list.component';
import { ProvinciaFormComponent } from '../provincia-form/provincia-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinciaComponent,
    children: [
      {
        path: '',
        component: ProvinciaListComponent,
      },
      {
        path: 'add',
        component: ProvinciaFormComponent,
      },
       {
        path: 'edit/:id',
        component: ProvinciaFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinciaRoutingModule {

}
