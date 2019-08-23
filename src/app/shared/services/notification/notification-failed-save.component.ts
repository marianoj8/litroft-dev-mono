import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-error-save-component',
  template: `
            <span class="example-pizza-part">
            <mat-icon>done_all</mat-icon>
                Ocorreu um erro ao Cadastrar!
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
export class SaveFailedMessageComponent { }
