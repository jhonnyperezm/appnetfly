import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, PatternValidator} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {IMyDpOptions, IMyDateModel, IMySelector} from 'mydatepicker';
import {Alertas} from '../../alertas/mensajealertas';
import {RutasService} from '../../../services/rutas.service';
import {ModificarordencomprapendienteService} from './modificarordencomprapendiente.service';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-modificarordencomprapendiente',
  templateUrl: './modificarordencomprapendiente.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificarordencomprapendienteService, RutasService, Alertas, PatternValidator, DatePipe]
})
export class ModificarordencomprapendienteComponent implements OnInit {
  blockprecio:any;
  idMovCompras: any;
  idProveedor: any;
  DataProveedor: any = [];
  DataNewOrden: any = [];
  DataNewCompra: any = [];
  articulosAgregados: any = [];
  DataTotales: any = [];
  DiscriminacionImpuestos: any = [];
  DataNewArticulo: any = [];

  searchStringArt: any;
  itempageArt = 5;
  DataJsonArticulos: any = [];
  DataArrayArticulos: any = [];

  DataArrayCompras: any = [];

  mas_articulos = false;
  menos_articulos = false;

  btn_adicionar_articulo = true;
  btn_modificar_articulo = false;
  btn_modificar_articulo2 = false;
  tablaadicionados = true;

  ListaUltimasCompras: any = [];
  ListaUnidadesCompra: any = [];
  ListaTarifas: any = [];

  registros: any = [];
  registrosPendientes: any = [];
  registrosDevolucion: any = [];

  searcharticulosagregados: any;
  itempagearticulosagregados = 5;
  searcharticulosfinalizados: any;
  itempagearticulosfinalizados = 5;
  ListaImpuestos: any = [];
  asig_articulos = false;

  DataArrayNegociacion: any = [];
  DatosNegociacion: any = [];
  idArticuloInventario: any;
  valorUltimaCompra: any = [];

  nombreArticuloEliminar: any;
  idTablaEliminar: any;

  articulosPendientes: any = [];
  DataNewPendiente: any = [];
  DataNewDevolucion: any = [];
  DatosArticuloDevolucion: any = [];
  cant_superior = false;

  articulosDevoluciones: any = [];
  DataConsecutivo: any = [];

  DataArrayPendientes: any = [];
  ListaArticulosPendientes: any = [];

  DataArrayDevoluciones: any = [];
  ListaArticulosDevolucion: any = [];

  searchStringPendientes: any;
  itempagePendientes = 5;
  searchStringDevoluciones: any;
  itempageDevoluciones = 5;

  PendientesComprados: any = [];
  DevolucionesCompradas: any = [];
  itempagenewpendiente = 5;
  itempagenewdevolucion = 5;

  DataCliente: any = [];
  marti: any;
  td: any;
  tp: any;
  artf: any;
  fecha_vencimiento: any;
  fecha_kardex: any;
  fecha_compra: any;

  art_agr:number=1;
  np:number=1;
  nd:number=1;

  @ViewChild('ordenesDosForm', {static: true})
  private ordenesDosForm: NgForm;

  @ViewChild('ordenesTresForm', {static: true})
  private ordenesTresForm: NgForm;

