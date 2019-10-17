import {Component, OnInit} from '@angular/core';
import {GruposformaspagoinactivasService} from './gruposformaspagoinactivas.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-gruposformaspagoinactivas',
  templateUrl: './gruposformaspagoinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposformaspagoinactivasService, SidebarComponent]
})
export class GruposformaspagoinactivasComponent implements OnInit {
  p:number=1;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;

  DataJson: any = [];
  idActivar: any;
  nombreActivar: any;
  searchString: any;
  itempage = 5;

  constructor(public router: Router,
              public sidebarComponent: SidebarComponent,
              public gruposformaspagoinactivasService: GruposformaspagoinactivasService, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadGruposFormasPago();
  }


  LoadGruposFormasPago() {
    this.gruposformaspagoinactivasService.getGruposFormasPago().subscribe(
      data => {
        this.DataJson = data;
        this.loader = false;
        this.LoadTabla = true;
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  bindingDataActivar(id, nombre) {
    this.idActivar = id;
    this.nombreActivar = nombre;
  }

  Activar(id, nombre) {
    this.gruposformaspagoinactivasService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Grupo Activado',
      text: 'Proceso realizado de manera Exitosa, el grupo forma de pago ' + nombre + 'fue activado',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataJson[i].id, 0)) {

        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);

      }
    }
  }
}
