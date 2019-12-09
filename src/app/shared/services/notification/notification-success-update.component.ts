import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-success-update-component',
  template: `
            <span class="example-pizza-part">
            <mat-icon>done_all</mat-icon>
                Alterado com sucesso!
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
export class UpdateSuccessMessageComponent { }


