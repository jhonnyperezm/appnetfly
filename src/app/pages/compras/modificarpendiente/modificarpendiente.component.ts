import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IMyDpOptions, IMyDateModel, IMySelector} from 'mydatepicker';
import {RutasService} from '../../../services/rutas.service';
import {Alertas} from '../../alertas/mensajealertas';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {ModificarpendienteService} from './modificarpendiente.service';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-modificarpendiente',
  templateUrl: './modificarpendiente.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificarpendienteService, RutasService, Alertas, SidebarComponent ]
})
export class ModificarpendienteComponent implements OnInit {

  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  tipo: any;
  info: any;
  mensaje: any;

  idMovCompras: any;
  numeroDocumento: any;
  idProveedor: any;

  DataArrayGeneral: any = [];
  DataArrayArticulosPen: any = [];
  searchStringArticulos: any;
  itempageArticulos = 5;

  DataProveedor: any = [];
  DataPendiente: any = [];
  DataTipoCompra: any = [];
  DatosArticuloCompra: any = [];
  registroPendientes: any = [];

  cant_superior = false;
  DataNewArticulo: any = [];
  idArticuloInventario: any;
  ListaUnidadesCompra: any = [];
  ListaImpuestos: any = [];
  ListaTarifas: any = [];

  articulosAgregados: any = [];
  itempagearticulosagregados = 5;
  searcharticulosagregados: any;
  tablaadicionados = true;
  btn_modificar_articulo = false;
  btn_modificar_articulo2 = false;
  enEdicion: any;

  DiscriminacionImpuestos: any = [];
  DataTotales: any = [];
  registrosArticulos: any = [];

  DataNewCompra: any = [];
  PendientesCompradas: any = [];
  DataCliente: any = [];
  botonComprarTodo = true;
  DataArrayPendiente: any = [];

  artdev:number=1;
  art_agr:number=1;
  fecha_compra:any;

  fecha_kardex:any;
  fecha_vencimiento:any;
  @ViewChild('Newcompra', {static: true})
  private Newcompra: NgForm;

