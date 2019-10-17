import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablapersonalizadaunidades'
})
export class TablapersonalizadaunidadesPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_kardex.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre_compra.toLowerCase().includes(query.toLowerCase());
    });
  }
}
