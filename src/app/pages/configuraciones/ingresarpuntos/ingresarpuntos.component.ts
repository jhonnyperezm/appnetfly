import { Component, OnInit, ViewChild } from '@angular/core';
import { IngresarpuntosService } from './ingresarpuntos.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyMarkedDate, IMySelector } from 'mydatepicker';
import Swal from 'sweetalert2';
declare const $;


@Component({
  selector: 'app-ingresarpuntos',
  templateUrl: './ingresarpuntos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarpuntosService, DatePipe]
})
export class IngresarpuntosComponent implements OnInit {


  id: any;
  nombreCliente: any;

  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  DataNewPunto: any = [];
  direccion: any;
  direccion2: any;
  variable: any;
  bis: boolean;
  via: any;

  tm : any = 1;
  tl : any = 1;

  numero2:any;
  letra2:any;
  cuadrante2:any;
  senas:any;
  descripcion:any;
  numero:any;
  letra:any;
  cuadrante:any;
  placa:any;
  licencia:any;
  


  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  DataArrayTipoNegocio: any = [];


  DataTablaLicencias: any = [];
  registrosLicencias: any = [];
  DataVerLicencia: any = [];
  DataModificarLicencia: any = [];
  searchStringTLicencias: any;
  itempageTLicencias = 5;

  ListaHoras: any = [];
  registrosHoras: any = [];
  DataTipoNeg: any = [];


  DataArrayMarcas: any = [];
  DataTablaMarcas: any = [];
  postMarca: any = [];
  // tablaMarcas = false;
  crearMarca: Boolean;
  marca: any;
  ListaSelMarcas: any = [];
  DataMarca: any = [];
  itempageTMarcas = 5;
  searchStringTMarcas: any;
  TodasMarcas: Boolean;
  ListaMarcas: any = [];

  @ViewChild('puntoUnoForm', {static:true})
  public puntoUnoForm: NgForm;

  @ViewChild('tipoNegocioForm', {static:true})
  public tipoNegocioForm: NgForm;

  @ViewChild('licenciaForm', {static:true})
  private licenciaForm: NgForm;

  @ViewChild('licenciaEditForm', {static:true})
  private licenciaEditForm: NgForm;

  canDeactivate() {
    if (this.puntoUnoForm.dirty) {
      return window.confirm('¿Estás seguro de que desea salir sin guardar cambios?');
    }
    return true;
  }

  Siguiente() {
    console.log('Form Submitted!');
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private datePipe: DatePipe,
    public ingresarpuntosService: IngresarpuntosService,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;

   /*  this.route.parent.params.subscribe(params => {
      console.log(params);
      this.breadcrumbService.set('dashboard/configuracion/clientes/puntos/', params.idCliente);
    }); */


    this.id = this.route.snapshot.params.idCliente;
    this.nombreCliente = this.route.snapshot.params.nombreCliente;
    this.bis = false;
    this.via = 'Cll';
    this.DataNewPunto.id_pais = 42;
    this.loadDepartamento(this.DataNewPunto.id_pais);
    this.DataNewPunto.ventasMesero = 1;
    this.DataNewPunto.capCantPers = 1;
    this.DataNewPunto.atiendeMesas = 'Mesero';
    this.DataNewPunto.pideDistintivo = 0;
    this.DataNewPunto.propina = 'Ser. Voluntario';
    this.DataNewPunto.recargo = 'Ser. Domicilio';
    this.DataNewPunto.tope = 0;
    this.DataNewPunto.nombreDocDom = 'Doc. Equivalente';
    this.DataNewPunto.porcentaje = 1;
    this.DataNewPunto.valor = 0;
    this.DataNewPunto.porValRecargoDom = 0;


    const fecha = new Date();
    const fechaGeneral = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const esthoraIni = fechaGeneral + 'T00:01';
    const esthoraFin = fechaGeneral + 'T23:59';
    console.log(esthoraIni);
    console.log(esthoraIni);
    const HoraIni = new Date(esthoraIni);
    const HoraFin = new Date(esthoraFin);

    console.log();

    this.ListaHoras.push({
      'id': this.registrosHoras.length,
      'horaInicio': HoraIni,
      'horaFin': HoraFin,
      'descripcion': 'General'
    });
    this.registrosHoras.push('horas1');
  }

  ngOnInit() {
    this.loadPaises();
    this.loadTipoNegocio();
    this.loadMarcas();
    this.crearMarca = false;
  }

