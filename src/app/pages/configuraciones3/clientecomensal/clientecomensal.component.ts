import {Component, OnInit} from '@angular/core';


import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {ClientecomensalService} from './clientecomensal.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

import * as XLSX from 'xlsx';
import 'jspdf';

declare let jsPDF: any;

@Component({
  selector: 'app-clientecomensal',
  templateUrl: './clientecomensal.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientecomensalService, SidebarComponent]
})
export class ClientecomensalComponent implements OnInit {
  p:number=1;
  searchString: any;
  itempage = 5;
  DataArrayClientes: any = [];
  DataClientes: any = [];
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  idCliente: any;
  noHayRegistros = false;
  nombreCliente: any;
  arrayPrincipal: any = [];
  DataCliente: any = [];

  wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'array'};
  fileName = 'ReporteClientesComensales.xlsx';

  constructor(
    public clientecomensalService: ClientecomensalService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadClientes();
    this.LoadDatosCliente();
  }

  LoadDatosCliente() {
    this.clientecomensalService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
      }
    );
  }

  LoadClientes() {
    this.clientecomensalService.getClientes().subscribe(
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

  InactivarCliente(idCliente, nombreCliente) {
    this.clientecomensalService.putInactivarCliente(idCliente).subscribe(data => {
      Swal.fire({
        title: 'Cliente inactivado',
        text: 'Proceso realizado de manera Exitosa, el Cliente ' + nombreCliente + ' fue inactivado',
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

  ExportPdf() {
    if (this.arrayPrincipal.length === 0) {
      this.arrayPrincipal = this.DataClientes;
    }
    const doc = new jsPDF();

    const clientes = {
      comensales: []
    };

    /* DATOS CABECERA*/
    const ColumnsE = [this.DataCliente.nombre.toUpperCase(), ''];
    const rowsE = [
      ['Dirección:', this.DataCliente.direccion],
      ['Nit:', this.DataCliente.nit + ' - ' + this.DataCliente.digito_checkeo]
    ];

    doc.autoTable({
      columns: ColumnsE,
      body: rowsE,
      startY: 10,
      margin: {horizontal: 7},
      tableWidth: 80,
      styles: {cellWidth: 40, fontSize: 10},
      theme: 'plain'
    });

    /* DATOS EMPRESA*/
    const ColumnsDE = ['Reporte Clientes Comensales'];
    const rowsDE = ['', ''];
    doc.autoTable({
      columns: ColumnsDE,
      body: rowsDE,
      startY: 10,
      margin: {horizontal: 100},
      tableWidth: 80,
      styles: {cellWidth: 80, fontSize: 10},
      theme: 'plain'
    });

    for (const key of this.arrayPrincipal) {
      clientes.comensales.push(
        {
          nombre: key.nombre,
          documento: key.documento,
          modDesEspeciales: key.modDesEspeciales,
          modCartera: key.modCartera,
          modFidelizacion: key.modFidelizacion
        });
    }

    const columnsDA = [
      {header: 'Nombre/Razón social Cliente', dataKey: 'nombre'},
      {header: 'Documento', dataKey: 'documento'},
      {header: 'Descuentos especiales', dataKey: 'modDesEspeciales'},
      {header: 'Cartera', dataKey: 'modCartera'},
      {header: 'Fidelización', dataKey: 'modFidelizacion'}
    ];

    const rowsDA = clientes.comensales;

    doc.autoTable({
      columns: columnsDA,
      body: rowsDA,
      startY: 40,
      margin: {horizontal: 7},
      tableWidth: 'auto',
      styles: {cellWidth: 'auto', cellPadding: 1, fontSize: 9}
    });


    doc.save('ReporteClientesComensales.pdf');

  }

  export(): void {
    if (this.arrayPrincipal.length === 0) {
      this.arrayPrincipal = this.DataClientes;
    }
    const general = {
      Person: []
    };
    general.Person.push([['Nombre/Razón social Cliente'],
      ['Documento'],
      ['Descuentos especiales'],
      ['Cartera'],
      ['Fidelización']

    ]);

    for (const key of this.arrayPrincipal) {
      general.Person.push([
        [key.nombre], // A1
        [key.documento], // B1
        [key.modDesEspeciales],
        [key.modCartera],
        key.modFidelizacion
      ]);
    }

    const wscols = [
      {wch: 20},
      {wch: 20},
      {wch: 20},
      {wch: 20}
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(general.Person);
    ws['!cols'] = wscols;
    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // save to file
    XLSX.writeFile(wb, this.fileName);
    /* this.array=''; */
  }
}
