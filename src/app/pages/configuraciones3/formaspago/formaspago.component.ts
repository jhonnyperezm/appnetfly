import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormaspagoService } from './formaspago.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-formaspago',
  templateUrl: './formaspago.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [FormaspagoService, DatePipe, SidebarComponent]
})
export class FormaspagoComponent implements OnInit {
  p:number=1;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;

  idGrupoFP: any;
  nombreGrupoFP: any;
  DataJson: any = [];
  searchString: any;
  itempage = 5;

  idInactivar: any;
  nombreInactivar: any;

  comBancos = false;
  reteica = false;
  reteiva = false;
  retefuente = false;
  DataEditFormaPago: any = [];
  noHayRegistros = false;

  @ViewChild('comisionBancosForm',{static:true})
  private comisionBancosForm: NgForm;

  @ViewChild('reteicaForm',{static:true})
  private reteicaForm: NgForm;

  @ViewChild('reteivaForm',{static:true})
  private reteivaForm: NgForm;

  @ViewChild('retefuenteForm',{static:true})
  private retefuenteForm: NgForm;

  constructor(public router: Router,
    public sidebarComponent: SidebarComponent,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public formaspagoService: FormaspagoService, public toastr: ToastrService) {
    this.idGrupoFP = this.route.snapshot.params.idGrupoFP;
    // this.nombreGrupoFP = this.route.snapshot.params.nombreGrupoFP;


    this.formaspagoService.getGrupoFormaPago(this.idGrupoFP).subscribe(
      data => {
        console.log(data);
        this.nombreGrupoFP = data[0].nombre;
      });
    this.DataJson = [];
    this.loader = true;
  }

  ngOnInit() {
    this.LoadFormasPago();
  }

