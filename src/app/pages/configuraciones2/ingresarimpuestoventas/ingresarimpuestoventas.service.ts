import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresarimpuestoventasService {

  private baseUrlClases = 'clases/';
  private baseUrlGrupos = 'grupoVentaInv/';
  private baseUrlCliente = 'cliente/';
  private baseUrlClientesImpuesto = 'clienteImpuesto/';
  private baseUrlCanalCliente = 'clienteCanal/';
  private baseUrlImpuestoVenta = 'impuestosventas/';
  private baseUrlImpuestoVentaCanal = 'impuestosventasCanal/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlArticulosImpuestosVentas = 'articulosImpuestosventas/';

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

  getClases() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClasesVenta', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getGrupos(idClase) {
    const response = this.http.get(this.path + this.baseUrlGrupos + 'findGrupoByIdClase/' + idClase + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestosPorCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClientesImpuesto + 'findClienteImpuestoById/' + idCliente, this.options)
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
  postImpuestoVentaCanal(DataList) {
    const response = this.http.post(this.path + this.baseUrlImpuestoVentaCanal + 'createImpuestosventascanal', DataList, this.options);
    return response;
  }
  //////

  updateArticulosClase(idClase, impDif, Impuesto, Tarifa) {
    const response = this.http.put(this.path + this.baseUrlArticulos + 'updateArticulosByIdClase/'
    + idClase + '/' + impDif + '/' + Impuesto + '/' + Tarifa, null, this.options);
    return response;
  }
  updateArticulosGrupo(idGrupo, impDif, Impuesto, Tarifa) {
    const response = this.http.put(this.path + this.baseUrlArticulos + 'updateArticulosByIdGrupo/'
    + idGrupo + '/' + impDif + '/' + Impuesto + '/' + Tarifa, null, this.options);
    return response;
  }
  updateArticuloVentaCanalClase(idClase, DataList) {
    const response = this.http.put(this.path + this.baseUrlArticulosImpuestosVentas + 'updateArticulosImpuestosventasByIdClase/'
    + idClase, DataList, this.options);
    return response;
  }
  updateArticuloVentaCanalGrupo(idGrupo, DataList) {
    const response = this.http.put(this.path + this.baseUrlArticulosImpuestosVentas + 'updateArticulosImpuestosventasByIdGrupo/'
    + idGrupo, DataList, this.options);
    return response;
  }
}

