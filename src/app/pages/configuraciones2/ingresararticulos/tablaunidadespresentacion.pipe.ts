import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablaunidadespresentacion'
})
export class TablaunidadespresentacionPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreUniPresentacion.toLowerCase().includes(query.toLowerCase());
    });
  }

}
