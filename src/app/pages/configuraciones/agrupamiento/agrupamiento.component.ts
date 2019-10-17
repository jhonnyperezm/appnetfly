import { Component, OnInit, ViewChild } from '@angular/core';
import { AgrupamientoService } from './agrupamiento.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrupamiento',
  templateUrl: './agrupamiento.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [AgrupamientoService, DatePipe, SidebarComponent]
})
export class AgrupamientoComponent implements OnInit {
    p:number=1;
    per:number=1;
    y:number=1;
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;

  searchString: any;
  itempage = 5;
  DataJson: any = [];
  checkedAll: boolean;
  DataArrayPuntos: any = [];
  DataJsonPuntos: any = [];
  DataAgrupacion: any = [];
  searchStringPuntos: any;
  itempagePuntos = 5;
  DataJsonPuntosSel: any = [];
  noHayRegistros = false;
  DataEditAgrupacion: any = [];

  searchStringEditAgrupacion: any;
  itempageEditAgrupacion = 5;
  DataArrayPuntosAgrupacion: any = [];

  @ViewChild('agrupacionForm',{static:true})
  private agrupacionForm: NgForm;

  @ViewChild('editAgrupacionForm',{static:true})
  private editAgrupacionForm: NgForm;

  constructor(public agrupamientoService: AgrupamientoService,
    public toastr: ToastrService,
    private datePipe: DatePipe,
    public SidebarComponent: SidebarComponent) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
    this.checkedAll = false;
    }

  ngOnInit() {
    this.LoadAgrupacion();
    this.LoadPuntosCliente();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadAgrupacion() {
    this.agrupamientoService.getAgrupacion().subscribe(
      data => {
        console.log(data);
        this.DataJson = [];
        if (data.length !== 0) {
        for (const key of data) {
          this.DataJson.push({
            'estado': key.estado,
            'id': key.id,
            'nombre': key.nombre,
            'creadoPor': key.creadoPor,
            'fechaCreacion': this.datePipe.transform(key.fechaCreacion, 'yyyy-MM-dd'),
            'checked': false
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

  LoadPuntosCliente() {
    this.agrupamientoService.getPuntosCliente().subscribe(
      data => {
        console.log(data);
        this.DataArrayPuntos = data;
        this.DataJsonPuntos = [];
        for (const key of this.DataArrayPuntos) {
          this.DataJsonPuntos.push({
            'id': key.id_punto,
            'nombre': key.nombre,
            'checked': false,
            'checkedEdit': false,
          });
        }
        this.loader = false;
        this.LoadTabla = true;
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  onChangeAll(isChecked: boolean) {
    this.checkedAll = isChecked;
    for (let i = 0; i < this.DataJsonPuntos.length; i++) {
      this.DataJsonPuntos[i].checked = isChecked;
      this.onChange(this.DataJsonPuntos[i], isChecked);
    }
  }

  onChange(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonPuntosSel.filter(x => parseInt(x.id, 0) === data.id);
      if (existe.length === 0) {
        this.DataJsonPuntosSel.push(
          {
            'id': data.id
          }
        );
      }
    } else {
      for (let i = 0; i < this.DataJsonPuntosSel.length; i++) {

        let index;
        if (data.id === parseInt(this.DataJsonPuntosSel[i].id, 0) && isChecked === false) {
          index = this.DataJsonPuntosSel.indexOf(this.DataJsonPuntosSel[i]);
          this.DataJsonPuntosSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonPuntos.length; i++) {
      if (data.id === this.DataJsonPuntos[i].id) {
        this.DataJsonPuntos[i].checked = isChecked;
      }
    }
    console.log(this.DataJsonPuntosSel);
  }

  onSubmit(datosAgrupacion) {
    const postData = {
      'nombre': datosAgrupacion.nombre
    };

    this.agrupamientoService.createAgrupamiento(postData).subscribe(data => {
      if (data.text() === 'error') {
        Swal.fire({
          title: 'Agrupacion No Creada',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      } else if (data.text() === 'No pudo ser crado el agrupamiento el nombre ya existe para el cliente') {
        Swal.fire({
          title: 'Agrupacion No Creada',
          text: 'El nombre del agrupamiento ya existe',
          type: 'error',
        });
      } else {
        this.createPuntosAgrupacion(data.text());
        this.LoadAgrupacion();
        Swal.fire({
          title: 'Agrupacion Creada',
          text: 'Proceso se realizó de manera Exitosa',
          type: 'success',
        });
      }
    });
  }

  createPuntosAgrupacion(idAgrupacion) {
    const agrupacion = {
      puntos: []
    };
    console.log(this.DataJsonPuntosSel);

    for (const key of this.DataJsonPuntosSel) {
      agrupacion.puntos.push(
        {
          'agrupamiento': {
            'id': idAgrupacion
          },
          'punto': {
            'id': key.id
          }
        });
    }

    this.agrupamientoService.createPuntosAgrupacion(agrupacion.puntos).subscribe(res => {
      console.log(res);
    });
  }

  bindingDataModificar(datos) {
    this.DataEditAgrupacion = datos;
    this.DataEditAgrupacion.nombre_agrupacion = datos.nombre;
    this.onChangeAll(false);
    this.LoadPuntosAgrupacion(this.DataEditAgrupacion.id);
  }

  LoadPuntosAgrupacion(id) {
    this.agrupamientoService.findPuntosAgrupacionByAgrupamiento(id).subscribe(
      res => {
      console.log(res);
      this.DataArrayPuntosAgrupacion = res;
      for (const key of this.DataArrayPuntosAgrupacion) {
        const existe = this.DataJsonPuntos.filter(x => x.id === key.idPunto);
        if (existe.length >= 1) {
          for (const key2 of existe) {
            this.onChange(key2, true);
            // key2.checked = true;
          }
        }
      }
      }
    );
  }


  onSubmitModificar(datosAgrupacion) {
    const postData = {
      'id': datosAgrupacion.id,
      'nombre': datosAgrupacion.nombre_agrupacion,
      'creadoPor': datosAgrupacion.creadoPor,
      'fechaCreacion': datosAgrupacion.fechaCreacion + 'T00:00:00',
      'estado': datosAgrupacion.estado
    };

    this.agrupamientoService.updateAgrupamiento(postData).subscribe(data => {
      if (data.text() === 'error') {
        Swal.fire({
          title: 'Agrupacion No Creada',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      } else if (data.text() === 'No pudo ser modificado el agrupamiento el nombre ya existe para el cliente') {
        Swal.fire({
          title: 'Agrupacion No Creada',
          text: 'El nombre del agrupamiento ya existe',
          type: 'error',
        });
      } else {
        this.updatePuntosAgrupacion(datosAgrupacion.id);
        this.LoadAgrupacion();
        Swal.fire({
          title: 'Agrupacion Modificada',
          text: 'Proceso se realizó de manera Exitosa',
          type: 'success',
        });
      }
    });
  }

  updatePuntosAgrupacion(idAgrupacion) {
    const agrupacion = {
      puntos: []
    };
    console.log(this.DataJsonPuntosSel);

    for (const key of this.DataJsonPuntosSel) {
      agrupacion.puntos.push(
        {
          'agrupamiento': {
            'id': idAgrupacion
          },
          'punto': {
            'id': key.id
          }
        });
    }

    this.agrupamientoService.updatePuntosAgrupacion(agrupacion.puntos, idAgrupacion).subscribe(res => {
      console.log(res);
    });
  }

  LimpiarFormAgrupacion() {
    this.agrupacionForm.reset();
    this.onChangeAll(false);
  }

}
