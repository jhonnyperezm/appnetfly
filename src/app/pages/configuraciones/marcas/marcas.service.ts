import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private baseUrlMarcas = 'marca/';
  private baseUrlCliente = 'cliente/';

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

  getMarcas() {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcas/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getClientes() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findClientes/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  createMarca(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMarcas + 'createMarca/' + DataJson.idCliente, DataJson, this.options);
    return response;
  }
  putInactivar(id) {
    const response = this.http.put(this.path + this.baseUrlMarcas + 'activarInactivarMarca/' + id + '/false', null, this.options);
    return response;
  }
  updateMarca(DataJson) {
    const response = this.http.put(this.path + this.baseUrlMarcas + 'updateMarca/' + DataJson.id_cliente, DataJson, this.options);
    return response;
  }
}
