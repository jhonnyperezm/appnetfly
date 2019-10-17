import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modificartransaccion'
})
export class ModificartransaccionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
