import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-grupo-detalhe',
  templateUrl: './grupo-detalhe.component.html',
  styleUrls: ['./grupo-detalhe.component.css']
})
export class GrupoDetalheComponent implements OnInit {

  constructor(private monografiaService: MonografiaService, private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
