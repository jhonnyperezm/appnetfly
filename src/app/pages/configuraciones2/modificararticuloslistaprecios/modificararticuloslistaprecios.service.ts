import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificararticuloslistapreciosService {

  private baseUrlArtListaPrecios = 'articulosListaPrecios/';
  private baseUrlClases = 'clases/';
  private baseUrlImportarListasPrecios = 'importarListasPrecios/';

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

  getListasPrecios() {
    const response = this.http.get(this.path + this.baseUrlArtListaPrecios + 'findListasPrecios', this.options).pipe(map(res => res.json()));
    return response;
  }
  getClasesVenta() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findClasesVenta', this.options).pipe(map(res => res.json()));
    return response;
  }
  postCambioPrecios(DataList) {
    const response = this.http.post(this.path + this.baseUrlImportarListasPrecios + 'cambioPreciosVenta', DataList, this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  updateListaPrecios(DataList, idLista) {
    const response = this.http.put(this.path + this.baseUrlArtListaPrecios + 'updateArticulosListaPreciosIdLista/' + idLista,
    DataList, this.options);
    return response;
  }
}
