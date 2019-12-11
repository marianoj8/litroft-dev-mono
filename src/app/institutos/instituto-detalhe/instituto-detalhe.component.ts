import { Component, OnInit } from '@angular/core';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { InstitutoService } from '../modules/instituto.service';

@Component({
  selector: 'app-instituto-detalhe',
  templateUrl: './instituto-detalhe.component.html',
  styleUrls: ['./instituto-detalhe.component.css']
})
export class InstitutoDetalheComponent implements OnInit {

  constructor(
    private institutoService: InstitutoService,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.institutoService.onChangeContext.emit(true);
  }

}
