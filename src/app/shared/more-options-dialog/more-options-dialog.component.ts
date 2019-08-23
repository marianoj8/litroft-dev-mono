import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { EstudanteService } from './../../estudantes/modules/estudante.service';

@Component({
  selector: 'app-more-options-dialog',
  templateUrl: './more-options-dialog.component.html',
  styleUrls: ['./more-options-dialog.component.css']
})
export class MoreOptionsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private estudanteService: EstudanteService) { }

  ngOnInit() {
  }

  onDetalheButtonCliked() {
    this.estudanteService.emitOnDetalheButtonCliked.emit(this.data);
  }
  onEditButtonCliked() {
    this.estudanteService.emitOnEditButtonCliked.emit(this.data);
  }
  onDeleteButtonCliked() {
    this.estudanteService.emitOnDeleteButtonCliked.emit(this.data);
  }

}
