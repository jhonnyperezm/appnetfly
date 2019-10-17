import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientesService,SidebarComponent]
})
export class ClientesComponent implements OnInit {

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
  nombrerol: any;
  noHayRegistros = false;
  p: number = 1;

  constructor(public clientesService: ClientesService,
    public sidevarComponent: SidebarComponent,
    public toastr: ToastrService) {
      this.loader = true;
      this.LoadTabla = false;
      this.checkPermiso = false;
    }

  ngOnInit() {
    this.LoadClientes();
  }

  LoadClientes() {
    this.clientesService.getClientes().subscribe(
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

  InactivarCliente(idCliente, nombreCliente) {
    this.clientesService.putInactivarCliente(idCliente).subscribe();
    Swal.fire({
      title: 'Cliente inactivado',
      text: 'Proceso realizado de manera Exitosa, el Cliente ' + nombreCliente + 'fue inactivado',
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
