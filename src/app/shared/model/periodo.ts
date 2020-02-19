export class Periodo {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
