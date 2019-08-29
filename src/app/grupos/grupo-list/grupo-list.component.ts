import { Component, OnInit } from '@angular/core';

import { GrupoService } from './../modules/grupo.service';
import { Grupo } from 'src/app/shared/model/grupo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.css']
})
export class GrupoListComponent implements OnInit {

  grupos$: Observable<Grupo[]>;

  constructor(private grupoService: GrupoService) { }

  ngOnInit() {
    this.grupos$ = this.grupoService.list();
  }

}
