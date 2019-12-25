import { Component, OnInit } from '@angular/core';
import { MonografiaService } from './../modules/monografia.service';
import { GrupoService } from 'src/app/grupos/modules/grupo.service';
import { Grupo } from './../../shared/model/grupo';
import { Router } from '@angular/router';
import { CustomFilter } from '../../shared/model/support/custom-filter';

@Component({
  selector: 'app-mono-list',
  templateUrl: './mono-list.component.html',
  styleUrls: ['./mono-list.component.css']
})
export class MonoListComponent implements OnInit {

  page: number;
  pdfSrc: string[];
  grupos: Grupo[] = [];

  constructor(
    private router: Router,
    private monografiaService: MonografiaService,
    private grupoService: GrupoService) {

    this.monografiaService.emitShowAddButton.emit(false);
  }

  ngOnInit() {
    this.onRefresh('');

    this.monografiaService.findValueParams
      .subscribe((value: CustomFilter) => {
        this.onRefresh(value.descricao === undefined ? '' : value.descricao);
      });
  }

  onRefresh(value: string): void {
    this.grupoService.listByDescricao(value)
      .subscribe((values) => {
        this.grupos = [];
        values.forEach((v: Grupo) => {
          if (v.monografiaID !== null) {
            this.grupos.push(v);
          }
        });
      });
  }

  // onFileSelected() {
  //   let doc: any = document.querySelector('#file');
  //   if (typeof (FileReader) !== 'undefined') {
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.pdfSrc = e.target.result;
  //     }

  //     reader.readAsArrayBuffer(doc.files[0])
  //   }
  // }

  onReadMode(value: string) {
    this.router.navigate(['public/reading', value]);
  }
}
