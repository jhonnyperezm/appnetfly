import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModificarformapagoService } from './modificarformapago.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificarformapago',
  templateUrl: './modificarformapago.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificarformapagoService, DatePipe]
})
export class ModificarformapagoComponent implements OnInit {
  p:number=1;
  idFormaPago: any;
  nombreFormaPago: any;
  idGrupoFP: any;
  nombreGrupoFP: any;

  DataNewFormaPago: any = [];

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public modificarformapagoService: ModificarformapagoService,
    private datePipe: DatePipe,
    private route: ActivatedRoute) {
      this.idFormaPago = this.route.snapshot.params.idFormaPago;
      this.nombreFormaPago = this.route.snapshot.params.nombreFormaPago;
      this.idGrupoFP = this.route.snapshot.params.idGrupoFP;
      this.nombreGrupoFP = this.route.snapshot.params.nombreGrupoFP;
    }

  ngOnInit() {
    this.LoadDataFormaPago();
  }

  Regresar() {
    this.router.navigate(['configuraciones/gruposformaspago/formaspago/' + this.idGrupoFP]);
  }

  LoadDataFormaPago() {
    this.modificarformapagoService.getDatosFormaPago(this.idFormaPago).subscribe(
      data => {
        console.log(data);
        if (data[0].camoin === true) {
          this.DataNewFormaPago.cambioOtrosIng = 1;
        } else if (data[0].camoin === false) {
          this.DataNewFormaPago.cambioOtrosIng = 0;
        }
        if (data[0].complementarios === true) {
          this.DataNewFormaPago.complementarios = 1;
        } else if (data[0].complementarios === false) {
          this.DataNewFormaPago.complementarios = 0;
        }
        this.DataNewFormaPago.codigo = data[0].codigo;
        this.DataNewFormaPago.creadoPor = data[0].creadoPor;
        this.DataNewFormaPago.estado = data[0].estado;
        this.DataNewFormaPago.fechaCreacion =  this.datePipe.transform(data[0].fechaCreacion, 'yyyy-MM-dd'); // fecha
        this.DataNewFormaPago.fechaModificacion = data[0].fechaModificacion;
        this.DataNewFormaPago.tasa = data[0].tasa;
        this.DataNewFormaPago.masusu = data[0].masusu;

        if (data[0].forcap === 1) {
          this.DataNewFormaPago.conversion = 0;
        } else if (data[0].forcap === 2) {
          this.DataNewFormaPago.conversion = 1;
          this.DataNewFormaPago.cajeroconversion = 1;
        } else if (data[0].forcap === 3) {
          this.DataNewFormaPago.conversion = 1;
          this.DataNewFormaPago.cajeroconversion = 0;
        }

        this.DataNewFormaPago.id = data[0].id;
        this.DataNewFormaPago.idClienteConf = data[0].idClienteConf;
        if (data[0].impresionFactura === true) {
          this.DataNewFormaPago.impresion = 1;
        } else if (data[0].impresionFactura === false) {
          this.DataNewFormaPago.impresion = 0;
        }
        this.DataNewFormaPago.modificadoPor = data[0].modificadoPor;
        this.DataNewFormaPago.nombre = data[0].nombre;
        if (data[0].pagexa === true) {
          this.DataNewFormaPago.entregaCambio = 1;
        } else if (data[0].pagexa === false) {
          this.DataNewFormaPago.entregaCambio = 0;
        }
        this.DataNewFormaPago.dato1 = data[0].vadac1;
        this.DataNewFormaPago.dato2 = data[0].vadac2;
        this.DataNewFormaPago.dato3 = data[0].vadac3;
        this.DataNewFormaPago.dato4 = data[0].vadac4;
        this.DataNewFormaPago.dato5 = data[0].vadac5;
      }
    );
  }


  onSubmit(DatosFormasPago) {
    console.log(DatosFormasPago);

    let requiereConversion;

    if (DatosFormasPago.conversion === 0) {
      requiereConversion = 1;
    } else {
      if (DatosFormasPago.cajeroconversion === 1) {
        requiereConversion = 2;
      } else {
        requiereConversion = 3;
      }
    }

    const postDatos = {
      id: DatosFormasPago.id,
      nombre: DatosFormasPago.nombre,
      codigo: DatosFormasPago.codigo,
      gruposFormasPago: {
        id: this.idGrupoFP
      },
      camoin: DatosFormasPago.cambioOtrosIng, // boolean
      pagexa: DatosFormasPago.entregaCambio, // boolean
      forcap: requiereConversion, // int
      complementarios: DatosFormasPago.complementarios, // boolean
      vadac1: DatosFormasPago.dato1,
      vadac2: DatosFormasPago.dato2,
      vadac3: DatosFormasPago.dato3,
      vadac4: DatosFormasPago.dato4,
      vadac5: DatosFormasPago.dato5,
      impresionFactura: DatosFormasPago.impresion,
      creadoPor: DatosFormasPago.creadoPor,
      fechaCreacion: DatosFormasPago.fechaCreacion + 'T00:00:00',
      estado: DatosFormasPago.estado,
      idClienteConf: DatosFormasPago.idClienteConf,
      tasa: DatosFormasPago.tasa,
      masusu: DatosFormasPago.masusu
    };

    this.modificarformapagoService.putFormaPago(postDatos).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'No se pudo modificar el grupo de forma de pago') {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo modificar el grupo de forma de pago',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Exitoso',
            text: 'La forma de pago se modifico con exito',
            type: 'success',
          });
          this.router.navigate(['configuraciones/gruposformaspago/formaspago/' + this.idGrupoFP]);
        }
      });
  }

}
