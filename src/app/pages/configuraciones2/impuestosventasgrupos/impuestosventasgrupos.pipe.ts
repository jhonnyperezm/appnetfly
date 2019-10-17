import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impuestosventasgrupos'
})
export class ImpuestosventasgruposPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreGrupoVentaInv.toLowerCase().includes(query.toLowerCase());
    });
  }
}