  @ViewChild('pendUnoForm', {static: true})
  private pendUnoForm: NgForm;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Hoy',
    editableDateField: false,
    componentDisabled: false,
    openSelectorOnInputClick: true,
  };

  /*Variables utilizadas para el set de las fechas, las cuales seran utilizadas en el momento de guardar la compra */
  private selectedDateNormal: any;
  private selectedDateNormal2: any;
  private selectedDateNormal3: any;
  private selectedTextNormal: any;
  private selectedTextNormal2: any;
  private selectedTextNormal3: any;
  private dateformat1: string;
  private border = 'none';
  private placeholder = 'Select date';
  private disabled = true;
  private selector: IMySelector = {
    open: false
  };

  constructor(public router: Router,
              public sidebarComponent: SidebarComponent,
              public modificarpendienteService: ModificarpendienteService,
              public rutasService: RutasService,
              private toastr: ToastrService,
              public alertas: Alertas,
              public route: ActivatedRoute) {
    this.idMovCompras = this.route.snapshot.params.idPendiente;
    this.idProveedor = this.route.snapshot.params.idProveedor;
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadDatosCliente();
    this.LoadPendienteData();
    this.LoadProveedorData();
    this.LoadArticulosData();
    this.LoadConsecutivo();
  }

  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.selectedTextNormal = event.formatted;
      this.border = '1px solid #CCC';
      this.DataNewCompra.fecha_compra = event.formatted;
      this.IgualarFechas1();
      this.onDateChanged2(event);
      this.onDateChanged3(event);
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged2(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.selectedTextNormal2 = event.formatted;
      this.border = '1px solid #CCC';
      this.DataNewCompra.fecha_kardex = event.formatted;
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged3(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.selectedTextNormal3 = event.formatted;
      this.border = '1px solid #CCC';
      this.DataNewCompra.fecha_vencimiento = event.formatted;
      this.IgualarFechas3();
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  IgualarFechas1() {
    if (this.DataNewCompra.fecha_compra >= this.DataNewCompra.fecha_kardex) {
      this.DataNewCompra.fecha_kardex = this.DataNewCompra.fecha_compra;
      this.DataNewCompra.fecha_vencimiento = this.DataNewCompra.fecha_compra;
    } else {

    }
  }

  IgualarFechas3() {
    if (this.DataNewCompra.fecha_vencimiento >= this.DataNewCompra.fecha_compra) {

    } else {
      setTimeout(() => this.toastr.error('Error la Fecha de Vencimiento no puede ser inferior a Compra', 'Error'));
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadDatosCliente() {
    this.modificarpendienteService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
      }
    );
  }

  LoadPendienteData() {
    this.modificarpendienteService.getPendiente(this.idMovCompras).subscribe(
      data => {
        this.DataArrayPendiente = data[0];
        this.DataPendiente.numero_documento = this.DataArrayPendiente.numero_documento;
        this.DataPendiente.num_factura = this.DataArrayPendiente.num_factura;
      }
    );
  }

  LoadProveedorData() {
    this.modificarpendienteService.getDataProveedor(this.idProveedor).subscribe(
      data => {
        for (const key of data) {
          this.DataProveedor = key;
          this.DataNewCompra.id_pro = key.id;
          this.DataNewCompra.nombre_proveedor = key.razon_social;
          this.DataNewCompra.nit_proveedor = key.nit;
          this.DataNewCompra.direccion_proveedor = key.direccion;
          this.DataNewCompra.telefono_proveedor = key.telefono;
        }
      }
    );
  }

  LoadArticulosData() {
    this.modificarpendienteService.getArticulos(this.idMovCompras).subscribe(
      data => {
        for (const key of data) {
          if (parseInt(key.descuento, 0) === 0) {
            key.incluye_descuentos = false;
          } else {
            key.incluye_descuentos = true;
          }
          if (parseInt(key.tipo_descuento, 0) === 1) {
            key.valor_absoluto = key.descuento;
          } else {
            key.porcentaje = key.descuento;
          }
          this.DataArrayArticulosPen.push({
            'id': key.id,
            'idtabla': this.registroPendientes.length + 1,
            'id_articulo': key.id_articulo,
            'nombreArticulo': key.nombre_articulo,
            'id_unidad_compra': key.id_unidad_compra,
            'nom_unidad_compra': key.unidad_compra,
            'cantidad_producto': key.cantidad,
            'cantidad_kardex': key.cantidad_kardex,
            'id_unidad_kardex': key.id_unidad_kardex,
            'nom_unidad_kardex': key.nombre_kardex,
            'id_unidad_alterna': key.id_unidad_alterna,
            'tipo_valor': key.tipo_valor,
            'precio_unitario': key.precio,
            'precio_total': parseInt(key.precio, 0) * parseInt(key.cantidad, 0),
            'incluye_impuesto': key.incluye_impuesto,
            'impuesto': key.id_impuesto,
            'nombreImpuesto': key.nombre_impuesto,
            'valor_impuesto': key.valor_impuesto,
            'idTarifa': key.id_tarifa,
            'tarifa': key.valor_tarifa,
            'acuerdo_negocio': key.acuerdo_negocio,
            'valor_negociado': key.valor_negociado,
            'incluye_descuentos': key.incluye_descuentos,
            'descuento': key.descuento,
            'valor_descuento': key.tipo_descuento,
            'antes_descuento': key.base_cal_imp_desc,
            'valor_absoluto': key.valor_absoluto,
            'porcentaje': key.porcentaje,
            'valor_bruto': key.total_bruto,
            'base': key.total_bruto,
            'subtotal': key.subtotal,
            'total': key.total,
            'valor_total': key.total,
            'estado_compra': key.estado_compra
          });

          this.registroPendientes.push('pendiente1');
        }


        this.DataArrayArticulosPen.sort(function(a, b) {
          if (a.id_compra < b.id_compra) {
            return 1;
          }
          if (a.id_compra > b.id_compra) {
            return -1;
          }
          return 0;
        });

        const pendientes = this.DataArrayArticulosPen.filter(x => x.estado_compra === false);
        if (pendientes.length === 0) {
          this.botonComprarTodo = false;
        }
        this.loader = false;
        this.LoadTabla = true;
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
      }
    );
  }

  LoadConsecutivo() {
    this.modificarpendienteService.getConsecutivo().subscribe(
      data => {
        this.DataNewCompra.consecutivo = parseInt(data, 0);
        this.DataNewCompra.id_compra = parseInt(data, 0);
      }
    );
  }

  bindingComprar(datosArticulo) {

    if (datosArticulo.estado_compra === false) {

      if (datosArticulo.id !== undefined) {
        this.PendientesCompradas.push({
          'id': datosArticulo.id
        });
      }

      this.articulosAgregados.push({
        idtabla: this.registrosArticulos.length + 1,
        id_art: datosArticulo.id_articulo,
        nombreArt: datosArticulo.nombreArticulo,
        id_unidad_com: datosArticulo.id_unidad_compra,
        nom_unidad_com: datosArticulo.nom_unidad_compra,
        cant: datosArticulo.cantidad_producto,
        id_unidad_kar: datosArticulo.id_unidad_kardex,
        nom_unidad_kar: datosArticulo.nom_unidad_kardex,
        id_unidad_alt: datosArticulo.id_unidad_alterna,
        tipo_val: datosArticulo.tipo_valor,
        precio_uni: datosArticulo.precio_unitario,
        precio_tot: datosArticulo.precio_total,
        incluye_imp: datosArticulo.incluye_impuesto,
        imp: datosArticulo.impuesto,
        nombreImp: datosArticulo.nombreImpuesto,
        valor_imp: datosArticulo.valor_impuesto,
        tar: datosArticulo.idTarifa,
        valor_tar: datosArticulo.tarifa,
        basecom: datosArticulo.valor_bruto,
        totalcom: datosArticulo.total,
        acuerdo_neg: datosArticulo.acuerdo_negocio,
        valor_neg: datosArticulo.valor_negociado

      });
      this.registrosArticulos.push('item1');
    }
    this.CalculoTotalesCompra();
  }

  ComprarTodosPendientes(ListaArticulos) {
    for (const key of ListaArticulos) {
      this.bindingComprar(key);
    }
  }

  CalculoTotalesCompra() {
    this.DiscriminacionImpuestos.length = 0;
    if (this.articulosAgregados == null) {
    } else {

      let temporalsubtotal;
      let temporalimpuesto;
      let temporaltotal;
      this.DataTotales.subtotal = 0;
      this.DataTotales.totalimpuestos = 0;
      this.DataTotales.totaltotal = 0;
      for (const key of this.articulosAgregados) {
        temporalsubtotal = key.basecom;
        this.DataTotales.subtotal += parseFloat(temporalsubtotal);

        temporalimpuesto = key.valor_imp;
        this.DataTotales.totalimpuestos += parseFloat(temporalimpuesto);

        temporaltotal = key.totalcom;
        this.DataTotales.totaltotal += parseFloat(temporaltotal);
      }

      for (const key of this.articulosAgregados) {
        const existe = this.DiscriminacionImpuestos.filter(x => parseInt(x.impuesto, 0) === parseInt(key.implements, 0)
          && parseInt(x.tarifa, 0) === parseInt(key.tar, 0));
        if (existe.length >= 1) {

          for (const key2 of existe) {
            key2.valor_impuesto = key2.valor_impuesto + key.valor_imp;
          }
        } else {

          this.DiscriminacionImpuestos.push({
            'impuesto': key.imp,
            'nombreimpuesto': key.nombreImp,
            'valor_impuesto': key.valor_imp,
            'tarifa': key.tar
          });
        }
      }

    }

  }

  ImprimirPendiente() {
    const doc = new jsPDF();
    let temp;

    /* Titulo tabla Pendientes*/
    const ColumnsTP = ['Pendientes'];
    const rowsTP = [''];

    doc.autoTable({
      Columns: ColumnsTP,
      body: rowsTP,
      startY: 10,
      margin: {horizontal: 7},
      tableWidth: 'auto',
      styles: {cellWidth: 'auto', fontSize: 10, halign: 'center'},
      theme: 'plain'
    });

    const ColumnsDP = ['Articulo',
      'Unidad\nCompra',
      'Cant.',
      'Unidad\nKardex',
      'Cant.\nKardex',
      'Valor\nUnitario',
      'Valor\nBruto',
      'Desc.',
      'Impuesto',
      'Valor\nTotal'];

    const rowsDP = [];
    for (const key of this.DataArrayArticulosPen) {
      temp = [key.nombreArticulo,
        key.nom_unidad_compra,
        key.cantidad,
        key.nom_unidad_kardex,
        key.cantidad,
        key.precio_unitario,
        key.valor_bruto,
        key.descuento,
        key.valor_impuesto,
        key.valor_total];
      rowsDP.push(temp);
    }
    doc.setFontSize(8);
    doc.setFontType('bold');
    doc.autoTable({
      columns: ColumnsDP,
      body: rowsDP,
      startY: 20,
      columnWidth: 'wrap',
      widths: ['*', 'auto', 100, '*', '*'],
      headStyles: {fillColor: [76, 175, 80]},
      margin: {horizontal: 7},
      styles: {color: 'black', fontSize: 8}
    });

    doc.save('Pendientes.pdf');
  }

  ValidarNumeroFactura(datosCompra) {
    this.modificarpendienteService.getNumeroFactura(datosCompra.numerofactura, datosCompra.id_pro).subscribe(data => {
      if (data.text() !== 'El numero de factura no existe para este cliente') {
        setTimeout(() => this.toastr.error(data.text()));
      } else {
        if (this.PendientesCompradas.length !== 0) {
          this.ActualizarPendientes();
        }
        this.GenerarCompra(1, datosCompra);
      }
    });
  }

  ActualizarPendientes() {
    this.modificarpendienteService.actualizarPendientes(this.PendientesCompradas).subscribe(data => {
      console.log(data);
    });
  }

  GenerarCompra(generarcompra, datosCompra) {
    const PostCompra = {
      'idOrden': 0,
      'idCompra': datosCompra.id_compra,
      'numeroDocumento': 0,
      'numFactura': datosCompra.numerofactura,
      'proveedor': {
        'id': datosCompra.id_pro
      },
      'fechaPedido': null,
      'fechaEntrega': null,
      'fechaCompra': datosCompra.fecha_compra + 'T05:00:00-00:00',
      'fechaKardex': datosCompra.fecha_kardex + 'T05:00:00-00:00',
      'fechaVencimiento': datosCompra.fecha_vencimiento + 'T05:00:00-00:00',
      'descripcion': 'n/a',
      'tipo': 2,
      'leidoSab': 0,
      'afecta': 0,
      'estadoEmail': 0,
      'modificada': 0,
      'estadoCierre': 0,
      'formaPago': 'n/a',
      'estadoGenerarcompra': 0,
      'estadoCompra': 0
    };

    this.modificarpendienteService.postCompra(PostCompra).subscribe(data => {
      if (data.text() === 'error') {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la compra',
          type: 'error',
        });
      } else {
        if (generarcompra === 1) {
          this.createArticulosMovimiento(data.text(), this.articulosAgregados);
        }
      }
    });

  }

  createArticulosMovimiento(IdMov, arreglo) {

    const Movimiento = {
      articulos: []
    };
    for (const key of arreglo) {
      Movimiento.articulos.push(
        {
          'id_movimiento_compras': IdMov,
          'id_articulo': key.id_art,
          'id_unidad_compra': key.id_unidad_com,
          'id_bodega': 0, /* revisar no puede ir ningna */
          'cantidad': key.cant,
          'id_unidad_kardex': key.id_unidad_kar,
          'cantidad_kardex': key.cant,
          'id_unidad_alterna': key.id_unidad_alt,
          'tipo_valor': key.tipo_val,
          'precio': key.precio_uni,
          'incluye_impuesto': key.incluye_imp,
          'id_impuesto': key.imp,
          'id_tarifa': key.tar,
          'acuerdo_negocio': key.acuerdo_neg,
          'valor_negociado': key.valor_neg,
          'tipo_descuento': 1,
          'base_cal_imp_desc': 1,
          'descuento': 0,
          'valor_impuesto': key.valor_imp,
          'total_bruto': key.basecom,  // base
          'subtotal': key.totalcom, // sin descuentos
          'total': key.totalcom // con descuentos
        });
    }
    this.modificarpendienteService.postArticulos(Movimiento.articulos).subscribe(data => {
      this.router.navigate(['compras/pendientes',
        {tipo: 'compracreada', mensaje: this.alertas.creacion, info: this.DataNewCompra.id_compra}]);
    });
  }

  Imprimir() {
    const doc = new jsPDF();
    let temp;

    /* DATOS CABECERA*/
    const ColumnsE = [this.DataCliente.nombre, 'No. Compra: ' + this.DataNewCompra.consecutivo];
    const rowsE = [''];

    doc.autoTable({
      colums: ColumnsE,
      body: rowsE,
      startY: 10,
      margin: {horizontal: 7},
      tableWidth: 'auto',
      styles: {cellWidth: 90, fontSize: 20},
      theme: 'plain'
    });

    /* DATOS EMPRESA*/
    const ColumnsDE = ['', ''];
    const rowsDE = [
      ['Direccion:', this.DataCliente.direccion],
      ['Nit:', this.DataCliente.nit + ' - ' + this.DataCliente.digito_checkeo]
    ];
    doc.autoTable({
      columns: ColumnsDE,
      body: rowsDE,
      startY: 20,
      tableWidth: 50,
      margin: {horizontal: 7},
      styles: {cellWidth: 30, fontSize: 8},
      theme: 'plain'
    });

    /* DATOS PROVEEDOR Y PEDIDO*/
    const ColumnsDP = ['', ''];
    const rowsDP = [
      ['PROVEEDOR:', this.DataNewCompra.nombre_proveedor],
      ['NIT:', this.DataNewCompra.nit_proveedor],
      ['DIRECCIÓN:', this.DataNewCompra.direccion_proveedor],
      ['TELEFONO:', this.DataNewCompra.telefono_proveedor]
    ];
    doc.autoTable({
      columns: ColumnsDP,
      body: rowsDP,
      startY: 40,
      tableWidth: 60,
      margin: {horizontal: 7},
      styles: {cellWidth: 50, fontSize: 8},
      theme: 'plain'
    });

    const ColumnsDF = ['', ''];
    const rowsDF = [
      ['FECHA DE COMPRA:', this.DataNewCompra.fecha_compra],
      ['FECHA DE KARDEX:', this.DataNewCompra.fecha_kardex],
      ['FORMA DE VENCIMIENTO:', this.DataNewCompra.fecha_vencimiento],
      ['NUMERO FACTURA:', this.DataNewCompra.numerofactura]
    ];
    doc.autoTable({
      columns: ColumnsDF,
      body: rowsDF,
      startY: 40,
      tableWidth: 50,
      margin: {horizontal: 110},
      styles: {cellWidth: 40, fontSize: 8},
      theme: 'plain'
    });

    const ColumnsDA = ['Articulo',
      'Unidad\nCompra',
      'Cant.',
      'Unidad\nKardex',
      'Cant.\nKardex',
      'Valor\nUnitario',
      'Valor\nBruto',
      'Impuesto',
      'Valor\nTotal'];

    const rowsDA = [];
    for (const key of this.articulosAgregados) {
      temp = [key.nombreArt,
        key.nom_unidad_com,
        key.cant,
        key.nom_unidad_kar,
        key.cant,
        key.precio_uni,
        key.basecom,
        key.valor_imp,
        key.totalcom];
      rowsDA.push(temp);
    }
    temp = [, , , , , , , ,];
    rowsDA.push(temp);
    temp = [, , , , , , , 'SubTotal:', this.DataTotales.subtotal];
    rowsDA.push(temp);
    temp = [, , , , , , , 'Impuestos:', this.DataTotales.totalimpuestos];
    rowsDA.push(temp);
    temp = [, , , , , , , 'Total:', this.DataTotales.totaltotal];
    rowsDA.push(temp);

    doc.setFontSize(8);
    doc.setFontType('bold');
    doc.autoTable({
      columns: ColumnsDA,
      body: rowsDA,
      startY: 80,
      columnWidth: 'wrap',
      widths: ['*', 'auto', 100, '*', '*'],
      headStyles: {fillColor: [76, 175, 80]},
      margin: {horizontal: 7},
      styles: {color: 'black', fontSize: 8}
    });

    doc.save('Compras.pdf');

  }
}
