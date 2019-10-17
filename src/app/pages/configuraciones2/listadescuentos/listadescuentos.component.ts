import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ListadescuentosService} from './listadescuentos.service';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';


@Component({
  selector: 'app-listadescuentos',
  templateUrl: './listadescuentos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ListadescuentosService,SidebarComponent]
})
export class ListadescuentosComponent implements OnInit {
  p:number=1;
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  lisDescuentosArray: any = [];
  DataDescuento: any = [];
  DataDescuentoNew: any = [];
  postDatosDescuento: any = [];
  DataDescuentoInactivo: any = [];
  itempageLista = 5;
  searchStringLista: any;
  noHayRegistros = false;
  DataJson: any = [];


  @ViewChild('descForm', {static: true})
  public descForm: NgForm;

  @ViewChild('descUpForm', {static: true})
  public descUpForm: NgForm;

  constructor(
    public listadescuentos: ListadescuentosService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.DataJson = [];
  }

  ngOnInit() {
    this.loadDescuentos();
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loadDescuentos() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
    this.listadescuentos.findDescuentos().subscribe(
      data => {
        this.lisDescuentosArray = data;
        if (this.lisDescuentosArray.length !== 0) {
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
    console.log(this.DataJson);

  }

  bindingDataInactivar(data) {
    this.DataDescuentoInactivo.idInac = data.id;
    this.DataDescuentoInactivo.porcentajeInac = data.porcentaje;
    this.DataDescuentoInactivo.nombreInac = data.nombre;
  }

  Inactivar(id, nombre) {
    this.listadescuentos.putActivarDescativarDescuentos(id).subscribe();
    Swal.fire({
      title: 'Descuento inactivado',
      text: 'Proceso realizado de manera Exitosa, el Descuento ' + nombre + ' fue inactivado',
      type: 'success',
    });

    for (let i = 0; i < this.lisDescuentosArray.length; i++) {
      let index;
      if (id === this.lisDescuentosArray[i].id) {
        index = this.lisDescuentosArray.indexOf(this.lisDescuentosArray[i]);
        this.lisDescuentosArray.splice(index, 1);
      }
    }
  }

  bindingDataModificar(data) {
    this.DataDescuentoNew.idnew = data.id;
    this.DataDescuentoNew.codnew = data.codigo;
    this.DataDescuentoNew.nombrenew = data.nombre;
    this.DataDescuentoNew.porcentajenew = data.porcentaje;
    this.DataDescuentoNew.estadonew = data.estado;
    /* this.DataDescuentoNew.descripcionnew=data.descripcion; */
    if (data.addDescripcion === true) {
      this.DataDescuentoNew.addDescnew = 1;
    } else {
      this.DataDescuentoNew.addDescnew = 2;
    }

  }

  LimpiarFormDescuento() {
    this.descForm.reset();
  }

  onSubmitDesc(dataDescuentoCreate) {

    if (dataDescuentoCreate.addDesc === 1) {
      dataDescuentoCreate.addDesc = true;
    } else {
      dataDescuentoCreate.addDesc = false;
    }

    /* if (dataDescuentoCreate.descripcion === undefined) {
      dataDescuentoCreate.descripcion = dataDescuentoCreate.descripcion;
    } */

    this.postDatosDescuento = {
      codigo: dataDescuentoCreate.codigo,
      nombre: dataDescuentoCreate.nombre,
      porcentaje: dataDescuentoCreate.porcentaje,
      addDescripcion: dataDescuentoCreate.addDesc,
      descripcion: ''
    };

    this.listadescuentos.createDescuentos(this.postDatosDescuento).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'error') {
          Swal.fire({
            title: 'No se pudo crear el descuento',
            text: 'El descuento no pudo ser creado',
            type: 'error',
          });
        } else if (data.text() === 'el nombre ya existe') {
          Swal.fire({
            title: 'No se pudo modificar el descuento',
            text: 'El nombre ya existe no pudo ser modificado',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Descuento creado con exito',
            text: 'Descuento creado con exito',
            type: 'success',
          });
          this.loadDescuentos();
        }
      }
    );

  }


  onSubmitUpdateDesc(dataDescuentoUpdate) {

    if (dataDescuentoUpdate.addDescnew === 1) {
      dataDescuentoUpdate.addDescnew = dataDescuentoUpdate.addDescnew;
    } else {
      dataDescuentoUpdate.addDescnew = false;
      dataDescuentoUpdate.descripcionnew = '';
    }

    this.postDatosDescuento = {
      id: dataDescuentoUpdate.idnew,
      codigo: dataDescuentoUpdate.codnew,
      nombre: dataDescuentoUpdate.nombrenew,
      porcentaje: dataDescuentoUpdate.porcentajenew,
      addDescripcion: dataDescuentoUpdate.addDescnew,
      descripcion: '',
      estado: dataDescuentoUpdate.estadonew
    };

    this.listadescuentos.updateDescuentos(this.postDatosDescuento).subscribe(
      data => {
        if (data.text() === 'error') {
          Swal.fire({
            title: 'No se pudo modificar el descuento',
            text: 'El descuento no pudo ser modificado',
            type: 'error',
          });
        } else if (data.text() === 'el nombre ya existe') {
          Swal.fire({
            title: 'No se pudo modificar el descuento',
            text: 'El nombre ya existe no pudo ser modificado',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Descuento modificado con exito',
            text: 'Descuento modificado con exito',
            type: 'success',
          });
          this.loadDescuentos();
        }
      }
    );
  }
}
