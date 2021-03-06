import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientespendientesaprobar'
})
export class ClientespendientesaprobarPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase()) ||
             data.nit.toLowerCase().includes(query.toLowerCase()) ||
             data.nombreDueno.toLowerCase().includes(query.toLowerCase());
    });
  }

}
