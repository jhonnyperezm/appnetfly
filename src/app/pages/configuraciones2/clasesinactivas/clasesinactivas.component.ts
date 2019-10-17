import { Component, OnInit } from '@angular/core';
import { ClasesinactivasService } from './clasesinactivas.service';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clasesinactivas',
  templateUrl: './clasesinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClasesinactivasService, SidebarComponent]
})
export class ClasesinactivasComponent implements OnInit {
  DataArray: any = [];
  DataJson: any = [];
  p:number=1;
  DataArrayClases: any = [];
  DataNew: any = [];
  DataModificar: any = [];
  DataClientes: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  idInactivar: any;
  nombreInactivar: any;
  checkedAll: boolean;
  paraVenta = false;
  paraInven = false;
  idActivar: any;
  nombreActivar: any;
  itempage = 5;
  searchString: any;
  noHayRegistros = false;


  constructor(public router: Router,
    public SidebarComponent: SidebarComponent,
    public clasesinactivasService: ClasesinactivasService, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;

  }
  ngOnInit() {
    this.LoadClasesinactivas();
  }


  LoadClasesinactivas() {
    this.clasesinactivasService.getClasesCliente().subscribe(
      data => {
        this.DataArray = data;

        if (this.DataArray.length !== 0) {
        this.loader = false;
        this.LoadTabla = true;
        // console.log(data);
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
    this.clasesinactivasService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Clase Activada',
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
