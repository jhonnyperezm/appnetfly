import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class OrdencompraService {

  private baseUrl = 'movimientoCompras/';

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(public http: Http, public rutasService: RutasService) {
    /**
     * Se agrega la ruta de path general
    */
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

  getOrdenesCompra() {
    const response = this.http.get(this.path + this.baseUrl + 'findOrdenesByIdCliente', this.options).pipe(map(res => res.json()));
    return response;
  }

  deleteOrdenesCompra(id_eliminar) {
    const response = this.http.delete(this.path + this.baseUrl + 'deleteOrdenesById/' + id_eliminar, this.options);
    return response;
  }
}
