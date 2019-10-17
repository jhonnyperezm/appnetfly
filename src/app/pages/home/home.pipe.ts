import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'home'
})
export class HomePipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreCliente.toLowerCase().includes(query.toLowerCase());
    });
  }

}
