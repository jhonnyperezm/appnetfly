import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { IngresarformapagoService } from './ingresarformapago.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresarformapago',
  templateUrl: './ingresarformapago.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarformapagoService]
})
export class IngresarformapagoComponent implements OnInit {

  DataNewFormaPago: any = [];
  idGrupoFP: any;
  nombreGrupoFP: any;

  constructor(
    public router: Router,
    public ingresarformapagoService: IngresarformapagoService,
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    public route: ActivatedRoute) {
      this.idGrupoFP = this.route.snapshot.params.idGrupoFP;
      this.nombreGrupoFP = this.route.snapshot.params.nombreGrupoFP;
      this.DataNewFormaPago.cambioOtrosIng = 0;
      this.DataNewFormaPago.entregaCambio = 0;
      this.DataNewFormaPago.conversion = 0;
      this.DataNewFormaPago.complementarios = 0;
      this.DataNewFormaPago.impresion = 0;
      this.DataNewFormaPago.cajeroconversion = 0;
    }

  ngOnInit() {
  }

  Regresar() {
    this.router.navigate(['configuraciones/gruposformaspago/formaspago/' + this.idGrupoFP]);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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
      nombre: DatosFormasPago.nombre,
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
      tasa: DatosFormasPago.tasa
    };

    this.ingresarformapagoService.postFormaPago(postDatos).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'No se pudo crear la forma de pago') {
          Swal.fire({
            title: 'Error',
            text: 'La forma de pago NO se guardo con exito',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Exitoso',
            text: 'La forma de pago se guardo con exito',
            type: 'success',
          });
          this.router.navigate(['configuraciones/gruposformaspago/formaspago/' + this.idGrupoFP]);
        }
      });
  }

}
