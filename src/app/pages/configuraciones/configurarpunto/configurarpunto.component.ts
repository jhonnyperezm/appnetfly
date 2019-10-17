import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigurarpuntoService } from './configurarpunto.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyMarkedDate, IMySelector } from 'mydatepicker';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-configurarpunto',
  templateUrl: './configurarpunto.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ConfigurarpuntoService, RutasService, DatePipe]
})
export class ConfigurarpuntoComponent implements OnInit {

  DataPuntos: any = [];
  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  DataArrayTipoNegocio: any = [];
  DataConfSeleccionadas: any = [];
  DataArrayPunto: any = [];
  confpunto :number = 1;
  th :number = 1;
  tb :number = 1;
  tl :number = 1;
  tc :number = 1;
  tr :number = 1;
  mbl :number = 1;
  
  marca:any
  checked:any;
  DataArrayConfiguraciones: any = [];
  DataJsonConfiguraciones: any = [];
  postConfiguraciones: any = [];

  DataArrayConfigCliente: any = [];
  DataTablaConfigCliente: any = [];


  DataArrayBodegas: any = [];
  DataTablaBodegas: any = [];
  DataNewBodega: any = [];
  postBodega: any = [];
  // tablaBodegas = false;
  DataModificarBodega: any = [];
  DataVerBodega: any = [];
  DataTablaBodegasInactivas: any = [];
  BodegasInactivas: Boolean;

  DataArrayLicencias: any = [];
  DataTablaLicencias: any = [];
  postLicencia: any = [];
  // tablaLicencias = false;
  LicenciasInactivas: Boolean;
  DataVerLicencia: any = [];
  DataModificarLicencia: any = [];
  DataTablaLicenciasInactivas: any = [];

  idCliente: any;
  idPunto: any;
  nombreCliente: any;
  nombrePunto: any;

  itempageTConfig = 5;
  itempageTConfiguraciones = 10;
  itempageTBodegas = 5;
  itempageTLicencias = 5;
  itempageTResoluciones = 5;

  searchStringTConfig: any;
  searchStringTConfiguraciones: any;
  searchStringTBodegas: any;
  searchStringTLicencias: any;
  searchStringTResoluciones: any;

  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  DataNewPunto: any = [];
  checkedAll: boolean;
  direccion: any;
  direccion2: any;
  variable: any;
  tablaConfPunto = false;
  DataLicencia: any = [];

  DataResolucion: any = [];
  DataArrayResoluciones: any = [];
  DataTablaResoluciones: any = [];
  idLicencia: any;
  DataNewResolucion: any = [];
  proceso = 1;
  postResolucion: any = [];
  dataModificarBodega: any = [];
  manejaBodegas: Boolean;
  tablaMarcasCliente: any = [];
  bis: Boolean;
  via: any;
  descripcion: any;
  senas: any;
  cuadrante2: any;
  placa: any;
  letra2: any;
  numero2: any;
  cuadrante: any;
  letra: any;
  numero: any;
  ListaHoras: any = [];
  registrosHoras: any = [];
  searchStringTHoras: any;
  itempageTHoras = 5;
  DataEditHora: any = [];
  DataNewHora: any = [];
  DataEliminarHora: any = [];
  ListaImpuestos: any = [];
  ListaTarifas: any = [];

  DataArrayBodegasLic: any = [];
  DataBodegaLicSel: any = [];
  // DataArrayBodegaLicencia: any = [];

  searchStringMBodegasLicencias: any;
  itempageMBodegasLicencias = 5;
  DataArrayBodegasLicencia: any = [];

  @ViewChild('puntoUnoForm', {static:true} )
  private puntoUnoForm: NgForm;

  @ViewChild('bodegaForm', {static:true})
  private bodegaForm: NgForm;

  @ViewChild('bodegaEditForm', {static:true})
  private bodegaEditForm: NgForm;

  @ViewChild('horasForm', {static:true})
  private horasForm: NgForm;

  @ViewChild('horasEditForm', {static:true})
  private horasEditForm: NgForm;

  @ViewChild('licenciaForm', {static:true})
  private licenciaForm: NgForm;

