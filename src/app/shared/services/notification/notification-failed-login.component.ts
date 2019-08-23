import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-error-login-component',
  template: `
            <span class="example-pizza-part">
            <mat-icon>done_all</mat-icon>
                Nome de usuario e/ou senha incorretos. por favor, verifique suas credencias e tenete novamente...
            </span>
            `,
  styles: [`
    mat-icon {
     margin-bottom: -6px;
    }
    .example-pizza-part{
      color: white;
      font-size: 16px !important;
    }
  `]
})
export class LoginFailedMessageComponent { }
