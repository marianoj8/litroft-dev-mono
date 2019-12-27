import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinciaComponent } from '../provincia.component';

const routes: Routes = [
  {
    path: '',
    component: ProvinciaComponent,
    children: [
      {
        path: '',
        component: null,
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
