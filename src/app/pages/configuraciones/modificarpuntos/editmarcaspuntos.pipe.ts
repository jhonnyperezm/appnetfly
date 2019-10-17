import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editmarcaspuntos'
})
export class EditmarcaspuntosPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_marca.toLowerCase().includes(query.toLowerCase());
    });
  }

}
