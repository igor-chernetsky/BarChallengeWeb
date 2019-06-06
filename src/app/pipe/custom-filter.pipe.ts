import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) return value;
    const keys = Object.keys(args);
    if (!keys || !keys.length) return value;
    return value.filter(v => {
      let valid = true;
      keys.forEach(k => {
        if(v[k] !== args[k]) valid = false;
      });
      return valid;
    })
  }

}
