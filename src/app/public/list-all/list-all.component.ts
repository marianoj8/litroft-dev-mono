import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from 'src/app/shared/model/grupo';

import { PublicService } from '../modules/public.service';
import { MonografiaService } from './../../monografias/modules/monografia.service';
import { Instituto } from 'src/app/shared/model/instituto';

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
    private publicService: PublicService) {
    this.publicService.onChangeContext.emit(true);
    this.monografiaService.emitShowAddButton.emit(true);

  }

  ngOnInit() {
    this.grupos = [];
    this.fetchAllMonografiaByGrups();

    this.publicService.emitSelectedSchool.subscribe((resp: Instituto) => {

      if (resp.id !== null) {

        this.publicService.listByInstitutoId(resp.id)
          .subscribe((values) => {
            this.grupos = [];
            values.forEach((v: Grupo) => {
              if (v.monografiaID !== null) {
                this.grupos.push(v);
              }
            });
          });

      } else {
        this.fetchAllMonografiaByGrups();
      }

    });

  }

  private fetchAllMonografiaByGrups(): void {
    this.publicService.list()
      .subscribe((values) => {
        this.grupos = [];
        values.forEach((v: Grupo) => {
          if (v.monografiaID !== null) {
            this.grupos.push(v);
          }
        });
      });
  }

  onReadMode(value: string) {
    this.router.navigate(['public/reading', value]);
  }

}
