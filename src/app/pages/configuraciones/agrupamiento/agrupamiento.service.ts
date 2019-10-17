import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AgrupamientoService {

  private baseUrlAgrupamiento = 'agrupamiento/';
  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlPuntoAgrupacion = 'agrupamientoPuntos/';

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
  getAgrupacion() {
    const response = this.http.get(this.path + this.baseUrlAgrupamiento + 'findAgrupamiento/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPuntosCliente() {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePuntoByIdCliente/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createAgrupamiento(DataJson) {
    const response = this.http.post(this.path + this.baseUrlAgrupamiento + 'createAgrupamiento', DataJson, this.options);
    return response;
  }
  createPuntosAgrupacion(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoAgrupacion + 'createAgrupamientoPunto', DataList, this.options);
    return response;
  }
  findPuntosAgrupacionByAgrupamiento(idAgrupamiento) {
    const response = this.http.get(this.path + this.baseUrlPuntoAgrupacion + 'findagrupamientoPuntosByIdAgrupamiento/' + idAgrupamiento,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  updateAgrupamiento(DataJson) {
    const response = this.http.post(this.path + this.baseUrlAgrupamiento + 'updateAgrupamiento', DataJson, this.options);
    return response;
  }
  updatePuntosAgrupacion(DataList, idAgrupamiento) {
    const response = this.http.post(this.path + this.baseUrlPuntoAgrupacion + 'updateAgrupamientoPunto/' + idAgrupamiento,
    DataList, this.options);
    return response;
  }
}
