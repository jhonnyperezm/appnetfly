import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordencomprapendientes'
})
export class OrdencomprapendientesPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.razon_social.toLowerCase().includes(query.toLowerCase()) ||
              data.fecha_pedido.toString().includes(query) ||
              data.fecha_entrega.toString().includes(query) ||
              data.id_orden.toString().includes(query);
    });
  }

}
