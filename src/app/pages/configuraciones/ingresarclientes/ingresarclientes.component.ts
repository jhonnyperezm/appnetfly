import { Component, OnInit, ViewChild } from '@angular/core';
import { IngresarclientesService } from './ingresarclientes.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

const PADDING = '000000';
declare const $;

@Component({
  selector: 'app-ingresarclientes',
  templateUrl: './ingresarclientes.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarclientesService, RutasService]
})
export class IngresarclientesComponent implements OnInit {

  /* private itempageImpuesto = 5;
  private itempageCanal = 5;
  private itempageMensajes = 5;
  private itempageListaCanales = 10;
  private searchStringImpuesto: any;
  private searchStringCanal: any;
  private searchStringMensajes: any;
  private searchStringListaCanales: any; */
  digito: any;
  direccion: any;
  direccion2: any;
  variable: any;
  loader = true;
  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  tm: number = 1;
  /*  DataArrayImpuestos: any = [];
   DataArrayRegimen: any = [];
   DataJsonRegimen: any = [];
   DataArrayCanales: any = []; */
  LoadError = false;
  error: any;
  LoadTabla = true;
  /* private tablaImpuestoRegimen = false;
  private tablaCanales = false; */
  DataArrayPais: any = [];
  /* private DataArrayImpuesto: any = [];
  private DataJsonImpuesto: any = [];
  private DataArrayReg: any = [];
  private DataJson: any = [];
  private checkedAll = false;
  private DataJsonRpt: any = [];
  private  DataJsonCanales: any = [];
  private  DataCanales: any = []; */
  DataNewCliente: any = [];
  // DataOperaImpuesto: any = [];
  DataUserNuevo: any = [];
  /* private DataCanalImpuesto: any = [];
  private impMasUsado: Boolean;
  private unicaTarCanal: Boolean;
  private ValorUnicaTar: any; */
  DataArray: any = [];
  bis: Boolean;
  paisReg: any;

  /* private DataArrayMensajes: any = []; */

  itempageApliCliente = 5;
  searchStringApliCliente: any;
  itempageApli = 10;
  searchStringApli: any;
  DataApp: any;
  DataJsonApp: any = [];
  DataAppRpt: any;
  DataTablaApli = false;
  DataJsonApli: any = [];
  manejaDescEsp = false;
  idUsuarioConfCreado: any;
  DataJsonTarifas: any = [];
  via: any;
  DataNewContacto: any = [];
  ListaContactos: any = [];
  btn_agregar: boolean;
  btn_actualizar: boolean;

  ValorUnicaTarCanal: any;
  impuestoCanales: any;
  Canal: any;
  regimen: any;
  impuesto: any;
  descripcion: any;
  senas: any;
  cuadrante2: any;
  placa: any;
  letra2: any;
  numero2: any;
  cuadrante: any;
  letra: any;
  numero: any;
  // marca: boolean;

  searchStringTarifas: any;
  itempageTarifas = 5;
  DataJsonTarSel: any = [];
  regitrosImpuestos: any = [];


  mensajesLegales: any = [];
  registrosMensajes: any = [];
  ListaMensajesLegales: any = [];

  DECIMAL_SEPARATOR: string;
  THOUSANDS_SEPARATOR: string;
  ListaMarcas: any = [];

  searchStringTMarcas: any;
  itempageTMarcas = 5;
  MarcasInactivas = true;
  DataNewMarca: any = [];
  registrosMarcas: any = [];
  DataEditMarca: any = [];
  DataInactivarMarca: any = [];
  ListaMarcasInactivas: any = [];
  registrosMarcasInactivas: any = [];

  @ViewChild('clienteUnoForm',{static : true})
  public clienteUnoForm: NgForm;

  @ViewChild('marcasForm',{static : true})
  public marcasForm: NgForm;

  @ViewChild('marcasEditForm',{static : true})
  public marcasEditForm: NgForm;

  /* @ViewChild('clienteDosForm')
  public clienteDosForm: NgForm;

  @ViewChild('confRegimenForm')
  private confRegimenForm: NgForm;

  @ViewChild('ImpuestoCanalForm')
  private ImpuestoCanalForm: NgForm;

  @ViewChild('paisRegimenForm')
  private paisRegimenForm: NgForm;

  @ViewChild('msgLegalesForm')
  private msgLegalesForm: NgForm; */

