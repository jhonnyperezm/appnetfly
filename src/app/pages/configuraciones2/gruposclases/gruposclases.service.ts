import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruposclasesService {

  private baseUrlClases = 'clases/';
  private baseUrlGrupos = 'grupoVentaInv/';
  private baseUrlCliente = 'cliente/';
  private baseUrlClientesImpuesto = 'clienteImpuesto/';
  private baseUrlCanalCliente = 'clienteCanal/';
  private baseUrlImpuestoVenta = 'impuestosventas/';

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

  getDatosClase(idClase) {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClasesByIdClase/' + idClase, this.options)
    .pipe(map(res => res.json()));
      return response;
  }
  getGruposClases(idClase) {
  const response = this.http.get(this.path + this.baseUrlGrupos + 'findGrupoByIdClase/' + idClase + '/true', this.options)
  .pipe(map(res => res.json()));
    return response;
  }
  putInactivarGruposClases(idClase) {
    const response = this.http.put(this.path + this.baseUrlGrupos + 'activarInactivarGrupo/' + idClase + '/false',
    null, this.options);
    return response;
  }
  createGrupo(data) {
    const response = this.http.post(this.path + this.baseUrlGrupos + 'createGrupo', data, this.options);
    return response;
  }
  updateGruposclases(DataJson) {
    const response = this.http.put(this.path + this.baseUrlGrupos + 'updateGrupoHibernate', DataJson, this.options);
    return response;
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestosPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClientesImpuesto + 'findClienteImpuestoByIdImpUsa/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getCanalesPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlCanalCliente + 'findClienteCanalById/' + idCliente, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postImpuestoVenta(DataList) {
    const response = this.http.post(this.path + this.baseUrlImpuestoVenta + 'createImpuestosventas', DataList, this.options);
    return response;
  }

}
