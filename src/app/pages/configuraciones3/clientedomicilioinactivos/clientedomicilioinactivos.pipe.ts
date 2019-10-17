import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientedomicilioinactivos'
})
export class ClientedomicilioinactivosPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase()) ||
             data.nit.toLowerCase().includes(query.toLowerCase()) ||
             data.telefono.toLowerCase().includes(query.toLowerCase());
    });
  }

}
