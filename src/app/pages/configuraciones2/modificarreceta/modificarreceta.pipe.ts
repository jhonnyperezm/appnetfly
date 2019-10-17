import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modificarreceta'
})
export class ModificarrecetaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
