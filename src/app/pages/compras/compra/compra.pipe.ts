import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compras'
})
export class CompraPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.razon_social.toLowerCase().includes(query.toLowerCase()) ||
              data.fecha_compra.toString().includes(query) ||
              data.fecha_kardex.toString().includes(query) ||
              data.fecha_vencimiento.toString().includes(query) ||
              data.id_compra.toString().includes(query) ||
              data.id_orden.toString().includes(query);
    });
  }
}

