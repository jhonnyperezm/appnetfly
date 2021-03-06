import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'devolucioneseditocpendiente'
})
export class DevolucioneseditocpendientePipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreArticulo.toLowerCase().includes(query.toLowerCase());
    });
  }


}
