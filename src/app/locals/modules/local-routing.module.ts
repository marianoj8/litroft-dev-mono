import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalsComponent } from '../locals.component';

const routes: Routes = [
    {
        path: '',
        component: LocalsComponent,
        children: [
            {
                path: '',
            },
            {
                path: '',
            },
            {
                path: '',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocalRoutingModule {

}