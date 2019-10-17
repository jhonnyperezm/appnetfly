import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  private baseUrlPendientes = 'movimientoCompras/';
  private baseUrlMovimientoArticulos = 'movimientoArticulos/';

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

  getPendientes() {
    const response = this.http.get(this.path + this.baseUrlPendientes + 'findPendientesByIdCliente', this.options).pipe(map(res => res.json()));
    return response;
  }
  getCantidadPendientes(idMovCompras) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'countArtSinFacturar/' + idMovCompras,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  putEliminarpendientes(id) {
    const response = this.http.delete(this.path + this.baseUrlPendientes + 'deletePendienteById/' + id, this.options);
    return response;
  }

}
