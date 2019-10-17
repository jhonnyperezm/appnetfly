import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, PatternValidator} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {IMyDpOptions, IMyDateModel, IMySelector} from 'mydatepicker';
import {RutasService} from '../../../services/rutas.service';
import {IngresarcompraService} from './ingresarcompra.service';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ingresarcompra',
  templateUrl: './ingresarcompra.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarcompraService, RutasService, PatternValidator, DatePipe]
})
export class IngresarcompraComponent implements OnInit {
  
  artisel:number=1;
  itempagearticulosagregados:number=1;
  s2:number=1;

  DataNewCompra: any = [];
  DataArrayProveedores: any = [];
  DataNewArticulo: any = [];
  DataArrayArticulos: any = [];
  DataJsonArticulos: any = [];
  searchStringProveedores: any;
  itempageProveedores = 5;
  ValidacionFact: any;
  set_fecha_compra: any;
  set_fecha_kardex: any;
  set_fecha_vencimiento: any;
  ListaUnidadesCompra: any = [];
  searchStringArt: any;
  itempageArt = 5;
  mas_articulos = false;
  menos_articulos = false;
  idArticuloInventario: any;
  ListaBodegas: any = [];
  DataConsecutivo: any = [];

  ListaUltimasCompras: any = [];
  ListaImpuestos: any = [];
  ListaTarifas: any = [];

  btn_agregar: boolean;
  btn_actualizar: boolean;
  btn_actualizar2: boolean;

  ListaArticulosAgregados: any = [];
  tablaadicionados = true;
  itempagearticulos = 5;
  searcharticulosagregados: any;
  idArtEliminar: any;
  DataProveedor: any = [];
  searchStringPreview: any;
  itempagePreview = 5;

  DiscriminacionImpuestos: any = [];
  DataTotales: any = [];
  enEdicion: any;

  searchStringUltCompras: any;
  itempageUltCompras = 5;
  registros: any = [];
  registrosPendientes: any = [];
  registrosDevolucion: any = [];
  DataArrayNegociacion: any = [];
  DatosNegociacion: any = [];
  idTablaEliminar: any;

  DataArrayDevoluciones: any = [];
  ListaArticulosDevolucion: any = [];
  DataArrayPendientes: any = [];
  ListaArticulosPendientes: any = [];
  PendientesComprados: any = [];
  DevolucionesCompradas: any = [];

  searchStringPendientes: any;
  itempagePendientes = 5;
  searchStringDevoluciones: any;
  itempageDevoluciones = 5;
  cant_superior = false;

  DatosArticuloDevolucion: any = [];
  DataNewDevolucion: any = [];
  articulosDevoluciones: any = [];

  DataCliente: any = [];
  muc: any;
  art: any;
  td: any;
  tp: any;
  pre: any;
  p: any;
  fecha_actual: any;
  fechaHoy = new Date();

  @ViewChild('compraproveedor', {static: true})
  public compraproveedor: NgForm;

  @ViewChild('compraarticulos', {static: true})
  public compraarticulos: NgForm;

  @ViewChild('articuloscomprados', {static: true})
  public articuloscomprados: NgForm;

