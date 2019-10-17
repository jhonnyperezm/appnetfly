import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bodegaslicenciaeditpunto'
})
export class BodegaslicenciaeditpuntoPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreBodega.toLowerCase().includes(query.toLowerCase());
    });
  }

}
