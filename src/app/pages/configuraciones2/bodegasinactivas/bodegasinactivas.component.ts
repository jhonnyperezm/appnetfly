import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {BodegasinactivasService} from './bodegasinactivas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-bodegasinactivas',
  templateUrl: './bodegasinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [BodegasinactivasService, SidebarComponent]
})
export class BodegasinactivasComponent implements OnInit {

  DataArray: any = [];
  DataJson: any = [];
  p:number=1;
  DataArrayPunto: any = [];
  DataJsonPunto: any = [];

  DataNew: any = [];
  DataModificar: any = [];
  DataClientes: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  searchString: any;
  itempage = 5;
  idActivar: any;
  nombreActivar: any;
  checkedAll: boolean;
  DataPuntosSeleccionados: any = [];
  noHayRegistros = false;

  constructor(public router: Router,
              public bodegasinactivasService: BodegasinactivasService,
              public sidebarComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadPuntoBodegas();
  }

  LoadPuntoBodegas() {
    this.bodegasinactivasService.getPuntoBodegas().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            if (key.bodega_interna === false) {
              this.DataJson.push(
                {
                  'id_punto': key.id_punto,
                  'id_bodega': key.id_bodega,
                  'nombre_bodega': key.nombre,
                  'nombre_punto': key.nombre_punto,
                  'bodega_interna': key.bodega_interna,
                  'creado_por': key.creado_por,
                  'fecha_creacion': key.fecha_creacion,
                  'modificado_por': key.modificado_por,
                  'fecha_modificacion': key.fecha_modificacion,
                  'estado': key.estado
                }
              );
            }
          }
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = false;
        } else {
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = true;
        }
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
    this.bodegasinactivasService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Sitio de Almacenaje Activada',
      text: 'Proceso realizado de manera Exitosa, el Sitio de Almacenaje' + nombre + 'fue Activada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataJson[i].id_bodega, 0)) {

        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);

      }
    }
  }
}