  constructor(public router: Router,
    public toastr: ToastrService,
    public ingresarclientesService: IngresarclientesService,
    public rutasService: RutasService) {
    this.loader = true;
    this.DataNewCliente.recetaDifPunto = false;
    this.DataNewCliente.recetaDifCanal = false;
    this.DataNewCliente.empaqueDifPunto = false;
    this.DataNewCliente.empaqueDifCanal = false;
    this.DataNewCliente.impuestoDifCanal = false;
    this.DataNewCliente.unicoImpuestoCanal = false;
    this.bis = false;
    this.via = 'Cll';
    this.DECIMAL_SEPARATOR = ',';
    this.THOUSANDS_SEPARATOR = '.';
    this.DataNewCliente.id_pais = 42;
    this.loadDepartamento(this.DataNewCliente.id_pais);
    this.paisReg = 42;
    /* this.loadImpuesto(this.paisReg); */
    // this.LoadTarifas();
  }

  ngOnInit() {
    this.loadPaises();
    /* this.loadCanales();
    this.loadRegimen(); */
    // this.checkedAll = false;
    this.paisReg = 42;
    /* this.loadImpuesto(this.paisReg); */
    this.btn_agregar = true;
    this.btn_actualizar = false;
    /* this.cargarPais(); */
  }

  Regresar() {
    this.router.navigate(['/configuraciones/clientes']);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loadPaises() {
    this.ingresarclientesService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }
  /*
    loadCanales() {
      this.ingresarclientesService.getCanales().subscribe(
        data => {
          this.DataArrayCanales = data;
          this.loader = false;
          this.LoadTabla = true;

          this.DataJsonRpt = [];
          for (const key of this.DataArrayCanales) {
            const existe = this.DataCanales.filter(x => parseInt(x.id, 0) === parseInt(key.id, 0));

            if (existe.length === 0) {
              this.DataJsonRpt.push(
                {
                  'id': key.id,
                  'nombre': String(key.nombre),
                  'checked': false
                }
              );
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
   */
  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.ingresarclientesService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    if (idDepartamento !== '' && idDepartamento !== null && idDepartamento !== undefined) {
      this.ingresarclientesService.getMunicipios(idDepartamento).subscribe(
        data => {
          this.DataArrayMunicipios = data;
        });
    }
  }
  /*
    loadImpuesto(idPais) {
      if (idPais === '' || idPais === null || idPais === undefined) {
      } else {
        this.ingresarclientesService.getImpuestos(idPais).subscribe(
          data => {
            this.DataArrayImpuestos = data;
          });
      }
    }

    loadRegimen() {
      this.ingresarclientesService.getRegimen().subscribe(
        data => {
          this.DataArrayRegimen = data;
          for (const key of this.DataArrayRegimen) {
            if (key.id !== 3) {
              this.DataJsonRegimen.push({
                'id': key.id,
                'nombre': key.nombre
              });
            }
          }
        }
      );
    } */

