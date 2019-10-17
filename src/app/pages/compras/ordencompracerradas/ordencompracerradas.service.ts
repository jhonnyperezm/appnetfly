import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class OrdencompracerradasService {

  private baseOrdenCerradasUrl = 'movimientoCompras/findOrdenesComprasCerradasByIdCliente';
  private baseOrdenCerradasArticulosUrl = 'movimientoArticulos/findArticulosOrdenesComprasCerradasByIdMovimiento/';

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

  getOrdenescerradas() {
    const response = this.http.get(this.path + this.baseOrdenCerradasUrl, this.options).pipe(map(res => res.json()));
    return response;
  }
  getArticulosOrdenescerradasByIdMovimiento(numFactura) {
    const response = this.http.get(this.path + this.baseOrdenCerradasArticulosUrl + numFactura, this.options).pipe(map(res => res.json()));
    return response;
  }

}
