import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewesNumber'
})
export class ViewesNumberPipe implements PipeTransform {
  private views: number;
  private visualizacao: number;
  private multiplo: string;

  transform(value: any, ...args: any[]): any {
    this.views = value as number;
    if (this.views < 1000) {
      return this.views;
    }

    this.visualizacao = this.views / 1000;
    return this.visualizacao;
  }

}
