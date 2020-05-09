import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalsComponent } from '../locals.component';
import { LocalListComponent } from '../local-list/local-list.component';
import { LocalFormComponent } from '../local-form/local-form.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LocalsComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                component: LocalListComponent,
            },
            {
                path: 'add',
                canActivate: [AuthGuard],
                component: LocalFormComponent
            },
            {
                path: 'edit/:id',
                canActivate: [AuthGuard],
                component: LocalFormComponent
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
