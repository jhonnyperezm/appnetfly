import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalcanalesempaqueingart'
})
export class ModalcanalesempaqueingartPipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombre_canal.toLowerCase().includes(query.toLowerCase());
    });
  }

}
