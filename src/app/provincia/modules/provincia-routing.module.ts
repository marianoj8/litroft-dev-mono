import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinciaComponent } from '../provincia.component';
import { ProvinciaListComponent } from '../provincia-list/provincia-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinciaComponent,
    children: [
      {
        path: '',
        component: ProvinciaListComponent,
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
