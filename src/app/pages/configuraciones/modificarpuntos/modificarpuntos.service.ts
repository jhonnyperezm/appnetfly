import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModificarpuntosService {

  private baseUrlPaises = 'pais/';
  private baseUrlDepartamentos = 'departamento/findDepartamentos/';
  private baseUrlMunicipios = 'municipio/findMunicipios/';
  private baseUrlTipoNegocio = 'tipoNegocio/';
  private baseUrlConfPunto = 'confPunto/';
  private baseUrlMarcas = 'marca/';
  private baseUrlBodegas = 'bodega/';
  private baseUrlLicencias = 'licencias/';
  private baseUrlPunto = 'punto/';
  private baseUrlPuntoConfig = 'puntoConfiguraciones/';
  private baseUrlPuntoBodega = 'puntoBodega/';
  private baseUrlPuntoLicencia = 'puntoLicencia/';
  private baseUrlPuntoLicenciaResolucion = 'licenciaResolucion/';
  private baseUrlPuntoResolucion = 'resolucion/';
  private baseUrlPuntoMarcas = 'puntoMarca/';
  private baseUrlPuntoHoras = 'puntoHoras/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlConfigAdicionales = 'adicionalesConfPunto/';
  private baseUrlLicenciaBodega = 'bodegaLicencia/';

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


  getPuntos(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPunto + 'findPuntosById/' + idPunto, this.options).pipe(map(res => res.json()));
    return response;
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
  postTipoNegocio(DataJson) {
    const response = this.http.post(this.path + this.baseUrlTipoNegocio + 'createTipoNegocio', DataJson,  this.options);
    return response;
  }
  getConfPunto() {
    const response = this.http.get(this.path + this.baseUrlConfPunto + 'findConfPunto/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPuntoMarcas(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoMarcas + 'findPuntoMarcaById/' + idPunto, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getMarcas(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcasById/' + idCliente + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getMarcasInactivas(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcasById/' + idCliente + '/false', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createMarca(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMarcas + 'createMarca/' + DataJson.idCliente, DataJson, this.options);
    return response;
  }
  createPuntoMarcas(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoMarcas + 'createPuntoMarca', DataList, this.options);
    return response;
  }
  getPuntoLicencias(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoLicencia + 'findPuntoLicenciaById/' + idPunto + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntoLicenciasInactivas(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoLicencia + 'findPuntoLicenciaById/' + idPunto + '/false', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postPunto(data) {
    const response = this.http.put(this.path + this.baseUrlPunto + 'updatePunto', data, this.options);
    return response;
  }
  /*
  getPuntoConfiguraciones(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoConfig + 'findPuntoConfiguracionesById/' + idPunto, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getConfigAdicionales(idPunto) {
    const response = this.http.get(this.path + this.baseUrlConfigAdicionales + 'findAdicionalesConfPuntoByIdPunto/' + idPunto, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getImpuestos() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimenByTipoModulo/1/true',
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntoMarcas(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoMarcas + 'findPuntoMarcaById/' + idPunto, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPuntoHoras(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoHoras + 'findPuntoHorasByidPunto/' + idPunto, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createPuntoMarcas(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoMarcas + 'createPuntoMarca', DataList, this.options);
    return response;
  }
  deleteMarcaPunto(idPunto, idMarca) {
    const response = this.http.delete(this.path + this.baseUrlPuntoMarcas + 'deletePuntoMarca/' + idPunto + '/' + idMarca,
    this.options);
    return response;

  }
  getMarcas(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcasById/' + idCliente + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getMarcasInactivas(idCliente) {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcasById/' + idCliente + '/false', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createMarca(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMarcas + 'createMarca/' + DataJson.idCliente, DataJson, this.options);
    return response;
  }
  getPuntoBodegas(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoBodega + 'findPuntoBodegaByIdPunto/' + idPunto + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }

  getPuntoBodegasInactivas(idPunto) {
    const response = this.http.get(this.path + this.baseUrlPuntoBodega + 'findPuntoBodegaByIdPunto/' + idPunto + '/false', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getBodegaPorId(IdBodega) {
    const response = this.http.get(this.path + this.baseUrlBodegas + 'findBodegasById/' + IdBodega , this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createBodega(DataJson) {
    const response = this.http.post(this.path + this.baseUrlBodegas + 'createBodega/', DataJson, this.options).pipe(map(res => res.json()));
    return response;
  }
  updateBodega(DataJson) {
    const response = this.http.put(this.path + this.baseUrlBodegas + 'updateBodega', DataJson, this.options);
    return response;
  }
  getLicenciaPorId(IdLicencia) {
    const response = this.http.get(this.path + this.baseUrlLicencias + 'findLicenciasById/' + IdLicencia , this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createLicencia(DataJson) {
    const response = this.http.post(this.path + this.baseUrlLicencias + 'createLicencia/', DataJson, this.options).pipe(map(res => res.json()));
    return response;
  }
  updateLicencia(DataJson) {
    const response = this.http.put(this.path + this.baseUrlLicencias + 'updateLicencia', DataJson, this.options);
    return response;
  }
  inactivarLicencia(Id) {
    const response = this.http.put(this.path + this.baseUrlLicencias + 'activarInactivarLicencia/' + Id + '/' + 'false',
     null, this.options);
    return response;
  }
  activarLicencia(Id) {
    const response = this.http.put(this.path + this.baseUrlLicencias + 'activarInactivarLicencia/' + Id + '/' + 'true', null, this.options);
    return response;
  }
  findBodegasLicencias(idLicencia) {
    const response = this.http.get(this.path + this.baseUrlLicenciaBodega + 'findBodegaLicencia/' + idLicencia, this.options).pipe(map(res => res.json()));
    return response;
  }
  createPuntoBodegas(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoBodega + 'createPuntoBodega', DataList, this.options);
    return response;
  }
  createPuntoLicencia(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoLicencia + 'createPuntoLicencia', DataList, this.options);
    return response;
  }
  deleteConfigPunto(idPunto, idConfiguracion) {
    const response = this.http.delete(this.path + this.baseUrlPuntoConfig + 'deletePuntoConfiguraciones/' + idPunto + '/' + idConfiguracion,
    this.options);
    return response;
  }
  inactivarMarca(Id) {
    const response = this.http.put(this.path + this.baseUrlMarcas + 'activarInactivarMarca/' + Id + '/' + 'false', null, this.options);
    return response;
  }
  deletePuntoBodega(idPunto, idBodega) {
    const response = this.http.delete(this.path + this.baseUrlPuntoBodega + 'deletePuntoBodega/' + idPunto + '/' + idBodega, this.options);
    return response;
  }
  inactivarBodega(Id) {
    const response = this.http.put(this.path + this.baseUrlBodegas + 'activarInactivarBodega/' + Id + '/' + 'false', null, this.options);
    return response;
  }
  activarBodega(Id) {
    const response = this.http.put(this.path + this.baseUrlBodegas + 'activarInactivarBodega/' + Id + '/' + 'true', null, this.options);
    return response;
  }
  deletePuntoLicencia(idPunto, idLicencia) {
    const response = this.http.delete(this.path + this.baseUrlPuntoLicencia + 'deletePuntoLicencia/' + idPunto + '/' + idLicencia,
    this.options);
    return response;
  }
  getResolucionesLicencia(Id) {
    const response = this.http.get(this.path + this.baseUrlPuntoLicenciaResolucion + 'findLicenciaResolucionById/' + Id , this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createResolucion(DataJson) {
    const response = this.http.post(this.path + this.baseUrlPuntoResolucion + 'createResolucion/', DataJson, this.options);
    return response;
  }
  createLicenciaResolucion(DataList) {
    const response = this.http.post(this.path + this.baseUrlPuntoLicenciaResolucion + 'createLicenciaResolucion', DataList, this.options);
    return response;
  }
  updatePuntoConfiguraciones(DataList, idPunto) {
    const response = this.http.put(this.path + this.baseUrlPuntoConfig + 'updatePuntoConfiguraciones/' + idPunto, DataList, this.options);
    return response;
  }
  updatePuntoMarcas(DataList, idPunto) {
    const response = this.http.put(this.path + this.baseUrlPuntoMarcas + 'updatePuntoMarca/' + idPunto, DataList, this.options);
    return response;
  }
  updatePuntoHoras(DataList, idPunto) {
    const response = this.http.post(this.path + this.baseUrlPuntoHoras + 'updatePuntoHoras/' + idPunto, DataList, this.options);
    return response;
  }
  putPuntoAdicionConf(DataJson) {
  const response = this.http.put(this.path + this.baseUrlConfigAdicionales + 'updateAdicionalesConfPunto', DataJson, this.options);
    return response;
  }
  updateLicenciaBodega(DataList) {
    const response = this.http.post(this.path + this.baseUrlLicenciaBodega + 'updateBodegaLicencia', DataList, this.options);
      return response;
  }
 */
  updatePuntoLicencia(DataList, idPunto) {
    const response = this.http.put(this.path + this.baseUrlLicencias + 'updateListLicencia/' + idPunto, DataList, this.options);
    return response;
  }
  updatePuntoMarcas(DataList, idPunto) {
    const response = this.http.put(this.path + this.baseUrlPuntoMarcas + 'updatePuntoMarca/' + idPunto, DataList, this.options);
    return response;
  }
}
