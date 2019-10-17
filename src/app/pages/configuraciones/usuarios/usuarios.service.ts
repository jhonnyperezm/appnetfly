import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // ----------Definicion de Variables------------------------
  private baseUrlUsuarios = 'usuarios/';
  private baseUrlRol = 'rol/findRol';
  private baseUrlCliente = 'cliente/findClientes';
  private baseUrlInactivar = 'usuarios/activarInactivarUser/';
  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlUsuariosPunto = 'usuariosPunto/';
  private baseUrlUsuariosCliente = 'usuariosCliente/';
  private baseUrlPermisosRol = 'permisosRol/';

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

  getUsuarios() {
    const response = this.http.get(this.path + this.baseUrlUsuarios + 'findUsers/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPermisos(idRol) {
    const response = this.http.get(this.path + this.baseUrlPermisosRol + 'findPermisosRolByIdByIdPermiso/' + idRol + '/' + 293,
      this.options).pipe(map(res => res.json()));
    return response;
  }
  getRoles() {
    const response = this.http.get(this.path + this.baseUrlRol + '/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getClientes() {
    const response = this.http.get(this.path + this.baseUrlCliente + '/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getClientesUsuario(idUsuario) {
    const response = this.http.get(this.path + this.baseUrlUsuariosCliente + 'findUsuariosClienteByIdUsuario/' + idUsuario, this.options).pipe(map(res => res.json()));
    return response;
  }
  putInactivarUsuario(id) {
    const response = this.http.put(this.path + this.baseUrlInactivar + id + '/false', null, this.options);
    return response;
  }
  deleteUsuario(id) {
    const response = this.http.delete(this.path + this.baseUrlUsuarios + 'deleteUsuario/' + id, this.options);
    return response;
  }
  createUsuario(DataJson) {
    const response = this.http.post(this.path + this.baseUrlUsuarios + 'createUsers', DataJson, this.options);
    return response;
  }
  updateUsuario(data) {
    const response = this.http.put(this.path + this.baseUrlUsuarios + 'updateUsers/' + data.id, data, this.options);
    return response;
  }
  getPuntosCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePunto/' + idCliente + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  putUsuariosPunto(DataList, idUsuario) {
    const response = this.http.post(this.path + this.baseUrlUsuariosPunto + 'updateUsuariosPunto/' + idUsuario, DataList, this.options);
    return response;
  }
  getPuntosUsuario(idUsuario) {
    const response = this.http.get(this.path + this.baseUrlUsuariosPunto + 'findUsuariosPuntoById/' + idUsuario, this.options)
    .pipe(map(res => res.json()));
    return response;
  }

  putUsuariosCliente(DataList, idUsuario) {
    const response = this.http.post(this.path + this.baseUrlUsuariosCliente + 'updateUsuariosCliente/' + idUsuario, DataList, this.options);
    return response;
  }
}
