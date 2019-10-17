import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedoreseditcompra'
})
export class ProveedoreseditcompraPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.razon_social.toLowerCase().includes(query.toLowerCase()) ||
             data.email.toLowerCase().includes(query.toLowerCase()) ||
             data.nit.toLowerCase().includes(query.toLowerCase());
    });
  }

}
