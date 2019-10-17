import { Component, OnInit } from '@angular/core';
import { ClientespendientesaprobarService } from './clientespendientesaprobar.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientespendientesaprobar',
  templateUrl: './clientespendientesaprobar.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientespendientesaprobarService,SidebarComponent ]
})
export class ClientespendientesaprobarComponent implements OnInit {

  DataClientes: any = [];
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  dataClienteAprobar: any = [];
  nombrerol: any;
  noHayRegistros = false;
  p :number = 1;

  constructor(
    public clientespendientesaprobarService: ClientespendientesaprobarService,
    public sidevarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  ngOnInit() {
    this.LoadClientesSinAprobar();
  }

  LoadClientesSinAprobar() {
    this.clientespendientesaprobarService.getClientesSinAprobar().subscribe(
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

  bindingDataCliente(datosCliente) {
    console.log(datosCliente);
    this.dataClienteAprobar = datosCliente;

    /* this.idCliente = id;
    this.nombreCliente = nombre; */
  }

  AprobarCliente(datosCli) {
    const postData = {
      nombre_cliente: datosCli.nombre,
      nombre_usuario: datosCli.email,
      clave: datosCli.telefono
    };
    this.clientespendientesaprobarService.putAprobarCliente(datosCli.id, postData).subscribe(
      data => {
        if (data.text() === 'No se ha podido aprobar el cliente') {
          Swal.fire({
            title: 'Cliente ',
            text: 'El Cliente ' + datosCli.nombre + ' no se pudo aprobar',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Cliente aprobado',
            text: 'Proceso realizado de manera Exitosa, el Cliente ' + datosCli.nombre + ' fue aprobado',
            type: 'success',
          });

          for (let i = 0; i < this.DataClientes.length; i++) {

            let index;
            if (datosCli.id === this.DataClientes[i].id) {

              index = this.DataClientes.indexOf(this.DataClientes[i]);
              this.DataClientes.splice(index, 1);

            }
          }
        }
      });
  }

}
