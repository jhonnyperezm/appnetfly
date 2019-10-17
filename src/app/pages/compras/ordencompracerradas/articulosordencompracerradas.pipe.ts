import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articulosordencompracerradas'
})
export class ArticulosordencompracerradasPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(articulo => {
      return articulo.nombre_articulo.toLowerCase().includes(query.toLowerCase());
    });
  }

}
