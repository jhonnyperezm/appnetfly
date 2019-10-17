import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablacostoestimadoeditart'
})
export class TablacostoestimadoeditartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreListaPrecios.toLowerCase().includes(query.toLowerCase());
    });
  }

}
