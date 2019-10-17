import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntosmaxmineditart'
})
export class PuntosmaxmineditartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_punto.toLowerCase().includes(query.toLowerCase());
    });
  }

}