  @ViewChild('datoscompra', {static: true})
  public datoscompra: NgForm;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Hoy',
    editableDateField: false,
    componentDisabled: false,
    markCurrentDay: true,
    openSelectorOnInputClick: true,
    /* disableSince:  { year: this.fechaHoy.getFullYear(), month: this.fechaHoy.getMonth() + 1, day: this.fechaHoy.getDate() + 1 } */
  };

  /*Variables utilizadas para el set de las fechas, las cuales seran utilizadas en el momento de guardar la compra */
  private selectedDateNormal: any = '';
  private selectedDateNormal2: any = '';
  private selectedDateNormal3: any = '';
  private selectedTextNormal: any = '';
  private selectedTextNormal2: any = '';
  private selectedTextNormal3: any = '';
  private dateformat1 = '';
  private border = 'none';
  private placeholderg = 'Select date';
  disabled = true;
  private selector: IMySelector = {
    open: false
  };

  constructor(public router: Router,
              private toastr: ToastrService,
              public ingresarCompraService: IngresarcompraService,
              public rutasService: RutasService,
              private datePipe: DatePipe) {
    this.LoadProveedoresData();
    this.LoadConsecutivo();
    this.LoadConsecutivoDevolucion();
    this.LoadDatosCliente();

    const fecha = new Date();
    this.fecha_actual = this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.DataNewArticulo.tipo_valor = 1;
    this.DataNewArticulo.antes_descuento = 1;
    this.DataNewArticulo.valor_descuento = 1;
    this.DataNewArticulo.incluye_impuesto = false;
    this.DataNewArticulo.incluye_descuentos = false;
    this.DataNewArticulo.porcentaje = '';
    this.DataNewArticulo.valor_absoluto = '';
    this.DataNewArticulo.precio_total = '';
    this.DataNewArticulo.tarifa = '';
    this.DataNewArticulo.precio_unitario = '';
    this.DataNewArticulo.valor_negociado = '';
    this.DataNewArticulo.acuerdo_negocio = '';
    this.btn_agregar = true;
    this.btn_actualizar = false;
    this.btn_actualizar2 = false;
  }

  Regresar() {
    this.router.navigate(['/compras/compra']);
  }


  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.selectedTextNormal = event.formatted;
      this.border = '1px solid #CCC';
      this.selectedDateNormal = event.formatted;
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
      this.selectedDateNormal2 = event.formatted;
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged3(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.selectedTextNormal3 = event.formatted;
      this.border = '1px solid #CCC';
      this.selectedDateNormal3 = event.formatted;
      this.IgualarFechas3();
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  IgualarFechas1() {
    if (this.selectedDateNormal >= this.selectedDateNormal2) {
      this.set_fecha_kardex = this.selectedDateNormal;
      this.set_fecha_vencimiento = this.selectedDateNormal;
    } else {

    }
  }

  IgualarFechas3() {
    if (this.selectedDateNormal3 >= this.selectedDateNormal) {

    } else {
      setTimeout(() => this.toastr.error('Error la Fecha de Vencimiento no puede ser inferior a Compra', 'Error'));
    }
  }

  LoadProveedoresData() {
    this.ingresarCompraService.getProveedores().subscribe(
      data => {
        this.DataArrayProveedores = data;
      }
    );
  }

  LoadConsecutivo() {
    this.ingresarCompraService.getConsecutivo().subscribe(
      data => {
        this.DataNewCompra.consecutivo = parseInt(data, 0);
      }
    );
  }

  LoadConsecutivoDevolucion() {
    this.ingresarCompraService.getConsecutivoDevolucion().subscribe(
      data => {
        this.DataConsecutivo.consecutivo_devolucion = parseInt(data, 0);
      }
    );
  }

  LoadDatosCliente() {
    this.ingresarCompraService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
      }
    );
  }

  clickFilaPro(id) {
    this.DataNewCompra.id_pro = id.toString();
  }

  ValidarFactura(factura, proveedor) {
    if (proveedor !== undefined && factura !== undefined) {
      this.ingresarCompraService.getNumeroFactura(factura, proveedor).subscribe(
        data => {
          if (data.text() !== 'El numero de factura no existe para este cliente') {
            setTimeout(() => this.toastr.error(data.text()));
            this.ValidacionFact = 1;
          } else {
            this.ValidacionFact = 0;
          }
        }
      );
    }
  }

  DatosProveedor(idProveedor) {
    const datosProveedor = this.DataArrayProveedores.filter(x => parseInt(x.id, 0) === parseInt(idProveedor, 0));
    for (const key of datosProveedor) {
      this.DataProveedor.push({
        'id': key.id,
        'nit': key.nit,
        'razon_social': key.razon_social,
        'razon_comercial': key.razon_comercial,
        'telefono': key.telefono,
        'direccion': key.direccion,
        'email': key.email
      });
    }

    this.LoadPendientesCliente(idProveedor);
    this.LoadDevolucionesCliente(idProveedor);
  }

  LoadPendientesCliente(idProveedor) {
    this.ingresarCompraService.getPendientes(idProveedor).subscribe(
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
    this.ingresarCompraService.getDevoluciones(idProveedor).subscribe(
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

  LoadUltimosArticulosPorProveedor(idProveedor) {
    this.mas_articulos = true;
    this.menos_articulos = false;
    const searchNombre = this.DataArrayProveedores.filter(x => parseInt(x.id, 0) === parseInt(idProveedor, 0))[0].razon_social;
    this.DataNewCompra.nombreProveedor = searchNombre;
    this.DataNewCompra.asigna_articulos = this.DataArrayProveedores.filter(x =>
      parseInt(x.id, 0) === parseInt(idProveedor, 0))[0].asignar_articulo;

    this.ingresarCompraService.getUltimosArticulosProveedor(idProveedor).subscribe(
      data => {
        console.log(data);
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
          if (this.DataNewCompra.asigna_articulos === true) {
            this.LoadTodosArticulosProveedor(idProveedor);
            this.mas_articulos = false;
            this.menos_articulos = false;
          } else {
            this.LoadTodosArticulosCompras();
            this.mas_articulos = false;
            this.menos_articulos = false;
          }
        }
      }
    );
  }

  LoadTodosArticulosProveedor(idProveedor) {
    this.mas_articulos = false;
    this.menos_articulos = true;
    this.DataNewCompra.asigna_articulos = this.DataArrayProveedores.filter(x =>
      parseInt(x.id, 0) === parseInt(idProveedor, 0))[0].asignar_articulo;
    if (this.DataNewCompra.asigna_articulos === false) {
      this.LoadTodosArticulosCompras();
    } else {
      this.ingresarCompraService.getArticulosPorProveedor(idProveedor).subscribe(
        data => {
          this.DataArrayArticulos = data;
          this.DataJsonArticulos = [];
          for (const key of this.DataArrayArticulos) {
            this.DataJsonArticulos.push({
              'id_articulo': key.id_articulo,
              'nombre': key.nombre,
              'origen': 2 /* todos los articulos del proveedor */
            });
          }
        }
      );
    }
  }

  LoadTodosArticulosCompras() {
    this.mas_articulos = false;
    this.menos_articulos = true;
    this.ingresarCompraService.getArticulosCompras().subscribe(
      data => {
        console.log(data);
        this.DataArrayArticulos = data;
        this.DataJsonArticulos = [];
        for (const key of this.DataArrayArticulos) {
          this.DataJsonArticulos.push({
            'id_articulo': key.id_articulo,
            'nombre': key.nombre,
            'origen': 3 /* todos los articulos de inventario */
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
      this.GuardarArticuloSeleccionado(idArt, datosProveedor.asigna_articulos);
    }
  }

  DatosAcuerdoNegocio(idArticulo, idProveedor, asig_Articulo) {
    if (asig_Articulo === true) {
      this.ingresarCompraService.getNegociacionArticulo(idArticulo, idProveedor).subscribe(
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
          this.GuardarArticuloSeleccionado(idArticulo, asig_Articulo);
        }
      );
    }
  }

  GuardarArticuloSeleccionado(idArt, asig_art) {
    this.DataNewArticulo.nombreArticulo = this.DataJsonArticulos.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].nombre;
    if (asig_art === true) {

      this.DataNewArticulo.acuerdo_negocio = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].acuerdo_negocio;
      this.DataNewArticulo.valor_negociado = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].valor_negociado;
      this.DataNewArticulo.fecha_inicial = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].fecha_inicial;
      this.DataNewArticulo.fecha_final = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].fecha_final;
      this.DataNewArticulo.id_unidad_compra = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].id_unidad_compra;
      this.DataNewArticulo.nom_unidad_compra = this.DatosNegociacion.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArt, 0))[0].nombre_unidad_compra;

      if (this.DataNewArticulo.acuerdo_negocio === true) {
        this.DataNewArticulo.precio_unitario = this.DataNewArticulo.valor_negociado;

        if (this.DataNewArticulo.fecha_inicial !== undefined && this.DataNewArticulo.fecha_final !== undefined) {

          if (this.DataNewArticulo.fecha_inicial <= this.DataNewCompra.fecha_compra.formatted
            && this.DataNewArticulo.fecha_final >= this.DataNewCompra.fecha_compra.formatted) {
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
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          console.log('tiene precio negociado pero no rango de fechas');
        }
      } else {
        console.log('El articulo no tiene acuerdo de negociación');
        this.DataNewArticulo.precio_unitario = 0;
      }
    }
    this.LoadArticuloInventario(idArt);
    this.LoadUltimasComprasPorArticuloBtn(idArt);

  }

  LoadArticuloInventario(idArticulo) {

    this.ingresarCompraService.getArticuloInventario(idArticulo).subscribe(
      data => {
        this.idArticuloInventario = data[0].id;
        this.DataNewArticulo.id_unidad_alterna = data[0].id_unidad_alterna;
        this.DataNewArticulo.id_unidad_kardex = data[0].id_unidad_kardex;
        this.DataNewArticulo.nom_unidad_kardex = data[0].nombre_unidad;
        this.LoadUnidadCompra(idArticulo);
        this.LoadImpuestos();
      }
    );
  }

  LoadUltimasComprasPorArticuloBtn(idArticulo) {
    this.ingresarCompraService.getUltimasComprasPorArticulo(idArticulo).subscribe(
      data => {
        this.ListaUltimasCompras = data;
        if (this.ListaUltimasCompras.length >= 1) {
          this.LoadValorUnidadUltimaCompraArticulo(idArticulo);
        } else {
          this.DataNewArticulo.ultimacompra = '';
          this.DataNewArticulo.unidadultima = '';
          this.DataNewArticulo.nombreunidadultima = '';
        }
      }
    );
  }

  LoadValorUnidadUltimaCompraArticulo(idArticulo) {
    this.ingresarCompraService.getValorUnidadUltimaCompra(idArticulo).subscribe(
      data => {
        this.DataNewArticulo.ultimacompra = data[0].precio;
        this.DataNewArticulo.unidadultima = data[0].id_unidad_compra;
        this.DataNewArticulo.nombreunidadultima = data[0].unidad_compra;
      }
    );
  }

  LoadUnidadCompra(idArt) {
    this.ingresarCompraService.getUnidadCompra(idArt).subscribe(
      data => {
        this.ListaUnidadesCompra = data;
      }
    );
  }

  LoadImpuestos() {
    this.ingresarCompraService.getImpuestos().subscribe(
      data => {
        this.ListaImpuestos = data;
      }
    );
  }

  ValidacionValor() {
    let canttemp, preciototaltemporal, totalvalidacion;
    canttemp = this.DataNewArticulo.cantidad_producto;
    preciototaltemporal = this.DataNewArticulo.precio_total;
    totalvalidacion = preciototaltemporal / canttemp;

    if (this.DataNewArticulo.ultimacompra < this.DataNewArticulo.precio_unitario) {
      if (this.DataNewArticulo.ultimacompra > 0) {
        setTimeout(() => this.toastr.info(
          'El valor es superior al de la ultima compra ',
          'Aviso',
        ));
      } else {
      }
    } else if (this.DataNewArticulo.ultimacompra < totalvalidacion) {
      if (this.DataNewArticulo.ultimacompra > 0) {
        setTimeout(() => this.toastr.info(
          'El valor es superior al de la ultima compra ',
          'Aviso',
        ));
      } else {
      }
    } else {
      console.log('No se ha superado el valor de la ultima compra');
    }
  }

  LoadTarifas(IdImp) {
    if (IdImp === null) {

    } else {
      this.DataNewArticulo.nombreImpuesto = this.ListaImpuestos.filter(x =>
        parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].nombre_imp;
      const idRegimen = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].id_regimen;

      this.ingresarCompraService.getImpuestoTarifa(IdImp, idRegimen).subscribe(
        data => {
          this.ListaTarifas = data;
        }
      );
    }
  }

  bindingTarifa(idTarifa) {
    if (idTarifa === null) {

    } else {
      this.DataNewArticulo.tarifa = this.ListaTarifas.filter(x => parseInt(x.id_tarifa, 0) === parseInt(idTarifa, 0))[0].valor;
    }
  }

  ValidacionValorNegociado() {
    if (this.DataNewCompra.asigna_articulos === true) {

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
            parseInt(this.DataNewArticulo.cantidad_producto, 0);
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
    let mult, valorimpuesto, div, valor_orden, temp = 0;
    if (this.DataNewArticulo.incluye_impuesto === true) {
      if (parseInt(this.DataNewArticulo.tipo_valor, 0) === 1) {
        mult = this.DataNewArticulo.cantidad_producto * this.DataNewArticulo.precio_unitario;
        div = this.DataNewArticulo.tarifa / 100;
        this.DataNewArticulo.total = mult;
        valorimpuesto = this.DataNewArticulo.total * div;
        valor_orden = this.DataNewArticulo.total - valorimpuesto;
        this.DataNewArticulo.base = valor_orden;
      } else if (parseInt(this.DataNewArticulo.tipo_valor, 0) === 2) {
        div = this.DataNewArticulo.tarifa / 100;
        this.DataNewArticulo.total = this.DataNewArticulo.precio_total;
        temp = this.DataNewArticulo.total * div;
        this.DataNewArticulo.base = parseInt(this.DataNewArticulo.total, 0) - temp;
        valor_orden = this.DataNewArticulo.base - this.DataNewArticulo.total;
      }
    } else {
      if (parseInt(this.DataNewArticulo.tipo_valor, 0) === 1) {
        mult = this.DataNewArticulo.cantidad_producto * this.DataNewArticulo.precio_unitario;
        div = this.DataNewArticulo.tarifa / 100;
        this.DataNewArticulo.base = mult;
        this.DataNewArticulo.total = this.DataNewArticulo.base * div;
        valor_orden = this.DataNewArticulo.total + this.DataNewArticulo.base;
        this.DataNewArticulo.total = valor_orden;
      } else if (parseInt(this.DataNewArticulo.tipo_valor, 0) === 2) {
        div = this.DataNewArticulo.tarifa / 100;
        this.DataNewArticulo.base = this.DataNewArticulo.precio_total;
        temp = this.DataNewArticulo.base * div;
        this.DataNewArticulo.total = temp + parseInt(this.DataNewArticulo.base, 0);
        valor_orden = this.DataNewArticulo.total - this.DataNewArticulo.base;
      }
      console.log('Los impuestos no estan incluidos, los calculos se realizan de formal normal');
    }
  }

  ValidacionArticulo(accion, datosArticulo) {
    if (accion === 'agregar') {
      this.AgregarArticulo();
    }
    if (accion === 'actualizar') {
      this.ActualizarArticulo(datosArticulo);
    }
  }

  AgregarArticulo() {
    this.DataNewArticulo.nom_unidad_compra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(this.DataNewArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    this.FormulasGeneral(this.DataNewArticulo.tipo_valor, this.DataNewArticulo.incluye_descuentos,
      this.DataNewArticulo.valor_descuento, this.DataNewArticulo.antes_descuento,
      this.DataNewArticulo.precio_unitario, this.DataNewArticulo.cantidad_producto,
      this.DataNewArticulo.valor_absoluto, this.DataNewArticulo.total,
      this.DataNewArticulo.precio_total, this.DataNewArticulo.base,
      this.DataNewArticulo.tarifa, this.DataNewArticulo.porcentaje,
      this.DataNewArticulo.incluye_impuesto);

    this.ListaArticulosAgregados.push({
        idtabla: this.registros.length + 1,
        id_art: this.DataNewArticulo.id_articulo,
        nombreArt: this.DataNewArticulo.nombreArticulo,
        id_unidad_com: this.DataNewArticulo.id_unidad_compra,
        nom_unidad_com: this.DataNewArticulo.nom_unidad_compra,
        cant: this.DataNewArticulo.cantidad_producto,
        id_unidad_kar: this.DataNewArticulo.id_unidad_kardex,
        nom_unidad_kar: this.DataNewArticulo.nom_unidad_kardex,
        id_unidad_alt: this.DataNewArticulo.id_unidad_alterna,
        tipo_val: this.DataNewArticulo.tipo_valor,
        valor_bru: this.DataNewArticulo.valor_bruto,
        ultimacom: this.DataNewArticulo.ultimacompra,
        unidadult: this.DataNewArticulo.unidadultima,
        nombreunidadult: this.DataNewArticulo.nombreunidadultima,
        incluye_des: this.DataNewArticulo.incluye_descuentos,
        valor_totalcom: this.DataNewArticulo.valor_total,
        imp: this.DataNewArticulo.impuesto,
        nombreImp: this.DataNewArticulo.nombreImpuesto,
        valor_imp: this.DataNewArticulo.valor_impuesto,
        precio_tot: this.DataNewArticulo.precio_total,
        des: this.DataNewArticulo.descuento,
        basecom: this.DataNewArticulo.base,
        idTar: this.DataNewArticulo.idTarifa,
        tar: this.DataNewArticulo.tarifa,
        antes_des: this.DataNewArticulo.antes_descuento,
        valor_des: this.DataNewArticulo.valor_descuento,
        totalcom: this.DataNewArticulo.total,
        valor_abs: this.DataNewArticulo.valor_absoluto,
        porcent: this.DataNewArticulo.porcentaje,
        precio_uni: this.DataNewArticulo.precio_unitario,
        fecha_ini: this.DataNewArticulo.fecha_inicial,
        fecha_fin: this.DataNewArticulo.fecha_final,
        valor_neg: this.DataNewArticulo.valor_negociado,
        acuerdo_neg: this.DataNewArticulo.acuerdo_negocio,
        incluye_imp: this.DataNewArticulo.incluye_impuesto,
        origen: 'compra'
      }
    );
    this.registros.push('item2');
    setTimeout(() => this.toastr.success(this.DataNewArticulo.nombreArticulo, 'Articulo Adicionado Con Exito'));
    this.LimpiarFormArticulo();
  }

  setValorDesc() {
    this.DataNewArticulo.valor_descuento = 1;
    this.DataNewArticulo.antes_descuento = 1;
  }

  setValor() {
    this.DataNewArticulo.tipo_valor = '1';
    this.DataNewArticulo.valor_descuento = '1';
    this.DataNewArticulo.antes_descuento = '1';
  }

  EditArticulo(datosArticulo) {
    this.btn_agregar = false;
    this.btn_actualizar = true;

    this.DataNewArticulo.idtabla = datosArticulo.idtabla;
    this.DataNewArticulo.id_articulo = datosArticulo.id_art;
    this.DataNewArticulo.nombreArticulo = datosArticulo.nombreArt;
    this.DataNewArticulo.id_unidad_compra = datosArticulo.id_unidad_com;
    this.DataNewArticulo.nom_unidad_compra = datosArticulo.nom_unidad_com;
    this.DataNewArticulo.cantidad_producto = datosArticulo.cant;
    this.DataNewArticulo.id_unidad_kardex = datosArticulo.id_unidad_kar;
    this.DataNewArticulo.nom_unidad_kardex = datosArticulo.nom_unidad_kar;
    this.DataNewArticulo.id_unidad_alterna = datosArticulo.id_unidad_alt;
    this.DataNewArticulo.ultimacompra = datosArticulo.ultimacom;
    this.DataNewArticulo.tipo_valor = datosArticulo.tipo_val;
    this.DataNewArticulo.precio_unitario = datosArticulo.precio_uni;
    this.DataNewArticulo.precio_total = datosArticulo.precio_tot;
    this.DataNewArticulo.incluye_impuesto = datosArticulo.incluye_imp;
    this.DataNewArticulo.impuesto = datosArticulo.imp;
    this.DataNewArticulo.nombreImpuesto = datosArticulo.nombreImp;
    this.DataNewArticulo.valor_impuesto = datosArticulo.valor_imp;
    this.DataNewArticulo.idTarifa = datosArticulo.idTar;
    this.DataNewArticulo.tarifa = datosArticulo.tar;
    this.DataNewArticulo.base = datosArticulo.basecom;
    this.DataNewArticulo.total = datosArticulo.totalcom;
    this.DataNewArticulo.acuerdo_negocio = datosArticulo.acuerdo_neg;
    this.DataNewArticulo.valor_negociado = datosArticulo.valor_neg;
    this.DataNewArticulo.fecha_inicial = datosArticulo.fecha_ini;
    this.DataNewArticulo.fecha_final = datosArticulo.fecha_fin;
    this.DataNewArticulo.valor_bruto = datosArticulo.basecom;
    this.DataNewArticulo.incluye_descuentos = datosArticulo.incluye_des;
    this.DataNewArticulo.valor_total = datosArticulo.valor_totalcom;
    this.DataNewArticulo.descuento = datosArticulo.des;
    this.DataNewArticulo.antes_descuento = datosArticulo.antes_des;
    this.DataNewArticulo.valor_descuento = datosArticulo.valor_des;
    this.DataNewArticulo.valor_absoluto = datosArticulo.valor_abs;
    this.DataNewArticulo.porcentaje = datosArticulo.porcent;
    this.DataNewArticulo.origen = datosArticulo.origen;

    this.LoadTarifas(this.DataNewArticulo.impuesto);
    this.LoadValorUnidadUltimaCompraArticulo(datosArticulo.id_art);
  }

  ActualizarArticulo(datosArticulo) {
    datosArticulo.nom_unidad_compra = this.ListaUnidadesCompra.filter(x =>
      parseInt(x.id_unidad_compra, 0) === parseInt(datosArticulo.id_unidad_compra, 0))[0].nombre_unidad;

    this.FormulasGeneral(datosArticulo.tipo_valor, datosArticulo.incluye_descuentos,
      datosArticulo.valor_descuento, datosArticulo.antes_descuento,
      datosArticulo.precio_unitario, datosArticulo.cantidad_producto,
      datosArticulo.valor_absoluto, datosArticulo.total,
      datosArticulo.precio_total, datosArticulo.base,
      datosArticulo.tarifa, datosArticulo.porcentaje,
      datosArticulo.incluye_impuesto);

    for (let i = 0; i < this.ListaArticulosAgregados.length; i++) {
      if (parseInt(this.ListaArticulosAgregados[i].idtabla, 0) === parseInt(datosArticulo.idtabla, 0)) {
        this.ListaArticulosAgregados[i].idtabla = datosArticulo.idtabla;
        this.ListaArticulosAgregados[i].id_art = datosArticulo.id_articulo;
        this.ListaArticulosAgregados[i].nombreArt = datosArticulo.nombreArticulo;
        this.ListaArticulosAgregados[i].id_unidad_com = datosArticulo.id_unidad_compra;
        this.ListaArticulosAgregados[i].nom_unidad_com = datosArticulo.nom_unidad_compra;
        this.ListaArticulosAgregados[i].cant = datosArticulo.cantidad_producto;
        this.ListaArticulosAgregados[i].id_unidad_kar = datosArticulo.id_unidad_kardex;
        this.ListaArticulosAgregados[i].nom_unidad_kar = datosArticulo.nom_unidad_kardex;
        this.ListaArticulosAgregados[i].id_unidad_alt = datosArticulo.id_unidad_alterna;
        this.ListaArticulosAgregados[i].tipo_val = datosArticulo.tipo_valor;
        this.ListaArticulosAgregados[i].valor_bru = this.DataNewArticulo.valor_bruto;
        this.ListaArticulosAgregados[i].ultimacom = datosArticulo.ultimacompra;
        this.ListaArticulosAgregados[i].unidadult = datosArticulo.unidadultima;
        this.ListaArticulosAgregados[i].nombreunidadult = datosArticulo.nombreunidadultima;
        this.ListaArticulosAgregados[i].incluye_des = datosArticulo.incluye_descuentos;
        this.ListaArticulosAgregados[i].valor_totalcom = this.DataNewArticulo.valor_total;
        this.ListaArticulosAgregados[i].imp = datosArticulo.impuesto;
        this.ListaArticulosAgregados[i].nombreImp = datosArticulo.nombreImpuesto;
        this.ListaArticulosAgregados[i].valor_imp = this.DataNewArticulo.valor_impuesto;
        this.ListaArticulosAgregados[i].precio_tot = datosArticulo.precio_total;
        this.ListaArticulosAgregados[i].des = this.DataNewArticulo.descuento;
        this.ListaArticulosAgregados[i].basecom = this.DataNewArticulo.valor_bruto;
        this.ListaArticulosAgregados[i].tar = datosArticulo.tarifa;
        this.ListaArticulosAgregados[i].idTar = datosArticulo.idTarifa;
        this.ListaArticulosAgregados[i].antes_des = datosArticulo.antes_descuento;
        this.ListaArticulosAgregados[i].valor_des = datosArticulo.valor_descuento;
        this.ListaArticulosAgregados[i].totalcom = datosArticulo.total;
        this.ListaArticulosAgregados[i].valor_abs = datosArticulo.valor_absoluto;
        this.ListaArticulosAgregados[i].porcent = datosArticulo.porcentaje;
        this.ListaArticulosAgregados[i].precio_uni = this.DataNewArticulo.precio_unitario;
        this.ListaArticulosAgregados[i].fecha_ini = datosArticulo.fecha_inicial;
        this.ListaArticulosAgregados[i].fecha_fin = datosArticulo.fecha_final;
        this.ListaArticulosAgregados[i].valor_neg = datosArticulo.valor_negociado;
        this.ListaArticulosAgregados[i].acuerdo_neg = datosArticulo.acuerdo_negocio;
        this.ListaArticulosAgregados[i].incluye_imp = datosArticulo.incluye_impuesto;
        this.ListaArticulosAgregados[i].origen = datosArticulo.origen;

      }
    }
    this.btn_agregar = true;
    this.btn_actualizar = false;
    setTimeout(() => this.toastr.success('El articulo se ha actualizado con exito', 'Confirmado'));
    this.LimpiarFormArticulo();
    this.CalculoTotalesCompra();
  }

  bindingEliminarArticulo(idArticulo, idTabla) {
    this.idArtEliminar = idArticulo;
    this.idTablaEliminar = idTabla;
  }

  DeleteArticulo(idTabla) {
    for (let i = 0; i < this.ListaArticulosAgregados.length; i++) {
      let index;
      if (parseInt(idTabla, 0) === parseInt(this.ListaArticulosAgregados[i].idtabla, 0)) {
        index = this.ListaArticulosAgregados.indexOf(this.ListaArticulosAgregados[i]);
        this.ListaArticulosAgregados.splice(index, 1);
      }
    }
  }

  Agregar_ArtPreview() {
    this.btn_agregar = true;
    this.btn_actualizar2 = false;
    this.btn_actualizar = false;
    this.tablaadicionados = true;
  }

  Modificar_ArtPreview(datosArticulo) {
    this.btn_agregar = false;
    this.btn_actualizar2 = true;

    this.DataNewArticulo.idtabla = datosArticulo.idtabla;
    this.DataNewArticulo.id_articulo = datosArticulo.id_art;
    this.DataNewArticulo.nombreArticulo = datosArticulo.nombreArt;
    this.DataNewArticulo.id_unidad_compra = datosArticulo.id_unidad_com;
    this.DataNewArticulo.nom_unidad_compra = datosArticulo.nom_unidad_com;
    this.DataNewArticulo.cantidad_producto = datosArticulo.cant;
    this.DataNewArticulo.id_unidad_kardex = datosArticulo.id_unidad_kar;
    this.DataNewArticulo.nom_unidad_kardex = datosArticulo.nom_unidad_kar;
    this.DataNewArticulo.id_unidad_alterna = datosArticulo.id_unidad_alt;
    this.DataNewArticulo.ultimacompra = datosArticulo.ultimacom;
    this.DataNewArticulo.tipo_valor = datosArticulo.tipo_val;
    this.DataNewArticulo.precio_unitario = datosArticulo.precio_uni;
    this.DataNewArticulo.precio_total = datosArticulo.precio_tot;
    this.DataNewArticulo.incluye_impuesto = datosArticulo.incluye_imp;
    this.DataNewArticulo.impuesto = datosArticulo.imp;
    this.DataNewArticulo.nombreImpuesto = datosArticulo.nombreImp;
    this.DataNewArticulo.valor_impuesto = datosArticulo.valor_imp;
    this.DataNewArticulo.idTarifa = datosArticulo.idTar;
    this.DataNewArticulo.tarifa = datosArticulo.tar;
    this.DataNewArticulo.base = datosArticulo.basecom;
    this.DataNewArticulo.total = datosArticulo.totalcom;
    this.DataNewArticulo.acuerdo_negocio = datosArticulo.acuerdo_neg;
    this.DataNewArticulo.valor_negociado = datosArticulo.valor_neg;
    this.DataNewArticulo.fecha_inicial = datosArticulo.fecha_ini;
    this.DataNewArticulo.fecha_final = datosArticulo.fecha_fin;
    this.DataNewArticulo.valor_bruto = datosArticulo.basecom;
    this.DataNewArticulo.incluye_descuentos = datosArticulo.incluye_des;
    this.DataNewArticulo.valor_total = datosArticulo.valor_totalcom;
    this.DataNewArticulo.descuento = datosArticulo.des;
    this.DataNewArticulo.antes_descuento = datosArticulo.antes_des;
    this.DataNewArticulo.valor_descuento = datosArticulo.valor_des;
    this.DataNewArticulo.valor_absoluto = datosArticulo.valor_abs;
    this.DataNewArticulo.porcentaje = datosArticulo.porcent;
    this.DataNewArticulo.origen = datosArticulo.origen;

    this.tablaadicionados = false;
    this.GuardarArticuloSel(this.DataNewArticulo.id_articulo, this.DataNewCompra);
    this.LoadTarifas(this.DataNewArticulo.impuesto);
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

    this.ListaArticulosAgregados.push({
      idtabla: this.registros.length + 1,
      id_art: datosPendiente.id_articulo,
      nombreArt: datosPendiente.nombreArticulo,
      id_unidad_com: datosPendiente.id_unidad_compra,
      nom_unidad_com: datosPendiente.nom_unidad_compra,
      cant: datosPendiente.cantidad,
      id_unidad_kar: datosPendiente.id_unidad_kardex,
      nom_unidad_kar: datosPendiente.nom_unidad_kardex,
      id_unidad_alt: datosPendiente.id_unidad_alterna,
      tipo_val: datosPendiente.tipo_valor,
      valor_bru: datosPendiente.valor_bruto,
      ultimacom: datosPendiente.ultimacompra,
      unidadult: datosPendiente.unidadultima,
      nombreunidadult: datosPendiente.nombreunidadultima,
      incluye_des: datosPendiente.incluye_descuentos,
      valor_totalcom: datosPendiente.valor_total,
      imp: datosPendiente.impuesto,
      nombreImp: datosPendiente.nombreImpuesto,
      valor_imp: datosPendiente.valor_impuesto,
      precio_tot: datosPendiente.precio_total,
      des: datosPendiente.descuento,
      basecom: datosPendiente.base,
      idTar: datosPendiente.idTarifa,
      tar: datosPendiente.tarifa,
      antes_des: datosPendiente.antes_descuento,
      valor_des: datosPendiente.valor_descuento,
      totalcom: datosPendiente.total,
      valor_abs: datosPendiente.valor_absoluto,
      porcent: datosPendiente.porcentaje,
      precio_uni: datosPendiente.precio_unitario,
      fecha_ini: datosPendiente.fecha_inicial,
      fecha_fin: datosPendiente.fecha_final,
      valor_neg: datosPendiente.valor_negociado,
      acuerdo_neg: datosPendiente.acuerdo_negocio,
      incluye_imp: datosPendiente.incluye_impuesto,
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
    this.ListaArticulosAgregados.push({
      idtabla: this.registros.length + 1,
      id_art: datosDevolucion.id_articulo,
      nombreArt: datosDevolucion.nombreArticulo,
      id_unidad_com: datosDevolucion.id_unidad_compra,
      nom_unidad_com: datosDevolucion.nom_unidad_compra,
      cant: datosDevolucion.cantidad,
      id_unidad_kar: datosDevolucion.id_unidad_kardex,
      nom_unidad_kar: datosDevolucion.nom_unidad_kardex,
      id_unidad_alt: datosDevolucion.id_unidad_alterna,
      tipo_val: datosDevolucion.tipo_valor,
      valor_bru: datosDevolucion.valor_bruto,
      ultimacom: datosDevolucion.ultimacompra,
      unidadult: datosDevolucion.unidadultima,
      nombreunidadult: datosDevolucion.nombreunidadultima,
      incluye_des: datosDevolucion.incluye_descuentos,
      valor_totalcom: datosDevolucion.valor_total,
      imp: datosDevolucion.impuesto,
      nombreImp: datosDevolucion.nombreImpuesto,
      valor_imp: datosDevolucion.valor_impuesto,
      precio_tot: datosDevolucion.precio_total,
      des: datosDevolucion.descuento,
      basecom: datosDevolucion.base,
      idTar: datosDevolucion.idTarifa,
      tar: datosDevolucion.tarifa,
      antes_des: datosDevolucion.antes_descuento,
      valor_des: datosDevolucion.valor_descuento,
      totalcom: datosDevolucion.total,
      valor_abs: datosDevolucion.valor_absoluto,
      porcent: datosDevolucion.porcentaje,
      precio_uni: datosDevolucion.precio_unitario,
      fecha_ini: datosDevolucion.fecha_inicial,
      fecha_fin: datosDevolucion.fecha_final,
      valor_neg: datosDevolucion.valor_negociado,
      acuerdo_neg: datosDevolucion.acuerdo_negocio,
      incluye_imp: datosDevolucion.incluye_impuesto,
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
    this.DatosArticuloDevolucion.idtabla = datosArticulo.idtabla;
    this.DatosArticuloDevolucion.id_articulo = datosArticulo.id_art;
    this.DatosArticuloDevolucion.nombreArticulo = datosArticulo.nombreArt;
    this.DatosArticuloDevolucion.id_unidad_compra = datosArticulo.id_unidad_com;
    this.DatosArticuloDevolucion.nom_unidad_compra = datosArticulo.nom_unidad_com;
    this.DatosArticuloDevolucion.cantidad_producto = datosArticulo.cant;
    this.DatosArticuloDevolucion.id_unidad_kardex = datosArticulo.id_unidad_kar;
    this.DatosArticuloDevolucion.nom_unidad_kardex = datosArticulo.nom_unidad_kar;
    this.DatosArticuloDevolucion.id_unidad_alterna = datosArticulo.id_unidad_alt;
    this.DatosArticuloDevolucion.ultimacompra = datosArticulo.ultimacom;
    this.DatosArticuloDevolucion.tipo_valor = datosArticulo.tipo_val;
    this.DatosArticuloDevolucion.precio_unitario = datosArticulo.precio_uni;
    this.DatosArticuloDevolucion.precio_total = datosArticulo.precio_tot;
    this.DatosArticuloDevolucion.incluye_impuesto = datosArticulo.incluye_imp;
    this.DatosArticuloDevolucion.impuesto = datosArticulo.imp;
    this.DatosArticuloDevolucion.nombreImpuesto = datosArticulo.nombreImp;
    this.DatosArticuloDevolucion.valor_impuesto = datosArticulo.valor_imp;
    this.DatosArticuloDevolucion.idTarifa = datosArticulo.idTar;
    this.DatosArticuloDevolucion.tarifa = datosArticulo.tar;
    this.DatosArticuloDevolucion.base = datosArticulo.basecom;
    this.DatosArticuloDevolucion.total = datosArticulo.totalcom;
    this.DatosArticuloDevolucion.acuerdo_negocio = datosArticulo.acuerdo_neg;
    this.DatosArticuloDevolucion.valor_negociado = datosArticulo.valor_neg;
    this.DatosArticuloDevolucion.fecha_inicial = datosArticulo.fecha_ini;
    this.DatosArticuloDevolucion.fecha_final = datosArticulo.fecha_fin;
    this.DatosArticuloDevolucion.valor_bruto = datosArticulo.basecom;
    this.DatosArticuloDevolucion.incluye_descuentos = datosArticulo.incluye_des;
    this.DatosArticuloDevolucion.valor_total = datosArticulo.valor_totalcom;
    this.DatosArticuloDevolucion.descuento = datosArticulo.des;
    this.DatosArticuloDevolucion.antes_descuento = datosArticulo.antes_des;
    this.DatosArticuloDevolucion.valor_descuento = datosArticulo.valor_des;
    this.DatosArticuloDevolucion.valor_absoluto = datosArticulo.valor_abs;
    this.DatosArticuloDevolucion.porcentaje = datosArticulo.porcent;
    this.DatosArticuloDevolucion.origen = datosArticulo.origen;
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
    let cantidadDevolver;

    if (datosDevolucion.tipo === 1) {
      cantidadDevolver = datosDevolucion.cantidad_parcial;
    } else if (datosDevolucion.tipo === 2) {
      cantidadDevolver = datosArticuloDev.cantidad_producto;
    }
    let mult, div, valor_orden, total, valor_impuesto, base;
    if (datosArticuloDev.incluye_impuesto === true) {
      if (parseInt(datosArticuloDev.tipo_valor, 0) === 1) {
        mult = cantidadDevolver * datosArticuloDev.precio_unitario;
        div = datosArticuloDev.tarifa / 100;
        total = mult;
        valor_impuesto = total * div;
        valor_orden = total - valor_impuesto;
        base = valor_orden;
      } else if (parseInt(datosArticuloDev.tipo_valor, 0) === 2) {
        div = datosArticuloDev.tarifa / 100;
        total = datosArticuloDev.precio_total;
        valor_impuesto = total * div;
        base = parseInt(total, 0) - valor_impuesto;
        valor_orden = base - total;
      }
    } else {
      if (parseInt(datosArticuloDev.tipo_valor, 0) === 1) {
        mult = cantidadDevolver * datosArticuloDev.precio_unitario;
        div = datosArticuloDev.tarifa / 100;
        base = mult;
        valor_impuesto = base * div;
        valor_orden = valor_impuesto + base;
        total = valor_orden;
      } else if (parseInt(datosArticuloDev.tipo_valor, 0) === 2) {
        div = datosArticuloDev.tarifa / 100;
        base = datosArticuloDev.precio_total;
        valor_impuesto = base * div;
        total = valor_impuesto + parseInt(base, 0);
        valor_orden = total - base;
      }
      console.log('Los impuestos no estan incluidos, los calculos se realizan de formal normal');
    }

    this.articulosDevoluciones.push({
        idtabla: this.registrosDevolucion.length + 1,
        id_art: datosArticuloDev.id_articulo,
        nombreArt: datosArticuloDev.nombreArticulo,
        id_unidad_com: datosArticuloDev.id_unidad_compra,
        nom_unidad_com: datosArticuloDev.nom_unidad_compra,
        cant: cantidadDevolver,
        id_unidad_kar: datosArticuloDev.id_unidad_kardex,
        nom_unidad_kar: datosArticuloDev.nom_unidad_kardex,
        id_unidad_alt: datosArticuloDev.id_unidad_alterna,
        ultimacom: datosArticuloDev.ultimacompra,
        tipo_val: datosArticuloDev.tipo_valor,
        precio_uni: datosArticuloDev.precio_unitario,
        precio_tot: datosArticuloDev.precio_total,
        incluye_imp: datosArticuloDev.incluye_impuesto,
        imp: datosArticuloDev.impuesto,
        nombreImp: datosArticuloDev.nombreImpuesto,
        valor_imp: valor_impuesto,
        idTar: datosArticuloDev.idTarifa,
        tar: datosArticuloDev.tarifa,
        incluye_des: false,
        des: 0,
        valor_des: 1,
        antes_des: 1,
        valor_abs: 0,
        porcent: 0,
        valor_bru: base,
        basecom: base,
        totalcom: total,
        valor_totalcom: total,
        acuerdo_neg: datosArticuloDev.acuerdo_negocio,
        valor_neg: datosArticuloDev.valor_negociado,
        fecha_ini: datosArticuloDev.fecha_inicial,
        fecha_fin: datosArticuloDev.fecha_final
      }
    );

    this.registrosDevolucion.push('devolucion1');
    datosArticuloDev.cantidad_producto = datosArticuloDev.cantidad_producto - cantidadDevolver;
    if (parseInt(datosArticuloDev.cantidad_producto, 0) !== 0) {
      if (datosArticuloDev.incluye_impuesto === true) {
        if (parseInt(datosArticuloDev.tipo_valor, 0) === 1) {
          mult = datosArticuloDev.cantidad_producto * datosArticuloDev.precio_unitario;
          div = datosArticuloDev.tarifa / 100;
          datosArticuloDev.total = mult;
          datosArticuloDev.valor_impuesto = datosArticuloDev.total * div;
          valor_orden = datosArticuloDev.total - datosArticuloDev.valor_impuesto;
          datosArticuloDev.base = valor_orden;
        } else if (parseInt(datosArticuloDev.tipo_valor, 0) === 2) {
          div = datosArticuloDev.tarifa / 100;
          datosArticuloDev.total = datosArticuloDev.precio_total;
          datosArticuloDev.valor_impuesto = datosArticuloDev.total * div;
          datosArticuloDev.base = parseInt(datosArticuloDev.total, 0) - datosArticuloDev.valor_impuesto;
          valor_orden = datosArticuloDev.base - datosArticuloDev.total;
        }
      } else {
        if (parseInt(datosArticuloDev.tipo_valor, 0) === 1) {
          mult = datosArticuloDev.cantidad_producto * datosArticuloDev.precio_unitario;
          div = datosArticuloDev.tarifa / 100;
          datosArticuloDev.base = mult;
          datosArticuloDev.valor_impuesto = datosArticuloDev.base * div;
          valor_orden = datosArticuloDev.valor_impuesto + datosArticuloDev.base;
          datosArticuloDev.total = valor_orden;
        } else if (parseInt(datosArticuloDev.tipo_valor, 0) === 2) {
          div = datosArticuloDev.tarifa / 100;
          base = datosArticuloDev.precio_total;
          datosArticuloDev.valor_impuesto = datosArticuloDev.base * div;
          datosArticuloDev.total = valor_impuesto + parseInt(datosArticuloDev.base, 0);
          valor_orden = datosArticuloDev.total - datosArticuloDev.base;
        }
        console.log('Los impuestos no estan incluidos, los calculos se realizan de formal normal');
      }
      this.ActualizarArticulo(datosArticuloDev);
    } else {
      this.DeleteArticulo(datosArticuloDev.idtabla);
    }
    this.CalculoTotalesCompra();
  }

  CalculoTotalesCompra() {
    this.DiscriminacionImpuestos.length = 0;
    if (this.ListaArticulosAgregados == null) {
    } else {

      let temporalsubtotal;
      let temporaldescuento;
      let temporalimpuesto;
      let temporaltotal;
      this.DataTotales.subtotal = 0;
      this.DataTotales.totaldescuentos = 0;
      this.DataTotales.totalimpuestos = 0;
      this.DataTotales.totaltotal = 0;
      for (const key of this.ListaArticulosAgregados) {
        temporalsubtotal = key.valor_bru;
        this.DataTotales.subtotal += parseFloat(temporalsubtotal);

        temporaldescuento = key.des;
        this.DataTotales.totaldescuentos += parseFloat(temporaldescuento);

        temporalimpuesto = key.valor_imp;
        this.DataTotales.totalimpuestos += parseFloat(temporalimpuesto);

        temporaltotal = key.valor_totalcom;
        this.DataTotales.totaltotal += parseFloat(temporaltotal);

      }

      for (const key of this.ListaArticulosAgregados) {
        const existe = this.DiscriminacionImpuestos.filter(x => parseInt(x.impuesto, 0) === parseInt(key.imp, 0)
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

  ValidarNumeroFactura(datosCompra) {
    this.ingresarCompraService.getNumeroFactura(datosCompra.numerofactura, datosCompra.id_pro).subscribe(data => {
      if (data.text() !== 'El numero de factura no existe para este cliente') {
        setTimeout(() => this.toastr.error(data.text()));
      } else {
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
    this.ingresarCompraService.actualizarPendientes(this.PendientesComprados).subscribe(data => {
      console.log(data);
    });
  }

  ActualizarDevoluciones() {
    this.ingresarCompraService.actualizarDevoluciones(this.DevolucionesCompradas).subscribe(data => {
      console.log(data);
    });
  }

  GenerarCompra(generarcompra, datosCompra) {
    const PostCompra = {
      'idOrden': '',
      'idCompra': datosCompra.consecutivo,
      'numFactura': datosCompra.numerofactura,
      'numeroDocumento': '',
      'proveedor': {
        'id': datosCompra.id_pro
      },
      'fechaPedido': null,
      'fechaEntrega': null,
      'fechaCompra': datosCompra.fecha_compra.formatted + 'T05:00:00-00:00',
      'fechaKardex': datosCompra.fecha_kardex.formatted + 'T05:00:00-00:00',
      'fechaVencimiento': datosCompra.fecha_vencimiento.formatted + 'T05:00:00-00:00',
      'descripcion': 'n/a',
      'tipo': 2,
      'leidoSab': 0,
      'afecta': 0,
      'estadoEmail': 0,
      'modificada': 0,
      'estadoCierre': 0,
      'formaPago': 'n/a',
      'estadoGenerarcompra': 0
    };

    this.ingresarCompraService.postCompra(PostCompra).subscribe(data => {
      if (data === 'error') {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la compra',
          type: 'error',
        });
      }
      if (generarcompra === 1) {
        this.createArticulosMovimiento(data, this.ListaArticulosAgregados);
        if (this.articulosDevoluciones.length >= 1) {
          this.GenerarDevolucion(datosCompra);
        }
      } else {
        // setTimeout(() => this.toastr.error("La compra no se ha generado con exito", data.text()));
      }
    });
  }

  GenerarDevolucion(datosCompra) {
    const PostDevolucion = {
      'idOrden': '',
      'idCompra': datosCompra.consecutivo,
      'numFactura': datosCompra.numerofactura,
      'numeroDocumento': this.DataConsecutivo.consecutivo_devolucion,
      'proveedor': {
        'id': datosCompra.id_pro
      },
      'fechaPedido': null,
      'fechaEntrega': null,
      'fechaCompra': datosCompra.fecha_compra.formatted + 'T05:00:00-00:00',
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
      'estadoGenerarcompra': 0
    };

    this.ingresarCompraService.postCompra(PostDevolucion).subscribe(data => {
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
    const Compra = {
      articulo: []
    };
    for (const key of arreglo) {
      Compra.articulo.push(
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
          'id_tarifa': key.idTar,
          'acuerdo_negocio': key.acuerdo_neg,
          'valor_negociado': key.valor_neg,
          'tipo_descuento': key.valor_des,
          'base_cal_imp_desc': key.antes_des,
          'descuento': key.des,
          'valor_impuesto': key.valor_imp,
          'total_bruto': key.valor_bru,  // base
          'subtotal': key.totalcom, // sin descuentos
          'total': key.valor_totalcom, // con descuentos
          'estado_compra': 0
        });
    }
    this.ingresarCompraService.postArticulos(Compra.articulo).subscribe(data => {
      this.router.navigate(['/compras/compra']);
    });
  }

  Imprimir() {
    const doc = new jsPDF();
    let temp;

    /* DATOS CABECERA*/
    const ColumnsE = [this.DataCliente.nombre, 'No. Compra: ' + this.DataNewCompra.consecutivo];
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
      margin: {horizontal: 7},
      styles: {cellWidth: 30, fontSize: 8},
      theme: 'plain'
    });

    /* DATOS PROVEEDOR Y PEDIDO*/
    const ColumnsDP = ['', ''];
    const rowsDP = [
      ['PROVEEDOR:', this.DataProveedor[0].razon_social],
      ['NIT:', this.DataProveedor[0].nit],
      ['DIRECCIÓN:', this.DataProveedor[0].direccion],
      ['TELEFONO:', this.DataProveedor[0].telefono]
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
      ['FECHA DE COMPRA:', this.DataNewCompra.fecha_compra.formatted],
      ['FECHA DE KARDEX:', this.DataNewCompra.fecha_kardex.formatted],
      ['FORMA DE VENCIMIENTO:', this.DataNewCompra.fecha_vencimiento.formatted],
      ['NUMERO FACTURA:', this.DataNewCompra.numerofactura]
    ];
    doc.autoTable({
      columns: ColumnsDF,
      body: rowsDF,
      startY: 40,
      margin: {horizontal: 110},
      styles: {cellWidth: 40, fontSize: 8},
      theme: 'plain'
    });

    const ColumnsDA = [
      'Articulo',
      'Unidad\nCompra',
      'Cant.',
      'Unidad\nKardex',
      'Cant.\nKardex',
      'Valor\nUnitario',
      'Valor\nBruto',
      'Desc.',
      'Impuesto',
      'Valor\nTotal'];

    const rowsDA = [];
    for (const key of this.ListaArticulosAgregados) {
      temp = [key.nombreArt,
        key.nom_unidad_com,
        key.cant,
        key.nom_unidad_kar,
        key.cant,
        key.precio_uni,
        key.valor_bru,
        key.des,
        key.valor_imp,
        key.valor_totalcom];
      rowsDA.push(temp);
    }
    temp = [, , , , , , , ,];
    rowsDA.push(temp);
    temp = [, , , , , , , 'SubTotal:', this.DataTotales.subtotal];
    rowsDA.push(temp);
    temp = [, , , , , , , 'Impuestos:', this.DataTotales.totalimpuestos];
    rowsDA.push(temp);
    temp = [, , , , , , , 'Descuentos:', this.DataTotales.totaldescuentos];
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

    doc.autoTable(ColumnsTP, rowsTP, {
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

    doc.autoTable(ColumnsTD, rowsTD, {
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

    /* var doc = new jsPDF("p", "pt"); */
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

  CerrarCompra() {
    this.router.navigate(['/compras/compra']);
  }

  FormulasGeneral(tipo_valor, incluye_descuentos, valor_descuento, antes_descuento, precio_unitario,
                  cantidad_producto, valor_absoluto, total, precio_total, base, tarifa, porcentaje, incluye_impuesto) {

    let valor_bruto;
    let descuento;
    let valor_impuesto;
    let valor_total;

    if (incluye_impuesto === true) {
      console.log('Ingresando cuando incluye_impuesto = true');
      if (incluye_descuentos === true) {
        console.log('Ingresando cuando incluye_descuentos = true');
        if (parseInt(tipo_valor, 0) === 1) {
          console.log('Ingresando cuando es por valor unitario');
          let temp, tempbase, temp2;
          if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 1) {
            console.log('Ingreso cuando esta en absoluto y antes de descuento');
            valor_bruto = base;
            descuento = valor_absoluto;
            temp = tarifa / 100;
            tempbase = precio_unitario * cantidad_producto;
            valor_impuesto = tempbase * temp;
            valor_total = (valor_bruto - descuento) + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 2) {
            console.log('Ingreso cuando esta en absoluto y despues de descuento');
            valor_bruto = total;
            descuento = valor_absoluto;
            temp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * temp;
            valor_total = (tempbase - valor_impuesto) + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 1) {
            console.log('Ingreso cuando es porcentaje  y antes de descuento');
            valor_bruto = base;
            temp = tarifa / 100;
            tempbase = precio_unitario * cantidad_producto;
            valor_impuesto = tempbase * temp;
            temp2 = porcentaje / 100;
            descuento = tempbase * temp2;
            valor_total = (valor_bruto - descuento) + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 2) {
            console.log('ingreso cuando es porcentaje y despues de descuento');
            valor_bruto = total;
            temp2 = porcentaje / 100;
            descuento = (cantidad_producto * precio_unitario) * temp2;
            temp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * temp;
            valor_total = (tempbase - valor_impuesto) + valor_impuesto;
          }
        } else if (parseInt(tipo_valor, 0) === 2) {
          console.log('Ingresando cuando es por valor total');
          let tempImp, temp2, tempbase;
          if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 1) {
            console.log('Entre a descuentos con opcion 1 1 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = base;
            descuento = valor_absoluto;
            tempImp = tarifa / 100;
            valor_impuesto = (cantidad_producto * precio_unitario) * tempImp;
            valor_total = (valor_bruto - descuento) + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 2) {
            console.log('Entre a descuentos con opcion 1 2 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = total;
            descuento = valor_absoluto;
            tempImp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * tempImp;
            valor_total = (tempbase - valor_impuesto) + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 1) {
            console.log('Entre a descuentos con opcion 2 1 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = base;
            temp2 = porcentaje / 100;
            descuento = (cantidad_producto * precio_unitario) * temp2;
            tempImp = tarifa / 100;
            valor_impuesto = (cantidad_producto * precio_unitario) * tempImp;
            valor_total = valor_bruto + valor_impuesto - descuento;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 2) {
            console.log('Entre a descuentos con opcion 2 2 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = total;
            temp2 = porcentaje / 100;
            descuento = (precio_unitario * cantidad_producto) * temp2;
            tempImp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * tempImp;
            valor_total = (tempbase - valor_impuesto) + valor_impuesto;
          }
        }
      } else if (incluye_descuentos === false) {
        console.log('ingresando cuando incluye_descuentos = false');
        let tempImp;
        if (parseInt(tipo_valor, 0) === 1) {
          console.log('entrando en opcion valor unitario');
          valor_bruto = base;
          tempImp = tarifa / 100;
          valor_impuesto = (cantidad_producto * precio_unitario) * tempImp;
          valor_total = total;
          descuento = 0;
        } else if (parseInt(tipo_valor, 0) === 2) {
          console.log('entrando en opcion valor total');
          precio_unitario = precio_total / cantidad_producto;
          valor_bruto = base;
          tempImp = tarifa / 100;
          valor_impuesto = (cantidad_producto * precio_unitario) * tempImp;
          valor_total = valor_bruto + valor_impuesto;
          descuento = 0;
        }
      }
    } else if (incluye_impuesto === false) {
      console.log('ingresando cuando incluye_impuesto = false');
      if (incluye_descuentos === true) {
        console.log('Ingresando cuando incluye_descuentos = true');
        if (parseInt(tipo_valor, 0) === 1) {
          console.log('Ingresando cuando es por valor unitario');
          let tempImp, tempbase, temp2;
          if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 1) {
            console.log('Ingreso cuando esta en absoluto y antes de descuento');
            valor_bruto = cantidad_producto * precio_unitario;
            descuento = valor_absoluto;
            tempImp = tarifa / 100;
            tempbase = precio_unitario * cantidad_producto;
            valor_impuesto = tempbase * tempImp;
            valor_total = tempbase + valor_impuesto - descuento;
          } else if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 2) {
            console.log('Ingreso cuando esta en absoluto y despues de descuento');
            valor_bruto = base;
            descuento = valor_absoluto;
            tempImp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * tempImp;
            valor_total = tempbase + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 1) {
            console.log('Ingreso cuando es porcentaje  y antes de descuento');
            valor_bruto = cantidad_producto * precio_unitario;
            tempImp = tarifa / 100;
            tempbase = precio_unitario * cantidad_producto;
            valor_impuesto = tempbase * tempImp;
            temp2 = porcentaje / 100;
            descuento = valor_bruto * temp2;
            valor_total = valor_bruto - descuento + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 2) {
            console.log('ingreso cuando es porcentaje y despues de descuento');
            valor_bruto = base;
            temp2 = porcentaje / 100;
            descuento = (cantidad_producto * precio_unitario) * temp2;
            tempImp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * tempImp;
            valor_total = tempbase + valor_impuesto;
          }
        } else if (parseInt(tipo_valor, 0) === 2) {
          let tempImp, temp2, tempbase;
          if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 1) {
            console.log('Entre a descuentos con opcion 1 1 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = base;
            descuento = valor_absoluto;
            tempImp = tarifa / 100;
            valor_impuesto = (cantidad_producto * precio_unitario) * tempImp;
            valor_total = valor_bruto - descuento + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 1 && parseInt(antes_descuento, 0) === 2) {
            console.log('Entre a descuentos con opcion 1 2 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = base;
            descuento = valor_absoluto;
            tempImp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * tempImp;
            valor_total = tempbase + valor_impuesto;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 1) {
            console.log('Entre a descuentos con opcion 2 1 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = base;
            temp2 = porcentaje / 100;
            descuento = valor_bruto * temp2;
            tempImp = tarifa / 100;
            valor_impuesto = valor_bruto * tempImp;
            valor_total = valor_bruto + valor_impuesto - descuento;
          } else if (parseInt(valor_descuento, 0) === 2 && parseInt(antes_descuento, 0) === 2) {
            console.log('Entre a descuentos con opcion 2 2 total');
            precio_unitario = precio_total / cantidad_producto;
            valor_bruto = base;
            temp2 = porcentaje / 100;
            descuento = (cantidad_producto * precio_unitario) * temp2;
            tempImp = tarifa / 100;
            tempbase = valor_bruto - descuento;
            valor_impuesto = tempbase * tempImp;
            valor_total = tempbase + valor_impuesto;
          }
        }
      } else if (incluye_descuentos === false) {
        console.log('ingresando a incluye impuestos =  false y incluye_decusentos = false');
        let tempImp;
        if (parseInt(tipo_valor, 0) === 1) {
          console.log('entrando en opcion 1 valor unitario');
          valor_bruto = cantidad_producto * precio_unitario;
          tempImp = tarifa / 100;
          valor_impuesto = valor_bruto * tempImp;
          valor_total = valor_bruto + valor_impuesto;
          descuento = 0;
        } else if (parseInt(tipo_valor, 0) === 2) {
          console.log('entrando en opcion 2 valor total');
          precio_unitario = precio_total / cantidad_producto;
          valor_bruto = base;
          tempImp = tarifa / 100;
          valor_impuesto = (cantidad_producto * precio_unitario) * tempImp;
          valor_total = valor_bruto + valor_impuesto;
          descuento = 0;
        }
      }
    }

    this.DataNewArticulo.precio_unitario = precio_unitario;
    this.DataNewArticulo.valor_bruto = valor_bruto;
    this.DataNewArticulo.valor_impuesto = valor_impuesto;
    this.DataNewArticulo.valor_total = valor_total;
    this.DataNewArticulo.descuento = descuento;

  }

  LimpiarFormArticulo() {
    this.DataNewArticulo = [];
    this.compraarticulos.reset();
    this.DataNewArticulo.ultimacompra = '';
    this.DataNewArticulo.unidadultima = '';
    this.DataNewArticulo.nombreunidadultima = '';
    this.DataNewArticulo.id_articulo = '';
    this.DataNewArticulo.incluye_descuentos = false;
    this.DataNewArticulo.incluye_impuesto = false;
    this.DataNewArticulo.porcentaje = '';
    this.DataNewArticulo.valor_absoluto = '';
    this.DataNewArticulo.precio_total = '';
    this.DataNewArticulo.tarifa = '';
    this.DataNewArticulo.precio_unitario = '';
    this.DataNewArticulo.valor_negociado = '';
    this.DataNewArticulo.acuerdo_negocio = '';
    this.ListaUltimasCompras = [];
    this.setValor();
  }

  Siguiente() {
    console.log('Form Submitted!');
  }

}
