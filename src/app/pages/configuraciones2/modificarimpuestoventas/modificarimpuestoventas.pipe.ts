import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modificarimpuestoventas'
})
export class ModificarimpuestoventasPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.canal.toLowerCase().includes(query.toLowerCase());
    });
  }

}
