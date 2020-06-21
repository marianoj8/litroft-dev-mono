import { Component, OnInit } from '@angular/core';
import { EstudanteService } from '../modules/estudante.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-estudante-master-detalhe',
  templateUrl: './estudante-master-detalhe.component.html',
  styleUrls: ['./estudante-master-detalhe.component.css']
})
export class EstudanteMasterDetalheComponent implements OnInit {

  constructor(
    private service: EstudanteService,
  ) {

  }

  ngOnInit(): void {
  }

}