  colocarPuntos(value: number | string, fractionSize: number = 2): string {
    let [integer, fraction = ''] = (value || '').toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : '';

    integer = integer.replace(/\./g, '');
    integer = integer.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    integer = integer.split('').reverse().join('').replace(/^[\.]/, '');

    this.DataNewCliente.nit = integer;
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
      this.DataNewCliente.digito = (11 - Residuo);
    } else {
      this.DataNewCliente.digito = Residuo;
    }
    if (this.DataNewCliente.digito === 0) {
      this.DataNewCliente.digito = '0';
    }
  }

  focusDireccion() {
    $('#MyModal').modal({ backdrop: 'static' });
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
      this.DataNewCliente.direccion = via + ' ' + numero + ' ' + this.variable + ' ' + letra + ' ' + cuadrante + ' #' +
        numero2 + letra2 + '-' + placa + ' ' + cuadrante2 + ' ' + senas;
    } else if (parseInt(this.direccion2, 0) === 2) {
      this.DataNewCliente.direccion = descripcion;
    }
  }



  validarFranquiciador(franquiciador) {
    if (franquiciador == 1) {
      this.DataNewCliente.franquiciado = 0;
    }
  }

  validarFranquiciado(franquiciado) {
    if (franquiciado == 1) {
      this.DataNewCliente.franquiciador = 0;
    }
  }

  GuardarMarca(dataMarca) {
    this.ListaMarcas.push({
      id: null,
      index: this.registrosMarcas.length + 1,
      nombre: dataMarca.nombre,
      estado: true
    });
    this.registrosMarcas.push('marcaNueva1');
  }

  SetMarcasInactivas() {
    this.MarcasInactivas = !this.MarcasInactivas;
  }

  bindingDataModificarMarca(datos) {
    this.DataEditMarca = datos;
    this.DataEditMarca.nombre_marca = datos.nombre;
  }

  modificarMarca(datosEditMarca) {
    for (let i = 0; i < this.ListaMarcas.length; i++) {
      if (this.ListaMarcas[i].index === datosEditMarca.index) {
        this.ListaMarcas[i].nombre = datosEditMarca.nombre_marca;
      }
    }
  }

  bindingInactivarMarca(datosMarca) {
    this.DataInactivarMarca = datosMarca;
  }

  inactivarMarca(datosInactivar) {
    this.ListaMarcasInactivas.push({
      id: datosInactivar.id,
      index: this.registrosMarcasInactivas.length + 1,
      nombre: datosInactivar.nombre,
      estado: false
    });
    this.registrosMarcasInactivas.push('marcaNueva1');
    let index;
    for (let i = 0; i < this.ListaMarcas.length; i++) {
      if (this.ListaMarcas[i].index === datosInactivar.index) {
        index = this.ListaMarcas.indexOf(this.ListaMarcas[i]);
        this.ListaMarcas.splice(index, 1);
      }
    }

  }

  activarMarca(datosActivar) {
    this.ListaMarcas.push({
      id: datosActivar.id,
      index: this.registrosMarcas.length + 1,
      nombre: datosActivar.nombre,
      estado: true
    });
    this.registrosMarcas.push('marcaNueva1');
    let index;
    for (let i = 0; i < this.ListaMarcasInactivas.length; i++) {
      if (this.ListaMarcasInactivas[i].index === datosActivar.index) {
        index = this.ListaMarcasInactivas.indexOf(this.ListaMarcasInactivas[i]);
        this.ListaMarcasInactivas.splice(index, 1);
      }
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
        var correo = datosContacto.correo_contacto.split("@", 2);
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

  Siguiente() {
    console.log('Form Submitted!');
  }

  ValidaNit(datoscliente) {
    this.ingresarclientesService.ValidarNit(datoscliente.nit).subscribe(
      data => {
        if (data.text() === '1') {
          Swal.fire({
            title: 'Nit',
            text: 'El nit ya existe en la base de datos',
            type: 'error',
          });

        } else if (data.text() === '2') {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrio un error al validar el nit',
            type: 'error',
          });
        } else {
          this.ValidaCorreo(datoscliente);
        }
      });
  }

  ValidaCorreo(datoscliente) {
    this.ingresarclientesService.ValidarEmail(datoscliente.correo).subscribe(
      data => {
        if (data.text() === '1') {
          Swal.fire({
            title: 'Correo',
            text: 'El correo ya existe en la base de datos',
            type: 'error',
          });
        } else if (data.text() === '2') {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrio un error al validar el correo',
            type: 'error',
          });
        } else {
          this.onSubmit(datoscliente);
        }
      });
  }


  onSubmit(cliente) {

    let correo_prop;
    let tel_prop;

    if (cliente.celular === '' || cliente.celular === undefined || cliente.celular === null) {
      cliente.celular = 'N/A';
    }
    if (cliente.extension === '' || cliente.extension === undefined || cliente.extension === null) {
      cliente.extension = 0;
    }
    if (cliente.propietario === '' || cliente.propietario === undefined || cliente.propietario === null) {
      cliente.propietario = 'N/A';
    }
    if (cliente.correo_propietario === '' || cliente.correo_propietario === undefined || cliente.correo_propietario === null) {
      correo_prop = 'N/A';
    } else {
      correo_prop = cliente.correo_propietario;
    }
    if (cliente.telefono_propietario === '' || cliente.telefono_propietario === undefined || cliente.telefono_propietario === null) {
      tel_prop = 'N/A';
    } else {
      tel_prop = cliente.telefono_propietario;
    }
    if (cliente.tokenEmpresa === '' || cliente.tokenEmpresa === undefined || cliente.tokenEmpresa === null) {
      cliente.tokenEmpresa = 'N/A';
    }
    if (cliente.tokenPassword === '' || cliente.tokenPassword === undefined || cliente.tokenPassword === null) {
      cliente.tokenPassword = 'N/A';
    }

    const fecha = new Date();

    const data = {
      'cargoContacto': 'N/A',
      'celDueno': tel_prop,
      'celular': cliente.celular,
      'celularContacto': 0,
      'contacto': 'N/A',
      'creadoPor': 1,
      'digitoCheckeo': cliente.digito,
      'direccion': cliente.direccion,
      'documentoRepresentante': cliente.documento_representantelegal,
      'email': cliente.correo,
      'emailContacto': 'N/A',
      'emailDueno': correo_prop,
      'empaqueDifCanal': cliente.empaqueDifCanal,
      'empaqueDifPunto': cliente.empaqueDifPunto,
      'estado': true,
      'extension': cliente.extension,
      'extension2': 0,
      'fechaCrecion': fecha.toLocaleDateString(),
      'fechaModificacion': fecha.toLocaleDateString(),
      'modificadoPor': 1,
      'nit': cliente.nit,
      'nombre': cliente.razonsocial,
      'nombreDueno': cliente.propietario,
      'nombreRepresentante': cliente.representantelegal,
      'recetaDifCanal': cliente.recetaDifCanal,
      'recetaDifPunto': cliente.recetaDifPunto,
      'impuestoDifCanal': cliente.impuestoDifCanal,
      'telefono': cliente.telefono,
      'telefono2': 0,
      'unicoImpuestoCanal': cliente.unicoImpuestoCanal,
      'tokenEmpresa': cliente.tokenEmpresa,
      'tokenPassword': cliente.tokenPassword,
      'municipio': {
        'id': cliente.id_municipio
      },
      'regimen': {
        'id': '1'
      },
      'franquiciador': cliente.franquiciador,
      'franquiciado': cliente.franquiciado
    };

    this.ingresarclientesService.postCliente(data).subscribe(
      resul => {
        const res = resul.text();
        if (res === 'No se pudo crear el cliente') {
          Swal.fire({
            title: 'Cliente',
            text: 'No se ha podido crear el cliente',
            type: 'error',
          });
        } else if (res === 'El nit ya existe') {
          Swal.fire({
            title: 'Cliente',
            text: 'El nita ya existe, No se ha podido crear el cliente',
            type: 'error',
          });

        } else {
          this.createUsuario(cliente, res);
          this.createMarcas(res);
          this.crearContacto(res);
          this.router.navigate(['/configuraciones/clientes']);
          Swal.fire({
            title: 'Cliente',
            text: 'Fue creado el cliente ' + cliente.razonsocial + ' con exito',
            type: 'success',
          });
        }
      }
    );
  }

  createUsuario(userNew, IdCliente) {
    const user = userNew.correo.split('@');
    console.log(user);
    this.DataUserNuevo = {
      'nombre': userNew.razonsocial,
      'usuario': userNew.correo,
      'clave': userNew.telefono,
      'id_cliente': IdCliente,
      'email': userNew.correo,
      'creadoPor': 1,
      'modificadoPor': 1,
      'estado': true,
      'id_rol': 2
    };

    this.ingresarclientesService.createUsuario(this.DataUserNuevo).subscribe(data => {
      this.idUsuarioConfCreado = data.text();
    }
    );
  }


  createMarcas(IdCliente) {

    if (this.ListaMarcas.length !== 0) {
      for (const key of this.ListaMarcas) {
        const data = {
          id: key.id,
          nombre: key.nombre,
          estado: key.estado
        };
        if (key.id === null) {

          this.ingresarclientesService.postMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        } else {
          this.ingresarclientesService.putMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        }
      }
    }

    if (this.ListaMarcasInactivas.length !== 0) {
      for (const key of this.ListaMarcasInactivas) {
        const data = {
          id: key.id,
          nombre: key.nombre,
          estado: key.estado
        };
        if (key.id === null) {

          this.ingresarclientesService.postMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        } else {
          this.ingresarclientesService.putMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        }
      }
    }
  }


  crearContacto(idCliente) {
    const proveedor = {
      contacto: []
    };
    for (const key of this.ListaContactos) {
      proveedor.contacto.push(
        {
          'id_cliente': idCliente,
          'nombre': key.nombre,
          'cargo': key.cargo,
          'telefono': key.telefono,
          'email': key.correo
        });
    }
    this.ingresarclientesService.postContactoCliente(proveedor.contacto).subscribe(res => {
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

  LimpiarFormMarcas() {
    this.marcasForm.reset();
  }
}
