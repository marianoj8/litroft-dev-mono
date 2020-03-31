import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { InstitutoService } from '../modules/instituto.service';
import { Instituto } from 'src/app/shared/model/instituto';

@Component({
  selector: 'app-instituto-detalhe',
  templateUrl: './instituto-detalhe.component.html',
  styleUrls: ['./instituto-detalhe.component.css']
})
export class InstitutoDetalheComponent implements OnInit {

  public instituto: Instituto;

  constructor(
    private activedRoute: ActivatedRoute,
    private institutoService: InstitutoService,
    private monografiaService: MonografiaService,
    private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.institutoService.onChangeContext.emit(true);
    this.institutoService.emitShowSearchBar.emit(false)
    this.institutoService.getById(this.activedRoute.snapshot.params.id)
      .subscribe(onValue => {
        this.instituto = onValue
        this.institutoService.onChangeContextTitle.emit(this.instituto.nome);

        if(onValue.nome.split(' ').length === 1){
          this.instituto.nome = `Escola do ${onValue.nivel.descricao} ${onValue.nome}`;
        }

      });
  }

  back() {
    this.location.back();
  }

}
