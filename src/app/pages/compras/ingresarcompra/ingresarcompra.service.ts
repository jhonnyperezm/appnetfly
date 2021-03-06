import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http ,RequestOptions, Headers } from '@angular/http';
import {RutasService} from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class IngresarcompraService {

  private baseUrlProveedores = 'proveedor/';
  private baseUrlProveedoresArticulos = 'proveedorArticulos/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlArtUnidad = 'articulocomprasUnidadcompra/';
  private baseUrlmovimientoArticulos = 'movimientoArticulos/';
  private baseUrlArtInvBodega = 'articuloinventarioBodega/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa = 'impuestoTarifa/';
  private baseUrlmovimientoCompras = 'movimientoCompras/';
  private baseUrlCliente = 'cliente/';

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

  getProveedores() {
    const response = this.http.get(this.path + this.baseUrlProveedores + 'findProveedor/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getConsecutivo() {
    const response = this.http.get(this.path + this.baseUrlmovimientoCompras + 'countComprasByIdCliente', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getConsecutivoDevolucion() {
    const response = this.http.get(this.path + this.baseUrlmovimientoCompras + 'countDevolucionByIdCliente', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getNumeroFactura(numFact, idproveedor) {
    const response = this.http.get(this.path + this.baseUrlmovimientoCompras + 'validarFactura/' +
     numFact + '/' + idproveedor, this.options).pipe(map(res => res));
    return response;
  }
  getPendientes(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlmovimientoArticulos + 'findPendientes/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getDevoluciones(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlmovimientoArticulos + 'findDevoluciones/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
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
    const response = this.http.get(this.path + this.baseUrlmovimientoArticulos + 'findValorUltimaCompra/' + idArticulo,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getUltimasComprasPorArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlmovimientoArticulos + 'findUltimasComprasByArticulo/' + idArticulo,
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
  /* getBodegasArticulo(idArtInv) {
    const response = this.http.get(this.path + this.baseUrlArtInvBodega + 'findArticuloinventarioBodega/' + idArtInv,
    this.options).pipe(map(res => res.json()));
    return response;
  } */
  getImpuestoTarifa(idImp, idReg) {
    const response = this.http.get(this.path + this.baseUrlImpuestoTarifa + 'findImpuestoTarifaById/' + idImp + '/' + idReg, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  actualizarPendientes(DataJson) {
    const response = this.http.put(this.path + this.baseUrlmovimientoArticulos + 'updateEstadoCompras', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  actualizarDevoluciones(DataJson) {
    const response = this.http.put(this.path + this.baseUrlmovimientoArticulos + 'updateEstadoCompras', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postCompra(DataJson) {
    const response = this.http.post(this.path + this.baseUrlmovimientoCompras + 'createCompra', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postArticulos(DataList) {
    const response = this.http.post(this.path + this.baseUrlmovimientoArticulos + 'createArticulosCompra', DataList, this.options);
    return response;
  }
}

