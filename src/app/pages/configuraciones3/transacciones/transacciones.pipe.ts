import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transacciones'
})
export class TransaccionesPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase()) ||
             data.clase.toString().includes(query.toLowerCase()) ||
             data.tipo.toLowerCase().includes(query.toLowerCase());
    });
  }

}
