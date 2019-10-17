import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordencompracerradas'
})
export class OrdencompracerradasPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(orden => {
      return orden.razon_comercial.toLowerCase().includes(query.toLowerCase());
    });
  }

}
