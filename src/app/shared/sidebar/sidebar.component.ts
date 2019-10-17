import {Component, OnInit} from '@angular/core';
import {SidebarService} from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./../shared.component.css'],
  providers: [SidebarService]
})
export class SidebarComponent implements OnInit {
  id_rol: any;
  id_cliente: any;
  logConf: any;
  DataArrayPermisos: any = [];
  DataArrayAplicaciones: any = [];

  constructor(private sidebarService: SidebarService) {
    this.id_rol = localStorage.getItem('id_rol');
    this.id_cliente = localStorage.getItem('cli');
    this.logConf = localStorage.getItem('logConf');
    this.consultarPermisos();
    this.consultarAplicaciones();
  }

  ngOnInit() {


  }

  consultarPermisos() {

    this.sidebarService.getPermisos(this.id_rol).subscribe(
      data => {
        this.DataArrayPermisos = data;

      }
    );
  }

  contienePermiso(permiso) {

    const existe = this.DataArrayPermisos.filter(x => parseInt(x.id_permiso, 0) === parseInt(permiso, 0));
    return existe.length === 1;
  }

  consultarAplicaciones() {
    this.sidebarService.getClienteAplicaciones(this.id_cliente).subscribe(
      data => {
        this.DataArrayAplicaciones = data;
      }
    );
  }

  accesoAplicacion(aplicacion) {
    const existe = this.DataArrayAplicaciones.filter(x => parseInt(x.id_aplicacion, 0) === parseInt(aplicacion, 0));
    return existe.length > 0;
  }


}
