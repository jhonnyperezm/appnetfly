import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({providedIn: 'root'})
export class CompraService {

  private baseUrlCompras = 'movimientoCompras/';
  private baseUrlClientePunto = 'clientePunto/';

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
  
  getCompras() {
    const response = this.http.get(this.path + this.baseUrlCompras + 'findComprasByIdCliente', this.options).pipe(map(res => res.json()));
    return response;
  }
  getCountOrdenesPendientes () {
    const response = this.http.get(this.path + this.baseUrlCompras + 'findOrdenesPendientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPuntosCliente() {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePuntoByIdCliente/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updatePuntoCompra(idCompra, idPunto) {
    const response = this.http.put(this.path + this.baseUrlCompras + 'updateEstadoInventario/' + idCompra + '/' + idPunto, null, this.options);
    return response;
  }
  
}
