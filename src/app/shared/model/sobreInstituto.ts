import { CustomAbstractEntity } from "./customEntity";

class SobreInstituto implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  informacao: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
