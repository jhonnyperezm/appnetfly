import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresarclientesService {

  private baseUrlClientes = 'cliente/';
  private baseUrlClientesImpuesto = 'clienteImpuesto/';
  private baseUrlCanales = 'canal/';
  private baseUrlCanalCliente = 'clienteCanal/';
  private baseUrlCanalImpuesto = 'canalImpuesto/';
  private baseUrlPaises = 'pais/';
  private baseUrlDepartamentos = 'departamento/findDepartamentos/';
  private baseUrlMunicipios = 'municipio/findMunicipios/';
  private baseUrlImpuesto = 'impuesto/';
  private baseUrlRegimen = 'regimen/';
  private baseUrlUsuarios = 'usuarios/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlApp = 'aplicaciones/';
  private baseUrlClienteAplicacion = 'clienteAplicaciones/';
  private baseUrlusuariosCid = 'usuariosCid/';
  private baseUrlImpuestoTarifas = 'impuestoTarifa/';
  private baseUrlContactoCliente = 'contactosCliente/';
  private baseUrlmensajes = 'mensajesLegales/';
  private baseUrlMarca = 'marca/';


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

  getPaises() {
    const response = this.http.get(this.path + this.baseUrlPaises + 'findPaises', this.options).pipe(map(res => res.json()));
    return response;
  }
  getDepartamentos(idPais) {
    const response = this.http.get(this.path + this.baseUrlDepartamentos + idPais, this.options).pipe(map(res => res.json()));
    return response;
  }
  getMunicipios(idDepartamento) {
    const response = this.http.get(this.path + this.baseUrlMunicipios + idDepartamento, this.options).pipe(map(res => res.json()));
    return response;
  }
  postCliente(data) {
    const response = this.http.post(this.path + this.baseUrlClientes + 'createCliente', data, this.options);
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
  /* getRegimen() {
    const response = this.http.get(this.path + this.baseUrlRegimen + 'findRegimen', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getCanales() {
    const response = this.http.get(this.path + this.baseUrlCanales + 'findCanal/', this.options).pipe(map(res => res.json()));
    return response;
  } */
  getPaisByIdPais(paisReg) {
    const response = this.http.get(this.path + this.baseUrlPaises + 'findPaisesById/' + paisReg, this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestoRegimen(idImp, idRegimen) {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimenById/' + idImp
    + '/' + idRegimen + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getRegimenByIdReg(idReg) {
    const response = this.http.get(this.path + this.baseUrlRegimen + 'findRegimenByIdReg/' + idReg, this.options).pipe(map(res => res.json()));
    return response;
  }
  getTarifas(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifas + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getApp() {
    const response = this.http.get(this.path + this.baseUrlApp + 'findAplicaciones/' + 'true', this.options).map(res => res.json());
    return response;
  } */
  createUsuario(DataJson) {
    const response = this.http.post(this.path + this.baseUrlUsuarios + 'createUsers', DataJson, this.options);
    return response;
  }
  postContactoCliente(DataList) {
    const response = this.http.post(this.path + this.baseUrlContactoCliente + 'createContacto', DataList, this.options);
    return response;
  }
  postMarca(DataList, idCliente) {
    const response = this.http.post(this.path + this.baseUrlMarca + 'createMarca/' + idCliente, DataList, this.options);
    return response;
  }
  putMarca(DataList, idCliente) {
    const response = this.http.put(this.path + this.baseUrlMarca + 'updateMarca/' + idCliente, DataList, this.options);
    return response;
  }
  /* createClienteImpuesto(DataList) {
    const response = this.http.post(this.path + this.baseUrlClientesImpuesto + 'createClienteImpuesto', DataList, this.options);
    return response;
  }
  createClienteCanales(DataList) {
    const response = this.http.post(this.path + this.baseUrlCanalCliente + 'createClienteCanal', DataList, this.options);
    return response;
  } */
  /* createCanalImpuesto(DataList) {
    const response = this.http.post(this.path + this.baseUrlCanalImpuesto + 'createCanalImpuesto', DataList, this.options);
    return response;
  } */
  /* createClienteAplicacion(DataList) {
    const response = this.http.post(this.path + this.baseUrlClienteAplicacion + 'createClienteAplicacion', DataList, this.options);
    return response;
  } */
  /* createUsuarioCartera(DataJson) {
    const response = this.http.post(this.path + this.baseUrlusuariosCid + 'createUsers', DataJson, this.options);
    return response;
  } */
  /* buscarTarifa(impuesto, regimen) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaByIdImpIdReg/' + impuesto + '/' + regimen,
    this.options).map(res => res.json());
    return response;
  } */
  ValidarNit(nit) {
    const response = this.http.post(this.path + this.baseUrlClientes + 'validarNit/' + nit, null, this.options);
    return response;
  }
  ValidarEmail(correo) {
    const response = this.http.post(this.path + this.baseUrlClientes + 'validarEmail/' + correo, null, this.options);
    return response;
  }

  /* createMensajesLegales(mensajes){
    const response = this.http.post(this.path + this.baseUrlmensajes + 'createMensajesLegales', mensajes, this.options);
    return response;
  } */
}
