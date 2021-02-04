import { Orientador } from 'src/app/shared/model/orientador';
import { Estudante } from 'src/app/shared/model/estudante';
import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Admin } from './admin';

export class ApplicationUser implements CustomAbstractEntity {
    id: number;
    createdAt: string;
    lastModifiedAt: string;
    totalModified: number;

    roles: string;
    username: string;

    admin: Admin;
    estudante: Estudante;
    orientador: Orientador;
    enabled: boolean;



    constructor(id?: number) {
        this.id = id ? id : null;
    }
}