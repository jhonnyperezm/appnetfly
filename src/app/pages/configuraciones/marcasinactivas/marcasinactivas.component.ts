import { Component, OnInit } from '@angular/core';
import { MarcasinactivasService } from './marcasinactivas.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-marcasinactivas',
  templateUrl: './marcasinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [MarcasinactivasService, SidebarComponent]
})
export class MarcasinactivasComponent implements OnInit {

  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  searchString: any;
  itempage = 5;
  idActivar: any;
  nombreActivar: any;
  noHayRegistros = false;

  constructor(public marcasinactivosService: MarcasinactivasService,
    public SidebarComponent: SidebarComponent, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadMarcasInactivas();
  }

  LoadMarcasInactivas() {
    this.marcasinactivosService.getMarcas().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
        for (const key of this.DataArray) {
          this.DataJson.push(
            {
              'id': key.id,
              'nombre_marca': key.nombre_marca,
              'id_cliente': key.id_cliente,
              'nombre_cliente': key.nombre_cliente,
              'creado_por': key.creado_por,
              'fecha_creacion': key.fecha_creacion
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
    this.marcasinactivosService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Marca Activada',
      text: 'Proceso realizado de manera Exitosa, la Marca ' + nombre + 'fue Activada',
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
