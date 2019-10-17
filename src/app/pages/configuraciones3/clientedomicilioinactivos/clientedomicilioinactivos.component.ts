import { Component, OnInit } from '@angular/core';
import { ClientedomicilioinactivosService } from './clientedomicilioinactivos.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-clientedomicilioinactivos',
  templateUrl: './clientedomicilioinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientedomicilioinactivosService, SidebarComponent]
})
export class ClientedomicilioinactivosComponent implements OnInit {

  p:number=1;
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  DataClientesDomicilioInactivos: any = [];
  idCliente: any;
  nombreCliente: any;
  noHayRegistros = false;

  constructor(
    public clientedomicilioinactivosService: ClientedomicilioinactivosService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService
  ) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  ngOnInit() {
    this.LoadClientesDomicilioInactivos();
  }

  LoadClientesDomicilioInactivos() {
    this.clientedomicilioinactivosService.getClientesDomicilioInactivos().subscribe(
      data => {
        this.DataClientesDomicilioInactivos = data;
        console.log(this.DataClientesDomicilioInactivos);
        if (this.DataClientesDomicilioInactivos.length !== 0) {
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

  bindingDataClienteDomicilio(id, nombre) {
    this.idCliente = id;
    this.nombreCliente = nombre;
  }

  ActivarClienteDomicilio(idCliente, nombreCliente) {
    this.clientedomicilioinactivosService.putActivarClienteDomicilio(idCliente).subscribe();
    Swal.fire({
      title: 'Cliente Activado',
      text: 'Proceso realizado de manera Exitosa, el Usuario ' + nombreCliente + ' fue activado',
      type: 'success',
    });
    for (let i = 0; i < this.DataClientesDomicilioInactivos.length; i++) {

      let index;
      if (idCliente === this.DataClientesDomicilioInactivos[i].id) {

        index = this.DataClientesDomicilioInactivos.indexOf(this.DataClientesDomicilioInactivos[i]);
        this.DataClientesDomicilioInactivos.splice(index, 1);

      }
    }
  }

}
