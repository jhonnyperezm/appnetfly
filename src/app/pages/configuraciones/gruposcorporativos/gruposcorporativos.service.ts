import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GruposcorporativosService {

  private baseUrlGrupos = 'grupoCorporativo/';
  private baseUrlCliente = 'cliente/';
  private baseUrlClienteGrupo = 'clienteGrupo/';

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

  getClientes() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findClientes/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getGrupos() {
    const response = this.http.get(this.path + this.baseUrlGrupos + 'findGrupoCorp/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  createGrupo(data) {
    const response = this.http.post(this.path + this.baseUrlGrupos + 'createGrupoCorp', data, this.options);
    return response;
  }
  createClientesGrupo(DataList) {
    const response = this.http.post(this.path + this.baseUrlClienteGrupo + 'createClienteGrupo', DataList, this.options);
    return response;
  }
  putInactivarGrupo(id) {
    const response = this.http.put(this.path + this.baseUrlGrupos + 'activarInactivarGrupoCorp/' + id + '/false', null, this.options);
    return response;
  }
  getClientesPorGrupo(id) {
    const response = this.http.get(this.path + this.baseUrlClienteGrupo + 'findClientesGrupoById/' + id, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateGrupo(data) {
    const response = this.http.put(this.path + this.baseUrlGrupos + 'updateGrupoCorp/', data, this.options);
    return response;
  }
  eliminarClienteGrupo(grupo, cliente) {
    const response = this.http.delete(this.path + this.baseUrlClienteGrupo + 'deleteClienteGrupo/' + grupo + '/' + cliente, this.options);
    return response;
  }
}
