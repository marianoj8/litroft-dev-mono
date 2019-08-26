import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { EstudanteService } from './../../estudantes/modules/estudante.service';
import { OrientadorService } from './../../orientadores/modules/OrientadorService.service';
import { MatDailogTypeParam } from '../model/support/mat-dialog-type-param';

@Component({
  selector: 'app-more-options-dialog',
  templateUrl: './more-options-dialog.component.html',
  styleUrls: ['./more-options-dialog.component.css']
})
export class MoreOptionsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDailogTypeParam,
    private estudanteService: EstudanteService,
    private orientadorService: OrientadorService) { }

  ngOnInit() {
  }

  onDetalheButtonCliked() {
    const id = this.data.id;
    const entityName = this.data.entityName;
    switch (entityName) {
      case 'Estudante':
        this.estudanteService.emitOnDetalheButtonCliked.emit(id);
        break;
      case 'Orientador':
        this.orientadorService.emitOnDetalheButtonCliked.emit(id)
        break;
      default:
    }
  }
  onEditButtonCliked() {
    const id = this.data.id;
    const entityName = this.data.entityName;
    switch (entityName) {
      case 'Estudante':
        this.estudanteService.emitOnEditButtonCliked.emit(id);
        break;
      case 'Orientador':
        this.orientadorService.emitOnEditButtonCliked.emit(id)
        break;
      default:
    }
  }
  onDeleteButtonCliked() {
    const id = this.data.id;
    const entityName = this.data.entityName;
    switch (entityName) {
      case 'Estudante':
        this.estudanteService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Orientador':
        this.orientadorService.emitOnDeleteButtonCliked.emit(id)
        break;
      default:
    }
  }
}
