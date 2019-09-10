import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-error-login-component',
  template: `
            <span class="example-pizza-part">
            <mat-icon>error</mat-icon>
                Nome de usuario e/ou senha incorretos.
                por favor, verifique suas credencias e tenete novamente...
            </span>
            `,
  styles: [`
    .example-pizza-part{
      color: white;
      text-align: center;
      font-size: 15px !important;
    }
  `]
})
export class LoginFailedMessageComponent { }
