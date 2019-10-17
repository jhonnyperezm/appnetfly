import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablarecetasmi'
})
export class TablarecetasmiPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_receta.toLowerCase().includes(query.toLowerCase());
    });
  }

}
