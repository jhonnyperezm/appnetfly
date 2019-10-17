import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ClientecomensalService {

  private baseUrlTipoClientes = 'tipoCliente/';
  private baseUrlCliente = 'cliente/';
  private baseUrlClientescomensal = 'clienteComensal/';

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
      token: this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getClientes() {
    const response = this.http.get(this.path + this.baseUrlClientescomensal + 'findClientesComensalAll/true', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  putInactivarCliente(idCliente) {
    const response = this.http.put(this.path + this.baseUrlClientescomensal + 'activarInactivarClientesComensal/' + idCliente + '/false',
    null, this.options);
    return response;
  }
}
