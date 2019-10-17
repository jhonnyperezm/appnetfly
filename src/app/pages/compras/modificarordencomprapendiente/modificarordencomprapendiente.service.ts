import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators'
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarordencomprapendienteService {

  private baseUrlMovimientoCompras = 'movimientoCompras/';
  private baseUrlMovimientoArticulos = 'movimientoArticulos/';
  private baseUrlProveedores = 'proveedor/';
  private baseUrlImpuestos = 'impuestoRegimen/';
  private baseUrlProveedoresArticulos = 'proveedorArticulos/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArtUnidad = 'articulocomprasUnidadcompra/';
  private baseUrlImpuestoTarifa  = 'impuestoTarifa/';
  private baseUrlCliente = 'cliente/';

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(
    public http: Http, public rutasService: RutasService) {
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
  getConsecutivo() {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'countComprasByIdCliente', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getConsecutivoPendiente() {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'countPendienteByIdCliente', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getConsecutivoDevolucion() {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'countDevolucionByIdCliente', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getOrdenComprasPendientes(idMovCompra) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'findOrdenByIdOrden/' + idMovCompra, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getDataProveedor(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedores + 'findProveedorById/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getPendientes(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findPendientes/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDevoluciones(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findDevoluciones/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDataArticulos(idCompra) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findArticulosComprasByIdMovCompra/' +
    idCompra, this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestos() {
    const response = this.http.get(this.path + this.baseUrlImpuestos + 'findImpuestoRegimenByTipoModulo/2/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getUltimosArticulosProveedor(idproveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'findUltimasCompras/' + idproveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulosInventario() {
    const response = this.http.get(this.path + this.baseUrlArtInventario + 'findArticulosInventario/true', this.options)
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
  getUnidadCompra(idArt) {
    const response = this.http.get(this.path + this.baseUrlArtUnidad + 'findArticuloCompraUnidadCompra/' + idArt,
    this.options).pipe(map(res => res.json()));
    return response;
  }
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
  getNumeroFactura(numFact, idproveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'validarFactura/' +
     numFact + '/' + idproveedor, this.options).pipe(map(res => res));
    return response;
  }
  cerrarOrden(idMovOrden) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'updateEstadoCierreOrden/' + idMovOrden + '/true',
    null, this.options);
    return response;
  }
  actualizarPendientes(DataJson) {
    const response = this.http.put(this.path + this.baseUrlMovimientoArticulos + 'updateEstadoCompras', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  actualizarDevoluciones(DataJson) {
    const response = this.http.put(this.path + this.baseUrlMovimientoArticulos + 'updateEstadoCompras', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postCompra(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'createCompra', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postArticulos(DataList) {
    const response = this.http.post(this.path + this.baseUrlMovimientoArticulos + 'createArticulosCompra', DataList, this.options);
    return response;
  }
  /* postPendiente(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'createPendiente', DataJson, this.options)
    .map(res => res.json());
    return response;
  } */
}
