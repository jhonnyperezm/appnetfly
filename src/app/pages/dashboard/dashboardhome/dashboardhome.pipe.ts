import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardhome'
})
export class DashboardhomePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
