import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'util';

@Pipe({
  name: 'idade'
})
export class IdadePipe implements PipeTransform {

  private data: string[];
  private ano;
  private idade;

  transform(value: string, ...args: string[]): unknown {

    this.data = value.split('-')
    this.ano = Number.parseInt(this.data[0]);
    this.idade = (new Date().getFullYear() - this.ano);

    return `${this.idade} Anos`;
  }

}
