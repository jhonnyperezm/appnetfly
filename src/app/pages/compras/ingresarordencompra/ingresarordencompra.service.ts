import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {RutasService} from '../../../services/rutas.service';


@Injectable({
  providedIn: 'root'
})
export class IngresarordencompraService {

  private baseUrlProveedores = 'proveedor/';
  private baseUrlProveedoresArticulos = 'proveedorArticulos/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArtInvUnidad = 'articulocomprasUnidadcompra/';
  private baseUrlMovimientoArticulos = 'movimientoArticulos/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlCliente = 'cliente/';
  private baseUrlMovimientoCompras = 'movimientoCompras/';
  private baseUrlImpuestos = 'impuestoRegimen/';

  token: any;
  headers: any;
  options: any;
  path: any;
  rol: any;
  idCliente: any;

  constructor(public http: Http, public rutasService: RutasService) {
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
    this.options = new RequestOptions({headers: this.headers});
  }

  getProveedores() {
    const response = this.http.get(this.path + this.baseUrlProveedores + 'findProveedor/true', this.options).pipe(map(res => res.json()));
    return response;
  }

  getNumOrden() {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'countOrdenComprasByIdCliente', this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }

  getUltimasOrdenes(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'findUltimasOrdenesByProveedor/' + idProveedor,
      this.options).pipe(map(res => res.json()));
    return response;
  }

  getVerUltimaOrden(idOrden) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findOrdenesByIdOrden/' + idOrden, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getUltimosArticulosProveedor(idproveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'findUltimasCompras/' + idproveedor, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getArticulosCompras() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosCompras', this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getArticulosNegociacion(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedoresArticulos + 'findArticulosNegociacionByIdProveedor/' + idProveedor,
      this.options).pipe(map(res => res.json()));
    return response;
  }

  getMasArticulos(idproveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedoresArticulos + 'findArticulosProveedorByIdProveedor/' +
      idproveedor, this.options).pipe(map(res => res.json()));
    return response;
  }

  getNegociacionArticulo(idArticulo, idProveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedoresArticulos + 'findArticulosProveedorByIdArtIdProveedor/' + idArticulo
      + '/' + idProveedor, this.options).pipe(map(res => res.json()));
    return response;
  }

  getArticuloInventario(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArtInventario + 'findArticulosInventarioById/' + idArticulo,
      this.options).pipe(map(res => res.json()));
    return response;
  }

  getUnidadCompra(idArtInv) {
    const response = this.http.get(this.path + this.baseUrlArtInvUnidad + 'findArticuloCompraUnidadCompra/' + idArtInv,
      this.options).pipe(map(res => res.json()));
    return response;
  }

  /* getDatosArticuloModal(idArticuloInv) {
    const response = this.http.get(this.path + this.baseDatosArticuloModalUrl + idArticuloInv, this.options).pipe(map(res => res.json()));
    return response;
  } */
  getImpuestos() {
    const response = this.http.get(this.path + this.baseUrlImpuestos + 'findImpuestoRegimenByTipoModulo/2/true', this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  /* getTarifas(id_impuesto) {
    const response = this.http.get(this.path + this.baseTarifasUrl + id_impuesto, this.options).map(
                    res => res.json());
    return response;
  } */

  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getValorUltimaCompra(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findValorUltimaCompra/' + idArticulo, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  postOrdenCompra(data, generarCompra) {
    console.log(generarCompra);
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'createOrdenCompra/' + generarCompra, data, this.options);
    return response;
  }

  postArticulosOrdenCompra(DataList) {
    const response = this.http.post(this.path + this.baseUrlMovimientoArticulos + 'createArticulosOrdenCompra', DataList, this.options);
    return response;
  }

  postGenerarPdf(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'generarPdfOrden', DataJson, this.options);
    return response;
  }

  postEmail(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'envioSolicitud', DataJson, this.options);
    return response;
  }
}