  @ViewChild('licenciaEditForm', {static:true})
  private licenciaEditForm: NgForm;

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
    width: 'auto',
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
    markWeekends: <IMyMarkedDate>{},
    allowDeselectDate: true,
    disableWeekdays: []
  };

  /**
  * Cambio del formato para la fecha de kardex
  * @param event
  */

  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.DataNewResolucion.fecha = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public configurarpuntoService: ConfigurarpuntoService,
    public rutasService: RutasService,
    private datePipe: DatePipe,
    private route: ActivatedRoute) {
    this.loader = true;
    this.idCliente = this.route.snapshot.params.idCliente;
    this.nombreCliente = this.route.snapshot.params.nombreCliente;
    this.idPunto = this.route.snapshot.params.idPunto;
    this.nombrePunto = this.route.snapshot.params.nomPunto;
    this.bis = false;
    this.via = 'Cll';
    //this.router.navigate(['puntos'], {queryParams: {idCliente: this.idCliente, nombreCliente: this.nombreCliente}});

    this.LoadImpuestos();
  }

  ngOnInit() {
    this.LoadDatosPunto(this.idCliente, this.idPunto);
    this.loadPaises();
    this.loadTipoNegocio();
    // this.loadConfigAdicionales();
    this.loadConfigPunto();
    this.loadConfiguraciones();
    this.loadPuntoBodegas(this.idPunto);
    this.loadPuntoBodegasInactivas(this.idPunto);
    this.loadLicencias(this.idPunto);
    this.loadLicenciasInactivas(this.idPunto);
    this.loadPuntoHoras(this.idPunto);
    this.BodegasInactivas = true;
    this.LicenciasInactivas = true;
    this.DataLicencia.estado_inst = false;
    this.DataLicencia.estado_reinst = false;
    this.DataNewBodega.facturar = false;
    console.log(this.DataNewBodega);

  }

  Regresar() {
    this.router.navigate(['/configuraciones/clientes/puntos/' + this.idCliente]);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  kPNumerosPuntos(event: any) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onChangeAll(isChecked: boolean) {
    this.checkedAll = isChecked;
    for (let i = 0; i < this.DataJsonConfiguraciones.length; i++) {
      this.DataJsonConfiguraciones[i].checked = isChecked;
      this.onChange(this.DataJsonConfiguraciones[i].id, isChecked);
    }
  }

  onChange(id: number, isChecked: boolean) {
    if (isChecked === true) {
      this.DataConfSeleccionadas.push(
        {
          'id': id
        });
    } else {
      for (let i = 0; i < this.DataConfSeleccionadas.length; i++) {
        let index;
        if (id === this.DataConfSeleccionadas[i].id && isChecked === false) {
          index = this.DataConfSeleccionadas.indexOf(this.DataConfSeleccionadas[i]);
          this.DataConfSeleccionadas.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonConfiguraciones.length; i++) {
      if (id === this.DataJsonConfiguraciones[i].id) {
        this.DataJsonConfiguraciones[i].checked = isChecked;
      }
    }
  }
/*  Codigo Asociar marca con check box varias marcas
  onChangeAllMarcas(data, isChecked: boolean) {
    this.TodasMarcas = isChecked;
    for (let i = 0; i < data.length; i++) {
      data[i].checked = isChecked;
      this.onChangeMarcas(data[i], isChecked);
    }
  }

  onChangeMarcas(data, isChecked) {
    data.checked = isChecked;
    if (isChecked === true) {
      this.ListaSelMarcas.push(
        {
          'id_marca': data.id,
          'nombre_marca': data.nombre_marca
        });
    } else {
      for (let i = 0; i < this.ListaSelMarcas.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.ListaSelMarcas[i].id_marca, 0) && isChecked === false) {
          index = this.ListaSelMarcas.indexOf(this.ListaSelMarcas[i]);
          this.ListaSelMarcas.splice(index, 1);
        }
      }
    }
  }

  MostrarMarcas() {
    for (const key of this.ListaSelMarcas) {
      const existe = this.ListaMarcas.filter(x => parseInt(x.id_marca, 0) === parseInt(key.id_marca, 0));
      if (existe.length === 0) {
        this.ListaMarcas.push(
          {
            'id_marca': key.id_marca,
            'nombre_marca': key.nombre_marca
          });
      }
    }

    if (this.ListaMarcas.length === 0) {
      this.tablaMarcas = false;
    } else {
      this.tablaMarcas = true;
    }
  }*/




  LoadDatosPunto(id_cliente, id_punto) {
    this.configurarpuntoService.getPuntos(id_punto).subscribe(
      data => {
        console.log(data);
        this.DataArrayPunto = data;
        this.DataNewPunto = this.DataArrayPunto[0];
        if (this.DataArrayPunto[0].telefono2 === 0) {
          this.DataArrayPunto[0].telefono2 = '';
        }
        if (this.DataArrayPunto[0].extension2 === 0) {
          this.DataArrayPunto[0].extension2 = '';
        }
        if (this.DataArrayPunto[0].id_centro_costo === 0) {
          this.DataArrayPunto[0].id_centro_costo = '';
        }
        this.descripcion = this.DataNewPunto.direccion;
        this.loadDepartamento(this.DataNewPunto.id_pais);
        this.loadMunicipio(this.DataNewPunto.id_departamento);
        this.loadConfigAdicionales();
      }
    );
  }


  loadPaises() {
    this.configurarpuntoService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.configurarpuntoService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    this.configurarpuntoService.getMunicipios(idDepartamento).subscribe(
      data => {
        this.DataArrayMunicipios = data;
      }
    );
  }

  loadTipoNegocio() {
    this.configurarpuntoService.getTipoNegocio().subscribe(
      data => {
        this.DataArrayTipoNegocio = data;
      }
    );
  }

  loadConfigAdicionales() {
    this.configurarpuntoService.getConfigAdicionales(this.idPunto).subscribe(
      data => {
        console.log(data);
        if (data.length >= 1) {

          this.DataNewPunto.ventasMesero = data[0].ventasMesero;
          console.log(this.DataNewPunto.ventasMesero);
          this.DataNewPunto.capCantPers = data[0].personasAtendidas;
          this.DataNewPunto.atiendeMesas = data[0].personaAtiendeMesa;
          if (data[0].pideDistintivo === true) {
            this.DataNewPunto.pideDistintivo = 1;
          } else {
            this.DataNewPunto.pideDistintivo = 0;
          }
          this.DataNewPunto.distintivo = data[0].distintivo;
          this.DataNewPunto.propina = data[0].propina;
          this.DataNewPunto.porcentaje = data[0].porcentajePropina;
          this.DataNewPunto.valor = data[0].valorPropina;
          this.DataNewPunto.recargo = data[0].recargoDomicilio;
          this.DataNewPunto.recargoDom = data[0].tipoRecargoDomicilio;
          this.DataNewPunto.ivaDom = data[0].conSinIva;
          if (data[0].existeTope === true) {
            this.DataNewPunto.tope = 1;
          } else {
            this.DataNewPunto.tope = 0;
          }
          this.DataNewPunto.valorTope = data[0].valorTope;
          this.DataNewPunto.valorRecargo = data[0].valorRecargo;
          this.DataNewPunto.recDomIva = data[0].recargoDomicilioIva;
          this.DataNewPunto.impuesto = data[0].idImpuesto;
          this.DataNewPunto.idTarifa = data[0].tarifa;
          this.DataNewPunto.porValRecargoDom = data[0].valorPorcentajeIva;
          this.DataNewPunto.descuentoFactDom = data[0].valorDescuentoFactura;
          this.DataNewPunto.nombreDocDom = data[0].documentoSalidaVentas;
          this.DataNewPunto.idConfiguracionAdicional = data[0].id;
          //this.DataNewPunto.estadoReinst = estadoReinst;
          console.log(this.DataNewPunto.idTarifa);
          this.LoadTarifas(this.DataNewPunto.impuesto);
        }

      }
    );
  }

  loadConfiguraciones() {
    this.configurarpuntoService.getConfPunto().subscribe(
      data => {
        this.DataArrayConfiguraciones = data;
        this.loader = false;
        this.LoadTabla = true;

        this.DataJsonConfiguraciones = [];
        for (const key of this.DataArrayConfiguraciones) {
          const existe = this.DataTablaConfigCliente.filter(x => parseInt(x.id_configuracion, 0) === parseInt(key.id, 0));

          if (existe.length === 0) {
            this.DataJsonConfiguraciones.push(
              {
                'id': key.id,
                'estado': key.estado,
                'descripcion': key.descripcion,
                'checked': false
              });
          }
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

  loadConfigPunto() {
    this.configurarpuntoService.getPuntoConfiguraciones(this.idPunto).subscribe(
      data => {
        this.DataTablaConfigCliente = data;

        if (this.DataTablaConfigCliente.length === 0) {
          this.tablaConfPunto = false;
        } else {
          this.tablaConfPunto = true;
        }
        const existBodega = this.DataTablaConfigCliente.filter(x => parseInt(x.id_configuracion, 0) === 1);
        if (existBodega.length >= 1) {
          this.manejaBodegas = true;
        } else {
          this.manejaBodegas = false;
        }
      }
    );
  }

  bindingConfPunto() {
    for (const key of this.DataJsonConfiguraciones) {
      const p = this.DataConfSeleccionadas.filter(x => parseInt(x.id, 0) === parseInt(key.id, 0));

      if (p.length >= 1) {
        this.DataTablaConfigCliente.push({
          'id_configuracion': key.id,
          'descripcion': key.descripcion
        });
        // this.createPuntoConfiguraciones();
      }
    }
    console.log(this.DataTablaConfigCliente);
    // this.tablaConfPunto = true;

    const existBodega = this.DataTablaConfigCliente.filter(x => parseInt(x.id_configuracion, 0) === 1);
    if (existBodega.length >= 1) {
      this.manejaBodegas = true;
    } else {
      this.manejaBodegas = false;
    }
  }

  QuitarConfigPunto(IdConfiguracion) {
    console.log(IdConfiguracion);
    /* this.configurarpuntoService.deleteConfigPunto(this.idPunto, IdConfiguracion).subscribe(
      data => {
        if (data.text() === 'La configuracion del punto fue eliminada con exito') {
          Swal.fire({
            title: 'configuracion Modificada',
            text: 'Proceso realizado de manera Exitosa',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'configuracion No se Modifico',
            text: 'Proceso no se realizó de manera Exitosa',
            type: 'error',
          });
        } */
    for (let i = 0; i < this.DataTablaConfigCliente.length; i++) {
      let index;
      console.log(parseInt(IdConfiguracion, 0) + '===' + parseInt(this.DataTablaConfigCliente[i].id_configuracion, 0));
      if (parseInt(IdConfiguracion, 0) === parseInt(this.DataTablaConfigCliente[i].id_configuracion, 0)) {

      console.log('entro');
        index = this.DataTablaConfigCliente.indexOf(this.DataTablaConfigCliente[i]);
      console.log(index);
        this.DataTablaConfigCliente.splice(index, 1);
      }
    }
    /*  if (this.DataTablaConfigCliente.length === 0) {
       this.tablaConfPunto = false;
     } */
    const existBodega = this.DataTablaConfigCliente.filter(x => parseInt(x.id, 0) === 1);
    if (existBodega.length >= 1) {
      this.manejaBodegas = true;
    } else {
      this.manejaBodegas = false;
    }
    /* }
  ); */
  }

  LoadImpuestos() {
    this.configurarpuntoService.getImpuestos().subscribe(
      data => {
        this.ListaImpuestos = data;
      }
    );
  }

  LoadTarifas(IdImp) {
    console.log(IdImp);
    if (IdImp === null || IdImp === '' || IdImp === 0) {

    } else {
      console.log(this.ListaImpuestos);
      const idRegimen = this.ListaImpuestos.filter(x => parseInt(x.id_impuesto, 0) === parseInt(IdImp, 0))[0].id_regimen;

      this.configurarpuntoService.getImpuestoTarifa(IdImp, idRegimen).subscribe(
        data => {
          this.ListaTarifas = data;
          console.log(this.ListaTarifas);
        }
      );
    }
  }

  loadPuntoHoras(idPunto) {
    this.configurarpuntoService.getPuntoHoras(idPunto).subscribe(
      data => {
        console.log(data);
        // this.ListaHoras = data;

        // this.datePipe.transform(fecha, 'yyyy-MM-dd');
        for (const key of data) {
          const HoraIni = new Date(key.horaInicial);
          const HoraFin = new Date(key.horaFinal);

          this.ListaHoras.push({
            'id': this.registrosHoras.length,
            'horaInicio': HoraIni.toLocaleTimeString('en-GB'),
            'horaFin': HoraFin.toLocaleTimeString('en-GB'),
            'descripcion': key.descripcion
          });
          this.registrosHoras.push('ListaHoras1');
        }

        console.log(this.ListaHoras);
      }
    );
  }


  createHora(datosHora) {
    const fecha = new Date();
    const fechaGeneral = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const esthoraIni = fechaGeneral + 'T' + datosHora.horainicio;
    const esthoraFin = fechaGeneral + 'T' + datosHora.horafin;
    console.log(esthoraIni);
    console.log(esthoraIni);
    const HoraIni = new Date(esthoraIni);
    const HoraFin = new Date(esthoraFin);

    console.log(datosHora);
    this.ListaHoras.push({
      'id': this.registrosHoras.length,
      'horaInicio': HoraIni.toLocaleTimeString('en-GB'),
      'horaFin': HoraFin.toLocaleTimeString('en-GB'),
      'descripcion': datosHora.descripcion
    });
    this.registrosHoras.push('horas1');
  }

  bindingModificarHora(datos) {
    console.log(datos);
    const fechaIni = new Date(datos.horaInicio);
    const fechaFin = new Date(datos.horaFin);
    this.DataEditHora = datos;
    this.DataEditHora.horaini = datos.horaInicio;
    this.DataEditHora.horafinal = datos.horaFin;
    this.DataEditHora.desc = datos.descripcion;
  }

  modificarHora(datos) {
    console.log(datos);
    const fecha = new Date();
    const fechaGeneral = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const esthoraIni = fechaGeneral + 'T' + datos.horaini;
    const esthoraFin = fechaGeneral + 'T' + datos.horafinal;
    console.log(esthoraIni);
    console.log(esthoraIni);
    const HoraIni = new Date(esthoraIni);
    const HoraFin = new Date(esthoraFin);
    for (let i = 0; i < this.ListaHoras.length; i++) {
      if (parseInt(datos.id, 0) === parseInt(this.ListaHoras[i].id, 0)) {
        this.ListaHoras[i].horaInicio = HoraIni.toLocaleTimeString('en-GB');
        this.ListaHoras[i].horaFin = HoraFin.toLocaleTimeString('en-GB');
        this.ListaHoras[i].descripcion = datos.desc;
      }
    }
  }

  bindingEliminarHora(datos) {
    this.DataEliminarHora = datos;
  }

  QuitarHora(id) {
    for (let i = 0; i < this.ListaHoras.length; i++) {
      let index;
      console.log(id);
      console.log(this.ListaHoras[i].id);
      if (parseInt(id, 0) === parseInt(this.ListaHoras[i].id, 0)) {
        index = this.ListaHoras.indexOf(this.ListaHoras[i]);
        console.log(index);
        this.ListaHoras.splice(index, 1);
      }
    }
  }


  loadPuntoBodegas(idPunto) {
    this.configurarpuntoService.getPuntoBodegas(idPunto).subscribe(
      data => {
        this.DataTablaBodegas = data;
      }
    );
  }

  loadPuntoBodegasInactivas(idPunto) {
    this.configurarpuntoService.getPuntoBodegasInactivas(idPunto).subscribe(
      data => {
        this.DataTablaBodegasInactivas = data;
      }
    );
  }

  SetBodegasInactivas() {
    this.BodegasInactivas = !this.BodegasInactivas;
  }

  bindingBodega(dataBodega) {
    this.postBodega = {
      'nombre': dataBodega.bodega,
      'permiteFacturar': dataBodega.facturar,
      'bodegaInterna': false,
      'estado': 1
    };

    const existeNombre = this.DataTablaBodegas.filter(x => x.nombre.toLowerCase() === dataBodega.bodega.toLowerCase());
    if (existeNombre.length === 0) {

      this.configurarpuntoService.createBodega(this.postBodega).subscribe(
        data => {
          if (data === 'La bodegano se ha podido crear') {
            Swal.fire({
              title: 'Bodega No Creada',
              text: 'El proceso no se realizo de manera existosa',
              type: 'error',
            });
          } else {
            this.createPuntoBodegas(data);
            Swal.fire({
              title: 'Bodega Creada',
              text: 'El proceso se realizo de manera existosa',
              type: 'success',
            });
            this.DataTablaBodegas.push({
              'id_bodega': parseInt(data, 0),
              'nombre': dataBodega.bodega,
              'permite_facturar': dataBodega.facturar
            });
            // this.tablaBodegas = true;
            this.DataNewBodega.bodega = '';
          }
        }
      );
    } else {
      Swal.fire({
        title: 'Bodega',
        text: 'El nombre de la bodega ya existe en el punto',
        type: 'error',
      });

    }
  }

  createPuntoBodegas(idBodega) {
    const bodegas = {
      bodega: []
    };

    bodegas.bodega.push(
      {
        'id_punto': this.idPunto,
        'id_bodega': idBodega
      });

    this.configurarpuntoService.createPuntoBodegas(bodegas.bodega).subscribe(res => {
      if (res.text() === 'No se pudo crear la asociacion de la bodega al punto') {
        Swal.fire({
          title: 'Bodegas No se Crearon',
          text: 'Las bodegas del punto no se crearon correctamente',
          type: 'error',
        });
      } else {
        console.log('Bodegas punto creadas');
      }
    });
  }


  bindingDataVerBodega(datos) {
    this.DataVerBodega = datos;
  }

  bindingDataModificarBodega(datos) {
    this.DataModificarBodega = datos;
    this.DataModificarBodega.bodega = datos.nombre;
    this.DataModificarBodega.facturar = datos.permite_facturar;

  }

  ModificarBodega(NewBodega) {
    console.log(NewBodega);
    console.log(this.DataTablaBodegas);
    /* if (NewBodega.nombre.toLowerCase() !== NewBodega.bodega.toLowerCase()) { */
    const existeNombre = this.DataTablaBodegas.filter(x => x.nombre.toLowerCase() === NewBodega.bodega.toLowerCase()
      && x.permite_facturar === NewBodega.facturar);
    if (existeNombre.length === 0) {
      this.configurarpuntoService.getBodegaPorId(NewBodega.id_bodega).subscribe(
        data => {
          console.log(data);
          this.postBodega = {
            'id': NewBodega.id_bodega,
            'nombre': NewBodega.bodega,
            'permiteFacturar': NewBodega.facturar,
            'creadoPor': data[0].creadoPor,
            'fechaCreacion': data[0].fechaCreacion,
            'bodegaInterna': false,
            'estado': data[0].estado
          };
          this.postModificarBodega(this.postBodega);
        }
      );
    } else {
      Swal.fire({
        title: 'Bodega',
        text: 'El nombre de la bodega ya existe en el punto',
        type: 'error',
      });
    }
    /* } */
  }

  postModificarBodega(Bodega) {
    this.configurarpuntoService.updateBodega(Bodega).subscribe(
      data => {
        if (data.text() === 'La bodega se ha Modificado con exito') {
          Swal.fire({
            title: 'Bodega Modificada',
            text: data.text(),
            type: 'success',
          });
          for (let i = 0; i < this.DataTablaBodegas.length; i++) {
            console.log(Bodega.id + ' === ' + this.DataTablaBodegas[i].id_bodega);
            if (Bodega.id === this.DataTablaBodegas[i].id_bodega) {
              this.DataTablaBodegas[i].nombre = Bodega.nombre;
              this.DataTablaBodegas[i].permite_facturar = Bodega.permiteFacturar;
            }
          }
        } else {
          Swal.fire({
            title: 'Bodega No Modificada',
            text: data.text(),
            type: 'error',
          });
        }
        this.loadPuntoBodegas(this.idPunto);

      }
    );
  }

  inactivarBodega(id) {
    this.configurarpuntoService.inactivarBodega(id).subscribe(
      data => {
        this.loadPuntoBodegas(this.idPunto);
        this.loadPuntoBodegasInactivas(this.idPunto);
      });
  }
  activarBodega(id) {
    this.configurarpuntoService.activarBodega(id).subscribe(
      data => {
        this.loadPuntoBodegas(this.idPunto);
        this.loadPuntoBodegasInactivas(this.idPunto);
      });
  }

  loadLicencias(idPunto) {
    this.configurarpuntoService.getPuntoLicencias(idPunto).subscribe(
      data => {
        console.log(data);
        this.DataTablaLicencias = data;
        for (const key of this.DataTablaLicencias) {
          this.loadBodegasLicencia(key.id_licencia);
        }

      }
    );
  }

  loadBodegasLicencia(idLicencia) {
    console.log(idLicencia);
    this.DataArrayBodegasLicencia = [];


    this.configurarpuntoService.findBodegasLicencias(idLicencia).subscribe(
      res => {
        this.DataArrayBodegasLicencia = res;
        for (const key of this.DataArrayBodegasLicencia) {
          this.DataBodegaLicSel.push(
            {
              'idBodega': key.idBodega,
              'idLicencia': key.idLicencia
            });
        }

      }
    );
  }

  loadLicenciasInactivas(idPunto) {
    this.configurarpuntoService.getPuntoLicenciasInactivas(idPunto).subscribe(
      data => {
        this.DataTablaLicenciasInactivas = data;
      }
    );
  }

  SetLicenciasInactivas() {
    this.LicenciasInactivas = !this.LicenciasInactivas;
  }

  bindingLicencia(datosLicencia) {
    this.postLicencia = {
      'nombre': datosLicencia.licencia,
      'estadoInst': datosLicencia.estado_inst,
      'estadoReinstalacion': datosLicencia.estado_reinst
    };

    this.configurarpuntoService.createLicencia(this.postLicencia).subscribe(
      data => {
        if (data === 'La licencia no fue creada con exito') {
          Swal.fire({
            title: 'licencia no Creada',
            text: '',
            type: 'error',
          });
        } else {
          this.createPuntoLicencia(data);
          Swal.fire({
            title: 'licencia Creada',
            text: '',
            type: 'success',
          });
          this.DataTablaLicencias.push({
            'id_licencia': parseInt(data, 0),
            'nombre': datosLicencia.licencia,
            'estado_inst': datosLicencia.estado_inst,
            'estado_reinstalacion': datosLicencia.estado_reinst
          });
          // this.tablaLicencias = true;
        }
      }
    );
  }

  createPuntoLicencia(idLicencia) {
    const licencias = {
      liencia: []
    };

    licencias.liencia.push(
      {
        'id_punto': this.idPunto,
        'id_licencia': idLicencia
      });


    this.configurarpuntoService.createPuntoLicencia(licencias.liencia).subscribe(res => {
      if (res.text() === 'No se pudo crear la asociacion de la licencia al punto') {
        Swal.fire({
          title: 'Licencias No se Crearon',
          text: 'Las licencias del punto no se crearon correctamente',
          type: 'error',
        });

      } else {
        console.log('punto licencias creadas');
      }
    });
  }

  bindingDataVerLicencia(datos) {
    this.DataVerLicencia = datos;
  }

  bindingDataModificarLicencia(datos) {
    this.DataModificarLicencia = datos;
    this.DataModificarLicencia.nombrelic = datos.nombre;
    console.log(this.DataModificarLicencia);
  }

  ModificarLicencia(NewLicencia) {
    this.configurarpuntoService.getLicenciaPorId(NewLicencia.id_licencia).subscribe(
      data => {
        this.postLicencia = {
          'id': NewLicencia.id_licencia,
          'nombre': NewLicencia.nombrelic,
          'estadoInst': NewLicencia.estado_inst,
          'estadoReinstalacion': NewLicencia.estado_reinstalacion,
          'creadoPor': data[0].creado_por,
          'fechaCreacion': data[0].fecha_creacion,
          'estado': data[0].estado
        };
        this.postModificarLicencia(this.postLicencia);
        for (let i = 0; i < this.DataTablaLicencias.length; i++) {
          if (NewLicencia.id_licencia === this.DataTablaLicencias[i].id_licencia) {
            this.DataTablaLicencias[i].nombre = NewLicencia.nombrelic;
            this.DataTablaLicencias[i].estado_inst = NewLicencia.estado_inst;
            this.DataTablaLicencias[i].estado_reinstalacion = NewLicencia.estado_reinstalacion;
          }
        }
      });
  }

  postModificarLicencia(Licencia) {
    this.configurarpuntoService.updateLicencia(Licencia).subscribe(
      data => {
        if (data.text() === 'La licencia se ha Modificado con exito') {
          Swal.fire({
            title: 'Licencia Modificada',
            text: data.text(),
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Licencia No Modificada',
            text: data.text(),
            type: 'error',
          });
        }

      }
    );
  }

  inactivarLicencia(id) {
    this.configurarpuntoService.inactivarLicencia(id).subscribe(
      data => {
        this.loadLicencias(this.idPunto);
        this.loadLicenciasInactivas(this.idPunto);
      });
  }

  activarLicencia(id) {
    this.configurarpuntoService.activarLicencia(id).subscribe(
      data => {
        this.loadLicencias(this.idPunto);
        this.loadLicenciasInactivas(this.idPunto);
      });
  }

  loadResolucion(IdLicencia) {
    this.idLicencia = IdLicencia;
    this.configurarpuntoService.getResolucionesLicencia(IdLicencia).subscribe(
      data => {
        this.DataArrayResoluciones = data;
        this.loader = false;
        this.LoadTabla = true;

        this.DataTablaResoluciones = [];
        for (const key of this.DataArrayResoluciones) {
          this.DataTablaResoluciones.push(
            {
              'id': key.id,
              'id_licencia': key.id_licencia,
              'id_resolucion': key.id_resolucion,
              'nombre': key.nombre,
              'en_uso': key.en_uso,
              'autorizada': key.autorizada,
              'inicial': key.inicial,
              'final_f': key.final_f
            }
          );
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

  bindingResolucion(IdLicencia) {
    this.DataNewResolucion.idLicencia = IdLicencia;
  }

  CrearResolucion(proceso, DataNewResolucion) {
    const fecha = new Date();

    this.postResolucion = {
      'proceso': proceso,
      'autorizada': DataNewResolucion.resauto,
      'prefijo': DataNewResolucion.prefijo,
      'inicial': DataNewResolucion.inicial,
      'finalF': DataNewResolucion.final,
      'fecha': DataNewResolucion.fecha.formatted + 'T00:00:00-05:00',
      'alertaFaltar': DataNewResolucion.facturas,
      'observaciones': DataNewResolucion.observaciones,
      'creadoPor': 1,
      'fechaCreacion': fecha.toLocaleDateString(),
      'modificadoPor': 1,
      'fechaModificacion': fecha.toLocaleDateString(),
      'estado': true
    };

    this.configurarpuntoService.createResolucion(this.postResolucion).subscribe(
      data => {
        if (data.text() !== 'No se ha podido crear la resolucion') {
          this.createLicenciaResolucion(DataNewResolucion.idLicencia, data.text());
          Swal.fire({
            title: 'Resolucion Creada',
            text: data.text(),
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Resolucion No Creada',
            text: data.text(),
            type: 'error',
          });
        }
        this.loadResolucion(DataNewResolucion.idLicencia);
      });
  }

  createLicenciaResolucion(IdLiencia, resolucion) {
    const licencias = {
      resol: []
    };

    licencias.resol.push(
      {
        'id_licencia': IdLiencia,
        'id_resolucion': parseInt(resolucion, 0)
      });

    this.configurarpuntoService.createLicenciaResolucion(licencias.resol).subscribe(res => {
      if (res.text() === 'No se pudo crear la LicenciaResolucion') {
        Swal.fire({
          title: 'Resolucion No se Crearon',
          text: 'La resolucion no se pudo asociar a la licencia correctamente',
          type: 'error',
        });

      } else {
        console.log('Resolucion punto creadas');
      }
    });
  }


  focusDireccion() {
    $('#myModal').modal({ backdrop: 'static' });
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
      this.DataNewPunto.direccion = via + ' ' + numero + ' ' + this.variable + ' ' + letra + ' ' + cuadrante + ' #' +
        numero2 + letra2 + '-' + placa + ' ' + cuadrante2 + ' ' + senas;
    } else if (parseInt(this.direccion2, 0) === 2) {
      this.DataNewPunto.direccion = descripcion;
    }
  }

  bindingBodegasLicencias(datosLicencia) {
    console.log(datosLicencia);
    console.log(this.DataTablaBodegas);
    this.DataArrayBodegasLic = [];

    let checkBodLic = false;
    for (const key of this.DataTablaBodegas) {
      const existe = this.DataBodegaLicSel.filter(x => x.idLicencia == datosLicencia.id_licencia && x.idBodega == key.id_bodega);
      if (existe.length >= 1) {
        checkBodLic = true;
      } else {
        checkBodLic = false;
      }
      this.DataArrayBodegasLic.push({
        idBodega: key.id_bodega,
        nombreBodega: key.nombre,
        idLicencia: datosLicencia.id_licencia,
        nombreLicencia: datosLicencia.nombre,
        checked: checkBodLic
      });
    }
    console.log(this.DataArrayBodegasLic);
  }

  onChangeBodLic(data, isChecked) {
    console.log(data);
    console.log(isChecked);
    console.log(this.DataArrayBodegasLic);
    if (isChecked === true) {
      const existe = this.DataBodegaLicSel.filter(x => x.idBodega === data.idBodega && x.idLicencia === data.idLicencia);

      if (existe.length === 0) {
        this.DataBodegaLicSel.push(
          {
            'idBodega': data.idBodega,
            'idLicencia': data.idLicencia
          });
      }
    } else {
      for (let i = 0; i < this.DataBodegaLicSel.length; i++) {
        let index;
        if (data.idBodega === this.DataBodegaLicSel[i].idBodega && data.idLicencia == this.DataBodegaLicSel[i].idLicencia && isChecked === false) {
          index = this.DataBodegaLicSel.indexOf(this.DataBodegaLicSel[i]);
          this.DataBodegaLicSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataArrayBodegasLic.length; i++) {
      /* console.log('idBodega'+data.idBodega +'= ' +this.DataArrayBodegasLic[i].idBodega);
      console.log('idLicencia'+data.idLicencia +'= ' +this.DataArrayBodegasLic[i].idLicencia); */
      if (data.idBodega == this.DataArrayBodegasLic[i].idBodega && data.idLicencia == this.DataArrayBodegasLic[i].idLicencia) {
        /* console.log('entro cambiar check'); */
        this.DataArrayBodegasLic[i].checked = isChecked;
      }
    }
    console.log(this.DataBodegaLicSel);
  }

  onSubmit(punto) {
    const fecha = new Date();
    if (punto.id_centro_costo === '' || punto.id_centro_costo === null || punto.id_centro_costo === undefined) {
      punto.id_centro_costo = 0;
    }
    if (punto.telefono2 === '' || punto.telefono2 === null || punto.telefono2 === undefined) {
      punto.telefono2 = 0;
    }
    if (punto.extension === '' || punto.extension === null || punto.extension === undefined) {
      punto.extension = 0;
    }
    if (punto.extension2 === '' || punto.extension2 === null || punto.extension2 === undefined) {
      punto.extension2 = 0;
    }

    const data = {
      'id': punto.id,
      'cod': punto.cod,
      'nombre': punto.nombre,
      'direccion': punto.direccion,
      'telefono': punto.telefono,
      'extension': punto.extension,
      'telefono2': punto.telefono2,
      'extension2': punto.extension2,
      'idCentroCosto': punto.id_centro_costo,
      'estado': punto.estado,
      'creadoPor': punto.creado_por,
      'fechaCreacion': punto.fecha_creacion,
      'modificadoPor': punto.modificado_por,
      'fechaModificacion': punto.fecha_modificacion,
      'estadoInst': punto.estadoInst,
      'municipio': {
        'id': punto.id_municipio
      },
      'tipoNegocio': {
        'id': punto.id_tipo_negocio
      },
      'estadoReinstalacion': punto.estadoReinstalacion,
      'idCliente': punto.id_cliente
    };


    this.configurarpuntoService.postPunto(data).subscribe(
      resul => {
        const res = resul.text();
        if (res === 'No se pudo Modificar el punto') {
          Swal.fire({
            title: 'Punto',
            text: 'No se ha podido modificar el punto',
            type: 'error',
          });
        } else {
          this.router.navigate(['/configuraciones/clientes/puntos/' + this.idCliente]);
          this.updatePuntoConfiguraciones();
          this.updatePuntosConfigAdicionales(punto);
          this.updatePuntosHora();
          this.updateBodegaLicencia();
          Swal.fire({
            title: 'Punto',
            text: 'El punto ha sido MODIFICADO con exito',
            type: 'success',
          });
        }
      }
    );
  }

  updatePuntoConfiguraciones() {
    const configuraciones = {
      config: []
    };

    for (const key of this.DataTablaConfigCliente) {
      configuraciones.config.push(
        {
          'id_punto': this.idPunto,
          'id_configuracion': key.id_configuracion
        });
    }

    this.configurarpuntoService.updatePuntoConfiguraciones(configuraciones.config, this.idPunto).subscribe(res => {
      if (res.text() === 'No se pudo crear la Configuracion de punto') {
        Swal.fire({
          title: 'Configuraciones No se Crearon',
          text: 'Las configuraciones del punto no se crearon correctamente',
          type: 'error',
        });

      } else {
        console.log('Configuraciones punto creadas');
      }
    });
  }

  updatePuntosConfigAdicionales(datos) {
    console.log(datos);
    let distintivo;
    if (datos.distintivo === undefined) {
      distintivo = '';
    } else {
      distintivo = datos.distintivo;
    }

    if (datos.porValRecargoDom === undefined) {
      datos.porValRecargoDom = 0;
    }
    const postData = {
      'id': datos.idConfiguracionAdicional,
      'punto': {
        'id': this.idPunto
      },
      'ventasMesero': datos.ventasMesero,
      'personasAtendidas': datos.capCantPers,
      'personaAtiendeMesa': datos.atiendeMesas,
      'pideDistintivo': datos.pideDistintivo,
      'distintivo': distintivo,
      'propina': datos.propina,
      'porcentajePropina': datos.porcentaje,
      'valorPropina': datos.valor,
      'recargoDomicilio': datos.recargo,
      'tipoRecargoDomicilio': datos.recargoDom,
      'conSinIva': datos.ivaDom,
      'existeTope': datos.tope,
      'valorTope': datos.valorTope,
      'valorRecargo': datos.valorRecargo,
      'recargoDomicilioIva': datos.recDomIva,
      'idImpuesto': datos.impuesto,
      'tarifa': datos.idTarifa,
      'valorPorcentajeIva': datos.porValRecargoDom,
      'valorDescuentoFactura': datos.descuentoFactDom,
      'documentoSalidaVentas': datos.nombreDocDom
    };
    this.configurarpuntoService.putPuntoAdicionConf(postData).subscribe(res => {
      if (res.text() === 'error') {
        console.log('error al crear Configuraciones adicionales punto creadas');
        /*  Swal.fire({
           title: 'Configuraciones No se Crearon',
           text: 'Las configuraciones del punto no se crearon correctamente',
           icotypeerror',
         }); */

      } else {
        console.log('Configuraciones adicionales punto creadas');
      }
    });
  }



  updatePuntosHora() {
    console.log('update punto hora');

    const fecha = new Date();
    const fechaGeneral = this.datePipe.transform(fecha, 'yyyy-MM-dd');


    const Horas = {
      hora: []
    };
    for (const key of this.ListaHoras) {
      console.log(key);
      Horas.hora.push(
        {
          'punto': {
            'id': this.idPunto
          },
          'descripcion': key.descripcion,
          'horaInicial': fechaGeneral + 'T' + key.horaInicio,
          'horaFinal': fechaGeneral + 'T' + key.horaFin,
        });
    }

    this.configurarpuntoService.updatePuntoHoras(Horas.hora, this.idPunto).subscribe(res => {
      if (res.text() === 'Error') {
        Swal.fire({
          title: 'Error',
          text: 'Las horas del punto no se crearon correctamente',
          type: 'error',
        });

      } else {
        console.log('Horas punto creadas');
      }
    });
  }

  updateBodegaLicencia() {
    const licencias = {
      bodegas: []
    };

    for (const key of this.DataBodegaLicSel) {
      licencias.bodegas.push(
        {
          'idLicencia': key.idLicencia,
          'idBodega': key.idBodega
        });
    }

    this.configurarpuntoService.updateLicenciaBodega(licencias.bodegas).subscribe(res => {
      /* if (res.text() === 'No se pudo crear la asociacion de la licencia al punto') {
        Swal.fire({
          title: 'Licencias No se Crearon',
          text: 'Las licencias del punto no se crearon correctamente',
          type: 'error',
        });

      } else { */
      console.log('bodegas licencias creadas');
      /* } */
    });
  }

  LimpiarFormConfiguraciones() {
    this.loadConfiguraciones();
    this.onChangeAll(false);
  }

  LimpiarFormBodegas() {
    this.bodegaForm.reset();
    this.DataNewBodega.facturar = false;
  }

  LimpiarFormLicencia() {
    this.DataLicencia = [];
  }
  LimpiarFormHoras() {
    this.horasForm.reset();
  }

}
