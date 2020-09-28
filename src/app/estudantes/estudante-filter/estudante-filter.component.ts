import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Curso } from 'src/app/shared/model/curso';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { EstudanteService } from '../modules/estudante.service';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { Turma } from 'src/app/shared/model/turma';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-estudante-filter',
  templateUrl: './estudante-filter.component.html',
  styleUrls: ['./estudante-filter.component.css']
})
export class EstudanteFilterComponent implements OnInit {

  curso = 0;
  step = 0;
  filter: CustomFilter = new CustomFilter();
  cursos: Curso[];
  turmas: Turma[];
  years: number[];
  formGroup: FormGroup;
  isAllYears: boolean;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  constructor(
    private turmaService: TurmaService,
    private cursoSerice: CursoService,
    private estudanteSerice: EstudanteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.isAllYears = false;
    this.formGroup = this.formBuilder.group({
      curso: [null],
      turma: [null],
      anoletivoType: [3],
      anoletivo: [new Date().getFullYear()],
      sexo: 'Todos'
    });

    this.turmas = [];
    this.cursos = [];
    this.years = [];

    this.cursoSerice.list()
      .subscribe(onValue => this.cursos = onValue);

    this.formGroup.controls.curso.valueChanges
      .subscribe((onValue) => {
        this.turmaService.findAllByCurso(onValue, this.entityId)
          .subscribe(onValues => {
            this.turmas = onValues;
            if (this.turmas.length > 0) {
              this.filter.curso = this.turmas[0].curso.nome;
            }
          });
      });

    this.formGroup.controls.turma.valueChanges
      .subscribe((onValue: Turma) => {
        this.filter.turma = onValue.sigla;
      });

    this.formGroup.controls.sexo.valueChanges
      .subscribe((onValue) => this.onSelectedSexo(onValue)
      );

    this.formGroup.controls.anoletivoType.valueChanges
      .subscribe((onValue) => {
        if (onValue === 3) {
          this.isAllYears = false;
        } else {
          this.isAllYears = true;
        }
        this.filter.anoletivoType = onValue;
      });

    this.formGroup.controls.anoletivo.valueChanges
      .subscribe((onValue) => {
        this.filter.entrada = onValue;
        this.filter.finalista = onValue;
      });

    for (let i = 2008; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
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
    console.log(this.filter);

  }

}
