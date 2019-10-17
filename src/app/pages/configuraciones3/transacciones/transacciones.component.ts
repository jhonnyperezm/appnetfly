import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionesService } from './transacciones.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [TransaccionesService, SidebarComponent]
})
export class TransaccionesComponent implements OnInit {
  p:number=1;
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  DataTransacciones: any = [];
  idTransaccion: any;
  nombreTransaccion: any;
  noHayRegistros = false;

  constructor(
    public transaccionesService: TransaccionesService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  ngOnInit() {
    this.LoadTransacciones();
  }

  LoadTransacciones() {
    this.transaccionesService.getTransacciones().subscribe(
      data => {
        this.DataTransacciones = data;
        console.log(this.DataTransacciones);
        if (this.DataTransacciones.length !== 0) {
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

  bindingDataTransaccion(id, nombre) {
    this.idTransaccion = id;
    this.nombreTransaccion = nombre;
  }

  InactivarTransaccion(idTransaccion, nombreTransaccion) {
    this.transaccionesService.putInactivarTransaccion(idTransaccion).subscribe();
    Swal.fire({
      title: 'Transaccion Inactivada',
      text: 'Proceso realizado de manera Exitosa, la Transaccion ' + nombreTransaccion + ' fue inactivada',
      type: 'success',
    });
    for (let i = 0; i < this.DataTransacciones.length; i++) {

      let index;
      if (idTransaccion === this.DataTransacciones[i].id) {

        index = this.DataTransacciones.indexOf(this.DataTransacciones[i]);
        this.DataTransacciones.splice(index, 1);

      }
    }
  }
}
