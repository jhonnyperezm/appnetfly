import {Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IMyDpOptions, IMyMarkedDate, IMySelector} from 'mydatepicker';
import {ModificarproveedorService} from './modificarproveedor.service';
import {RutasService} from '../../../services/rutas.service';
import Swal from 'sweetalert2';

const PADDING = '000000';
declare const $;

@Component({
  selector: 'app-modificarproveedor',
  templateUrl: './modificarproveedor.component.html',
  styleUrls: ['../../estilosgeneral.css']
})
export class ModificarproveedorComponent implements OnInit {

  idProveedor: any;
  nombreProveedor: any;

  artsel:number=1;
  DataArrayProveedor: any = [];
  DataJsonProveedor: any = [];
  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  DataArrayContactos: any = [];
  DataNewContacto: any = [];
  ListaContactos: any = [];
  DataArrayArticulosProv: any = [];
  DataNewArticulo: any = [];
  DataArrayArticulosSeleccionados: any = [];

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  direccion2: any;
  variable: any;
  bis = false;
  btn_agregar: boolean;
  btn_actualizar: boolean;

  DataArrayArticulos: any = [];
  ListaImpuestos: any = [];
  ListaTarifas: any = [];
  searchStringArt: any;
  itempageArt = 5;
  searchStringArtSel: any;
  itempageArtSel = 5;

  idArtEliminar: any;
  nombreArtEliminar: any;
  indextablaArt: any;
  idArticuloInventario: any;
  ListaUnidadesCompra: any = [];
  DataArrayArticulosPrincipal: any = [];

  descripcion: any;
  senas: any;
  cuadrante2: any;
  placa: any;
  letra2: any;
  numero2: any;
  cuadrante: any;
  letra: any;
  numero: any;
  via: any;
  art: any;

  @ViewChild('proveedorForm', {static: true})
  private proveedorForm: NgForm;

  @ViewChild('proveedorArtForm', {static: true})
  private proveedorArtForm: NgForm;

