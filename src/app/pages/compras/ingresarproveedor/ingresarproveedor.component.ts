import {Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IMyDpOptions, IMyDateModel, IMyMarkedDate, IMySelector} from 'mydatepicker';
import {IngresarproveedorService} from './ingresarproveedor.service';
import { RutasService } from '../../../services/rutas.service';
import Swal from 'sweetalert2';

const PADDING = '000000';
declare const $;

@Component({
  selector: 'app-ingresarproveedor',
  templateUrl: './ingresarproveedor.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarproveedorService, RutasService]
})
export class IngresarproveedorComponent implements OnInit {

  artsel:number=1;
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  DataNewProveedor: any = [];
  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  direccion2: any;
  variable: any;
  bis = false;
  DataNewContacto: any = [];
  btn_agregar: boolean;
  btn_actualizar: boolean;
  ListaContactos: any = [];
  DataArrayArticulos: any = [];
  DataNewArticulo: any = [];
  searchStringArt: any;
  itempageArt = 5;
  ListaImpuestos: any = [];
  ListaTarifas: any = [];
  DataArrayArticulosSeleccionados: any = [];
  searchStringArtSel: any;
  itempageArtSel = 5;
  idArtEliminar: any;
  nombreArtEliminar: any;
  indextablaArt: any;
  idArticuloInventario: any;
  ListaUnidadesCompra: any = [];
  DataArrayArticulosPrincipal: any = [];
  DataNewCliente: any = [];

  art: any;
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


  @ViewChild('proveedorForm', {static: true})
  public proveedorForm: NgForm;

  @ViewChild('proveedorDosForm', {static: true})
  public proveedorDosForm: NgForm;

