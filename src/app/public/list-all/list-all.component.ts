import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from 'src/app/shared/model/grupo';

import { PublicService } from '../modules/public.service';
import { MonografiaService } from './../../monografias/modules/monografia.service';
import { CustomFilter } from '../../shared/model/support/custom-filter';
import { GrupoService } from 'src/app/grupos/modules/grupo.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {


  page: number;
  pdfSrc: string[];
  grupos: Grupo[] = [];



  constructor(
    private router: Router,
    private monografiaService: MonografiaService,
    private grupoService: GrupoService,
    private publicService: PublicService) {
    this.publicService.onChangeContext.emit(true);
    this.monografiaService.emitShowAddButton.emit(true);

  }

  ngOnInit() {
    this.grupos = [];
    this.fetchAllMonografiaByGrups('');

    // this.publicService.emitSelectedSchool.subscribe((resp: Instituto) => {

    //   if (resp.id !== null) {

    //     this.publicService.listByInstitutoId(resp.id)
    //       .subscribe((values) => {
    //         this.grupos = [];
    //         values.forEach((v: Grupo) => {
    //           if (v.monografiaID !== null) {
    //             this.grupos.push(v);
    //           }
    //         });
    //       });

    //   } else {
    //     this.fetchAllMonografiaByGrups('');
    //   }

    // });

    this.publicService.inFilterMonografias
      .subscribe((value: CustomFilter) => {
        this.fetchAllMonografiaByGrups(value.descricao);
      });

  }

  private fetchAllMonografiaByGrups(descricao: string): void {
    this.publicService.list(descricao)
      .subscribe((values) => {
        this.grupos = [];
        values.forEach((v: Grupo) => {
          if (v.monografiaID !== null) {
            this.grupos.push(v);
          }
        });
      });
  }

  onReadMode(grupo: Grupo) {
    this.grupoService.updateView(grupo).subscribe();
    this.router.navigate(['public/reading', grupo.monografiaID]);
  }

}
