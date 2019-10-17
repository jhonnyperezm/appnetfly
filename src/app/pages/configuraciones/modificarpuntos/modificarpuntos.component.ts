import { Component, OnInit, ViewChild } from '@angular/core';
import { ModificarpuntosService } from './modificarpuntos.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyMarkedDate, IMySelector } from 'mydatepicker';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-modificarpuntos',
  templateUrl: './modificarpuntos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificarpuntosService, RutasService, DatePipe]
})
export class ModificarpuntosComponent implements OnInit {

  idCliente: any;
  idPunto: any;
  nombreCliente: any;
  nombrePunto: any;

  bis: boolean;
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
  direccion2: any;
  variable: any;

  tm:number =1;
  tl:number =1;
  tgm:number =1;

  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  DataArrayTipoNegocio: any = [];
  DataArrayPunto: any = [];
  DataNewPunto: any = [];

  DataLicencia: any = [];
  DataTablaLicencias: any = [];
  DataVerLicencia: any = [];
  DataModificarLicencia: any = [];
  LicenciasInactivas: boolean;
  searchStringTLicencias: any;
  itempageTLicencias = 5;
  registroLicencia: any = [];

  DataTablaLicenciasInactivas: any = [];
  registroLicenciaInactivas: any = [];

  DataTipoNeg: any = [];

  DataArrayMarcas: any = [];
  DataTablaMarcas: any = [];
  DataTablaMarcasInactivas: any = [];
  postMarca: any = [];
  tablaMarcas = true;
  crearMarca: Boolean;
  marca: any;
  ListaSelMarcas: any = [];
  DataMarca: any = [];
  TodasMarcas: Boolean;
  ListaMarcas: any = [];
  searchStringTMarcas: any;
  searchStringTGMarcas: any;
  itempageTMarcas = 5;
  itempageTGMarcas = 5;
  /*
    DataPuntos: any = [];
    DataConfSeleccionadas: any = [];

    DataArrayConfiguraciones: any = [];
    DataJsonConfiguraciones: any = [];
    postConfiguraciones: any = [];

    DataArrayConfigCliente: any = [];
    DataTablaConfigCliente: any = [];

    DataArrayMarcas: any = [];
    DataTablaMarcas: any = [];
    DataTablaMarcasInactivas: any = [];
    postMarca: any = [];
    tablaMarcas = true;
    crearMarca: Boolean;
    marca: any;
    ListaSelMarcas: any = [];
    DataMarca: any = [];

    DataArrayBodegas: any = [];
    DataTablaBodegas: any = [];
    DataNewBodega: any = [];
    postBodega: any = [];
    tablaBodegas = true;
    DataModificarBodega: any = [];
    DataVerBodega: any = [];
    DataTablaBodegasInactivas: any = [];
    BodegasInactivas: Boolean;

    DataArrayLicencias: any = [];
    postLicencia: any = [];
    tablaLicencias = true;

    itempageTConfig = 5;
    itempageTConfiguraciones = 10;
    itempageTMarcas = 5;
    itempageTGMarcas = 5;
    itempageTBodegas = 5;
    itempageTResoluciones = 5;

    searchStringTConfig: any;
    searchStringTConfiguraciones: any;
    searchStringTMarcas: any;
    searchStringTGMarcas: any;
    searchStringTBodegas: any;
    searchStringTResoluciones: any;

    LoadError: boolean;
    loader: boolean;
    LoadTabla: boolean;
    error: any;
    rol: boolean;
    checkedAll: boolean;
    direccion: any;
    tablaConfPunto = false;

    DataResolucion: any = [];
    DataArrayResoluciones: any = [];
    DataTablaResoluciones: any = [];
    idLicencia: any;
    DataNewResolucion: any = [];
    proceso = 1;
    postResolucion: any = [];
    dataModificarBodega: any = [];
    manejaBodegas: Boolean;
    TodasMarcas: Boolean;
    ListaMarcas: any = [];
    tablaMarcasCliente: any = [];
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
    DataArrayBodegasLicencia: any = []; */

  @ViewChild('puntoUnoForm',{static:true})
  private puntoUnoForm: NgForm;

