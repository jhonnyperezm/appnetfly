import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tarifasimpuestos'
})
export class TarifasimpuestosPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.valor.toString().includes(query.toString());
    });
  }

}
