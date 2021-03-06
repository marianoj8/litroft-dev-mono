import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-projeto-detalhe',
  templateUrl: './projeto-detalhe.component.html',
  styleUrls: ['./projeto-detalhe.component.css']
})
export class ProjetoDetalheComponent implements OnInit {

  constructor(private monografiaService: MonografiaService, private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
