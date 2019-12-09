import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { EstudanteService } from '../modules/estudante.service';

@Component({
  selector: 'app-estudante-filter',
  templateUrl: './estudante-filter.component.html',
  styleUrls: ['./estudante-filter.component.css']
})
export class EstudanteFilterComponent implements OnInit {

  curso = 0;
  filter: CustomFilter = new CustomFilter();
  cursos$: Observable<Curso[]>;

  constructor(
    private cursoSerice: CursoService,
    private estudanteSerice: EstudanteService,
  ) { }

  ngOnInit() {
    this.cursos$ = this.cursoSerice.list();
  }

  onSelectedCurso(curso: Curso) {
    this.filter.curso = curso.nome;
  }
  onSelectedSexo(sexo: string) {
    if (sexo.startsWith('M')) {
      this.filter.sexo = 'M';
    } else if (sexo.startsWith('F')) {
      this.filter.sexo = 'F';
    } else {
      this.filter.sexo = '';
    }
  }

  onApplyFilter() {
    this.estudanteSerice.findValueParams.emit(this.filter);
  }

}
