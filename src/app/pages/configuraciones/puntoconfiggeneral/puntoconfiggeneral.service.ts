import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PuntoconfiggeneralService {

  private baseUrlAlmacen = 'almacen/';
  private baseUrlclientePuntos = 'clientePunto/';
  private baseUrlpuntoPosicionCosto = 'puntoPosicionCosto/';

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
  getConfiguracion(idCliente) {
    const response = this.http.get(this.path + this.baseUrlAlmacen + 'findAlmacenByIdCli/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntosPosiciones(idCliente) {
    const response = this.http.get(this.path + this.baseUrlpuntoPosicionCosto + 'findPuntoPosicionCosto/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntos(idCliente) {
    const response = this.http.get(this.path + this.baseUrlclientePuntos + 'findClientePunto/' + idCliente + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createAlmacen(DataJson) {
    const response = this.http.post(this.path + this.baseUrlAlmacen + 'createAlmacen', DataJson, this.options);
    return response;
  }
  updatePuntoPosicionCosto(DataList, idCliente) {
    const response = this.http.put(this.path + this.baseUrlpuntoPosicionCosto + 'updatePuntoPosicionCosto/' + idCliente,
    DataList, this.options);
    return response;
  }
}
