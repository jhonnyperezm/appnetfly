import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { IngresarpuntosComponent } from './ingresarpuntos.component';

@Injectable({
    providedIn:'root'
})


export class IngresarcompracandeactiveguardService implements CanDeactivate<IngresarpuntosComponent> {
    canDeactivate(component: IngresarpuntosComponent): boolean {
    if (component.puntoUnoForm.dirty && component.puntoUnoForm.submitted === false) {
    return confirm('¿Estás seguro de que desea salir sin guardar cambios?');
    }
    return true;
    }

}