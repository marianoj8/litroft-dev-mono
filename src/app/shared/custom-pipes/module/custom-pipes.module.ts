import { NgModule } from '@angular/core';
import { ProfileNamePipe } from '../profile-name.pipe';
import { ViewesNumberPipe } from '../viewes-number.pipe';
import { IdadePipe } from '../idade.pipe';

@NgModule({
  declarations: [
    ProfileNamePipe,
    ViewesNumberPipe,
    IdadePipe
  ],
  exports: [
    ProfileNamePipe,
    ViewesNumberPipe,
    IdadePipe
  ]
})
export class CustomPipesModule { }
