import {Component, OnInit, ViewChild} from '@angular/core';
import {TablaconversionService} from './tablaconversion.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-tablaconversion',
  templateUrl: './tablaconversion.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [TablaconversionService, SidebarComponent]
})
export class TablaconversionComponent implements OnInit {
  p:number=1;
  idUnidad: any;
  nombreUnidad: any;
  searchString: any;
  itempage = 5;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;

  DataArrayConversion: any = [];
  DataJsonConversion: any = [];
  DataNewConversion: any = [];

  DataEditConversion: any = [];
  DataArrayUnidad: any = [];
  id_cliente: any;
  noHayRegistros = false;

  @ViewChild('conversionForm', {static: true})
  private conversionForm: NgForm;

  @ViewChild('conversionEditForm', {static: true})
  private conversionEditForm: NgForm;

  constructor(
    public router: Router,
    public sidebarComponent: SidebarComponent,
    private route: ActivatedRoute,
    public tablaconversionService: TablaconversionService, public toastr: ToastrService) {
    this.loader = true;
    this.id_cliente = localStorage.getItem('cli');
    this.idUnidad = this.route.snapshot.params.idUnidad;
    this.nombreUnidad = this.route.snapshot.params.nombreUnidad;
    this.DataNewConversion.idUnidad = this.route.snapshot.params.idUnidad;
    this.DataNewConversion.nombreUnidad = this.route.snapshot.params.nombreUnidad;
  }

  ngOnInit() {
    this.LoadConversiones(this.idUnidad);
    this.LoadUnidades();
  }

  LoadConversiones(idUnidad) {
    this.tablaconversionService.getConversiones(idUnidad).subscribe(
      data => {
        console.log(data);
        this.DataArrayConversion = data;
        this.DataJsonConversion = [];
        if (this.DataArrayConversion.length !== 0) {
          for (const key of this.DataArrayConversion) {
            this.DataJsonConversion.push({
              cantidad_compra: key.cantidad_compra,
              cantidad_kardex: key.cantidad_kardex,
              id: key.id,
              idCliente: key.idCliente,
              id_unidad_compra: key.id_unidad_compra,
              id_unidad_kardex: key.id_unidad_kardex,
              nombre_unidad_compra: key.nombre_unidad_compra,
              nombre_unidad_kardex: key.nombre_unidad_kardex,
              operando: key.operando
            });
          }
          console.table(this.DataJsonConversion);
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

  LoadUnidades() {
    this.tablaconversionService.getUnidadesCliente().subscribe(
      data => {
        console.log(data);
        this.DataArrayUnidad = data;

      }
    );
  }

  setUnidades() {
    this.DataNewConversion.unidadConversion = '';
    this.DataNewConversion.nombreUniConversion = '';
    this.DataEditConversion.id_und_compra = '';
    this.DataEditConversion.nom_unidad_compra = '';
  }

  bindingConversion(idUnidadConversion) {
    this.DataNewConversion.nombreUniConversion = this.DataArrayUnidad.filter(x => parseInt(x.id, 0) === parseInt(idUnidadConversion, 0))[0].nombre;
  }

  CrearConversion(datos) {
    const articuloinv = {
      tblConversion: []
    };
    articuloinv.tblConversion.push({
      unidadByIdUnidadKardex: {
        id: datos.idUnidad
      },
      cantidadKardex: datos.cantidad,
      unidadByIdUnidadCompra: {
        id: datos.unidadConversion
      },
      /* operando: datos.factor, */
      cantidadCompra: datos.cantConversion
    });


    this.tablaconversionService.createTablaConversion(articuloinv.tblConversion).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'No se ha podido crear la conversion') {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido crear la conversion',
            type: 'error',
          });
        } else if (data.text() === 'Error') {
          Swal.fire({
            title: 'Error',
            text: 'Error realizando el proceso',
            type: 'error',
          });
        } else if (data.text() === 'Error al consultar la conversion') {
          Swal.fire({
            title: 'Error',
            text: 'Error al consultar la conversion',
            type: 'error',
          });
        } else if (data.text() === 'Ya existe una conversion con estas unidades') {
          Swal.fire({
            title: 'Error',
            text: 'Ya existe una conversion con estas unidades',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Exitoso',
            text: 'Se creo conversion correctamente',
            type: 'success',
          });
          this.LoadConversiones(this.idUnidad);
        }
        this.LoadConversiones(this.idUnidad);
      }
    );
  }

  LimpiarFormularioTablaConversion() {
    this.conversionForm.reset();
  }

  bindingDataModificar(datosConversion) {
    console.log(datosConversion);
    this.DataEditConversion = datosConversion;
    this.DataEditConversion.cantidad = datosConversion.cantidad_kardex;
    this.DataEditConversion.cantidadConversion = datosConversion.cantidad_compra;
    this.DataEditConversion.id_und_compra = datosConversion.id_unidad_compra;
    this.DataEditConversion.nom_unidad_compra = datosConversion.nombre_unidad_compra;
    // this.LoadUnidadesTipo(this.DataEditConversion.tipo);

  }

  bindingConversionEdit(idUnidadConversion) {
    this.DataEditConversion.nom_unidad_compra = this.DataArrayUnidad.filter(x => parseInt(x.id, 0) === parseInt(idUnidadConversion, 0))[0].nombre;
  }

  onSubmitModificar(datos) {
    console.log(datos);
    const postData = {
      id: datos.id,
      unidadByIdUnidadKardex: {
        id: datos.id_unidad_kardex
      },
      cantidadKardex: datos.cantidad,
      unidadByIdUnidadCompra: {
        id: datos.id_und_compra
      },
      /* operando: datos.operando, */
      cantidadCompra: datos.cantidadConversion
    };

    this.tablaconversionService.updateTablaConversion(postData).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'No se ha podido modificar la conversion') {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido modificar la conversion',
            type: 'error',
          });
        } else if (data.text() === 'existe otra coversion con las mismas unidades') {
          Swal.fire({
            title: 'Error',
            text: 'Ya existe una coversión con las mismas unidades',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Exitoso',
            text: 'Se modifico la conversion correctamente',
            type: 'success',
          });
          this.LoadConversiones(this.idUnidad);
        }
        this.LoadConversiones(this.idUnidad);
      }
    );
  }
}
