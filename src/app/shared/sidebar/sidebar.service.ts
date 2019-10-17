import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Http,Headers, RequestOptions} from '@angular/http';
import {RutasService} from '../../services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private baseUrlPermisosRol = 'permisosRol/';
  private baseUrlClienteAplicaciones = 'clienteAplicaciones/';

  path: any;
  headers: any;
  options: any;
  token: any;

  constructor(public http: Http, public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    this.token = localStorage.getItem('token');
    console.log('token', this.token);
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'token': this.token
    });
    console.log('header', this.headers);
    this.options = new RequestOptions({headers: this.headers});
  }

  getPermisos(idRol) {
    console.log('service get');
    const response = this.http.get(this.path + this.baseUrlPermisosRol + 'findPermisosRolById/' + idRol,
      this.options).pipe(map(res => res.json()));
    return response;
  }

  getClienteAplicaciones(idCliente) {
    const response = this.http.get(this.path + this.baseUrlClienteAplicaciones + 'findClienteAplicaciones/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

}