  // Initialized to specific date (09.10.2018).
  private selectedDateNormal: any = '';
  private selectedDateNormal2: any = '';
  private selectedTextNormal: any = '';
  private selectedTextNormal2: any = '';
  private dateformat1 = '';
  private border = 'none';
  private placeholder = 'Select date';
  private disabled = false;
  private selector: IMySelector = {
    open: false
  };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Today',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    markCurrentDay: true,
    height: '34px',
    width: '100%',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    indicateInvalidDate: true,
    monthSelector: true,
    yearSelector: true,
    minYear: 1970,
    maxYear: 2200,
    componentDisabled: false,
    showClearDateBtn: true,
    showDecreaseDateBtn: false,
    showIncreaseDateBtn: false,
    showSelectorArrow: true,
    showInputField: true,
    openSelectorOnInputClick: true,
    disableHeaderButtons: true,
    showWeekNumbers: false,
    markDates: [],
    satHighlight: false,
    highlightDates: [],
    markWeekends: {} as IMyMarkedDate,
    allowDeselectDate: true,
    disableWeekdays: []
  };

  constructor(public router: Router,
              public toastr: ToastrService,
              public modificarproveedorService: ModificarproveedorService,
              vcr: ViewContainerRef,
              public rutasService: RutasService,
              private route: ActivatedRoute) {
    console.log('router', this.route.snapshot.params);
    this.idProveedor = this.route.snapshot.params.idProveedor;
    this.nombreProveedor = this.route.snapshot.params.nombreProveedor;
  }

  ngOnInit() {
    console.log('idproveedor', this.idProveedor);
    this.LoadProveedorData(this.idProveedor);
    this.LoadContactosProveedorData(this.idProveedor);
    this.LoadArticulosProveedorData(this.idProveedor);
    this.loadPaises();
    this.LoadImpuestos();
    this.btn_agregar = true;
    this.btn_actualizar = false;
  }

  Regresar() {
    this.router.navigate(['compras/proveedores']);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadProveedorData(idProveedor) {
    console.log('provedoridllega', idProveedor);
    this.modificarproveedorService.getProveedor(idProveedor).subscribe(
      data => {
        this.DataArrayProveedor = data;
        this.DataJsonProveedor = this.DataArrayProveedor[0];

        this.DataJsonProveedor.documento = this.DataJsonProveedor.nit;
        if (this.DataJsonProveedor.tipo_doc === 1) {
          const separador = '-',
            arregloDeSubCadenas = this.DataJsonProveedor.nit.split(separador);
          this.DataJsonProveedor.nit = arregloDeSubCadenas[0];
          this.DataJsonProveedor.digito = arregloDeSubCadenas[1];
        } else {
          this.DataJsonProveedor.cedula = this.DataJsonProveedor.nit;
        }
        if (this.DataJsonProveedor.asignar_articulo === false) {
          this.DataJsonProveedor.asignar_articulo = '0';
        } else if (this.DataJsonProveedor.asignar_articulo === true) {
          this.DataJsonProveedor.asignar_articulo = '1';
        }
        this.descripcion = this.DataJsonProveedor.direccion;
        this.loadDepartamento(this.DataJsonProveedor.id_pais);
        this.loadMunicipio(this.DataJsonProveedor.id_departamento);
      }
    );
  }

  LoadContactosProveedorData(idProveedor) {
    this.modificarproveedorService.getContactosProveedor(idProveedor).subscribe(
      data => {
        this.ListaContactos = data;
      }
    );
  }


  LoadArticulosProveedorData(idProveedor) {
    this.modificarproveedorService.getArticulosProveedor(idProveedor).subscribe(
      data => {
        this.DataArrayArticulosProv = data;
        this.DataArrayArticulosSeleccionados = [];

        for (const key of this.DataArrayArticulosProv) {
          if ((key.fecha_inicial === undefined && key.fecha_final === undefined) ||
            (key.fecha_inicial === null && key.fecha_final === null)) {
            key.rango_fechas = '2';
            key.fecha_inicial = '';
            key.fecha_final = '';
          } else {
            const separadorfi = 'T',
              fechaIniSinHora = key.fecha_inicial.split(separadorfi);
            const separadorff = 'T',
              fechaFinSinHora = key.fecha_final.split(separadorff);

            key.rango_fechas = '1';
            key.fecha_inicial = fechaIniSinHora[0];
            key.fecha_final = fechaFinSinHora[0];
          }
          if ((key.id_impuesto === undefined) || (key.id_impuesto === null)) {
            key.id_impuesto = '';
          }
          if ((key.id_tarifa === undefined) || (key.id_tarifa === null)) {
            key.id_tarifa = '';
          }

          this.DataArrayArticulosSeleccionados.push({
            id: key.id,
            idArticulo: key.id_articulo,
            nombreArticulo: key.nombre,
            idUnidad: key.id_unidad_compra,
            unidad: key.nombre_unidad_compra,
            acuerdoNegocio: key.acuerdo_negocio,
            rango_fechas: key.rango_fechas,
            valorNegociado: key.valor_negociado,
            fechaInicial: key.fecha_inicial,
            fechaFinal: key.fecha_final,
            idproveedor: key.id_proveedor,
            incluyeImpuestos: key.incluye_impuesto,
            idImpuesto: key.id_impuesto,
            nombreImpuesto: key.nombre_impuesto,
            idTarifa: key.id_tarifa,
            valortarifa: key.valor_tarifa
          });
        }
      }
    );
  }

  colocarPuntos(value: number | string, fractionSize: number = 2): string {
    let [integer, fraction = ''] = (value || '').toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : '';

    integer = integer.replace(/\./g, '');
    integer = integer.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    integer = integer.split('').reverse().join('').replace(/^[\.]/, '');

    this.DataJsonProveedor.nit = integer;
    return integer;
  }

  calcularDigito(numero) {
    const separador = '.', // un espacio en blanco
      arregloDeSubCadenas = numero.split(separador);
    let cadena;
    for (let i = 0; i < arregloDeSubCadenas.length; i++) {
      if (cadena === undefined || cadena === null) {
        cadena = arregloDeSubCadenas[i];
      } else {
        cadena += arregloDeSubCadenas[i];
      }
    }
    const separador2 = '', // un espacio en blanco
      arregloDeSubCadenas2 = cadena.split(separador2);

    let Temp;
    let Residuo;
    let Acumulador;

    const Vector = [];
    Vector[0] = 3;
    Vector[1] = 7;
    Vector[2] = 13;
    Vector[3] = 17;
    Vector[4] = 19;
    Vector[5] = 23;
    Vector[6] = 29;
    Vector[7] = 37;
    Vector[8] = 41;
    Vector[9] = 43;
    Vector[10] = 47;
    Vector[11] = 53;
    Vector[12] = 59;
    Vector[13] = 67;
    Vector[14] = 71;

    Acumulador = 0;

    Residuo = 0;

    for (let i = 0; i < arregloDeSubCadenas2.length; i++) {
      Temp = arregloDeSubCadenas2[(arregloDeSubCadenas2.length - 1) - i];
      Acumulador = Acumulador + (Temp * Vector[i]);
    }

    Residuo = Acumulador % 11;
    if (Residuo > 1) {
      this.DataJsonProveedor.digito = (11 - Residuo);
    } else {
      this.DataJsonProveedor.digito = Residuo;
    }
    if (this.DataJsonProveedor.digito === 0) {
      this.DataJsonProveedor.digito = '0';
    }
  }

  GuardarDocumento(datosProveedor) {
    if (datosProveedor.tipodoc === '1') {
      this.DataJsonProveedor.documento = datosProveedor.nit + '-' + datosProveedor.digito;
    } else {
      this.DataJsonProveedor.documento = datosProveedor.cedula;
    }
  }

  loadPaises() {
    this.modificarproveedorService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.modificarproveedorService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    if (idDepartamento !== '' && idDepartamento !== null && idDepartamento !== undefined) {
      this.modificarproveedorService.getMunicipios(idDepartamento).subscribe(
        data => {
          this.DataArrayMunicipios = data;
        });
    }
  }

  focusDireccion() {
    $('#MyModal').modal({backdrop: 'static'});
  }

  GuardarDireccion(via, numero, bis, letra, cuadrante, numero2, letra2, placa, cuadrante2, senas, descripcion) {

    if (parseInt(this.direccion2, 0) === 1) {
      if (bis === true) {
        this.variable = 'bis';
      } else {
        this.variable = '';
      }
      if (letra === undefined) {

        letra = '';
      }
      if (cuadrante === undefined) {

        cuadrante = '';
      }
      if (letra2 === undefined) {

        letra2 = '';
      }
      if (cuadrante2 === undefined) {

        cuadrante2 = '';
      }
      if (senas === undefined) {

        senas = '';
      }
      this.DataJsonProveedor.direccion = via + ' ' + numero + ' ' + this.variable + ' ' + letra + ' ' + cuadrante + ' #' +
        numero2 + letra2 + '-' + placa + ' ' + cuadrante2 + ' ' + senas;
    } else if (parseInt(this.direccion2, 0) === 2) {
      this.DataJsonProveedor.direccion = descripcion;
    }
  }

  ValidationEmailContact(tipo, idcontacto, datosContacto) {
    if (datosContacto.correo_contacto === '' && datosContacto.cargo_contacto !== '') {
      if (tipo === 'agregar') {
        this.AgregarContacto(datosContacto);
      } else {
        this.ActualizarContacto(idcontacto, datosContacto);
      }
    } else {
      if (datosContacto.correo_contacto !== undefined) {
        let regexp = /[@]/gi;
        let found = datosContacto.correo_contacto.match(regexp);
        let correo = datosContacto.correo_contacto.split('@', 2);
      }
      /* while (this.correo_contacto != undefined && found == null) {
        // return this.toastr.warning(this.alertas.verifiquecorreo);
        return setTimeout(() => this.toastr.warning(this.alertas.verifiquecorreo));
      }
      while (this.correo_contacto != undefined && !(correo[1].length > 3)) {
        // return this.toastr.warning(this.alertas.verifiquecorreo);
        return setTimeout(() => this.toastr.warning(this.alertas.verifiquecorreo));
      } */
      if (tipo === 'agregar') {
        this.AgregarContacto(datosContacto);
      } else {
        this.ActualizarContacto(idcontacto, datosContacto);
      }
    }
  }

  AgregarContacto(datosContacto) {
    if (datosContacto.cargo_contacto === undefined || datosContacto.cargo_contacto === '') {
      datosContacto.cargo_contacto = 'N/A';
    }
    if (datosContacto.correo_contacto === undefined || datosContacto.correo_contacto === '') {
      datosContacto.correo_contacto = 'N/A';
    }

    this.ListaContactos.push(
      {
        id: this.ListaContactos.length + 1,
        nombre: datosContacto.nombre_contacto,
        cargo: datosContacto.cargo_contacto,
        telefono: datosContacto.telefono_contacto,
        email: datosContacto.correo_contacto
      }
    );
    this.LimpiarContacto();
  }

  EditarContacto(datosContacto) {
    this.btn_agregar = false;
    this.btn_actualizar = true;
    this.DataNewContacto.idcontacto = datosContacto.id;
    this.DataNewContacto.nombre_contacto = datosContacto.nombre;
    this.DataNewContacto.cargo_contacto = datosContacto.cargo;
    this.DataNewContacto.telefono_contacto = datosContacto.telefono;
    this.DataNewContacto.correo_contacto = datosContacto.email;
  }

  ActualizarContacto(id, datosContacto) {
    this.ListaContactos = this.ListaContactos.filter(x => x.id !== id);
    if (datosContacto.cargo_contacto === undefined || datosContacto.cargo_contacto === '') {
      datosContacto.cargo_contacto = 'N/A';
    }
    if (datosContacto.correo_contacto === undefined || datosContacto.correo_contacto === '') {
      datosContacto.correo_contacto = 'N/A';
    }


    this.ListaContactos.push(
      {
        id: datosContacto.idcontacto,
        nombre: datosContacto.nombre_contacto,
        cargo: datosContacto.cargo_contacto,
        telefono: datosContacto.telefono_contacto,
        email: datosContacto.correo_contacto
      }
    );
    this.LimpiarContacto();
    this.btn_agregar = true;
    this.btn_actualizar = false;
  }

  LimpiarContacto() {
    this.DataNewContacto = [];
  }

  EliminarContacto(index, id) {
    this.ListaContactos.splice(index, 1);
  }

  LoadAllArticulos() {
    this.modificarproveedorService.getArticulosCompras().subscribe(
      data => {
        this.DataArrayArticulosPrincipal = data;
        for (const key of this.DataArrayArticulosPrincipal) {
          this.DataArrayArticulos.push({
            id: key.id_articulo,
            nombre: key.nombre,
            nombre_kardex: key.nombre_unidad
          });
        }
      }
    );
  }

  clickFilaArticulos(id) {
    this.DataNewArticulo.seleccion_articulo = id.toString();
  }

  GuardarArticuloSeleccionado(articulo) {
    this.DataNewArticulo.incluye_impuestos = false;
    this.DataNewArticulo.idArticulo = this.DataArrayArticulos.filter(x => parseInt(x.id, 0) === parseInt(articulo, 0))[0].id;
    this.DataNewArticulo.nombreArticulo = this.DataArrayArticulos.filter(x => parseInt(x.id, 0) === parseInt(articulo, 0))[0].nombre;

    this.LoadArticuloInventario(articulo);
  }

  LoadImpuestos() {
    this.modificarproveedorService.getImpuestosRegimen().subscribe(
      data => {
        this.ListaImpuestos = data;
      }
    );
  }

  LoadArticuloInventario(idArticulo) {

    this.modificarproveedorService.getArticuloInventario(idArticulo).subscribe(
      data => {
        this.idArticuloInventario = data[0].id;
        this.DataNewArticulo.id_unidad_alterna = data[0].id_unidad_alterna;
        this.DataNewArticulo.id_unidad_kardex = data[0].id_unidad_kardex;
        this.DataNewArticulo.nom_unidad_kardex = data[0].nombre_unidad;
        this.LoadUnidadCompra(idArticulo);
      }
    );
  }

  LoadUnidadCompra(idArt) {
    this.modificarproveedorService.getUnidadCompra(idArt).subscribe(
      data => {
        this.ListaUnidadesCompra = data;
      }
    );
  }

  LoadTarifas(idImp) {
    this.DataNewArticulo.nombreImpuesto = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(idImp, 0))[0].nombre_imp;
    const idRegimen = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(idImp, 0))[0].id_regimen;

    this.modificarproveedorService.getImpuestoTarifa(idImp, idRegimen).subscribe(
      data => {
        this.ListaTarifas = data;
      }
    );
  }

  AgregarArticulo(datosArticulo) {
    this.DataNewArticulo.nomUniCompra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(datosArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    const proveedor = {
      articulos: []
    };

    if (datosArticulo.precio_negociado === '0') {
      datosArticulo.valor_negociado = 0;
      datosArticulo.incluye_impuestos = false;
      datosArticulo.rango_fechas = '2';
      datosArticulo.impuesto = null;
      datosArticulo.tarifa = null;
      datosArticulo.fecha_inicial = null;
      datosArticulo.fecha_final = null;
    }
    if (datosArticulo.rango_fechas === '1') {
      datosArticulo.fecha_inicial = datosArticulo.fecha_inicial.formatted + 'T05:00:00-00:00';
      datosArticulo.fecha_final = datosArticulo.fecha_final.formatted + 'T05:00:00-00:00';
    } else if (datosArticulo.rango_fechas === '2' || datosArticulo.rango_fechas === undefined) {
      datosArticulo.fecha_inicial = null;
      datosArticulo.fecha_final = null;
    }
    if (datosArticulo.incluye_impuestos === false) {
      datosArticulo.impuesto = null;
      datosArticulo.tarifa = null;
    }

    this.DataArrayArticulosSeleccionados.push({
      idArticulo: datosArticulo.idArticulo,
      nombreArticulo: datosArticulo.nombreArticulo,
      idUnidad: datosArticulo.id_unidad_compra,
      unidad: datosArticulo.nomUniCompra,
      acuerdoNegocio: datosArticulo.precio_negociado,
      rango_fechas: datosArticulo.rango_fechas,
      valorNegociado: datosArticulo.valor_negociado,
      fechaInicial: datosArticulo.fecha_inicial,
      fechaFinal: datosArticulo.fecha_final,
      incluyeImpuestos: datosArticulo.incluye_impuestos,
      idImpuesto: datosArticulo.impuesto,
      nombreImpuesto: datosArticulo.nombreImpuesto,
      idTarifa: datosArticulo.tarifa,
      valortarifa: datosArticulo.valorTarifa

    });

    this.ClearArticulo();
  }

  ClearArticulo() {
    this.proveedorArtForm.reset();
    this.DataNewArticulo = [];
    this.DataNewArticulo.incluye_impuestos = false;
  }

  EditArticulo(data, index) {
    this.DataNewArticulo.id = data.id;
    this.DataNewArticulo.idArticulo = data.idArticulo;
    this.DataNewArticulo.nombreArticulo = data.nombreArticulo;
    this.DataNewArticulo.id_unidad_compra = data.idUnidad;
    this.DataNewArticulo.nomUniCompra = data.unidad;
    this.GuardarArticuloSeleccionado(this.DataNewArticulo.idArticulo);

    if (data.acuerdoNegocio === true) {
      this.DataNewArticulo.precio_negociado = '1';
    } else if (data.acuerdoNegocio === false) {
      this.DataNewArticulo.precio_negociado = '0';
    } else {
      this.DataNewArticulo.precio_negociado = data.acuerdoNegocio;
    }
    this.DataNewArticulo.rango_fechas = data.rango_fechas;
    this.DataNewArticulo.valor_negociado = data.valorNegociado;
    this.DataNewArticulo.incluye_impuestos = data.incluyeImpuestos;
    if (this.DataNewArticulo.incluye_impuestos === true) {
      this.DataNewArticulo.impuesto = data.idImpuesto;
      this.DataNewArticulo.nombreImpuesto = data.nombreImpuesto;
      this.LoadTarifas(data.idImpuesto);
    } else {
      this.DataNewArticulo.impuesto = '';
      this.DataNewArticulo.nombreImpuesto = '';
    }
    this.DataNewArticulo.tarifa = data.idTarifa;
    this.DataNewArticulo.valortarifa = data.valortarifa; // VALOR TARIFA


    this.DataNewArticulo.fecha_inicial = {
      formatted: data.fechaInicial
    };
    this.DataNewArticulo.fecha_final = {
      formatted: data.fechaFinal
    };
    this.DataNewArticulo.index = index;
    this.btn_agregar = false;
    this.btn_actualizar = true;

  }

  ActualizarArticulo(datosEditArticulo) {
    this.DataNewArticulo.nomUniCompra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(datosEditArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    const proveedor = {
      articulos: []
    };

    if (datosEditArticulo.precio_negociado === '0') {
      datosEditArticulo.valor_negociado = 0;
      datosEditArticulo.incluye_impuestos = false;
      datosEditArticulo.rango_fechas = '2';
      datosEditArticulo.nombreImpuesto = '';
      datosEditArticulo.impuesto = null;
      datosEditArticulo.tarifa = null;
      datosEditArticulo.fecha_inicial = null;
      datosEditArticulo.fecha_final = null;
      datosEditArticulo.valorTarifa = '';
    }
    if (datosEditArticulo.rango_fechas === '1') {
      datosEditArticulo.fecha_inicial = datosEditArticulo.fecha_inicial.formatted;
      datosEditArticulo.fecha_final = datosEditArticulo.fecha_final.formatted;
    } else if (datosEditArticulo.rango_fechas === '2' || datosEditArticulo.rango_fechas === undefined) {
      datosEditArticulo.fecha_inicial = null;
      datosEditArticulo.fecha_final = null;
    }
    if (datosEditArticulo.incluye_impuestos === false) {
      datosEditArticulo.impuesto = null;
      datosEditArticulo.nombreImpuesto = '';
      datosEditArticulo.tarifa = null;
    } else {
      datosEditArticulo.valorTarifa = this.ListaTarifas.filter(x =>
        parseInt(x.id_tarifa, 0) === parseInt(datosEditArticulo.tarifa, 0))[0].valor;
    }

    let fechaInicial;
    let fechaFinal;
    if (datosEditArticulo.fecha_inicial !== null || datosEditArticulo.fecha_inicial !== null) {
      fechaInicial = datosEditArticulo.fecha_inicial + 'T05:00:00-00:00';
      fechaFinal = datosEditArticulo.fecha_final + 'T05:00:00-00:00';
    } else {
      fechaInicial = null;
      fechaFinal = null;
    }

    for (let i = 0; i < this.DataArrayArticulosSeleccionados.length; i++) {
      if (i === datosEditArticulo.index) {
        this.DataArrayArticulosSeleccionados[i].idArticulo = datosEditArticulo.idArticulo,
          this.DataArrayArticulosSeleccionados[i].nombreArticulo = datosEditArticulo.nombreArticulo,
          this.DataArrayArticulosSeleccionados[i].idUnidad = datosEditArticulo.id_unidad_compra,
          this.DataArrayArticulosSeleccionados[i].unidad = datosEditArticulo.nomUniCompra,
          this.DataArrayArticulosSeleccionados[i].acuerdoNegocio = datosEditArticulo.precio_negociado,
          this.DataArrayArticulosSeleccionados[i].rango_fechas = datosEditArticulo.rango_fechas,
          this.DataArrayArticulosSeleccionados[i].valorNegociado = datosEditArticulo.valor_negociado,
          this.DataArrayArticulosSeleccionados[i].fechaInicial = datosEditArticulo.fecha_inicial,
          this.DataArrayArticulosSeleccionados[i].fechaFinal = datosEditArticulo.fecha_final;
        this.DataArrayArticulosSeleccionados[i].incluyeImpuestos = datosEditArticulo.incluye_impuestos,
          this.DataArrayArticulosSeleccionados[i].idImpuesto = datosEditArticulo.impuesto,
          this.DataArrayArticulosSeleccionados[i].nombreImpuesto = datosEditArticulo.nombreImpuesto,
          this.DataArrayArticulosSeleccionados[i].idTarifa = datosEditArticulo.tarifa,
          this.DataArrayArticulosSeleccionados[i].valortarifa = datosEditArticulo.valorTarifa;
      }
    }

    this.ClearArticulo();
    this.btn_agregar = true;
    this.btn_actualizar = false;
  }

  bindingDataArticulo(index, id, nombreArt) {
    this.indextablaArt = index;
    this.idArtEliminar = id;
    this.nombreArtEliminar = nombreArt;
  }

  DeleteArticulo(index, idArtEliminar, nombreArtEliminar) {
    this.DataArrayArticulosSeleccionados.splice(index, 1);
  }

  GuardarProveedor(DataJsonProveedor) {
    if (DataJsonProveedor.observaciones === undefined) {
      DataJsonProveedor.observaciones = 'N/A';
    }

    const postData = {
      id: DataJsonProveedor.id,
      razonComercial: DataJsonProveedor.razon_comercial,
      razonSocial: DataJsonProveedor.razon_social,
      tipoDoc: DataJsonProveedor.tipo_doc,
      nit: DataJsonProveedor.documento,
      telefono: DataJsonProveedor.telefono,
      email: DataJsonProveedor.email,
      observaciones: DataJsonProveedor.observaciones,
      idMunicipio: DataJsonProveedor.id_municipio,
      idTipoPersona: DataJsonProveedor.id_tipo_persona,
      direccion: DataJsonProveedor.direccion,
      asignarArticulo: DataJsonProveedor.asignar_articulo,
      estado: true,
      idCliente: DataJsonProveedor.id_cliente
    };
    this.modificarproveedorService.updateProveedor(postData).subscribe(res => {
      if (res.text() === 'No se ha podido modificar el proveedor') {
        Swal.fire({
          title: 'Proveedor',
          text: 'No se pudo crear el proveedor',
          type: 'error',
        });
      } else if (res.text() === 'el proveedor ya esta en uso para otro registro') {
        Swal.fire({
          title: 'Proveedor',
          text: 'El proveedor ya existe para el cliente',
          type: 'error',
        });
      } else {
        this.crearContacto(res.text());
        if (DataJsonProveedor.asignar_articulo === '0') {
          this.DeleteArticulos();
        } else {
          this.crearArticulos(res.text());
        }
        this.router.navigate(['compras/proveedores']);
        Swal.fire({
          title: 'Proveedor',
          text: 'Fue modificado el proveedor ' + DataJsonProveedor.razon_comercial + ' con exito',
          type: 'success',
        });
      }
    });

  }

  crearContacto(idProveedor) {
    const proveedor = {
      contacto: []
    };
    if (this.ListaContactos.length >= 1) {
      for (const key of this.ListaContactos) {
        proveedor.contacto.push(
          {
            id_proveedor: idProveedor,
            nombre: key.nombre,
            cargo: key.cargo,
            telefono: key.telefono,
            email: key.email
          });
      }
      this.modificarproveedorService.putContactoProveedor(proveedor.contacto).subscribe(
        res => {
          if (res.text() === 'No se pudo crear los Contactos') {
            Swal.fire({
              title: 'Contactos',
              text: 'No se pudo crear los Contactos',
              type: 'error',
            });
          } else {
            console.log('Contactos creados');
          }
        }
      );
    }
  }

  crearArticulos(idProveedor) {
    const proveedor = {
      articulos: []
    };
    let fechaInicial;
    let fechaFinal;
    for (const key of this.DataArrayArticulosSeleccionados) {
      if (key.fechaInicial !== null && key.fechaFinal !== null) {
        fechaInicial = key.fechaInicial + 'T05:00:00-00:00';
        fechaFinal = key.fechaFinal + 'T05:00:00-00:00';
      } else {
        fechaInicial = null;
        fechaFinal = null;
      }
      if (key.idImpuesto === '') {
        key.idImpuesto = null;
      }
      if (key.idTarifa === '') {
        key.idTarifa = null;
      }
      if (key.valorNegociado === '') {
        key.valorNegociado = 0;
      }
      proveedor.articulos.push(
        {
          id: key.id,
          articulos: {
            id: key.idArticulo
          },
          idUnidadCompra: key.idUnidad,
          acuerdoNegocio: key.acuerdoNegocio,
          valorNegociado: key.valorNegociado,
          fechaInicial: fechaInicial,
          fechaFinal: fechaFinal,
          proveedor: {
            id: idProveedor
          },
          incluyeImpuesto: key.incluyeImpuestos,
          tarifa: {
            id: key.idTarifa
          },
          impuesto: {
            id: key.idImpuesto
          }

        });
    }
    this.modificarproveedorService.updateArticuloProveedor(proveedor.articulos, idProveedor).subscribe(
      res => {
        if (res.text() === 'No se pudo crear los ProveedorArticulos') {
          Swal.fire({
            title: 'Articulos',
            text: 'No se pudo crear los articulos',
            type: 'error',
          });
        } else {
          console.log('Articulos creados');
        }
      }
    );
  }

  DeleteArticulos() {
    for (const key of this.DataArrayArticulosSeleccionados) {
      this.modificarproveedorService.deleteArticulosProveedor(key.id).subscribe(
        data => {
        }
      );
    }
  }

}
