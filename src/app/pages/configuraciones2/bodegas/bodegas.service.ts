import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {
  private baseUrlBodegas = 'bodega/';
  private baseUrlPunto = 'punto/';
  private baseUrlPuntoBodega = 'puntoBodega/';

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

  getPuntoBodegas() {
    const response = this.http.get(this.path + this.baseUrlPuntoBodega + 'findPuntoBodega/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPuntos() {
    const response = this.http.get(this.path + this.baseUrlPunto + 'findPuntosClienteManSitios/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  createBodega(data) {
    const response = this.http.post(this.path + this.baseUrlBodegas + 'createBodega', data, this.options).pipe(map(res => res.json()));
    return response;
  }
  createPuntoBodega(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoBodega + 'createPuntoBodega', DataList, this.options);
    return response;
  }
  putInactivar(id) {
    const response = this.http.put(this.path + this.baseUrlBodegas + 'activarInactivarBodega/' + id + '/false', null, this.options);
    return response;
  }
  updateBodega(DataJson) {
    const response = this.http.put(this.path + this.baseUrlBodegas + 'updateBodega', DataJson, this.options);
    return response;
  }
  updatePuntoBodega(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoBodega + 'updatePuntoBodega', DataList, this.options);
    return response;
  }
}
