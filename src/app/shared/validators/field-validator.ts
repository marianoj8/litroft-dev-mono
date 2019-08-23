import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';

export class MyErrorStateMatch implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmited = form && form.submitted;
    return !!(control && control.invalid &&
      (control.dirty || control.touched || isSubmited));
  }

}

