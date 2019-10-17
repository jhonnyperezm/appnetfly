import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import {RutasService} from '../../services/rutas.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrlUsuarioClientes = 'usuariosCliente/';
  private baseUrlUsuarios = 'usuarios/';

  path: any;
  token: any;
  headers: any;
  options: any;

  constructor(public http: Http, public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    this.token = localStorage.getItem('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getClientesUsuario(idUsuario) {
    const response = this.http.get(this.path + this.baseUrlUsuarioClientes + 'findUsuariosClienteByIdUsuario/' + idUsuario, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  getUsuarioCliente(idCliente) {
    const response = this.http.get(this.path + this.baseUrlUsuarios + 'findUsersByIdCliente/true/' + idCliente, this.options)
      .pipe(map(res => res.json()));
    return response;
  }

  updateClavesesion(idUser, idClaveAnt, idClave) {
    const response = this.http.put(this.path + this.baseUrlUsuarios + 'updateClaveSesion/' + idUser + '/' + idClaveAnt +  '/' + idClave, this.options);
    return response;
  }

  postLogin(user, pass, ip) {
    /**
     * Se agrega en cabezados para el consumo del servicio
     */
    let headers = new Headers({ 'Content-Type': 'application/json' });
    /**
     * Se agrega las opciones para el consumo del servicio
     */
    let options = new RequestOptions({ headers: headers });
    /**
     * variable con parametro especifico en el consumo del servicio de logueo
     */

    const response = this.http.post(this.path + 'usuarios/auth/' + user + '/' + pass + '/' + ip, options);
    // const response = this.http.post('http://localhost:8080/backgama/ptigGama/usuarios/auth/' + user + '/' + pass, options);
    return response;

  }
  decodeToken(token) {
    /**
     * Se agrega en cabezados para el consumo del servicio
     */
    let headers = new Headers({ 'Content-Type': 'application/json' });
    /**
     * Se agrega las opciones para el consumo del servicio
     */
    let options = new RequestOptions({ headers: headers });
    /**
     * variable con parametro especifico en el consumo del servicio de logueo
     */

    const response = this.http.get(this.path + 'usuarios/decodeToken/' +
      token, options).pipe(map(res => res.json()));
    // const response = this.http.get('http://localhost:8080/backgama/ptigGama/usuarios/decodeToken/' + token, options)
    // .map(res => res.json());
    return response;

  }
}
