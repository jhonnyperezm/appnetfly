import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListapreciosService {

  private baseUrlListaPrecios = 'listaPrecios/';
  private baseUrlCliente = 'cliente/';
  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlListaPreciosPunto = 'listaPreciosPunto/';
  private baseUrlDescuentos = 'descuentos/';

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

  /* getListaPrecios() {
    const response = this.http.get(this.path + this.baseUrlListaPrecios + 'findListaPrecios/true', this.options).pipe(map(res => res.json()));
    return response;
  } */
  getListaPrecios() {
    const response = this.http.get(this.path + this.baseUrlListaPrecios + 'findListaPreciosArticulos/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getClientes() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findClientes/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPuntosCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePunto/' + idCliente + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntosListaPrecios(idListaPrecios) {
    const response = this.http.get(this.path + this.baseUrlListaPreciosPunto + 'findListaPreciosPuntoById/' + idListaPrecios, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createListaPrecios(DataJson) {
    const response = this.http.post(this.path + this.baseUrlListaPrecios + 'createListaPrecios', DataJson, this.options);
    return response;
  }
  createPuntoListaPrecios(DataList) {
    const response = this.http.post(this.path + this.baseUrlListaPreciosPunto + 'createListaPreciosPunto', DataList, this.options);
    return response;
  }
  putInactivar(id) {
    const response = this.http.put(this.path + this.baseUrlListaPrecios + 'activarInactivarListaPrecios/' + id + '/false',
    null, this.options);
    return response;
  }
  updateListaPrecios(DataJson) {
    const response = this.http.put(this.path + this.baseUrlListaPrecios + 'updateListaPrecios', DataJson, this.options);
    return response;
  }
  updatePuntoListaPrecios(DataList, idListaPrecios) {
    const response = this.http.put(this.path + this.baseUrlListaPreciosPunto + 'updateListaPreciosPunto/' + idListaPrecios,
    DataList, this.options);
    return response;
  }
  createDescuentos(DataList) {
    const response = this.http.post(this.path + this.baseUrlDescuentos + 'createDescuentos', DataList, this.options);
    return response;
  }
}
