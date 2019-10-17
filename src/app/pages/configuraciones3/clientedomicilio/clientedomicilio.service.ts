import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientedomicilioService {

  private baseUrlClientesDomicilio = 'clientesDomicilio/';

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

  getClientesDomicilio() {
    const response = this.http.get(this.path + this.baseUrlClientesDomicilio + 'findClientesDomicilio/true', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  putInactivarClienteDomicilio(idCliente) {
    const response = this.http.put(this.path + this.baseUrlClientesDomicilio + 'activarInactivarClientesDomicilio/' + idCliente + '/false',
      null, this.options);
    return response;
  }
  createClienteDomicilio(DataJson) {
    const response = this.http.post(this.path + this.baseUrlClientesDomicilio + 'createClientesDomicilio', DataJson, this.options);
    return response;
  }
  updateClienteDomicilio(DataJson) {
    const response = this.http.put(this.path + this.baseUrlClientesDomicilio + 'updateClientesDomicilio', DataJson, this.options);
    return response;
  }
}
