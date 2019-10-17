import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recetasinactivas'
})
export class RecetasinactivasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
