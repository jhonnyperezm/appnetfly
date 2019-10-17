import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificarclientesService {

  private baseUrlClientes = 'cliente/';
  private baseUrlPaises = 'pais/';
  private baseUrlDepartamentos = 'departamento/findDepartamentos/';
  private baseUrlMunicipios = 'municipio/findMunicipios/';
  /* private baseUrlApp = 'aplicaciones/'; */
  /* private baseUrlClienteAplicacion = 'clienteAplicaciones/'; */
  /* private baseUrlusuariosCid = 'usuariosCid/'; */
  private baseUrlContactoCliente = 'contactosCliente/';
  private baseUrlMarcas = 'marca/';

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
  getMarcasCliente(id, estado) {
    const response = this.http.get(this.path + this.baseUrlMarcas + 'findMarcasById/' + id + '/' + estado, this.options).pipe(map(res => res.json()));
    return response;
  }
  getContactosCliente(id) {
    const response = this.http.get(this.path + this.baseUrlContactoCliente + 'findContacto/' + id, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getImpuestoByIdImpuesto(idImp) {
    const response = this.http.get(this.path + this.baseUrlImpuesto + 'findImpuestosById/' + idImp, this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestoRegimen(idImp, idRegimen) {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimenById/' + idImp
    + '/' + idRegimen + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  } */
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
  /* getApp() {
    const response = this.http.get(this.path + this.baseUrlApp + 'findAplicaciones/' + 'true', this.options).pipe(map(res => res.json()));
    return response;
  } */
  postContactoCliente(DataList) {
    const response = this.http.post(this.path + this.baseUrlContactoCliente + 'createContacto', DataList, this.options);
    return response;
  }
  putContactoCliente(DataList) {
    const response = this.http.post(this.path + this.baseUrlContactoCliente + 'updateContacto', DataList, this.options);
    return response;
  }
  deleteContactoCliente(IdContacto) {
    const response = this.http.delete(this.path + this.baseUrlContactoCliente + 'deleteContacto/' + IdContacto, this.options);
    return response;
  }
  /* deleteClienteImpuesto(idCliente, idImpuesto, idRegimen) {
    const response = this.http.delete(this.path + this.baseUrlClientesImpuesto + 'deleteClienteImpuesto/' +
                     idCliente + '/' + idImpuesto + '/' + idRegimen, this.options);
    return response;
  } */
  updateCliente(data) {
    const response = this.http.put(this.path + this.baseUrlClientes + 'updateCliente', data, this.options);
     return response;
  }
  postMarca(DataList, idCliente) {
    const response = this.http.post(this.path + this.baseUrlMarcas + 'createMarca/' + idCliente, DataList, this.options);
    return response;
  }
  putMarca(DataList, idCliente) {
    const response = this.http.put(this.path + this.baseUrlMarcas + 'updateMarca/' + idCliente, DataList, this.options);
    return response;
  }
  /* buscarTarifa(impuesto, regimen) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaByIdImpIdReg/' + impuesto + '/' + regimen,
    this.options).pipe(map(res => res.json()));
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


}
