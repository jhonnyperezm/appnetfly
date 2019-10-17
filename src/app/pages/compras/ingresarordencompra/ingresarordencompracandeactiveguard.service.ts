import { Injectable } from '@angular/core';
import { IngresarordencompraComponent } from './ingresarordencompra.component';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngresarordencompracandeactiveguardService implements CanDeactivate<IngresarordencompraComponent> {
  canDeactivate(component: IngresarordencompraComponent): boolean {
    if (component.ordenesUnoForm.dirty  && component.ordencompra.submitted === false) {
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
