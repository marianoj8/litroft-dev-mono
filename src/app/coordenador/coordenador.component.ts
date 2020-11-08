import { AnoLetivo } from './../shared/model/support/AnoLetivo';
import { Curso } from './../shared/model/curso';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { CoordenadorService } from './modules/coordenador.service';
import { Classe } from '../shared/model/classe';
import { AnoLetivoService } from '../ano-letivo/modules/ano-letivo.service';
import { ClasseService } from '../classe/modules/classe.service';
import { CursoService } from '../cursos/modules/curso.service';

@Component({
  selector: 'app-coordendor',
  templateUrl: './coordenador.component.html',
  styleUrls: ['./coordenador.component.css']
})
export class CoordenadorComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;
  public formGroupSearch: FormGroup;
  public cursos: Curso[];
  public classes: Classe[];
  public years: AnoLetivo[];
  private institutoId = Number.parseInt(localStorage.getItem('entityId'), 10);

  constructor(
    private cursoService: CursoService,
    private classeService: ClasseService,
    private anoLetivoService: AnoLetivoService,
    private coordenadorService: CoordenadorService,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.coordenadorService.onChangeContextTitle.emit('Coordenador');
  }

  ngOnInit() {
    this.sub = this.coordenadorService.onChangeContext.subscribe(
      context => this.onChangeContext = context);

    this.cursoService.list(this.institutoId).subscribe((e) => this.cursos = e);
    this.classeService.list().subscribe((e) => this.classes = e);
    this.anoLetivoService.list('').subscribe((e) => this.years = e);

    this.formGroupSearch = this.formBuilder.group({
      curso: [],
      classe: [],
      estudanteNome: [],
      anoLetivo: [13]
    });

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.coordenadorService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.coordenadorService.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.coordenadorService.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(nome) {
    this.filtro.nome = nome;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