  @ViewChild('tipoNegocioForm',{static:true})
  public tipoNegocioForm: NgForm;

  @ViewChild('licenciaForm',{static:true})
  private licenciaForm: NgForm;

  @ViewChild('licenciaEditForm',{static:true})
  private licenciaEditForm: NgForm;

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public modificarpuntosService: ModificarpuntosService,
    public rutasService: RutasService,
    private datePipe: DatePipe,
    private route: ActivatedRoute) {
    this.idCliente = this.route.snapshot.params.idCliente;
    this.nombreCliente = this.route.snapshot.params.nombreCliente;
    this.idPunto = this.route.snapshot.params.idPunto;
    this.nombrePunto = this.route.snapshot.params.nomPunto;
    this.bis = false;
    this.via = 'Cll';
  }

  ngOnInit() {
    this.LoadDatosPunto(this.idCliente, this.idPunto);
    this.loadPaises();
    this.loadTipoNegocio();
    this.loadLicencias(this.idPunto);
    this.loadLicenciasInactivas(this.idPunto);
    this.loadMarcas();
    this.loadPuntoMarcas(this.idPunto);
    this.crearMarca = false;
    this.LicenciasInactivas = true;
    this.DataLicencia.estado_inst = false;
    this.DataLicencia.estado_reinst = false;
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

  LoadDatosPunto(id_cliente, id_punto) {
    this.modificarpuntosService.getPuntos(id_punto).subscribe(
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
      }
    );
  }

  loadPaises() {
    this.modificarpuntosService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.modificarpuntosService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    this.modificarpuntosService.getMunicipios(idDepartamento).subscribe(
      data => {
        this.DataArrayMunicipios = data;
      }
    );
  }

  loadTipoNegocio() {
    this.modificarpuntosService.getTipoNegocio().subscribe(
      data => {
        this.DataArrayTipoNegocio = data;
      }
    );
  }

  crearTipoNegocio(datosTipoNegocio) {
    const postData = {
      nombre: datosTipoNegocio.nombre
    };
    this.modificarpuntosService.postTipoNegocio(postData).subscribe(
      data => {
        console.log(data.text());
        if (data.text() === 'error') {
          Swal.fire({
            title: 'Tipo Negocio',
            text: 'No se ha podido crear el tipo de negocio',
            type: 'error'
          });
        } else {
          Swal.fire({
            title: 'Tipo Negocio',
            text: 'Se creo el tipo de negocio exitosamente',
            type: 'success'
          });
          this.loadTipoNegocio();
        }
      }
    );
  }

  loadPuntoMarcas(idPunto) {
    this.modificarpuntosService.getPuntoMarcas(idPunto).subscribe(
      data => {
        this.ListaMarcas = data;

        /* if (this.ListaMarcas.length === 0) {
          this.tablaMarcas = false;
        } else {
          this.tablaMarcas = true;
        } */
      }
    );
  }

  loadMarcas() {
    this.modificarpuntosService.getMarcas(this.idCliente).subscribe(
      data => {
        this.DataArrayMarcas = data;
        /* this.loader = false;
        this.LoadTabla = true; */
        this.DataTablaMarcas = [];
        for (const key of this.DataArrayMarcas) {
          this.DataTablaMarcas.push(
            {
              'id': key.id,
              'estado': key.estado,
              'nombre_marca': key.nombre_marca,
              'checked': false
            }
          );
        }
      },
      error => {
        /* this.loader = false;
        this.LoadError = true;
        this.error = error; */
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }
/*
  clickCrearMarca() {
    this.crearMarca = !this.crearMarca;
  }
 */
/*
  createPuntoMarca() {
    const marcas = {
      marca: []
    };
    for (const key of this.ListaMarcas) {
      marcas.marca.push(
        {
          'id_punto': this.idPunto,
          'id_marca': key.id_marca
        });
    }

    this.modificarpuntosService.createPuntoMarcas(marcas.marca).subscribe(res => {
      if (res.text() === 'No se pudo crear Punto Marca ') {
        Swal.fire({
          title: 'Marca No se Creo',
          text: 'La marca del punto no se crearon correctamente',
          type: 'error',
        });
      } else {
        console.log('Marca punto creadas');
      }
    });
  }
 */
/*
  bindingMarca(marca) {
    console.log(marca);
    this.postMarca = {
      'nombre': marca,
      'idCliente': this.idCliente
    };

    this.modificarpuntosService.createMarca(this.postMarca).subscribe(
      data => {
        if (data.text() === 'La marca fue creada con exito') {
          Swal.fire({
            title: 'Marca Creada',
            text: data.text(),
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Marca No Creada',
            text: data.text(),
            type: 'error',
          });
        }
        this.crearMarca = !this.crearMarca;
        this.marca = '';
        this.loadMarcas();

      }
    );
  } */

  QuitarMarca(id) {
    console.log(id);
    console.log(this.ListaMarcas);
    for (let i = 0; i < this.ListaMarcas.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.ListaMarcas[i].id_marca, 0)) {
        index = this.ListaMarcas.indexOf(this.ListaMarcas[i]);
        this.ListaMarcas.splice(index, 1);
      }
    }

    /* if (this.ListaMarcas.length === 0) {
      this.tablaMarcas = false;
    } else {
      this.tablaMarcas = true;
    } */
    /* this.configurarpuntoService.deleteMarcaPunto(this.idPunto, id).subscribe(
      data => {
        if (data.text() === 'El punto_marca fue eliminado con exito') {
          Swal.fire({
            title: 'marca Modificada',
            text: 'Proceso realizado de manera Exitosa',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'marca No se Modifico',
            text: 'Proceso no se realizó de manera Exitosa',
            type: 'error',
          });
        }
        for (let i = 0; i < this.ListaMarcas.length; i++) {
          let index;
          if (parseInt(id, 0) === parseInt(this.ListaMarcas[i].id_marca, 0)) {
            index = this.ListaMarcas.indexOf(this.ListaMarcas[i]);
            this.ListaMarcas.splice(index, 1);
          }
        }
        if (this.ListaMarcas.length === 0) {
          this.tablaMarcas = false;
        }
      }
    ); */



    /*  if (this.DataTablaMarcas.length === 0) {
       this.tablaMarcas = false;
     } */
  }


  clickFilaMarcas(id) {
    this.DataMarca.id_marca = id.toString();
  }

  GuardarMarca(datosMarca) {
    console.log(datosMarca);
    this.DataMarca.nombre_marca = this.DataTablaMarcas.filter(x => x.id == parseInt(datosMarca.id_marca, 0))[0].nombre_marca;
    /* const existe = this.ListaMarcas.filter(x => parseInt(x.id, 0) === parseInt(datosMarca.id_marca, 0));
    if (existe.length === 0) { */
    if (this.ListaMarcas.length === 0) {
      this.ListaMarcas.push(
        {
          'id_marca': datosMarca.id_marca,
          'nombre_marca': datosMarca.nombre_marca
        });
    }
    /* } */
    /* if (this.ListaMarcas.length === 0) {
      this.tablaMarcas = false;
    } else {
      this.tablaMarcas = true;
    } */
  }

  loadLicencias(idPunto) {
    this.modificarpuntosService.getPuntoLicencias(idPunto).subscribe(
      data => {
        console.log(data);
        // this.DataTablaLicencias = data;
        this.DataTablaLicencias = [];
        for (const key of data) {
          this.DataTablaLicencias.push({
            creado_por: key.creado_por,
            estado: key.estado,
            estado_inst: key.estado_inst,
            estado_reinstalacion: key.estado_reinstalacion,
            fecha_creacion: key.fecha_creacion,
            fecha_modificacion: key.fecha_modificacion,
            id: this.registroLicencia.length + 1,
            id_licencia: key.id_licencia,
            id_punto: key.id_punto,
            modificado_por: key.modificado_por,
            nombre: key.nombre,
            mac: key.mac
          });

          this.registroLicencia.push('registrosLicencias');
        }

      }
    );
  }

  loadLicenciasInactivas(idPunto) {
    this.modificarpuntosService.getPuntoLicenciasInactivas(idPunto).subscribe(
      data => {
        console.log(data);
        // this.DataTablaLicenciasInactivas = data;
        this.DataTablaLicenciasInactivas = [];
        for (const key of data) {
          this.DataTablaLicenciasInactivas.push({
            creado_por: key.creado_por,
            estado: key.estado,
            estado_inst: key.estado_inst,
            estado_reinstalacion: key.estado_reinstalacion,
            fecha_creacion: key.fecha_creacion,
            fecha_modificacion: key.fecha_modificacion,
            id: this.registroLicencia.length + 1,
            id_licencia: key.id_licencia,
            id_punto: key.id_punto,
            modificado_por: key.modificado_por,
            nombre: key.nombre
          });

          this.registroLicenciaInactivas.push('registroLicenciaInactivas1');
        }
      }
    );
  }

  SetLicenciasInactivas() {
    this.LicenciasInactivas = !this.LicenciasInactivas;
  }

  bindingLicencia(licencia) {
    this.DataTablaLicencias.push({
      id: this.registroLicencia.length + 1,
      creado_por: this.idCliente,
      estado: true,
      estado_inst: licencia.estado_inst,
      estado_reinstalacion: licencia.estado_reinst,
      id_licencia: null,
      /* fecha_creacion: key.fecha_creacion,
      fecha_modificacion: key.fecha_modificacion,
      id: this.registroLicencia.length + 1,
      id_licencia: key.id_licencia,
      id_punto: key.id_punto,
      modificado_por: key.modificado_por, */
      nombre: licencia.licencia
    });
    this.registroLicencia.push('registroLicencia1');
  }


  /* createPuntoLicencia(idLicencia) {
    const licencias = {
      liencia: []
    };

    licencias.liencia.push(
      {
        'id_punto': this.idPunto,
        'id_licencia': idLicencia
      });


    this.modificarpuntosService.createPuntoLicencia(licencias.liencia).subscribe(res => {
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
  } */

  bindingDataVerLicencia(datos) {
    this.DataVerLicencia = datos;
  }

  bindingDataModificarLicencia(datos) {
    console.log(datos);
    this.DataModificarLicencia = datos;
    this.DataModificarLicencia.nombre = datos.nombre;
    this.DataModificarLicencia.nombrelic = datos.nombre;
    console.log(this.DataModificarLicencia);
  }

  ModificarLicencia(NewLicencia) {
    console.log(NewLicencia);

   /*  for (let i = 0; i < this.DataTablaLicencias.length; i++) {
      if (parseInt(NewLicencia.id, 0) === parseInt(this.DataTablaLicencias[i].id, 0)) {
        this.DataTablaLicencias[i].nombre = NewLicencia.nombrelic;
      }
    } */

    for (const iterator of this.DataTablaLicencias) {
      if (parseInt(NewLicencia.id, 0) === parseInt(iterator.id, 0)) {
        iterator.nombre = NewLicencia.nombrelic;
      }
    }
  }

  inactivarLicencia(id) {
    let index;
    for (const key of this.DataTablaLicencias) {
      if (parseInt(id, 0) === parseInt(key.id, 0)) {
        this.DataTablaLicenciasInactivas.push({
          creado_por: key.creado_por,
          estado: false,
          estado_inst: key.estado_inst,
          estado_reinstalacion: key.estado_reinstalacion,
          fecha_creacion: key.fecha_creacion,
          fecha_modificacion: key.fecha_modificacion,
          id: this.registroLicenciaInactivas.length + 1,
          id_licencia: key.id_licencia,
          id_punto: key.id_punto,
          modificado_por: key.modificado_por,
          nombre: key.nombre
        });

        this.registroLicenciaInactivas.push('registroLicenciaInactivas1');

        index = this.DataTablaLicencias.indexOf(key);
        console.log(index);
        this.DataTablaLicencias.splice(index, 1);
      }

    }
  }



  activarLicencia(id) {
    let index;
    for (const key of this.DataTablaLicenciasInactivas) {
      if (parseInt(id, 0) === parseInt(key.id, 0)) {
        this.DataTablaLicencias.push({
          creado_por: key.creado_por,
          estado: true,
          estado_inst: key.estado_inst,
          estado_reinstalacion: key.estado_reinstalacion,
          fecha_creacion: key.fecha_creacion,
          fecha_modificacion: key.fecha_modificacion,
          id: this.registroLicencia.length + 1,
          id_licencia: key.id_licencia,
          id_punto: key.id_punto,
          modificado_por: key.modificado_por,
          nombre: key.nombre
        });

        this.registroLicencia.push('registroLicencia1');

        index = this.DataTablaLicenciasInactivas.indexOf(key);
        console.log(index);
        this.DataTablaLicenciasInactivas.splice(index, 1);
      }

    }
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
      id: punto.id,
      cod: punto.cod,
      nombre: punto.nombre,
      direccion: punto.direccion,
      telefono: punto.telefono,
      extension: punto.extension,
      telefono2: punto.telefono2,
      extension2: punto.extension2,
      idCentroCosto: punto.id_centro_costo,
      estado: punto.estado,
      creadoPor: punto.creado_por,
      fechaCreacion: punto.fecha_creacion,
      modificadoPor: punto.modificado_por,
      fechaModificacion: punto.fecha_modificacion,
      estadoInst: punto.estadoInst,
      municipio: {
        id: punto.id_municipio
      },
      tipoNegocio: {
        id: punto.id_tipo_negocio
      },
      estadoReinstalacion: punto.estadoReinstalacion,
      idCliente: punto.id_cliente
    };


    this.modificarpuntosService.postPunto(data).subscribe(
      resul => {
        const res = resul.text();
        if (res === 'No se pudo Modificar el punto') {
          Swal.fire({
            title: 'Punto',
            text: 'No se ha podido modificar el punto',
            type: 'error',
          });
        } else {
          this.updatePuntoLicencia(this.idPunto);
          this.updatePuntoMarca();
          this.router.navigate(['/configuraciones/clientes/puntos/' + this.idCliente]);
          Swal.fire({
            title: 'Punto',
            text: 'El punto ha sido modificado con exito',
            type: 'success',
          });
        }
      }
    );
  }

  updatePuntoLicencia(idPunto) {
    const licencias = {
      liencia: []
    };

    console.log(this.DataTablaLicencias);

    for (const key of this.DataTablaLicencias) {
      licencias.liencia.push(
        {
          id: key.id_licencia,
          nombre: key.nombre,
          creadoPor: key.creado_por,
          fechaCreacion: key.fecha_creacion,
          estado: key.estado,
          estadoInst: key.estado_inst,
          estadoReinstalacion: key.estado_reinstalacion,
          mac: key.mac
        });
    }

    for (const key of this.DataTablaLicenciasInactivas) {
      licencias.liencia.push(
        {
          id: key.id_licencia,
          nombre: key.nombre,
          creadoPor: key.creado_por,
          fechaCreacion: key.fecha_creacion,
          estado: key.estado,
          estadoInst: key.estado_inst,
          estadoReinstalacion: key.estado_reinstalacion,
          mac: key.mac
        });
    }

    this.modificarpuntosService.updatePuntoLicencia(licencias.liencia, idPunto).subscribe(
      res => {
        console.log(res);
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
  updatePuntoMarca() {
    const Marcas = {
      marca: []
    };
    console.log(this.ListaMarcas);
    for (const key of this.ListaMarcas) {
      Marcas.marca.push(
        {
          'id_punto': this.idPunto,
          'id_marca': key.id_marca
        });
    }

    this.modificarpuntosService.updatePuntoMarcas(Marcas.marca, this.idPunto).subscribe(res => {
      if (res.text() === 'No se pudo crear Punto Marca') {
        Swal.fire({
          title: 'Marca No se Creo',
          text: 'La marcas del punto no se crearon correctamente',
          type: 'error',
        });

      } else {
        console.log('Marca punto creadas');
      }
    });
  }


  LimpiarFormTipoNegocio() {
    this.tipoNegocioForm.reset();
  }

  LimpiarFormLicencia() {
    this.licenciaForm.reset();
    this.DataLicencia.estado_inst = false;
    this.DataLicencia.estado_reinst = false;
  }
  LimpiarFormMarcas() {
    this.marca = '';
    this.TodasMarcas = false;
    this.DataMarca = [];
    /* this.ListaSelMarcas = [];
    this.onChangeAllMarcas(this.DataTablaMarcas, false); */
  }


}
