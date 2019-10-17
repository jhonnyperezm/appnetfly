import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ModificarclientesService } from './modificarclientes.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

const PADDING = '000000';
declare const $;

@Component({
  selector: 'app-modificarclientes',
  templateUrl: './modificarclientes.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificarclientesService, RutasService]
})
export class ModificarclientesComponent implements OnInit {

  id: any;
  digito: any;
  direccion: any;
  direccion2: any;
  variable: any;
  loader = true;
  DataArrayCliente: any = [];
  DataArrayPaises: any = [];
  DataArrayDepartamentos: any = [];
  DataArrayMunicipios: any = [];
  LoadError = false;
  error: any;
  LoadTabla = true;
  DataArrayPais: any = [];
  DataJson: any = [];
  checkedAll = false;
  DataNewCliente: any = [];
  // DataOperaImpuesto: any = [];
  DataCanalImpuesto: any = [];
  DataJsonRegimen: any = [];
  ValorUnicaTar: any;
  impMasUsado: Boolean;
  unicaTarCanal: Boolean;
  bis: Boolean;
  paisReg: any;
  tm: number = 1;


  itempageApliCliente = 5;
  SearchStringApliCliente: any;
  itempageApli = 10;
  SearchStringApli: any;
  DataApp: any;
  DataJsonApp: any = [];
  DataAppRpt: any;
  DataTablaApli = false;
  DataJsonApli: any = [];
  manejaDescEsp = false;

  DataArraApli: any = [];
  via: any;

  DataNewContacto: any = [];
  ListaContactos: any = [];
  btn_agregar: boolean;
  btn_actualizar: boolean;

  descripcion: any;
  senas: any;
  cuadrante2: any;
  placa: any;
  letra2: any;
  numero2: any;
  cuadrante: any;
  letra: any;
  numero: any;

  DataArrayMarcasActivas: any = [];
  ListaMarcas: any = [];
  registrosMarcas: any = [];

  DataArrayMarcasInactivas: any = [];
  ListaMarcasInactivas: any = [];
  registrosMarcasInactivas: any = [];

  MarcasInactivas = true;
  DataNewMarca: any = [];
  DataEditMarca: any = [];
  DataInactivarMarca: any = [];
  searchStringTMarcas: any;
  itempageTMarcas = 5;

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  @ViewChild('clienteUnoForm',{static:true})
  private clienteUnoForm: NgForm;

  @ViewChild('marcasForm',{static:true})
  public marcasForm: NgForm;

  @ViewChild('marcasEditForm',{static:true})
  public marcasEditForm: NgForm;


  constructor(public router: Router,
    public toastr: ToastrService,
    public modificarclientesService: ModificarclientesService,
    vcr: ViewContainerRef,
    public rutasService: RutasService,
    private route: ActivatedRoute) {
    this.loader = true;
    this.DECIMAL_SEPARATOR = ',';
    this.THOUSANDS_SEPARATOR = '.';
    this.id = this.route.snapshot.params.idCliente;
    this.unicaTarCanal = false;
    this.impMasUsado = false;
    this.bis = false;
    this.via = 'Cll';
  }

