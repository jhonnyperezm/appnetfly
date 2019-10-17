import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';


@Injectable({
  providedIn: 'root'
})
export class IngresartransaccionesService {
  private baseUrlTarnsacciones = 'transacciones/';

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(public http: Http, public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    console.log(this.path);
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


  postGuardarTransaccion(data) {
    const response = this.http.post(this.path + this.baseUrlTarnsacciones + 'createTransacciones', data, this.options);
    console.log(response);
    return response;
  }
}
