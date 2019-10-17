import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecetasactivasService {

  private baseUrlArticuloReceta = 'articuloreceta/';
  private baseUrlArticulos = 'articulos/';

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

  getDatosArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosById/' + idArticulo,
    this.options).pipe(map(res => res.json()));
    return response;
  }
  geRecetasArticulo(idArticulo) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'findArticulorecetaByIdArt/' + idArticulo + '/true',
    this.options).pipe(map(res => res.json()));
    return response;
  }
  putInactivar(idReceta) {
    const response = this.http.put(this.path + this.baseUrlArticuloReceta + 'activarInactivarArticulosReceta/' + idReceta + '/false',
    null, this.options);
    return response;
  }
  getArticulosReceta() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findArticulosReceta', this.options).pipe(map(res => res.json()));
    return response;
  }
  importarReceta(idArticuloCopiar, idArticuloNuevo) {
    const response = this.http.get(this.path + this.baseUrlArticuloReceta + 'importarArticuloreceta/' + idArticuloCopiar + '/'
    + idArticuloNuevo, this.options);
    return response;
  }
  deleteReceta(idReceta) {
    const response = this.http.delete(this.path + this.baseUrlArticuloReceta + 'deleteArticuloreceta/' + idReceta, this.options);
    return response;
  }
}
