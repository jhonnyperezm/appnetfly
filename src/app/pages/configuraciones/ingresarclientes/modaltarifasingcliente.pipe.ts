import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modaltarifasingcliente'
})
export class ModaltarifasingclientePipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.valor.includes(query);
    });
  }


}
