import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientecomensal'
})
export class ClientecomensalPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase()) ||
      data.documento.toLowerCase().includes(query.toLowerCase());
    });
  }

}
