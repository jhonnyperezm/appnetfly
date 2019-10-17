import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsignarproductosService {

  private baseUrlClientePunto = 'clientePunto/';
  private baseUrlClases = 'clases/';
  private baseUrlGrupos = 'grupoVentaInv/';
  private baseUrlPuntoArticulos = 'puntoArticulos/';
  private baseUrlArticulos = 'articulos/';
  private baseUrlArticulosGrupos = 'articulosGrupos/';

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
      // this.token = localStorage.getItem('token');
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getPuntos() {
    const response = this.http.get(this.path + this.baseUrlClientePunto + 'findClientePuntoByIdCliente/true',
    this.options).pipe(map(res => res.json()));
    return response;
  }
  getClases() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClases/true', this.options).pipe(map(res => res.json()));
    return response;
  }
  getGrupoPorListaClase(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGrupos + 'findGrupoByListaIdClase', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  postAsignarProductos(DataList, accion, punto_op, punto_cop, art) {
    const response = this.http.post(this.path + this.baseUrlPuntoArticulos + 'asignarProductos/'
    + accion + '/' + punto_op + '/' + punto_cop + '/' + art, DataList, this.options);
    return response;
  }
 /*  getArticulosByClase(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticulos + 'findArticulosByListaIdClase',
    DataList, this.options).pipe(map(res => res.json()));
    return response;
  } */
  getArticulosByGrupo(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticulos + 'findArticulosByListaIdGrupos',
    DataList, this.options).pipe(map(res => res.json()));
    return response;
  }
  updateGrupoArticulos(DataList) {
    const response = this.http.put(this.path + this.baseUrlArticulosGrupos + 'updateArticuloGrupoLista',
    DataList, this.options);
    return response;
  }
}
