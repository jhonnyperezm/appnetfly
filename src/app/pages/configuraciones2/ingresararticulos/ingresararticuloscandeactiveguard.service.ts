import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { IngresararticulosComponent } from './ingresararticulos.component';

@Injectable({
  providedIn: 'root'
})
export class IngresararticuloscandeactiveguardService implements CanDeactivate<IngresararticulosComponent> {
  canDeactivate(component: IngresararticulosComponent): boolean {

    if (component.artUnoForm !== undefined) {
      if (component.artUnoForm.dirty  && component.artUnoForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    if (component.artDosForm !== undefined) {
      if (component.artDosForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    if (component.artTresForm !== undefined) {
      if (component.artTresForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    if (component.artCuatroForm !== undefined) {
      if (component.artCuatroForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    if (component.artCincoForm !== undefined) {
      if (component.artCincoForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    if (component.artSeisForm !== undefined) {
      if (component.artSeisForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    if (component.artSieteForm !== undefined) {
      if (component.artSieteForm.submitted === false) {
        return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
      }
    }
    return true;
  }
}
