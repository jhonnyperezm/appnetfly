import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalingredientesrecetaingart'
})
export class ModalingredientesrecetaingartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_articulo.toLowerCase().includes(query.toLowerCase());
    });
  }

}
