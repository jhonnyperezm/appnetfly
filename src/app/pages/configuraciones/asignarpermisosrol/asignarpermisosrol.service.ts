import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsignarpermisosrolService {

  private baseUrlPermisos = 'permisos/';
  private baseUrlAplicaciones = 'aplicaciones/';
  private baseUrlRol = 'rol/';
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

  getAplicaciones() {
    const response = this.http.get(this.path + this.baseUrlAplicaciones + 'findAplicaciones/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPermisosRol(idRol) {
    const response = this.http.get(this.path + this.baseUrlPermisosRol + 'findPermisosRolById/' + idRol, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPermisos(idAplicacion) {
    const response = this.http.get(this.path + this.baseUrlPermisos + 'findPermisosOrden/' + idAplicacion, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateRol(data) {
    const response = this.http.put(this.path + this.baseUrlRol + 'updateRol/', data, this.options);
    return response;
  }
  updatePermisosRol(DataList, idRol) {
    const response = this.http.put(this.path + this.baseUrlPermisosRol + 'updatePermisosRol/' + idRol,
    DataList, this.options);
    return response;
  }
}
