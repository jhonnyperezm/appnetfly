import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarproveedorService {

  private baseUrlProveedor = 'proveedor/';
  private baseUrlPaises = 'pais/';
  private baseUrlDepartamentos = 'departamento/findDepartamentos/';
  private baseUrlMunicipios = 'municipio/findMunicipios/';
  private baseUrlContacto = 'contacto/';
  private baseUrlProveedorArticulos = 'proveedorArticulos/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArtUnidad = 'articulocomprasUnidadcompra/';

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
  getProveedor(idProveedor) {
    console.log("IDLLEGA",idProveedor);
    const response = this.http.get(this.path + this.baseUrlProveedor + 'findProveedorById/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getContactosProveedor(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlContacto + 'findContacto/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulosProveedor(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedorArticulos + 'findArticulosProveedorByIdProveedor/' +
    idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPaises() {
    const response = this.http.get(this.path + this.baseUrlPaises + 'findPaises', this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getDepartamentos(idPais) {
    const response = this.http.get(this.path + this.baseUrlDepartamentos + idPais, this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getMunicipios(idDepartamento) {
    const response = this.http.get(this.path + this.baseUrlMunicipios + idDepartamento, this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  /* postContactoProveedor(DataList) {
    const response = this.http.post(this.path + this.baseUrlContacto + 'updateContacto', DataList, this.options);
    return response;
  } */
  putContactoProveedor(DataList) {
    const response = this.http.post(this.path + this.baseUrlContacto + 'updateContacto', DataList, this.options);
    return response;
  }
  deleteContactoProveedor(IdContacto) {
    const response = this.http.delete(this.path + this.baseUrlContacto + 'deleteContacto/' + IdContacto, this.options);
    return response;
  }
  getArticulosCompras() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosCompras', this.options)
    .pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getallArticulos() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulos/true', this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getImpuestosRegimen() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimenByTipoModulo/2/true', this.options)
    .pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getArticuloInventario(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArtInventario + 'findArticulosInventarioById/' + idArticulo,
    this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  getUnidadCompra(idArt) {
    const response = this.http.get(this.path + this.baseUrlArtUnidad + 'findArticuloCompraUnidadCompra/' + idArt,
    this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  }
  /* getUnidadCompra(idArtInv) {
    const response = this.http.get(this.path + this.baseUrlArtInvUnidad + 'findArticuloinventarioUnidadcompra/' + idArtInv,
    this.options).pipe(map(res => res.json()));(res => res.json());
    return response;
  } */
  /* postArticuloProveedor(DataList) {
    const response = this.http.post(this.path + this.baseUrlProveedorArticulos + '', DataList, this.options);
    return response;
  } */
  updateArticuloProveedor(DataList, idProveedor) {
    const response = this.http.put(this.path + this.baseUrlProveedorArticulos + 'updateProveedorArticulos/' + idProveedor, DataList,
    this.options);
    return response;
  }
  deleteArticulosProveedor(Id) {
    const response = this.http.delete(this.path + this.baseUrlProveedorArticulos + 'deleteProveedorArticulos/' + Id, this.options);
    return response;
  }
  updateProveedor(data) {
    const response = this.http.post(this.path + this.baseUrlProveedor + 'updateProveedor', data, this.options);
    console.log(response);
    return response;
  }
}
