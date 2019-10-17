import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConfigurarclienteService {

  private baseUrlClientes = 'cliente/';
  private baseUrlPaises = 'pais/';
  private baseUrlCanales = 'canal/';
  private baseUrlClientesImpuesto = 'clienteImpuesto/';
  private baseUrlCanalCliente = 'clienteCanal/';
  private baseUrlCanalImpuesto = 'canalImpuesto/';
  private baseUrlMensajesLegales = 'mensajesLegales/';
  private baseUrlImpuestoTarifas = 'impuestoTarifa/';
  private baseUrlImpuesto = 'impuesto/';
  private baseUrlRegimen = 'regimen/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';

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

  getCliente(id) {
    const response = this.http.get(this.path + this.baseUrlClientes + 'findClientesById/' + id, this.options).pipe(map(res => res.json()));
    return response;
  }
  getPaises() {
    const response = this.http.get(this.path + this.baseUrlPaises + 'findPaises', this.options).pipe(map(res => res.json()));
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
  getMensajesLegales(id) {
    const response = this.http.get(this.path + this.baseUrlMensajesLegales + 'findMensajesLegalesByIdCliente/' + id, this.options).pipe(map(res => res.json()));
    return response;
  }
  getCanales() {
    const response = this.http.get(this.path + this.baseUrlCanales + 'findCanal/', this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestos(idPais) {
    const response = this.http.get(this.path + this.baseUrlImpuesto + 'findImpuestos/' + idPais + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getRegimen(idImp) {
    const response = this.http.get(this.path + this.baseUrlRegimen + 'findRegimenByIdImp/' + idImp + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  } */
  getRegimen() {
    const response = this.http.get(this.path + this.baseUrlRegimen + 'findRegimen', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getImpuestosRegimen() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimen/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  deleteClienteCanal(idCliente, idCanal) {
    const response = this.http.delete(this.path + this.baseUrlCanalCliente + 'deleteClienteCanal/' +
                     idCliente + '/' + idCanal, this.options);
    return response;
  }
  getTarifas(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifas + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateCliente(data) {
    const response = this.http.put(this.path + this.baseUrlClientes + 'updateCliente', data, this.options);
     return response;
  }
  updateClienteImpuesto(DataList, idCli) {
    const response = this.http.post(this.path + this.baseUrlClientesImpuesto + 'updateClienteImpuesto/' + idCli, DataList, this.options);
    return response;
  }
  uodateClienteCanales(DataList, idCli) {
    const response = this.http.post(this.path + this.baseUrlCanalCliente + 'updateClienteCanal/' + idCli, DataList, this.options);
    return response;
  }
  updateMensajesLegales(mensajes,idCliente){
    const response = this.http.post(this.path + this.baseUrlMensajesLegales + 'updateMensajesLegales/'+idCliente, mensajes, this.options);
    return response;
  }
}
