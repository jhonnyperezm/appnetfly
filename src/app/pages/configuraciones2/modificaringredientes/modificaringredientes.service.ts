import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificaringredientesService {

  private baseUrlArticuloInventario = 'articuloinventario/';
  private baseUrlArticuloRecetaIngredientes = 'articulorecetaIngredientes/';
  private baseUrlUnidades = 'unidad/';
  private baseUrlTablaConversion = 'TablaConversion/';
  private baseUrlHistoricoIngredientes = 'historicoIngredientes/';

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

  getArticulosInventario() {
    const response = this.http.get(this.path + this.baseUrlArticuloInventario + 'findArticulosInventario/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getRecetasIngrediente(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloRecetaIngredientes +
      'findArticulorecetaIngredientesByIdArticulo/' + idArticulo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  deleteIngredienteReceta(idArticulo) {
    const response = this.http.delete(this.path + this.baseUrlArticuloRecetaIngredientes +
      'deleteArticulorecetaIngredientesByIdArticulo/' + idArticulo, this.options);
    return response;
  }
  getUnidadEquivalencia(unidadKardex) {
    const response = this.http.get(this.path + this.baseUrlUnidades + 'findUnidadKardexEquivalencias/' + unidadKardex, this.options)
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
  updateArticulosIngredientes(DataList) {
    const response = this.http.put(this.path + this.baseUrlArticuloRecetaIngredientes +
      'updateArticulorecetaIngredientesByNewArticulo', DataList, this.options);
    return response;
  }
  postHistoricoIngredientes(DataList) {
    const response = this.http.post(this.path + this.baseUrlHistoricoIngredientes +
      'createHistoricoIngredientes', DataList, this.options);
    return response;
  }
}
