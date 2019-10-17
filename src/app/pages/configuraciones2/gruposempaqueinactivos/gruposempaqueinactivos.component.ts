import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GruposempaqueinactivosService} from './gruposempaqueinactivos.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gruposempaqueinactivos',
  templateUrl: './gruposempaqueinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposempaqueinactivosService, SidebarComponent]
})
export class GruposempaqueinactivosComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  searchStringGrupo: any;
  itempageGrupo = 5;
  idActivar: any;
  nombreActivar: any;
  noHayRegistros = false;

  @ViewChild('grupoSelForm', {static: true})
  private grupoSelForm: NgForm;

  @ViewChild('grupoSelEditForm', {static: true})
  private grupoSelEditForm: NgForm;

  constructor(public gruposempaqueinactivosService: GruposempaqueinactivosService,
              public sidebarComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadGruposEmpaqueInactivos();
  }

  LoadGruposEmpaqueInactivos() {
    this.gruposempaqueinactivosService.getGruposEmpaqueInactivos().subscribe(
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
    this.gruposempaqueinactivosService.putActivar(id).subscribe();
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
