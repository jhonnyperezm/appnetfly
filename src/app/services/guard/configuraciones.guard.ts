import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesGuard implements CanLoad {

  id_cliente: any;
  existe: any;

  constructor(private authService: SidebarComponent) {
    this.id_cliente = localStorage.getItem('cli');
  }


  canLoad() {
    return !!this.authService.accesoAplicacion(2);
  }

  //   this.authService.getClienteAplicaciones(this.id_cliente)
  //     .subscribe(data => {
  //       console.log('data', data);
  //       this.existe = data.filter(x => parseInt(x.id_aplicacion, 0) === 2);
  //       console.log('que llega existe', this.existe);
  //     });
  //   console.log('respuesta');
  //   if (this.existe.length > 0) {
  //       console.log('Tiene acceso');
  //       return false;
  //     } else {
  //       console.log('No tiene ');
  //       return true;
  //     }
  // }
}
