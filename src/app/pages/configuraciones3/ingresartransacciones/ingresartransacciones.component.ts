import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {IngresartransaccionesService} from './ingresartransacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresartransacciones',
  templateUrl: './ingresartransacciones.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresartransaccionesService]
})
export class IngresartransaccionesComponent implements OnInit {

  DataNewTransaccion: any = [];
  DataNewTrans: any = [];
  tipo: any;
  costo: any;

  @ViewChild('transaccionesForm', {static: true})
  private transaccionesForm: NgForm;

  constructor(public router: Router,
              public ingresartransaccionesService: IngresartransaccionesService,
              public toastr: ToastrService,
              vcr: ViewContainerRef,
              public route: ActivatedRoute) {
    this.DataNewTransaccion.costo = 0;
    this.DataNewTransaccion.dataPro = 0;
    this.DataNewTransaccion.persona = 0;
    this.DataNewTransaccion.fecha = 0;
    this.DataNewTransaccion.numOrden = 0;
    this.DataNewTransaccion.impuesto = 0;
  }

  ngOnInit() {
  }

  Regresar() {
    this.router.navigate(['configuraciones/transacciones']);
  }

  /* validaPreguntas(tipo) {
    console.log(tipo);
    this.tipo = tipo;
  } */

  /*  validaCalculoCosto(costo) {
     console.log(costo);
     this.costo = costo;
   } */

  LimpiarTransaccion() {
    this.transaccionesForm.reset();
    // this.DataNewTrans = [];
  }

  onSubmit(DataNewTrans) {
    console.log(DataNewTrans);
    let tipo;
    if (DataNewTrans.tipo === 3) {
      tipo = 'E';
      if (DataNewTrans.costo === 0) {
        DataNewTrans.clase = 1;
      }
    } else {
      tipo = 'S';
      DataNewTrans.clase = 1;
    }
    /* let afectaCosto;

    if (DataNewTrans.afectaCosto === 1) {
      afectaCosto = 'S';
    } else if (DataNewTrans.afectaCosto === 2) {
      afectaCosto = 'S';
    } else if (DataNewTrans.afectaCosto === 3) {
      afectaCosto = 'N';
    } */

    this.DataNewTrans = {
      'nombre': DataNewTrans.nombre,
      'clase': DataNewTrans.clase,
      'tipo': tipo,
      'calculoCosto': DataNewTrans.costo,
      'solicitaProveedor': DataNewTrans.dataPro,
      'solicitaNumOrden': DataNewTrans.numOrden,
      'solicitaPersona': DataNewTrans.persona,
      'solicitaFechaVencimiento': DataNewTrans.fecha,
      'deseaApoyoImpuestoConsumo': DataNewTrans.impuesto,
      'consec': 0
    };

    this.ingresartransaccionesService.postGuardarTransaccion(this.DataNewTrans).subscribe(
      data => {
        if (data.text() === 'No se pudo crear la transaccion') {
          Swal.fire({
            title: 'Error',
            text: 'El tipo de transaccion NO se guardo con exito',
            type: 'error',
          });
        } else {
          this.router.navigate(['configuraciones/transacciones']);
          Swal.fire({
            title: 'Exitoso',
            text: 'El tipo de transaccion se guardo con exito',
            type: 'success',
          });
        }
        this.LimpiarTransaccion();
      });
  }

}
