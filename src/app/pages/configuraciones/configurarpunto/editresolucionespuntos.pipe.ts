import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editresolucionespuntos'
})
export class EditresolucionespuntosPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.autorizada.toLowerCase().includes(query.toLowerCase());
    });
  }

}
