import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresargruposseleccionService {

  private baseUrlGrupoSeleccion = 'grupoSeleccion/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlTablaConversion = 'TablaConversion/';
  private baseUrlArticulosGrupo = 'articulosGrupoSeleccion/';

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
  getArticulosSeleccion() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosSeleccion', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  createTablaConversion(DataList) {
    const response = this.http.post(this.path + this.baseUrlTablaConversion + 'createConversion', DataList, this.options);
    return response;
  }
  postGrupoSeleccion(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGrupoSeleccion + 'createGruposSeleccion', DataJson, this.options);
    return response;
  }
  createGrupoArticulo(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticulosGrupo + 'createArticulosGrupoSeleccion', DataList, this.options);
    return response;
  }
}
