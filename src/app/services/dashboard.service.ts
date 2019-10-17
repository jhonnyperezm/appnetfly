import {Injectable} from '@angular/core';
import {RutasService} from './rutas.service';
import {Http, RequestOptions, Headers} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // ----------Definicion de Variables------------------------
  private baseUrlClientes = 'clientesCid/';
  private baseUrlMovimientos = 'movimientosCid/';
  private baseUrlTiposFuncionarios = 'tipofuncionariosCid/findTipoFuncionarios';
  private baseUrlPermisosRol = 'permisosRol/';
  private baseUrlClienteAplicaciones = 'clienteAplicaciones/';
  private baseUrlUsuariosCid = 'usuariosCid/';
  private baseUrlUsuarios = 'usuarios/';
  private baseUrlMovimientoCartera = 'movimientoCartera/';
  private baseUrlClientesCartera = 'clientesCartera/';
  private baseUrlAplicacion = 'aplicaciones/';
  private baseUrlArticulosSabCliente = 'articulosCiClientes/';
  private baseUrlMovimientoInfluencer = 'movimientoInfluencer/';


  path: any;
  headers: any;
  options: any;
  token: any;

  constructor(public http: Http, public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    this.token = localStorage.getItem('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      token: this.token
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  getPermisos(idRol) {
    const response = this.http.get(this.path + this.baseUrlPermisosRol + 'findPermisosRolById/' + idRol,
      this.options).pipe(map(res => res.json()));
    return response;
  }

  createAplicacion(nombre) {
    const response = this.http.post(this.path + this.baseUrlAplicacion + 'createAplicaciones/' + nombre, null, this.options);
    return response;
  }

  // METODOS EVEDESA
  actualizarClientesInternos() {
    const response = this.http.put(this.path + this.baseUrlClientes + 'actualizarClientesInternos', null, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  actualizarClientesExternos() {
    const response = this.http.put(this.path + this.baseUrlClientes + 'actualizarClientesExternos', null, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  findClientesByIdTipo(idCliente, tipoCliente) {
    const response = this.http.get(this.path + this.baseUrlClientes + 'findClientesByIdTipo/' + idCliente + '/' +
      tipoCliente, this.options).pipe(map(res => res.json()));
    return response;
  }

  actualizarClientesInternosById(idCliente) {
    const response = this.http.put(this.path + this.baseUrlClientes + 'actualizarClientesInternosById/' + idCliente,
      null, this.options).pipe(map(res => res.json()));
    return response;
  }

  actualizarClientesExternosById(idCliente) {
    const response = this.http.put(this.path + this.baseUrlClientes + 'actualizarClientesExternosById/' + idCliente,
      null, this.options).pipe(map(res => res.json()));
    return response;
  }

  getTiposFuncionarios() {
    const response = this.http.get(this.path + this.baseUrlTiposFuncionarios, this.options).pipe(map(res => res.json()));
    return response;
  }

  actualizarClientesInternosTipoFuncionario(tipo) {
    const response = this.http.put(this.path + this.baseUrlClientes + 'actualizarClientesInternosTipoFuncionario/' +
      tipo, null, this.options).pipe(map(res => res.json()));
    return response;
  }

  actualizarClientesExternosTipoFuncionario(tipo) {
    const response = this.http.put(this.path + this.baseUrlClientes + 'actualizarClientesExternosTipoFuncionario/' +
      tipo, null, this.options).pipe(map(res => res.json()));
    return response;
  }

  adicionarClientesInternosById(idTab, cantidad, logConf) {
    const response = this.http.put(this.path + this.baseUrlMovimientos + 'adicionarClientesInternosById/' + idTab +
      '/' + cantidad + '/' + logConf, null, this.options).pipe(map(res => res.json()));
    return response;
  }

  adicionarClientesExternosById(idTab, cantidad, logConf) {
    const response = this.http.put(this.path + this.baseUrlMovimientos + 'adicionarClientesExternosById/' + idTab +
      '/' + cantidad + '/' + logConf, null, this.options).pipe(map(res => res.json()));
    return response;
  }

  getClienteAplicaciones(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClienteAplicaciones + 'findClienteAplicaciones/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getUsuarioClienteCi(idCliente) {
    const response = this.http.get(this.path + this.baseUrlUsuariosCid + 'findUsersByIdCliente/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  findSaldoByIdCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMovimientos + 'findSaldoDispByIdCliente/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  // METODOS INGRESO EVEDESA
  postLoginCartera(user, pass) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const response = this.http.post(this.path + 'usuariosCid/auth/' + user + '/' + pass, options);
    return response;
  }

  decodeTokenCi(token) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const response = this.http.get(this.path + 'usuariosCid/decodeToken/' +
      token, options).pipe(map(res => res.json()));
    return response;
  }

  // METODOS CARTERA
  subirAbonos(DataList) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCartera + 'importarMovimientoCarteraAbonos', DataList, this.options);
    return response;
  }

  findClientesCarteraByNumDoc(numDoc) {
    const response = this.http.get(this.path + this.baseUrlClientesCartera + 'findClientesCarteraByNumDoc/' + numDoc, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  findSaldoByIdClienteCartera(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCartera + 'findSaldoDispByIdCliente/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  actualizarClientesCarteraById(idCliente) {
    const response = this.http.put(this.path + this.baseUrlClientesCartera + '/' + idCliente,
      null, this.options).pipe(map(res => res.json()));
    return response;
  }

  // METODOS INGRESO CONFIGURACIONES
  getUsuarioCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlUsuarios + 'findUsersByIdCliente/true/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  postLogin(user, pass, ip) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const response = this.http.post(this.path + 'usuarios/auth/' + user + '/' + pass + '/' + ip, options);
    return response;
  }

  decodeToken(token) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const response = this.http.get(this.path + 'usuarios/decodeToken/' +
      token, options).pipe(map(res => res.json()));
    return response;
  }

  logout(user) {
    const response = this.http.get(this.path + 'usuarios/logout/' + user, this.options);
    return response;
  }


  // INFLUENCER
  getFindArticulosSab(idInfluencer) {
    return this.http.get(this.path + this.baseUrlArticulosSabCliente + 'findArticulosCiInfluencer/' + idInfluencer, this.options)
      .pipe(map(res => res.json()));
  }

  getFindInfluencerId(id) {
    return this.http.get(this.path + this.baseUrlClientes + 'findClientesById?id=' + id, this.options)
      .pipe(map(res => res.json()));
  }

  postUpdateMovimientoAdicionInfluencer(dataJson) {
    return this.http.post(this.path + this.baseUrlMovimientoInfluencer + 'createMovimientoAdicionSabInfluencer', dataJson, this.options);
  }

  postUpdateMovimientoInfluencer() {
    return this.http.post(this.path + this.baseUrlMovimientoInfluencer + 'resetMovimientoInfluencer', null, this.options);
  }

  postUpdateMovimientoInfluencerId(idInfluencer) {
    return this.http.post(this.path + this.baseUrlMovimientoInfluencer + 'resetMovimientoInfluencerById/' + idInfluencer, null, this.options);
  }

  postUpdateExcelInfluencer(dataJson) {
    return this.http.post(this.path + this.baseUrlClientes + 'importarInfluencerCi', dataJson, this.options);
  }

  postUpdateExcelClientes(dataJson) {
    return this.http.post(this.path + this.baseUrlClientes + 'importarClientesCi', dataJson, this.options);
  }
}
