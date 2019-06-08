import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dater'
})
export class DaterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value);
    return date.toLocaleString();
  }

}
