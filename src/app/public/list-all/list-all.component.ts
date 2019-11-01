import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from 'src/app/shared/model/grupo';

import { PublicService } from '../modules/public.service';

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
    private publicService: PublicService) {
    this.publicService.onChangeContext.emit(true);
  }

  ngOnInit() {
    this.grupos = [];
    this.publicService.list()
      .subscribe((values) => {
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
