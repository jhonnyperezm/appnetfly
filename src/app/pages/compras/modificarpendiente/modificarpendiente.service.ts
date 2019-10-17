import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificarpendienteService {
  private baseUrlMovimientoCompras = 'movimientoCompras/';
  private baseUrlMovimientoArticulos = 'movimientoArticulos/';
  private baseUrlProveedores = 'proveedor/';
  private baseUrlArtInventario = 'articuloinventario/';
  private baseUrlArtInvUnidad = 'ArticuloinventarioUnidadcompra/';
  private baseUrlImpuestos = 'impuestoRegimen/';
  private baseUrlImpuestoTarifa  = 'impuestoTarifa/';
  private baseUrlCliente = 'cliente/';

  path: any;
  token: any;
  headers: any;
  options: any;
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
    this.options = new RequestOptions({ headers: this.headers });
  }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options).pipe(map(res => res.json()));
    return response;
  }
  getPendiente(idMovCompra) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'findMovimientoComprasByIdTabla/' + idMovCompra,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getDataProveedor(idProveedor) {
    const response = this.http.get(this.path + this.baseUrlProveedores + 'findProveedorById/' + idProveedor, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulos(idMovCompras) {
    const response = this.http.get(this.path + this.baseUrlMovimientoArticulos + 'findArticulosComprasByIdMovCompra/' + idMovCompras,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getConsecutivo() {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'countComprasByIdCliente', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getNumeroFactura(numFact, idproveedor) {
    const response = this.http.get(this.path + this.baseUrlMovimientoCompras + 'validarFactura/' +
     numFact + '/' + idproveedor, this.options);
    return response;
  }
  actualizarPendientes(DataJson) {
    const response = this.http.put(this.path + this.baseUrlMovimientoArticulos + 'updateEstadoCompras', DataJson, this.options);
    return response;
  }
  postCompra(DataJson) {
    const response = this.http.post(this.path + this.baseUrlMovimientoCompras + 'createCompra', DataJson, this.options)
    .pipe(map(res => res));
    return response;
  }
  postArticulos(DataList) {
    const response = this.http.post(this.path + this.baseUrlMovimientoArticulos + 'createArticulosCompra', DataList, this.options);
    return response;
  }
}