  kPNumerosPuntos(event: any) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadFormasPago() {
    this.formaspagoService.getFormasPago(this.idGrupoFP).subscribe(
      data => {
        this.DataJson = [];
        console.log(data);
        if (data.length !== 0) {
          for (const key of data) {
            this.DataJson.push({
              'camoin': key.camoin,
              'codigo': key.codigo,
              'codigoGrupo': key.codigoGrupo,
              'comban': key.comban,
              'complementarios': key.complementarios,
              'creadoPor': key.creadoPor,
              'descue': key.descue,
              'estado': key.estado,
              'fechaCreacion': this.datePipe.transform(key.fechaCreacion, 'yyyy-MM-dd'),
              'fechaModificacion': key.fechaModificacion,
              'fobase': key.fobase,
              'forcap': key.forcap,
              'id': key.id,
              'idClienteConf': key.idClienteConf,
              'impresionFactura': key.impresionFactura,
              'modificadoPor': key.modificadoPor,
              'nombre': key.nombre,
              'nombreGrupo': key.nombreGrupo,
              'pagexa': key.pagexa,
              'porbas': key.porbas,
              'porcom': key.porcom,
              'retfue': key.retfue,
              'retica': key.retica,
              'retiva': key.retiva,
              'rffoba': key.rffoba,
              'rfpoba': key.rfpoba,
              'rfpoco': key.rfpoco,
              'ricfoba': key.ricfoba,
              'ricpoba': key.ricpoba,
              'ricpoco': key.ricpoco,
              'rifoba': key.rifoba,
              'ripoba': key.ripoba,
              'ripoco': key.ripoco,
              'vadac1': key.vadac1,
              'vadac2': key.vadac2,
              'vadac3': key.vadac3,
              'vadac4': key.vadac4,
              'vadac5': key.vadac5
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
  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.formaspagoService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'Forma de pago inactivada',
      text: 'Proceso realizado de manera Exitosa, la forma de pago ' + nombre + ' fue inactivada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataJson[i].id, 0)) {

        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);

      }
    }
  }

  Habilitar(opcion) {
    console.log(opcion);
    if (opcion === 'CB') {
      this.comBancos = !this.comBancos;
      this.reteica = false;
      this.reteiva = false;
      this.retefuente = false;
    } else if (opcion === 'RICA') {
      this.comBancos = false;
      this.reteica = !this.reteica;
      this.reteiva = false;
      this.retefuente = false;
    } else if (opcion === 'RIVA') {
      this.comBancos = false;
      this.reteica = false;
      this.reteiva = !this.reteiva;
      this.retefuente = false;
    } else if (opcion === 'RF') {
      this.comBancos = false;
      this.reteica = false;
      this.reteiva = false;
      this.retefuente = !this.retefuente;
    }
  }

  mostrarConsignaciones(datos) {
    this.DataEditFormaPago = datos;
    this.DataEditFormaPago.porbas = 100;
    this.DataEditFormaPago.rfpoba = 100;
    this.DataEditFormaPago.ripoba = 100;
    this.DataEditFormaPago.ricpoba = 100;
    this.DataEditFormaPago.descue = 0;
    console.log(this.DataEditFormaPago);
  }

  updateFormaPago(datosFormaPago) {
    console.log(datosFormaPago);

    if ((datosFormaPago.fobase !== '' && datosFormaPago.fobase !== null && datosFormaPago.fobase !== undefined) ||
      (datosFormaPago.porcom !== '' && datosFormaPago.porcom !== null && datosFormaPago.porcom !== undefined)) {
      datosFormaPago.comban = 'S';
    }
    if ((datosFormaPago.rffoba !== '' && datosFormaPago.rffoba !== null && datosFormaPago.rffoba !== undefined) ||
      (datosFormaPago.rfpoco !== '' && datosFormaPago.rfpoco !== null && datosFormaPago.rfpoco !== undefined)) {
      console.log('entro a poner s');
      datosFormaPago.retfue = 'S';
    }
    if ((datosFormaPago.rifoba !== '' && datosFormaPago.rifoba !== null && datosFormaPago.rifoba !== undefined) ||
      (datosFormaPago.ripoco !== '' && datosFormaPago.ripoco !== null && datosFormaPago.ripoco !== undefined)) {
      datosFormaPago.retiva = 'S';
    }
    if ((datosFormaPago.ricfoba !== '' && datosFormaPago.ricfoba !== null && datosFormaPago.ricfoba !== undefined) ||
      (datosFormaPago.ricpoco !== '' && datosFormaPago.ricpoco !== null && datosFormaPago.ricpoco !== undefined)) {
      datosFormaPago.retica = 'S';
    }

    const postDatos = {
      'id': datosFormaPago.id,
      'nombre': datosFormaPago.nombre,
      'codigo': datosFormaPago.codigo,
      'gruposFormasPago': {
        'id': this.idGrupoFP
      },
      'camoin': datosFormaPago.camoin, // boolean
      'pagexa': datosFormaPago.pagexa, // boolean
      'forcap': datosFormaPago.forcap, // int
      'complementarios': datosFormaPago.complementarios, // boolean
      'vadac1': datosFormaPago.vadac1,
      'vadac2': datosFormaPago.vadac2,
      'vadac3': datosFormaPago.vadac3,
      'vadac4': datosFormaPago.vadac4,
      'vadac5': datosFormaPago.vadac5,
      'impresionFactura': datosFormaPago.impresionFactura,
      'creadoPor': datosFormaPago.creadoPor,
      'fechaCreacion': datosFormaPago.fechaCreacion + 'T00:00:00',
      'estado': datosFormaPago.estado,
      'idClienteConf': datosFormaPago.idClienteConf,


      'comban': datosFormaPago.comban, //
      'fobase': datosFormaPago.fobase,
      'porbas': datosFormaPago.porbas,
      'porcom': datosFormaPago.porcom,

      'retfue': datosFormaPago.retfue,
      'rffoba': datosFormaPago.rffoba,
      'rfpoba': datosFormaPago.rfpoba,
      'rfpoco': datosFormaPago.rfpoco,
      'descue': datosFormaPago.descue,

      'retiva': datosFormaPago.retiva,
      'rifoba': datosFormaPago.rifoba,
      'ripoba': datosFormaPago.ripoba,
      'ripoco': datosFormaPago.ripoco,

      'retica': datosFormaPago.retica,
      'ricfoba': datosFormaPago.ricfoba,
      'ricpoba': datosFormaPago.ricpoba,
      'ricpoco': datosFormaPago.ricpoco

    };

    console.log(postDatos);

    this.formaspagoService.putFormaPago(postDatos).subscribe(
      data => {
        if (data.text() === 'No se pudo modificar el grupo de forma de pago') {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo modificar el grupo de forma de pago',
            type: 'error',
          });
        } else {
          this.router.navigate(['configuracion/formaspago/' + this.idGrupoFP + '/' + this.nombreGrupoFP]);
          Swal.fire({
            title: 'Exitoso',
            text: 'La forma de pago se modifico con exito',
            type: 'success',
          });
        }
      });
  }

}
