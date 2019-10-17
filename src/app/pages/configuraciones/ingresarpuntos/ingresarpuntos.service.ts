import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresarpuntosService {

  private baseUrlPaises = 'pais/';
  private baseUrlDepartamentos = 'departamento/findDepartamentos/';
  private baseUrlMunicipios = 'municipio/findMunicipios/';
  private baseUrlTipoNegocio = 'tipoNegocio/';
  private baseUrlConfPunto = 'confPunto/';
  private baseUrlLicencias = 'licencias/';
  private baseUrlPunto = 'punto/';
  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlConfigAdicionales = 'adicionalesConfPunto/';
  private baseUrlPuntoHoras = 'puntoHoras/';
  private baseUrlMarcas = 'marca/';
  private baseUrlPuntoMarca = 'puntoMarca/';

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
  getTipoNegocio() {
    const response = this.http.get(this.path + this.baseUrlTipoNegocio + 'findTipoNegocio', this.options).pipe(map(res => res.json()));
    return response;
  }
  getMarcas(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcasById/' + idCliente + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createMarca(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMarcas + 'createMarca/' + DataJson.idCliente, DataJson, this.options);
    return response;
  }
  postTipoNegocio(DataJson) {
    const response = this.http.post(this.path + this.baseUrlTipoNegocio + 'createTipoNegocio', DataJson,  this.options);
    return response;
  }
  getConfPunto() {
    const response = this.http.get(this.path + this.baseUrlConfPunto + 'findConfPunto/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  postPunto(data) {
    const response = this.http.post(this.path + this.baseUrlPunto + 'createPunto', data, this.options);
    return response;
  }
  createClientePunto(DataList) {
    const response = this.http.post(this.path + this.baseUrlClientePunto + 'createClientePunto', DataList, this.options);
    return response;
  }
  createPuntoLicencia(DataList, idPunto) {
    const response = this.http.post(this.path + this.baseUrlLicencias + 'createListLicencia/' + idPunto, DataList, this.options);
    return response;
  }
  createPuntoAdicionConf(DataJson) {
    const response = this.http.post(this.path + this.baseUrlConfigAdicionales + 'createAdicionalesConfPunto', DataJson, this.options);
    return response;
  }
  createPuntoHoras(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoHoras + 'createPuntoHoras', DataList, this.options);
    return response;
  }
  createPuntoMarcas(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoMarca + 'createPuntoMarca', DataList, this.options);
    return response;
  }
}
