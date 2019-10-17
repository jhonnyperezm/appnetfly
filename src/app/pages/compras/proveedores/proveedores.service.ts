import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private baseUrlProveedor = 'proveedor/';
  private articulosporproveedor = 'proveedor/ProveedoresAndArticulos';
  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(public http: Http, public rutasService: RutasService) {
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

  getProveedores() {
    const response = this.http.get(this.path + this.baseUrlProveedor + 'findProveedor/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getArticulosPorProveedor() {
    const response = this.http.get(this.path + this.articulosporproveedor, this.options).pipe(map(res => res.json()));
    return response;
  }
  getProveedor(id) {
    const response = this.http.get(this.path + this.baseUrlProveedor + id, this.options).pipe(map(res => res.json()));
    return response;
  }
  putProveedorInactivar(id) {
    const response = this.http.put(this.path + this.baseUrlProveedor + 'activarInactivarProveedor/' + id + '/false', null, this.options);
    return response;
  }
}
