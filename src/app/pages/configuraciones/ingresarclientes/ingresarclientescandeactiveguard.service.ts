import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { IngresarclientesComponent } from './ingresarclientes.component';

@Injectable({
  providedIn: 'root'
})
export class IngresarclientescandeactiveguardService implements CanDeactivate<IngresarclientesComponent> {
  canDeactivate(component: IngresarclientesComponent): boolean {
    if (component.clienteUnoForm.dirty && !component.clienteUnoForm.submitted) {
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
