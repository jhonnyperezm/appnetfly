import { Component, OnInit } from '@angular/core';
import { ClientesinactivosService } from './clientesinactivos.service';
import { ToastrService } from 'ngx-toastr';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientesinactivos',
  templateUrl: './clientesinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientesinactivosService, SidebarComponent]
})
export class ClientesinactivosComponent implements OnInit {

  constructor(public clientesinactivosService: ClientesinactivosService,
    public sidevarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  DataClientes: any = [];
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  idCliente: any;
  nombreCliente: any;
  p :number = 1;
  noHayRegistros = false;

  ngOnInit() {

    this.LoadClientes();
    this.rol = true;
  }

  LoadClientes() {
    this.clientesinactivosService.getClientes().subscribe(
      data => {
        this.DataClientes = data;
        if (this.DataClientes.length !== 0) {
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

  bindingDataCliente(id, nombre) {
    this.idCliente = id;
    this.nombreCliente = nombre;
  }

  ActivarCliente(idCliente, nombreCliente) {

    this.clientesinactivosService.putInactivarCliente(idCliente).subscribe();
    Swal.fire({
      title: 'Cliente activado',
      text: 'Proceso realizado de manera Exitosa, el Usuario ' + nombreCliente + 'fue activado',
      type: 'success',
    });
    for (let i = 0; i < this.DataClientes.length; i++) {

      let index;
      if (idCliente === this.DataClientes[i].id) {

        index = this.DataClientes.indexOf(this.DataClientes[i]);
        this.DataClientes.splice(index, 1);

      }
    }
  }

}
