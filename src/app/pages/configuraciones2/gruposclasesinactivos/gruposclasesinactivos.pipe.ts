import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gruposclasesinactivos'
})
export class GruposclasesinactivosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
