import { Component, OnInit } from '@angular/core';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-instituto-detalhe',
  templateUrl: './instituto-detalhe.component.html',
  styleUrls: ['./instituto-detalhe.component.css']
})
export class InstitutoDetalheComponent implements OnInit {

  constructor(private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
  }

}
