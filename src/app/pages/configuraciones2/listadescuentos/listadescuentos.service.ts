import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RutasService } from '../../../services/rutas.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListadescuentosService {

  private baseUrlFindDescuentos = 'descuentos/';
  private baseUrlDescuentos = 'descuentos/';

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

  findDescuentos(){
    const response = this.http.get(this.path + this.baseUrlFindDescuentos + 'findDescuentosActInact/true', this.options).pipe(map(res => res.json()));
    return response;
  }

  createDescuentos(DataList) {
    const response = this.http.post(this.path + this.baseUrlDescuentos + 'createDescuentos', DataList, this.options);
    return response;
  }

  updateDescuentos(DataList) {
    const response = this.http.put(this.path + this.baseUrlDescuentos + 'updateDescuentos', DataList, this.options);
    return response;
  }

  putActivarDescativarDescuentos(id) {
    const response = this.http.put(this.path + this.baseUrlDescuentos + 'activarInactivarDecuento/' + id + '/false',null , this.options);
    return response;
  }

}
