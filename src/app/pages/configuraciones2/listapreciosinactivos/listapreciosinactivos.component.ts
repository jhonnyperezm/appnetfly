import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ListapreciosinactivosService} from './listapreciosinactivos.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listapreciosinactivos',
  templateUrl: './listapreciosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ListapreciosinactivosService, SidebarComponent]
})
export class ListapreciosinactivosComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  searchStringLista: any;
  itempageLista = 5;
  idActivar: any;
  nombreActivar: any;
  noHayRegistros = false;

  constructor(public listapreciosinactivosService: ListapreciosinactivosService,
              public sidebarComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadListapreciosInactivas();
  }

  LoadListapreciosInactivas() {
    this.listapreciosinactivosService.getListaprecios().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            this.DataJson.push(
              {
                'id': key.id,
                'nombre': key.nombre
              }
            );
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
    this.listapreciosinactivosService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Lista Activada',
      text: 'Proceso realizado de manera Exitosa, la lista de precios ' + nombre + 'fue Activada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (id === this.DataJson[i].id) {
        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);
      }
    }
  }
}
