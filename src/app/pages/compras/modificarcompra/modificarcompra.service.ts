import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarcompraService {

  private baseUrlmovimientoCompras = 'movimientoCompras/';
  private baseUrlProveedores = 'proveedor/';
  private baseUrlMovimientoArticulos = 'movimientoArticulos/';
  private baseUrlProveedoresArticulos = 'proveedorArticulos/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArtUnidad = 'articulocomprasUnidadcompra/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlCliente = 'cliente/';
  private baseUrlArticulos = 'articulos/';

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
  getCompras(idCompra) {
    const response = this.http.get(this.path + this.baseUrlmovimientoCompras + 'findComprasByIdCompra/' + idCompra, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getConsecutivoDevolucion() {
    const response = this.http.get(this.path + this.baseUrlmovimientoCompras + 'countDevolucionByIdCliente', this.options)
    .pipe(map(res => res.json()));
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
  getProveedores() {
    const response = this.http.get(this.path + this.baseUrlProveedores + 'findProveedor/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getUltimosArticulosProveedor(idproveedor) {
    const response = this.http.get(this.path + this.baseUrlmovimientoCompras + 'findUltimasCompras/' + idproveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulosPorProveedor(idproveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedoresArticulos + 'findArticulosProveedorByIdProveedor/' +
    idproveedor, this.options).pipe(map(res => res.json()));
    return response;
  }
  getArticulosCompras() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosCompras', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getValorUnidadUltimaCompra(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findValorUltimaCompra/' + idArticulo,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getUltimasComprasPorArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findUltimasComprasByArticulo/' + idArticulo,
    this.options).pipe(map(res => res.json()));
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
  getImpuestos() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimenByTipoModulo/2/true',
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
  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
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
  updateCompra(DataJson) {
    const response = this.http.put(this.path + this.baseUrlmovimientoCompras + 'updateComprasAndOrdenes', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postDevolucion(DataJson) {
    const response = this.http.post(this.path + this.baseUrlmovimientoCompras + 'createCompra', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateArticulos(DataList, idCompra) {
    const response = this.http.put(this.path + this.baseUrlMovimientoArticulos + 'updateArticulosCompras/' + idCompra, DataList,
    this.options);
    return response;
  }
  postArticulos(DataList) {
    const response = this.http.post(this.path + this.baseUrlMovimientoArticulos + 'createArticulosCompra', DataList, this.options);
    return response;
  }
}
