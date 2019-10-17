import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ModificartransaccionService} from './modificartransaccion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modificartransaccion',
  templateUrl: './modificartransaccion.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificartransaccionService]
})
export class ModificartransaccionComponent implements OnInit {

  idTransaccion: any;
  DataNewTransaccion: any = [];
  DataNewTrans: any = [];

  @ViewChild('transaccionesForm', {static: true})
  private transaccionesForm: NgForm;

  constructor(public router: Router,
              public toastr: ToastrService,
              public modificartransaccionService: ModificartransaccionService,
              private route: ActivatedRoute) {
    this.idTransaccion = this.route.snapshot.params.idTransaccion;
  }

  ngOnInit() {
    this.LoadDataTransaccion();
  }

  Regresar() {
    this.router.navigate(['configuraciones/transacciones']);
  }

  LoadDataTransaccion() {
    this.modificartransaccionService.getDatosTransaccion(this.idTransaccion).subscribe(
      data => {
        console.log(data);
        this.DataNewTransaccion.adi1 = data[0].adi1;
        this.DataNewTransaccion.adi2 = data[0].adi2;
        this.DataNewTransaccion.adi3 = data[0].adi3;
        this.DataNewTransaccion.apocon = data[0].apocon;
        if (data[0].calculoCosto === true) {
          this.DataNewTransaccion.costo = 1;
        } else if (data[0].calculoCosto === false) {
          this.DataNewTransaccion.costo = 0;
        }
        this.DataNewTransaccion.clase = data[0].clase;
        this.DataNewTransaccion.codapo = data[0].codapo;
        this.DataNewTransaccion.codigo = data[0].codigo;
        this.DataNewTransaccion.consec = data[0].consec;
        this.DataNewTransaccion.datPro = data[0].datpro;
        this.DataNewTransaccion.estado = data[0].estado;
        this.DataNewTransaccion.id = data[0].id;
        this.DataNewTransaccion.idClienteConf = data[0].idClienteConf;
        this.DataNewTransaccion.nombre = data[0].nombre;

        if (data[0].deseaApoyoImpuestoConsumo === true) {
          this.DataNewTransaccion.impuesto = 1;
        } else if (data[0].deseaApoyoImpuestoConsumo === false) {
          this.DataNewTransaccion.impuesto = 0;
        }

        if (data[0].solicitaFechaVencimiento === true) {
          this.DataNewTransaccion.fecha = 1;
        } else if (data[0].solicitaFechaVencimiento === false) {
          this.DataNewTransaccion.fecha = 0;
        }

        if (data[0].solicitaNumOrden === true) {
          this.DataNewTransaccion.numOrden = 1;
        } else if (data[0].solicitaNumOrden === false) {
          this.DataNewTransaccion.numOrden = 0;
        }

        if (data[0].solicitaPersona === true) {
          this.DataNewTransaccion.persona = 1;
        } else if (data[0].solicitaPersona === false) {
          this.DataNewTransaccion.persona = 0;
        }

        if (data[0].solicitaProveedor === true) {
          this.DataNewTransaccion.dataPro = 1;
        } else if (data[0].solicitaProveedor === false) {
          this.DataNewTransaccion.dataPro = 0;
        }

        if (data[0].tipo === 'E') {
          this.DataNewTransaccion.tipo = 3;
        } else if (data[0].tipo === 'S') {
          this.DataNewTransaccion.tipo = 1;
        }
      }
    );
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

    this.DataNewTrans = {
      'id': DataNewTrans.id,
      'codigo': DataNewTrans.codigo,
      'nombre': DataNewTrans.nombre,
      'clase': DataNewTrans.clase,
      'tipo': tipo,
      'calculoCosto': DataNewTrans.costo,
      'solicitaProveedor': DataNewTrans.dataPro,
      'solicitaNumOrden': DataNewTrans.numOrden,
      'solicitaPersona': DataNewTrans.persona,
      'solicitaFechaVencimiento': DataNewTrans.fecha,
      'deseaApoyoImpuestoConsumo': DataNewTrans.impuesto,
      'consec': 0,
      'estado': DataNewTrans.estado,
    };

    this.modificartransaccionService.updateTransaccion(this.DataNewTrans).subscribe(
      data => {
        if (data.text() === 'No se pudo modificar la transaccion') {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo modificar el tipo de transaccion',
            type: 'error',
          });
        } else {
          this.router.navigate(['configuraciones/transacciones']);
          Swal.fire({
            title: 'Exitoso',
            text: 'El tipo de transaccion se modifico exitosamente',
            type: 'success',
          });
        }
      });
  }

}
