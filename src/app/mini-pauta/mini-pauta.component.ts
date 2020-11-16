import { AnoLetivo } from 'src/app/shared/model/support/AnoLetivo';
import { debounceTime } from 'rxjs/operators';
import { Diciplina } from 'src/app/shared/model/diciplina';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { MiniPautaService } from './modules/mini-pauta.service';
import { Curso } from '../shared/model/curso';
import { Classe } from '../shared/model/classe';
import { Turma } from '../shared/model/turma';
import { CursoService } from '../cursos/modules/curso.service';
import { ClasseService } from '../classe/modules/classe.service';
import { TurmaService } from '../turmas/modules/turma.service';
import { DiciplinaService } from '../diciplinas/modules/diciplina.service';
import { AnoLetivoService } from '../ano-letivo/modules/ano-letivo.service';

@Component({
  selector: 'app-mini-pauta',
  templateUrl: './mini-pauta.component.html',
  styleUrls: ['./mini-pauta.component.css']
})
export class MiniPautaComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  private filter: CustomFilter = new CustomFilter();
  private sub: Subscription;
  public formGroupSearch: FormGroup;
  public cursos: Curso[];
  public classes: Classe[];
  public turmas: Turma[];
  public diciplinas: Diciplina[];
  public years: AnoLetivo[];
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  constructor(
    private anoLetivoService: AnoLetivoService,
    private cursoService: CursoService,
    private classeService: ClasseService,
    private turmaService: TurmaService,
    private diciplinaService: DiciplinaService,
    private miniPautaService: MiniPautaService,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.diciplinaService.onChangeContextTitle.emit('Pauta');
  }

  ngOnInit() {
    this.sub = this.miniPautaService.onChangeContext
      .subscribe(context => this.onChangeContext = context);

    this.anoLetivoService.list('').subscribe((e) => this.years = e);

    this.formGroupSearch = this.formBuilder.group({
      curso: [],
      classe: [],
      turma: [],
      diciplina: [],
      estudanteNome: [],
      anoLetivo: [13]
    });

    this.initFiealds();
    this.filter.anoLetivo = this.formGroupSearch.controls.anoLetivo.value;
    this.formGroupSearch.controls.estudanteNome.valueChanges
      .subscribe((value) => {
        this.findFromServer(value);
      });
  }

  private initFiealds() {
    this.filter.institutoId = this.entityId;
    this.formGroupSearch.controls.anoLetivo.valueChanges
      .subscribe((value) => {
        this.filter.anoLetivo = value;
      });
    this.fillSelectCurso();
    this.formGroupSearch.controls.curso.valueChanges
      .subscribe((value) => {
        this.filter.cursoId = value;
        this.fillSelectClasse();
      });
    this.formGroupSearch.controls.classe.valueChanges
      .subscribe((value) => {
        this.filter.classeId = value;
        this.fillSelectTurma();
      });
    this.formGroupSearch.controls.turma.valueChanges
      .subscribe((value) => {
        this.filter.turmaId = value;
      });
    this.fillSelectDiciplina();
    this.formGroupSearch.controls.diciplina.valueChanges
      .subscribe((value) => {
        this.filter.diciplinaId = value;
        console.log(this.filter);

      });
  }

  private fillSelectCurso(): void {
    this.cursoService.list(this.entityId)
      .subscribe((value) => this.cursos = value);
  }

  private fillSelectClasse(): void {
    this.classeService.list()
      .subscribe((value) => this.classes = value);
  }

  private fillSelectDiciplina(): void {
    this.filter.nome = '';
    this.diciplinaService.list(this.filter, this.entityId)
      .subscribe((value) => this.diciplinas = value);
  }

  private fillSelectTurma(): void {
    console.log(this.filter);
    this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)
      .subscribe((value) => this.turmas = value);

    this.formGroupSearch.controls.estudanteNome.valueChanges
      .subscribe((value) => this.filter.estudanteNome = value);
  }

  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.miniPautaService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filter.nome = value.trim();
    this.miniPautaService.findValueParamFromServer.emit(this.filter);
  }

  showAll() {
    this.filter.nome = '';
    this.diciplinaService.findValueParams.emit(this.filter);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(nome) {
    this.filter.nome = nome;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
