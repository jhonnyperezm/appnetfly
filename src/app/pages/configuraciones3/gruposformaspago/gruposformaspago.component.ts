import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { GruposformaspagoService } from './gruposformaspago.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-gruposformaspago',
  templateUrl: './gruposformaspago.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposformaspagoService, DatePipe, SidebarComponent]
})
export class GruposformaspagoComponent implements OnInit {
  p:number=1;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  noHayRegistros = false;

  DataJson: any = [];
  searchString: any;
  itempage = 5;
  DataNewGrupo: any = [];
  DataFormasPagoEstandar: any = [];

  idInactivar: any;
  nombreInactivar: any;

  DataEditGrupo: any = [];

  @ViewChild('gruposFormaPagoForm',{static:true})
  private gruposFormaPagoForm: NgForm;

  @ViewChild('gruposFormaPagoEditForm',{static:true})
  private gruposFormaPagoEditForm: NgForm;

  constructor(public router: Router,
    public sidebarComponent: SidebarComponent,
    private datePipe: DatePipe,
    public gruposformaspagoService: GruposformaspagoService, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
  }

  ngOnInit() {
    this.LoadGruposFormasPago();
    this.LoadFormasPagoEstandar();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadGruposFormasPago() {
    this.gruposformaspagoService.getGruposFormasPago().subscribe(
      data => {
        this.DataJson = [];
        console.log(data);
        if (data.length !== 0) {
        // 'fechaCreacion': this.datePipe.transform(key.fechaCreacion, 'yyyy-MM-dd'),
        for (const key of data) {
          this.DataJson.push({
            'codigo': key.codigo,
            'codigoFormaEstandar': key.codigoFormaEstandar,
            'creadoPor': key.creadoPor,
            'estado': key.estado,
            'fechaCreacion': this.datePipe.transform(key.fechaCreacion, 'yyyy-MM-dd'),
            'fechaModificacion': key.fechaModificacion,
            'id': key.id,
            'idClienteConf': key.idClienteConf,
            'modificadoPor': key.modificadoPor,
            'nombre': key.nombre,
            'idFormaPagoEstandar': key.idFormaPagoEstandar,
            'nombreFormaEstandar': key.nombreFormaEstandar
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

  LoadFormasPagoEstandar() {
    this.gruposformaspagoService.getFormasPagoEstandar().subscribe(
      data => {
        console.log(data);
        this.DataFormasPagoEstandar = data;
      }
    );
  }

  onSubmit(datosGrupo) {
    console.log(datosGrupo);
    const postGrupo = {
      'nombre': datosGrupo.nombre,
      'formasPagoEstandar': {
        'id': datosGrupo.formapagoest
      },
    };

    this.gruposformaspagoService.createGrupoFormaPago(postGrupo).subscribe(data => {
      if (data.text() === 'No se pudo crear el grupo de forma de pago') {
        Swal.fire({
          title: 'Grupo forma de pago',
          text: 'Proceso no se realizò correctamente',
          type: 'error',
        });
      } else if (data.text() === 'El nombre del grupo ya existe') {
        Swal.fire({
          title: 'Grupo forma de pago',
          text: 'El nombre del grupo ya existe',
          type: 'error',
        });
      } else {
        Swal.fire({
          title: 'Grupo forma de pago',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
        this.LoadGruposFormasPago();
      }
    });
  }

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.gruposformaspagoService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'Grupo inactivado',
      text: 'Proceso realizado de manera Exitosa, el grupo forma de pago ' + nombre + 'fue inactivado',
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

  bindingDataModificar(datosModificar) {
    this.DataEditGrupo = datosModificar;
    this.DataEditGrupo.nombregrupo = datosModificar.nombre;
    console.log(this.DataEditGrupo);
  }

  onSubmitUpdate(datosGrupo) {
    console.log(datosGrupo);
    const postGrupo = {
      'id': datosGrupo.id,
      'formasPagoEstandar': {
        'id': datosGrupo.idFormaPagoEstandar
      },
      'codigo': datosGrupo.codigo,
      'nombre': datosGrupo.nombregrupo,
      'creadoPor': datosGrupo.creadoPor,
      'fechaCreacion': datosGrupo.fechaCreacion + 'T00:00:00',
      'estado': datosGrupo.estado,
      'idClienteConf': datosGrupo.idClienteConf
    };

    this.gruposformaspagoService.updateGrupoFormaPago(postGrupo).subscribe(data => {
      if (data.text() === 'No se pudo crear el grupo de forma de pago') {
        Swal.fire({
          title: 'Grupo forma de pago',
          text: 'Proceso no se realizò correctamente',
          type: 'error',
        });
      } else if (data.text() === 'El nombre del grupo ya existe') {
        Swal.fire({
          title: 'Grupo forma de pago',
          text: 'El nombre del grupo ya existe',
          type: 'error',
        });
      } else {
        Swal.fire({
          title: 'Grupo forma de pago',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
        this.LoadGruposFormasPago();
      }
    });
  }
  LimpiarFormularioGrupos() {
    this.gruposFormaPagoForm.reset();
  }

}
