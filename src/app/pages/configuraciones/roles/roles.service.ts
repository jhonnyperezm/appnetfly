import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrlRol = 'rol/';
  private baseUrlPermisos = 'permisos/';
  private baseUrlPermisosRol = 'permisosRol/';
  private baseUrlRolInactivar = 'rol/activarInactivarRol/';

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(
    public http: Http,
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


  getRoles() {
    const response = this.http.get(this.path + this.baseUrlRol + 'findRol/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPermisos() {
    const response = this.http.get(this.path + this.baseUrlPermisos + 'findPermisos', this.options).pipe(map(res => res.json()));
    return response;
  }
  createRol(DataJson) {
    const response = this.http.post(this.path + this.baseUrlRol + 'createRol', DataJson, this.options);
    return response;
  }
  createPermisosRol(DataList) {
    const response = this.http.post(this.path + this.baseUrlPermisosRol + 'createPermisosRol', DataList, this.options);
    return response;
  }
  getPermisosPorRol(id) {
    const response = this.http.get(this.path + this.baseUrlPermisosRol + 'findPermisosRolById/' + id, this.options).pipe(map(res => res.json()));
    return response;
  }
  putInactivarRol(id) {
    const response = this.http.put(this.path + this.baseUrlRolInactivar + id + '/false', null, this.options);
    return response;
  }
  updateRol(data) {
    const response = this.http.put(this.path + this.baseUrlRol + 'updateRol/', data, this.options);
    return response;
  }
  eliminarPermisoRol(rol, permiso) {
    const response = this.http.delete(this.path + this.baseUrlPermisosRol + 'deletePermiso/' + rol + '/' + permiso, this.options);
    return response;
  }
  updatePermisoRol(rol, DataList) {
    const response = this.http.put(this.path + this.baseUrlPermisosRol + 'updatePermisosRol/' + rol, DataList, this.options);
    return response;
  }
}
