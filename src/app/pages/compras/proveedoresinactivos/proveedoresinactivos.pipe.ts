import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedoresinactivos'
})
export class ProveedoresinactivosPipe implements PipeTransform {

  transform(value: any, query?: any): any {

    if (query === undefined || query === '') { return value; }

    return value.filter(data => {
      return data.razon_comercial.toLowerCase().includes(query.toLowerCase()) ||
      data.nit.toLowerCase().includes(query.toLowerCase()) ||
      data.email.toLowerCase().includes(query.toLowerCase());
    });
  }

}
