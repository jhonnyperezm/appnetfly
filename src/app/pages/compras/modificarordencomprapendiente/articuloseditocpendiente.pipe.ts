import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articuloseditocpendiente'
})
export class ArticuloseditocpendientePipe implements PipeTransform {

  transform(value: any, query?: any): any {
    if (query === undefined || query === '') { return value; }
    return value.filter(data => {
      return data.nombreArt.toLowerCase().includes(query.toLowerCase());
    });
  }


}
