import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editclienteimpuesto'
})
export class EditclienteimpuestoPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_pais.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre_impuesto.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre_regimen.toLowerCase().includes(query.toLowerCase()) ;
    });
  }


}
