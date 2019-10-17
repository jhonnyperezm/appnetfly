import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {IMyDpOptions, IMyDateModel, IMyMarkedDate, IMySelector} from 'mydatepicker';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {ClientedomicilioService} from './clientedomicilio.service';

@Component({
  selector: 'app-clientedomicilio',
  templateUrl: './clientedomicilio.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClientedomicilioService, DatePipe, SidebarComponent]
})
export class ClientedomicilioComponent implements OnInit {
  p:number=1;
  checkPermiso: boolean;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  DataClientesDomicilio: any = [];
  DataClienteDom: any = [];
  idCliente: any;
  nombreCliente: any;
  DataJsonClienteDom: any = [];
  DataNewClienteDom: any = [];
  dataFecha: any = [];
  noHayRegistros = false;

  @ViewChild('cliDomForm', {static: true})
  public cliDomForm: NgForm;

  @ViewChild('cliDomEditForm', {static: true})
  public cliDomEditForm: NgForm;


  public fecha_inicial: any = '';
  public selectedDateNormal: any;
  public selectedDateNormal2: any = '';
  private selectedTextNormal: any = '';
  private selectedTextNormal2: any = '';
  private dateformat1 = '';
  private border = 'none';
  private placeholder = 'Select date';
  private disabled = false;
  private selector: IMySelector = {
    open: false
  };


  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Hoy',
    editableDateField: false,
    componentDisabled: false,
    openSelectorOnInputClick: true,
  };

  constructor(
    public clientedomicilioService: ClientedomicilioService,
    public sidebarComponent: SidebarComponent,
    private datePipe: DatePipe,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  ngOnInit() {
    this.LoadClientesDomicilio();
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataClienteDom.fecha_nacimiento = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      const fecha = new Date();
      this.DataClienteDom.fecha_nacimiento = '';
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged2(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataNewClienteDom.fechaNacimiento = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      const fecha = new Date();
      this.DataNewClienteDom.fechaNacimiento = '';
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  kPNumerosPuntos(event: any) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadClientesDomicilio() {
    this.clientedomicilioService.getClientesDomicilio().subscribe(
      data => {
        // this.DataClientesDomicilio = data;
        // console.log(this.DataClientesDomicilio);
        this.DataClientesDomicilio = [];
        let fecha_nacimiento;
        if (data.length !== 0) {
          for (const key of data) {
            if (key.fechaNacimiento === '0001-01-01T00:00:00-05:00') {
              fecha_nacimiento = null;
            } else {
              fecha_nacimiento = this.datePipe.transform(key.fechaNacimiento, 'yyyy-MM-dd');
            }
            if (key.celular === 0) {
              key.celular = '';
            } else {
              key.celular = key.celular;
            }
            this.DataClientesDomicilio.push({
              'barrio': key.barrio,
              'creadoPor': key.creadoPor,
              'direccion': key.direccion,
              'estado': key.estado,
              'extension': key.extension,
              'extension2': key.extension2,
              'fechaCreacion': this.datePipe.transform(key.fechaCreacion, 'yyyy-MM-dd'),
              'fechaModificacion': key.fechaModificacion,
              'id': key.id,
              'idClienteConf': key.idClienteConf,
              'modificadoPor': key.modificadoPor,
              'nit': key.nit,
              'nombre': key.nombre,
              'senales': key.senales,
              'telefono': key.telefono,
              'telefono2': key.telefono2,
              'email': key.email,
              'fechaNacimiento': fecha_nacimiento,
              'celular': key.celular
            });
          }
          console.log(this.DataClientesDomicilio);
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

  InactivarClienteDomicilio(idCliente, nombreCliente) {
    this.clientedomicilioService.putInactivarClienteDomicilio(idCliente).subscribe();
    Swal.fire({
      title: 'Cliente inactivado',
      text: 'Proceso realizado de manera Exitosa, el Usuario ' + nombreCliente + ' fue inactivado',
      type: 'success',
    });
    for (let i = 0; i < this.DataClientesDomicilio.length; i++) {

      let index;
      if (idCliente === this.DataClientesDomicilio[i].id) {

        index = this.DataClientesDomicilio.indexOf(this.DataClientesDomicilio[i]);
        this.DataClientesDomicilio.splice(index, 1);

      }
    }
  }

  onSubmit(DataClienteDom) {
    console.log(DataClienteDom);
    console.log(DataClienteDom.nit);
    const fecha = new Date();
    console.log(fecha.getTime());
    let fecha_nacimiento;
    if (DataClienteDom.fecha === null) {
      fecha_nacimiento = '0001-01-01T00:00:00';
    } else {
      fecha_nacimiento = DataClienteDom.fecha_nacimiento + 'T00:00:00';
    }
    console.log(fecha_nacimiento);

    this.DataJsonClienteDom = {
      'telefono': DataClienteDom.telefono,
      'extension': DataClienteDom.extension,
      'telefono2': DataClienteDom.telefono2,
      'extension2': DataClienteDom.extension2,
      'nit': DataClienteDom.nit,
      'nombre': DataClienteDom.nombre,
      'barrio': DataClienteDom.barrio,
      'direccion': DataClienteDom.direccion,
      'senales': DataClienteDom.senales,
      'email': DataClienteDom.email,
      'fechaNacimiento': fecha_nacimiento,
      'celular': DataClienteDom.celular
    };

    this.clientedomicilioService.createClienteDomicilio(this.DataJsonClienteDom).subscribe(data => {
      if (data.text() === 'Success') {
        Swal.fire({
          title: 'Cliente Domicilio creado',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
        this.LoadClientesDomicilio();
      } else {
        Swal.fire({
          title: 'Cliente Domicilio no fue creado',
          text: 'Proceso no se realizò de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  UpdateClienteDomicilio(dataClientDomicilio) {
    this.DataNewClienteDom = dataClientDomicilio;
    this.DataNewClienteDom.newTelefono = dataClientDomicilio.telefono;
    this.DataNewClienteDom.newExtension = dataClientDomicilio.extension;
    this.DataNewClienteDom.newNit = dataClientDomicilio.nit;
    this.DataNewClienteDom.newNombre = dataClientDomicilio.nombre;

    // this.DataNewClienteDom.fechaNacimiento = this.datePipe.transform(dataClientDomicilio.fechaNacimiento, 'yyyy-MM-dd');


    console.log(dataClientDomicilio.fechaNacimiento);

    if (dataClientDomicilio.fechaNacimiento === null) {
      this.DataNewClienteDom.fecha = null;
      // this.dataFecha.fecha_nacimiento = '';
    } else {

      const fecha_nacimiento = new Date(dataClientDomicilio.fechaNacimiento);
      fecha_nacimiento.setMinutes(fecha_nacimiento.getMinutes() + fecha_nacimiento.getTimezoneOffset());
      console.log(fecha_nacimiento);
      console.log(fecha_nacimiento.getDate());
      this.DataNewClienteDom.fecha = {
        date: {
          year: fecha_nacimiento.getFullYear(),
          month: fecha_nacimiento.getMonth() + 1, day: fecha_nacimiento.getDate()
        }
      };
      /* this.dataFecha.fecha_nacimiento = { date: { year: fecha_nacimiento.getFullYear(),
        month: fecha_nacimiento.getMonth() + 1, day: fecha_nacimiento.getDate() } }; */
    }
    console.log(this.DataNewClienteDom);
  }

  onSubmitUpdate(DataCliente) {
    console.log(DataCliente);
    const fecha = new Date();
    console.log(fecha.getTime());
    let fecha_nacimiento;
    if (DataCliente.fecha === null || DataCliente.fecha === '') {
      fecha_nacimiento = '0001-01-01T00:00:00';
    } else {
      fecha_nacimiento = DataCliente.fechaNacimiento + 'T00:00:00';
    }
    console.log(fecha_nacimiento);
    const postDataClienteDom = {
      'id': DataCliente.id,
      'telefono': DataCliente.newTelefono,
      'extension': DataCliente.newExtension,
      'telefono2': DataCliente.telefono2,
      'extension2': DataCliente.extension2,
      'nit': DataCliente.newNit,
      'nombre': DataCliente.newNombre,
      'direccion': DataCliente.direccion,
      'barrio': DataCliente.barrio,
      'senales': DataCliente.senales,
      'creadoPor': DataCliente.creadoPor,
      'fechaCreacion': DataCliente.fechaCreacion + 'T00:00:00',
      'estado': DataCliente.estado,
      'idClienteConf': DataCliente.idClienteConf,
      'email': DataCliente.email,
      'fechaNacimiento': fecha_nacimiento,
      'celular': DataCliente.celular

    };

    this.clientedomicilioService.updateClienteDomicilio(postDataClienteDom).subscribe(data => {
      if (data.text() === 'No se pudo modificar el cliente') {
        Swal.fire({
          title: 'Cliente Domicilio no fue modificado',
          text: 'Proceso no se realizò de manera Exitosa',
          type: 'error',
        });
      } else {
        Swal.fire({
          title: 'Cliente Domicilio modificado',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
        this.LoadClientesDomicilio();
      }
    });
  }

  LimpiarFormClienteDomicilio() {
    this.cliDomForm.reset();
  }

}
