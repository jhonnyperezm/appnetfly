import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingresarreceta'
})
export class IngresarrecetaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