  Regresar() {
    this.router.navigate(['/configuraciones/clientes/puntos/' + this.id]);
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

  crearTipoNegocio(datosTipoNegocio) {
    const postData = {
      nombre: datosTipoNegocio.nombre
    };
    this.ingresarpuntosService.postTipoNegocio(postData).subscribe(
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

  loadPaises() {
    this.ingresarpuntosService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.ingresarpuntosService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    if (idDepartamento !== '' && idDepartamento !== null && idDepartamento !== undefined) {
      this.ingresarpuntosService.getMunicipios(idDepartamento).subscribe(
        data => {
          this.DataArrayMunicipios = data;
        }
      );
    }
  }

  loadTipoNegocio() {
    this.ingresarpuntosService.getTipoNegocio().subscribe(
      data => {
        this.DataArrayTipoNegocio = data;
      }
    );
  }


  clickFilaMarcas(id) {
    this.DataMarca.id_marca = id.toString();
  }

  GuardarMarca(datosMarca) {
    this.DataMarca.nombre_marca = this.DataTablaMarcas.filter(x => x.id == parseInt(datosMarca.id_marca, 0))[0].nombre_marca;
    /* const existe = this.ListaMarcas.filter(x => parseInt(x.id, 0) === parseInt(datosMarca.id_marca, 0));
    if (existe.length === 0) { */
    if (this.ListaMarcas.length === 0) {
      this.ListaMarcas.push(
        {
          'id': datosMarca.id_marca,
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


  loadMarcas() {
    this.ingresarpuntosService.getMarcas(this.id).subscribe(
      data => {
        this.DataArrayMarcas = data;
        this.loader = false;
        this.LoadTabla = true;

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
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
    console.log('marcas',this.DataArrayMarcas);
    
  }
/*
  clickCrearMarca() {
    this.crearMarca = !this.crearMarca;
  }

  bindingMarca(marca) {
    this.postMarca = {
      'nombre': marca,
      'idCliente': this.id
    };

    this.ingresarpuntosService.createMarca(this.postMarca).subscribe(
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

  QuitarMarca(Id) {
    for (let i = 0; i < this.ListaMarcas.length; i++) {
      let index;
      if (parseInt(Id, 0) === parseInt(this.ListaMarcas[i].id, 0)) {
        index = this.ListaMarcas.indexOf(this.ListaMarcas[i]);
        this.ListaMarcas.splice(index, 1);
      }
    }

    /* if (this.ListaMarcas.length === 0) {
      this.tablaMarcas = false;
    } else {
      this.tablaMarcas = true;
    } */
  }

  bindingLicencia(licencia) {

    this.DataTablaLicencias.push({
      id: this.registrosLicencias.length + 1,
      nombre: licencia
    });
    this.registrosLicencias.push('registroLicencia1');
  }

  bindingDataVerLicencia(datos) {
    this.DataVerLicencia = datos;
  }

  bindingDataModificarLicencia(datos) {
    this.DataModificarLicencia = datos;
    this.DataModificarLicencia.nombreLic = datos.nombre;
  }

  ModificarLicencia(NewLicencia) {

    for (const iterator of this.DataTablaLicencias) {
      if (parseInt(NewLicencia.id, 0) === parseInt(iterator.id, 0)) {
        iterator.nombre = NewLicencia.nombreLic;
      }
    }
  }

  onSubmit(punto) {
    const fecha = new Date();
    if (punto.centro === '' || punto.centro === null || punto.centro === undefined) {
      punto.centro = 0;
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
      idCliente: this.id,
      nombre: punto.nombre,
      direccion: punto.direccion,
      telefono: punto.telefono,
      extension: punto.extension,
      telefono2: punto.telefono2,
      extension2: punto.extension2,
      idCentroCosto: punto.centro,
      estado: true,
      creadoPor: 1,
      fechaCreacion: fecha.toLocaleDateString(),
      modificadoPor: 1,
      fechaModificacion: fecha.toLocaleDateString(),
      municipio: {
        id: punto.id_municipio
      },
      tipoNegocio: {
        id: punto.tiponegocio
      }
    };

    this.ingresarpuntosService.postPunto(data).subscribe(
      resul => {
        const res = resul.text();
        if (res === 'No se pudo crear el punto') {
          Swal.fire({
            title: 'Punto',
            text: 'No se ha podido crear el punto',
            type: 'error',
          });
        } else {
          this.createClientePunto(this.id, res); // Crea en tabla cliente_punto
          this.createPuntoLicencia(res); // crea en tabla punto licencia
          this.createPuntoAdicionalesConfiguraciones(res, punto); // Crea en tabla punto_configuraciones
          this.createPuntoHora(res); // crea en tabla punto_hora
          this.createPuntoMarca(res); // Crea en tabla punto_marca
          this.router.navigate(['/configuraciones/clientes/puntos/' + this.id]);
          Swal.fire({
            title: 'Punto',
            text: 'El punto ha sido creado con exito',
            type: 'success',
          });
        }
      }
    );
  }

  createClientePunto(idCliente, idPunto) {
    const cliente = {
      puntos: []
    };

    cliente.puntos.push(
      {
        id_cliente: idCliente,
        id_punto: idPunto
      });

    this.ingresarpuntosService.createClientePunto(cliente.puntos).subscribe(res => {
      if (res.text() === 'No se pudo crear la asociacion de cliente al punto') {
        Swal.fire({
          title: 'punto del cliente No se Creo',
          text: 'El punto no se pudo asociar al cliente',
          type: 'error',
        });
      } else {
        console.log('Cliente punto creado');
      }
    });
  }

  createPuntoLicencia(idPunto) {
    const licencias = {
      liencia: []
    };

    for (const key of this.DataTablaLicencias) {
      licencias.liencia.push(
        {
          nombre: key.nombre,
          creadoPor: this.id
        });
    }

    this.ingresarpuntosService.createPuntoLicencia(licencias.liencia, idPunto).subscribe(
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

  createPuntoAdicionalesConfiguraciones(idPunto, datos) {
    console.log(datos);
    let datodistintivo;
    if (datos.distintivo === undefined) {
      datodistintivo = '';
    } else {
      datodistintivo = datos.distintivo;
    }
    const postData = {
      punto: {
        id: idPunto
      },
      ventasMesero: datos.ventasMesero,
      personasAtendidas: datos.capCantPers,
      personaAtiendeMesa: datos.atiendeMesas,
      pideDistintivo: datos.pideDistintivo,
      distintivo: datodistintivo,
      propina: datos.propina,
      porcentajePropina: datos.porcentaje,
      valorPropina: datos.valor,
      recargoDomicilio: datos.recargo,
      tipoRecargoDomicilio: datos.recargoDom,
      conSinIva: datos.ivaDom,
      existeTope: datos.tope,
      valorTope: datos.valorTope,
      valorRecargo: datos.valorRecargo,
      recargoDomicilioIva: datos.recDomIva,
      idImpuesto: datos.impuesto,
      tarifa: datos.idTarifa,
      valorPorcentajeIva: datos.porValRecargoDom,
      valorDescuentoFactura: datos.descuentoFactDom,
      documentoSalidaVentas: datos.nombreDocDom
    };
    this.ingresarpuntosService.createPuntoAdicionConf(postData).subscribe(res => {
      if (res.text() === 'error') {
        console.log('error al crear Configuraciones adicionales punto creadas');
      } else {
        console.log('Configuraciones adicionales punto creadas');
      }
    });
  }

  createPuntoHora(idPunto) {

    const fecha = new Date();
    const fechaGeneral = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const Horas = {
      hora: []
    };
    for (const key of this.ListaHoras) {
      console.log(key);
      console.log(key.horaInicio);
      console.log(key.horaInicio.toLocaleTimeString());
      Horas.hora.push(
        {
          'punto': {
            'id': idPunto
          },
          'descripcion': key.descripcion,
          'horaInicial': fechaGeneral + 'T' + key.horaInicio.toLocaleTimeString('en-GB'),
          'horaFinal': fechaGeneral + 'T' + key.horaFin.toLocaleTimeString('en-GB'),
        });
    }

    this.ingresarpuntosService.createPuntoHoras(Horas.hora).subscribe(res => {
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


  createPuntoMarca(idPunto) {
    const Marcas = {
      marca: []
    };
    for (const key of this.ListaMarcas) {
      Marcas.marca.push(
        {
          'id_punto': idPunto,
          'id_marca': key.id
        });
    }

    this.ingresarpuntosService.createPuntoMarcas(Marcas.marca).subscribe(res => {
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
  }

}
