import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosinactivosService {

  private baseUrlImpuestos = 'impuesto/';
  private baseUrlImpuestoRegimen = 'impuestoRegimen/';

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

  getImpuestos() {
    const response = this.http.get(this.path + this.baseUrlImpuestos + 'findImpuestos/42/false', this.options).pipe(map(res => res.json()));
    return response;
  }
  getImpuestosRegimen() {
    const response = this.http.get(this.path + this.baseUrlImpuestoRegimen + 'findImpuestoRegimen/false', this.options)
    .pipe(map(res => res.json()));
    return response;
  }
  putActivar(id) {
    const response = this.http.put(this.path + this.baseUrlImpuestoRegimen + 'activarInactivarImpuestoRegimen/'
    + id + '/true', null, this.options);
    return response;
  }
}
