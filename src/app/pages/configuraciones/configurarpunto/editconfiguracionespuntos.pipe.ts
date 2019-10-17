import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editconfiguracionespuntos'
})
export class EditconfiguracionespuntosPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.descripcion.toLowerCase().includes(query.toLowerCase());
    });
  }

}
