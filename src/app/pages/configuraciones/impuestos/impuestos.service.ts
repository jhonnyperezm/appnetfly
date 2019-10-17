import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  private baseUrlImpuestos = 'impuesto/';
  private baseUrlTarifas = 'tarifa/';
  private baseUrlRegimen = 'regimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';

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

  getTarifas() {
    const response = this.http.get(this.path + this.baseUrlTarifas + 'findTarifas', this.options).pipe(map(res => res.json()));
    return response;
  }
  getRegimen() {
    const response = this.http.get(this.path + this.baseUrlRegimen + 'findRegimen', this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestos() {
    const response = this.http.get(this.path + this.baseUrlImpuestos + 'findImpuestos/42/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestosRegimen() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimen/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createTarifa(DataJson) {
    const response = this.http.post(this.path + this.baseUrlTarifas + 'createTarifa', DataJson, this.options);
    return response;
  }
  createImpuesto(DataJson) {
    const response = this.http.post(this.path + this.baseUrlImpuestos + 'createImpuesto', DataJson, this.options);
    return response;
  }
  createImpuestoRegimen(DataList) {
    const response = this.http.post(this.path + this.baseUrlImpuestoRegimen + 'createImpuestoRegimen', DataList, this.options);
    return response;
  }
  createImpuestoTarifa(DataList) {
    const response = this.http.post(this.path + this.baseUrlImpuestoTarifa + 'createImpuestoTarifa', DataList, this.options);
    return response;
  }
  updateImpuestoRegimen(DataList, IdImp, IdReg) {
    const response = this.http.post(this.path + this.baseUrlImpuestoRegimen + 'updateImpuestoRegimen/' + IdImp + '/' + IdReg,
    DataList, this.options);
    return response;
  }
  updateImpuestoTarifa(DataList, IdImp, IdReg) {
    const response = this.http.post(this.path + this.baseUrlImpuestoTarifa + 'updateImpuestoTarifa/' + IdImp + '/' + IdReg,
    DataList, this.options);
    return response;
  }
  putInactivarImpuesto(id) {
    const response = this.http.put(this.path + this.baseUrlImpuestoRegimen + 'activarInactivarImpuestoRegimen/' +
    id + '/false', null, this.options);
    return response;
  }
  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getImpTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaByIdImpIdReg/' +
    idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateImpuesto(data) {
    const response = this.http.put(this.path + this.baseUrlImpuestos + 'updateImpuesto', data, this.options);
    return response;
  }
  eliminarImpuestoTarifa(impuesto, tarifa, regimen) {
    const response = this.http.delete(this.path + this.baseUrlImpuestoTarifa + 'deleteTarifaImp/' +
    impuesto + '/' + tarifa + '/' + regimen, this.options);
    return response;
  }
}
