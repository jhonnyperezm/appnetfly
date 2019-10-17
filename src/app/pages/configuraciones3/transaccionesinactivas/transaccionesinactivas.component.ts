import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TransaccionesinactivasService } from './transaccionesinactivas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-transaccionesinactivas',
  templateUrl: './transaccionesinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [TransaccionesinactivasService,SidebarComponent]
})
export class TransaccionesinactivasComponent implements OnInit {
  p:number=1;
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  DataTransaccionesInactivas: any = [];
  idTransaccion: any;
  noHayRegistros = false;
  nombreTransaccion: any;
  constructor(public transaccionesinactivasService: TransaccionesinactivasService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  ngOnInit() {
    this.LoadTransaccionesInactivas();
  }

  LoadTransaccionesInactivas() {
    this.transaccionesinactivasService.getTransaccionesInactivas().subscribe(
      data => {
        this.DataTransaccionesInactivas = data;
        console.log(this.DataTransaccionesInactivas);
        if (this.DataTransaccionesInactivas.length !== 0) {
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

  ActivarTransaccion(idTransaccion, nombreTransaccion) {
    this.transaccionesinactivasService.putActivarTransaccion(idTransaccion).subscribe();
    Swal.fire({
      title: 'Transaccion Activada',
      text: 'Proceso realizado de manera Exitosa, la Transaccion ' + nombreTransaccion + ' fue Activada',
      type: 'success',
    });
    for (let i = 0; i < this.DataTransaccionesInactivas.length; i++) {

      let index;
      if (idTransaccion === this.DataTransaccionesInactivas[i].id) {

        index = this.DataTransaccionesInactivas.indexOf(this.DataTransaccionesInactivas[i]);
        this.DataTransaccionesInactivas.splice(index, 1);

      }
    }
  }

}
