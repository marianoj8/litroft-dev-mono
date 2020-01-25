import { NgModule } from '@angular/core';
import { ProfileNamePipe } from '../profile-name.pipe';
import { ViewesNumberPipe } from '../viewes-number.pipe';

@NgModule({
  declarations: [
    ProfileNamePipe,
    ViewesNumberPipe
  ],
  exports: [
    ProfileNamePipe,
    ViewesNumberPipe
  ]
})
export class CustomPipesModule { }
