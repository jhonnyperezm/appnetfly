import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CostosestimadosService {

  private baseUrlArticulos = 'articulos/';
  private baseUrlClases = 'clases/';
  private baseUrlGrupos = 'grupoVentaInv/';

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
  getClasesCliente() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClasesInventario', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getGrupoPorClase(idClase) {
    const response = this.http.get(this.path + this.baseUrlGrupos + 'findGrupoByIdClase/' + idClase + '/true', this.options)
    .pipe(map(res => res.json()));
    return response;
  } */
  getGrupoPorListaClase(DataJson) {
    const response = this.http.post(this.path + this.baseUrlGrupos + 'findGrupoByListaIdClase', DataJson, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  /* getArticulos(idClase, idGrupo) {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArtInventario/' + idClase + '/' + idGrupo,
    this.options).pipe(map(res => res.json()));
    return response;
  } */
  getArticulos(DataList) {
    const response = this.http.post(this.path + this.baseUrlArticulos + 'findArticulosByListaIdClaseIdGrupo', DataList, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  putCostoEstimado(idArt, Costo) {
    const response = this.http.put(this.path + this.baseUrlArticulos + 'updateCostoEstimadoByIdArt/' + idArt + '/' + Costo,
    null, this.options);
    return response;
  }
  updateCostosEstimados(caracteristica, tipovalor, cantidad, redondeo, DataJson) {
    const response = this.http.put(this.path + this.baseUrlArticulos + 'updateCostoEstimado/' + caracteristica + '/'
    + tipovalor + '/' + cantidad + '/' + redondeo,
    DataJson, this.options);
    return response;
  }
}
