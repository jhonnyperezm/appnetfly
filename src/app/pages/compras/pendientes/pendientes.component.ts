import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PendientesService} from './pendientes.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [PendientesService, SidebarComponent]
})
export class PendientesComponent implements OnInit {

  DataArrayPendientes: any = [];
  DataJson: any = [];
  itempageTPendientes = 5;
  searchStringTPendientes: any;
  searchString: any;
  itempage = 5;
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  idEliminar: any;
  checkedAll: boolean;
  creado: any;
  idCliente: any;
  btoneliminar = true;
  estado: any;

  pend:number=1;

  @ViewChild('pendientesForm', {static: true})
  private pendientesForm: NgForm;

  constructor(public router: Router,
              public sidebarComponent: SidebarComponent,
              public pendientesService: PendientesService,
              public toastr: ToastrService) {
    this.LoadPendientes();
  }

  ngOnInit() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
  }

  LoadPendientes() {
    this.pendientesService.getPendientes().subscribe(
      data => {
        this.DataArrayPendientes = data;
        this.DataArrayPendientes.sort(function(a, b) {
          if (a.numero_documento < b.numero_documento) {
            return 1;
          }
          if (a.numero_documento > b.numero_documento) {
            return -1;
          }
          return 0;
        });
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

  bindingDataEliminar(id) {
    this.idEliminar = id;
  }

  Eliminar(id) {
    this.pendientesService.putEliminarpendientes(id).subscribe();
    Swal.fire({
      title: 'Pendiente eliminado',
      text: 'Proceso realizado de manera Exitosa, el pendiente' + id + 'fue Eliminado',
      type: 'success',
    });

    for (let i = 0; i < this.DataArrayPendientes.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataArrayPendientes[i].id, 0)) {
        index = this.DataArrayPendientes.indexOf(this.DataArrayPendientes[i]);
        this.DataArrayPendientes.splice(index, 1);
      }
    }
  }


}
