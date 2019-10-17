import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { RutasService } from '../../../services/rutas.service';
import { UsuariosPipe } from './usuarios.pipe';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [UsuariosService, RutasService, UsuariosPipe, ReactiveFormsModule, SidebarComponent]
})
export class UsuariosComponent implements OnInit {

  // ------------Definicion de variables--------------
  p:number=1;
  mcli :number=1;
  pun :number=1;

  DataArray: any = [];
  DataJson: any = [];
  DataUserNuevo: any = [];
  DataUsuario: any = [];
  DataUser: any = [];
  DataJsonUser: any = [];
  itempage = 5;
  idUsuario: any;
  nombreUsuario: any;
  usuario: any;
  password: any;
  idCliente: any;
  email: any;
  tipo: any;
  mensaje: any;
  DataRoles: any = [];
  DataClientes: any = [];
  rol: any;
  idSuperUsuario: any;
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  searchString: any;
  descEsp: any;
  nombrerol: any;
  DataPuntosCliente: any = [];
  ListaPuntosSel: any = [];
  TodosPuntos: boolean;
  DataUsuarioPunto: any = [];
  DataArrayPuntosUser: any = [];
  searchStringPun: any;
  itempagePun = 5;
  noHayRegistros = false;

  ListaClientesSel: any = [];
  DataJsonClientes: any = [];
  TodosClientes: any;
  DataUsuarioClientesImp: any = [];
  DataArrayClientesUser: any = [];
  DataArrayPermisos: any = [];

  searchStringCli: any;
  itempageCli = 5;

  @ViewChild('usuarioForm',{static:true})
  private usuarioForm: NgForm;

  @ViewChild('editUsuarioForm',{static:true})
  private editUsuarioForm: NgForm;


