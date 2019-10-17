import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxminingresarart'
})
export class MaxminingresarartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombrePunto.toLowerCase().includes(query.toLowerCase());
    });
  }


}
