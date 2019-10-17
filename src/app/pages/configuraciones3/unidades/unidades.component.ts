import {Component, OnInit, ViewChild} from '@angular/core';
import {UnidadesService} from './unidades.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [UnidadesService, SidebarComponent]
})
export class UnidadesComponent implements OnInit {
  p:number=1;
  searchStringTUnidad: any;
  itempageTUnidad = 5;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;

  DataArrayUnidades: any = [];
  DataJsonUnidades: any = [];
  DataNewUnidad: any = [];

  DataEditUnidad: any = [];
  id_cliente: any;
  noHayRegistros = false;

  @ViewChild('unidadForm', {static: true})
  private unidadForm: NgForm;

  constructor(
    public router: Router,
    public sidebarComponent: SidebarComponent,
    public unidadesService: UnidadesService, public toastr: ToastrService) {
    console.log('ConstructorUnidades');
    this.loader = true;
    this.id_cliente = localStorage.getItem('cli');
    /* this.DataNewUnidad.inventario = false;
    this.DataNewUnidad.altinventario = false;
    this.DataNewUnidad.venta = false;
    this.DataNewUnidad.altventa = false;
    this.DataNewUnidad.compra = false;
    console.log(this.DataNewUnidad); */
  }

  ngOnInit() {
    this.LoadUnidades();
  }

  LoadUnidades() {

    this.unidadesService.getUnidades().subscribe(
      data => {
        console.log(data);
        this.DataArrayUnidades = data;
        this.DataJsonUnidades = [];
        if (this.DataArrayUnidades.length !== 0) {

          for (const key of this.DataArrayUnidades) {
            if (key.id !== 0) {
              this.DataJsonUnidades.push({
                id: key.id,
                codigo: key.codigo,
                nombre: key.nombre,
                abreviatura: key.abreviatura,
                idCliente: key.id_cliente,
                inventario: key.inventario,
                alternaInventario: key.alternaInventario,
                venta: key.venta,
                alternaVenta: key.alternaVenta,
                compra: key.compra
              });
            }
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

  CrearUnidad(datosUnidad) {
    console.log(datosUnidad);
    const DataNewUnidadCompra = {
      nombre: datosUnidad.nombre,
      abreviatura: datosUnidad.abreviatura,
      inventario: datosUnidad.inventario,
      alternaInventario: datosUnidad.altinventario,
      venta: datosUnidad.venta,
      alternaVenta: datosUnidad.altventa,
      compra: datosUnidad.compra
    };
    this.unidadesService.createUnidad(DataNewUnidadCompra).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'No se pudo crear la unidad') {
          Swal.fire({
            title: 'Unidad',
            text: 'No se ha podido crear la unidad',
            type: 'error'
          });
        } else if (data.text() === 'La abreviatura ya existe para otra unidad') {
          Swal.fire({
            title: 'Unidad',
            text: 'La abreviatura ya existe para otra unidad',
            type: 'error'
          });
        } else if (data.text() === 'Error consultando la abreviatura') {
          Swal.fire({
            title: 'Unidad',
            text: 'Error consultando la abreviatura',
            type: 'error'
          });
        } else if (data.text() === 'La unidad ya existe') {
          Swal.fire({
            title: 'Unidad',
            text: 'La unidad ya existe',
            type: 'error'
          });
        } else if (data.text() === 'Error consultando la unidad') {
          Swal.fire({
            title: 'Unidad',
            text: 'Error consultando la unidad',
            type: 'error'
          });
        } else {
          Swal.fire({
            title: 'Unidad',
            text: 'La unidad ha sido creada con exito',
            type: 'success',
          });
          this.LoadUnidades();
          this.LimpiarFormularioUnidad();
        }
      }
    );
  }

  LimpiarFormularioUnidad() {
    this.unidadForm.reset();
    this.DataNewUnidad.inventario = false;
    this.DataNewUnidad.altinventario = false;
    this.DataNewUnidad.venta = false;
    this.DataNewUnidad.altventa = false;
    this.DataNewUnidad.compra = false;
  }

  bindingDataModificar(datosUnidad) {
    this.DataEditUnidad = datosUnidad;
    this.DataEditUnidad.nombreUnidad = datosUnidad.nombre;
    this.DataEditUnidad.abreviaturaUnidad = datosUnidad.abreviatura;
    console.log(this.DataEditUnidad);
  }

  onSubmitModificar(datosUnidad) {
    console.log(datosUnidad);
    const DataEditUnidadCompra = {
      id: datosUnidad.id,
      codigo: datosUnidad.codigo,
      nombre: datosUnidad.nombreUnidad,
      abreviatura: datosUnidad.abreviaturaUnidad,
      inventario: datosUnidad.inventario,
      alternaInventario: datosUnidad.alternaInventario,
      venta: datosUnidad.venta,
      alternaVenta: datosUnidad.alternaVenta,
      compra: datosUnidad.compra
    };
    this.unidadesService.updateUnidad(DataEditUnidadCompra).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'No se ha podido modificar la unidad') {
          Swal.fire({
            title: 'Unidad',
            text: 'No se ha podido modificar la unidad',
            type: 'error'
          });
          // this.LoadUnidades();
        } else if (data.text() === 'La abreviatura ya existe') {
          Swal.fire({
            title: 'Unidad',
            text: 'La abreviatura ya existe para otra Unidad',
            type: 'error',
          });
          // this.LoadUnidades();
        } else if (data.text() === 'El nombre ya existe') {
          Swal.fire({
            title: 'Unidad',
            text: 'El nombre de la Unidad ya existe',
            type: 'error',
          });
          // this.LoadUnidades();
        } else if (data.text() === 'Se modifico la unidad con exito') {
          Swal.fire({
            title: 'Unidad',
            text: 'La unidad ha sido modificada con exito',
            type: 'success',
          });
          // this.LoadUnidades();
        }
        this.LoadUnidades();
      }
    );
  }
}
