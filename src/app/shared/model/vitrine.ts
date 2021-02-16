import { CustomAbstractEntity } from './customEntity';

export class Vitrine implements CustomAbstractEntity{
    
    
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  titulo: string;
  file: File;
  

  constructor(id?: number) {
    this.id = id ? id : null;
  }

}