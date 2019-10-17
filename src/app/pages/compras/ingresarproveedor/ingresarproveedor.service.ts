import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class IngresarproveedorService {

  private baseUrlPaises = 'pais/';
  private baseUrlDepartamentos = 'departamento/findDepartamentos/';
  private baseUrlMunicipios = 'municipio/findMunicipios/';
  private articulos = 'articulos/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlImpuesto = 'impuesto/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArtUnidad = 'articulocomprasUnidadcompra/';
  private baseUrlProveedor = 'proveedor/';
  private baseUrlContacto = 'contacto/';
  private baseUrlProveedorArticulos = 'proveedorArticulos/';

/*   private articulosproveedor = 'articuloProveedor/';
  private Impuestos = 'impuestoCompras/activos/42'; */

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;
  constructor(public http: Http, public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    console.log(this.path);
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
  getArticulosCompras() {
    const response = this.http.get(this.path + this.articulos + 'findArticulosCompras', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getallArticulos() {
    const response = this.http.get(this.path + this.articulos + 'findArticulos/true', this.options).pipe(map(res => res.json()));
    return response;
  } */
  getImpuestosRegimen() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimenByTipoModulo/2/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticuloInventario(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArtInventario + 'findArticulosInventarioById/' + idArticulo,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getUnidadCompra(idArt) {
    const response = this.http.get(this.path + this.baseUrlArtUnidad + 'findArticuloCompraUnidadCompra/' + idArt,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  /* getUnidadCompra(idArtInv) {
    const response = this.http.get(this.path + this.baseUrlArtInvUnidad + 'findArticuloinventarioUnidadcompra/' + idArtInv,
    this.options).pipe(map(res => res.json()));
    return response;
  } */
  postProveedor(data) {
    const response = this.http.post(this.path + this.baseUrlProveedor + 'createProveedor', data, this.options);
    console.log(response);
    return response;
  }
  postContactoProveedor(DataList) {
    const response = this.http.post(this.path + this.baseUrlContacto + 'createContacto', DataList, this.options);
    return response;
  }
  postArticuloProveedor(DataList) {
    const response = this.http.post(this.path + this.baseUrlProveedorArticulos + 'createProveedorArticulos', DataList, this.options);
    return response;
  }
  /* getUnidadCompra(id_articulo) {
    const response = this.http.get(this.path + 'articulo/' + id_articulo + '/inventario/unidadesCompra', this.options)
    .pipe(map(res => res.json()));
    return response;
  } */
}
