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
  turma: Turma;
  classe: Classe;
  diciplina: Diciplina;
  anoLetivo: Number;
  professor: Professor;
  instituto: Instituto;
  p1: Number;
  p2: Number;
  m1: Number;
  p3: Number;
  p4: Number;
  m2: Number;
  p5: Number;
  p6: Number;
  m3: Number;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
