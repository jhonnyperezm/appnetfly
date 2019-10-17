import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ModificargruposeleccionService {

  private baseUrlGrupoSeleccion = 'grupoSeleccion/';
  private baseUrlArticulosGrupoSeleccion = 'articulosGrupoSeleccion/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlTablaConversion = 'TablaConversion/';

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
  getGrupo(idGrupo) {
    const response = this.http.get(this.path + this.baseUrlGrupoSeleccion + 'findGruposSeleccionById/' + idGrupo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getArticulosGrupo(idGrupo) {
    const response = this.http.get(this.path + this.baseUrlArticulosGrupoSeleccion + 'findArticulosGrupoSeleccionByIdGrupo/' + idGrupo,
    this.options).pipe(map(res => res.json()));
    return response;
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
  updateGrupoSeleccion(DataJson) {
    const response = this.http.put(this.path + this.baseUrlGrupoSeleccion + 'updateGrupoSeleccion', DataJson, this.options);
    return response;
  }
  updateGrupoArticulo(DataList, idGrupo) {
    const response = this.http.put(this.path + this.baseUrlArticulosGrupoSeleccion + 'updateArticulosGrupoSeleccion/' + idGrupo,
    DataList, this.options);
    return response;
  }
}
