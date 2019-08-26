import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Estudante } from './../model/estudante';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDailogTypeParam) { }

  ngOnInit() {
  }

}
