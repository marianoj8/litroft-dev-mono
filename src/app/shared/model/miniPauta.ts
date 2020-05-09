import { Periodo } from 'src/app/shared/model/periodo';
import { Instituto } from './instituto';
import { Professor } from './professor';
import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Classe } from './classe';
import { Turma } from './turma';
import { Curso } from './curso';
import { Estudante } from './estudante';
import { Diciplina } from './diciplina';

export class MiniPauta implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  estudante: Estudante;
  curso: Curso;
  periodo: Periodo;
  turma: Turma;
  classe: Classe;
  diciplina: Diciplina;
  anoLetivo: number;
  professor: Professor;
  instituto: Instituto;
  p1: number;
  p2: number;
  m1: number;
  p3: number;
  p4: number;
  m2: number;
  p5: number;
  p6: number;
  m3: number;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
