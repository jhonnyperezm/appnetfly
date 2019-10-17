import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impuestosventas'
})
export class ImpuestosventasPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreClase.toLowerCase().includes(query.toLowerCase());
    });
  }

}
