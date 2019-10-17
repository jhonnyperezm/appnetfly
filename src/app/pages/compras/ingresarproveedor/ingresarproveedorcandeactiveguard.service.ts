import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { IngresarproveedorComponent } from './ingresarproveedor.component';

@Injectable({
  providedIn: 'root'
})
export class IngresarproveedorcandeactiveguardService implements CanDeactivate<IngresarproveedorComponent> {
  canDeactivate(component: IngresarproveedorComponent): boolean {
    console.log(component.proveedorForm);
    console.log(component.proveedorDosForm);
    if (component.proveedorDosForm === undefined) {
      if (component.proveedorForm.dirty) {
        if (component.proveedorForm.submitted === false) {
            return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
        }
      }
      return true;
    } else {
      if (component.proveedorForm.dirty) {
        if (component.proveedorDosForm.submitted === false) {
            return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
        }
      }
      return true;
    }
  }

  constructor() { }
}
