import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private baseUrlTransacciones = 'transacciones/';

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

  getTransacciones() {
    const response = this.http.get(this.path + this.baseUrlTransacciones + 'findTransacciones/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  putInactivarTransaccion(idTransaccion) {
    const response = this.http.put(this.path + this.baseUrlTransacciones + 'activarInactivarTransacciones/' + idTransaccion + '/false',
    null, this.options);
    return response;
  }
}
