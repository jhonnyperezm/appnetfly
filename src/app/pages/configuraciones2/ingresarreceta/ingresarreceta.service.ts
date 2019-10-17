import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresarrecetaService {

  private baseUrlCliente = 'cliente/';
  private baseUrlClienteCanal = 'clienteCanal/';
  private baseUrlArticuloInventario = 'articuloinventario/';
  private baseUrlUnidades = 'unidad/';
  private baseUrlArticuloReceta = 'articuloreceta/';
  private baseUrlArticuloRecetaCanal = 'articulorecetaCanal/';
  private baseUrlArticuloRecetaIngredientes = 'articulorecetaIngredientes/';
  private baseUrlHistricoIngredientes = 'historicoIngredientes/';
  private baseUrlArticulo = 'articulos/';
  private baseUrlTablaConversion = 'TablaConversion/';


  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;
  idCliente: any;

  constructor(
    public http: Http,
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
      token: this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getDatosArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticulo + 'findArticulosById/' + idArticulo, this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getCanalesCliente() {
    const response = this.http.get(this.path + this.baseUrlClienteCanal + 'findClienteCanalByIdLogeado', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getArticulosInventario() {
    const response = this.http.get(this.path + this.baseUrlArticuloInventario + 'findArticulosInventario/true', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getUnidades() {
    const response = this.http.get(this.path + this.baseUrlUnidades + 'findUnidadKardex', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getUnidadesVenta() {
    const response = this.http.get(this.path + this.baseUrlUnidades + 'findUnidadVenta', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getUnidadKardex() {
    const response = this.http.get(this.path + this.baseUrlUnidades + 'findUnidadKardex', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getUnidadesIngredientes() {
    const response = this.http.get(this.path + this.baseUrlUnidades + 'findUnidadKardex', this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getTablaConversion(unidadKardex, unidadVenta) {
    const response = this.http.get(this.path + this.baseUrlTablaConversion + 'findConversionByIdKardexIdCompra/'
      + unidadKardex + '/' + unidadVenta, this.options).pipe(map(res => res.json()));
    return response;
  }
  createTablaConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlTablaConversion + 'createConversion', DataList, this.options);
    return response;
  }
  createArticuloReceta(DataJson) {
    const response = this.http.post(this.path + this.baseUrlArticuloReceta + 'createArticuloreceta', DataJson, this.options);
    return response;
  }
  createArticuloRecetaCanal(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloRecetaCanal + 'createArticulorecetaCanal', DataList, this.options);
    return response;
  }
  createArticuloRecetaIngredientes(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticuloRecetaIngredientes +
      'createArticulorecetaIngredientes', DataList, this.options);
    return response;
  }
  createHistoricoIngredientes(DataList) {
    const response = this.http.post(this.path + this.baseUrlHistricoIngredientes +
      'createHistoricoIngredientes', DataList, this.options);
    return response;
  }
}
