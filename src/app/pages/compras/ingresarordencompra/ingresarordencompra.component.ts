import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IMyDpOptions, IMyDateModel, IMyMarkedDate, IMySelector} from 'mydatepicker';
import {Alertas} from '../../alertas/mensajealertas';
import {RutasService} from '../../../services/rutas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {IngresarordencompraService} from './ingresarordencompra.service';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ingresarordencompra',
  templateUrl: './ingresarordencompra.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarordencompraService, RutasService, ToastrService, Alertas, DatePipe, SidebarComponent]
})
export class IngresarordencompraComponent implements OnInit {

  DataNewArticulo: any = [];
  DataNewOrden: any = [];
  DataTotales: any = [];
  DataCliente: any = [];

  fecha_entrega: any;
  fecha_pedido: any;
  listaProveedores: any;
  searchProveedor: any;
  Itempageproveedor = 5;
  blockprecio:any;
  s:number=1;
  artuo:number=1;

  articulosAgregados: any = [];
  DataArrayArticulos: any = [];
  DataJsonArticulos: any = [];
  itempageArt = 5; // Modal
  searchStringArt: any; // Modal
  searcharticulosagregados: any;
  itempagearticulosagregados = 5;
  mas_articulos = false;
  menos_articulos = false;
  idArticuloInventario: any;
  registros: any = [];
  nombreArticuloEliminar: any;
  idTablaEliminar: any;
  tablaadicionados = true;
  btn_adicionar_articulo = true;
  btn_modificar_articulo = false;
  btn_modificar_articulo2 = false;

  ListaUnidadesCompra: any = [];

  ListaImpuestos: any = [];
  ListaTarifas: any = [];

  mostrarUltimasOrdenes = false;
  listadoVerUltimaOrden: any = [];
  listaUltimasOrdenes: any;
  ultimaordenarticulos = false;
  clickUltimasOrdenes = false;
  listaVerUltimaOrden: any = [];
  itempageUltimas = 5;
  itempageArtUltimas = 5;

  valorUltimaCompra: any = [];

  datosOrdenCompra: any;
  datosArticulosOrdenCompra: any = [];

  DataSolicitudElectronica: any = [];

  ruta_descarga_pdf: any;
  DataArrayNegociacion: any = [];
  DatosNegociacion: any = [];
  asig_articulos = false;
  selart: any;
  s2: any;
  uo: any;
  n: any;

  @ViewChild('ordenesUnoForm', {static: true})
  public ordenesUnoForm: NgForm;

  @ViewChild('ordenesDosForm', {static: true})
  private ordenesDosForm: NgForm;

  @ViewChild('solicitudForm', {static: true})
  private solicitudForm: NgForm;

  @ViewChild('ordencompra', {static: true})
  public ordencompra: NgForm;

  @ViewChild('ordenesArtForm', {static: true})
  public ordenesArtForm: NgForm;

  selectedDateNormal: any = '';
  selectedDateNormal2: any = '';
  private selectedTextNormal: any = '';
  private selectedTextNormal2: any = '';
  private dateformat1 = '';
  private border = 'none';
  private placeholder = 'Select date';
  disabled = false;
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
    width: '210px',
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


  constructor(
    public router: Router,
    public sidebarComponent: SidebarComponent,
    public ingresarordencompraService: IngresarordencompraService,
    public toastr: ToastrService,
    public rutasService: RutasService,
    public alertas: Alertas,
    private datePipe: DatePipe) {
    this.DataNewArticulo.valor = '1';
    this.DataNewOrden.forma_pago = '';
    this.DataNewOrden.observaciones = '';
    this.DataNewArticulo.precio_unitario = '';
    this.DataNewArticulo.valor_negociado = '';
    this.DataNewArticulo.acuerdo_negocio = '';
    this.DataNewOrden.estadoEmail = false;
  }

  ngOnInit() {
    this.LoadProveedoresData();
    this.LoadImpuestos();
    this.LoadNumOrden();
    this.LoadDatosCliente();
    this.ruta_descarga_pdf = this.rutasService.getPathDownload();
    this.DataSolicitudElectronica.contenido = '';
  }