  @ViewChild('proveedorArtForm', {static: true})
  public proveedorArtForm: NgForm;


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
    markWeekends: <IMyMarkedDate> {},
    allowDeselectDate: true,
    disableWeekdays: []
  };

  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataNewArticulo.fecha_inicial = event.formatted;
      this.border = '1px solid #CCC';
      if (this.DataNewArticulo.fecha_inicial < this.DataNewArticulo.fecha_inicial) {
      }
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged2(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataNewArticulo.fecha_final = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      this.DataNewArticulo.fecha_final = '';
      this.border = 'none';
    }
  }


  constructor(public router: Router,
              public ingresarproveedorService: IngresarproveedorService,
              public toastr: ToastrService,
              vcr: ViewContainerRef,
              public rutasService: RutasService) {
    this.loadPaises();
    this.DataNewProveedor.id_pais = 42;
    this.loadDepartamento(this.DataNewProveedor.id_pais);
    this.DataNewArticulo.incluye_impuestos = false;
    this.DataNewArticulo.fecha_inicial = '';
  }

  ngOnInit() {
    setTimeout(() => this.toastr.clear());
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['compras/proveedores/ingresarproveedor']);
      this.btn_agregar = true;
      this.btn_actualizar = false;

    }
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

  colocarPuntos(value: number | string, fractionSize: number = 2): string {
    let [integer, fraction = ''] = (value || '').toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : '';

    integer = integer.replace(/\./g, '');
    integer = integer.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    integer = integer.split('').reverse().join('').replace(/^[\.]/, '');

    this.DataNewProveedor.nit = integer;
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
      this.DataNewProveedor.digito = (11 - Residuo);
    } else {
      this.DataNewProveedor.digito = Residuo;
    }
    if (this.DataNewProveedor.digito === 0) {
      this.DataNewProveedor.digito = '0';
    }
  }

  GuardarDocumento(datosProveedor) {
    if (datosProveedor.tipodoc === '1') {
      this.DataNewProveedor.documento = datosProveedor.nit + '-' + datosProveedor.digito;
    } else {
      this.DataNewProveedor.documento = datosProveedor.cedula;
    }
  }

  loadPaises() {
    this.ingresarproveedorService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.ingresarproveedorService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    if (idDepartamento !== '' && idDepartamento !== null && idDepartamento !== undefined) {
      this.ingresarproveedorService.getMunicipios(idDepartamento).subscribe(
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
      this.DataNewProveedor.direccion = via + ' ' + numero + ' ' + this.variable + ' ' + letra + ' ' + cuadrante + ' #' +
        numero2 + letra2 + '-' + placa + ' ' + cuadrante2 + ' ' + senas;
    } else if (parseInt(this.direccion2, 0) === 2) {
      this.DataNewProveedor.direccion = descripcion;
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
        var regexp = /[@]/gi;
        var found = datosContacto.correo_contacto.match(regexp);
        var correo = datosContacto.correo_contacto.split('@', 2);
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
        'id': this.ListaContactos.length + 1,
        'nombre': datosContacto.nombre_contacto,
        'cargo': datosContacto.cargo_contacto,
        'telefono': datosContacto.telefono_contacto,
        'correo': datosContacto.correo_contacto
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
    this.DataNewContacto.correo_contacto = datosContacto.correo;
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
        'id': id,
        'nombre': datosContacto.nombre_contacto,
        'cargo': datosContacto.cargo_contacto,
        'telefono': datosContacto.telefono_contacto,
        'correo': datosContacto.correo_contacto
      }
    );
    this.LimpiarContacto();
    this.btn_agregar = true;
    this.btn_actualizar = false;
  }

  LimpiarContacto() {
    this.DataNewContacto = [];
  }

  EliminarContacto(index) {
    this.ListaContactos.splice(index, 1);
  }

  LoadAllArticulos() {
    this.ingresarproveedorService.getArticulosCompras().subscribe(
      data => {
        this.DataArrayArticulosPrincipal = data;
        for (const key of this.DataArrayArticulosPrincipal) {
          this.DataArrayArticulos.push({
            'id': key.id_articulo,
            'nombre': key.nombre,
            'nombre_kardex': key.nombre_unidad
          });
        }
      }
    );
  }

  clickFilaArticulos(id) {
    this.DataNewArticulo.seleccion_articulo = id.toString();
  }

  GuardarArticuloSeleccionado(articulo) {
    this.DataNewArticulo.id_unidad_compra = '';
    this.DataNewArticulo.idArticulo = this.DataArrayArticulos.filter(x => parseInt(x.id, 0) === parseInt(articulo, 0))[0].id;
    this.DataNewArticulo.nombreArticulo = this.DataArrayArticulos.filter(x => parseInt(x.id, 0) === parseInt(articulo, 0))[0].nombre;
    this.LoadImpuestos();
    this.LoadArticuloInventario(articulo);
    this.LoadUnidadCompra(articulo);
  }


  LoadArticuloInventario(idArticulo) {
    this.ingresarproveedorService.getArticuloInventario(idArticulo).subscribe(
      data => {
        this.idArticuloInventario = data[0].id;
        this.DataNewArticulo.id_unidad_alterna = data[0].id_unidad_alterna;
        this.DataNewArticulo.id_unidad_kardex = data[0].id_unidad_kardex;
        this.DataNewArticulo.nom_unidad_kardex = data[0].nombre_unidad;
      }
    );
  }

  LoadUnidadCompra(idArticulo) {
    this.ingresarproveedorService.getUnidadCompra(idArticulo).subscribe(
      data => {
        this.ListaUnidadesCompra = data;
      }
    );
  }

  LoadImpuestos() {
    this.ingresarproveedorService.getImpuestosRegimen().subscribe(
      data => {
        this.ListaImpuestos = data;
      }
    );
  }

  LoadTarifas(idImp) {
    this.DataNewArticulo.nombreImpuesto = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(idImp, 0))[0].nombre_imp;
    const idRegimen = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(idImp, 0))[0].id_regimen;
    this.ingresarproveedorService.getImpuestoTarifa(idImp, idRegimen).subscribe(
      data => {
        this.ListaTarifas = data;
      }
    );
  }

  AgregarArticulo(datosArticulo) {
    this.DataNewArticulo.nomUniCompra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(datosArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    if (datosArticulo.precio_negociado === '2') {
      datosArticulo.valor_negociado = '';
      datosArticulo.rango_fechas = '';
      datosArticulo.incluye_impuestos = false;
      datosArticulo.impuesto = '';
      datosArticulo.nombreImpuesto = '';
      datosArticulo.tarifa = '';
      datosArticulo.fecha_inicial = '';
      datosArticulo.fecha_final = '';
    }

    if (datosArticulo.rango_fechas === '1') {
      datosArticulo.fecha_inicial = datosArticulo.fecha_inicial.formatted;
      datosArticulo.fecha_final = datosArticulo.fecha_final.formatted;
    } else if (datosArticulo.rango_fechas === '2' || datosArticulo.rango_fechas === undefined) {
      datosArticulo.fecha_inicial = '';
      datosArticulo.fecha_final = '';
    }

    if (datosArticulo.incluye_impuestos === false) {
      datosArticulo.nombreImpuesto = '';
      datosArticulo.impuesto = '';
      datosArticulo.tarifa = '';
      datosArticulo.valorTarifa = '';
    } else {
      datosArticulo.valorTarifa = this.ListaTarifas.filter(x => parseInt(x.id_tarifa, 0) === parseInt(datosArticulo.tarifa, 0))[0].valor;
    }

    this.DataArrayArticulosSeleccionados.push({
      'idArticulo': datosArticulo.idArticulo,
      'nombreArticulo': datosArticulo.nombreArticulo,
      'idUnidad': datosArticulo.id_unidad_compra,
      'unidad': datosArticulo.nomUniCompra,
      'acuerdoNegocio': datosArticulo.precio_negociado,
      'rango_fechas': datosArticulo.rango_fechas,
      'valorNegociado': datosArticulo.valor_negociado,
      'fechaInicial': datosArticulo.fecha_inicial,
      'fechaFinal': datosArticulo.fecha_final,
      'incluyeImpuestos': datosArticulo.incluye_impuestos,
      'idImpuesto': datosArticulo.impuesto,
      'nombreImpuesto': datosArticulo.nombreImpuesto,
      'idTarifa': datosArticulo.tarifa,
      'valortarifa': datosArticulo.valorTarifa

    });

    this.ClearArticulo();
  }

  ClearArticulo() {
    this.proveedorArtForm.reset();
    this.DataNewArticulo = [];
    this.DataNewArticulo.incluye_impuestos = false;
  }

  EditArticulo(data, index) {
    this.DataNewArticulo.idArticulo = data.idArticulo;
    this.DataNewArticulo.seleccion_articulo = data.idArticulo.toString();
    this.DataNewArticulo.nombreArticulo = data.nombreArticulo;
    this.DataNewArticulo.id_unidad_compra = data.idUnidad;
    this.DataNewArticulo.nomUniCompra = data.unidad;
    this.DataNewArticulo.precio_negociado = data.acuerdoNegocio;
    this.DataNewArticulo.rango_fechas = data.rango_fechas;
    this.DataNewArticulo.valor_negociado = data.valorNegociado;
    this.DataNewArticulo.incluye_impuestos = data.incluyeImpuestos;
    this.DataNewArticulo.impuesto = data.idImpuesto;
    this.DataNewArticulo.nombreImpuesto = data.nombreImpuesto;
    this.DataNewArticulo.tarifa = data.idTarifa;
    this.DataNewArticulo.valortarifa = data.valortarifa; // VALOR TARIFA

    this.DataNewArticulo.fecha_inicial = {
      'formatted': data.fechaInicial
    };
    this.DataNewArticulo.fecha_final = {
      'formatted': data.fechaFinal
    };
    this.DataNewArticulo.index = index;
    this.btn_agregar = false;
    this.btn_actualizar = true;

  }

  ActualizarArticulo(datosEditArticulo) {
    this.DataNewArticulo.nomUniCompra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(datosEditArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    if (datosEditArticulo.precio_negociado === '2') {
      datosEditArticulo.valor_negociado = '';
      datosEditArticulo.rango_fechas = '';
      datosEditArticulo.incluye_impuestos = false;
      datosEditArticulo.impuesto = '';
      datosEditArticulo.nombreImpuesto = '';
      datosEditArticulo.tarifa = '';
      datosEditArticulo.fecha_inicial = '';
      datosEditArticulo.fecha_final = '';
    }

    if (datosEditArticulo.rango_fechas === '1') {
      datosEditArticulo.fecha_inicial = datosEditArticulo.fecha_inicial.formatted;
      datosEditArticulo.fecha_final = datosEditArticulo.fecha_final.formatted;
    } else if (datosEditArticulo.rango_fechas === '2' || datosEditArticulo.rango_fechas === undefined) {
      datosEditArticulo.fecha_inicial = '';
      datosEditArticulo.fecha_final = '';
    }

    if (datosEditArticulo.incluye_impuestos === false) {
      datosEditArticulo.nombreImpuesto = '';
      datosEditArticulo.impuesto = '';
      datosEditArticulo.tarifa = '';
      datosEditArticulo.valorTarifa = '';
    } else {
      datosEditArticulo.valorTarifa = this.ListaTarifas.filter(x =>
        parseInt(x.id_tarifa, 0) === parseInt(datosEditArticulo.tarifa, 0))[0].valor;
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

  bindingDataArticulo(index, idArt, nombreArt) {
    this.indextablaArt = index;
    this.idArtEliminar = idArt;
    this.nombreArtEliminar = nombreArt;
  }

  DeleteArticulo(index, idArtEliminar, nombreArtEliminar) {
    this.DataArrayArticulosSeleccionados.splice(index, 1);
  }

  GuardarProveedor(DataNewProveedor) {
    if (DataNewProveedor.observaciones === undefined) {
      DataNewProveedor.observaciones = 'N/A';
    }

    const postData = {
      'razonComercial': DataNewProveedor.razoncomercial,
      'razonSocial': DataNewProveedor.razon_social,
      'tipoDoc': DataNewProveedor.tipodoc,
      'nit': DataNewProveedor.documento,
      'telefono': DataNewProveedor.telefono,
      'email': DataNewProveedor.email,
      'observaciones': DataNewProveedor.observaciones,
      'idMunicipio': DataNewProveedor.id_municipio,
      'idTipoPersona': DataNewProveedor.tipoPersona,
      'direccion': DataNewProveedor.direccion,
      'asignarArticulo': DataNewProveedor.asigna_articulo,
      'estado': true,
      'id_cliente': localStorage.getItem('creadoPor')
    };
    this.ingresarproveedorService.postProveedor(postData).subscribe(res => {
      if (res.text() === 'No se ha podido crear el proveedor') {
        Swal.fire({
          title: 'Proveedor',
          text: 'No se pudo crear el proveedor',
          type: 'error',
        });
      } else if (res.text() === 'El articulo ya existe para el cliente') {
        Swal.fire({
          title: 'Proveedor',
          text: 'El proveedor ya existe para el cliente',
          type: 'error',
        });
      } else {
        this.crearContacto(res.text());
        if (DataNewProveedor.asigna_articulo === '1') {
          this.crearArticulos(res.text());
        }
        this.router.navigate(['dashboard/compras/proveedores']);
        Swal.fire({
          title: 'Proveedor',
          text: 'Fue creado el proveedor ' + DataNewProveedor.razoncomercial + ' con exito',
          type: 'success',
        });
      }
    });

  }

  crearContacto(idProveedor) {
    const proveedor = {
      contacto: []
    };
    for (const key of this.ListaContactos) {
      proveedor.contacto.push(
        {
          'id_proveedor': idProveedor,
          'nombre': key.nombre,
          'cargo': key.cargo,
          'telefono': key.telefono,
          'email': key.correo
        });
    }
    this.ingresarproveedorService.postContactoProveedor(proveedor.contacto).subscribe(res => {
      if (res.text() === 'No se pudo crear los Contactos') {
        Swal.fire({
          title: 'Contactos',
          text: 'No se pudo crear los Contactos',
          type: 'error',
        });
      } else {
        console.log('Contactos creados');
      }
    });
  }

  crearArticulos(idProveedor) {
    const proveedor = {
      articulos: []
    };
    let fechaInicial;
    let fechaFinal;
    for (const key of this.DataArrayArticulosSeleccionados) {
      if (key.fechaInicial !== '' && key.fechaFinal !== '') {
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
          'articulos': {
            'id': key.idArticulo
          },
          'idUnidadCompra': key.idUnidad,
          'acuerdoNegocio': key.acuerdoNegocio,
          'valorNegociado': key.valorNegociado,
          'fechaInicial': fechaInicial,
          'fechaFinal': fechaFinal,
          'proveedor': {
            'id': idProveedor
          },
          'incluyeImpuesto': key.incluyeImpuestos,
          'tarifa': {
            'id': key.idTarifa
          },
          'impuesto': {
            'id': key.idImpuesto
          }

        });
    }
    this.ingresarproveedorService.postArticuloProveedor(proveedor.articulos).subscribe(res => {
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

  Siguiente() {
    console.log('Form Submitted!');
  }

}
