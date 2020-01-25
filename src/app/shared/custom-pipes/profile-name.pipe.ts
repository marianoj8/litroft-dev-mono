import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileName'
})
export class ProfileNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
