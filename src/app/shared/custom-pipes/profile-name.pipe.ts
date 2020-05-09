import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileName'
})
export class ProfileNamePipe implements PipeTransform {
  private values: string[];
  private result: string;

  transform(value: any, ...args: any[]): any {
    this.values = value.split(' ');
    this.result = `${this.values[0]} ${this.values[this.values.length - 1]}`;
    return this.result;
  }

}
