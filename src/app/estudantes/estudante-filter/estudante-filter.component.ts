import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Curso } from 'src/app/shared/model/curso';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { EstudanteService } from '../modules/estudante.service';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { Turma } from 'src/app/shared/model/turma';

@Component({
  selector: 'app-estudante-filter',
  templateUrl: './estudante-filter.component.html',
  styleUrls: ['./estudante-filter.component.css']
})
export class EstudanteFilterComponent implements OnInit {

  curso = 0;
  step = 0;
  filter: CustomFilter = new CustomFilter();
  cursos$: Observable<Curso[]>;
  turma$: Observable<Turma[]>;

  constructor(
    private turmaService: TurmaService,
    private cursoSerice: CursoService,
    private estudanteSerice: EstudanteService,
  ) { }

  ngOnInit() {
    this.cursos$ = this.cursoSerice.list();
  }

  onSelectedCurso(curso: Curso) {
    this.filter.curso = curso.nome;
    this.turma$ = this.turmaService.findAllByCurso(curso.id);
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
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onApplyFilter() {
    this.estudanteSerice.findValueParams.emit(this.filter);
  }

}
