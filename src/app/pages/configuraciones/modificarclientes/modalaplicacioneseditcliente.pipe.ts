import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalaplicacioneseditcliente'
})
export class ModalaplicacioneseditclientePipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase());
    });
  }

}