  ngOnInit() {
    this.LoadClientesData(this.id);
    this.LoadMarcasClienteActivas(this.id);
    this.LoadMarcasClienteInactivas(this.id);
    this.LoadContactosClienteData(this.id);
    this.loadPaises();
    /*  this.LoadImpuestoCliente(this.id);
     this.LoadCanalesCliente(this.id);
     this.LoadMensajesLegales(this.id);
     this.loadCanales();
     this.loadRegimen();
     this.loadImpuestoRegimen(); */
    this.btn_agregar = true;
    this.btn_actualizar = false;
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

  LoadClientesData(idCliente) {
    this.modificarclientesService.getCliente(idCliente).subscribe(
      data => {
        console.log(data);
        this.DataArrayCliente = data;
        this.DataJson = this.DataArrayCliente[0];
        if (this.DataJson.digito_checkeo === 0) {
          this.DataJson.digito_checkeo = '0';
        }
        if (this.DataJson.celular === 'N/A') {
          this.DataJson.celular = '';
        }
        if (this.DataJson.email_dueno === 'N/A') {
          this.DataJson.email_dueno = '';
        }
        if (this.DataJson.cel_dueno === 'N/A') {
          this.DataJson.cel_dueno = '';
        }

        if (this.DataJson.franquiciador === true) {
          this.DataJson.franquiciador = 1;
        } else {
          this.DataJson.franquiciador = 0;
        }
        if (this.DataJson.franquiciado === true) {
          this.DataJson.franquiciado = 1;
        } else {
          this.DataJson.franquiciado = 0;
        }
        this.DataJson.nitAnt = this.DataJson.nit;
        this.DataJson.emailAnt = this.DataJson.email;
        this.descripcion = this.DataJson.direccion;
        this.loadDepartamento(this.DataJson.id_pais);
        this.loadMunicipio(this.DataJson.id_departamento);
      }
    );
  }

  LoadMarcasClienteActivas(idCliente) {
    this.modificarclientesService.getMarcasCliente(idCliente, true).subscribe(
      data => {
        console.log(data);
        this.DataArrayMarcasActivas = data;
        for (const key of this.DataArrayMarcasActivas) {
          this.ListaMarcas.push({
            id: key.id,
            index: this.registrosMarcas.length + 1,
            nombre: key.nombre_marca,
            estado: true
          });
          this.registrosMarcas.push('marcaNueva1');
        }
      }
    );
  }


  LoadMarcasClienteInactivas(idCliente) {
    this.modificarclientesService.getMarcasCliente(idCliente, false).subscribe(
      data => {
        console.log(data);
        this.DataArrayMarcasInactivas = data;
        for (const key of this.DataArrayMarcasInactivas) {

          this.ListaMarcasInactivas.push({
            id: key.id,
            index: this.registrosMarcasInactivas.length + 1,
            nombre: key.nombre_marca,
            estado: false
          });
          this.registrosMarcasInactivas.push('marcaNueva1');
        }
      }
    );
  }

  LoadContactosClienteData(idCliente) {
    this.modificarclientesService.getContactosCliente(idCliente).subscribe(
      data => {
        this.ListaContactos = data;
      }
    );
  }


  loadPaises() {
    this.modificarclientesService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  loadDepartamento(idPais) {
    if (idPais !== '' && idPais !== null && idPais !== undefined) {
      this.modificarclientesService.getDepartamentos(idPais).subscribe(
        data => {
          this.DataArrayDepartamentos = data;
        }
      );
    }
  }

  loadMunicipio(idDepartamento) {
    if (idDepartamento !== '' && idDepartamento !== null && idDepartamento !== undefined) {
      this.modificarclientesService.getMunicipios(idDepartamento).subscribe(
        data => {
          this.DataArrayMunicipios = data;
        }
      );
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

    this.DataJson.nit = integer;
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
      this.DataJson.digito_checkeo = (11 - Residuo);
    } else {
      this.DataJson.digito_checkeo = Residuo;
    }
    if (this.DataJson.digito_checkeo === 0) {
      this.DataJson.digito_checkeo = '0';
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
      this.DataJson.direccion = via + ' ' + numero + ' ' + this.variable + ' ' + letra + ' ' + cuadrante + ' #' +
        numero2 + letra2 + '-' + placa + ' ' + cuadrante2 + ' ' + senas;
    } else if (parseInt(this.direccion2, 0) === 2) {
      this.DataJson.direccion = descripcion;
    }
  }


  validarFranquiciador(franquiciador) {
    if (franquiciador == 1) {
      this.DataJson.franquiciado = 0;
    }
  }

  validarFranquiciado(franquiciado) {
    if (franquiciado == 1) {
      this.DataJson.franquiciador = 0;
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

    const cliente = {
      contacto: []
    };
    cliente.contacto.push(
      {
        'id_cliente': this.id,
        'nombre': datosContacto.nombre_contacto,
        'cargo': datosContacto.cargo_contacto,
        'telefono': datosContacto.telefono_contacto,
        'email': datosContacto.correo_contacto
      });

    this.modificarclientesService.postContactoCliente(cliente.contacto).subscribe(res => {
      if (res.text() === 'No se pudo crear los Contactos') {
        Swal.fire({
          title: 'Contactos',
          text: 'No se pudo crear los Contactos',
          type: 'error',
        });
      } else if (res.text() === 'exitoso') {
        console.log('exitoso');
        this.LoadContactosClienteData(this.id);
      } else {
        console.log(res.text());
      }
    });
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
        'id': datosContacto.idcontacto,
        'nombre': datosContacto.nombre_contacto,
        'cargo': datosContacto.cargo_contacto,
        'telefono': datosContacto.telefono_contacto,
        'email': datosContacto.correo_contacto
      }
    );
    const cliente = {
      contacto: []
    };
    cliente.contacto.push(
      {
        'id': datosContacto.idcontacto,
        'id_cliente': this.id,
        'nombre': datosContacto.nombre_contacto,
        'cargo': datosContacto.cargo_contacto,
        'telefono': datosContacto.telefono_contacto,
        'email': datosContacto.correo_contacto
      });

    this.modificarclientesService.putContactoCliente(cliente.contacto).subscribe(res => {
      if (res.text() === 'No se pudo modificados los Contactos') {
        Swal.fire({
          title: 'Contactos',
          text: 'No se pudo modificar el Contacto',
          type: 'error',
        });
      } else if (res.text() === 'exitoso') {
        console.log('exitoso');
      } else {
        console.log(res.text());
      }
    });

    this.LimpiarContacto();
    this.btn_agregar = true;
    this.btn_actualizar = false;
  }

  LimpiarContacto() {
    this.DataNewContacto = [];
  }

  EliminarContacto(index, id) {
    this.ListaContactos.splice(index, 1);
    this.modificarclientesService.deleteContactoCliente(id).subscribe(res => {
    });
  }

  ValidaNit(datoscliente) {
    if (datoscliente.nitAnt != datoscliente.nit) {

      this.modificarclientesService.ValidarNit(datoscliente.nit).subscribe(
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
    } else {
      this.ValidaCorreo(datoscliente);
    }
  }

  ValidaCorreo(datoscliente) {
    if (datoscliente.emailAnt != datoscliente.email) {
      this.modificarclientesService.ValidarEmail(datoscliente.email).subscribe(
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
    } else {
      this.onSubmit(datoscliente);
    }
  }


  onSubmit(cliente) {
    if (cliente.cel_dueno === '' || cliente.cel_dueno === undefined || cliente.cel_dueno === null) {
      cliente.celular = 'N/A';
    }
    if (cliente.extension === '' || cliente.extension === undefined || cliente.extension === null) {
      cliente.extension = 0;
    }
    if (cliente.email_dueno === '' || cliente.email_dueno === undefined || cliente.email_dueno === null) {
      cliente.email_dueno = 'N/A';
    }
    if (cliente.cel_dueno === '' || cliente.cel_dueno === undefined || cliente.cel_dueno === null) {
      cliente.cel_dueno = 'N/A';
    }

    if (cliente.token_empresa === '' || cliente.token_empresa === undefined || cliente.token_empresa === null) {
      cliente.token_empresa = 'N/A';
    }

    if (cliente.token_password === '' || cliente.token_password === undefined || cliente.token_password === null) {
      cliente.token_password = 'N/A';
    }
    const fecha = new Date();

    const data = {
      'id': cliente.id,
      'cargoContacto': cliente.cargo_contacto,
      'celDueno': cliente.cel_dueno,
      'celular': cliente.celular,
      'celularContacto': cliente.celular_contacto,
      'contacto': cliente.contacto,
      'creadoPor': cliente.creado_por,
      'digitoCheckeo': cliente.digito_checkeo,
      'direccion': cliente.direccion,
      'documentoRepresentante': cliente.documento_representante,
      'email': cliente.email,
      'emailContacto': cliente.email_contacto,
      'emailDueno': cliente.email_dueno,
      'empaqueDifCanal': cliente.empaque_dif_canal,
      'empaqueDifPunto': cliente.empaque_dif_punto,
      'estado': cliente.estado,
      'extension': cliente.extension,
      'extension2': cliente.extension2,
      'fechaCrecion': cliente.fecha_crecion,
      'fechaModificacion': cliente.fecha_modificacion,
      'modificadoPor': cliente.modificado_por,
      'nit': cliente.nit,
      'nombre': cliente.nombre,
      'nombreDueno': cliente.nombre_dueno,
      'nombreRepresentante': cliente.nombre_representante,
      'recetaDifCanal': cliente.receta_dif_canal,
      'recetaDifPunto': cliente.receta_dif_punto,
      'impuestoDifCanal': cliente.impuesto_dif_canal,
      'telefono': cliente.telefono,
      'telefono2': cliente.telefono2,
      'unicoImpuestoCanal': cliente.unico_impuesto_canal,
      'tokenEmpresa': cliente.token_empresa,
      'tokenPassword': cliente.token_password,
      'estadoInst': cliente.estado_inst,
      'municipio': {
        'id': cliente.id_municipio
      },
      'regimen': {
        'id': '1'
      },
      'franquiciado': cliente.franquiciado,
      'franquiciador': cliente.franquiciador,
      'manejaCodplu': cliente.manejaCodplu
    };

    this.modificarclientesService.updateCliente(data).subscribe(
      resul => {
        const res = resul.text();
        if (res === 'No se pudo modificar el cliente') {
          Swal.fire({
            title: 'Cliente',
            text: 'No se ha podido crear el cliente',
            type: 'error'
          });
        } else {
          // this.createCanalImpuesto(res); // crea en tabla canalimpuesto
          this.createMarcas(res);
          this.router.navigate(['/configuraciones/clientes']);
          Swal.fire({
            title: 'Cliente',
            text: 'Fue modificado el cliente ' + cliente.nombre + ' con exito',
            type: 'success',
          });
        }
      }
    );
  }

  createMarcas(IdCliente) {
    console.log(IdCliente);

    if (this.ListaMarcas.length !== 0) {
      for (const key of this.ListaMarcas) {
        const data = {
          id: key.id,
          nombre: key.nombre,
          estado: key.estado
        };
        if (key.id === null) {

          this.modificarclientesService.postMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        } else {
          this.modificarclientesService.putMarca(data, IdCliente).subscribe(data => {
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

          this.modificarclientesService.postMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        } else {
          this.modificarclientesService.putMarca(data, IdCliente).subscribe(data => {
            console.log(data.text());
          }
          );
        }
      }
    }
  }

  LimpiarFormMarcas() {
    this.marcasForm.reset();
  }

}