  @ViewChild('devolucioncompra', {static: true})
  private devolucioncompra: NgForm;

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
              private toastr: ToastrService,
              public modificarordencomprapendienteService: ModificarordencomprapendienteService,
              public rutasService: RutasService,
              public alertas: Alertas,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
    this.idMovCompras = this.route.snapshot.params.id;
    this.idProveedor = this.route.snapshot.params.idProveedor;
  }

  ngOnInit() {
    this.LoadOrdenCompraPendientesData();
    this.LoadProveedorData();
    this.LoadArticulosData();
    this.LoadImpuestos();
    this.LoadConsecutivo();
    this.LoadConsecutivoPendiente();
    this.LoadConsecutivoDevolucion();
    this.LoadDatosCliente();
    this.DataNewArticulo.valor = 1;
    this.DataNewArticulo.antes_descuento = '1';
    this.DataNewArticulo.valor_descuento = '1';
    this.DataNewArticulo.incluye_impuesto = false;
    this.DataNewArticulo.incluye_descuentos = false;
    this.DataNewArticulo.porcentaje = '';
    this.DataNewArticulo.valor_absoluto = '';
    this.DataNewArticulo.precio_total = '';
    this.DataNewArticulo.tarifa = '';
    this.DataNewArticulo.precio_unitario = '';
    this.DataNewArticulo.valor_negociado = '';
    this.DataNewArticulo.acuerdo_negocio = '';
    this.btn_adicionar_articulo = true;
    this.btn_modificar_articulo = false;
    this.btn_modificar_articulo2 = false;
    //this.enEdicion = 0;
  }

  LoadOrdenCompraPendientesData() {
    this.modificarordencomprapendienteService.getOrdenComprasPendientes(this.idMovCompras).subscribe(
      data => {

        const fecha = new Date();
        this.DataArrayCompras = data;
        for (const key of this.DataArrayCompras) {

          const separadorfp = 'T',
            fechaPedidoSinHora = key.fecha_pedido.split(separadorfp);

          const separadorfe = 'T',
            fechaEntregaSinHora = key.fecha_entrega.split(separadorfe);

          this.DataNewOrden.fecha_pedido = fechaPedidoSinHora[0];
          this.DataNewOrden.fecha_entrega = fechaEntregaSinHora[0];

          this.DataNewOrden.id_orden = key.id_orden;
          if (key.num_factura === '0') {
            this.DataNewOrden.numerofactura = '';
          } else {
            this.DataNewOrden.numerofactura = key.num_factura;
          }
          this.DataNewOrden.estadoEmail = key.estado_email;
          this.DataNewOrden.observaciones = key.descripcion;
          this.DataNewOrden.forma_pago = key.forma_pago;
          this.DataNewOrden.id_pro = parseInt(key.id_proveedor, 0);
        }
      }
    );
  }

  LoadProveedorData() {
    this.modificarordencomprapendienteService.getDataProveedor(this.idProveedor).subscribe(
      data => {
        this.DataNewOrden.nombre_proveedor = data[0].razon_social;
        this.DataNewOrden.nit_proveedor = data[0].nit;
        this.DataNewOrden.direccion_proveedor = data[0].direccion;
        this.DataNewOrden.telefono_proveedor = data[0].telefono;
        this.DataNewOrden.asigna_articulos = data[0].asignar_articulo;
        this.validarAsignacionArticulos(this.idProveedor);
        this.LoadPendientesCliente(this.idProveedor);
        this.LoadDevolucionesCliente(this.idProveedor);
      }
    );
  }

  LoadDatosCliente() {
    this.modificarordencomprapendienteService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
      }
    );
  }

  LoadPendientesCliente(idProveedor) {
    this.modificarordencomprapendienteService.getPendientes(idProveedor).subscribe(
      data => {
        this.DataArrayPendientes = data;

        for (const key of this.DataArrayPendientes) {
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
          this.ListaArticulosPendientes.push({
            'id': key.id,
            'idtabla': this.registrosPendientes.length + 1,
            'id_articulo': key.id_articulo,
            'nombreArticulo': key.nombre_articulo,
            'id_unidad_compra': key.id_unidad_compra,
            'nom_unidad_compra': key.unidad_compra,
            'cantidad': key.cantidad,
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
            'incluye_descuentos': key.incluye_descuentos,
            'descuento': key.descuento,
            'valor_descuento': key.tipo_descuento,
            'antes_descuento': key.base_cal_imp_desc,
            'valor_absoluto': key.valor_absoluto,
            'porcentaje': key.porcentaje,
            'valor_negociado': key.valor_negociado,
            'acuerdo_negocio': key.acuerdo_negocio,
            'valor_bruto': key.total_bruto,
            'base': key.total_bruto,
            'subtotal': key.subtotal,
            'total': key.total,
            'valor_total': key.total
          });
          this.registrosPendientes.push('pendiente1');
        }
      }
    );
  }

  LoadDevolucionesCliente(idProveedor) {
    this.modificarordencomprapendienteService.getDevoluciones(idProveedor).subscribe(
      data => {
        this.DataArrayDevoluciones = data;

        for (const key of this.DataArrayDevoluciones) {
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
          this.ListaArticulosDevolucion.push({
            'id': key.id,
            'idtabla': this.registrosDevolucion.length + 1,
            'id_articulo': key.id_articulo,
            'nombreArticulo': key.nombre_articulo,
            'id_unidad_compra': key.id_unidad_compra,
            'nom_unidad_compra': key.unidad_compra,
            'cantidad': key.cantidad,
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
            'incluye_descuentos': key.incluye_descuentos,
            'descuento': key.descuento,
            'valor_descuento': key.tipo_descuento,
            'antes_descuento': key.base_cal_imp_desc,
            'valor_absoluto': key.valor_absoluto,
            'porcentaje': key.porcentaje,
            'valor_negociado': key.valor_negociado,
            'acuerdo_negocio': key.acuerdo_negocio,
            'valor_bruto': key.total_bruto,
            'base': key.total_bruto,
            'subtotal': key.subtotal,
            'total': key.total,
            'valor_total': key.total
          });
          this.registrosDevolucion.push('devolucion1');
        }
      }
    );
  }

  LoadArticulosData() {
    this.modificarordencomprapendienteService.getDataArticulos(this.idMovCompras).subscribe(
      data => {
        this.articulosAgregados = [];
        this.DataArrayArticulos = data;
        for (const key of this.DataArrayArticulos) {
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
          this.articulosAgregados.push({
            'id': key.id,
            'idtabla': this.registros.length + 1,
            'id_art': key.id_articulo,
            'nombreArt': key.nombre_articulo,
            'id_unidad_com': key.id_unidad_compra,
            'nom_unidad_com': key.unidad_compra,
            'cant': key.cantidad,
            'cantidad_original': key.cantidad,
            'id_unidad_kar': key.id_unidad_kardex,
            'nom_unidad_kar': key.nombre_kardex,
            'id_unidad_alt': key.id_unidad_alterna,
            'valor': key.tipo_valor,
            'precio_uni': key.precio,
            'precio_tot': parseInt(key.precio, 0) * parseInt(key.cantidad, 0),
            'incluye_imp': key.incluye_impuesto,
            'imp': key.id_impuesto,
            'nombreImp': key.nombre_impuesto,
            'valor_imp': key.valor_impuesto,
            'tar': key.id_tarifa,
            'valor_tar': key.valor_tarifa,
            'valor_neg': key.valor_negociado,
            'acuerdo_neg': key.acuerdo_negocio,
            'basecom': key.total_bruto,
            'subtotal': key.total,
            'totalcom': key.total,
            'origen': 'compra'
          });
          this.registros.push('item1');
        }
      }
    );
  }

  LoadConsecutivo() {
    this.modificarordencomprapendienteService.getConsecutivo().subscribe(
      data => {
        this.DataNewOrden.consecutivo = parseInt(data, 0);
        this.DataNewOrden.id_compra = parseInt(data, 0);
      }
    );
  }

  LoadConsecutivoPendiente() {
    this.modificarordencomprapendienteService.getConsecutivoPendiente().subscribe(
      data => {
        this.DataConsecutivo.consecutivo_pendiente = parseInt(data, 0);
      }
    );
  }

  LoadConsecutivoDevolucion() {
    this.modificarordencomprapendienteService.getConsecutivoDevolucion().subscribe(
      data => {
        this.DataConsecutivo.consecutivo_devolucion = parseInt(data, 0);
      }
    );
  }

  /**
   * Cambio del formato para la fecha de kardex
   * @param event
   */
  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.selectedTextNormal = event.formatted;
      this.border = '1px solid #CCC';
      this.DataNewOrden.fecha_compra = event.formatted;
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
      this.DataNewOrden.fecha_kardex = event.formatted;
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged3(event: IMyDateModel) {

    if (event.formatted !== '') {
      this.selectedTextNormal3 = event.formatted;
      this.border = '1px solid #CCC';
      this.DataNewOrden.fecha_vencimiento = event.formatted;
      this.IgualarFechas3();
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  IgualarFechas1() {
    if (this.DataNewOrden.fecha_compra >= this.DataNewOrden.fecha_kardex) {
      this.DataNewOrden.fecha_kardex = this.DataNewOrden.fecha_compra;
      this.DataNewOrden.fecha_vencimiento = this.DataNewOrden.fecha_compra;
    } else {

    }
  }

  IgualarFechas3() {
    if (this.DataNewOrden.fecha_vencimiento >= this.DataNewOrden.fecha_compra) {

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

  LoadImpuestos() {
    this.modificarordencomprapendienteService.getImpuestos().subscribe(
      data => {
        this.ListaImpuestos = data;
      }
    );
  }

  validarAsignacionArticulos(idProveedor) {
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

    this.modificarordencomprapendienteService.getUltimosArticulosProveedor(idProveedor).subscribe(
      data => {

        this.DataArrayArticulos = data;
        this.DataJsonArticulos = [];
        if (this.DataArrayArticulos.length !== 0) {
          for (const key of this.DataArrayArticulos) {
            if (key.movimientoArticulosPojo.length !== 0) {
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
            } else {
            }
          }
        } else {
          this.LoadTodosArticulosInventario();
          this.mas_articulos = false;
          this.menos_articulos = false;
        }
      }
    );
  }

  LoadTodosArticulosInventario() {
    this.mas_articulos = false;
    this.menos_articulos = true;
    this.modificarordencomprapendienteService.getArticulosInventario().subscribe(
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
    this.modificarordencomprapendienteService.getArticulosNegociacion(idProveedor).subscribe(
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
    this.modificarordencomprapendienteService.getMasArticulos(idProveedor).subscribe(
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
      this.modificarordencomprapendienteService.getNegociacionArticulo(idArticulo, idProveedor).subscribe(
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
        this.DataNewArticulo.precio_unitario = this.DataNewArticulo.valor_negociado;

        if (this.DataNewArticulo.fecha_inicial !== undefined && this.DataNewArticulo.fecha_final !== undefined) {
          if (this.DataNewArticulo.fecha_inicial <= this.DataNewOrden.fecha_entrega
            && this.DataNewArticulo.fecha_final >= this.DataNewOrden.fecha_entrega) {
            Swal.fire({
              title: 'El Articulo: ' + this.DataNewArticulo.nombreArticulo + '\n' + ' posee un precio Negociado ',
              text: 'Unidad Kardex Negociada: ' + this.DataNewArticulo.nom_unidad_kardex + '\n\n' +
                'Valor Negociado: ' + this.DataNewArticulo.valor_negociado,
              type: 'success',
            });
          } else {
            Swal.fire({
              title: 'Información',
              text: 'El acuerdo de negociación caduco por tiempo, Ultimo valor de negociación: ' + this.DataNewArticulo.valor_negociado,
              type: 'warning',
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Aceptar',
            });
          }
        } else {
          console.log('tiene precio negociado pero no rango de fechas');
        }
      } else {
        console.log('El articulo no tiene acuerdo de negociación');
        this.DataNewArticulo.precio_unitario = this.DataNewArticulo.precio_unitario;
        // this.DataNewArticulo.precio_unitario = '';
      }
    }

    this.LoadArticuloInventario(idArticulo);
    this.LoadValorUnidadUltimaCompraArticulo(idArticulo);
  }

  LoadArticuloInventario(idArticulo) {
    this.modificarordencomprapendienteService.getArticuloInventario(idArticulo).subscribe(
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
    this.modificarordencomprapendienteService.getUnidadCompra(idArt).subscribe(
      data => {
        this.ListaUnidadesCompra = data;
      }
    );
  }

  LoadValorUnidadUltimaCompraArticulo(idArticulo) {
    this.modificarordencomprapendienteService.getValorUltimaCompra(idArticulo).subscribe(
      data => {
        this.valorUltimaCompra = data;
        if (this.valorUltimaCompra.length >= 1) {
          this.DataNewArticulo.ultimacompra = this.valorUltimaCompra[0].precio;
        }
      }
    );
  }


  LoadTarifas(IdImp) {
    if (IdImp === null) {

    } else {
      this.DataNewArticulo.nombreImpuesto = this.ListaImpuestos.filter(x =>
        parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].nombre_imp;
      const idRegimen = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].id_regimen;

      this.modificarordencomprapendienteService.getImpuestoTarifa(IdImp, idRegimen).subscribe(
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

  AgregarArticulo() {
    this.btn_adicionar_articulo = true;
    this.btn_modificar_articulo = false;

    this.DataNewArticulo.nom_unidad_compra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(this.DataNewArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    this.articulosAgregados.push({
        idtabla: this.registros.length + 1,
        id_art: this.DataNewArticulo.id_articulo,
        nombreArt: this.DataNewArticulo.nombreArticulo,
        id_unidad_com: this.DataNewArticulo.id_unidad_compra,
        nom_unidad_com: this.DataNewArticulo.nom_unidad_compra,
        cant: this.DataNewArticulo.cantidad,
        id_unidad_kar: this.DataNewArticulo.id_unidad_kardex,
        nom_unidad_kar: this.DataNewArticulo.nom_unidad_kardex,
        id_unidad_alt: this.DataNewArticulo.id_unidad_alterna,
        ultimacom: this.DataNewArticulo.ultimacompra,
        valor: this.DataNewArticulo.valor,
        precio_uni: this.DataNewArticulo.precio_unitario,
        precio_tot: this.DataNewArticulo.precio_total,
        incluye_imp: false,
        imp: this.DataNewArticulo.impuesto,
        nombreImp: this.DataNewArticulo.nombreImpuesto,
        valor_imp: this.DataNewArticulo.valor_impuesto,
        tar: this.DataNewArticulo.tarifa,
        valor_tar: this.DataNewArticulo.valor_tarifa,
        basecom: this.DataNewArticulo.base,
        totalcom: this.DataNewArticulo.total,
        acuerdo_neg: this.DataNewArticulo.acuerdo_negocio,
        valor_neg: this.DataNewArticulo.valor_negociado,
        fecha_ini: this.DataNewArticulo.fecha_inicial,
        fecha_fin: this.DataNewArticulo.fecha_final,
        origen: 'compra'

      }
    );
    this.registros.push('item2');

    setTimeout(() => this.toastr.success(this.articulosAgregados.nombre_articulo, 'Articulo Adicionado Con Exito'));
    this.LimpiarFormArticulo();
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
    this.DataNewArticulo.idtabla = datosArticulo.idtabla;
    this.DataNewArticulo.id_articulo = datosArticulo.id_art;
    this.DataNewArticulo.nombreArticulo = datosArticulo.nombreArt;
    this.DataNewArticulo.id_unidad_compra = datosArticulo.id_unidad_com;
    this.DataNewArticulo.nom_unidad_compra = datosArticulo.nom_unidad_com;
    this.DataNewArticulo.cantidad_original = datosArticulo.cantidad_original;
    this.DataNewArticulo.cantidad = datosArticulo.cant;
    this.DataNewArticulo.id_unidad_kardex = datosArticulo.id_unidad_kar;
    this.DataNewArticulo.nom_unidad_kardex = datosArticulo.nom_unidad_kar;
    this.DataNewArticulo.id_unidad_alterna = datosArticulo.id_unidad_alt;
    this.DataNewArticulo.ultimacompra = datosArticulo.ultimacom;
    this.DataNewArticulo.valor = datosArticulo.valor;
    this.DataNewArticulo.precio_unitario = datosArticulo.precio_uni;
    this.DataNewArticulo.precio_total = datosArticulo.precio_tot;
    this.DataNewArticulo.incluye_impuesto = datosArticulo.incluye_imp;
    this.DataNewArticulo.impuesto = datosArticulo.imp;
    this.DataNewArticulo.nombreImpuesto = datosArticulo.nombreImp;
    this.DataNewArticulo.valor_impuesto = datosArticulo.valor_imp;
    this.DataNewArticulo.tarifa = datosArticulo.tar;
    this.DataNewArticulo.valor_tarifa = datosArticulo.valor_tar;
    this.DataNewArticulo.base = datosArticulo.basecom;
    this.DataNewArticulo.total = datosArticulo.totalcom;
    this.DataNewArticulo.acuerdo_negocio = datosArticulo.acuerdo_neg;
    this.DataNewArticulo.valor_negociado = datosArticulo.valor_neg;
    this.DataNewArticulo.fecha_inicial = datosArticulo.fecha_ini;
    this.DataNewArticulo.fecha_final = datosArticulo.fecha_fin;
    this.DataNewArticulo.origen = datosArticulo.origen;

    this.GuardarArticuloSel(this.DataNewArticulo.id_articulo, this.DataNewOrden);
    this.LoadTarifas(this.DataNewArticulo.impuesto);
    this.LoadValorUnidadUltimaCompraArticulo(this.DataNewArticulo.id_articulo);
    this.btn_adicionar_articulo = false;
    this.btn_modificar_articulo = true;
  }

  EditArticulo(datosArticulo) {
    this.btn_adicionar_articulo = true;
    this.btn_modificar_articulo = false;
    this.btn_modificar_articulo2 = false;
    for (let i = 0; i < this.articulosAgregados.length; i++) {
      if (parseInt(this.articulosAgregados[i].idtabla, 0) === parseInt(datosArticulo.idtabla, 0)) {
        this.articulosAgregados[i].idtabla = datosArticulo.idtabla;
        this.articulosAgregados[i].id_art = datosArticulo.id_articulo;
        this.articulosAgregados[i].nombreArt = datosArticulo.nombreArticulo;
        this.articulosAgregados[i].id_unidad_com = datosArticulo.id_unidad_compra;
        this.articulosAgregados[i].nom_unidad_com = datosArticulo.nom_unidad_compra;
        this.articulosAgregados[i].cant = datosArticulo.cantidad;
        this.articulosAgregados[i].id_unidad_kar = datosArticulo.id_unidad_kardex;
        this.articulosAgregados[i].nom_unidad_kar = datosArticulo.nom_unidad_kardex;
        this.articulosAgregados[i].id_unidad_alt = datosArticulo.id_unidad_alterna;
        this.articulosAgregados[i].ultimacom = datosArticulo.ultimacompra;
        this.articulosAgregados[i].valor = datosArticulo.valor;
        this.articulosAgregados[i].precio_uni = datosArticulo.precio_unitario;
        this.articulosAgregados[i].precio_tot = datosArticulo.precio_total;
        this.articulosAgregados[i].incluye_imp = datosArticulo.incluye_impuesto;
        this.articulosAgregados[i].imp = datosArticulo.impuesto;
        this.articulosAgregados[i].nombreImp = datosArticulo.nombreImpuesto;
        this.articulosAgregados[i].valor_imp = datosArticulo.valor_impuesto;
        this.articulosAgregados[i].tar = datosArticulo.tarifa;
        this.articulosAgregados[i].valor_tar = datosArticulo.valor_tarifa;
        this.articulosAgregados[i].basecom = datosArticulo.base;
        this.articulosAgregados[i].totalcom = datosArticulo.total;
        this.articulosAgregados[i].acuerdo_neg = datosArticulo.acuerdo_negocio;
        this.articulosAgregados[i].valor_neg = datosArticulo.valor_negociado;
        this.articulosAgregados[i].fecha_ini = datosArticulo.fecha_inicial;
        this.articulosAgregados[i].fecha_fin = datosArticulo.fecha_final;
        this.articulosAgregados[i].origen = datosArticulo.origen;

      }
    }
    if (datosArticulo.cantidad_original !== undefined) {
      if (datosArticulo.cantidad < datosArticulo.cantidad_original) {
        this.createPendiente(datosArticulo);
      }
    }
    this.LimpiarFormArticulo();
  }

  createPendiente(datosPendiente) {
    const cantidad = parseInt(datosPendiente.cantidad_original, 0) - parseInt(datosPendiente.cantidad, 0);

    let mult, div, valor_orden, base, total, valor_imp;
    mult = cantidad * datosPendiente.precio_unitario;
    div = datosPendiente.valor_tarifa / 100;
    base = mult;
    total = base * div;
    valor_imp = total;
    valor_orden = total + base;
    total = valor_orden;

    this.articulosPendientes.push({
        idtabla: this.registrosPendientes.length + 1,
        id_art: datosPendiente.id_articulo,
        nombreArt: datosPendiente.nombreArticulo,
        id_unidad_com: datosPendiente.id_unidad_compra,
        nom_unidad_com: datosPendiente.nom_unidad_compra,
        cant: cantidad,
        id_unidad_kar: datosPendiente.id_unidad_kardex,
        nom_unidad_kar: datosPendiente.nom_unidad_kardex,
        id_unidad_alt: datosPendiente.id_unidad_alterna,
        ultimacom: datosPendiente.ultimacompra,
        valor: datosPendiente.valor,
        precio_uni: datosPendiente.precio_unitario,
        precio_tot: datosPendiente.precio_total,
        incluye_imp: datosPendiente.incluye_impuesto,
        imp: datosPendiente.impuesto,
        nombreImp: datosPendiente.nombreImpuesto,
        valor_imp: valor_imp,
        tar: datosPendiente.tarifa,
        valor_tar: datosPendiente.valor_tarifa,
        basecom: base,
        totalcom: total,
        acuerdo_neg: datosPendiente.acuerdo_negocio,
        valor_neg: datosPendiente.valor_negociado,
        fecha_ini: datosPendiente.fecha_inicial,
        fecha_fin: datosPendiente.fecha_final
      }
    );
    this.registrosPendientes.push('item2');
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

    this.DataNewArticulo.idtabla = datosArticulo.idtabla;
    this.DataNewArticulo.id_articulo = datosArticulo.id_art;
    this.DataNewArticulo.nombreArticulo = datosArticulo.nombreArt;
    this.DataNewArticulo.id_unidad_compra = datosArticulo.id_unidad_com;
    this.DataNewArticulo.nom_unidad_compra = datosArticulo.nom_unidad_com;
    this.DataNewArticulo.cantidad_original = datosArticulo.cantidad_original;
    this.DataNewArticulo.cantidad = datosArticulo.cant;
    this.DataNewArticulo.id_unidad_kardex = datosArticulo.id_unidad_kar;
    this.DataNewArticulo.nom_unidad_kardex = datosArticulo.nom_unidad_kar;
    this.DataNewArticulo.id_unidad_alterna = datosArticulo.id_unidad_alt;
    this.DataNewArticulo.ultimacompra = datosArticulo.ultimacom;
    this.DataNewArticulo.valor = datosArticulo.valor;
    this.DataNewArticulo.precio_unitario = datosArticulo.precio_uni;
    this.DataNewArticulo.precio_total = datosArticulo.precio_tot;
    this.DataNewArticulo.incluye_impuesto = datosArticulo.incluye_imp;
    this.DataNewArticulo.impuesto = datosArticulo.imp;
    this.DataNewArticulo.nombreImpuesto = datosArticulo.nombreImp;
    this.DataNewArticulo.valor_impuesto = datosArticulo.valor_imp;
    this.DataNewArticulo.tarifa = datosArticulo.tar;
    this.DataNewArticulo.valor_tarifa = datosArticulo.valor_tar;
    this.DataNewArticulo.base = datosArticulo.basecom;
    this.DataNewArticulo.total = datosArticulo.totalcom;
    this.DataNewArticulo.acuerdo_negocio = datosArticulo.acuerdo_neg;
    this.DataNewArticulo.valor_negociado = datosArticulo.valor_neg;
    this.DataNewArticulo.fecha_inicial = datosArticulo.fecha_ini;
    this.DataNewArticulo.fecha_final = datosArticulo.fecha_fin;
    this.DataNewArticulo.origen = datosArticulo.origen;

    this.tablaadicionados = false;

    this.GuardarArticuloSel(this.DataNewArticulo.id_articulo, this.DataNewOrden);
    this.LoadTarifas(this.DataNewArticulo.impuesto);
    this.LoadValorUnidadUltimaCompraArticulo(this.DataNewArticulo.id_articulo);
  }


  ComprarTodosPendientes(listaPendientes) {
    for (const datosPendiente of listaPendientes) {
      this.ComprarPendiente(datosPendiente);
      this.EliminarTodosPendientes();
    }
  }

  ComprarPendiente(datosPendiente) {

    this.PendientesComprados.push({
      'id': datosPendiente.id
    });

    this.articulosAgregados.push({
      idtabla: this.registros.length + 1,
      id_art: datosPendiente.id_articulo,
      nombreArt: datosPendiente.nombreArticulo,
      id_unidad_com: datosPendiente.id_unidad_compra,
      nom_unidad_com: datosPendiente.nom_unidad_compra,
      cant: datosPendiente.cantidad,
      id_unidad_kar: datosPendiente.id_unidad_kardex,
      nom_unidad_kar: datosPendiente.nom_unidad_kardex,
      id_unidad_alt: datosPendiente.id_unidad_alterna,
      ultimacom: datosPendiente.ultimacompra,
      valor: datosPendiente.tipo_valor,
      precio_uni: datosPendiente.precio_unitario,
      precio_tot: datosPendiente.precio_total,
      incluye_imp: datosPendiente.incluye_impuesto,
      imp: datosPendiente.impuesto,
      nombreImp: datosPendiente.nombreImpuesto,
      valor_imp: datosPendiente.valor_impuesto,
      tar: datosPendiente.idTarifa,
      valor_tar: datosPendiente.tarifa,
      basecom: datosPendiente.base,
      totalcom: datosPendiente.total,
      acuerdo_neg: datosPendiente.acuerdo_negocio,
      valor_neg: datosPendiente.valor_negociado,
      fecha_ini: datosPendiente.fecha_inicial,
      fecha_fin: datosPendiente.fecha_final,
      origen: 'pendiente'

    });
    this.registros.push('item3');
    this.CalculoTotalesCompra();
  }

  EliminarPendiente(idtabla) {
    for (let i = 0; i < this.ListaArticulosPendientes.length; i++) {
      let index;
      if (parseInt(idtabla, 0) === parseInt(this.ListaArticulosPendientes[i].idtabla, 0)) {
        index = this.ListaArticulosPendientes.indexOf(this.ListaArticulosPendientes[i]);
        this.ListaArticulosPendientes.splice(index, 1);
      }
    }
  }

  EliminarTodosPendientes() {
    this.ListaArticulosPendientes = [];
  }

  ComprarTodosDevoluciones(ListaDevoluciones) {
    for (const key of ListaDevoluciones) {
      this.ComprarDevolucion(key);
      this.EliminarTodasDevoluciones();
    }
  }

  ComprarDevolucion(datosDevolucion) {
    if (datosDevolucion.id !== undefined) {
      this.DevolucionesCompradas.push({
        'id': datosDevolucion.id
      });
    }
    this.articulosAgregados.push({
      idtabla: this.registros.length + 1,
      id_art: datosDevolucion.id_articulo,
      nombreArt: datosDevolucion.nombreArticulo,
      id_unidad_com: datosDevolucion.id_unidad_compra,
      nom_unidad_com: datosDevolucion.nom_unidad_compra,
      cant: datosDevolucion.cantidad,
      id_unidad_kar: datosDevolucion.id_unidad_kardex,
      nom_unidad_kar: datosDevolucion.nom_unidad_kardex,
      id_unidad_alt: datosDevolucion.id_unidad_alterna,
      ultimacom: datosDevolucion.ultimacompra,
      valor: datosDevolucion.tipo_valor,
      precio_uni: datosDevolucion.precio_unitario,
      precio_tot: datosDevolucion.precio_total,
      incluye_imp: datosDevolucion.incluye_impuesto,
      imp: datosDevolucion.impuesto,
      nombreImp: datosDevolucion.nombreImpuesto,
      valor_imp: datosDevolucion.valor_impuesto,
      tar: datosDevolucion.idTarifa,
      valor_tar: datosDevolucion.tarifa,
      basecom: datosDevolucion.base,
      totalcom: datosDevolucion.total,
      acuerdo_neg: datosDevolucion.acuerdo_negocio,
      valor_neg: datosDevolucion.valor_negociado,
      fecha_ini: datosDevolucion.fecha_inicial,
      fecha_fin: datosDevolucion.fecha_final,
      origen: 'devolucion'

    });
    this.registros.push('item4');

    this.CalculoTotalesCompra();
  }

  EliminarDevolucion(idtabla) {
    for (let i = 0; i < this.ListaArticulosDevolucion.length; i++) {
      let index;
      if (parseInt(idtabla, 0) === parseInt(this.ListaArticulosDevolucion[i].idtabla, 0)) {
        index = this.ListaArticulosDevolucion.indexOf(this.ListaArticulosDevolucion[i]);
        this.ListaArticulosDevolucion.splice(index, 1);
      }
    }
  }

  EliminarTodasDevoluciones() {
    this.ListaArticulosDevolucion = [];
  }

  bindingDevolver(datosArticulo) {
    this.DatosArticuloDevolucion = datosArticulo;
  }

  ValidarCantidad(cant_parcial, cantCompra) {
    if (parseInt(cant_parcial, 0) >= parseInt(cantCompra, 0)) {
      this.toastr.error('La cantidad no puede ser igual o superior a la compra', 'Verificar');
      this.cant_superior = true;
    } else {
      this.cant_superior = false;
    }

  }

  createDevolucion(datosDevolucion, datosArticuloDev) {
    let mult_dev, div_dev, valor_orden_dev, base_dev, total_dev, valor_imp_dev, cantidadDevolver;

    if (datosDevolucion.tipo === 1) {
      cantidadDevolver = datosDevolucion.cantidad_parcial;
    } else if (datosDevolucion.tipo === 2) {
      cantidadDevolver = datosArticuloDev.cant;
    }
    mult_dev = cantidadDevolver * datosArticuloDev.precio_uni;
    div_dev = datosArticuloDev.valor_tar / 100;
    base_dev = mult_dev;
    total_dev = base_dev * div_dev;
    valor_imp_dev = total_dev;
    valor_orden_dev = total_dev + base_dev;
    total_dev = valor_orden_dev;

    this.articulosDevoluciones.push({
        idtabla: this.registrosPendientes.length + 1,
        id_art: datosArticuloDev.id_art,
        nombreArt: datosArticuloDev.nombreArt,
        id_unidad_com: datosArticuloDev.id_unidad_com,
        nom_unidad_com: datosArticuloDev.nom_unidad_com,
        cant: cantidadDevolver,
        id_unidad_kar: datosArticuloDev.id_unidad_kar,
        nom_unidad_kar: datosArticuloDev.nom_unidad_kar,
        id_unidad_alt: datosArticuloDev.id_unidad_alt,
        ultimacom: datosArticuloDev.ultimacom,
        valor: datosArticuloDev.valor,
        precio_uni: datosArticuloDev.precio_uni,
        precio_tot: datosArticuloDev.precio_tot,
        incluye_imp: datosArticuloDev.incluye_imp,
        imp: datosArticuloDev.imp,
        nombreImp: datosArticuloDev.nombreImp,
        valor_imp: valor_imp_dev,
        tar: datosArticuloDev.tar,
        valor_tar: datosArticuloDev.valor_tar,
        basecom: base_dev,
        totalcom: total_dev,
        acuerdo_neg: datosArticuloDev.acuerdo_neg,
        valor_neg: datosArticuloDev.valor_neg,
        fecha_ini: datosArticuloDev.fecha_ini,
        fecha_fin: datosArticuloDev.fecha_fin

      }
    );
    this.registrosPendientes.push('item1');

    let mult, div, valor_orden, base, total, valor_imp, cantidad;
    cantidad = datosArticuloDev.cant - cantidadDevolver;
    mult = cantidad * datosArticuloDev.precio_uni;
    div = datosArticuloDev.valor_tar / 100;
    base = mult;
    total = base * div;
    valor_imp = total;
    valor_orden = total + base;
    total = valor_orden;
    if (parseInt(cantidad, 0) !== 0) {
      for (let i = 0; i < this.articulosAgregados.length; i++) {
        if (parseInt(this.articulosAgregados[i].idtabla, 0) === parseInt(datosArticuloDev.idtabla, 0)) {
          this.articulosAgregados[i].idtabla = datosArticuloDev.idtabla;
          this.articulosAgregados[i].id_art = datosArticuloDev.id_art;
          this.articulosAgregados[i].nombreArt = datosArticuloDev.nombreArt;
          this.articulosAgregados[i].id_unidad_com = datosArticuloDev.id_unidad_com;
          this.articulosAgregados[i].nom_unidad_com = datosArticuloDev.nom_unidad_com;
          this.articulosAgregados[i].cant = cantidad;
          this.articulosAgregados[i].id_unidad_kar = datosArticuloDev.id_unidad_kar;
          this.articulosAgregados[i].nom_unidad_kar = datosArticuloDev.nom_unidad_kar;
          this.articulosAgregados[i].id_unidad_alt = datosArticuloDev.id_unidad_alt;
          this.articulosAgregados[i].ultimacom = datosArticuloDev.ultimacom;
          this.articulosAgregados[i].valor = datosArticuloDev.valor;
          this.articulosAgregados[i].precio_uni = datosArticuloDev.precio_uni;
          this.articulosAgregados[i].precio_tot = datosArticuloDev.precio_tot;
          this.articulosAgregados[i].incluye_imp = datosArticuloDev.incluye_imp;
          this.articulosAgregados[i].imp = datosArticuloDev.imp;
          this.articulosAgregados[i].nombreImp = datosArticuloDev.nombreImp;
          this.articulosAgregados[i].valor_imp = valor_imp;
          this.articulosAgregados[i].tar = datosArticuloDev.tar;
          this.articulosAgregados[i].valor_tar = datosArticuloDev.valor_tar;
          this.articulosAgregados[i].basecom = base;
          this.articulosAgregados[i].totalcom = total;
          this.articulosAgregados[i].acuerdo_neg = datosArticuloDev.acuerdo_neg;
          this.articulosAgregados[i].valor_neg = datosArticuloDev.valor_neg;
          this.articulosAgregados[i].fecha_ini = datosArticuloDev.fecha_ini;
          this.articulosAgregados[i].fecha_fin = datosArticuloDev.fecha_fin;
          this.articulosAgregados[i].origen = datosArticuloDev.origen;
        }
      }
    } else {
      this.DeleteArticulo(datosArticuloDev.idtabla);
    }
    this.CalculoTotalesCompra();
  }

  ValidarNumeroFactura(datosCompra) {
    this.modificarordencomprapendienteService.getNumeroFactura(datosCompra.numerofactura, datosCompra.id_pro).subscribe(data => {
      if (data.text() !== 'El numero de factura no existe para este cliente') {
        setTimeout(() => this.toastr.error(data.text()));
      } else {
        this.CerrarOrden();
        if (this.PendientesComprados.length !== 0) {
          this.ActualizarPendientes();
        }
        if (this.DevolucionesCompradas.length !== 0) {
          this.ActualizarDevoluciones();
        }
        this.GenerarCompra(1, datosCompra);
      }
    });
  }

  ActualizarPendientes() {
    this.modificarordencomprapendienteService.actualizarPendientes(this.PendientesComprados).subscribe(data => {
      // console.log(data);
    });
  }

  ActualizarDevoluciones() {
    this.modificarordencomprapendienteService.actualizarDevoluciones(this.DevolucionesCompradas).subscribe(data => {
      console.log(data);
    });
  }

  CerrarOrden() {
    this.modificarordencomprapendienteService.cerrarOrden(this.idMovCompras).subscribe(data => {
      if (data.text() === 'No se pudo modificar el estado_cierre') {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la compra',
          type: 'error',
        });
      } else if (data.text() === 'exitoso') {
        console.log('exitoso');
      } else {
        console.log('orden actualizada');
      }
    });
  }

  GenerarCompra(generarcompra, datosCompra) {
    const PostCompra = {
      'idOrden': datosCompra.id_orden,
      'idCompra': datosCompra.id_compra,
      'numeroDocumento': 0,
      'numFactura': datosCompra.numerofactura,
      'proveedor': {
        'id': datosCompra.id_pro
      },
      'fechaPedido': datosCompra.fecha_pedido + 'T05:00:00-00:00',
      'fechaEntrega': datosCompra.fecha_entrega + 'T05:00:00-00:00',
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

    this.modificarordencomprapendienteService.postCompra(PostCompra).subscribe(data => {
      if (data === 'error') {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la compra',
          type: 'error',
        });
      } else {
        if (generarcompra === 1) {
          this.createArticulosMovimiento(data, this.articulosAgregados);
          if (this.articulosPendientes.length >= 1) {
            this.GenerarPendiente(datosCompra);
          }
          if (this.articulosDevoluciones.length >= 1) {
            this.GenerarDevolucion(datosCompra);
          }
        }
      }
    });

  }

  GenerarPendiente(datosCompra) {
    const PostPendiente = {
      'idOrden': datosCompra.id_orden,
      'idCompra': datosCompra.id_compra,
      'numeroDocumento': this.DataConsecutivo.consecutivo_pendiente,
      'numFactura': datosCompra.numerofactura,
      'proveedor': {
        'id': datosCompra.id_pro
      },
      'fechaPedido': null,
      'fechaEntrega': null,
      'fechaCompra': datosCompra.fecha_compra + 'T05:00:00-00:00',
      'fechaKardex': null,
      'fechaVencimiento': null,
      'descripcion': 'n/a',
      'tipo': 4,
      'leidoSab': 0,
      'afecta': 0,
      'estadoEmail': 0,
      'modificada': 0,
      'estadoCierre': 0,
      'formaPago': 'n/a',
      'estadoGenerarcompra': 0,
      'estadoCompra': 0
    };

    this.modificarordencomprapendienteService.postCompra(PostPendiente).subscribe(data => {
      if (data === 'error') {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la compra',
          type: 'error',
        });
      } else {
        this.createArticulosMovimiento(data, this.articulosPendientes);
      }
    });
  }

  GenerarDevolucion(datosCompra) {
    const PostDevolucion = {
      'idOrden': datosCompra.id_orden,
      'idCompra': datosCompra.consecutivo,
      'numFactura': datosCompra.numerofactura,
      'numeroDocumento': this.DataConsecutivo.consecutivo_devolucion,
      'proveedor': {
        'id': datosCompra.id_pro
      },
      'fechaPedido': null,
      'fechaEntrega': null,
      'fechaCompra': datosCompra.fecha_compra + 'T05:00:00-00:00',
      'fechaKardex': null,
      'fechaVencimiento': null,
      'descripcion': 'n/a',
      'tipo': 3,
      'leidoSab': 0,
      'afecta': 0,
      'estadoEmail': 0,
      'modificada': 0,
      'estadoCierre': 0,
      'formaPago': 'n/a',
      'estadoGenerarcompra': 0,
      'estadoCompra': 0
    };

    this.modificarordencomprapendienteService.postCompra(PostDevolucion).subscribe(data => {
      if (data === 'error') {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la compra',
          type: 'error',
        });
      } else {
        this.createArticulosMovimiento(data, this.articulosDevoluciones);
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
          'tipo_valor': key.valor,
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
    this.modificarordencomprapendienteService.postArticulos(Movimiento.articulos).subscribe(data => {
      this.router.navigate(['compras/compra',
        {tipo: 'compracreada', mensaje: this.alertas.creacion, info: this.DataNewOrden.id_compra}]);
    });
  }

  Imprimir() {
    console.log("ingreso imprimir");
    const doc = new jsPDF();
    let temp;

    /* DATOS CABECERA*/
    const ColumnsE = [this.DataCliente.nombre, 'No. Compra: ' + this.DataNewOrden.consecutivo];
    const rowsE = [''];

    doc.autoTable({
      columns: ColumnsE,
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
      ['PROVEEDOR:', this.DataNewOrden.nombre_proveedor],
      ['NIT:', this.DataNewOrden.nit_proveedor],
      ['DIRECCIÓN:', this.DataNewOrden.direccion_proveedor],
      ['TELEFONO:', this.DataNewOrden.telefono_proveedor]
    ];
    doc.autoTable({
      columns: ColumnsDP,
      body: rowsDP,
      startY: 40,
      tableWidth: 60,
      margin: {horizontal: 7},
      styles: {cellnWidth: 50, fontSize: 8},
      theme: 'plain'
    });

    const ColumnsDF = ['', ''];
    const rowsDF = [
      ['FECHA DE COMPRA:', this.DataNewOrden.fecha_compra],
      ['FECHA DE KARDEX:', this.DataNewOrden.fecha_kardex],
      ['FORMA DE VENCIMIENTO:', this.DataNewOrden.fecha_vencimiento],
      ['NUMERO FACTURA:', this.DataNewOrden.numerofactura]
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

  ImprimirPenDev() {
    const doc = new jsPDF();
    let temp;

    /* Titulo tabla Pendientes*/
    const ColumnsTP = ['Pendientes'];
    const rowsTP = [''];

    doc.autoTable({
      columns: ColumnsTP,
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
    for (const key of this.ListaArticulosPendientes) {
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

    /* Titulo tabla Devoluciones*/
    const ColumnsTD = ['Devoluciones'];
    const rowsTD = [''];

    doc.autoTable({
      columns: ColumnsTD,
      body: rowsTD,
      startY: doc.autoTable.previous.finalY + 5,
      margin: {horizontal: 7},
      tableWidth: 'auto',
      styles: {cellWidth: 'auto', fontSize: 10, halign: 'center'},
      theme: 'plain'
    });

    const ColumnsDD = ['Articulo',
      'Unidad\nCompra',
      'Cant.',
      'Unidad\nKardex',
      'Cant.\nKardex',
      'Valor\nUnitario',
      'Valor\nBruto',
      'Desc.',
      'Impuesto',
      'Valor\nTotal'];

    const rowsDD = [];
    for (const key of this.ListaArticulosDevolucion) {
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
      rowsDD.push(temp);
    }
    doc.setFontSize(8);
    doc.setFontType('bold');
    doc.autoTable({
      columns: ColumnsDD,
      body: rowsDD,
      startY: doc.autoTable.previous.finalY,
      columnWidth: 'wrap',
      widths: ['*', 'auto', 100, '*', '*'],
      headStyles: {fillColor: [76, 175, 80]},
      margin: {horizontal: 7},
      styles: {color: 'black', fontSize: 8}
    });

    doc.save('PendientesDevoluciones.pdf');
  }

  LimpiarFormArticulo() {
    this.DataNewArticulo = [];
    this.ordenesDosForm.reset();
    this.DataNewArticulo.ultimacompra = '';
    this.DataNewArticulo.id_articulo = '';
    this.DataNewArticulo.precio_total = '';
    this.DataNewArticulo.tarifa = '';
    this.DataNewArticulo.precio_unitario = '';
    this.DataNewArticulo.valor_negociado = '';
    this.DataNewArticulo.acuerdo_negocio = '';
    this.setValor();
  }

  setValor() {
    this.DataNewArticulo.valor = '1';
  }
}
