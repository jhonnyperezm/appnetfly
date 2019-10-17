import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GruposformaspagoService {

  private baseUrlGruposFormasPago = 'gruposFormasPago/';
  private baseUrlFormasPagoEstandar = 'formasPagoEstandar/';

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
  getGruposFormasPago() {
    const response = this.http.get(this.path + this.baseUrlGruposFormasPago + 'findGruposFormasPago/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getFormasPagoEstandar() {
    const response = this.http.get(this.path + this.baseUrlFormasPagoEstandar + 'findFormasPagoEstandar', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createGrupoFormaPago(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGruposFormasPago + 'createGruposFormasPago', DataJson, this.options);
    return response;
  }
  putInactivar(idGrupo) {
    const response = this.http.put(this.path + this.baseUrlGruposFormasPago + 'activarInactivarGruposFormasPago/' + idGrupo + '/false',
    null, this.options);
    return response;
  }
  updateGrupoFormaPago(DataJson) {
    const response = this.http.put(this.path + this.baseUrlGruposFormasPago + 'updateGruposFormasPago', DataJson,
    this.options);
    return response;
  }
}
