import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GruposclasesinactivosService } from './gruposclasesinactivos.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gruposclasesinactivos',
  templateUrl: './gruposclasesinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposclasesinactivosService, SidebarComponent]
})
export class GruposclasesinactivosComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  DataClases: any = [];
  DataModificar: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  idInactivar: any;
  nombreInactivar: any;
  idClase: any;
  id: any;
  nombreClase: any;
  checkedAll: boolean;
  rol: boolean;
  idActivar: any;
  nombreActivar: any;
  paraVenta = false;
  paraInven = false;
  itemsPerPage = 5;
  searchString: any;
  itempage = 5;
  itempageTGrupos = 5;
  searchStringTGrupos: any;
  noHayRegistros = false;


  constructor(public router: Router, private route: ActivatedRoute,
    public SidebarComponent: SidebarComponent,
    public gruposclasesinactivosService: GruposclasesinactivosService, public toastr: ToastrService) {
    this.loader = true;
    this.DataArray = [];
    this.loader = true;
    this.LoadTabla = false;
    this.idClase = this.route.snapshot.params.idClase;
    this.nombreClase = this.route.snapshot.params.nombreClase;
  }

  ngOnInit() {
    this.LoadGruposClasesinactivos();
    this.rol = false;
  }

  LoadGruposClasesinactivos() {
    this.gruposclasesinactivosService.getGruposClases(this.idClase).subscribe(
      data => {
        this.DataArray = data;

        if (this.DataArray.length !== 0) {
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
    this.gruposclasesinactivosService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Grupo Activado',
      text: 'Proceso realizado de manera Exitosa',
      type: 'success',
    });

    for (let i = 0; i < this.DataArray.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataArray[i].id, 0)) {

        index = this.DataArray.indexOf(this.DataArray[i]);
        this.DataArray.splice(index, 1);

      }
    }
  }

}
