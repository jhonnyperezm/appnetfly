import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { IngresarcompraComponent } from './ingresarcompra.component';

@Injectable({
  providedIn: 'root'
})
export class IngresarcompracandeactiveguardService implements CanDeactivate<IngresarcompraComponent> {
  canDeactivate(component: IngresarcompraComponent): boolean {
    if (component.compraproveedor.dirty  && component.datoscompra.submitted === false) {
      return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
    }
    return true;
  }
/* export interface IngresarclientesComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class IngresarclientescandeactiveguardService implements CanDeactivate<IngresarclientesComponent> {
  canDeactivate(component: IngresarclientesComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  } */

}
