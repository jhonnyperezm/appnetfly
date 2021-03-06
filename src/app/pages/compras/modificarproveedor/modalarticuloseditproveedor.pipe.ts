import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalarticuloseditproveedor'
})
export class ModalarticuloseditproveedorPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre.toLowerCase().includes(query.toLowerCase()) ||
             data.id.toString().includes(query);
    });
  }

}