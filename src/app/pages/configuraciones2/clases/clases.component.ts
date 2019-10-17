import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClasesService } from './clases.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ClasesService, SidebarComponent]
})
export class ClasesComponent implements OnInit {
  DataArray: any = [];
  DataJson: any = [];
  p:number=1;
  DataArrayClases: any = [];
  DataNew: any = [];
  DataModificar: any = [];
  DataClientes: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  noHayRegistros = false;
  error: any;
  idInactivar: any;
  nombreInactivar: any;
  checkedAll: boolean;
  paraVenta = false;
  paraInven = false;
  itempageTClases = 5;
  searchStringTClases: any;
  tipo: any;
  fechaCre: any;

  idClase: any;
  nombreClase: any;
  tipoClase: any;
  creado: any;
  idCliente: any;
  Clase: any;
  DataNewClase: any = [];


  @ViewChild('clasesForm',{static:true})
  private clasesForm: NgForm;

  constructor(public router: Router,
    public SidebarComponent: SidebarComponent,
    public clasesService: ClasesService, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.DataNewClase.paraVenta = true;
    this.DataNewClase.paraInven = true;
    this.LoadTabla = false;

  }

  ngOnInit() {
    this.LoadClases();
    this.idCliente = localStorage.getItem('creadoPor');
    this.checkedAll = false;
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadClases() {
    this.clasesService.getClasesCliente().subscribe(
      data => {
        console.log(data);
        this.DataArray = data;
        if (this.DataArray.length !== 0) {
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

  CrearClase(datosClase) {

    let tipo;
    if (datosClase.paraVenta === true && datosClase.paraInven === true) {
      tipo = 3; // Ambos

    } else if (datosClase.paraVenta === true && datosClase.paraInven === false) {
      tipo = 1; // Ventas

    } else if (datosClase.paraVenta === false && datosClase.paraInven === true) {
      tipo = 2; // Inventarios

    }
    this.DataNew = {
      'nombre': datosClase.clase,
      'tipo': tipo
    };

    this.clasesService.createClase(this.DataNew).subscribe(
      data => {
        if (data.text() === 'La clase ya existe para el cliente') {
          Swal.fire({
            title: 'Clase',
            text: 'No se ha podido crear la clase, ya existe en BD',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Clase',
            text: 'La clase ha sido creada con exito',
            type: 'success',
          });
          this.LoadClases();
          this.LimpiarFormularioClases();
        }
      }
    );
  }

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.clasesService.putInactivarClases(id).subscribe();
    Swal.fire({
      title: 'clase inactivada',
      text: 'Proceso realizado de manera Exitosa, la clase ' + nombre + 'fue inactivada',
      type: 'success',
    });

    for (let i = 0; i < this.DataArray.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataArray[i].id, 0)) {

        index = this.DataArray.indexOf(this.DataArray[i]);
        this.DataArray.splice(index, 1);

      }
    }
  }

  bindingDataModificar(data) {
    this.idClase = data.id;
    this.nombreClase = data.nombre;
    this.tipoClase = data.tipo;
    this.fechaCre = data.fecha_creacion;
    this.creado = data.creado_por;

    if (this.tipoClase == 1) {
      this.paraVenta = true;
      this.paraInven = false;

    } else if (this.tipoClase == 2) {
      this.paraVenta = false;
      this.paraInven = true;

    } else if (this.tipoClase == 3) {
      this.paraVenta = true;
      this.paraInven = true;

    } else {
      this.paraVenta = false;
      this.paraInven = false;
    }
  }

  onSubmitModificar(nombreClase, paraVenta, paraInven) {
    if (paraVenta == true) {
      this.tipo = 1;
    } else if (paraInven == true) {
      this.tipo = 2;

    } else {
      this.tipo = 0;
    }

    if (paraVenta === true && paraInven === true) {
      this.tipo = 3;
    }

    this.postDatos = {
      'id': this.idClase,
      'nombre': nombreClase,
      'estado': true,
      'tipo': this.tipo,
      'fechaCreacion': this.fechaCre
    };
    this.clasesService.updateClase(this.postDatos).subscribe(
      data => {
        if (data.text() === 'Se modifico la clase con exito') {
          Swal.fire({
            title: 'Clase Modificada',
            text: data.text(),
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Clase No Modificada',
            text: data.text(),
            type: 'error',
          });
        }
        this.LoadClases();
      }
    );
  }

  LimpiarFormularioClases() {
    this.clasesForm.reset();
    this.setClases();
  }

  setClases() {
    this.DataNewClase.paraVenta = true;
    this.DataNewClase.paraInven = true;
  }


}
