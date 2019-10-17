import { Component, OnInit } from '@angular/core';
import { RolesinactivosService } from './rolesinactivos.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rolesinactivos',
  templateUrl: './rolesinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [RolesinactivosService, SidebarComponent]
})
export class RolesinactivosComponent implements OnInit {
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
  noHayRegistros = false;
  error: any;
  searchString: any;
  itempage = 5;
  idRol: any;
  nombreRol: any;

  constructor(public rolesinactivosService: RolesinactivosService,
    public toastr: ToastrService,
    public SidebarComponent: SidebarComponent) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadRolesInactivos();
  }

  LoadRolesInactivos() {
    this.rolesinactivosService.getRolesInactivos().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
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

  bindingDataRol(id, rol) {

    this.idRol = id;
    this.nombreRol = rol;
  }

  ActivarRol(id, nombre) {
    this.rolesinactivosService.putActivarRol(id).subscribe();
    Swal.fire({
      title: 'Rol activado',
      text: 'Proceso realizado de manera Exitosa, el Rol ' + nombre + 'fue activado',
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
