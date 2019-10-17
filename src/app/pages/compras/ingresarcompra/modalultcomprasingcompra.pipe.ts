import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalultcomprasingcompra'
})
export class ModalultcomprasingcompraPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.razon_social.toLowerCase().includes(query.toLowerCase());
    });
  }


}
