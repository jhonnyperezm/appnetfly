import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalmensajeingcliente'
})
export class ModalmensajeingclientePipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.mensaje.toLowerCase().includes(query.toLowerCase()) ||
      data.codigo.toLowerCase().includes(query.toLowerCase()) ;

    });
  }

}
