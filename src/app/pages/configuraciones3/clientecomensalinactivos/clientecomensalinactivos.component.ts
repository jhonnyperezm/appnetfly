import { Component, OnInit } from '@angular/core';
import { ClientecomensalinactivosService } from './clientecomensalinactivos.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-clientecomensalinactivos',
  templateUrl: './clientecomensalinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientecomensalinactivosService, SidebarComponent]
})
export class ClientecomensalinactivosComponent implements OnInit {

  constructor(
    public clientecomensalinactivosService: ClientecomensalinactivosService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
  }

  DataArrayClientes: any = [];
  DataClientes: any = [];
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  noHayRegistros = false;
  rol: boolean;
  idCliente: any;
  nombreCliente: any;
  p:number=1;

  ngOnInit() {
    this.LoadClientes();
  }
  LoadClientes() {
    this.clientecomensalinactivosService.getClientes().subscribe(
      data => {
        this.DataArrayClientes = data;
        this.DataClientes = [];
        if (this.DataArrayClientes.length !== 0) {
        for (const key of this.DataArrayClientes) {

          let desEsp = 'No';
          let cartera = 'No';
          let fidel = 'No';
          if (key.decuentos_especiales === true) {
            desEsp = 'Si';
          }
          if (key.cartera === true) {
            cartera = 'Si';
          }
          if (key.fidelizacion === true) {
            fidel = 'Si';
          }
          console.log(desEsp);
          this.DataClientes.push({
            cartera: key.cartera,
            modCartera: cartera,
            correo: key.correo,
            creado_por: key.creado_por,
            decuentos_especiales: key.decuentos_especiales,
            modDesEspeciales: desEsp,
            digito_checkeo: key.digito_checkeo,
            documento: key.documento,
            estado: key.estado,
            fecha_creacion: key.fecha_creacion,
            fecha_modificacion: key.fecha_modificacion,
            fidelizacion: key.fidelizacion,
            modFidelizacion: fidel,
            id: key.id,
            id_cliente_conf: key.id_cliente_conf,
            id_tipo_cliente: key.id_tipo_cliente,
            id_tipo_cliente_cart: key.id_tipo_cliente_cart,
            id_tipo_funcionario: key.id_tipo_funcionario,
            modificado_por: key.modificado_por,
            nombre: key.nombre,
            nombre_tipo_funcionario: key.nombre_tipo_funcionario,
            porcentaje_descuento: key.porcentaje_descuento,
            telefono: key.telefono,
            tipo: key.tipo,
            tipo_documento: key.tipo_documento
          });
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

  bindingDataCliente(id, nombre) {
    this.idCliente = id;
    this.nombreCliente = nombre;
  }

  ActivarCliente(idCliente, nombreCliente) {

    this.clientecomensalinactivosService.putInactivarCliente(idCliente).subscribe(data => {
      Swal.fire({
        title: 'Cliente activado',
        text: 'Proceso realizado de manera Exitosa, el Usuario ' + nombreCliente + ' fue activado',
        type: 'success',
      });
      for (let i = 0; i < this.DataClientes.length; i++) {

        let index;
        if (idCliente === this.DataClientes[i].id) {

          index = this.DataClientes.indexOf(this.DataClientes[i]);
          this.DataClientes.splice(index, 1);

        }
      }
      this.LoadClientes();
    });

  }


}
