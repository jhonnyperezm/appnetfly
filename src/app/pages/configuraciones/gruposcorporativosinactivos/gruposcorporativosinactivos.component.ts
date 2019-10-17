import { Component, OnInit } from '@angular/core';
import { GruposcorporativosinactivosService } from './gruposcorporativosinactivos.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gruposcorporativosinactivos',
  templateUrl: './gruposcorporativosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposcorporativosinactivosService, SidebarComponent]
})
export class GruposcorporativosinactivosComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  DataRolNew: any = [];
  DataRol: any = [];
  DataJsonRol: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  searchString: any;
  itempage = 5;
  idActivar: any;
  nombreActivar: any;

  constructor(public gruposcorporativosinactivosService: GruposcorporativosinactivosService,
    public SidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadGruposInactivos();
  }

  LoadGruposInactivos() {
    this.gruposcorporativosinactivosService.getGruposInactivos().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        for (const key of this.DataArray) {
          this.DataJson.push(
            {
              'id': key.id,
              'nombre': key.nombre,
              'creadoPor': key.creadoPor,
              'modificadoPor': key.modificadoPor,
              'fechaCreacion': key.fecha_creacion
            }
          );
        }
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

  bindingDataActivar(id, grupo) {
    this.idActivar = id;
    this.nombreActivar = grupo;
  }

  Activar(id, nombre) {
    this.gruposcorporativosinactivosService.putActivarGrupo(id).subscribe(data => {
      if (data.text() !== '0') {
        Swal.fire({
          title: 'Grupo corporativo activado',
          text: 'Proceso realizado de manera Exitosa, el Grupo corporativo ' + nombre + 'fue activado',
          type: 'success',
        });
        for (let i = 0; i < this.DataJson.length; i++) {

          let index;
          if (id === this.DataJson[i].id) {

            index = this.DataJson.indexOf(this.DataJson[i]);
            this.DataJson.splice(index, 1);

          }
        }
      } else {
        Swal.fire({
          title: 'Grupo corporativo ',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }


}
