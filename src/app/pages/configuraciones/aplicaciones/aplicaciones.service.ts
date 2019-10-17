import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {
  private baseUrlClienteAplicacion = 'clienteAplicaciones/';
  private baseUrlAplicacion = 'aplicaciones/';
  private baseUrlCliente = 'cliente/';
  private baseUrlApp = 'aplicaciones/';
  private baseUrlusuariosCid = 'usuariosCid/';
  private baseUrlUsuarios = 'usuarios/';

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;
  constructor(public http: Http,
    public rutasService: RutasService) {
      this.path = this.rutasService.getPath();
      this.rol = localStorage.getItem('rol');
      this.idCliente = localStorage.getItem('cli');
      if (this.idCliente === 1) {
        this.token = localStorage.getItem('token');
      } else {
        this.token = localStorage.getItem('tokenCliente');
      }
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getClienteAplicacion() {
    const response = this.http.get(this.path + this.baseUrlClienteAplicacion + 'findClienteApp', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getClientes() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findClientes/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getApp() {
    const response = this.http.get(this.path + this.baseUrlApp + 'findAplicaciones/' + 'true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getAplicacionesPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClienteAplicacion + 'findClienteAplicaciones/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosUsuario(idCliente, nombreCliente) {
    const response = this.http.get(this.path + this.baseUrlUsuarios + 'findUsersByIdCliente/true/' + idCliente,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  createAplicacion(nombre) {
    const response = this.http.post(this.path + this.baseUrlAplicacion + 'createAplicaciones/' + nombre, null, this.options);
    return response;
  }
  createClienteAplicacion(DataList) {
    const response = this.http.post(this.path + this.baseUrlClienteAplicacion + 'createClienteAplicacion', DataList, this.options);
    return response;
  }
  createUsuarioCartera(DataJson) {
    const response = this.http.post(this.path + this.baseUrlusuariosCid + 'createUsersConfiguraciones', DataJson, this.options);
    return response;
  }
  deleteClienteAplicacion(idApp) {
    const response = this.http.delete(this.path + this.baseUrlClienteAplicacion + 'deleteAplicaciones/' + idApp, this.options);
    return response;
  }
  buscarUsuarioCartera(nombre, creadoPor) {
    const response = this.http.get(this.path + this.baseUrlusuariosCid + 'findUsersByNombreByCreado/' + nombre + '/' + creadoPor,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  updateManejaDescuentos(IdUsuario, ManejaDesc) {
    const response = this.http.put(this.path + this.baseUrlusuariosCid + 'updateManejaDescuentos/' + IdUsuario + '/' + ManejaDesc,
    this.options);
    return response;
  }
  eliminarUsuarioCi(idUsuario, Eliminado) {
    const response = this.http.delete(this.path + this.baseUrlusuariosCid + 'deleteUsuario/' + idUsuario + '/' + Eliminado, this.options);
    return response;
  }
}
