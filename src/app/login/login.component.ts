import { Component, OnInit } from '@angular/core';
import { LoginService } from './modules/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.onChangeContextTitle.emit('');

    this.loginService.mostrarMenu.emit(false);
    this.loginService.onChangeContext.emit(false);
  }
}
