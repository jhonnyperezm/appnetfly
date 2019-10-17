import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pendientes'
})
export class PendientesPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.razon_social.toLowerCase().includes(query.toLowerCase()) ||
              data.numero_documento.toString().includes(query) ||
              data.num_factura.toString().includes(query);
    });
  }

}