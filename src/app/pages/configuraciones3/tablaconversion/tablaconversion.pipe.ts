import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablaconversion'
})
export class TablaconversionPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_unidad_compra.toLowerCase().includes(query.toLowerCase());
    });
  }

}
