import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruposempaqueService {

  private baseUrlGruposEmpaque = 'gruposEmpaque/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlGruposEmpaqueArticulos = 'gruposEmpaqueArticulos/';

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
  getGruposEmpaque() {
    const response = this.http.get(this.path + this.baseUrlGruposEmpaque + 'findGruposEmpaque/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  putInactivar(id) {
    const response = this.http.put(this.path + this.baseUrlGruposEmpaque + 'activarInactivarGrupoEmpaque/' + id + '/false',
    null, this.options);
    return response;
  }
  getArticulosEmpaque() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosEmpaque', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postEmpaque(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGruposEmpaque + 'createGruposEmpaque', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postArticulosEmpaque(DataList) {
    const response = this.http.post(this.path + this.baseUrlGruposEmpaqueArticulos + 'createGruposEmpaqueArticulos',
    DataList, this.options);
    return response;
  }
  getArticulosGrupo(idGrupo) {
    const response = this.http.get(this.path + this.baseUrlGruposEmpaqueArticulos + 'findGrupoEmpaqueArticuloById/' + idGrupo, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateEmpaque(DataJson) {
    const response = this.http.put(this.path + this.baseUrlGruposEmpaque + 'updateGruposEmpaque', DataJson, this.options);
    return response;
  }
  updateArticulosEmpaque(DataList, idGrupo) {
    const response = this.http.put(this.path + this.baseUrlGruposEmpaqueArticulos + 'updateGruposEmpaqueArticulos/' + idGrupo, DataList,
    this.options);
    return response;
  }
  importarGrupoEmpaque(grupoImportar, idGrupo) {
    const response = this.http.get(this.path + this.baseUrlGruposEmpaqueArticulos + 'importarGrupoEmpaqueArticulo/' + idGrupo
    + '/' + grupoImportar, this.options);
    return response;
  }
}
