import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidadesingresarart'
})
export class UnidadesingresarartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreUniCompra.toLowerCase().includes(query.toLowerCase());
    });
  }

}
