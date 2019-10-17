import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impuestosinactivos'
})
export class ImpuestosinactivosPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase());
    });
  }

}
