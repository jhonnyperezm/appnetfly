import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AplicacionesService } from './aplicaciones.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [AplicacionesService, SidebarComponent]
})
export class AplicacionesComponent implements OnInit {

  p:number=1;
  mapli:number=1;
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  searchString: any;
  itempage = 5;
  DataClientesAplicacion: any = [];
  DataNewApli: any = [];
  postDatos: any = [];
  DataClientes: any = [];
  DataNewCliente: any = [];
  searchStringApli: any;
  itempageApli = 10;
  DataApp: any = [];
  DataAppRpt: any = [];
  checkedAll: boolean;
  DataJsonApp: any = [];
  DataJsonApli: any = [];
  DataTablaApli: boolean;
  DataAplicaciones: any = [];
  DatosEditApp: any = [];
  DataUserCarteraNuevo: any = [];
  datosUser: any = [];
  existeCliente = false;
  noHayRegistros = false;

  @ViewChild('aplicacionForm',{static:true})
  private aplicacionForm: NgForm;

  @ViewChild('asignarApliForm',{static:true})
  private asignarApliForm: NgForm;

  constructor(public aplicacionesService: AplicacionesService,
    public SidebarComponent: SidebarComponent, public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadClienteAplicacion();
    this.LoadClientes();
    this.loadApp();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadClienteAplicacion() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
    this.aplicacionesService.getClienteAplicacion().subscribe(
      data => {
        this.DataClientesAplicacion = data;
        if (this.DataClientesAplicacion.length !== 0) {
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
    this.aplicacionesService.getClientes().subscribe(
      data => {
        this.DataClientes = data;
      }
    );
  }

  onSubmit(datos) {
    this.aplicacionesService.createAplicacion(datos.nombre).subscribe(
      data => {
        if (data.text() === 'La aplicacion fue creada con exito') {
          Swal.fire({
            title: 'App Asignada',
            text: data.text(),
            type: 'success',
          });
        } else if (data.text() === 'App no Asignada') {
          Swal.fire({
            title: 'No pudo ser crada la app',
            text: data.text(),
            type: 'error',
          });
        } else if (data.text() === 'No pudo ser crada la app') {
          Swal.fire({
            title: 'No pudo ser crada la app',
            text: data.text(),
            type: 'error',
          });
        }
        this.loadApp();
        this.LimpiarFormularioAplicacion();
      }
    );
  }

  loadApp() {
    this.aplicacionesService.getApp().subscribe(
      data => {
        this.DataApp = data;
        this.loader = false;
        this.LoadTabla = true;

        this.DataAppRpt = [];
        for (const key of this.DataApp) {
          this.DataAppRpt.push(
            {
              'id_aplicacion': key.id,
              'nombre': String(key.nombre),
              'checked': false
            }
          );
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

  onChangeAppTodo(data, isChecked: boolean) {
    this.checkedAll = false;
    for (let i = 0; i < data.length; i++) {
      data[i].checked = isChecked;
      this.onChangeApp(data[i], isChecked);
    }
  }

  onChangeAppAll(data, isChecked: boolean) {
    this.checkedAll = isChecked;
    for (let i = 0; i < data.length; i++) {
      data[i].checked = isChecked;
      this.onChangeApp(data[i], isChecked);
    }
  }

  onChangeApp(data, isChecked: boolean) {
    if (parseInt(data.id_aplicacion, 0) === 6 && isChecked === true) {
      const datos = {
        'checked': true,
        'id_aplicacion': 1,
        'nombre': 'Cartera'
      };
      this.onChangeApp(datos, true);
    }
    if (parseInt(data.id_aplicacion, 0) === 1 && isChecked === false) {
      const datos = {
        'checked': true,
        'id_aplicacion': 6,
        'nombre': '"DescuentosEspeciales"'
      };
      this.onChangeApp(datos, false);
    }

    if (isChecked === true) {
      const existe = this.DataJsonApp.filter(x => parseInt(x.id_aplicacion, 0) === parseInt(data.id_aplicacion, 0));
      if (existe.length === 0) {
        this.DataJsonApp.push(
          {
            'id': data.id,
            'id_aplicacion': data.id_aplicacion,
            'nombre': data.nombre,
          });
      }
    } else {
      for (let i = 0; i < this.DataJsonApp.length; i++) {
        let index;
        if (data.id_aplicacion === this.DataJsonApp[i].id_aplicacion && isChecked === false) {
          index = this.DataJsonApp.indexOf(this.DataJsonApp[i]);
          this.DataJsonApp.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataAppRpt.length; i++) {
      if (data.id_aplicacion === this.DataAppRpt[i].id_aplicacion) {
        this.DataAppRpt[i].checked = isChecked;
      }
    }
  }

  buscaridCliente(nombre) {
    this.DataNewCliente.idCliente = this.DataClientes.filter(x => x.nombre.toLowerCase() === nombre.toLowerCase())[0].id;
  }

  searchUsuario(idCliente) {
    console.log(idCliente);
    const nombreCliente = this.DataClientes.filter(x => parseInt(x.id, 0) === parseInt(idCliente, 0))[0].nombre;
    this.DataNewCliente.telefono = this.DataClientes.filter(x => parseInt(x.id, 0) === parseInt(idCliente, 0))[0].telefono;
    this.DataNewCliente.email = this.DataClientes.filter(x => parseInt(x.id, 0) === parseInt(idCliente, 0))[0].email;

    this.DatosEditApp.email = this.DataClientes.filter(x => parseInt(x.id, 0) === parseInt(idCliente, 0))[0].email;
    this.DatosEditApp.telefono = this.DataClientes.filter(x => parseInt(x.id, 0) === parseInt(idCliente, 0))[0].telefono;

    this.aplicacionesService.getDatosUsuario(idCliente, nombreCliente).subscribe(
      data => {
        this.datosUser = data;
        this.DataNewCliente.idUsuario = this.datosUser[0].id;
        this.DataNewCliente.idClienteTabla = this.datosUser[0].id_cliente;
        this.DatosEditApp.idUsuario = this.datosUser[0].id;
        this.DatosEditApp.idClienteTabla = this.datosUser[0].id_cliente;
        this.searchUsuarioCartera(this.DataNewCliente.email, this.DataNewCliente.idUsuario);
      }
    );
  }

  ValidarCliente(Cliente) {
    if (Cliente === null) {

    } else {
      const existeCliente = this.DataClientes.filter(x => x.nombre.toLowerCase() === Cliente.toLowerCase());
      if (existeCliente.length === 0) {
        this.existeCliente = false;
      } else {
        this.existeCliente = true;
      }
    }
  }

  onSubmitAsignar(datosAsignacion) {
    const cliente = {
      aplicacion: []
    };
    for (const key of this.DataJsonApp) {
      cliente.aplicacion.push(
        {
          'id_cliente': datosAsignacion.idCliente,
          'id_aplicacion': key.id_aplicacion
        });
    }

    const existeManejaDesc = this.DataJsonApp.filter(x => parseInt(x.id_aplicacion, 0) === 6);
    if (existeManejaDesc.length === 1) {
      this.DataNewCliente.manejaDescEsp = true;
    } else {
      this.DataNewCliente.manejaDescEsp = false;
    }

    const existe = this.DataJsonApp.filter(x => parseInt(x.id_aplicacion, 0) === 1);
    if (existe.length === 1) {
      this.createUsuarioCartera(this.DataNewCliente);
    }

    this.aplicacionesService.createClienteAplicacion(cliente.aplicacion).subscribe(res => {
      if (res.text() === 'App Asignada') {
        Swal.fire({
          title: 'Cliente Aplicacion',
          text: 'Se realizo asignacion correctamente',
          type: 'success',
        });
      } else if (res.text() === 'App no Asignada') {
        Swal.fire({
          title: 'Cliente Aplicacion',
          text: 'La asignacion de la aplicacion al cliente no se realizo',
          type: 'error',
        });
      } else {
        console.log(res.text());
      }
      this.LoadClienteAplicacion();
    });
  }

  createUsuarioCartera(datosCliente) {
    this.DataUserCarteraNuevo = {
      'estado': true,
      'creadoPor': datosCliente.idUsuario,
      'modificadoPor': datosCliente.idUsuario,
      'fechaCreacion': '',
      'fechaModificacion': '',
      'password': datosCliente.telefono,
      'idCliente': datosCliente.idClienteTabla,
      'rolesPojo': [
        {
          'estado': true,
          'fechaCreacion': '',
          'fechaModificacion': '',
          'rol': 'Administrador'
        }
      ],
      'usuario': 'ci' + datosCliente.email,
      'manejaDescuentos': datosCliente.manejaDescEsp
    };

    this.aplicacionesService.createUsuarioCartera(this.DataUserCarteraNuevo).subscribe(
      data => {
        console.log(data);
      }
    );
  }


  bindingDataModificar(datosModificar) {
    this.DatosEditApp = datosModificar;
    this.aplicacionesService.getAplicacionesPorCliente(datosModificar.id_cliente).subscribe(
      res => {
        this.DataAplicaciones = res;
        this.DataJsonApp = [];
        /* for (let i = 0; i < this.DataAplicaciones.length; i++) {
          this.DataAplicaciones[i].checked = true;
        } */
        this.onChangeAppTodo(this.DataAplicaciones, true);
        this.searchUsuario(datosModificar.id_cliente);
      }
    );
  }

  onSubmitModificar(datosModificar) {

    for (const key of this.DataAplicaciones) {
      const persiste = this.DataJsonApp.filter(x => parseInt(x.id_aplicacion, 0) === parseInt(key.id_aplicacion, 0));
      if (persiste.length === 0) {
        if (parseInt(key.id_aplicacion, 0) === 1) {
          this.EliminarUsuarioCartera(datosModificar.idUsuarioCartera, true);
        }
        if (parseInt(key.id_aplicacion, 0) === 6) {
          this.UpdateUsuarioCartera(datosModificar.idUsuarioCartera, false);
        }
        this.QuitarAplicacion(key.id, key.nombre);
      }
    }

    const cliente = {
      aplicacion: []
    };
    for (const key of this.DataJsonApp) {
      cliente.aplicacion.push(
        {
          'id_cliente': datosModificar.id_cliente,
          'id_aplicacion': key.id_aplicacion
        });
    }

    const existeManejaDesc = this.DataJsonApp.filter(x => parseInt(x.id_aplicacion, 0) === 6);
    if (existeManejaDesc.length === 1) {
      this.DatosEditApp.manejaDescEsp = true;
    } else {
      this.DatosEditApp.manejaDescEsp = false;
    }

    const existe = this.DataJsonApp.filter(x => parseInt(x.id_aplicacion, 0) === 1);
    if (existe.length >= 1) {
      if (this.DatosEditApp.idUsuarioCartera === '') {
        this.createUsuarioCartera(this.DatosEditApp);
      } else {
        this.EliminarUsuarioCartera(datosModificar.idUsuarioCartera, false);
        this.UpdateUsuarioCartera(this.DatosEditApp.idUsuarioCartera, this.DatosEditApp.manejaDescEsp);
      }
    }

    this.aplicacionesService.createClienteAplicacion(cliente.aplicacion).subscribe(res => {
      if (res.text() === 'App Asignada') {
        Swal.fire({
          title: 'Cliente Aplicacion',
          text: 'Se realizaron los cambios correctamente',
          type: 'success',
        });
      } else if (res.text() === 'App no Asignada') {
        Swal.fire({
          title: 'Cliente Aplicacion',
          text: 'La asignacion de la aplicacion al cliente no se realizo',
          type: 'error',
        });
      } else {
        console.log(res.text());
      }
      Swal.fire({
        title: 'Cliente Aplicacion',
        text: 'Se realizaron los cambios correctamente',
        type: 'success',
      });
      this.LoadClienteAplicacion();
    });
  }

  searchUsuarioCartera(email, idUsuario) {
    this.aplicacionesService.buscarUsuarioCartera('ci' + email, idUsuario).subscribe(res => {
      if (res.length === 0) {
        this.DatosEditApp.idUsuarioCartera = '';
      } else {
        this.DatosEditApp.idUsuarioCartera = res[0].id;
      }
    });
  }

  EliminarUsuarioCartera(Usuario, Eliminado) {
    this.aplicacionesService.eliminarUsuarioCi(Usuario, Eliminado).subscribe(data => {
      if (data.text() === 'no se pudo eliminar la app al cliente') {
        Swal.fire({
          title: 'No se pudo desactivar',
          text: 'Nose pudo desactivar la aplicacion para el cliente',
          type: 'error',
        });
      } else {
        console.log('se desactivo la aplicacion');
      }
    });
  }

  UpdateUsuarioCartera(Usuario, ManejaDesc) {
    this.aplicacionesService.updateManejaDescuentos(Usuario, ManejaDesc).subscribe(data => {
      if (data.text() === 'no se pudo eliminar la app al cliente') {
        Swal.fire({
          title: 'No se pudo desactivar',
          text: 'Nose pudo desactivar la aplicacion para el cliente',
          type: 'error',
        });
      } else {
        console.log('se desactivo la aplicacion');
      }
    });

  }

  QuitarAplicacion(idApp, nombrApp) {
    this.aplicacionesService.deleteClienteAplicacion(idApp).subscribe(data => {
      if (data.text() === 'no se pudo eliminar la app al cliente') {
        Swal.fire({
          title: 'No se pudo desactivar',
          text: 'Nose pudo desactivar la aplicacion' + nombrApp + 'para el cliente',
          type: 'error',
        });
      } else {
        console.log('se desactivo la aplicacion');
      }
    });
  }


  LimpiarFormularioCrearAplicacion() {
    this.aplicacionForm.reset();
  }

  LimpiarFormularioAplicacion() {
    this.asignarApliForm.reset();
    // this.onChangeAppAll(this.DataJsonApp, false);
    this.onChangeAppAll(this.DataAppRpt, false);
  }
  LimpiarFomularioVerApli() {
    // this.onChangeAppTodo(this.DataAplicaciones, false);
    this.onChangeAppTodo(this.DataAppRpt, false);
  }
}

