import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcesosespService {

  private baseUrlCliente = 'cliente/';
  private baseUrlClases = 'clases/';
  private baseUrlUnidades = 'unidad/';
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
      // this.token = localStorage.getItem('token');
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
    }
  getDatosCliente() {
    const response = this.http.get(this.path + this.baseUrlCliente + 'findDatosClientes', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  getClasesArticulo() {
    const response = this.http.get(this.path + this.baseUrlClases + 'findAllClases', this.options).pipe(map(res => res.json()));
    return response;
  }
  getUnidadesVenta() {
    const response = this.http.get(this.path + this.baseUrlUnidades + 'findUnidadVenta', this.options).pipe(map(res => res.json()));
    return response;
  }
  getUltimoCodigoPlu() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findUltimoCodPlu', this.options);
    return response;
  }
  subirArticulos(DataJson, manejaCodPlu) {
    const response = this.http.post(this.path + this.baseUrlArticulos + 'importarArticulos/' + manejaCodPlu, DataJson, this.options);
    return response;
  }
  validarArticulos() {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findValidarArticulos', this.options).pipe(map(res => res.json()));
    return response;
  }
  validarArticuloCaracteristica(idArticulo, caracteristica) {
    const response = this.http.get(this.path + this.baseUrlArticulos + 'findValidarMensajeArticulos/'
    + idArticulo + '/' + caracteristica, this.options);
    return response;
  }
}
