import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ComprasGuard implements CanLoad {

  constructor(private authService: SidebarComponent) {
  }

  canLoad() {
    return !!this.authService.accesoAplicacion(4);
  }
}
