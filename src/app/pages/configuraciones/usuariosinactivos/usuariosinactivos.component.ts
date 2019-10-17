import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { UsuariosinactivosService } from './usuariosinactivos.service';
import { UsuariosinactivosPipe } from './usuariosinactivos.pipe';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-usuariosinactivos',
  templateUrl: './usuariosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [RutasService, UsuariosinactivosService, UsuariosinactivosPipe,SidebarComponent]
})
export class UsuariosinactivosComponent implements OnInit {

  // ------------Definicion de variables--------------
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  itempage = 5;
  idUsuario: any;
  nombreUsuario: any;
  tipo: any;
  mensaje: any;
  rol: any;
  loader: boolean;
  LoadTabla: boolean;
  idSuperUsuario: any;
  LoadError: boolean;
  noHayRegistros = false;
  error: any;
  searchString: any;
  constructor(public rutasService: RutasService,
    public router: Router,
    public route: ActivatedRoute,
    public usuariosinactivosService: UsuariosinactivosService,
    public toastr: ToastrService,
    public SidebarComponent: SidebarComponent,
    vcr: ViewContainerRef) {

    this.tipo = this.route.snapshot.params.tipo;
    this.mensaje = this.route.snapshot.params.mensaje;
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.rol = localStorage.getItem('rol');

    if (this.tipo === 'success') {

      setTimeout(() => this.toastr.success(this.mensaje));
    }
    this.idSuperUsuario = localStorage.getItem('creadoPor');
    this.LoadUsuariosInactivos();

  }

  LoadUsuariosInactivos() {
    this.usuariosinactivosService.getUsuariosInactivos().subscribe(
      data => {
        this.DataArray = data;

        this.DataJson = [];
        if (this.DataArray.length !== 0) {
        for (const key of this.DataArray) {

          this.DataJson.push(
            {
              'id': key.id,
              'nombre': key.nombre_usuario,
              'usuario': key.usuario,
              'id_cliente': key.id_cliente,
              'email': key.email,
              'creado_por': key.creado_por,
              'fecha_creacion': key.fecha_creacion,
              'modificado_por': key.modificado_por,
              'fecha_modificacion': key.fecha_modificacion,
              'nombre_cliente': key.nombre_cliente,
              'nombre_rol': key.nombre_rol,
              'id_rol': key.id_rol
            }
          );
        }
        this.loader = false;
        this.LoadTabla = true;
        this.noHayRegistros = false;
      } else {
        this.loader = false;
        this.LoadTabla = true;
        this.noHayRegistros = true;
      }
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );

  }

  bindingDataUser(id, usuario) {
    this.idUsuario = id;
    this.nombreUsuario = usuario;
  }

  ActivarUsuario(id, nombre) {
    this.usuariosinactivosService.putActivarUsuario(id).subscribe();
    Swal.fire({
      title: 'Usuario activado',
      text: 'Proceso realizado de manera Exitosa, el Usuario ' + nombre + 'fue activado',
      type: 'success',
    });
    for (let i = 0; i < this.DataJson.length; i++) {

      let index;
      if (id === this.DataJson[i].id) {

        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);

      }
    }
  }

}
