import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificarrecetaService {

  private baseUrlCliente = 'cliente/';
  private baseUrlClienteCanal = 'clienteCanal/';
  private baseUrlArticulorecetaCanal = 'articulorecetaCanal/';
  private baseUrlArticuloInventario = 'articuloinventario/';
  private baseUrlUnidades = 'unidad/';
  private baseUrlArticuloreceta = 'articuloreceta/';
  private baseUrlArticulorecetaIngrediente = 'articulorecetaIngredientes/';
  private baseUrlArticulo = 'articulos/';
  private baseUrlTablaConversion = 'TablaConversion/';
  private baseUrlHistoricoIngrediente = 'historicoIngredientes/';

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
  getCanalesReceta(idReceta) {
    const response = this.http.get(this.path + this.baseUrlArticulorecetaCanal + 'findArticulorecetaCanalById/' + idReceta, this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getDatosReceta(idReceta) {
    const response = this.http.get(this.path + this.baseUrlArticuloreceta + 'findArticulorecetaById/' + idReceta, this.options)
      .pipe(map(res => res.json()));
    return response;
  }
  getIngredientesReceta(idReceta) {
    const response = this.http.get(this.path + this.baseUrlArticulorecetaIngrediente + 'findArticulorecetaIngredientesById/' + idReceta,
      this.options).pipe(map(res => res.json()));
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
  /* getHistoricoIngredientes(idArticuloReceta) {
    const response = this.http.get(this.path + this.baseUrlHistoricoIngrediente + 'findHistoricoIngredientesByIdArticuloReceta/'
    + idArticuloReceta, this.options).pipe(map(res => res.json()));
    return response;
  } */
  updateArticuloReceta(DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticuloreceta + 'updateArticuloreceta',
      DataJson, this.options);
    return response;
  }
  updateArticuloRecetaCanal(DataList, idArtRec) {
    const response = this.http.put(this.path + this.baseUrlArticulorecetaCanal + 'updateArticulorecetaCanal/' + idArtRec,
      DataList, this.options);
    return response;
  }
  updateArticuloRecetaIngredientes(DataList, idArtRec) {
    const response = this.http.put(this.path + this.baseUrlArticulorecetaIngrediente + 'updateArticulorecetaIngrediente/' + idArtRec,
      DataList, this.options);
    return response;
  }
  postHistoricoIngredientes(DataList) {
    const response = this.http.post(this.path + this.baseUrlHistoricoIngrediente + 'createHistoricoIngredientes',
      DataList, this.options);
    return response;
  }
}
