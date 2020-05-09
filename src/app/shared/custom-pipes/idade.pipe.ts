import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idade'
})
export class IdadePipe implements PipeTransform {

  private data: string[];
  private ano;
  private idade: number;

  transform(value: string, ...args: string[]): number {

    this.data = value.split('-');
    this.ano = this.data[0] as unknown as number;
    this.idade = (new Date().getFullYear() - this.ano);

    return this.idade;
  }

}
