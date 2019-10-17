import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bodegasinactivas'
})
export class BodegasinactivasPipe implements PipeTransform {

  
  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_bodega.toLowerCase().includes(query.toLowerCase()) ||
             data.nombre_punto.toLowerCase().includes(query.toLowerCase());
    });
  }


}
