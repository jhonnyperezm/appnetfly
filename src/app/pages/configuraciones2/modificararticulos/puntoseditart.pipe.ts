import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntoseditart'
})
export class PuntoseditartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_punto.toLowerCase().includes(query.toLowerCase());
    });
  }

}