  constructor(public rutasService: RutasService,
    public usuariosService: UsuariosService,
    public SidebarComponent: SidebarComponent,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    vcr: ViewContainerRef) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }


  ngOnInit() {
    this.LoadClientes();
    this.LoadRoles();
    this.idSuperUsuario = localStorage.getItem('creadoPor');
    this.descEsp = localStorage.getItem('descEsp');
    this.nombrerol = localStorage.getItem('rol');
    this.rol = localStorage.getItem('rol');
    if (this.rol === 'admin') {
      this.rol = true;
    } else {
      this.rol = false;
    }

    this.DataJson = [];
    this.roles = 0;
    this.LoadUsuarios();
  }

  LoadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];
        let permisoAsignarClientes = false;

        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            this.usuariosService.getPermisos(key.id_rol).subscribe(
              data => {
                this.DataArrayPermisos = data;
                if (this.DataArrayPermisos.length >= 1) {
                  permisoAsignarClientes = true;
                } else {
                  permisoAsignarClientes = false;
                }
                this.DataJson.push(
                  {
                    'id': key.id,
                    'nombre': key.nombre_usuario,
                    'usuario': key.usuario,
                    'id_cliente': key.id_cliente,
                    'email': key.email,
                    'clave': key.clave,
                    'creado_por': key.creado_por,
                    'fecha_creacion': key.fecha_creacion,
                    'modificado_por': key.modificado_por,
                    'fecha_modificacion': key.fecha_modificacion,
                    'nombre_cliente': key.nombre_cliente,
                    'nombre_rol': key.nombre_rol,
                    'id_rol': key.id_rol,
                    'permisoCli': permisoAsignarClientes
                  }
                );
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


  LoadClientes() {
    this.usuariosService.getClientes().subscribe(
      data => {
        this.DataClientes = data;
      }
    );
  }

  LoadRoles() {
    this.usuariosService.getRoles().subscribe(
      data => {
        this.DataRoles = data;

      }
    );
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(userNew) {
    this.DataUserNuevo = {
      'nombre': userNew.nombre,
      'usuario': userNew.email,
      'clave': userNew.clave,
      'id_cliente': userNew.id_cliente,
      'email': userNew.email,
      'creadoPor': 1,
      'modificadoPor': 1,
      'estado': true,
      'id_rol': userNew.id_rol
    };

    this.usuariosService.createUsuario(this.DataUserNuevo).subscribe(data => {

      if (data.text() === 'el email ya esta siendo utilizado por otro usuario') {
        Swal.fire({
          title: 'Usuario No Creado',
          text: 'Proceso no se realizó de manera Exitosa - el email ya esta siendo utilizado por otro usuario',
          type: 'error',
        });
      } else if (data.text() === 'No se creó el usuario') {
        Swal.fire({
          title: 'Usuario No Creado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      } else {
        Swal.fire({
          title: 'Usuario Creado',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
      }
      this.LimpiarFormularioUsuario();
      this.LoadUsuarios();
    }
    );
  }

  bindingDataUser(id, usuario) {
    this.idUsuario = id;
    this.nombreUsuario = usuario;
  }

  InactivarUsuario(id, nombre) {
    this.usuariosService.putInactivarUsuario(id).subscribe();
    Swal.fire({
      title: 'Usuario inactivado',
      text: 'Proceso realizado de manera Exitosa, el Usuario ' + nombre + 'fue inactivado',
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

  bindingDataUserModificar(data) {
    this.LoadRoles();
    this.DataUser = data;
  }

  onSubmitModificar(DataUser) {
    this.DataJsonUser = {
      'id': DataUser.id,
      'nombre': DataUser.nombre,
      'usuario': DataUser.email,
      'clave': DataUser.clave,
      'id_cliente': DataUser.id_cliente,
      'email': DataUser.email,
      'modificadoPor': 1,
      'estado': true,
      'id_rol': DataUser.id_rol
    };

    this.usuariosService.updateUsuario(this.DataJsonUser).subscribe(data => {
      if (data.text() === 'Usuario Modificado con exito') {
        Swal.fire({
          title: 'Usuario Modificado',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
        this.LoadUsuarios();
      } else {
        Swal.fire({
          title: 'Usuario Modificado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  bindingPuntos(datosUsuario) {
    this.DataPuntosCliente = [];
    this.DataUsuarioPunto = datosUsuario;
    this.usuariosService.getPuntosCliente(datosUsuario.id_cliente).subscribe(
      data => {
        for (const key of data) {
          this.DataPuntosCliente.push({
            'id_punto': key.id_punto,
            'nombre': key.nombre,
            'checked': false
          });
        }
        this.LoadPuntosUsuario(datosUsuario.id);
      }
    );
  }

  LoadPuntosUsuario(idUsuario) {
    this.ListaPuntosSel = [];
    this.usuariosService.getPuntosUsuario(idUsuario).subscribe(
      data => {
        this.DataArrayPuntosUser = data;

        for (const key of this.DataArrayPuntosUser) {
          const existe = this.DataPuntosCliente.filter(x => parseInt(x.id_punto, 0) === parseInt(key.id_punto, 0));
          if (existe.length === 0) {
            this.onChangePunto(key, false);
          } else {
            this.onChangePunto(key, true);
          }
        }
      }
    );
  }

  onChangeAllPuntos(data, isChecked: boolean) {
    this.TodosPuntos = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChangePunto(data[i], isChecked);
    }
  }

  onChangePunto(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaPuntosSel.filter(x => parseInt(x.id, 0) === parseInt(data.id_punto, 0));
      if (existe.length === 0) {
        this.ListaPuntosSel.push(
          {
            'id': data.id_punto,
            'nombre': data.nombre
          });
      }
    } else {
      for (let i = 0; i < this.ListaPuntosSel.length; i++) {
        let index;
        if (parseInt(data.id_punto, 0) === parseInt(this.ListaPuntosSel[i].id, 0) && isChecked === false) {
          index = this.ListaPuntosSel.indexOf(this.ListaPuntosSel[i]);
          this.ListaPuntosSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataPuntosCliente.length; i++) {
      if (data.id_punto === this.DataPuntosCliente[i].id_punto) {
        this.DataPuntosCliente[i].checked = isChecked;
      }
    }

  }


  asignarPuntos(datosUsuario) {
    const usuarios = {
      puntos: []
    };
    for (const key of this.ListaPuntosSel) {
      usuarios.puntos.push({
        'id_usuario': datosUsuario.id,
        'id_punto': key.id
      });
    }
    this.usuariosService.putUsuariosPunto(usuarios.puntos, datosUsuario.id).subscribe(
      data => {
        if (data.text() === 'error data') {
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron asignar los puntos, error en la estructura de datos',
            type: 'error',
          });
        } else if (data.text() === 'Error') {
          Swal.fire({
            title: 'error',
            text: 'No se pudieron asignar los puntos',
            type: 'error',
          });
        } else {

          Swal.fire({
            title: 'Exitoso',
            text: 'Se asignaron los puntos correctamente',
            type: 'success',
          });
        }
      }
    );

  }

  bindingClientes(datosUsuario) {
    this.DataJsonClientes = [];
    this.DataUsuarioClientesImp = datosUsuario;
    this.usuariosService.getClientes().subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          this.DataJsonClientes.push({
            'id_cliente': key.id,
            'nombre': key.nombre,
            'checked': false
          });
        }
        this.LoadClientesUsuario(datosUsuario.id);
      }
    );
  }

  LoadClientesUsuario(idUsuario) {
    this.ListaClientesSel = [];
    this.usuariosService.getClientesUsuario(idUsuario).subscribe(
      data => {
        // console.log(data);
        this.DataArrayClientesUser = data;

        console.log(this.DataJsonClientes);
        for (const key of this.DataJsonClientes) {
          const existe = this.DataArrayClientesUser.filter(x => parseInt(x.idCliente, 0) === parseInt(key.id_cliente, 0));

          console.log(existe);
          if (existe.length === 0) {
            this.onChangeCliente(key, false);
          } else {
            this.onChangeCliente(key, true);
          }
        }
      }
    );
  }

  onChangeAllClientes(data, isChecked: boolean) {
    this.TodosClientes = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChangeCliente(data[i], isChecked);
    }
  }

  onChangeCliente(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaClientesSel.filter(x => parseInt(x.id, 0) === parseInt(data.id_cliente, 0));
      if (existe.length === 0) {
        this.ListaClientesSel.push(
          {
            'id': data.id_cliente,
            'nombre': data.nombre
          });
      }
    } else {
      for (let i = 0; i < this.ListaClientesSel.length; i++) {
        let index;
        if (parseInt(data.id_cliente, 0) === parseInt(this.ListaClientesSel[i].id, 0) && isChecked === false) {
          index = this.ListaClientesSel.indexOf(this.ListaClientesSel[i]);
          this.ListaClientesSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonClientes.length; i++) {
      if (data.id_cliente === this.DataJsonClientes[i].id_cliente) {
        this.DataJsonClientes[i].checked = isChecked;
      }
    }

  }

  asignarClientes(datosUsuario) {
    const clientes = {
      puntos: []
    };
    for (const key of this.ListaClientesSel) {
      clientes.puntos.push({
        usuarios: {
          id: datosUsuario.id
        },
        cliente: {
          id: key.id
        }
      });
    }
    this.usuariosService.putUsuariosCliente(clientes.puntos, datosUsuario.id).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'error') {
          Swal.fire({
            title: 'error',
            text: 'No se pudieron asignar los clientes',
            type: 'error'
          });
        } else {

          Swal.fire({
            title: 'Exitoso',
            text: 'Se asignaron los clientes correctamente',
            type: 'success'
          });
        }
      }
    );

  }


  LimpiarFormularioUsuario() {
    this.usuarioForm.reset();
  }

  LimpiarFormularioEditUsuario() {
    this.LoadUsuarios();
  }
}

