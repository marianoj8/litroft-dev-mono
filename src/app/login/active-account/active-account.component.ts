import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../shared/services/security/auth.service';
import { UsernameAndPassword } from '../../shared/model/support/username-password';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {
  activationForm: FormGroup;
  error$ = new Subject<string>();
  hide = true;
  formBuilder = new FormBuilder();
  user = new UsernameAndPassword();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.activationForm = this.formBuilder.group({
      serial: ['', [
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.required
      ]], username: ['', [
        Validators.minLength(6),
        Validators.maxLength(28),
        Validators.required
      ]], password: ['', [
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.user.username = this.activationForm.controls.username.value;
    this.user.password = this.activationForm.controls.password.value;
    this.user.serialNumber = this.activationForm.controls.serial.value;
    this.authService.activeAccount(this.user);
  }

}