  /**
   * Cambio del formato para la fecha de kardex
   * @param event
   */

  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataNewOrden.fecha_entrega = event.formatted;
      this.border = '1px solid #CCC';
      if (this.DataNewOrden.fecha_entrega < this.DataNewOrden.fecha_pedido) {
        this.toastr.warning(this.alertas.fechas);
      }
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  /**
   * Cambio del formato para la fecha de vencimiento
   * @param event
   */
  onDateChanged2(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataNewOrden.fecha_pedido = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      this.DataNewOrden.fecha_pedido = '';
      this.border = 'none';
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadProveedoresData() {
    this.ingresarordencompraService.getProveedores().subscribe(
      data => {
        this.listaProveedores = data;
      }
    );
  }

  LoadImpuestos() {
    this.ingresarordencompraService.getImpuestos().subscribe(
      data => {
        this.ListaImpuestos = data;
      }
    );
  }

  LoadNumOrden() {
    this.ingresarordencompraService.getNumOrden().subscribe(
      data => {
        this.DataNewOrden.consecutivo = parseInt(data, 0);
      }
    );
  }

  LoadDatosCliente() {
    this.ingresarordencompraService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
        console.log(this.DataCliente);
        this.DataSolicitudElectronica.asunto = 'Orden de Compra ' + this.DataCliente.nombre;
      }
    );
  }

  LoadUltimasOrdenes(idProveedor) {
    this.ingresarordencompraService.getUltimasOrdenes(idProveedor).subscribe(
      data => {
        this.listaUltimasOrdenes = data;
        if (this.listaUltimasOrdenes.length != 0) {
          this.mostrarUltimasOrdenes = true;
        } else {
          this.mostrarUltimasOrdenes = false;
        }
      }
    );
  }

  clickFilaPro(id) {
    this.DataNewOrden.id_pro = id.toString();
  }

  validarAsignacionArticulos(idProveedor) {
    this.DataNewOrden.asigna_articulos = this.listaProveedores.filter(x =>
      parseInt(x.id, 0) === parseInt(idProveedor, 0))[0].asignar_articulo;
    if (this.DataNewOrden.asigna_articulos === false) {
      this.LoadUltimosArticulosPorProveedor(idProveedor);
      this.asig_articulos = false;
    } else {
      this.loadArticulosNegociacion(idProveedor);
      this.asig_articulos = true;
    }
  }

  LoadUltimosArticulosPorProveedor(idProveedor) {
    this.mas_articulos = true;
    this.menos_articulos = false;

    this.ingresarordencompraService.getUltimosArticulosProveedor(idProveedor).subscribe(
      data => {
        this.DataArrayArticulos = data;
        this.DataJsonArticulos = [];
        if (this.DataArrayArticulos.length !== 0) {
          for (const key of this.DataArrayArticulos) {
            for (const keyMovimiento of key.movimientoArticulosPojo) {
              for (const keyArticulo of keyMovimiento.articulosPojo) {
                const artExiste = this.DataJsonArticulos.filter(x =>
                  parseInt(x.id_articulo, 0) === parseInt(keyArticulo.id, 0) && parseInt(x.origen, 0) === 1);
                if (artExiste.length === 0) {
                  this.DataJsonArticulos.push({
                    'id_articulo': keyArticulo.id,
                    'nombre': keyArticulo.nombre,
                    'origen': 1  // articulos de las ultimasCompras
                  });
                }
              }
            }
          }
        } else {
          this.LoadTodosArticulosCompras();
          this.mas_articulos = false;
          this.menos_articulos = false;
        }
      }
    );
  }

  LoadTodosArticulosCompras() {
    this.mas_articulos = false;
    this.menos_articulos = true;
    this.ingresarordencompraService.getArticulosCompras().subscribe(
      data => {
        this.DataArrayArticulos = data;
        this.DataJsonArticulos = [];
        for (const key of this.DataArrayArticulos) {
          this.DataJsonArticulos.push({
            'id_articulo': key.id_articulo,
            'nombre': key.nombre,
            'origen': 2 /* todos los articulos de inventario */
          });
        }
      }
    );
  }

  loadArticulosNegociacion(idProveedor) {
    this.mas_articulos = true;
    this.menos_articulos = false;
    this.ingresarordencompraService.getArticulosNegociacion(idProveedor).subscribe(
      data => {
        this.DataJsonArticulos = [];
        this.DataArrayArticulos = data;
        for (const key of this.DataArrayArticulos) {
          this.DataJsonArticulos.push({
            'id_articulo': key.id_articulo,
            'nombre': key.nombre,
            'origen': 3
          });
        }
      }
    );

  }

  loadMasArticulos(idProveedor) {
    this.mas_articulos = false;
    this.menos_articulos = true;
    this.ingresarordencompraService.getMasArticulos(idProveedor).subscribe(
      data => {
        this.DataJsonArticulos = [];
        this.DataArrayArticulos = data;
        for (const key of this.DataArrayArticulos) {
          this.DataJsonArticulos.push({
            'id_articulo': key.id_articulo,
            'nombre': key.nombre,
            'origen': 4
          });
        }
      }
    );

  }

  VerUltimaOrden(idOrden) {
    this.clickUltimasOrdenes = !this.clickUltimasOrdenes;
    let div;
    if (this.clickUltimasOrdenes === true) {
      this.ingresarordencompraService.getVerUltimaOrden(idOrden).subscribe(
        data => {
          this.listaVerUltimaOrden = [];
          this.listadoVerUltimaOrden = data;

          if (this.listadoVerUltimaOrden.length != 0) {
            this.ultimaordenarticulos = true;

            for (const key of this.listadoVerUltimaOrden) {
              div = key.valor_tarifa / 100;
              this.listaVerUltimaOrden.push({
                'idtabla': this.registros.length + 1,
                'id_articulo': key.id_articulo,
                'nombreArticulo': key.nombre_articulo,
                'id_unidad_compra': key.id_unidad_compra,
                'nom_unidad_compra': key.unidad_compra,
                'cantidad': key.cantidad,
                'id_unidad_kardex': key.id_unidad_kardex,
                'nom_unidad_kardex': key.nombre_kardex,
                'id_unidad_alterna': key.id_unidad_alterna,
                'acuerdo_negocio': key.acuerdo_negocio,
                'valor_negociado': key.valor_negociado,
                'valor': key.tipo_valor,
                'precio_unitario': key.precio,
                'precio_total': key.precio * key.cantidad,
                'impuesto': key.id_impuesto,
                'nombreImpuesto': key.nombre_impuesto,
                'valor_impuesto': key.valor_impuesto,
                'tarifa': key.id_tarifa,
                'valor_tarifa': key.valor_tarifa,
                'base': key.total_bruto,
                'total': key.total,

                'nombreArticuloF': key.nombre_articulo,
                'nom_unidad_compraF': key.unidad_compra,
                'cantidadF': key.cantidad,
                'nom_unidad_kardexF': key.nombre_kardex,
                'precio_unitarioF': key.precio,
                'baseF': key.total_bruto,
                'valor_impuestoF': key.valor_impuesto,
                'totalF': key.total
              });
              this.registros.push('item1');
            }
          } else {
            this.ultimaordenarticulos = false;
          }
        }
      );
    } else {
      this.ultimaordenarticulos = false;
    }
  }

  AgregarArticuloUltimaOrden(articulosUltimaOrden) {
    this.articulosAgregados = articulosUltimaOrden;
  }

  clickFilaArt(id) {
    this.DataNewArticulo.id_articulo = id.toString();
  }

  GuardarArticuloSel(idArt, datosProveedor) {
    if (datosProveedor.asigna_articulos === true) {
      this.DatosAcuerdoNegocio(idArt, datosProveedor.id_pro, datosProveedor.asigna_articulos);
    } else {
      this.GuardarArticuloModal(idArt, datosProveedor.asigna_articulos);
    }
  }

  DatosAcuerdoNegocio(idArticulo, idProveedor, asig_articulo) {
    if (asig_articulo === true) {
      this.ingresarordencompraService.getNegociacionArticulo(idArticulo, idProveedor).subscribe(
        data => {
          this.DataArrayNegociacion = data;
          if (data.length !== 0) {
            for (const key of this.DataArrayNegociacion) {
              if (key.fecha_inicial !== undefined && key.fecha_final !== undefined) {
                const fi = new Date(key.fecha_inicial);
                key.fecha_inicial = this.datePipe.transform(fi, 'yyyy-MM-dd');

                const ff = new Date(key.fecha_final);
                key.fecha_final = this.datePipe.transform(ff, 'yyyy-MM-dd');
              } else {
                key.fecha_final = '';
              }
              this.DatosNegociacion.push({
                'acuerdo_negocio': key.acuerdo_negocio,
                'fecha_final': key.fecha_final,
                'fecha_inicial': key.fecha_inicial,
                'id_articulo': key.id_articulo,
                'id_unidad_compra': key.id_unidad_compra,
                'incluye_impuesto': key.incluye_impuesto,
                'nombre_unidad_compra': key.nombre_unidad_compra,
                'valor_negociado': key.valor_negociado
              });
            }
          }
          this.GuardarArticuloModal(idArticulo, asig_articulo);
        }
      );
    }
  }

  GuardarArticuloModal(idArticulo, asig_articulo) {
    this.DataNewArticulo.nombreArticulo = this.DataJsonArticulos.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].nombre;

    if (asig_articulo === true) {

      this.DataNewArticulo.acuerdo_negocio = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].acuerdo_negocio;
      this.DataNewArticulo.valor_negociado = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].valor_negociado;
      this.DataNewArticulo.fecha_inicial = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].fecha_inicial;
      this.DataNewArticulo.fecha_final = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].fecha_final;
      this.DataNewArticulo.id_unidad_compra = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].id_unidad_compra;
      this.DataNewArticulo.nom_unidad_compra = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].nombre_unidad_compra;

      if (this.DataNewArticulo.acuerdo_negocio === true) {
        this.DataNewArticulo.valor = 1;
        if (this.btn_modificar_articulo) {
          this.DataNewArticulo.precio_unitario = this.DataNewArticulo.precio_unitario;
        } else {
          this.DataNewArticulo.precio_unitario = this.DataNewArticulo.valor_negociado;
        }

        if (this.DataNewArticulo.fecha_inicial !== undefined && this.DataNewArticulo.fecha_final !== undefined) {
          if (this.DataNewArticulo.fecha_inicial <= this.DataNewOrden.fecha_entrega
            && this.DataNewArticulo.fecha_final >= this.DataNewOrden.fecha_entrega) {
            Swal.fire({
              title: 'El Articulo: ' + this.DataNewArticulo.nombreArticulo + '\n' + ' posee un precio Negociado ',
              text: 'Unidad Compra Negociada: ' + this.DataNewArticulo.nom_unidad_compra + '\n\n' +
                'Valor Negociado: ' + this.DataNewArticulo.valor_negociado,
              type: 'success',
            });
          } else {
            Swal.fire({
              title: 'Información',
              text: 'El acuerdo de negociación caduco por tiempo, Ultimo valor de negociación: ' + this.DataNewArticulo.valor_negociado,
              type: 'warning',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              /* buttons: ['Cancelar', 'Aceptar'], */
            });
          }
        } else {
          console.log('tiene precio negociado pero no rango de fechas');
        }
      } else {
        console.log('El articulo no tiene acuerdo de negociación');
        this.DataNewArticulo.precio_unitario = this.DataNewArticulo.precio_unitario;
      }
    }

    this.LoadArticuloInventario(idArticulo);
    this.LoadValorUnidadUltimaCompraArticulo(idArticulo);
  }

  LoadArticuloInventario(idArticulo) {
    this.ingresarordencompraService.getArticuloInventario(idArticulo).subscribe(
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
    this.ingresarordencompraService.getUnidadCompra(idArt).subscribe(
      data => {
        this.ListaUnidadesCompra = data;
      }
    );
  }

  LoadValorUnidadUltimaCompraArticulo(idArticulo) {
    this.ingresarordencompraService.getValorUltimaCompra(idArticulo).subscribe(
      data => {
        this.valorUltimaCompra = data;
        if (this.valorUltimaCompra.length >= 1) {
          this.DataNewArticulo.ultimacompra = this.valorUltimaCompra[0].precio;
        }
      }
    );
  }

  LoadTarifas(IdImp) {
    if (IdImp === null || IdImp === '') {

    } else {
      this.DataNewArticulo.nombreImpuesto = this.ListaImpuestos.filter(x =>
        parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].nombre_imp;
      const idRegimen = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].id_regimen;

      this.ingresarordencompraService.getImpuestoTarifa(IdImp, idRegimen).subscribe(
        data => {
          this.ListaTarifas = data;
        }
      );
    }
  }

  bindinTarifa(idTarifa) {
    if (idTarifa === null) {

    } else {
      this.DataNewArticulo.valor_tarifa = this.ListaTarifas.filter(x =>
        parseInt(x.id_tarifa, 0) === parseInt(idTarifa, 0))[0].valor;
    }
  }

  ValidacionValorNegociado() {
    if (this.DataNewOrden.asigna_articulos === true) {
      if (this.DataNewArticulo.acuerdo_negocio === true) {
        if (this.DataNewArticulo.precio_unitario === '' || this.DataNewArticulo.precio_unitario === null ||
          this.DataNewArticulo.precio_unitario === undefined) {
        } else {
          if (this.DataNewArticulo.precio_unitario !== this.DataNewArticulo.valor_negociado) {
            this.toastr.warning('Ha modificado el Valor Negociado', 'Verificar');
          } else {
            console.log('No hacer nada no se ha modificado');
          }
        }

        if (this.DataNewArticulo.precio_total === '' || this.DataNewArticulo.precio_total === null ||
          this.DataNewArticulo.precio_total === undefined) {
        } else {
          const precio_unitario_temporal = parseInt(this.DataNewArticulo.precio_total, 0) /
            parseInt(this.DataNewArticulo.cantidad, 0);
          if (precio_unitario_temporal !== parseInt(this.DataNewArticulo.valor_negociado, 0)) {
            this.toastr.warning('Ha Modificado el Valor Negociado', 'Verificar');
          } else {
            console.log('No hacer nada no se ha modificado el valor negociado');
          }
        }
      }
    }
  }

  CalculoValoresArticulo() {
    let mult, div, valor_orden, temp = 0;
    if (parseInt(this.DataNewArticulo.valor, 0) === 1) {

      mult = this.DataNewArticulo.cantidad * this.DataNewArticulo.precio_unitario;
      div = this.DataNewArticulo.valor_tarifa / 100;
      this.DataNewArticulo.base = mult;
      this.DataNewArticulo.total = this.DataNewArticulo.base * div;
      this.DataNewArticulo.valor_impuesto = this.DataNewArticulo.total;
      valor_orden = this.DataNewArticulo.total + this.DataNewArticulo.base;
      this.DataNewArticulo.total = valor_orden;

    } else if (parseInt(this.DataNewArticulo.valor, 0) === 2) {

      this.DataNewArticulo.precio_unitario = this.DataNewArticulo.precio_total / this.DataNewArticulo.cantidad;
      div = this.DataNewArticulo.valor_tarifa / 100;
      this.DataNewArticulo.base = this.DataNewArticulo.precio_total;
      temp = this.DataNewArticulo.base * div;
      this.DataNewArticulo.total = temp + parseInt(this.DataNewArticulo.base, 0);
      this.DataNewArticulo.valor_impuesto = this.DataNewArticulo.total - this.DataNewArticulo.base;
      valor_orden = this.DataNewArticulo.total - this.DataNewArticulo.base;
    } else {

    }
  }

  LoadProveedorSeleccionado(data) {
    this.DataNewOrden.nombre_proveedor = data.razon_social;
    this.DataNewOrden.nit_proveedor = data.nit;
    this.DataNewOrden.direccion_proveedor = data.direccion;
    this.DataNewOrden.telefono_proveedor = data.telefono;
  }

  AgregarArticulo() {
    this.DataNewArticulo.nom_unidad_compra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(this.DataNewArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    this.articulosAgregados.push({
        idtabla: this.registros.length + 1,
        id_articulo: this.DataNewArticulo.id_articulo,
        nombreArticulo: this.DataNewArticulo.nombreArticulo,
        id_unidad_compra: this.DataNewArticulo.id_unidad_compra,
        nom_unidad_compra: this.DataNewArticulo.nom_unidad_compra,
        cantidad: this.DataNewArticulo.cantidad,
        id_unidad_kardex: this.DataNewArticulo.id_unidad_kardex,
        nom_unidad_kardex: this.DataNewArticulo.nom_unidad_kardex,
        id_unidad_alterna: this.DataNewArticulo.id_unidad_alterna,
        ultimacompra: this.DataNewArticulo.ultimacompra,
        valor: this.DataNewArticulo.valor,
        precio_unitario: this.DataNewArticulo.precio_unitario,
        precio_total: this.DataNewArticulo.precio_total,
        impuesto: this.DataNewArticulo.impuesto,
        nombreImpuesto: this.DataNewArticulo.nombreImpuesto,
        valor_impuesto: this.DataNewArticulo.valor_impuesto,
        tarifa: this.DataNewArticulo.tarifa,
        valor_tarifa: this.DataNewArticulo.valor_tarifa,
        base: this.DataNewArticulo.base,
        total: this.DataNewArticulo.total,
        acuerdo_negocio: this.DataNewArticulo.acuerdo_negocio,
        valor_negociado: this.DataNewArticulo.valor_negociado,
        fecha_inicial: this.DataNewArticulo.fecha_inicial,

        nombreArticuloF: this.DataNewArticulo.nombreArticulo,
        nom_unidad_compraF: this.DataNewArticulo.nom_unidad_compra,
        cantidadF: this.DataNewArticulo.cantidad,
        nom_unidad_kardexF: this.DataNewArticulo.nom_unidad_kardex,
        precio_unitarioF: this.DataNewArticulo.precio_unitario,
        baseF: this.DataNewArticulo.base,
        valor_impuestoF: this.DataNewArticulo.valor_impuesto,
        totalF: this.DataNewArticulo.total
      }
    );
    this.registros.push('item2');

    setTimeout(() => this.toastr.success(this.articulosAgregados.nombre_articulo, 'Articulo Adicionado Con Exito'));
    this.LimpiarFormArticulo();
  }

  calcularTotales() {
    let temporalSubtotal: any;
    let temporalImpuestos: any;
    let temporalTotal: any;
    this.DataNewOrden.subtotal_orden = 0;
    this.DataNewOrden.impuestos_orden = 0;
    this.DataNewOrden.total_orden = 0;

    for (const key of this.articulosAgregados) {
      temporalSubtotal = key.base;
      this.DataNewOrden.subtotal_orden = this.DataNewOrden.subtotal_orden + parseInt(temporalSubtotal, 0);

      temporalImpuestos = key.valor_impuesto;
      this.DataNewOrden.impuestos_orden = this.DataNewOrden.impuestos_orden + parseInt(temporalImpuestos, 0);

      temporalTotal = key.total;
      this.DataNewOrden.total_orden = this.DataNewOrden.total_orden + parseInt(temporalTotal, 0);
    }
  }

  bindingEliminarArticulo(datosArticulo) {
    this.idTablaEliminar = datosArticulo.idtabla;
    this.nombreArticuloEliminar = datosArticulo.nombre_articulo;
  }

  DeleteArticulo(id) {
    for (let i = 0; i < this.articulosAgregados.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.articulosAgregados[i].idtabla, 0)) {
        index = this.articulosAgregados.indexOf(this.articulosAgregados[i]);
        this.articulosAgregados.splice(index, 1);
      }
    }
  }

  bindingEditarArticulo(datosArticulo) {
    console.log(datosArticulo);
    this.DataNewArticulo = datosArticulo;

    this.DatosAcuerdoNegocio(this.DataNewArticulo.id_articulo, this.DataNewOrden.id_pro, this.DataNewOrden.asigna_articulos);
    this.LoadTarifas(this.DataNewArticulo.impuesto);
    this.LoadValorUnidadUltimaCompraArticulo(this.DataNewArticulo.id_articulo);
    this.btn_adicionar_articulo = false;
    this.btn_modificar_articulo = true;
  }

  EditArticulo(datosArticulo) {
    this.DataNewArticulo.nom_unidad_compra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(this.DataNewArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    for (let i = 0; i < this.articulosAgregados.length; i++) {
      if (parseInt(this.articulosAgregados[i].idtabla, 0) === parseInt(datosArticulo.idtabla, 0)) {
        this.articulosAgregados[i].idtabla = datosArticulo.idtabla;
        this.articulosAgregados[i].id_articulo = datosArticulo.id_articulo;
        this.articulosAgregados[i].nombreArticulo = datosArticulo.nombreArticulo;
        this.articulosAgregados[i].id_unidad_compra = datosArticulo.id_unidad_compra;
        this.articulosAgregados[i].nom_unidad_compra = datosArticulo.nom_unidad_compra;
        this.articulosAgregados[i].cantidad = datosArticulo.cantidad;
        this.articulosAgregados[i].id_unidad_kardex = datosArticulo.id_unidad_kardex;
        this.articulosAgregados[i].nom_unidad_kardex = datosArticulo.nom_unidad_kardex;
        this.articulosAgregados[i].id_unidad_alterna = datosArticulo.id_unidad_alterna;
        this.articulosAgregados[i].ultimacompra = datosArticulo.ultimacompra;
        this.articulosAgregados[i].valor = datosArticulo.valor;
        this.articulosAgregados[i].precio_unitario = datosArticulo.precio_unitario;
        this.articulosAgregados[i].precio_total = datosArticulo.precio_total;
        this.articulosAgregados[i].impuesto = datosArticulo.impuesto;
        this.articulosAgregados[i].nombreImpuesto = datosArticulo.nombreImpuesto;
        this.articulosAgregados[i].valor_impuesto = datosArticulo.valor_impuesto;
        this.articulosAgregados[i].tarifa = datosArticulo.tarifa;
        this.articulosAgregados[i].valor_tarifa = datosArticulo.valor_tarifa;
        this.articulosAgregados[i].base = datosArticulo.base;
        this.articulosAgregados[i].total = datosArticulo.total;
        this.articulosAgregados[i].acuerdo_negocio = datosArticulo.acuerdo_negocio;
        this.articulosAgregados[i].valor_negociado = datosArticulo.valor_negociado;
        this.articulosAgregados[i].fecha_inicial = datosArticulo.fecha_inicial;
        this.articulosAgregados[i].fecha_final = datosArticulo.fecha_final;

        this.articulosAgregados[i].nombreArticuloF = datosArticulo.nombreArticulo;
        this.articulosAgregados[i].nom_unidad_compraF = datosArticulo.nom_unidad_compra;
        this.articulosAgregados[i].cantidadF = datosArticulo.cantidad;
        this.articulosAgregados[i].nom_unidad_kardexF = datosArticulo.nom_unidad_kardex;
        this.articulosAgregados[i].precio_unitarioF = datosArticulo.precio_unitario;
        this.articulosAgregados[i].baseF = datosArticulo.base;
        this.articulosAgregados[i].valor_impuestoF = datosArticulo.valor_impuesto;
        this.articulosAgregados[i].totalF = datosArticulo.total;
      }
    }
    this.btn_adicionar_articulo = true;
    this.btn_modificar_articulo = false;
    this.LimpiarFormArticulo();
  }

  Agregar_ArtPreview() {
    this.btn_adicionar_articulo = true;
    this.btn_modificar_articulo2 = false;
    this.btn_modificar_articulo = false;
    this.tablaadicionados = true;
  }

  Modificar_ArtPreview(datosArticulo) {
    this.btn_adicionar_articulo = false;
    this.btn_modificar_articulo2 = true;
    this.DataNewArticulo = datosArticulo;
    this.tablaadicionados = false;
  }

  GuardarOrdenCompra(datosOrden, generarCompra) {
    this.datosOrdenCompra = {
      'proveedor': {
        'id': datosOrden.id_pro
      },
      'fechaPedido': datosOrden.fecha_entrega + 'T05:00:00-00:00',
      'fechaEntrega': datosOrden.fecha_pedido + 'T05:00:00-00:00',
      'descripcion': datosOrden.observaciones,
      'formaPago': datosOrden.forma_pago,
      'estadoEmail': datosOrden.estadoEmail,
      'idOrden': datosOrden.consecutivo
    };

    this.ingresarordencompraService.postOrdenCompra(this.datosOrdenCompra, generarCompra).subscribe(res => {
      if (res.text() === 'error') {
        Swal.fire({
          title: 'Orden Compra',
          text: 'No se pudo crear la Orden de Compra',
          type: 'error',
        });

      } else {
        this.crearArticulosOrden(res.text());
      }
    });
  }

  crearArticulosOrden(idOrden) {
    const Orden = {
      articulo: []
    };

    for (const key of this.articulosAgregados) {
      Orden.articulo.push({
        'id_movimiento_compras': idOrden,
        'id_articulo': key.id_articulo,
        'id_unidad_compra': key.id_unidad_compra,
        'id_bodega': 0, /* revisar no puede ir ninguna */
        'cantidad': key.cantidad,
        'id_unidad_kardex': key.id_unidad_kardex,
        'cantidad_kardex': key.cantidad,
        'id_unidad_alterna': key.id_unidad_alterna,
        'tipo_valor': key.valor,
        'precio': key.precio_unitario,
        'incluye_impuesto': false,
        'id_impuesto': key.impuesto,
        'id_tarifa': key.tarifa,
        'acuerdo_negocio': key.acuerdo_negocio,
        'valor_negociado': key.valor_negociado,
        'tipo_descuento': 1,
        'base_cal_imp_desc': 1,
        'descuento': 0,
        'valor_impuesto': key.valor_impuesto,
        'total_bruto': key.base,  // base
        'subtotal': key.total, // sin descuentos
        'total': key.total // con descuentos
      });

    }

    this.ingresarordencompraService.postArticulosOrdenCompra(Orden.articulo).subscribe(res => {

      this.router.navigate(['compras/ordencompra']);
      if (res.text() === 'succes') {
        this.toastr.success('Exitoso', 'El Registro ha sido creado  con exito ' + this.DataNewOrden.consecutivo);
      } else {
        this.toastr.error('Error', 'El Registro no se ha podido crear');
      }
      // { tipo: 'success', mensaje: this.alertas.crearymodificar, info: this.DataNewOrden.consecutivo }]);

    });
  }

  MakePdf(datosOrden, origen) {
    const articulosOrdenCompraDto = {
      articulo: []
    };

    for (const key of this.articulosAgregados) {
      articulosOrdenCompraDto.articulo.push({
        'id_articulo': key.id_articulo,
        'nombre_articulo': key.nombreArticulo,
        'id_unidad_compra': key.id_unidad_compra,
        'unidad_compra': key.nom_unidad_compra,
        'cantidad': key.cantidad,
        'id_unidad_kardex': key.id_unidad_kardex,
        'nombre_kardex': key.nom_unidad_kardex,
        'id_unidad_alterna': key.id_unidad_alterna,
        'tipo_valor': key.valor,
        'precio': key.precio_unitario,
        'id_impuesto': key.impuesto,
        'nombre_impuesto': key.nombreImpuesto,
        'valor_impuesto': key.valor_impuesto,
        'id_tarifa': key.tarifa,
        'valor_tarifa': key.valor_tarifa,
        'total_bruto': key.base,
        'total': key.total
      });
    }

    let datos_pdf: any;
    datos_pdf = {
      'nombre_empresa': this.DataCliente.nombre,
      'nit_empresa': this.DataCliente.nit,
      'digito_empresa': this.DataCliente.digito_checkeo,
      'direccion_empresa': this.DataCliente.direccion,
      'nombre_proveedor': datosOrden.nombre_proveedor,
      'nit_proveedor': datosOrden.nit_proveedor,
      'direccion_proveedor': datosOrden.direccion_proveedor,
      'telefono_proveedor': datosOrden.telefono_proveedor,
      'consecutivo': datosOrden.consecutivo,
      'ruta_descarga': this.ruta_descarga_pdf,
      'fecha_pedido_pdf': datosOrden.fecha_pedido,
      'fecha_entrega_pdf': datosOrden.fecha_entrega,
      'forma_pago_pdf': datosOrden.forma_pago,
      'observaciones_pdf': datosOrden.observaciones,
      'subtotal': datosOrden.subtotal_orden,
      'impuesto': datosOrden.impuestos_orden,
      'total': datosOrden.total_orden,
      'movimientoArticulosPojo': articulosOrdenCompraDto.articulo
    };

    if (origen === 1) {
      this.GenerarPDFServidor(datos_pdf);
    } else if (origen === 2) {
      this.GenerarPDFLocal(datosOrden);
    }
  }

  GenerarPDFServidor(datosPdf) {
    this.ingresarordencompraService.postGenerarPdf(datosPdf).subscribe(
      data => {
        this.toastr.success(this.alertas.pdf);
      },
      err => {
        this.toastr.error(this.alertas.pdferror, err.response);
      }
    );
  }

  GenerarPDFLocal(datosOrden) {
    const doc = new jsPDF();

    const articulos = {
      articulo: []
    };

    /* DATOS CABECERA*/
    const ColumnsE = [this.DataCliente.nombre, 'Orden de Compra: ' + datosOrden.consecutivo];
    const rowsE = [''];

    doc.autoTable({
      columns: ColumnsE,
      body: rowsE,
      startY: 10,
      margin: {horizontal: 7},
      tableWidth: 'auto',
      styles: {columnWidth: 90, fontSize: 20},
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
      tableWidth: 60,
      margin: {horizontal: 7},
      styles: {columnWidth: 30, fontSize: 8},
      theme: 'plain'
    });

    /* DATOS PROVEEDOR Y PEDIDO*/
    const ColumnsDP = ['', ''];
    const rowsDP = [
      ['PROVEEDOR:', datosOrden.nombre_proveedor],
      ['NIT:', datosOrden.nit_proveedor],
      ['DIRECCIÓN:', datosOrden.direccion_proveedor],
      ['TELEFONO:', datosOrden.telefono_proveedor]
    ];
    doc.autoTable({
      columns: ColumnsDP,
      body: rowsDP,
      startY: 40,
      tableWidth: 60,
      margin: {horizontal: 7},
      styles: {columnWidth: 50, fontSize: 8},
      theme: 'plain'
    });

    const ColumnsDF = ['', ''];
    const rowsDF = [
      ['FECHA PEDIDO:', datosOrden.fecha_pedido],
      ['FECHA ENTREGA:', datosOrden.fecha_entrega],
      ['FORMA DE PAGO:', datosOrden.forma_pago],
      ['OBSERVACIONES:', datosOrden.observaciones]
    ];
    doc.autoTable({
      columns: ColumnsDF,
      body: rowsDF,
      startY: 40,
      margin: {horizontal: 110},
      styles: {columnWidth: 40, fontSize: 8},
      theme: 'plain'
    });

    /* DATOS  DE LOS ARTICULOS*/
    for (const key of this.articulosAgregados) {
      articulos.articulo.push(
        {
          'Descripcion': key.nombreArticulo,
          'Unidad': key.nom_unidad_compra,
          'Cantidad': key.cantidad,
          'ValorUnitario': key.precio_unitario,
          'Impuesto': key.valor_impuesto,
          'Total': key.total
        });
    }

    const columnsDA = [
      {header: 'Descripcion', dataKey: 'Descripcion'},
      {header: 'Unidad', dataKey: 'Unidad'},
      {header: 'Cantidad', dataKey: 'Cantidad'},
      {header: 'Valor Unitario', dataKey: 'ValorUnitario'},
      {header: 'Impuesto', dataKey: 'Impuesto'},
      {header: 'Total', dataKey: 'Total'}
    ];

    const rowsDA = articulos.articulo;

    doc.autoTable({
      columns: columnsDA,
      body: rowsDA,
      startY: 80,
      theme: 'grid',
      margin: {horizontal: 7},
      tableWidth: 'auto',
      tableLineColor: 0,
      tableLineWidth: 0.1,
      headerStyles: {lineWidth: 0.1, lineColor: [0, 0, 0]},
      bodyStyles: {lineWidth: 0.1, lineColor: [0, 0, 0]},
      styles: {columnWidth: 'auto', cellPadding: 0.5, fontSize: 10}

    });

    /* DATOS TOTALES*/
    const ColumnsDT = ['', ''];
    const rowsDT = [
      ['Subtotal:', datosOrden.subtotal_orden],
      ['Impuestos:', datosOrden.impuestos_orden],
      ['Total:', datosOrden.total_orden]
    ];
    doc.autoTable({
      columns: ColumnsDT,
      body: rowsDT,
      startY: doc.autoTable.previous.finalY + 5,
      margin: {horizontal: 150},
      styles: {cellWidth: 25, fontSize: 8, halign: 'right'},
      theme: 'plain'
    });


    /* DESCARGA PDF*/
    doc.save('OrdenCompra' + this.DataCliente.nit + '_' + datosOrden.consecutivo + '.pdf');
    this.toastr.success(this.alertas.pdf);
  }

  EnvioSolicitud(datosSolicitud) {
    console.log(this.DataCliente);
    const postDatos = {
      /* 'correo_origen': datosSolicitud.correo_origen,
      'clave': datosSolicitud.clave, */
      'correo_destino': datosSolicitud.correo_destino,
      'asunto': datosSolicitud.asunto,
      'contenido': datosSolicitud.contenido,
      'ruta_archivo': this.ruta_descarga_pdf + 'OrdenCompra' + this.DataCliente.nit + '_' + this.DataNewOrden.consecutivo + '.pdf'
    };
    this.ingresarordencompraService.postEmail(postDatos).subscribe(
      data => {
        if (data.text() == 'no se pudo enviar el correo') {
          this.toastr.error(this.alertas.correofallido);
          this.DataNewOrden.estadoEmail = false;
        } else {
          this.toastr.success(this.alertas.correoexitoso);
          this.DataNewOrden.estadoEmail = true;
        }
      },
      err => {
        if (err.status === 401) {
          this.toastr.error(this.alertas.correofallido);
        }
      }
    );
  }

  LimpiarFormArticulo() {
    this.DataNewArticulo = [];
    this.ordenesArtForm.reset();
    this.DataNewArticulo.ultimacompra = '';
    this.DataNewArticulo.id_articulo = '';
    this.DataNewArticulo.precio_unitario = '';
    this.DataNewArticulo.precio_total = '';
    this.DataNewArticulo.tarifa = '';
    this.DataNewArticulo.valor_negociado = '';
    this.DataNewArticulo.acuerdo_negocio = '';
    this.setValor();
  }

  setValor() {
    this.DataNewArticulo.valor = '1';
  }

  Siguiente() {
    console.log('Form Submitted!');
  }

}
