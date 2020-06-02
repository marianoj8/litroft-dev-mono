import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { EstudanteService } from './../../estudantes/modules/estudante.service';
import { OrientadorService } from './../../orientadores/modules/OrientadorService.service';
import { MatDailogTypeParam } from '../model/support/mat-dialog-type-param';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { EspecialidadeService } from 'src/app/especialidades/modules/especialidade.service';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { DepartamentoService } from 'src/app/departamentos/modules/departamento.service';
import { GrupoService } from './../../grupos/modules/grupo.service';
// import { MunicipioService } from 'src/app/municipio/modules/municipio.service';
// import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
// import { InstitutoService } from 'src/app/institutos/modules/instituto.service';
// import { AreaFormacaoService } from 'src/app/area-formacao/modules/area-formacao.service';
// import { LocalService } from 'src/app/locals/modules/local.service';

@Component({
  selector: 'app-more-options-dialog',
  templateUrl: './more-options-dialog.component.html',
  styleUrls: ['./more-options-dialog.component.css']
})
export class MoreOptionsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDailogTypeParam,
    private estudanteService: EstudanteService,
    private orientadorService: OrientadorService,
    private cursoService: CursoService,
    // private municipioService: MunicipioService,
    // private provinciaService: ProvinciaService,
    // private institutoService: InstitutoService,
    private especialidadeService: EspecialidadeService,
    private turmaService: TurmaService,
    // private localService: LocalService,
    // private areaFormacaoService: AreaFormacaoService,
    private departamentoService: DepartamentoService,
    private grupoService: GrupoService
  ) { }

  ngOnInit() {
  }

  onDetalheButtonCliked() {
    const id = this.data.id;
    const entityName = this.data.entityName;
    switch (entityName) {
      case 'Estudante':
        this.estudanteService.emitOnDetalheButtonCliked.emit(id);
        break;
      case 'Orientador':
        this.orientadorService.emitOnDetalheButtonCliked.emit(id);
        break;
      case 'Curso':
        this.cursoService.emitOnDetalheButtonCliked.emit(id);
        break;
      // case 'Instituto':
      //   this.institutoService.emitOnDetalheButtonCliked.emit(id);
      //   break;
      // case 'Municipio':
      //   this.municipioService.emitOnDetalheButtonCliked.emit(id);
      //   break;
      // case 'Provincia':
      //   this.provinciaService.emitOnDetalheButtonCliked.emit(id);
      //   break;
      // case 'AreaFormacao':
      //   this.areaFormacaoService.emitOnDetalheButtonCliked.emit(id);
      //   break;
      // case 'Local':
      //   this.localService.emitOnDetalheButtonCliked.emit(id);
      //   break;
      case 'Especialidade':
        this.especialidadeService.emitOnDetalheButtonCliked.emit(id);
        break;
      case 'Turma':
        this.turmaService.emitOnDetalheButtonCliked.emit(id);
        break;
      case 'Departamento':
        this.departamentoService.emitOnDetalheButtonCliked.emit(id);
        break;
      case 'Grupo':
        this.grupoService.emitOnDetalheButtonCliked.emit(id);
        break;
      default:
    }
  }
  onEditButtonCliked() {
    const id = this.data.id;
    const entityName = this.data.entityName;
    switch (entityName) {
      case 'Estudante':
        this.estudanteService.emitOnEditButtonCliked.emit(id);
        break;
      case 'Orientador':
        this.orientadorService.emitOnEditButtonCliked.emit(id);
        break;
      case 'Curso':
        this.cursoService.emitOnEditButtonCliked.emit(id);
        break;
      // case 'Instituto':
      //   this.institutoService.emitOnEditButtonCliked.emit(id);
      //   break;
      // case 'Municipio':
      //   this.municipioService.emitOnEditButtonCliked.emit(id);
      //   break;
      // case 'Provincia':
      //   this.provinciaService.emitOnEditButtonCliked.emit(id);
      //   break;
      // case 'AreaFormacao':
      //   this.areaFormacaoService.emitOnEditButtonCliked.emit(id);
      //   break;
      // case 'Local':
      //   this.localService.emitOnEditButtonCliked.emit(id);
      //   break;
      case 'Especialidade':
        this.especialidadeService.emitOnEditButtonCliked.emit(id);
        break;
      case 'Turma':
        this.turmaService.emitOnEditButtonCliked.emit(id);
        break;
      case 'Departamento':
        this.departamentoService.emitOnEditButtonCliked.emit(id);
        break;
      case 'Grupo':
        this.grupoService.emitOnEditButtonCliked.emit(id);
        break;
      default:
    }
  }
  onDeleteButtonCliked() {
    const id = this.data.id;
    const entityName = this.data.entityName;
    switch (entityName) {
      case 'Estudante':
        this.estudanteService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Orientador':
        this.orientadorService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Curso':
        this.cursoService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Especialidade':
        this.especialidadeService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Turma':
        this.turmaService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Departamento':
        this.departamentoService.emitOnDeleteButtonCliked.emit(id);
        break;
      case 'Grupo':
        this.grupoService.emitOnDeleteButtonCliked.emit(id);
        break;
      default:
    }
  }
}
