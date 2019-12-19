import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstitutoService } from './modules/instituto.service';
import { Subscription } from 'rxjs';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.css']
})
export class InstitutoComponent implements OnInit, OnDestroy {

  public onChangeContext = false;
  private sub: Subscription;
  constructor(
    private institutoService: InstitutoService,
    private cursoService: CursoService,
    private monografiaService: MonografiaService,
    private location: Location) {
    this.cursoService.onChangeContextTitle.emit('Institutos');
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.sub = this.institutoService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );
  }

  cleanSearchField() { }
  onFilterSearch() { }
  find($event, param: string) { }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
