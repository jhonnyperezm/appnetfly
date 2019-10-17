import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import { ModificararticulosService } from './modificararticulos.service';
import Swal from 'sweetalert2';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { DomSanitizer } from '@angular/platform-browser';

declare const $;

@Component({
  selector: 'app-modificararticulos',
  templateUrl: './modificararticulos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificararticulosService, RutasService]
})
export class ModificararticulosComponent implements OnInit {
  tp:number=1;
  idArticulo: any;
  idArticuloInv: any;
  nombreArticulo: any;
  origen: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  abreviaturaUniAlt:any;
  tmm:number =1;
  uc:number=1;
  tsa:number=1;
  tac :number=1;
  tup:number=1;
  tgs :number=1;
  tra :number=1;
  tcr :number=1;
  ti :number=1;
  te :number=1;
  tua :number=1;
  mtup :number=1;
  ag :number=1;
  mp :number=1;
  mpm :number=1;
  msa :number=1;
  mgs :number=1;
  mcr :number=1;
  mai :number=1;
  meai :number=1;
  mae:number=1;
  eg:number=1;
  modalArt:number=1;
  DataArrayUnidadPresentacion:any;


  DataArrayArticulo: any = [];
  DataNewArticulo: any = [];

  seccionPrincipal = false;
  seccionInventario = false;
  seccionVentas = false;
  seccionReceta = false;
  seccionEmpaques = false;
  seccionCrearReceta = false;
  seccionModificarReceta = false;
  seccionManejaFraccion = false;

  DataArrayArticuloInventario: any = [];
  DataJsonArticuloInventario: any = [];

  DataArrayArticuloGrupoInv: any = [];
  DataJsonArticuloGrupoInv: any = [];

  DataArrayArticuloGrupoVen: any = [];
  DataJsonArticuloGrupoVen: any = [];

  DataArrayArticuloInvUnidadCompra: any = [];
  DataJsonArticuloInvUnidadCompra: any = [];

  DataArrayPuntoArticuloMaxMin: any = [];
  ListaMaximosMinimos: any = [];
  TodoMaxPuntos: boolean;
  ListaPuntosMaxMin: any = [];
  searchStringMaxMin: any; // Tabla Maximos Minimos
  itempageMaxMin = 5; //  Tabla Maximos Minimos
  searchStringPuntosMax: any; // Modal maximos minimos tabla puntos
  itempagePuntosMax = 5; //  Modal maximos minimos tabla puntos
  mensajeMinimo: any;
  mensajeMaximo: any;
  mensajeMin: boolean;
  mensajeMax: boolean;
  DatosEditMaxMin: any = [];

  DataArrayPuntosArticulo: any = [];
  ListaPuntos: any = [];
  searchStringPuntosArt: any;
  itempagePuntosArt = 5;

  itempagePuntos = 5;
  searchStringPuntos: any;
  DataArrayPuntos: any = [];
  DataJsonPuntos: any = [];
  TodoPuntos: boolean;
  ListaPuntosSel: any = [];

  DataArrayClases: any = [];
  DataNewClase: any = [];

  DataArrayGrupos: any = [];
  DataNewGrupo: any = [];

  paraVenta: any;
  paraInv: any;

  DataArrayUnidadKardex: any = [];

  DataArrayUnidadAlterna: any = [];
  clickUniAlterna: boolean;
  DataNewUnidadAlterna: any = [];
  nombreUnidadAlterna: any;

  DataArrayUnidadCompra: any = [];
  ListaUnidadesCompra: any = [];
  tablaUnidadesCompra: boolean;
  searchStringUniCompra: any; // Tabla UnidadesCompra
  itempageUniCompra = 5; //  Tabla Unidades compra
  clickUniCompra: boolean;
  DataNewUnidadCompra: any = [];
  DataArrayTablaUnidades: any = [];
  DatosEditUnidad: any = [];
  faltaConversionCompra = false;

  DataArrayArticuloInvBodega: any = [];
  ListaSitios: any = [];
  ListaSitiosSel: any = [];
  tablaSitiosAlmacenaje = false;
  ListaSitiosAlmacenaje: any = [];
  DataArraySitios: any = [];
  TodoSitios: boolean;
  searchStringSitiosAlm: any; // Tabla Sitios de Almacenaje seleccionados
  itempageSitiosAlm = 5; // Tabla Sitios de Almacenaje seleccionados
  searchStringPuntosSitios: any; // Modal Sitios de Almacenaje
  itempagePuntosSitios = 5; // Modal Sitios de Almacenaje

  DataArrayTablaConversion: any = [];
  clickTablaUnidades: boolean;
  DataNewConversion: any = [];
  searchStringTablaPers: any; // Tabla Unidades Personalizada
  itempageTablaPers = 5; // Tabla Unidades Personalizada
  DataArrayEquivalencia: any = [];
  UnicaBodInt = true;

  DataArrayImpCan: any = [];
  DataCanalesImp: any = [];
  itempageModalCanalImp = 5;
  searchStringModalCanalImp: any;

  DataArrayClasesVenta: any = [];
  DataArrayGruposVenta: any = [];
  id_cliente: any;
  TodoCanalesImp: boolean;
  ListaCanalesImpSel: any = [];

  searchStringCanalImp: any;
  itempageCanalImp = 5;
  ListaArticuloCanal: any = [];

  DataUnidad: any = [];
  DataArrayListaPrecios: any = [];
  DataNewListaPrecios: any = [];
  crearclickListaPrecios = false;
  DataArrayUnidadVenta: any = [];

  idTablaConPru: any;
  ListaUnidadesPrincipales: any = [];

  searchStringUniprincipal: any;
  itempageUniprincipal = 5;
  registrosUnidadVenta: any = [];
  DatosEditUnidadPrincipal: any = [];

  DataUnidadAlterna: any = [];
  DataArrayUnidadAlternaVenta: any = [];
  clickUniAlternaVenta = false;

  DataArrayGruposSeleccion: any = [];
  DataJsonGruposSeleccion: any = [];
  ListaGruposSelVenta: any = [];
  searchStringTGrupoSel: any;
  itempageTGrupoSel = 5;
  searchStringGSeleccion: any;
  itempageGSeleccion = 5;
  DataGupoSel: any = [];
  DataEditReceta: any = [];

  DataArrayClienteCanal: any = [];
  DataJsonClienteCanal: any = [];

  tablaCanalesReceta = false;
  searchStringTCanalReceta: any;
  itempageTCanalReceta = 5;
  ListaCanalesReceta: any = [];
  searchStringCanales: any;
  itempageCanales = 5;
  TodoRecCanal: boolean;
  ListaCanalRec: any = [];
  registrosUnidadAlterna: any = [];

  ListaUnidadesAlternaVenta: any = [];
  searchStringTUniAlterna: any;
  itempageTUniAlterna = 5;

  DatosEditUnidadAlterna: any = [];
  DataEditGrupo: any = [];
  registrosGruSel: any = [];

  DataArrayArtInventario: any = [];
  DataJsonArtInventario: any = [];

  DataIngredientes: any = [];
  searchStringArtInv: any;
  itempageArtInv = 5;

  ListaIngredientes: any = [];
  registrosIngredientes: any = [];
  dataEditIngrediente: any = [];
  searchStringEditArtInv: any;
  itempageEditArtInv = 5;

  searchStringTIngredientes: any;
  itempageTIngredientes = 5;

  DataArrayArtEmpaque: any = [];
  DataJsonArtEmpaque: any = [];

  dataEmpaque: any = [];
  ListaEmpaques: any = [];
  tablaEmpaques: boolean;
  searchStringTEmpaques: any;
  itempageTEmpaques = 5;
  registrosEmpaques: any = [];
  dataEditEmpaque: any = [];
  searchStringArtEmp: any;
  itempageArtEmp = 5;

  registrosPuntosArt: any = [];
  TipoSeleccion = true;
  TipoGrupoSeleccion = true;
  DataEquivalencia: any = [];

  cantidadGrupos: any;
  cant_superior: boolean;
  registrosCanalImpVenta: any = [];
  DataCanalImp: any = [];
  /*
    DataArrayEquivalenciaUnidad: any = [];
    DataJsonEquivalenciaUnidad: any = []; */

  DataArrayUndKardexIngredientes: any = [];
  DataJsonUndKardexIngredientes: any = [];
  crearCon: boolean;

  registrosPuntosRec: any = [];
  registrosCanalRec: any = [];
  clickCrearUniCompra: boolean;
  DataUnidadCompra: any = [];
  registrosUnidadCompra: any = [];
  registrosSitios: any = [];
  registrosMaxMin: any = [];

  // DataArrayArticuloCanalVenta: any = [];
  DataArrayArticuloListaPrecios: any = [];
  DataNewListPrecios: any = [];
  DataArrayArticuloUnidadAlternaVenta: any = [];
  DataArrayArticuloGrupoSelCant: any = [];
  DataArrayPuntosArticuloReceta: any = [];
  DataArrayCanalArticuloReceta: any = [];
  DataArrayIngrediArticuloReceta: any = [];
  DataArrayArticulosEmpaque: any = [];
  perteneceGru = false;
  SeUsaSeleccion = true;

  tablaRecetasActivas = true;
  datosInactivarReceta: any = [];
  DataArrayRecetaInactivas: any = [];
  DataJsonReceta: any = [];
  DataJsonRecetaInactivas: any = [];
  registrosrecetasinactivas: any = [];
  datosActivarReceta: any = [];
  registrosrecetasactivas: any = [];
  DataArrayReceta: any = [];
  DataNewReceta: any = [];
  DataArrayUnidadBase: any = [];
  DataArticulos: any = [];
  DataImportar: any = [];
  datosEliminarReceta: any = [];
  searchStringArt: any;
  itempageArt = 5;

  DataJsonGruposEmpaque: any = [];
  clickImportar = false;
  DataJsonArticulosGrupo: any = [];
  registrosArticulosGrupo: any = [];
  DataJsonArtGruSel: any = [];
  DataModificar: any = [];
  registrosEditArticulos: any = [];
  DataArrayArtGrupos: any = [];
  DataArticulosGrupo: any = [];

  DataNewGrupoEmp: any = [];
  searchStringArtGrupo: any;
  itempageArtGrupo = 5;
  searchStringEditGrupo: any;
  itempageEditGrupo = 5;
  searchStringRecAct: any;
  itempageRecAct = 5;

  ListaIngredientesAnterior: any = [];
  ListaCanalesAnterior: any = [];

  DataCliente: any = [];
  DataArrayImpuesto: any = [];
  regitrosImpuestos: any = [];
  DataCanales: any = [];
  DataImpuestoDif: any = [];
  regitrosJsonImpuestos: any = [];
  DataJsonImpuesto: any = [];
  DataTarifas: any = [];
  canalInstitucional = false;
  DataImpuestoVenta: any = [];
  registrosimpuestosventa: any = [];
  modulo: any;
  moduloArt: any;
  /*   existeIngrediente = false; */

  DataArrayArticuloUnidadPresentacion: any = [];
  ListaUnidadesPresentacion: any = [];
  registrosUnidadPresentacion: any = [];

  DataUndPresentacion: any = [];
  clickCrearUndPresentacion = false;
  DataNewUnidadPresentacion: any = [];
  DatosEditUnidadPresentacion: any = [];
  searchStringTUniPresenta: any;
  itempageTUniPresenta = 5;
  DataArticulosGrupEmp: any = [];

  DataNewGrupoClase: any = [];

  Minimo: any;
  Maximo: any;
  Grupo: any;
  Clase: any;

  //input file
  image: any;
  imagen: any;
  imag: any;
  file: any;
  DataArrayImagen: any = [];
  imgPreview: any;
  imageUrl: string;
  imageUrlDefult: string = "assets/images/default-image.png";
  loaderImagen = true;
  fileToUpload: File = null;
  noImage = false;
  imagenPreview: string = "assets/images/default-image.png";
  ConsultaConversion = true;
  ConsultaConversionEdit = true;

  existeIngrediente = false;
  existeIngredienteEdit = false;
  origenReceta: any;
  moduloOrigen: any;
  unidpre:any;
  
  @ViewChild('artUnoForm',{static:true})
  private artUnoForm: NgForm;

  @ViewChild('artDosForm',{static:true})
  private artDosForm: NgForm;

  @ViewChild('MaxMinForm',{static:true})
  private MaxMinForm: NgForm;

  @ViewChild('MaxMinEditForm',{static:true})
  private MaxMinEditForm: NgForm;

  @ViewChild('UnidadForm',{static:true})
  private UnidadForm: NgForm;

  @ViewChild('SitiosForm',{static:true})
  private SitiosForm: NgForm;

  @ViewChild('ClasesForm',{static:true})
  private ClasesForm: NgForm;

  @ViewChild('GrupoForm',{static:true})
  private GrupoForm: NgForm;

  @ViewChild('uniVenForm',{static:true})
  private uniVenForm: NgForm;

  @ViewChild('uniVenEditForm',{static:true})
  private uniVenEditForm: NgForm;

  @ViewChild('GrupoSelForm',{static:true})
  private GrupoSelForm: NgForm;

  @ViewChild('GrupoSelEditForm',{static:true})
  private GrupoSelEditForm: NgForm;

  @ViewChild('UnidAltVentaForm',{static:true})
  private UnidAltVentaForm: NgForm;

  @ViewChild('UnidAltVentaEditForm',{static:true})
  private UnidAltVentaEditForm: NgForm;

  @ViewChild('EquivalenciaForm',{static:true})
  private EquivalenciaForm: NgForm;

  @ViewChild('recetaForm',{static:true})
  private recetaForm: NgForm;

  @ViewChild('IngredientesForm',{static:true})
  private IngredientesForm: NgForm;

  @ViewChild('IngredientesEditForm',{static:true})
  private IngredientesEditForm: NgForm;

  @ViewChild('EmpaquesForm',{static:true})
  private EmpaquesForm: NgForm;

  @ViewChild('EmpaquesEditForm',{static:true})
  private EmpaquesEditForm: NgForm;

  @ViewChild('ventaForm',{static:true})
  private ventaForm: NgForm;

  @ViewChild('UnidadEditForm',{static:true})
  private UnidadEditForm: NgForm;

  @ViewChild('gruposEmpaqueForm',{static:true})
  private gruposEmpaqueForm: NgForm;

  @ViewChild('difCanalForm',{static:true})
  private difCanalForm: NgForm;

  @ViewChild('UnidPresentacionForm',{static:true})
  private UnidPresentacionForm: NgForm;

  @ViewChild('UnidPresentacionEditForm',{static:true})
  private UnidPresentacionEditForm: NgForm;


  constructor(public router: Router,
    public toastr: ToastrService,
    public modificarartoculosService: ModificararticulosService,
    public rutasService: RutasService,
    public Sanatizer: DomSanitizer,
    private route: ActivatedRoute) {
    this.idArticulo = this.route.snapshot.params.idArticulo;
    this.nombreArticulo = this.route.snapshot.params.nombreArticulo;
    this.moduloArt = this.route.snapshot.params.modulo;
    this.origen = this.route.snapshot.params.origen; // 1 articulos, 2 proceos especiales
    this.loader = true;
    this.paraVenta = false;
    this.paraInv = false;
    this.clickUniAlterna = false;
    this.mensajeMin = false;
    this.mensajeMax = false;
    this.id_cliente = localStorage.getItem('cli');
    this.DataNewArticulo.unidadAlterna = '';
    this.registrosPuntosArt = [];
    this.origenReceta = 0;
    /* this.seccionPrincipal = true;
    this.seccionInventario = false;
    this.seccionVentas = false;
    this.seccionReceta = false;
    this.seccionEmpaques = false;
    this.seccionCrearReceta = false;
    this.seccionModificarReceta = false;
    this.seccionManejaFraccion = false; */
    // console.log(this.moduloArt);

    // MODULOART LLEGA DESDE PARAMETROS PARA LA VALIDACION DE DATOS DE PROCESOS ESPECIALES
    console.log(this.moduloArt);

    if (this.moduloArt == 1) {// Datos Basicos
      this.ClickPrincipal();
    } else if (this.moduloArt == 2) {// Inventario
      this.ClickInventario();
    } else if (this.moduloArt == 3) {// Ventas
      this.ClickVentas();
    } else if (this.moduloArt == 4) {// Receta
      this.ClickReceta();
    }
  }

  ngOnInit() {
    this.LoadUnidadVenta();
    this.LoadDataCliente();
    this.LoadPuntosCliente();
    this.LoadClases();
    this.LoadUnidadKardex();
    this.LoadUnidadAlterna();
    this.LoadUnidadCompra();
    this.LoadUltimoCodigoPlu();
    this.LoadClasesVenta();
    // this.LoadCanalesImpVenta();
    this.LoadUnidadesAlternas();
    this.LoadListaPrecios();
    this.LoadGruposSeleccion();
    this.LoadArticulosInventario();
    this.LoadArticulosEmpaque();
    this.LoadDatosArticulo(this.idArticulo);
    this.LoadPuntosArticulo(this.idArticulo);

  }

  Regresar() {
    this.router.navigate(['/configuraciones2/articulos']);
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  kPLetrasNum(event: any) {
    const pattern = /^[a-zA-Z&0-9 ]*$/;
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

  /* ********************************************************************************* */
  /* ******************************** METODOS BOTONES ******************************** */
  /* ********************************************************************************* */

  ClickPrincipal() {
    console.log(this.origenReceta);
    if (this.origenReceta !== 0) {
      $('#SalirReceta').modal();
      this.moduloOrigen = 0;
    } else {
      this.seccionPrincipal = true;
      this.seccionInventario = false;
      this.seccionVentas = false;
      this.seccionReceta = false;
      this.seccionEmpaques = false;
      this.seccionCrearReceta = false;
      this.seccionModificarReceta = false;
      this.seccionManejaFraccion = false;
    }
  }

  ClickInventario() {
    if (this.origenReceta !== 0) {
      $('#SalirReceta').modal();
      this.moduloOrigen = 1;
    } else {
      this.seccionPrincipal = false;
      this.seccionInventario = true;
      this.seccionVentas = false;
      this.seccionReceta = false;
      this.seccionEmpaques = false;
      this.seccionCrearReceta = false;
      this.seccionModificarReceta = false;
      this.seccionManejaFraccion = false;
    }
  }

  ClickVentas() {
    if (this.origenReceta !== 0) {
      $('#SalirReceta').modal();
      this.moduloOrigen = 2;
    } else {
      this.seccionPrincipal = false;
      this.seccionInventario = false;
      this.seccionVentas = true;
      this.seccionReceta = false;
      this.seccionEmpaques = false;
      this.seccionCrearReceta = false;
      this.seccionModificarReceta = false;
      this.seccionManejaFraccion = false;
    }
  }

  ClickReceta() {
    if (this.origenReceta !== 0) {
      $('#SalirReceta').modal();
      this.moduloOrigen = 3;
    } else {
      this.seccionPrincipal = false;
      this.seccionInventario = false;
      this.seccionVentas = false;
      this.seccionReceta = true;
      this.seccionEmpaques = false;
      this.seccionCrearReceta = false;
      this.seccionModificarReceta = false;
      this.seccionManejaFraccion = false;
    }
  }

  ClickEmpaque() {
    if (this.origenReceta !== 0) {
      $('#SalirReceta').modal();
      this.moduloOrigen = 4;
    } else {
      this.seccionPrincipal = false;
      this.seccionInventario = false;
      this.seccionVentas = false;
      this.seccionReceta = false;
      this.seccionEmpaques = true;
      this.seccionCrearReceta = false;
      this.seccionModificarReceta = false;
      this.seccionManejaFraccion = false;
    }
  }

  ClickCrearReceta() {
    this.seccionPrincipal = false;
    this.seccionInventario = false;
    this.seccionVentas = false;
    this.seccionReceta = false;
    this.seccionEmpaques = false;
    this.seccionCrearReceta = true;
    this.seccionModificarReceta = false;
    this.seccionManejaFraccion = false;
    this.origenReceta = 1;
  }

  ClickModificarReceta() {
    this.seccionPrincipal = false;
    this.seccionInventario = false;
    this.seccionVentas = false;
    this.seccionReceta = false;
    this.seccionEmpaques = false;
    this.seccionCrearReceta = false;
    this.seccionModificarReceta = true;
    this.seccionManejaFraccion = false;
    this.origenReceta = 2;
  }
  ClickManejaFraccion() {
    if (this.origenReceta !== 0) {
      $('#SalirReceta').modal();
      this.moduloOrigen = 5;
    } else {
      this.seccionPrincipal = false;
      this.seccionInventario = false;
      this.seccionVentas = false;
      this.seccionReceta = false;
      this.seccionEmpaques = false;
      this.seccionCrearReceta = false;
      this.seccionModificarReceta = false;
      this.seccionManejaFraccion = true;
    }
  }

  SalirReceta(moduloOrigen) {
    console.log('salir receta');
    console.log(moduloOrigen);
    this.origenReceta = 0;
    if (moduloOrigen == 0) {
      this.ClickPrincipal();
    } else if (moduloOrigen == 1) {
      this.ClickInventario();
    } else if (moduloOrigen == 2) {
      this.ClickVentas();
    } else if (moduloOrigen == 3) {
      this.ClickReceta();
    } else if (moduloOrigen == 4) {
      this.ClickEmpaque();
    } else if (moduloOrigen == 5) {
      this.ClickManejaFraccion();
    }
  }

  /* ********************************************************************************* */
  /* ***************************** METODOS DATOS BASICOS ***************************** */
  /* ********************************************************************************* */

  habilitarCheckVenta(checkUtiEmpaque) {
    if (checkUtiEmpaque === true) {
      this.DataNewArticulo.venta = true;
      this.LoadUnidadVenta();
    }
  }

  habilitarCheckInventario(checkEsEmpaque) {
    if (checkEsEmpaque === true) {
      this.DataNewArticulo.inventario = true;
      this.DataNewArticulo.seleccion = false;
      this.DataNewArticulo.Receta = false;
      this.DataNewArticulo.utilizaEmpaque = false;
    }
  }

  LoadDataCliente() {
    this.modificarartoculosService.getDatosCliente().subscribe(
      data => {
        // console.log(data[0]);
        this.DataCliente = data[0];
        this.DataNewArticulo.receta_dif_punto = data[0].receta_dif_punto;
        this.DataNewArticulo.receta_dif_canal = data[0].receta_dif_canal;
        this.DataNewArticulo.empaque_dif_punto = data[0].empaque_dif_punto;
        this.DataNewArticulo.maneja_codigoplu = data[0].manejaCodplu;
        this.LoadImpuestoCliente(this.DataCliente.id);
        this.LoadCanalCliente(this.DataCliente.id);
      }
    );
  }
  LoadImpuestoCliente(idCliente) {
    this.modificarartoculosService.getImpuestosPorCliente(idCliente).subscribe(
      data => {
        // console.log(data);
        for (const key of data) {
          /* const existe = this.DataArrayImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(key.id_impuesto, 0)
            && parseInt(x.id_regimen, 0) === parseInt(key.id_regimen, 0));
          if (existe.length === 0) { */
          this.DataArrayImpuesto.push(
            {
              'id': this.regitrosImpuestos.length,
              // 'id': key.id,
              // 'id_imp_reg': key.id_imp_reg,
              'id_impuesto': key.id_impuesto,
              'nombre_impuesto': key.nombre_impuesto,
              'id_regimen': key.id_regimen,
              'nombre_regimen': key.nombre_regimen,
              'id_pais': key.id_pais,
              'nombre_pais': key.nombre_pais,
              'id_tarifa': key.id_tarifa,
              'valor_tarifa': key.valor_tarifa,
              'impuesto_mas_usado': key.impuesto_mas_usado
            }
          );
          /* } */
          this.regitrosImpuestos.push('impuestos1');
          /*  this.DataTarifas.push({
             'id_tarifa': key.id_tarifa,
             'valor_tarifa': key.valor_tarifa
           }); */
          const existe = this.DataJsonImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(key.id_impuesto, 0)
            && parseInt(x.id_regimen, 0) === parseInt(key.id_regimen, 0));
          if (existe.length === 0) {
            this.DataJsonImpuesto.push(
              {
                'id': this.regitrosJsonImpuestos.length,
                // 'id': key.id,
                // 'id_imp_reg': key.id_imp_reg,
                'id_impuesto': key.id_impuesto,
                'nombre_impuesto': key.nombre_impuesto,
                'id_regimen': key.id_regimen,
                'nombre_regimen': key.nombre_regimen,
                'id_pais': key.id_pais,
                'nombre_pais': key.nombre_pais,
                'id_tarifa': key.id_tarifa,
                'valor_tarifa': key.valor_tarifa,
                'impuesto_mas_usado': key.impuesto_mas_usado
              }
            );
            /* } */
            this.regitrosJsonImpuestos.push('impuestos1');

          }
          this.DataTarifas.push({
            'id_tarifa': key.id_tarifa,
            'valor_tarifa': key.valor_tarifa
          });
        }
      });
  }

  LoadCanalCliente(idCliente) {
    this.modificarartoculosService.getCanalesPorCliente(idCliente).subscribe(
      data => {
        // console.log(data);
        for (const key of data) {
          this.DataCanales.push({
            'id': key.id_canal,
            'nombre': key.nombre_canal
          });
        }

        const existeInstitucional = this.DataCanales.filter(x => parseInt(x.id, 0) === 6);
        // console.log(existeInstitucional);
        if (existeInstitucional.length >= 1) {
          this.canalInstitucional = true;
        }
      }
    );
  }


  LoadDatosArticulo(idArticulo) {
    this.modificarartoculosService.getDatosArticulo(idArticulo).subscribe(
      data => {

        // console.log(data);
        this.DataArrayArticulo = data;
        this.DataNewArticulo.id_cliente = this.DataArrayArticulo[0].id_cliente;
        this.DataNewArticulo.nombre = this.DataArrayArticulo[0].nombre;
        this.DataNewArticulo.codBarras = this.DataArrayArticulo[0].cod_barras;
        this.DataNewArticulo.seleccion = this.DataArrayArticulo[0].seleccion;
        this.DataNewArticulo.empaque = this.DataArrayArticulo[0].empaque;
        this.DataNewArticulo.compra = this.DataArrayArticulo[0].compra;
        this.DataNewArticulo.venta = this.DataArrayArticulo[0].venta;
        this.DataNewArticulo.inventario = this.DataArrayArticulo[0].inventario;
        this.DataNewArticulo.receta = this.DataArrayArticulo[0].receta;
        this.DataNewArticulo.utilizaEmpaque = this.DataArrayArticulo[0].utiliza_empaque;
        this.DataNewArticulo.idUnidadVenta = this.DataArrayArticulo[0].id_unidad_venta;
        this.DataNewArticulo.id_unidad_kardex = this.DataArrayArticulo[0].id_unidad_kardex;
        this.DataNewArticulo.grupo = this.DataArrayArticulo[0].grupo;
        this.DataNewArticulo.grupoVenta = this.DataArrayArticulo[0].grupoVenta;
        this.DataNewArticulo.clase = this.DataArrayArticulo[0].clase;
        this.DataNewArticulo.claseVenta = this.DataArrayArticulo[0].claseVenta;
        this.DataNewArticulo.costoEstimado = this.DataArrayArticulo[0].costo_estimado;
        this.DataNewArticulo.MaxMin = this.DataArrayArticulo[0].MaxMin;
        this.DataNewArticulo.impdif = this.DataArrayArticulo[0].imp_dif_canal;
        this.DataNewArticulo.codigoplu = this.DataArrayArticulo[0].codPlu;
        this.DataNewArticulo.codPluAnterior = this.DataArrayArticulo[0].codPlu;
        this.DataNewArticulo.maneja_comision = this.DataArrayArticulo[0].maneja_comision;
        this.DataNewArticulo.maneja_und_presentacion = this.DataArrayArticulo[0].manejaUnidadesPresentacion;
        this.DataNewArticulo.es_unidad_presentacion = this.DataArrayArticulo[0].esUnidadPresentacion;
        this.DataNewArticulo.maneja_fraccion = this.DataArrayArticulo[0].manejaFraccion;
        this.DataNewArticulo.imagen = this.DataArrayArticulo[0].imagen;
        // console.log(this.DataNewArticulo.imagen);


        if (this.DataNewArticulo.impdif === true) {
          this.DataNewArticulo.impdif = 1;
          this.DataNewArticulo.id_impuesto = this.DataArrayArticulo[0].id_impuesto;
          this.DataNewArticulo.id_tarifa = this.DataArrayArticulo[0].id_tarifa;
        } else {
          this.DataNewArticulo.impdif = 0;
          this.DataNewArticulo.id_impuesto = undefined;
          this.DataNewArticulo.id_tarifa = undefined;
        }

        if (this.DataNewArticulo.MaxMin === undefined) {
          this.DataNewArticulo.MaxMin = false;
        }

        if (this.DataNewArticulo.id_unidad_kardex === 0) {
          this.DataNewArticulo.id_unidad_kardex = '';
        }

        if (this.DataNewArticulo.codBarras === 'N/A') {
          this.DataNewArticulo.codBarras = '';
        }

        if (this.DataNewArticulo.costoEstimado === 0) {
          this.DataNewArticulo.utilizaCosto = false;
        } else {
          this.DataNewArticulo.utilizaCosto = true;
        }
        if (this.DataNewArticulo.seleccion === true) {
          this.perteneceGrupo();
        }
        if (this.DataNewArticulo.inventario === true) {
          this.LoadDatosArticuloInventario(this.idArticulo);
        } else {
          this.DataNewArticulo.descarga_receta = false;
        }
        if (this.DataNewArticulo.compra === true && this.DataNewArticulo.inventario === false) {
          this.LoadDatosArticuloInventarioUnidad();
        }
        if (this.DataNewArticulo.compra === true && this.DataNewArticulo.inventario === true) {
          this.LoadDatosArticuloTablaConversion();
        }
        if (this.DataNewArticulo.receta === true) {
          this.LoadRecetasArticulo();
          this.LoadRecetasInactivasArticulo();
        }
        if (this.DataNewArticulo.utilizaEmpaque === true) {
          this.LoadDatosArticuloEmpaque();
        }
        if (this.DataNewArticulo.inventario === true || this.DataNewArticulo.compra === true) {
          this.LoadDatosArticuloGrupoInventario();
        }
        if (this.DataNewArticulo.venta === true) {
          this.LoadDatosArticuloGrupoVenta();
        }
        // console.log(this.DataNewArticulo.idUnidadVenta);
        // console.log(this.DataArrayUnidadVenta);
        if (this.DataNewArticulo.idUnidadVenta !== 0) {
          this.DataNewArticulo.nombreUnidadVenta = this.DataArrayUnidadVenta.filter(x =>
            parseInt(x.id, 0) === parseInt(this.DataNewArticulo.idUnidadVenta, 0))[0].nombre;

          if (this.DataNewArticulo.nombreUnidadVenta.toString().toLowerCase().trim() === 'unidad') {
            this.SeUsaSeleccion = true; // si puede marcar se usa en seleccion
          } else {
            this.SeUsaSeleccion = false; // la unidad es diferente a 'unidad' no puede seleccionar 'se usa en seleccion'
          }
        }

        // console.log('imagen');
        // console.log(this.DataNewArticulo.imagen);
        if (this.DataNewArticulo.imagen === undefined || this.DataNewArticulo.imagen === '' || this.DataNewArticulo.imagen === null) {
          // this.imageUrl= this.imageUrlDefult;
          this.noImage = true;
          this.loaderImagen = false;
        } else {
          this.imageUrl = 'data:image/png;base64,' + this.DataNewArticulo.imagen;
          this.noImage = false;
          this.loaderImagen = false;
        }
        this.imagenPreview = this.imageUrl;
        // console.log(this.imageUrl);
        this.LoadDatosImpuestosVentaArticulo();
        this.LoadDatosListaPreciosArticulos();
        this.LoadDatosUnidadesAlternasArticulos();
        this.LoadDatosUnidadesPresentacion();
        this.LoadDatosGrupoSeleccionCantArticulos();

      }
    );
  }

  bindingImage() {
    this.imagenPreview = this.imageUrl;
  }

  perteneceGrupo() {
    this.modificarartoculosService.getPerteneceGrupo(this.idArticulo).subscribe(
      data => {
        if (data.length === 0) {
          this.perteneceGru = false;
        } else {
          this.perteneceGru = true;
        }
      }
    );
  }


  LoadPuntosArticulo(idArticulo) {
    this.modificarartoculosService.getPuntosArticulo(idArticulo).subscribe(
      data => {
        this.loader = false;
        this.LoadTabla = true;
        this.DataArrayPuntosArticulo = data;
        // console.log(data);

        for (const key of this.DataArrayPuntosArticulo) {
          this.ListaPuntos.push(
            {
              'id': this.registrosPuntosArt.length + 1,
              'id_punto': key.id_punto,
              'nombre': key.nombre,
              'checked': false,
            }
          );
          this.registrosPuntosArt.push('puntoArt2');
          this.ListaPuntosSel.push(
            {
              'id': key.id_punto,
              'nombre': key.nombre,
              'checked': false
            });
        }
        // console.log(this.ListaPuntos);
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  LoadDatosArticuloInventario(idArticulo) {
    this.modificarartoculosService.getDatosArticuloInv(idArticulo).subscribe(
      data => {
        console.log(data);
        this.DataArrayArticuloInventario = data;
        this.DataJsonArticuloInventario = this.DataArrayArticuloInventario[0];

        if (this.DataArrayArticuloInventario.length === 0) {
          this.DataNewArticulo.MaxMin = false;
          this.DataNewArticulo.descarga_receta = true;

        } else {
          this.DataNewArticulo.MaxMin = this.DataJsonArticuloInventario.maneja_max_min;
          this.DataNewArticulo.descarga_receta = this.DataJsonArticuloInventario.descargaReceta;
          this.DataNewArticulo.unidadAlterna = 0;

        }

        this.idArticuloInv = this.DataJsonArticuloInventario.id;
        if (this.DataJsonArticuloInventario.id_unidad_alterna === 0) {
          this.DataNewArticulo.unidadAlterna = '';
        } else {
          this.DataNewArticulo.unidadAlterna = this.DataJsonArticuloInventario.id_unidad_alterna;
        }
        if (this.DataJsonArticuloInventario.id_unidad_kardex === 0) {
          this.DataJsonArticuloInventario.id_unidad_kardex = '';
        }

        this.LoadDatosPuntoArticulosMaxMin(this.idArticuloInv);
        // this.LoadDatosArticuloInventarioBodega(this.idArticulo); OJO! SE debe habilitar cuando se deshabilite opcion en sab
        this.bindingUnidadKardex(this.DataJsonArticuloInventario.id_unidad_kardex);
      }
    );
  }

  LoadDatosArticuloGrupoInventario() {
    let tipo = 0;
    if (this.DataNewArticulo.inventario === true && this.DataNewArticulo.compra === false) {
      tipo = 2;
    }
    if (this.DataNewArticulo.inventario === false && this.DataNewArticulo.compra === true) {
      tipo = 3;
    }
    if (this.DataNewArticulo.inventario === true && this.DataNewArticulo.compra === true) {
      tipo = 2;
    }

    if (tipo !== 0) {
      this.modificarartoculosService.getDatosArticuloGrupo(this.idArticulo, tipo).subscribe(
        data => {
          this.DataArrayArticuloGrupoInv = data;
          if (this.DataArrayArticuloGrupoInv.length >= 1) {
            this.DataJsonArticuloGrupoInv = this.DataArrayArticuloGrupoInv[0];
            this.DataNewArticulo.idarticuloGrupoInv = this.DataJsonArticuloGrupoInv.id;
            this.DataNewArticulo.clase = this.DataJsonArticuloGrupoInv.id_clase;
            this.DataNewArticulo.grupo = this.DataJsonArticuloGrupoInv.id_grupo_venta_inv;
            this.LoadGrupos(this.DataNewArticulo.clase);
          } else {
            this.DataJsonArticuloGrupoInv = this.DataArrayArticuloGrupoInv[0];
            this.DataNewArticulo.idarticuloGrupoInv = '';
            this.DataNewArticulo.clase = '';
            this.DataNewArticulo.grupo = '';
            this.LoadGrupos(this.DataNewArticulo.clase);
          }
        }
      );
    }
  }

  LoadDatosArticuloGrupoVenta() {
    this.modificarartoculosService.getDatosArticuloGrupo(this.idArticulo, 1).subscribe(
      data => {
        this.DataArrayArticuloGrupoVen = data;
        if (this.DataArrayArticuloGrupoVen.length >= 1) {
          this.DataJsonArticuloGrupoVen = this.DataArrayArticuloGrupoVen[0];

          this.DataNewArticulo.idarticuloGrupoVen = this.DataJsonArticuloGrupoVen.id;
          this.DataNewArticulo.claseVenta = this.DataJsonArticuloGrupoVen.id_clase;
          this.DataNewArticulo.grupoVenta = this.DataJsonArticuloGrupoVen.id_grupo_venta_inv;
          // console.log(this.DataNewArticulo.claseVenta);
          this.LoadGruposVenta(this.DataNewArticulo.claseVenta);
        }
      }
    );
  }

  LoadDatosPuntoArticulosMaxMin(idArticuloInv) {
    this.modificarartoculosService.getDatosPuntoArticuloMaxMin(idArticuloInv).subscribe(
      data => {
        this.DataArrayPuntoArticuloMaxMin = data;
        for (const key of this.DataArrayPuntoArticuloMaxMin) {
          this.ListaMaximosMinimos.push(
            {
              'id': key.id,
              'idMaxMin': key.id_maxmin,
              'maximo': key.maximo,
              'minimo': key.minimo,
              'idPunto': key.id_punto,
              'nombrePunto': key.nombre_punto
            }
          );
          this.ListaPuntosMaxMin.push(
            {
              'id': key.id_punto,
              'nombre': key.nombre_punto
            });
        }
      }
    );
  }

  LoadDatosArticuloTablaConversion() {
    this.modificarartoculosService.getDatosArticuloTablaConversion(this.idArticulo).subscribe(
      data => {
        this.DataArrayTablaConversion = data;
        for (const key of this.DataArrayTablaConversion) {
          this.ListaUnidadesCompra.push(
            {
              'id': this.registrosUnidadCompra.length + 1,
              'idArtInvConversion': key.id,
              'idtablaConversion': key.id_tabla_conversion,
              'nombreUniKardex': key.nombre_kardex,
              'cantidadKardex': key.cantidad_kardex,
              'idUniCompra': key.id_unidad_compra,
              'nombreUniCompra': key.nombre_compra,
              'cantidadCompra': key.cantidad_compra
            }
          );
          this.registrosUnidadCompra.push('registrosUnidadCompra5');
        }
      }
    );
  }

  LoadDatosArticuloInventarioUnidad() {
    this.modificarartoculosService.getDatosArticuloInventarioUnidad(this.idArticulo).subscribe(
      data => {
        this.DataArrayArticuloInvUnidadCompra = data;
        for (const key of this.DataArrayArticuloInvUnidadCompra) {
          this.ListaUnidadesCompra.push(
            {
              'id': this.registrosUnidadCompra.length + 1,
              'idUniCompra': key.id_unidad_compra,
              'nombreUniCompra': key.nombre_unidad
            }
          );
          this.registrosUnidadCompra.push('registrosUnidadCompra4');
          // this.MostrarTablaUnidadCompra();
        }
      }
    );
  }

  LoadDatosImpuestosVentaArticulo() {
    this.modificarartoculosService.getDatosArticuloImpuestosVenta(this.idArticulo).subscribe(
      data => {
        // console.log(data);
        // this.DataArrayArticuloCanalVenta = data;

        for (const key of data) {
          if (key.id_canal === 6) {
            this.DataNewArticulo.id_impuestoIns = key.id_impuesto;
            this.DataNewArticulo.id_tarifaIns = key.id_tarifa;
          } else {
            this.ListaArticuloCanal.push(
              {
                'id': this.registrosCanalImpVenta.length,
                'id_canal': key.id_canal,
                'nombre_canal': key.nombre_canal,
                'id_impuesto': key.id_impuesto,
                'nombre_impuesto': key.nombre_impuesto,
                'id_tarifa': key.id_tarifa,
                'valor_tarifa': key.valor_tarifa
              });
            this.registrosCanalImpVenta.push('registrosimpuestosventa1');
          }
        }
      }
    );
  }

  /* LoadDatosCanalesVentaArticulo() {
    this.modificarartoculosService.getDatosArticuloCanalVenta(this.idArticulo).subscribe(
      data => {
        this.DataArrayArticuloCanalVenta = data;
        for (const key of this.DataArrayArticuloCanalVenta) {
          this.ListaArticuloCanal.push(
            {
              'id': this.registrosCanalImpVenta.length + 1,
              'id_canal_imp': key.id_canal_impuesto,
              'nombre_canal': key.canal,
              'nombre_impuesto': key.impuesto,
              'nombre_regimen': key.regimen,
              'ValorUnicaTarCanal': key.valor_unica_tarifa,
            });
          this.registrosCanalImpVenta.push('canalimp2');

        }
      }
    );
  } */

  LoadDatosListaPreciosArticulos() {
    this.modificarartoculosService.getDatosArticuloListaPrecios(this.idArticulo).subscribe(
      data => {
        this.DataArrayArticuloListaPrecios = data;
        for (const key of this.DataArrayArticuloListaPrecios) {
          this.ListaUnidadesPrincipales.push(
            {
              'id': this.registrosUnidadVenta.length + 1,
              'idListaPrecios': key.id_lista_precios,
              'nombreListaPrecios': key.lista,
              'valorventa': key.valor_venta
            }
          );
          this.registrosUnidadVenta.push('UnidadVenta2');
        }
      }
    );
  }

  LoadDatosUnidadesAlternasArticulos() {
    let idUnidad;
    let nombreUnidad;
    if (this.DataNewArticulo.inventario && !this.DataNewArticulo.venta) {
      idUnidad = this.DataNewArticulo.id_unidad_kardex;
      nombreUnidad = this.DataNewArticulo.nombreUnidadKardex;
    }
    if (!this.DataNewArticulo.inventario && this.DataNewArticulo.venta) {
      idUnidad = this.DataNewArticulo.idUnidadVenta;
      nombreUnidad = this.DataNewArticulo.nombreUnidadVenta;
    }
    if (this.DataNewArticulo.inventario && this.DataNewArticulo.venta) {
      idUnidad = this.DataNewArticulo.idUnidadVenta;
      nombreUnidad = this.DataNewArticulo.nombreUnidadVenta;
    }

    this.modificarartoculosService.getDatosArticuloUndAlternas(this.idArticulo).subscribe(
      data => {
        this.DataArrayArticuloUnidadAlternaVenta = data;
        for (const key of this.DataArrayArticuloUnidadAlternaVenta) {
          this.ListaUnidadesAlternaVenta.push(
            {
              'id': this.registrosUnidadAlterna.length + 1,
              'idTablaConversion': key.equivalencia,
              'idListaPrecios': key.id_lista_precios,
              'nombreListaPrecios': key.lista,
              'valorVen': key.valor_venta,
              'idUnidadAlterna': key.id_unidad_alterna,
              'nombreUniAlterna': key.unidad_alterna,
              'cantAlterna': key.cantidad_kardex,
              'cantidadVenta': key.cantidad_compra,
              'idUnidad': idUnidad,
              'nombreUnidad': nombreUnidad,
              /* 'factor': key.factor */
            }
          );
          this.registrosUnidadAlterna.push('UnidadAlterna2');
        }
      }
    );
  }

  LoadDatosUnidadesPresentacion() {
    this.modificarartoculosService.getDatosArticuloUndPresentacion(this.idArticulo).subscribe(
      data => {
        // console.log(data);
        this.DataArrayArticuloUnidadPresentacion = data;
        for (const key of this.DataArrayArticuloUnidadPresentacion) {
          this.ListaUnidadesPresentacion.push(
            {
              'id': this.registrosUnidadPresentacion.length + 1,
              'id_tabla': key.id,
              'idtablaConversion': key.idTablaConversion,
              'idArticuloNuevo': key.idArticuloNuevo,
              'idUnidadPresentacion': key.id_unidad_presentacion,
              'nombreUniPresentacion': key.nombrePresentacion,
              'idUnidadKardex': key.id_unidad_kardex,
              'idListaPrecios': key.id_lista_precios,
              'nombreListaPrecios': key.nombreListaPrecio,
              'valorventa': key.valor_venta,
              'estado': key.estado
            }
          );
          this.registrosUnidadPresentacion.push('unidadespresentacion1');
        }
      }
    );
  }

  LoadDatosGrupoSeleccionCantArticulos() {
    this.modificarartoculosService.getDatosArticuloGrupoSeleccionCant(this.idArticulo).subscribe(
      data => {
        this.DataArrayArticuloGrupoSelCant = data;
        for (const key of this.DataArrayArticuloGrupoSelCant) {
          this.ListaGruposSelVenta.push(
            {
              'id': this.registrosGruSel.length + 1,
              'id_grupo': key.id_grupo_seleccion,
              'nombre': key.grupo,
              'cantidad': key.cantidad,
              'imprimir': key.iord,
              'ver': key.orimver
            }
          );
          this.registrosGruSel.push('registrosGruSel2');
        }
      }
    );
  }

  LoadDatosArticuloInventarioBodega(idArticuloInv) {
    this.modificarartoculosService.getDatosArticuloInventarioBodega(idArticuloInv).subscribe(
      data => {
        this.DataArrayArticuloInvBodega = data;
        this.ListaSitios = [];
        for (const key of this.DataArrayArticuloInvBodega) {
          this.ListaSitios.push(
            {
              'id': key.id,
              'id_punto': key.id_punto,
              'id_bodega': key.id_bodega,
              'nombre_punto': key.nombre_punto,
              'nombre_bodega': key.nombre_bodega,
              'bodega_interna': key.bodega_interna
            }
          );
        }
        // console.log(this.ListaSitios);
        if (this.ListaSitios.length === 0) {
          this.tablaSitiosAlmacenaje = false;
          // this.UnicaBodInt
        } else {
          const existeBodInt = this.ListaSitios.filter(x => x.bodega_interna === false);
          if (existeBodInt.length >= 1) {
            this.tablaSitiosAlmacenaje = true;
          } else {
            this.tablaSitiosAlmacenaje = false;
          }
        }
      }
    );
  }

  LoadDatosArticuloEmpaque() {
    this.modificarartoculosService.getDatosArticuloEmpaque(this.idArticulo).subscribe(
      data => {
        // console.log(data);
        for (const key of data) {
          this.ListaEmpaques.push({
            'id': key.id_grupo_empaque,
            'nombre': key.nombre_empaque
          });
        }
      }
    );
  }

  LoadClases() {
    this.modificarartoculosService.getClasesCliente().subscribe(
      data => {
        this.DataArrayClases = data;
      }
    );
  }

  LoadGrupos(idClase) {
    if (idClase === '' || idClase === null || idClase === undefined) {
    } else {
      this.modificarartoculosService.getGrupoPorClase(idClase).subscribe(
        data => {
          this.DataArrayGrupos = data;
        });
    }
  }

  LoadUnidadKardex() {
    this.modificarartoculosService.getUnidadKardex().subscribe(
      data => {
        this.DataArrayUnidadKardex = data;
      }
    );
  }

  LoadUnidadAlterna() {
    this.modificarartoculosService.getUnidadAlterna().subscribe(
      data => {
        this.DataArrayUnidadAlterna = data;
      }
    );
  }

  LoadPuntosCliente() {
    this.modificarartoculosService.getPuntosCliente().subscribe(
      data => {
        this.DataArrayPuntos = data;
        this.DataJsonPuntos = [];
        for (const key of this.DataArrayPuntos) {
          this.DataJsonPuntos.push({
            'id': key.id_punto,
            'nombre': key.nombre,
            'checked': false
          });
        }
        this.loader = false;
        this.LoadTabla = true;
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }



  handleFileInput(file: FileList) {

    this.fileToUpload = file.item(0);
    // console.log(this.fileToUpload);
    $('.custom-file-label').html(this.fileToUpload.name);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.imagenPreview = this.imageUrl;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.noImage = false;
    // console.log(this.imageUrl);

    /* $('input[type="file"]').change(function(e){
      let fileName = e.target.files[0].name; */
    /*  }); */

  }


  /* imgSelected(){
    $('input[type="file"]').change(function(e){
      let fileName = e.target.files[0].name;
      $('.custom-file-label').html(fileName);
    });
  }

  changeListener($event){
    console.log('entro');

    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    let file:File = inputValue.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
    console.log(this.image);
    if (this.image !== undefined || this.image !== '' ||this.image !== null ) {
      this.imagen = this.image;
    }

  }
 */

  onChangeTodosPuntos(data, isChecked: boolean) {
    if (isChecked === false) {
      this.onChangeAll(data, isChecked);
      this.ListaPuntos = [];
    } else {
      this.onChangeAll(data, isChecked);
    }
  }

  onChangeAll(data, isChecked: boolean) {
    this.TodoPuntos = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChange(data[i], isChecked);
    }
  }

  onChange(data, isChecked) {
    // console.log(data);
    // console.log(this.ListaPuntosSel);
    if (isChecked === true) {
      const existe = this.ListaPuntosSel.filter(x => parseInt(x.id, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.ListaPuntosSel.push(
          {
            'id': data.id,
            'nombre': data.nombre,
            'checked': false
          });
      }
    } else {
      for (let i = 0; i < this.ListaPuntosSel.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.ListaPuntosSel[i].id, 0) && isChecked === false) {
          index = this.ListaPuntosSel.indexOf(this.ListaPuntosSel[i]);
          this.ListaPuntosSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonPuntos.length; i++) {
      if (data.id === this.DataJsonPuntos[i].id) {
        this.DataJsonPuntos[i].checked = isChecked;
      }
    }
  }

  MostrarPuntosArticulo() {
    for (const key of this.ListaPuntosSel) {
      const existe = this.ListaPuntos.filter(x => parseInt(x.id_punto, 0) === parseInt(key.id, 0));
      if (existe.length === 0) {
        this.ListaPuntos.push(
          {
            'id': this.registrosPuntosArt.length + 1,
            'id_punto': key.id,
            'nombre': key.nombre,
            'checked': false,
            'checkedRec': false,
            'checkedEmp': false
          });
        this.registrosPuntosArt.push('puntoArt1');
      }
    }
  }

  QuitarPuntoArticulo(datos) {
    const validarBodega = this.ListaSitios.filter(x => parseInt(x.id_punto, 0) === parseInt(datos.id_punto, 0));
    if (validarBodega.length === 0) {
      for (let i = 0; i < this.ListaPuntos.length; i++) {
        let index;
        if (parseInt(datos.id, 0) === parseInt(this.ListaPuntos[i].id, 0)) {
          index = this.ListaPuntos.indexOf(this.ListaPuntos[i]);
          this.ListaPuntos.splice(index, 1);
        }
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se puede eliminar el punto, porque existe un sitio de almacenaje del punto asociado al articulo',
        type: 'error',
      });
    }
  }

  CrearClase(Clase, paraVenta, paraInv) {
    let tipo;
    if (paraVenta === true && paraInv === true) {
      tipo = 3; // Ambos
    } else if (paraVenta === true && paraInv === false) {
      tipo = 1; // Ventas
    } else if (paraVenta === false && paraInv === true) {
      tipo = 2; // Inventarios
    }

    this.DataNewClase = {
      nombre: Clase,
      tipo: tipo
    };
    this.modificarartoculosService.createClase(this.DataNewClase).subscribe(
      data => {
        if (data.text() === 'La clase ya existe para el cliente') {
          Swal.fire({
            title: 'Clase',
            text: 'La clase ya existe para el cliente',
            type: 'error',
          });
        } else if (data.text() === 'No se pudo crear la clase') {
          Swal.fire({
            title: 'Clase',
            text: 'La clase no se ha podido crear',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Clase',
            text: 'La clase fue creada con exito',
            type: 'success',
          });
          // this.CrearGrupo(data.text(), tipo, Grupo, 1);
          this.LoadClases();
          this.LoadClasesVenta();
        }
      }
    );
  }

  bindingClases(modulo) {
    this.modulo = modulo;
  }

  CrearGrupo(datosGrupo) {
    let tipoGrupo;
    if (datosGrupo.paraVenta === true && datosGrupo.paraInv === true) {
      tipoGrupo = 3; // Ambos
    } else if (datosGrupo.paraVenta === true && datosGrupo.paraInv === false) {
      tipoGrupo = 1; // Ventas

    } else if (datosGrupo.paraVenta === false && datosGrupo.paraInv === true) {
      tipoGrupo = 2; // Inventarios
    }
    this.DataNewGrupo = {
      clase: {
        id: datosGrupo.clase
      },
      nombre: datosGrupo.grupo,
      tipo: tipoGrupo
    };
    this.modificarartoculosService.createGrupo(this.DataNewGrupo).subscribe(
      data => {
        const res = data;
        if (res.text() === 'El Grupo ya existe para el cliente') {
          Swal.fire({
            title: 'Grupo',
            text: 'El Grupo ya existe para el cliente',
            type: 'error',
          });
        } else if (res.text() === 'No se pudo crear el grupo') {
          Swal.fire({
            title: 'Grupo',
            text: 'No se ha podido crear el grupo',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Grupo',
            text: 'El grupo fue creada con exito',
            type: 'success',
          });
          if (tipoGrupo === 1) {
            this.LoadGruposVenta(res.text());
          } else if (tipoGrupo === 2) {
            this.LoadGrupos(res.text());
          } else {
            this.LoadGrupos(res.text());
            this.LoadGruposVenta(res.text());
          }
          this.crearImpuestoVenta(datosGrupo.clase, data.text());
        }
        this.LimpiarFormClases();
      }
    );
  }

  crearImpuestoVenta(idClase, idGrupo) {

    /* const impuestos = {
      venta: []
    }; */
    let postImpuestos;
    // console.log(this.DataCanales);
    // console.log(this.DataArrayImpuesto);
    /* for (const can of this.DataCanales) { */
    if (this.DataArrayImpuesto.length === 1) {
      for (const imp of this.DataArrayImpuesto) {
        postImpuestos = {
          'clases': {
            'id': idClase
          },
          'impDifCanal': 1,
          'grupoVentaInv': {
            'id': idGrupo
          },
          'impuesto': {
            'id': imp.id_impuesto
          },
          'tarifa': {
            'id': imp.id_tarifa
          }
        };
      }
    } else {
      for (const imp of this.DataArrayImpuesto) {
        if (imp.impuesto_mas_usado === true) {
          postImpuestos = {
            'clases': {
              'id': idClase
            },
            'impDifCanal': 1,
            'grupoVentaInv': {
              'id': idGrupo
            },
            'impuesto': {
              'id': imp.id_impuesto
            },
            'tarifa': {
              'id': imp.id_tarifa
            }
          };
        }
      }
      /* } */
    }

    this.modificarartoculosService.postImpuestoVenta(postImpuestos).subscribe(
      resul => {
        // console.log(resul);
        /* if (resul.text() === 'success') {
          this.router.navigate(['/dashboard/impuestosventas']);
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo exitosamente',
            type: 'success',
          });
        } else {
          console.log(resul.text());
        } */
      });
  }

  bindingUnidadKardex(idUnidadKardex) {
    if (idUnidadKardex === '' || idUnidadKardex === null || idUnidadKardex === undefined) {
      this.DataNewArticulo.nombreUnidadKardex = '';
    } else {
      const nombreUnidad = this.DataArrayUnidadKardex.filter(x => x.id === parseInt(idUnidadKardex, 0))[0].nombre;
      this.DataNewArticulo.nombreUnidadKardex = nombreUnidad;
      this.DataNewArticulo.unidadBase = idUnidadKardex;
      this.DataNewArticulo.nombreUnidadBase = nombreUnidad;

      if (this.DataNewArticulo.venta === true) {
        if (this.DataNewArticulo.idUnidadVenta === '' || this.DataNewArticulo.idUnidadVenta === null
          || this.DataNewArticulo.idUnidadVenta === undefined) {
        } else {
          this.ConsultarTablaConversion(idUnidadKardex, this.DataNewArticulo.idUnidadVenta);
        }
      }
    }
  }

  clickCrearUnidadAlterna() {
    this.clickUniAlterna = !this.clickUniAlterna;
  }

  crearUnidadAlterna(newUnidad, abreviatura) {
    this.DataNewUnidadAlterna = {
      nombre: newUnidad,
      abreviatura: abreviatura,
      inventario: false,
      alternaInventario: true,
      venta: false,
      alternaVenta: false,
      compra: false
    };
    this.modificarartoculosService.createUnidadAlterna(this.DataNewUnidadAlterna).subscribe(
      data => {
        if (data.text() === 'No se pudo crear la unidad') {
          this.toastr.error('No se ha podido crear la unidad', 'Error');
        } else if (data.text() === 'La abreviatura ya existe para otra unidad') {
          this.toastr.error('La abreviatura ya existe para otra unidad', 'Error');
        } else if (data.text() === 'Error consultando la abreviatura') {
          this.toastr.error('Error consultando la abreviatura', 'Error');
        } else if (data.text() === 'La unidad ya existe') {
          this.toastr.error('La unidad ya existe, configure en unidades', 'Error');
        } else if (data.text() === 'Error consultando la unidad') {
          this.toastr.error('Error consultando la unidad', 'Error');
        } else {
          this.toastr.success('La unidad se creo correctamente', 'Exitoso');
        }
        this.LoadUnidadAlterna();
        this.clickUniAlterna = !this.clickUniAlterna;
        this.nombreUnidadAlterna = '';
      }
    );
  }

  validarMaximo(Max, Min) {
    if (Min === '' || Min === null || Min === undefined) {
      Min = 0;
    }
    if (parseInt(Max, 0) <= parseInt(Min, 0)) {
      this.mensajeMax = true;
      this.mensajeMaximo = 'El valor no debe ser menor al minimo';
    } else {
      this.mensajeMax = false;
    }
  }

  validarMinimo(Max, Min) {
    if (Max === '' || Max === null || Max === undefined) {
      Max = 0;
    }
    if (parseInt(Min, 0) >= parseInt(Max, 0)) {
      this.mensajeMin = true;
      this.mensajeMinimo = 'El valor no debe ser mayor al Maximo';
    } else {
      this.mensajeMin = false;
    }
  }

  onChangeAllMaximos(data, isChecked: boolean) {
    this.TodoMaxPuntos = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChangeMaximos(data[i], isChecked);
    }
  }

  onChangeMaximos(data, isChecked: boolean) {
    // console.log(data);
    if (isChecked === true) {
      this.ListaPuntosMaxMin.push(
        {
          'id': data.id_punto,
          'nombre': data.nombre
        });
    } else {
      for (let i = 0; i < this.ListaPuntosMaxMin.length; i++) {
        let index;
        if (data.id_punto === this.ListaPuntosMaxMin[i].id && isChecked === false) {
          index = this.ListaPuntosMaxMin.indexOf(this.ListaPuntosMaxMin[i]);
          this.ListaPuntosMaxMin.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.ListaPuntos.length; i++) {
      if (data.id_punto === this.ListaPuntos[i].id_punto) {
        this.ListaPuntos[i].checked = isChecked;
      }
    }
  }

  MostrarMaximosMinimos(Maximo, Minimo) {
    // console.log(this.ListaPuntosMaxMin);
    for (let i = 0; i < this.ListaPuntosMaxMin.length; i++) {
      const existenTbl = this.ListaMaximosMinimos.filter(x => parseInt(x.idPunto, 0) === parseInt(this.ListaPuntosMaxMin[i].id, 0));
      // console.log(this.ListaMaximosMinimos);
      // console.log(this.ListaPuntosMaxMin[i].id);

      if (existenTbl.length === 0) {
        const PostMaxMin = {
          'maximo': Maximo,
          'minimo': Minimo
        };
        let IdMaxMin;
        this.modificarartoculosService.createMaximoMinimo(PostMaxMin).subscribe(
          data => {
            // console.log(data);
            IdMaxMin = data;
            this.createArticuloPuntoMaxMin(IdMaxMin, Maximo, Minimo,
              this.ListaPuntosMaxMin[i].id, this.ListaPuntosMaxMin[i].nombre);
          }
        );
      }
    }
  }

  createArticuloPuntoMaxMin(IdMaxMin, Maximo, Minimo, idPunto, nomPunto) {
    this.ListaMaximosMinimos.push(
      {
        'id': this.registrosMaxMin.length + 1,
        'idMaxMin': IdMaxMin,
        'maximo': Maximo,
        'minimo': Minimo,
        'idPunto': idPunto,
        'nombrePunto': nomPunto
      }
    );
    this.registrosMaxMin.push('maxmin1');
  }

  BindingMaximoMinimo(datos) {
    this.LimpiarFormMaximosMinimos();
    this.DatosEditMaxMin = datos;
    this.DatosEditMaxMin.Max = datos.maximo;
    this.DatosEditMaxMin.Min = datos.minimo;
  }

  ModificarMaximoMinimo(datosMaxmin) {
    let IdMaxMin;
    const PostMaxMin = {
      'maximo': datosMaxmin.Max,
      'minimo': datosMaxmin.Min
    };
    this.modificarartoculosService.createMaximoMinimo(PostMaxMin).subscribe(
      data => {
        IdMaxMin = data;
        for (let i = 0; i < this.ListaMaximosMinimos.length; i++) {
          if (parseInt(datosMaxmin.id, 0) === parseInt(this.ListaMaximosMinimos[i].id, 0)) {
            this.ListaMaximosMinimos[i].idMaxMin = IdMaxMin;
            this.ListaMaximosMinimos[i].maximo = datosMaxmin.Max;
            this.ListaMaximosMinimos[i].minimo = datosMaxmin.Min;
          }
        }
      }
    );
  }

  QuitarMaximoMinimo(data) {
    for (let i = 0; i < this.ListaMaximosMinimos.length; i++) {
      let index;
      if (parseInt(data.id, 0) === parseInt(this.ListaMaximosMinimos[i].id, 0)) {
        index = this.ListaMaximosMinimos.indexOf(this.ListaMaximosMinimos[i]);
        this.ListaMaximosMinimos.splice(index, 1);
      }
    }
  }

  cargarUnidadKardex(unidadKardex) {
    // console.log(unidadKardex);
    const buscarNombre = this.DataArrayUnidadKardex.filter(x => parseInt(x.id, 0) === parseInt(unidadKardex, 0));
    if (buscarNombre.length === 1) {
      for (const key of buscarNombre) {
        this.DataNewConversion.nombreUniKardex = key.nombre;
        this.DataNewConversion.idUniKardex = unidadKardex;
      }
    }
  }

  LoadUnidadCompra() {
    this.modificarartoculosService.getUnidadCompra().subscribe(
      data => {
        this.DataArrayUnidadCompra = data;
      }
    );
  }

  LoadEquivalencia(idUnidadKardex, idUnidadComrpa) {
    // console.log(idUnidadKardex);
    this.DataArrayEquivalencia = [];
    if (idUnidadKardex === null || idUnidadKardex === '' || idUnidadKardex === undefined) {
      this.toastr.warning('Verificar', 'No ha seleccionado la unidad de kardex');
    } else {
      if (idUnidadComrpa === null || idUnidadComrpa === '' || idUnidadComrpa === undefined) {
      } else {
        this.DataNewConversion.nombreUnidadCompra = this.DataArrayUnidadCompra.filter(x => parseInt(x.id, 0) === parseInt(idUnidadComrpa, 0))[0].nombre;
        this.DatosEditUnidad.nombreUnidadCompra = this.DataArrayUnidadCompra.filter(x => parseInt(x.id, 0) === parseInt(idUnidadComrpa, 0))[0].nombre;
        this.modificarartoculosService.getEquivalenciaTablaConversion(idUnidadKardex, idUnidadComrpa).subscribe(
          data => {
            this.DataArrayEquivalencia = data;
            if (this.DataArrayEquivalencia.length === 0) {
              this.faltaConversionCompra = true;
            } else {
              this.faltaConversionCompra = false;
            }
          });
      }
    }
  }

  clickCrearUnidadCompra() {
    this.clickUniCompra = !this.clickUniCompra;
  }

  clickCrearUnidadCompraSencilla() {
    this.clickCrearUniCompra = !this.clickCrearUniCompra;
  }

  crearUnidadCompra(newUnidadCompra) {
    this.DataNewUnidadCompra = {
      nombre: newUnidadCompra.nombreUnidadCompra,
      abreviatura: newUnidadCompra.abreviatura,
      inventario: false,
      alternaInventario: false,
      venta: false,
      alternaVenta: false,
      compra: true
    };
    this.modificarartoculosService.createUnidadCompra(this.DataNewUnidadCompra).subscribe(
      data => {
        if (data.text() === 'No se pudo crear la unidad') {
          this.toastr.error('No se ha podido crear la unidad', 'Error');
        } else if (data.text() === 'La abreviatura ya existe para otra unidad') {
          this.toastr.error('La abreviatura ya existe para otra unidad', 'Error');
        } else if (data.text() === 'Error consultando la abreviatura') {
          this.toastr.error('Error consultando la abreviatura', 'Error');
        } else if (data.text() === 'La unidad ya existe') {
          this.toastr.error('La unidad ya existe, configure en unidades', 'Error');
        } else if (data.text() === 'Error consultando la unidad') {
          this.toastr.error('Error consultando la unidad', 'Error');
        } else {
          this.toastr.success('La unidad se creo correctamente', 'Exitoso');
        }
        this.LoadUnidadCompra();
        this.DataUnidadCompra = [];
      }
    );
  }

  LoadUnidadesPersonalizadas(unidadKardex) {
    this.clickTablaUnidades = !this.clickTablaUnidades;
    if (this.clickTablaUnidades === true) {
      this.modificarartoculosService.getUnidadesPersonalizadas(unidadKardex).subscribe(
        data => {
          this.DataArrayTablaUnidades = data;
        }
      );
    }
  }

  GuardarUnidadCompra(datos) {
    if (this.DataNewArticulo.compra === true && this.DataNewArticulo.inventario === false) {
      const nombre_uni_compra = this.DataArrayUnidadCompra.filter(x => parseInt(x.id, 0) === parseInt(datos.unidadCompra, 0))[0].nombre;
      this.ListaUnidadesCompra.push(
        {
          'id': this.registrosUnidadCompra.length + 1,
          'idUniCompra': datos.unidadCompra,
          'nombreUniCompra': nombre_uni_compra
        }
      );
      this.registrosUnidadCompra.push('registrosUnidadCompra3');
      // this.MostrarTablaUnidadCompra();

    } else {
      this.MostrarUnidadCompra(datos);
    }
  }

  MostrarUnidadCompra(datos) {
    // console.log(datos);
    // console.log(this.DataArrayEquivalencia.length);

    if (this.DataArrayEquivalencia.length === 0) {
      /* if (this.clickUniCompra === true) {
        this.DataNewUnidadCompra = {
          'nombre': datos.nombreUnidadCompra,
          'abreviatura': datos.abreviatura,
          'tipo': 3
        };
        this.modificarartoculosService.createUnidadCompra(this.DataNewUnidadCompra).subscribe(
          data => {
            if (data.text() === 'No se pudo crear la unidad') {

            } else if (data.text() === 'La unidad de medida ya existe') {

            } else {
              this.CrearTablaConversion(datos, data.text());
              this.MostrarTablaUnidadCompra();
            }
          }
        ); */

      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        'unidadByIdUnidadKardex': {
          'id': datos.idUniKardex
        },
        'cantidadKardex': datos.cantKardex,
        'unidadByIdUnidadCompra': {
          'id': datos.unidadCompra
        },
        /* 'operando': datos.factor, */
        'cantidadCompra': datos.cantidad
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        data => {
          this.ListaUnidadesCompra.push(
            {
              'id': this.registrosUnidadCompra.length + 1,
              'idtablaConversion': data.text(),
              'nombreUniKardex': datos.nombreUniKardex,
              'cantidadKardex': datos.cantKardex,
              'idUniCompra': datos.unidadCompra,
              'nombreUniCompra': datos.nombreUnidadCompra,
              'cantidadCompra': datos.cantidad
            }
          );
          this.registrosUnidadCompra.push('registrosUnidadCompra2');
          // this.MostrarTablaUnidadCompra();
        }
      );
    } else {
      let cantidad;
      let cantidadKardex;
      const valor = this.DataArrayEquivalencia.filter(x => parseInt(x.id_unidad_compra, 0) === parseInt(datos.unidadCompra, 0));

      for (const key of valor) {
        if (datos.nombreUniKardex.toLowerCase() === key.nombre_unidad_compra.toLowerCase()) {
          cantidad = '';
          cantidadKardex = '';
        } else {
          cantidad = key.cantidad_compra;
          cantidadKardex = key.cantidad_kardex;
        }
        this.ListaUnidadesCompra.push(
          {
            'id': this.registrosUnidadCompra.length + 1,
            'idtablaConversion': key.id,
            'nombreUniKardex': datos.nombreUniKardex,
            'cantidadKardex': cantidadKardex,
            'idUniCompra': datos.unidadCompra,
            'nombreUniCompra': key.nombre_unidad_compra,
            'cantidadCompra': cantidad
          }
        );
        this.registrosUnidadCompra.push('registrosUnidadCompra1');
      }
    }
  }
  /*
    CrearTablaConversion(datos, idUnidadCompra) {
      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        'unidadByIdUnidadKardex': {
          'id': datos.idUniKardex
        },
        'cantidadKardex': datos.cantKardex,
        'unidadByIdUnidadCompra': {
          'id': idUnidadCompra
        },
        'cantidadCompra': datos.cantidad
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        data => {
          this.ListaUnidadesCompra.push(
            {
              'id': this.registrosUnidadCompra.length + 1,
              'idtablaConversion': data.text(),
              'nombreUniKardex': datos.nombreUniKardex,
              'cantidadKardex': datos.cantKardex,
              'idUniCompra': idUnidadCompra,
              'nombreUniCompra': datos.nombreUnidadCompra,
              'cantidadCompra': datos.cantidad
            }
          );
          this.registrosUnidadCompra.push('registrosUnidadCompra2');
          this.MostrarTablaUnidadCompra();
        }
      );
    } */

  /* MostrarTablaUnidadCompra() {
    if (this.ListaUnidadesCompra.length === 0) {
      this.tablaUnidadesCompra = false;
    } else {
      this.tablaUnidadesCompra = true;
    }
  } */

  BindingUnidadCompra(datos, unidadKardex) {
    this.DatosEditUnidad = datos;
    this.DatosEditUnidad.nombreCompra = datos.nombreUniCompra;
    this.DatosEditUnidad.cantCompra = datos.cantidadCompra;
    this.DatosEditUnidad.unidadCompra = parseInt(datos.idUniCompra, 0);

    const buscarNombre = this.DataArrayUnidadKardex.filter(x => parseInt(x.id, 0) === parseInt(unidadKardex, 0));
    if (buscarNombre.length === 1) {
      for (const key of buscarNombre) {
        this.DatosEditUnidad.nombreUniKardex = key.nombre;
        this.DatosEditUnidad.idUniKardex = unidadKardex;
      }
    }
  }

  ModificarUniCompra(data) {
    const nombre_uni_compra = this.DataArrayUnidadCompra.filter(x => parseInt(x.id, 0) === parseInt(data.unidadCompra, 0))[0].nombre;
    for (let i = 0; i < this.ListaUnidadesCompra.length; i++) {
      if (parseInt(data.id, 0) === parseInt(this.ListaUnidadesCompra[i].id, 0)) {
        this.ListaUnidadesCompra[i].idUniCompra = data.unidadCompra;
        this.ListaUnidadesCompra[i].nombreUniCompra = nombre_uni_compra;
      }
    }
  }

  ModificarUnidadCompra(data) {
    // console.log(data);
    let nombreUnidaCompra;
    let cantidadUnidaCompra;
    let cantidadUnidaKardex;
    let idNuevaTblConversion;

    if (this.DataArrayEquivalencia.length === 0) {

      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        'unidadByIdUnidadKardex': {
          'id': data.idUniKardex
        },
        'cantidadKardex': data.cantKardex,
        'unidadByIdUnidadCompra': {
          'id': data.unidadCompra
        },
        'cantidadCompra': data.cantidad
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        resul => {
          for (let i = 0; i < this.ListaUnidadesCompra.length; i++) {
            if (parseInt(data.id, 0) === parseInt(this.ListaUnidadesCompra[i].id, 0)) {
              this.ListaUnidadesCompra[i].idtablaConversion = resul.text();
              this.ListaUnidadesCompra[i].nombreUniKardex = data.nombreUniKardex;
              this.ListaUnidadesCompra[i].cantidadKardex = data.cantKardex;
              this.ListaUnidadesCompra[i].idUniCompra = data.unidadCompra;
              this.ListaUnidadesCompra[i].nombreUniCompra = data.nombreUnidadCompra;
              this.ListaUnidadesCompra[i].cantidadCompra = data.cantidad;
            }
          }
        }
      );
    } else {
      const valor = this.DataArrayEquivalencia.filter(x => parseInt(x.id_unidad_compra, 0) === parseInt(data.unidadCompra, 0));
      for (const key of valor) {
        idNuevaTblConversion = key.id;
        nombreUnidaCompra = key.nombre_unidad_compra;
        cantidadUnidaCompra = key.cantidad_compra;
        cantidadUnidaKardex = key.cantidad_kardex;
      }
      for (let i = 0; i < this.ListaUnidadesCompra.length; i++) {
        if (parseInt(data.id, 0) === parseInt(this.ListaUnidadesCompra[i].id, 0)) {
          this.ListaUnidadesCompra[i].idtablaConversion = idNuevaTblConversion;
          this.ListaUnidadesCompra[i].nombreUniKardex = data.nombreUniKardex;
          this.ListaUnidadesCompra[i].cantidadKardex = cantidadUnidaKardex;
          this.ListaUnidadesCompra[i].idUniCompra = data.unidadCompra;
          this.ListaUnidadesCompra[i].nombreUniCompra = nombreUnidaCompra;
          this.ListaUnidadesCompra[i].cantidadCompra = cantidadUnidaCompra;
        }
      }
    }
  }

  QuitarUnidadCompra(datos) {
    for (let i = 0; i < this.ListaUnidadesCompra.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaUnidadesCompra[i].id, 0)) {
        index = this.ListaUnidadesCompra.indexOf(this.ListaUnidadesCompra[i]);
        this.ListaUnidadesCompra.splice(index, 1);
      }
    }
    if (this.ListaUnidadesCompra.length === 0) {
      this.tablaUnidadesCompra = false;
    } else {
      this.tablaUnidadesCompra = true;
    }
  }

  bindingSitiosAlmacenaje() {
    const sitios = {
      sitio: []
    };
    this.ListaSitiosAlmacenaje = [];
    for (const key of this.ListaPuntos) {
      sitios.sitio.push(
        {
          'id_punto': key.id_punto
        }
      );
    }

    this.modificarartoculosService.getSitiosPunto(sitios.sitio).subscribe(
      data => {
        let idPunto = 0;
        this.DataArraySitios = data;
        for (const key of this.DataArraySitios) {
          if (key.bodega_interna === false) {
            if (idPunto !== key.id_punto) {
              this.ListaSitiosAlmacenaje.push(
                {
                  'id_bodega': '',
                  'id_punto': key.id_punto,
                  'nombre_bodega': '',
                  'nombre_punto': key.nombre_punto,
                  'bodega_interna': key.bodega_interna,
                  'checked': false
                }
              );
              this.ListaSitiosAlmacenaje.push(
                {
                  'id_bodega': key.id_bodega,
                  'id_punto': key.id_punto,
                  'nombre_bodega': key.nombre,
                  'nombre_punto': '',
                  'bodega_interna': key.bodega_interna,
                  'checked': false
                }
              );
            } else {
              this.ListaSitiosAlmacenaje.push(
                {
                  'id_bodega': key.id_bodega,
                  'id_punto': key.id_punto,
                  'nombre_bodega': key.nombre,
                  'nombre_punto': '',
                  'bodega_interna': key.bodega_interna,
                  'checked': false
                }
              );
            }
            idPunto = key.id_punto;
          } else {
            const existe = this.ListaSitios.filter(x => parseInt(x.id_bodega, 0) === parseInt(key.id_bodega, 0));
            if (existe.length === 0) {
              this.ListaSitios.push(
                {
                  'id': this.registrosSitios.length + 1,
                  'id_punto': key.id_punto,
                  'id_bodega': key.id_bodega,
                  'nombre_punto': key.nombre_punto,
                  'nombre_bodega': key.nombre,
                  'bodega_interna': key.bodega_interna
                });
              this.registrosSitios.push('resitrositio2');
            }
          }
        }

        if (this.ListaSitiosAlmacenaje.length === 0) {// gruardaBodegastodas
          if (this.ListaSitios.length !== 0) { // gruardaBodegaInterna
            this.UnicaBodInt = false;
          } else {
            this.UnicaBodInt = true;
          }
        } else {
          this.UnicaBodInt = true;
        }
      }
    );
  }

  onChangeAllSitios(data, isChecked: boolean) {
    this.TodoSitios = isChecked;
    for (let i = 0; i < data.length; i++) {
      data[i].checked = isChecked;
      this.onChangeSitios(data[i], isChecked);
    }
  }

  onChangeSitios(data, isChecked) {
    data.checked = isChecked;
    if (data.id_bodega !== '') {
      if (isChecked === true) {
        let NombrePunto;
        const punto = this.ListaPuntos.filter(x => parseInt(x.id, 0) === parseInt(data.id_punto, 0));
        for (const k of punto) {
          NombrePunto = k.nombre;
        }
        this.ListaSitiosSel.push(
          {
            'id_punto': data.id_punto,
            'id_bodega': data.id_bodega,
            'nombre_punto': NombrePunto,
            'nombre_bodega': data.nombre_bodega
          });
      } else {
        for (let i = 0; i < this.ListaSitiosSel.length; i++) {
          let index;
          if (parseInt(data.id_bodega, 0) === parseInt(this.ListaSitiosSel[i].id_bodega, 0) && isChecked === false) {
            index = this.ListaSitiosSel.indexOf(this.ListaSitiosSel[i]);
            this.ListaSitiosSel.splice(index, 1);
          }
        }
      }
    }
  }

  MostrarSitiosArticulo() {
    for (const key of this.ListaSitiosSel) {
      const existe = this.ListaSitios.filter(x => parseInt(x.id_bodega, 0) === parseInt(key.id_bodega, 0));
      if (existe.length === 0) {
        this.ListaSitios.push(
          {
            'id': this.registrosSitios.length + 1,
            'id_punto': key.id_punto,
            'id_bodega': key.id_bodega,
            'nombre_punto': key.nombre_punto,
            'nombre_bodega': key.nombre_bodega
          });
        this.registrosSitios.push('registrositio1');
      }
    }
    if (this.ListaSitios.length === 0) {
      this.tablaSitiosAlmacenaje = false;
    } else {
      this.tablaSitiosAlmacenaje = true;
    }
  }

  QuitarSitio(datos) {
    for (let i = 0; i < this.ListaSitios.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaSitios[i].id, 0)) {
        index = this.ListaSitios.indexOf(this.ListaSitios[i]);
        this.ListaSitios.splice(index, 1);
      }
    }
    if (this.ListaSitios.length === 0) {
      this.tablaSitiosAlmacenaje = false;
    } else {
      this.tablaSitiosAlmacenaje = true;
    }
  }

  /* ********************************************************************************* */
  /* ********************************* METODOS VENTAS ******************************** */
  /* ********************************************************************************* */

  LoadUltimoCodigoPlu() {
    this.modificarartoculosService.getUltimoCodigoPlu().subscribe(
      data => {
        // console.log(data);
        this.DataNewArticulo.codigopluanterior = data.text();
      }
    );
  }

  LoadClasesVenta() {
    this.modificarartoculosService.getClasesVentaCliente().subscribe(
      data => {
        // console.log(data);
        this.DataArrayClasesVenta = data;
        if (this.DataNewArticulo.claseVenta === '' || this.DataNewArticulo.claseVenta === null ||
          this.DataNewArticulo.claseVenta === undefined) {
          // console.log(this.DataArrayClasesVenta.length);
          if (this.DataArrayClasesVenta.length === 1) {
            this.LoadGruposVenta(this.DataNewArticulo.claseVenta);
          }
        }
      }
    );
  }

  LoadGruposVenta(idClase) {
    if (idClase === '' || idClase === null || idClase === undefined) {
    } else {
      this.modificarartoculosService.getGrupoPorClaseVenta(idClase).subscribe(
        data => {
          this.DataArrayGruposVenta = data;
          if (this.DataNewArticulo.grupoVenta === '' || this.DataNewArticulo.grupoVenta === null ||
            this.DataNewArticulo.grupoVenta === undefined) {
            if (this.DataArrayGruposVenta.length === 1) {
              this.DataNewArticulo.claseVenta = this.DataArrayClasesVenta[0].id;
              this.DataNewArticulo.grupoVenta = this.DataArrayGruposVenta[0].id;
              this.CargarImpuestosVentas(idClase, this.DataNewArticulo.grupoVenta);
            }
          }
        }
      );
    }
  }

  CargarImpuestosVentas(idClase, idGrupo) {
    this.ListaArticuloCanal = [];
    this.DataNewArticulo.id_impuesto = null;
    this.DataNewArticulo.id_tarifa = null;
    this.DataNewArticulo.id_impuestoIns = null;
    this.DataNewArticulo.id_tarifaIns = null;
    this.modificarartoculosService.getImpuestosVenta(idClase, idGrupo).subscribe(
      data => {
        // console.log(data);
        this.DataImpuestoVenta = data[0];
        if (this.DataImpuestoVenta.impDifCanal === true) {
          this.DataNewArticulo.impdif = 1;
          this.DataNewArticulo.id_impuesto = this.DataImpuestoVenta.idImpuesto;
          this.DataNewArticulo.id_tarifa = this.DataImpuestoVenta.idTarifa;
          /* this.ListaArticuloCanal.push({
            'id': this.registrosimpuestosventa.length,
            'id_canal': 0,
            'nombre_canal': 'Todos',
            'id_impuesto': this.DataImpuestoVenta.idImpuesto,
            'nombre_impuesto': this.DataImpuestoVenta.nombreImpuesto,
            'id_tarifa': this.DataImpuestoVenta.idTarifa,
            'valor_tarifa': this.DataImpuestoVenta.valorTarifa
          });
          this.registrosimpuestosventa.push('registrosimpuestosventa1'); */
          this.LoadImpuestosVentaCanal(this.DataImpuestoVenta.id);
        } else {
          this.DataNewArticulo.impdif = 0;
          this.LoadImpuestosVentaCanal(this.DataImpuestoVenta.id);
        }
      }
    );
  }

  LoadImpuestosVentaCanal(idImpuestoVentas) {
    this.modificarartoculosService.getImpuestosVentaCanal(idImpuestoVentas).subscribe(
      data => {
        // console.log(data);
        for (const key of data) {
          if (key.idCanal === 6) {
            this.DataNewArticulo.id_impuestoIns = key.idImpuesto;
            this.DataNewArticulo.id_tarifaIns = key.idTarifa;
          } else {
            this.ListaArticuloCanal.push({
              'id': this.registrosimpuestosventa.length,
              'id_canal': key.idCanal,
              'nombre_canal': key.nombreCanal,
              'id_impuesto': key.idImpuesto,
              'nombre_impuesto': key.nombreImpuesto,
              'id_tarifa': key.idTarifa,
              'valor_tarifa': key.valorTarifa
            });
            this.registrosimpuestosventa.push('registrosimpuestosventa1');
          }
        }
      }
    );
  }


  /* LoadCanalesImpVenta() {
    this.modificarartoculosService.getImpuestoCanalPorCliente(this.id_cliente).subscribe(
      data => {
        this.DataArrayImpCan = data;
        this.DataCanalesImp = [];

        for (const key of this.DataArrayImpCan) {
          this.DataCanalesImp.push({
            'id': key.id,
            'id_cliente': key.id_cliente,
            'id_canal': key.id_canal,
            'nombre_canal': key.nombre_canal,
            'id_impuesto': key.id_impuesto,
            'nombre_impuesto': key.nombre_impuesto,
            'id_regimen': key.id_regimen,
            'impuestoCanales': key.id_imp_reg,
            'nombre_regimen': key.nombre_regimen,
            'impMasUsado': key.imp_usado, // true
            'unicaTarCanal': key.unica_tarifa, // true
            'ValorUnicaTarCanal': key.valor_unica_tarifa,
            'checked': false
          });
        }
      }
    );
  } */
  /*
    onChangeAllCanalesVenta(data, isChecked: boolean) {
      this.TodoCanalesImp = isChecked;
      for (let i = 0; i < data.length; i++) {
        data.checked = isChecked;
        this.onChangeCanalVenta(data[i], isChecked);
      }
    }

    onChangeCanalVenta(data, isChecked) {
      if (isChecked === true) {
        const existe = this.ListaCanalesImpSel.filter(x => parseInt(x.id, 0) === parseInt(data.id, 0));
        if (existe.length === 0) {
          this.ListaCanalesImpSel.push(
            {
              'id': data.id,
              'nombre_canal': data.nombre_canal,
              'nombre_impuesto': data.nombre_impuesto,
              'nombre_regimen': data.nombre_regimen,
              'ValorUnicaTarCanal': data.ValorUnicaTarCanal,
              'checked': false
            });
        }
      } else {
        for (let i = 0; i < this.ListaCanalesImpSel.length; i++) {
          let index;
          if (parseInt(data.id, 0) === parseInt(this.ListaCanalesImpSel[i].id, 0) && isChecked === false) {
            index = this.ListaCanalesImpSel.indexOf(this.ListaCanalesImpSel[i]);
            this.ListaCanalesImpSel.splice(index, 1);
          }
        }
      }
      for (let i = 0; i < this.DataCanalesImp.length; i++) {
        if (data.id === this.DataCanalesImp[i].id) {
          this.DataCanalesImp[i].checked = isChecked;
        }
      }
    }

    MostrarCanalesVenta() {
      for (const key of this.ListaCanalesImpSel) {
        const existe = this.ListaArticuloCanal.filter(x => parseInt(x.id_canal_imp, 0) === parseInt(key.id, 0));
        if (existe.length === 0) {
          this.ListaArticuloCanal.push(
            {
              'id': this.registrosCanalImpVenta.length + 1,
              'id_canal_imp': key.id,
              'nombre_canal': key.nombre_canal,
              'nombre_impuesto': key.nombre_impuesto,
              'nombre_regimen': key.nombre_regimen,
              'ValorUnicaTarCanal': key.ValorUnicaTarCanal,
            });
          this.registrosCanalImpVenta.push('canalimp1');
        }
      }
    }
   */

  MostarCanalDiferente(datosImpuesto) {

    const impuesto = this.DataJsonImpuesto.filter(x =>
      parseInt(x.id_impuesto, 0) === parseInt(datosImpuesto.id_impuesto, 0))[0].nombre_impuesto;
    const tarifa = this.DataTarifas.filter(x => parseInt(x.id_tarifa, 0) === parseInt(datosImpuesto.id_tarifa, 0))[0].valor_tarifa;
    const canal = this.DataCanales.filter(x => parseInt(x.id, 0) === parseInt(datosImpuesto.id_canal, 0))[0].nombre;


    this.ListaArticuloCanal.push({
      'id': this.registrosCanalImpVenta.length,
      'id_canal': datosImpuesto.id_canal,
      'nombre_canal': canal,
      'id_impuesto': datosImpuesto.id_impuesto,
      'nombre_impuesto': impuesto,
      'id_tarifa': datosImpuesto.id_tarifa,
      'valor_tarifa': tarifa
    });
    this.registrosCanalImpVenta.push('registrosimpuestosventa2');

    // console.log(this.ListaArticuloCanal);
  }

  bindingCanalVenta(datosCanalVenta) {
    this.DataCanalImp = datosCanalVenta;
  }

  QuitarCanalVenta(datos) {
    for (let i = 0; i < this.ListaArticuloCanal.length; i++) {
      if (parseInt(datos.id, 0) === parseInt(this.ListaArticuloCanal[i].id, 0)) {
        const index = this.ListaArticuloCanal.indexOf(this.ListaArticuloCanal[i]);
        this.ListaArticuloCanal.splice(index, 1);
      }
    }
  }

  LoadUnidadVenta() {
    this.modificarartoculosService.getUnidadesVenta().subscribe(
      data => {
        // console.log(data);

        const searchTextUnidad = data.filter(x => x.nombre.toString().toLowerCase().trim() === 'unidad');

        if (this.DataNewArticulo.seleccion === true) {
          this.DataArrayUnidadVenta = searchTextUnidad;
          this.DataNewArticulo.idUnidadVenta = searchTextUnidad[0].id;
          this.DataNewArticulo.unidadBase = searchTextUnidad[0].id;
          this.DataNewArticulo.nombreUnidadBase = searchTextUnidad[0].nombre;
        } else {
          this.DataArrayUnidadVenta = data;
        }
        if (this.DataNewArticulo.idUnidadVenta === 0 || this.DataNewArticulo.idUnidadVenta === null
          || this.DataNewArticulo.idUnidadVenta === undefined || this.DataNewArticulo.idUnidadVenta === ''
          || this.DataNewArticulo.idUnidadVenta === 1) {

        } else {
          this.bindingUnidadVenta(this.DataNewArticulo.idUnidadVenta);
        }
      }
    );
  }

  ValidarCosto(utilizaCosto) {
    if (utilizaCosto === false) {
      this.DataNewArticulo.costoEstimado = 0;
    }
  }

  LoadListaPrecios() {
    this.modificarartoculosService.getListaPrecios().subscribe(
      data => {
        this.DataArrayListaPrecios = data;
      }
    );
  }

  clickCrearLista() {
    this.crearclickListaPrecios = !this.crearclickListaPrecios;
  }

  crearListaPrecios(datos) {
    this.crearclickListaPrecios = !this.crearclickListaPrecios;
    const postDatos = {
      'nombre': datos.nombre
    };

    this.modificarartoculosService.createListaPrecios(postDatos).subscribe(
      data => {
        if (data.text() === 'La lista de Precio ya existe para el cliente') {
          Swal.fire({
            title: 'Error',
            text: 'La lista de Precio ya existe para el cliente',
            type: 'success',
          });
        } else if (data.text() === 'La lista de Precio ya existe para el cliente') {
          Swal.fire({
            title: 'Error',
            text: 'No se creo el registro correctamente',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Lista de precios Creada',
            text: data.text(),
            type: 'success',
          });
        }
        this.LoadListaPrecios();
        this.DataNewListPrecios = [];
      }
    );
  }

  bindingUnidadVenta(idUnidadVenta) {
    if (idUnidadVenta === '' || idUnidadVenta === null) {
      this.DataNewArticulo.nombreUnidadVenta = '';
    } else {
      const nombreUnidad = this.DataArrayUnidadVenta.filter(x => x.id === parseInt(idUnidadVenta, 0))[0].nombre;
      this.DataNewArticulo.nombreUnidadVenta = nombreUnidad;

      this.LoadUnidadesAlternas();
      if (this.DataNewArticulo.inventario === true) {
        this.ConsultarTablaConversion(this.DataNewArticulo.id_unidad_kardex, idUnidadVenta);
      } else {
        this.DataNewArticulo.unidadBase = idUnidadVenta;
        this.DataNewArticulo.nombreUnidadBase = nombreUnidad;
      }
    }
  }

  ConsultarTablaConversion(UnidadKardex, UnidadVenta) {
    // console.log(UnidadKardex, UnidadVenta);
    if (UnidadVenta === 0 || UnidadKardex === 0) {

    } else {
      this.modificarartoculosService.getTablaConversion(UnidadKardex, UnidadVenta).subscribe(
        data => {
          // console.log(data);
          this.DataArrayTablaConversion = data;
          if (this.DataArrayTablaConversion.length === 0) {
            this.DataEquivalencia.idUnidadVenta = UnidadVenta;
            this.DataEquivalencia.idUnidadKardex = UnidadKardex;
            $('#Equivalencia').modal();
          }
        }
      );
    }
  }

  GuardarEquivalencia(DatosEquivalencia) {
    const articuloinv = {
      tblConversion: []
    };
    articuloinv.tblConversion.push({
      'unidadByIdUnidadKardex': {
        'id': DatosEquivalencia.idUnidadKardex
      },
      'cantidadKardex': DatosEquivalencia.cantKardex,
      'unidadByIdUnidadCompra': {
        'id': DatosEquivalencia.idUnidadVenta // UnidadVenta
      },
      /* 'operando': DatosEquivalencia.factor, */
      'cantidadCompra': DatosEquivalencia.cantidad // CantidadVenta
    });

    this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
      data => {
        // console.log(data);
        if (data.text() === 'No se ha podido crear la conversion') {
          this.toastr.error('No se ha podido crear la conversion', 'Error');
        } else if (data.text() === 'Error') {
          this.toastr.error('Ocurrio un error realizando e proceso', 'Error');
        } else if (data.text() === 'Error al consultar la conversion') {
          this.toastr.error('Error al consultar la conversion', 'Error');
        } else if (data.text() === 'Ya existe una conversion con estas unidades') {
          this.toastr.error('Ya existe una conversion con estas unidades', 'Error');
        } else {
          this.toastr.success('Se creo la conversión correctamente', 'Exitoso');
        }
      }
    );
  }

  GuardarUnidadVenta(DatosUnidadVenta) {
    const existeLista = this.ListaUnidadesPrincipales.filter(x =>
      parseInt(x.idListaPrecios, 0) === parseInt(DatosUnidadVenta.listaprecios, 0));
    if (existeLista.length === 0) {

      const nombreLista = this.DataArrayListaPrecios.filter(x => x.id === parseInt(DatosUnidadVenta.listaprecios, 0))[0].nombre;
      DatosUnidadVenta.nombreListaPrecios = nombreLista;
      this.ListaUnidadesPrincipales.push(
        {
          'id': this.registrosUnidadVenta.length + 1,
          'idListaPrecios': DatosUnidadVenta.listaprecios,
          'nombreListaPrecios': DatosUnidadVenta.nombreListaPrecios,
          'valorventa': DatosUnidadVenta.valorventa
        }
      );
      this.registrosUnidadVenta.push('UnidadVenta1');
    } else {
      Swal.fire({
        title: 'Articulo',
        text: 'ya existe la lista de precios en la tabla',
        type: 'error',
      });
    }
  }

  BindingUnidadPrincipal(datos) {
    this.DatosEditUnidadPrincipal = datos;
    this.DatosEditUnidadPrincipal.listaprecios = datos.idListaPrecios;
    this.DatosEditUnidadPrincipal.valorVen = datos.valorventa;
  }

  ModificarUnidadPrincipal(DatosUnidadPrincipal) {
    if (DatosUnidadPrincipal.listaprecios !== DatosUnidadPrincipal.idListaPrecios) {
      const existeLista = this.ListaUnidadesPrincipales.filter(x =>
        parseInt(x.idListaPrecios, 0) === parseInt(DatosUnidadPrincipal.listaprecios, 0));
      if (existeLista.length === 0) {
        const nombreLista = this.DataArrayListaPrecios.filter(x => x.id === parseInt(DatosUnidadPrincipal.listaprecios, 0))[0].nombre;
        DatosUnidadPrincipal.nombreListaPrecios = nombreLista;

        for (let i = 0; i < this.ListaUnidadesPrincipales.length; i++) {
          if (parseInt(DatosUnidadPrincipal.id, 0) === this.ListaUnidadesPrincipales[i].id) {
            this.ListaUnidadesPrincipales[i].id = DatosUnidadPrincipal.id;
            this.ListaUnidadesPrincipales[i].idListaPrecios = DatosUnidadPrincipal.listaprecios;
            this.ListaUnidadesPrincipales[i].nombreListaPrecios = DatosUnidadPrincipal.nombreListaPrecios;
            this.ListaUnidadesPrincipales[i].valorventa = DatosUnidadPrincipal.valorVen;
          }
        }
      } else {
        Swal.fire({
          title: 'Articulo',
          text: 'ya existe la lista de precios en la tabla',
          type: 'error',
        });
      }

    } else {
      const nombreLista = this.DataArrayListaPrecios.filter(x => x.id === parseInt(DatosUnidadPrincipal.listaprecios, 0))[0].nombre;
      DatosUnidadPrincipal.nombreListaPrecios = nombreLista;
      for (let i = 0; i < this.ListaUnidadesPrincipales.length; i++) {
        if (parseInt(DatosUnidadPrincipal.id, 0) === this.ListaUnidadesPrincipales[i].id) {
          this.ListaUnidadesPrincipales[i].id = DatosUnidadPrincipal.id;
          this.ListaUnidadesPrincipales[i].idListaPrecios = DatosUnidadPrincipal.listaprecios;
          this.ListaUnidadesPrincipales[i].nombreListaPrecios = DatosUnidadPrincipal.nombreListaPrecios;
          this.ListaUnidadesPrincipales[i].valorventa = DatosUnidadPrincipal.valorVen;
        }
      }
    }
  }

  QuitarUnidadPrincipal(datos) {
    for (let i = 0; i < this.ListaUnidadesPrincipales.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaUnidadesPrincipales[i].id, 0)) {
        index = this.ListaUnidadesPrincipales.indexOf(this.ListaUnidadesPrincipales[i]);
        this.ListaUnidadesPrincipales.splice(index, 1);
      }
    }
  }

  bindingUnidadFraccion() {
    // console.log(this.DataNewArticulo);
    if (this.DataNewArticulo.inventario && !this.DataNewArticulo.venta) {
      this.DataUnidadAlterna.idUnidad = this.DataNewArticulo.id_unidad_kardex;
      this.DataUnidadAlterna.nombreUnidad = this.DataNewArticulo.nombreUnidadKardex;
      this.DataUnidadAlterna.label = 'Unidad de kardex';
    }
    if (!this.DataNewArticulo.inventario && this.DataNewArticulo.venta) {
      this.DataUnidadAlterna.idUnidad = this.DataNewArticulo.idUnidadVenta;
      this.DataUnidadAlterna.nombreUnidad = this.DataNewArticulo.nombreUnidadVenta;
      this.DataUnidadAlterna.label = 'Unidad de venta';
    }
    if (this.DataNewArticulo.inventario && this.DataNewArticulo.venta) {
      this.DataUnidadAlterna.idUnidad = this.DataNewArticulo.idUnidadVenta;
      this.DataUnidadAlterna.nombreUnidad = this.DataNewArticulo.nombreUnidadVenta;
      this.DataUnidadAlterna.label = 'Unidad de venta';
    }
    this.DataUnidadAlterna.listaprecios = this.DataArrayListaPrecios[0].id;
    this.DataUnidadAlterna.valorventa = 0;
  }

  LoadUnidadesAlternas() {
    this.modificarartoculosService.getUnidadesAlternas().subscribe(
      data => {
        this.DataArrayUnidadAlternaVenta = [];
        for (const key of data) {
          /* if (key.nombre.toString().toLowerCase() !== this.DataNewArticulo.nombreUnidadVenta.toString().toLowerCase()) { */
          this.DataArrayUnidadAlternaVenta.push({
            'id': key.id,
            'id_cliente': key.id_cliente,
            'nombre': key.nombre,
            'tipo': key.tipo
          });
          /* } */
        }
      }
    );
  }

  CrearUnidadAlternaVenta(datos) {

    const PostNewUnidad = {
      nombre: datos.nuevaUnidadAlterna,
      abreviatura: datos.abreviatura,
      inventario: false,
      alternaInventario: false,
      venta: false,
      alternaVenta: true,
      compra: false
    };
    this.modificarartoculosService.createUnidadCompra(PostNewUnidad).subscribe(
      data => {

        if (data.text() === 'No se pudo crear la unidad') {
          this.toastr.error('No se ha podido crear la unidad', 'Error');
        } else if (data.text() === 'La abreviatura ya existe para otra unidad') {
          this.toastr.error('La abreviatura ya existe para otra unidad', 'Error');
        } else if (data.text() === 'Error consultando la abreviatura') {
          this.toastr.error('Error consultando la abreviatura', 'Error');
        } else if (data.text() === 'La unidad ya existe') {
          this.toastr.error('La unidad ya existe, configure en unidades', 'Error');
        } else if (data.text() === 'Error consultando la unidad') {
          this.toastr.error('Error consultando la unidad', 'Error');
        } else {
          this.toastr.success('La unidad se creo correctamente', 'Exitoso');
          this.LoadUnidadesAlternas();
          this.DataUnidadAlterna.nuevaUnidadAlterna = '';
        }
      }
    );
  }

  clickCrearUnidadAlternaVenta() {
    this.clickUniAlternaVenta = !this.clickUniAlternaVenta;
  }

  bindingUnidadAlternaVenta(idUnidadAlterna) {
    if (idUnidadAlterna === '' || idUnidadAlterna === undefined || idUnidadAlterna === null ||
      idUnidadAlterna === NaN || idUnidadAlterna === 'NaN') {
    } else {
      const buscarNombre = this.DataArrayUnidadAlternaVenta.filter(x => parseInt(x.id, 0) === parseInt(idUnidadAlterna, 0));
      if (buscarNombre.length === 1) {
        for (const key of buscarNombre) {
          this.DataUnidadAlterna.nombreUniAlterna = key.nombre;
        }
      }
    }
  }

  GuardarUnidadAlternaVenta(datosUnidadAlterna) {
    const exist = this.ListaUnidadesAlternaVenta.filter(x =>
      parseInt(x.idListaPrecios, 0) === parseInt(datosUnidadAlterna.listaprecios, 0)
      && parseInt(x.idUnidadAlterna, 0) === parseInt(datosUnidadAlterna.idUnidadAlterna, 0));
    if (exist.length === 0) {

      const nombreLista = this.DataArrayListaPrecios.filter(x => x.id === parseInt(datosUnidadAlterna.listaprecios, 0))[0].nombre;
      datosUnidadAlterna.nombreListaPrecios = nombreLista;
      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        'unidadByIdUnidadKardex': {
          'id': datosUnidadAlterna.idUnidadAlterna
        },
        'cantidadKardex': datosUnidadAlterna.cantAlterna,
        'unidadByIdUnidadCompra': {
          'id': datosUnidadAlterna.idUnidad
        },
        /* 'operando': datosUnidadAlterna.factor, */
        'cantidadCompra': datosUnidadAlterna.cantidad
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        data => {
          this.ListaUnidadesAlternaVenta.push(
            {
              'id': this.registrosUnidadAlterna.length + 1,
              'idTablaConversion': data.text(),
              'idListaPrecios': datosUnidadAlterna.listaprecios,
              'nombreListaPrecios': datosUnidadAlterna.nombreListaPrecios,
              'valorVen': datosUnidadAlterna.valorventa,
              'idUnidadAlterna': datosUnidadAlterna.idUnidadAlterna,
              'nombreUniAlterna': datosUnidadAlterna.nombreUniAlterna,
              'cantAlterna': datosUnidadAlterna.cantAlterna,
              'cantidadVenta': datosUnidadAlterna.cantidad,
              'idUnidad': datosUnidadAlterna.idUnidad,
              'nombreUnidad': datosUnidadAlterna.nombreUnidad,
              /* 'factor': datosUnidadAlterna.factor */
            }
          );
          this.registrosUnidadAlterna.push('UnidadAlterna1');
        }
      );
    } else {
      Swal.fire({
        title: 'Articulo',
        text: 'ya existe la lista de precios en la tabla',
        type: 'error',
      });
    }
  }

  BindingUnidadAlterna(datos) {
    this.DatosEditUnidadAlterna = datos;
    this.DatosEditUnidadAlterna.listaprecios = datos.idListaPrecios;
    this.DatosEditUnidadAlterna.valorventa = datos.valorVen;
    if (this.DataNewArticulo.inventario && !this.DataNewArticulo.venta) {
      this.DatosEditUnidadAlterna.idUnidad = this.DataNewArticulo.id_unidad_kardex;
      this.DatosEditUnidadAlterna.nombreUnidad = this.DataNewArticulo.nombreUnidadKardex;
      this.DatosEditUnidadAlterna.label = 'Unidad de kardex';
    }
    if (!this.DataNewArticulo.inventario && this.DataNewArticulo.venta) {
      this.DatosEditUnidadAlterna.idUnidad = this.DataNewArticulo.idUnidadVenta;
      this.DatosEditUnidadAlterna.nombreUnidad = this.DataNewArticulo.nombreUnidadVenta;
      this.DatosEditUnidadAlterna.label = 'Unidad de venta';
    }
    if (this.DataNewArticulo.inventario && this.DataNewArticulo.venta) {
      this.DatosEditUnidadAlterna.idUnidad = this.DataNewArticulo.idUnidadVenta;
      this.DatosEditUnidadAlterna.nombreUnidad = this.DataNewArticulo.nombreUnidadVenta;
      this.DatosEditUnidadAlterna.label = 'Unidad de venta';
    }
  }

  ModificarUnidadAlterna(DatosUnidadAlt) {
    if (parseInt(DatosUnidadAlt.listaprecios, 0) !== parseInt(DatosUnidadAlt.idListaPrecios, 0)) {
      const exist = this.ListaUnidadesAlternaVenta.filter(x => parseInt(x.idListaPrecios, 0) === parseInt(DatosUnidadAlt.listaprecios, 0)
        && parseInt(x.idUnidadAlterna, 0) === parseInt(DatosUnidadAlt.idUnidadAlterna, 0));
      if (exist.length === 0) {
        const nombreLista = this.DataArrayListaPrecios.filter(x => x.id === parseInt(DatosUnidadAlt.listaprecios, 0))[0].nombre;
        DatosUnidadAlt.nombreListaPrecios = nombreLista;
        const articuloinv = {
          tblConversion: []
        };
        articuloinv.tblConversion.push({
          'unidadByIdUnidadKardex': {
            'id': DatosUnidadAlt.idUnidadAlterna
          },
          'cantidadKardex': DatosUnidadAlt.cantAlterna,
          'unidadByIdUnidadCompra': {
            'id': DatosUnidadAlt.idUnidad
          },
          /* 'operando': DatosUnidadAlt.factor, */
          'cantidadCompra': DatosUnidadAlt.cantidadVenta
        });

        this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
          data => {

            for (let i = 0; i < this.ListaUnidadesAlternaVenta.length; i++) {
              if (parseInt(DatosUnidadAlt.id, 0) === this.ListaUnidadesAlternaVenta[i].id) {
                this.ListaUnidadesAlternaVenta[i].id = DatosUnidadAlt.id;
                this.ListaUnidadesAlternaVenta[i].idTablaConversion = data.text();
                this.ListaUnidadesAlternaVenta[i].idListaPrecios = DatosUnidadAlt.listaprecios;
                this.ListaUnidadesAlternaVenta[i].nombreListaPrecios = DatosUnidadAlt.nombreListaPrecios;
                this.ListaUnidadesAlternaVenta[i].valorVen = DatosUnidadAlt.valorventa;
                this.ListaUnidadesAlternaVenta[i].idUnidadAlterna = DatosUnidadAlt.idUnidadAlterna;
                this.ListaUnidadesAlternaVenta[i].nombreUniAlterna = DatosUnidadAlt.nombreUniAlterna;
                this.ListaUnidadesAlternaVenta[i].cantAlterna = DatosUnidadAlt.cantAlterna;
                this.ListaUnidadesAlternaVenta[i].cantidadVenta = DatosUnidadAlt.cantidadVenta;
                this.ListaUnidadesAlternaVenta[i].idUnidad = DatosUnidadAlt.idUnidad;
                this.ListaUnidadesAlternaVenta[i].nombreUnidad = DatosUnidadAlt.nombreUnidad;
                /* this.ListaUnidadesAlternaVenta[i].factor = DatosUnidadAlt.factor; */
              }
            }
          }
        );
      } else {
        Swal.fire({
          title: 'Articulo',
          text: 'ya existe la lista de precios en la tabla',
          type: 'error',
        });
      }

    } else {

      const nombreLista = this.DataArrayListaPrecios.filter(x => x.id === parseInt(DatosUnidadAlt.listaprecios, 0))[0].nombre;
      DatosUnidadAlt.nombreListaPrecios = nombreLista;

      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        'unidadByIdUnidadKardex': {
          'id': DatosUnidadAlt.idUnidadAlterna
        },
        'cantidadKardex': DatosUnidadAlt.cantAlterna,
        'unidadByIdUnidadCompra': {
          'id': DatosUnidadAlt.idUnidad
        },
        /* 'operando': DatosUnidadAlt.factor, */
        'cantidadCompra': DatosUnidadAlt.cantidadVenta
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        data => {

          for (let i = 0; i < this.ListaUnidadesAlternaVenta.length; i++) {
            if (parseInt(DatosUnidadAlt.id, 0) === this.ListaUnidadesAlternaVenta[i].id) {
              this.ListaUnidadesAlternaVenta[i].id = DatosUnidadAlt.id;
              this.ListaUnidadesAlternaVenta[i].idTablaConversion = data.text();
              this.ListaUnidadesAlternaVenta[i].idListaPrecios = DatosUnidadAlt.listaprecios;
              this.ListaUnidadesAlternaVenta[i].nombreListaPrecios = DatosUnidadAlt.nombreListaPrecios;
              this.ListaUnidadesAlternaVenta[i].valorVen = DatosUnidadAlt.valorventa;
              this.ListaUnidadesAlternaVenta[i].idUnidadAlterna = DatosUnidadAlt.idUnidadAlterna;
              this.ListaUnidadesAlternaVenta[i].nombreUniAlterna = DatosUnidadAlt.nombreUniAlterna;
              this.ListaUnidadesAlternaVenta[i].cantAlterna = DatosUnidadAlt.cantAlterna;
              this.ListaUnidadesAlternaVenta[i].cantidadVenta = DatosUnidadAlt.cantidadVenta;
              this.ListaUnidadesAlternaVenta[i].idUnidad = DatosUnidadAlt.idUnidad;
              this.ListaUnidadesAlternaVenta[i].nombreUnidad = DatosUnidadAlt.nombreUnidad;
              /* this.ListaUnidadesAlternaVenta[i].factor = DatosUnidadAlt.factor; */
            }
          }
        }
      );
    }
  }

  QuitarUnidadAlterna(datos) {
    for (let i = 0; i < this.ListaUnidadesAlternaVenta.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaUnidadesAlternaVenta[i].id, 0)) {
        index = this.ListaUnidadesAlternaVenta.indexOf(this.ListaUnidadesAlternaVenta[i]);
        this.ListaUnidadesAlternaVenta.splice(index, 1);
      }
    }
  }

  /* ///////////////////////////////////////////////////////////// */


  /* LoadUnidadesPresentacion() {
    this.ingresararticulosService.getUnidadesPresentacion().subscribe(
      data => {
        console.log(data);
        this.DataArrayUnidadPresentacion = [];
        for (const key of data) {
          this.DataArrayUnidadPresentacion.push({
            'id': key.id,
            'id_cliente': key.id_cliente,
            'nombre': key.nombre,
            'tipo': key.tipo
          });
        }
        console.log(this.DataArrayUnidadPresentacion);
      }
    );
  } */

  clickCrearUnidadPresentacion() {
    this.clickCrearUndPresentacion = !this.clickCrearUndPresentacion;
  }

  CrearUnidadPresentacion(datosUnidadPresentacion) {
    const datosPresentacion = {
      nombre: datosUnidadPresentacion.nombreUnidadPresentacion,
      abreviatura: datosUnidadPresentacion.abreviatura,
      inventario: false,
      alternaInventario: false,
      venta: true,
      alternaVenta: false,
      compra: false
    };
    this.modificarartoculosService.createUnidad(datosPresentacion).subscribe(
      data => {
        this.LoadUnidadVenta();
        this.DataNewUnidadPresentacion = [];
        if (data.text() === 'No se pudo crear la unidad') {
          this.toastr.error('No se ha podido crear la unidad', 'Error');
        } else if (data.text() === 'La abreviatura ya existe para otra unidad') {
          this.toastr.error('La abreviatura ya existe para otra unidad', 'Error');
        } else if (data.text() === 'Error consultando la abreviatura') {
          this.toastr.error('Error consultando la abreviatura', 'Error');
        } else if (data.text() === 'La unidad ya existe') {
          this.toastr.error('La unidad ya existe, configure en unidades', 'Error');
        } else if (data.text() === 'Error consultando la unidad') {
          this.toastr.error('Error consultando la unidad', 'Error');
        } else {
          this.toastr.success('La unidad se creo correctamente', 'Exitoso');
        }
      }
    );
    /* const datosUnidadKardex = {
      'nombre': datosUnidadPresentacion.nombreUnidadPresentacion,
      'abreviatura': datosUnidadPresentacion.abreviatura,
      'tipo': 1
    };
    this.modificarartoculosService.createUnidad(datosUnidadKardex).subscribe(
      data => {
        this.LoadUnidadKardex();
        console.log(data.text());
      }
    ); */
  }

  bindingPresentacionUndKardex(idUnidadPresentacion) {
    const nombreUnidadPresentacion = this.DataArrayUnidadVenta.filter(x =>
      parseInt(x.id, 0) === parseInt(idUnidadPresentacion, 0))[0].nombre;

    this.DataUndPresentacion.idUnidadKardex = this.DataArrayUnidadKardex.filter(x =>
      x.nombre.trim().toLowerCase() === nombreUnidadPresentacion.trim().toLowerCase())[0].id;
  }

  GuardarUnidadPresentacion(datosUnidadPresentacion) {
    // console.log(datosUnidadPresentacion);

    const nombreUnidadPresentacion = this.DataArrayUnidadVenta.filter(x =>
      parseInt(x.id, 0) === parseInt(datosUnidadPresentacion.idUnidadPresentacion, 0))[0].nombre;

    // console.log(nombreUnidadPresentacion);
    // console.log(this.DataArrayUnidadKardex);
    if (datosUnidadPresentacion.idUnidadKardex === undefined) {
      datosUnidadPresentacion.idUnidadKardex = this.DataArrayUnidadKardex.filter(x =>
        x.nombre.trim().toLowerCase() === nombreUnidadPresentacion.trim().toLowerCase())[0].id;
    }
    //  console.log(datosUnidadPresentacion.idUnidadKardex);


    datosUnidadPresentacion.nombrelistaprecios = this.DataArrayListaPrecios.filter(x =>
      parseInt(x.id, 0) === parseInt(datosUnidadPresentacion.listaprecios, 0))[0].nombre;

    this.modificarartoculosService.getTablaConversion(datosUnidadPresentacion.idUnidadKardex,
      datosUnidadPresentacion.idUnidadPresentacion).subscribe(
        data => {
          // console.log(data);
          if (data.length === 0) {
            const articuloinv = {
              tblConversion: []
            };
            articuloinv.tblConversion.push({
              'unidadByIdUnidadKardex': {
                'id': datosUnidadPresentacion.idUnidadKardex
              },
              'cantidadKardex': 1,
              'unidadByIdUnidadCompra': {
                'id': datosUnidadPresentacion.idUnidadPresentacion
              },
              /* 'operando': 'M', */
              'cantidadCompra': 1
            });

            let idTablaConversion;
            this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
              data2 => {
                if (data2.text() === 'No se ha podido crear la conversion' || data2.text() === 'Error') {
                  idTablaConversion = 0;
                  // console.log(data2.text());
                } else {
                  const existe = this.ListaUnidadesPresentacion.filter(x =>
                    parseInt(x.idUnidadPresentacion, 0) === parseInt(datosUnidadPresentacion.idUnidadPresentacion, 0));
                  if (existe.length === 0) {
                    idTablaConversion = data2.text();
                    this.ListaUnidadesPresentacion.push(
                      {
                        'id': this.registrosUnidadPresentacion.length + 1,
                        'idtablaConversion': idTablaConversion,
                        'idUnidadPresentacion': datosUnidadPresentacion.idUnidadPresentacion,
                        'nombreUniPresentacion': nombreUnidadPresentacion,
                        'idUnidadKardex': datosUnidadPresentacion.idUnidadKardex,
                        'idListaPrecios': datosUnidadPresentacion.listaprecios,
                        'nombreListaPrecios': datosUnidadPresentacion.nombrelistaprecios,
                        'valorventa': datosUnidadPresentacion.valorventa,
                        'estado': true
                      }
                    );
                    this.registrosUnidadPresentacion.push('unidadespresentacion1');
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: 'ya existe la unidad de prersentacion en la tabla',
                      type: 'error',
                    });
                  }
                }
              });
          } else {
            const existe = this.ListaUnidadesPresentacion.filter(x =>
              parseInt(x.idUnidadPresentacion, 0) === parseInt(datosUnidadPresentacion.idUnidadPresentacion, 0));
            if (existe.length === 0) {
              this.ListaUnidadesPresentacion.push(
                {
                  'id': this.registrosUnidadPresentacion.length + 1,
                  'idtablaConversion': data[0].id,
                  'idUnidadPresentacion': datosUnidadPresentacion.idUnidadPresentacion,
                  'nombreUniPresentacion': nombreUnidadPresentacion,
                  'idUnidadKardex': datosUnidadPresentacion.idUnidadKardex,
                  'idListaPrecios': datosUnidadPresentacion.listaprecios,
                  'nombreListaPrecios': datosUnidadPresentacion.nombrelistaprecios,
                  'valorventa': datosUnidadPresentacion.valorventa,
                  'estado': true
                }
              );
              this.registrosUnidadPresentacion.push('unidadespresentacion1');
            } else {
              Swal.fire({
                title: 'Error',
                text: 'ya existe la unidad de prersentacion en la tabla',
                type: 'error',
              });
            }
          }
        }
      );
  }

  BindingUnidadPresentacion(datosUnidadPresentacion) {
    this.DatosEditUnidadPresentacion = datosUnidadPresentacion;
    this.DatosEditUnidadPresentacion.listaprecios = datosUnidadPresentacion.idListaPrecios;
    this.DatosEditUnidadPresentacion.valorven = datosUnidadPresentacion.valorventa;
  }

  ModificarUnidadPresentacion(datosUnidadPresentacion) {
    // console.log(datosUnidadPresentacion);


    // console.log(datosUnidadPresentacion);

    const nombreUnidadPresentacion = this.DataArrayUnidadVenta.filter(x =>
      parseInt(x.id, 0) === parseInt(datosUnidadPresentacion.idUnidadPresentacion, 0))[0].nombre;

    // console.log(nombreUnidadPresentacion);
    // console.log(this.DataArrayUnidadKardex);
    if (datosUnidadPresentacion.idUnidadKardex === undefined) {
      datosUnidadPresentacion.idUnidadKardex = this.DataArrayUnidadKardex.filter(x =>
        x.nombre.trim().toLowerCase() === nombreUnidadPresentacion.trim().toLowerCase())[0].id;
    }
    // console.log(datosUnidadPresentacion.idUnidadKardex);


    datosUnidadPresentacion.nombrelistaprecios = this.DataArrayListaPrecios.filter(x =>
      parseInt(x.id, 0) === parseInt(datosUnidadPresentacion.listaprecios, 0))[0].nombre;

    this.modificarartoculosService.getTablaConversion(datosUnidadPresentacion.idUnidadKardex,
      datosUnidadPresentacion.idUnidadPresentacion).subscribe(
        data => {
          // console.log(data);
          if (data.length === 0) {
            const articuloinv = {
              tblConversion: []
            };
            articuloinv.tblConversion.push({
              'unidadByIdUnidadKardex': {
                'id': datosUnidadPresentacion.idUnidadKardex
              },
              'cantidadKardex': 1,
              'unidadByIdUnidadCompra': {
                'id': datosUnidadPresentacion.idUnidadPresentacion
              },
              /* 'operando': 'M', */
              'cantidadCompra': 1
            });

            let idTablaConversion;
            this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
              data2 => {
                if (data2.text() === 'No se ha podido crear la conversion' || data2.text() === 'Error') {
                  idTablaConversion = 0;
                  // console.log(data2.text());
                } else {
                  idTablaConversion = data2.text();
                  for (let i = 0; i < this.ListaUnidadesPresentacion.length; i++) {
                    if (parseInt(datosUnidadPresentacion.id, 0) === this.ListaUnidadesPresentacion[i].id) {
                      this.ListaUnidadesPresentacion[i].id = datosUnidadPresentacion.id;
                      this.ListaUnidadesPresentacion[i].idtablaConversion = idTablaConversion;
                      this.ListaUnidadesPresentacion[i].idUnidadPresentacion = datosUnidadPresentacion.idUnidadPresentacion;
                      this.ListaUnidadesPresentacion[i].nombreUniPresentacion = nombreUnidadPresentacion;
                      this.ListaUnidadesPresentacion[i].idUnidadKardex = datosUnidadPresentacion.idUnidadKardex;
                      this.ListaUnidadesPresentacion[i].idListaPrecios = datosUnidadPresentacion.listaprecios;
                      this.ListaUnidadesPresentacion[i].nombreListaPrecios = datosUnidadPresentacion.nombreListaPrecios;
                      this.ListaUnidadesPresentacion[i].valorventa = datosUnidadPresentacion.valorven;
                      this.ListaUnidadesPresentacion[i].estado = datosUnidadPresentacion.estado;
                    }
                  }
                }
              });
          } else {
            for (let i = 0; i < this.ListaUnidadesPresentacion.length; i++) {
              if (parseInt(datosUnidadPresentacion.id, 0) === this.ListaUnidadesPresentacion[i].id) {
                this.ListaUnidadesPresentacion[i].id = datosUnidadPresentacion.id;
                this.ListaUnidadesPresentacion[i].idtablaConversion = data[0].id;
                this.ListaUnidadesPresentacion[i].idUnidadPresentacion = datosUnidadPresentacion.idUnidadPresentacion;
                this.ListaUnidadesPresentacion[i].nombreUniPresentacion = nombreUnidadPresentacion;
                this.ListaUnidadesPresentacion[i].idUnidadKardex = datosUnidadPresentacion.idUnidadKardex;
                this.ListaUnidadesPresentacion[i].idListaPrecios = datosUnidadPresentacion.listaprecios;
                this.ListaUnidadesPresentacion[i].nombreListaPrecios = datosUnidadPresentacion.nombreListaPrecios;
                this.ListaUnidadesPresentacion[i].valorventa = datosUnidadPresentacion.valorven;
                this.ListaUnidadesPresentacion[i].estado = datosUnidadPresentacion.estado;
              }
            }
          }
        }
      );
  }

  InactivarUnidadPresentacion(datos) {
    for (let i = 0; i < this.ListaUnidadesPresentacion.length; i++) {
      if (parseInt(datos.id, 0) === parseInt(this.ListaUnidadesPresentacion[i].id, 0)) {
        this.ListaUnidadesPresentacion[i].estado = false;
      }
    }
  }
  activarUnidadPresentacion(datos) {
    for (let i = 0; i < this.ListaUnidadesPresentacion.length; i++) {
      if (parseInt(datos.id, 0) === parseInt(this.ListaUnidadesPresentacion[i].id, 0)) {
        this.ListaUnidadesPresentacion[i].estado = true;
      }
    }
  }

  LimpiarFormUnidadPresentacion() {
    this.UnidPresentacionForm.reset();
    this.DataUndPresentacion = [];
  }
  /* LimpiarFormTodosCanales() {
    this.todosCanalForm.reset();
  }
  LimpiarTablaDifCanal() {
    this.ListaArticuloCanal = [];
  } */


  /* /////////////////////////////////////////////////////////// */

  LoadGruposSeleccion() {
    this.modificarartoculosService.getGruposSeleccion().subscribe(
      data => {
        this.DataArrayGruposSeleccion = data;
        for (const key of this.DataArrayGruposSeleccion) {
          this.DataJsonGruposSeleccion.push({
            'id': key.id,
            'nombre': key.nombre,
            'tipo_seleccion': key.tipo_seleccion
          });
        }
      }
    );
  }

  clickFilaGruposSeleccion(id) {
    this.DataGupoSel.id_grupo = id.toString();
  }

  habilitarSeleccion(idGrupo) {
    const tipoSeleccion = this.DataJsonGruposSeleccion.filter(x => parseInt(x.id, 0) === parseInt(idGrupo, 0))[0].tipo_seleccion;
    this.TipoSeleccion = tipoSeleccion;
    this.modificarartoculosService.getCantArtGruposSeleccion(idGrupo).subscribe(
      data => {
        this.cantidadGrupos = data.value;
      }
    );
    this.LimpiarFormGruposSeleccion();
  }

  validarCantidadGrupos(cantidad_digitada) {
    if (parseInt(cantidad_digitada, 0) > parseInt(this.cantidadGrupos, 0)) {
      this.toastr.error('La cantidad no puede ser superior a la cantidad de articulos del grupo', 'Verificar');
      this.cant_superior = true;
    } else {
      this.cant_superior = false;
    }
  }

  MostrarGruposSeleccionVenta(datosGrupo) {
    const existeGrupo = this.ListaGruposSelVenta.filter(x => parseInt(x.id_grupo, 0) === parseInt(datosGrupo.id_grupo, 0));
    if (existeGrupo.length === 0) {

      if (datosGrupo.cantidad === undefined || datosGrupo.cantidad === null) {
        datosGrupo.cantidad = 1;
      }

      const nombreGrupo = this.DataJsonGruposSeleccion.filter(x => x.id === parseInt(datosGrupo.id_grupo, 0))[0].nombre;
      this.ListaGruposSelVenta.push(
        {
          'id': this.registrosGruSel.length + 1,
          'id_grupo': datosGrupo.id_grupo,
          'nombre': nombreGrupo,
          'cantidad': datosGrupo.cantidad,
          'imprimir': this.registrosGruSel.length + 1,
          'ver': this.registrosGruSel.length + 1
        }
      );
      this.registrosGruSel.push('registrosGruSel1');
    } else {
      Swal.fire({
        title: 'Articulo',
        text: 'ya existe el grupo en la tabla',
        type: 'error',
      });
    }
  }


  Ascender(datos) {
    // console.log(datos);
    const registro_anterior: any = {};

    for (let i = 0; i < this.ListaGruposSelVenta.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaGruposSelVenta[i].id, 0)) {
        index = this.ListaGruposSelVenta.indexOf(this.ListaGruposSelVenta[i]);
        // console.log(index);
        if (index >= 1) {
          registro_anterior.id = this.ListaGruposSelVenta[index - 1].id;
          registro_anterior.id_grupo = this.ListaGruposSelVenta[index - 1].id_grupo;
          registro_anterior.nombre = this.ListaGruposSelVenta[index - 1].nombre;
          registro_anterior.cantidad = this.ListaGruposSelVenta[index - 1].cantidad;
          registro_anterior.imprimir = this.ListaGruposSelVenta[index - 1].imprimir;
          registro_anterior.ver = this.ListaGruposSelVenta[index - 1].ver;

          // console.log(registro_anterior);
          // console.log(registro_anterior.nombre);
          this.ListaGruposSelVenta[index - 1].id = datos.id;
          this.ListaGruposSelVenta[index - 1].id_grupo = datos.id_grupo;
          this.ListaGruposSelVenta[index - 1].nombre = datos.nombre;
          this.ListaGruposSelVenta[index - 1].cantidad = datos.cantidad;
          this.ListaGruposSelVenta[index - 1].imprimir = datos.imprimir - 1;
          this.ListaGruposSelVenta[index - 1].ver = datos.ver - 1;


          this.ListaGruposSelVenta[index].id = registro_anterior.id;
          this.ListaGruposSelVenta[index].id_grupo = registro_anterior.id_grupo;
          this.ListaGruposSelVenta[index].nombre = registro_anterior.nombre;
          this.ListaGruposSelVenta[index].cantidad = registro_anterior.cantidad;
          this.ListaGruposSelVenta[index].imprimir = registro_anterior.imprimir + 1;
          this.ListaGruposSelVenta[index].ver = registro_anterior.ver + 1;
        }
      }
    }
  }

  Descender(datos) {
    // console.log(datos);
    const registro_siguiente: any = {};

    for (let i = 0; i < this.ListaGruposSelVenta.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaGruposSelVenta[i].id, 0)) {
        index = this.ListaGruposSelVenta.indexOf(this.ListaGruposSelVenta[i]);
        // console.log(index);
        if (index < this.ListaGruposSelVenta.length) {
          registro_siguiente.id = this.ListaGruposSelVenta[index + 1].id;
          registro_siguiente.id_grupo = this.ListaGruposSelVenta[index + 1].id_grupo;
          registro_siguiente.nombre = this.ListaGruposSelVenta[index + 1].nombre;
          registro_siguiente.cantidad = this.ListaGruposSelVenta[index + 1].cantidad;
          registro_siguiente.imprimir = this.ListaGruposSelVenta[index + 1].imprimir;
          registro_siguiente.ver = this.ListaGruposSelVenta[index + 1].ver;

          // console.log(registro_siguiente);
          // console.log(registro_siguiente.nombre);
          this.ListaGruposSelVenta[index + 1].id = datos.id;
          this.ListaGruposSelVenta[index + 1].id_grupo = datos.id_grupo;
          this.ListaGruposSelVenta[index + 1].nombre = datos.nombre;
          this.ListaGruposSelVenta[index + 1].cantidad = datos.cantidad;
          this.ListaGruposSelVenta[index + 1].imprimir = datos.imprimir + 1;
          this.ListaGruposSelVenta[index + 1].ver = datos.ver + 1;


          this.ListaGruposSelVenta[index].id = registro_siguiente.id;
          this.ListaGruposSelVenta[index].id_grupo = registro_siguiente.id_grupo;
          this.ListaGruposSelVenta[index].nombre = registro_siguiente.nombre;
          this.ListaGruposSelVenta[index].cantidad = registro_siguiente.cantidad;
          this.ListaGruposSelVenta[index].imprimir = registro_siguiente.imprimir - 1;
          this.ListaGruposSelVenta[index].ver = registro_siguiente.ver - 1;
        }
      }
    }
  }


  BindingGrupoSeleccion(datosGrupo) {
    this.DataEditGrupo = datosGrupo;
    this.DataEditGrupo.cantidadGrupo = datosGrupo.cantidad;
    this.DataEditGrupo.id_grupo_ant = datosGrupo.id_grupo;
    this.TipoGrupoSeleccion = this.DataJsonGruposSeleccion.filter(x =>
      parseInt(x.id, 0) === parseInt(datosGrupo.id_grupo, 0))[0].tipo_seleccion;
  }

  clickFilaGruposSeleccionEdit(id) {
    this.DataEditGrupo.id_grupo = id.toString();
  }

  habilitarSeleccionEdit(idGrupo) {
    const tipoGrupoSeleccion = this.DataJsonGruposSeleccion.filter(x => parseInt(x.id, 0) === parseInt(idGrupo, 0))[0].tipo_seleccion;
    this.TipoGrupoSeleccion = tipoGrupoSeleccion;
    this.LimpiarFormGruposSeleccionEdit();
  }

  ModificarGrupoSeleccion(datosGrupo) {
    if (datosGrupo.id_grupo_ant !== datosGrupo.id_grupo) {
      const existeGrupo = this.ListaGruposSelVenta.filter(x => parseInt(x.id_grupo, 0) === parseInt(datosGrupo.id_grupo, 0));
      if (existeGrupo.length === 0) {
        if (datosGrupo.cantidad === undefined || datosGrupo.cantidad === null) {
          datosGrupo.cantidadGrupo = 1;
        }
        const nombreGrupo = this.DataJsonGruposSeleccion.filter(x => x.id === parseInt(datosGrupo.id_grupo, 0))[0].nombre;

        for (let i = 0; i < this.ListaGruposSelVenta.length; i++) {
          if (parseInt(datosGrupo.id, 0) === this.ListaGruposSelVenta[i].id) {
            this.ListaGruposSelVenta[i].id = datosGrupo.id;
            this.ListaGruposSelVenta[i].id_grupo = datosGrupo.id_grupo;
            this.ListaGruposSelVenta[i].nombre = nombreGrupo;
            this.ListaGruposSelVenta[i].cantidad = datosGrupo.cantidadGrupo;
            this.ListaGruposSelVenta[i].imprimir = datosGrupo.imprimir;
            this.ListaGruposSelVenta[i].ver = datosGrupo.ver;
          }
        }
      } else {
        Swal.fire({
          title: 'Articulo',
          text: 'ya existe el grupo en la tabla',
          type: 'error',
        });
      }

    } else {
      if (datosGrupo.cantidad === undefined || datosGrupo.cantidad === null) {
        datosGrupo.cantidadGrupo = 1;
      }
      const nombreGrupo = this.DataJsonGruposSeleccion.filter(x => x.id === parseInt(datosGrupo.id_grupo, 0))[0].nombre;

      for (let i = 0; i < this.ListaGruposSelVenta.length; i++) {
        if (parseInt(datosGrupo.id, 0) === this.ListaGruposSelVenta[i].id) {
          this.ListaGruposSelVenta[i].id = datosGrupo.id;
          this.ListaGruposSelVenta[i].id_grupo = datosGrupo.id_grupo;
          this.ListaGruposSelVenta[i].nombre = nombreGrupo;
          this.ListaGruposSelVenta[i].cantidad = datosGrupo.cantidadGrupo;
          this.ListaGruposSelVenta[i].imprimir = datosGrupo.imprimir;
          this.ListaGruposSelVenta[i].ver = datosGrupo.ver;
        }
      }
    }
  }

  QuitarGrupoSeleccion(datos) {
    for (let i = 0; i < this.ListaGruposSelVenta.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaGruposSelVenta[i].id, 0)) {
        index = this.ListaGruposSelVenta.indexOf(this.ListaGruposSelVenta[i]);
        this.ListaGruposSelVenta.splice(index, 1);
      }
    }
  }

  /* ********************************************************************************* */
  /* ******************************** METODOS RECETAS ******************************** */
  /* ********************************************************************************* */

  LoadArticulosReceta() {
    this.modificarartoculosService.getArticulosReceta().subscribe(
      data => {
        this.DataArticulos = data;
      }
    );
  }

  ClickRecetasInactivas() {
    this.tablaRecetasActivas = !this.tablaRecetasActivas;
  }

  bindingUnidadBase() {
    if (this.DataNewArticulo.seleccion) {
      this.DataNewReceta.unidadBase = this.DataNewArticulo.idUnidadVenta;
      this.DataNewReceta.nombreUnidadBase = this.DataNewArticulo.nombreUnidadVenta;
      this.DataArrayUnidadBase = this.DataArrayUnidadVenta;
    }
    if (!this.DataNewArticulo.seleccion && this.DataNewArticulo.inventario &&
      !this.DataNewArticulo.venta && this.DataNewArticulo.id_unidad_kardex) {
      this.DataNewReceta.unidadBase = this.DataNewArticulo.id_unidad_kardex;
      this.DataNewReceta.nombreUnidadBase = this.DataNewArticulo.nombreUnidadKardex;
      this.DataArrayUnidadBase = this.DataArrayUnidadKardex;
    }
    if (!this.DataNewArticulo.seleccion && !this.DataNewArticulo.inventario &&
      this.DataNewArticulo.venta && this.DataNewArticulo.idUnidadVenta) {
      this.DataNewReceta.unidadBase = this.DataNewArticulo.idUnidadVenta;
      this.DataNewReceta.nombreUnidadBase = this.DataNewArticulo.nombreUnidadVenta;
      this.DataArrayUnidadBase = this.DataArrayUnidadVenta;
    }
    if (!this.DataNewArticulo.seleccion && this.DataNewArticulo.inventario &&
      this.DataNewArticulo.venta && this.DataNewArticulo.idUnidadVenta) {
      this.DataNewReceta.unidadBase = this.DataNewArticulo.idUnidadVenta;
      this.DataNewReceta.nombreUnidadBase = this.DataNewArticulo.nombreUnidadVenta;
      this.DataArrayUnidadBase = this.DataArrayUnidadVenta;
    }
  }

  LoadRecetasArticulo() {
    this.modificarartoculosService.getRecetasArticulo(this.idArticulo).subscribe(
      data => {
        // console.log(data);
        this.DataArrayReceta = data;
        this.DataJsonReceta = [];

        const art = {
          ingredientes: []
        };
        const articulos = {
          canales: []
        };
        if (this.DataArrayReceta.length !== 0) {
          for (const key of this.DataArrayReceta) {
            const exist = this.DataJsonReceta.filter(x => x.id === key.id);
            if (exist.length === 0) {
              art.ingredientes = [];
              articulos.canales = [];
              for (const keyIngrediente of key.articulorecetaIngredientesPojo) {
                art.ingredientes.push({
                  'id': this.registrosIngredientes.length + 1,
                  'id_articulo': keyIngrediente.id_articulo.toString(),
                  'nombre_articulo': keyIngrediente.nombre,
                  'cantidad': keyIngrediente.cantidad,
                  'unidad': keyIngrediente.id_unidad,
                  'nom_unidad': keyIngrediente.nombre_unidad,
                  'idTablaConversion': keyIngrediente.idTablaConversion,
                  'operando': keyIngrediente.operando,
                  'factor': keyIngrediente.factor,
                  'cantidadCal': keyIngrediente.cantidadCal
                });
                this.registrosIngredientes.push('ingre1');
              }
              for (const keyCanal of key.articulorecetaCanalPojo) {
                articulos.canales.push({
                  'id': this.registrosCanalRec.length + 1,
                  'id_canal': keyCanal.id_canal,
                  'nombre': keyCanal.nombre,
                });
                this.registrosCanalRec.push('canal1');
              }
              this.DataJsonReceta.push(
                {
                  'id': this.registrosrecetasactivas.length,
                  'idReceta': key.id,
                  'nombre': key.nombre,
                  'id_unidad': key.id_unidad,
                  'nombre_unidad': key.nombre_unidad,
                  'cantidad': key.cantidad,
                  'preparacion': key.preparacion,
                  'ingredientes': art.ingredientes, // key.articulorecetaIngredientesPojo,
                  'canales': articulos.canales
                }
              );

              this.registrosrecetasactivas.push('registrorecetasactivas');
            }
          }
        } else {
        }
        // console.log(this.DataJsonReceta);
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  LoadRecetasInactivasArticulo() {
    this.modificarartoculosService.getRecetasInactivasArticulo(this.idArticulo).subscribe(
      data => {
        this.DataArrayRecetaInactivas = data;
        this.DataJsonRecetaInactivas = [];

        const art = {
          ingredientes: []
        };
        const articulos = {
          canales: []
        };
        if (this.DataArrayRecetaInactivas.length !== 0) {
          for (const key of this.DataArrayRecetaInactivas) {
            const exist = this.DataJsonRecetaInactivas.filter(x => x.id === key.id);
            if (exist.length === 0) {
              for (const keyIngrediente of key.articulorecetaIngredientesPojo) {
                art.ingredientes.push({
                  'id': this.registrosIngredientes.length + 1,
                  'id_articulo': keyIngrediente.id_articulo.toString(),
                  'nombre_articulo': keyIngrediente.nombre,
                  'cantidad': keyIngrediente.cantidad,
                  'unidad': keyIngrediente.id_unidad,
                  'nom_unidad': keyIngrediente.nombre_unidad,
                  'idTablaConversion': keyIngrediente.idTablaConversion
                });
                this.registrosIngredientes.push('ingre2');
              }
              for (const keyCanal of key.articulorecetaCanalPojo) {
                articulos.canales.push({
                  'id': this.registrosCanalRec.length + 1,
                  'id_canal': keyCanal.id_canal,
                  'nombre': keyCanal.nombre,
                });
                this.registrosCanalRec.push('canal2');
              }
              this.DataJsonRecetaInactivas.push(
                {
                  'id': this.registrosrecetasinactivas.length,
                  'idReceta': key.id,
                  'nombre': key.nombre,
                  'id_unidad': key.id_unidad,
                  'nombre_unidad': key.nombre_unidad,
                  'cantidad': key.cantidad,
                  'preparacion': key.preparacion,
                  'ingredientes': key.articulorecetaIngredientesPojo,
                  'canales': key.articulorecetaCanalPojo
                }
              );
              this.registrosrecetasinactivas.push('registrorecetasinactivas2');
            }
          }
        } else {
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

  bindingDataInactivarReceta(data) {
    this.datosInactivarReceta = data;
  }

  InactivarReceta(data) {
    for (let i = 0; i < this.DataJsonReceta.length; i++) {
      let index;
      if (data.id === this.DataJsonReceta[i].id) {
        index = this.DataJsonReceta.indexOf(this.DataJsonReceta[i]);
        this.DataJsonReceta.splice(index, 1);
      }
    }
    this.DataJsonRecetaInactivas.push(
      {
        'id': this.registrosrecetasinactivas.length,
        'nombre': data.nombre,
        'id_unidad': data.id_unidad,
        'nombre_unidad': data.nombre_unidad,
        'cantidad': data.cantidad,
        'preparacion': data.preparacion,
        'ingredientes': data.ingredientes,
        'canales': data.canales
      }
    );
    this.registrosrecetasinactivas.push('recetasactivas');
  }

  bindingDataActivarReceta(data) {
    this.datosActivarReceta = data;
  }

  ActivarReceta(data) {
    for (let i = 0; i < this.DataJsonRecetaInactivas.length; i++) {
      let index;
      if (data.id === this.DataJsonRecetaInactivas[i].id) {
        index = this.DataJsonRecetaInactivas.indexOf(this.DataJsonRecetaInactivas[i]);
        this.DataJsonRecetaInactivas.splice(index, 1);
      }
    }
    this.DataJsonReceta.push(
      {
        'id': this.registrosrecetasactivas.length,
        'nombre': data.nombre,
        'id_unidad': data.id_unidad,
        'nombre_unidad': data.nombre_unidad,
        'cantidad': data.cantidad,
        'preparacion': data.preparacion,
        'ingredientes': data.ingredientes,
        'canales': data.canales
      }
    );
    this.registrosrecetasactivas.push('recetasactivas2');
  }

  bindingDataEliminarReceta(datos) {
    this.datosEliminarReceta = datos;
  }

  QuitarReceta(data) {
    for (let i = 0; i < this.DataJsonReceta.length; i++) {
      let index;
      if (data.id === this.DataJsonReceta[i].id) {
        index = this.DataJsonReceta.indexOf(this.DataJsonReceta[i]);
        this.DataJsonReceta.splice(index, 1);
      }
    }
  }

  clickFilaImportReceta(id) {
    this.DataImportar.id_articulo = id.toString();
  }

  ImportarReceta(datosArticulos) {
    this.modificarartoculosService.getRecetasImportar(datosArticulos.id_articulo).subscribe(
      data => {
        const art = {
          ingredientes: []
        };
        const articulos = {
          canales: []
        };
        for (const key of data) {
          for (const keyIngrediente of key.articulorecetaIngredientesPojo) {
            art.ingredientes.push({
              'id': this.registrosIngredientes.length + 1,
              'id_articulo': keyIngrediente.id_articulo.toString(),
              'nombre_articulo': keyIngrediente.nombre,
              'cantidad': keyIngrediente.cantidad,
              'cantidadIngre': keyIngrediente.cantidad,
              'unidad': keyIngrediente.id_unidad,
              'nom_unidad': keyIngrediente.nombre_unidad,
              'idTablaConversion': keyIngrediente.idTablaConversion,
              'operando': keyIngrediente.operando,
              'factor': keyIngrediente.factor,
              'conConversion': true,
              'cantidadCal': keyIngrediente.cantidadCal
            });
            this.registrosIngredientes.push('ingre1');
          }
          for (const keyCanal of key.articulorecetaCanalPojo) {
            articulos.canales.push({
              'id': this.registrosCanalRec.length + 1,
              'id_canal': keyCanal.id_canal,
              'nombre': keyCanal.nombre,
            });
            this.registrosCanalRec.push('canal1');
          }
          this.DataJsonReceta.push(
            {
              'id': this.registrosrecetasactivas.length,
              'idReceta': key.id,
              'nombre': key.nombre,
              'id_unidad': key.id_unidad,
              'nombre_unidad': key.nombre_unidad,
              'cantidad': key.cantidad,
              'preparacion': key.preparacion,
              'ingredientes': art.ingredientes,
              'canales': articulos.canales
            }
          );
          this.registrosrecetasactivas.push('registrorecetasactivas3');
        }
      }
    );
  }

  LimpiarFormImportar() {
    this.DataImportar = [];
  }

  /* ********************************************************************************* */
  /* ***************************** METODOS CREAR RECETA ****************************** */
  /* ********************************************************************************* */

  LoadCanalesCliente() {
    this.modificarartoculosService.getCanalesCliente().subscribe(
      data => {
        this.DataJsonClienteCanal = [];
        this.ListaCanalesReceta = [];

        this.DataArrayClienteCanal = data;
        for (const key of this.DataArrayClienteCanal) {
          this.DataJsonClienteCanal.push({
            'id': key.id,
            'id_canal': key.id_canal,
            'nombre_canal': key.nombre_canal,
            'checkedRec': false,
            'checkedEmp': false
          });
        }

        if (this.DataArrayClienteCanal.length === 1) {
          for (const key of this.DataJsonClienteCanal) {
            const existe = this.ListaCanalesReceta.filter(x => parseInt(x.id_canal, 0) === parseInt(key.id_canal, 0));
            if (existe.length === 0) {
              this.ListaCanalesReceta.push(
                {
                  'id': this.registrosCanalRec.length + 1,
                  'id_canal': key.id_canal,
                  'nombre': key.nombre_canal
                }
              );
              this.registrosCanalRec.push('registrosCanalRec1');
            }
          }
        } else {
          this.ListaCanalesReceta = [];
        }
        if (this.ListaCanalesReceta.length === 0) {
          this.tablaCanalesReceta = false;
        } else {
          this.tablaCanalesReceta = true;
        }
      }
    );
  }

  onChangeAllCanalesReceta(data, isChecked: boolean) {
    this.TodoRecCanal = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChangeCanalReceta(data[i], isChecked);
    }
  }

  onChangeCanalReceta(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.ListaCanalRec.filter(x => parseInt(x.id_canal, 0) === parseInt(data.id_canal, 0));
      if (existe.length === 0) {
        this.ListaCanalRec.push(
          {
            'id_canal': data.id_canal,
            'nombre_canal': data.nombre_canal
          });
      }
    } else {
      for (let i = 0; i < this.ListaCanalRec.length; i++) {
        let index;
        if (data.id_canal === this.ListaCanalRec[i].id_canal && isChecked === false) {
          index = this.ListaCanalRec.indexOf(this.ListaCanalRec[i]);
          this.ListaCanalRec.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonClienteCanal.length; i++) {
      if (data.id_canal === this.DataJsonClienteCanal[i].id_canal) {
        this.DataJsonClienteCanal[i].checkedRec = isChecked;
      }
    }
  }

  MostrarCanalesRec() {
    for (const key of this.ListaCanalRec) {
      const existe = this.ListaCanalesReceta.filter(x => parseInt(x.id_canal, 0) === parseInt(key.id_canal, 0));
      if (existe.length === 0) {

        this.ListaCanalesReceta.push(
          {
            'id': this.registrosCanalRec.length + 1,
            'id_canal': key.id_canal,
            'nombre': key.nombre_canal
          }
        );
        this.registrosCanalRec.push('registrosCanalRec1');
      }
    }

    if (this.ListaCanalesReceta.length === 0) {
      this.tablaCanalesReceta = false;
    } else {
      this.tablaCanalesReceta = true;
    }
  }

  QuitarCanalRec(datos) {
    for (let i = 0; i < this.ListaCanalesReceta.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaCanalesReceta[i].id, 0)) {
        index = this.ListaCanalesReceta.indexOf(this.ListaCanalesReceta[i]);
        this.ListaCanalesReceta.splice(index, 1);
      }
    }
  }

  LoadArticulosInventario() {
    this.modificarartoculosService.getArticulosInventario().subscribe(
      data => {
        this.DataArrayArtInventario = data;
        for (const key of this.DataArrayArtInventario) {
          if (key.id_unidad_alterna === 0) {
            if (key.id_articulo != this.idArticulo) {
              this.DataJsonArtInventario.push({
                'id': key.id,
                'id_articulo': key.id_articulo,
                'nombre_articulo': key.nombre,
                'id_unidad_kardex': key.id_unidad_kardex,
                'nombre_unidad_kardex': key.nombre_unidad
              });
            }
          }
        }
      }
    );
  }

  LoadUnidadIngredientes() {
    this.modificarartoculosService.getUnidadesIngredientes().subscribe(
      data => {
        // console.log('unidades');
        // console.log(data);
        this.DataJsonUndKardexIngredientes = [];
        this.DataArrayUndKardexIngredientes = data;
        for (const key of this.DataArrayUndKardexIngredientes) {
          const existeUnidad = this.DataJsonUndKardexIngredientes.filter(x => parseInt(x.id, 0) === parseInt(key.id, 0));
          if (existeUnidad.length === 0) {
            this.DataJsonUndKardexIngredientes.push({
              id: key.id,
              nombre: key.nombre
            });
          }
        }
      }
    );
  }

  clickFilaIngredientes(id) {
    this.DataIngredientes.id_articulo = id.toString();
  }

  selUnidadKardex(idArticulo) {
    const existeIngrediente = this.ListaIngredientes.filter(x => parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))
    if (existeIngrediente.length === 0) {

      // console.log(this.DataJsonArtInventario);
      // console.log(idArticulo);
      this.DataIngredientes.idUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].id_unidad_kardex;

      this.DataIngredientes.nombreUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].nombre_unidad_kardex;
      // console.log(this.DataIngredientes);
      if (this.DataIngredientes.unidad != null || this.DataIngredientes.unidad != '' || this.DataIngredientes.unidad != undefined) {
        this.consultarTblConversion(this.DataIngredientes.idUniKardex, this.DataIngredientes.unidad)
      }
      this.existeIngrediente = false;
    } else {
      this.existeIngrediente = true;
      this.toastr.warning('El ingrediente ya existe en la receta', 'Verificar');
    }
  }


  consultarTblConversion(idUndKardex, idUndIngrediente) {
    // console.log(idUndKardex + ' , ' + idUndIngrediente);
    if (idUndIngrediente === '' || idUndIngrediente === null || idUndIngrediente === undefined) {

    } else if (idUndKardex === '' || idUndKardex === null || idUndKardex === undefined) {
      this.toastr.warning('Verificar', 'No ha seleccionado el articulo');
    } else {
      this.ConsultaConversion = true;
      this.DataIngredientes.nom_unidad = this.DataJsonUndKardexIngredientes.filter(x =>
        parseInt(x.id, 0) === parseInt(idUndIngrediente, 0))[0].nombre;

      this.modificarartoculosService.getTablaConversion(idUndKardex, idUndIngrediente).subscribe(
        data => {
          // console.log(data);
          // console.log(this.DataIngredientes);
          if (data.length >= 1) {
            this.DataIngredientes.idTablaConversion = data[0].id;
            this.DataIngredientes.operando = data[0].operando;
            this.DataIngredientes.factor = data[0].cantidad_compra;
            this.DataIngredientes.conConversion = true;
            this.crearCon = false;
          } else {
            this.DataIngredientes.conConversion = false;
            this.crearCon = true;
          }
          this.ConsultaConversion = false;
        }
      );
    }
  }

  MostrarIngredientes(datosIngredientes) {
    /*  datosIngredientes.nom_unidad = this.DataJsonEquivalenciaUnidad.filter(x =>
       parseInt(x.id, 0) === parseInt(datosIngredientes.unidad, 0))[0].nombre; */

    const nombreArticulo = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngredientes.id_articulo, 0))[0].nombre_articulo;

    /* const nombreUnidad = this.DataJsonEquivalenciaUnidad.filter(x =>
      parseInt(x.id, 0) === parseInt(datosIngredientes.unidad, 0))[0].nombre; */

    /* const idUniKardex = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngredientes.id_articulo, 0))[0].id_unidad_kardex; */

    if (datosIngredientes.conConversion === false) {
      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        unidadByIdUnidadKardex: {
          id: datosIngredientes.idUniKardex
        },
        cantidadKardex: datosIngredientes.cantConvKardex,
        unidadByIdUnidadCompra: {
          id: datosIngredientes.unidad
        },
        /* operando: datosIngredientes.crearoperando, */
        cantidadCompra: datosIngredientes.cantConvCompra
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        data => {
          let cantidad_cal = 0;
          /* if (datosIngredientes.crearoperando.toUpperCase() === 'M') {
            cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(datosIngredientes.cantConvCompra, 0);
          } else if (datosIngredientes.crearoperando.toUpperCase() === 'D') {
            cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) / parseInt(datosIngredientes.cantConvCompra, 0);
          } */
          if (datosIngredientes.cantConvKardex >= datosIngredientes.cantConvCompra) {
            datosIngredientes.crearoperando = 'M';
            cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(datosIngredientes.cantConvCompra, 0);
          } else if (datosIngredientes.cantConvKardex < datosIngredientes.cantConvCompra) {
            datosIngredientes.crearoperando = 'D';
            cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) / parseInt(datosIngredientes.cantConvCompra, 0);
          }
          this.ListaIngredientes.push(
            {
              id: this.registrosIngredientes.length + 1,
              id_articulo: datosIngredientes.id_articulo,
              nombre_articulo: nombreArticulo,
              cantidad: datosIngredientes.cantidadIngrediente,
              unidad: datosIngredientes.unidad,
              nom_unidad: datosIngredientes.nom_unidad,
              idTablaConversion: data.text(),
              operando: datosIngredientes.crearoperando,
              factor: datosIngredientes.cantConvCompra,
              cantidadCal: cantidad_cal

            }
          );
          this.registrosIngredientes.push('ingredientes1');
        }
      );
    } else {
      let cantidad_cal = 0;
      /* if (datosIngredientes.operando.toUpperCase() === 'M') {
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(datosIngredientes.factor, 0);
      } else if (datosIngredientes.operando.toUpperCase() === 'D') {
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) / parseInt(datosIngredientes.factor, 0);
      } */
      /* if (datosIngredientes.cantConvKardex >= datosIngredientes.cantConvCompra) {
        datosIngredientes.crearoperando = 'M';
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(datosIngredientes.factor, 0);
      } else if (datosIngredientes.cantConvKardex < datosIngredientes.cantConvCompra) {
        datosIngredientes.crearoperando = 'D';
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) / parseInt(datosIngredientes.factor, 0);
      } */
      if (datosIngredientes.operando === 'M') {
        // datosIngredientes.operando = 'M';
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(datosIngredientes.factor, 0);
      } else if (datosIngredientes.operando === 'D') {
        // datosIngredientes.operando = 'D';
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) / parseInt(datosIngredientes.factor, 0);
      }
      this.ListaIngredientes.push(
        {
          id: this.registrosIngredientes.length + 1,
          id_articulo: datosIngredientes.id_articulo,
          nombre_articulo: nombreArticulo,
          cantidad: datosIngredientes.cantidadIngrediente,
          unidad: datosIngredientes.unidad,
          nom_unidad: datosIngredientes.nom_unidad,
          idTablaConversion: datosIngredientes.idTablaConversion,
          operando: datosIngredientes.operando,
          factor: datosIngredientes.factor,
          cantidadCal: cantidad_cal
        }
      );
      this.registrosIngredientes.push('ingredientes1');
    }
    // console.log(this.ListaIngredientes);



    /* this.modificarartoculosService.getTablaConversion(idUniKardex, datosIngredientes.unidad).subscribe(
      data => {
        console.log(data);
        let cantidad_cal;
        if (data[0].operando.toUpperCase() === 'M') {
          cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(data[0].cantidad_compra, 0);
        } else if (data[0].operando.toUpperCase() === 'D') {
          cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) / parseInt(data[0].cantidad_compra, 0);

        }
        this.ListaIngredientes.push(
          {
            'id': this.registrosIngredientes.length + 1,
            'id_articulo': datosIngredientes.id_articulo,
            'nombre_articulo': nombreArticulo,
            'cantidad': datosIngredientes.cantidadIngrediente,
            'unidad': datosIngredientes.unidad,
            'nom_unidad': datosIngredientes.nom_unidad,
            'idTablaConversion': data[0].id,
            'operando': data[0].operando,
            'factor': data[0].cantidad_compra,
            'cantidadCal': cantidad_cal
          }
        );
        this.registrosIngredientes.push('ingredientes1');
      }); */
  }

  BindingIngrediente(datosIngrediente) {
    // console.log(datosIngrediente);
    this.ConsultaConversionEdit = false;
    this.crearCon = false;
    this.dataEditIngrediente = datosIngrediente;
    this.dataEditIngrediente.id_art = datosIngrediente.id_articulo;
    this.dataEditIngrediente.cantidadIngre = datosIngrediente.cantidad;
    this.dataEditIngrediente.idTablaConversion = datosIngrediente.idTablaConversion;
    this.dataEditIngrediente.conConversion = true;
    // this.dataEditIngrediente.nombre_unidad = datosIngrediente.nom_unidad;

    this.dataEditIngrediente.idUniKardex = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngrediente.id_articulo, 0))[0].id_unidad_kardex;

    this.dataEditIngrediente.nombreUniKardex = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngrediente.id_articulo, 0))[0].nombre_unidad_kardex;

    this.LoadUnidadIngredientes();
  }

  clickFilaIngredientesEdit(id) {
    this.dataEditIngrediente.id_art = id.toString();
  }

  selUnidadKardexEdit(idArticulo) {
    const existeIngrediente = this.ListaIngredientes.filter(x => parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))
    if (existeIngrediente.length === 0) {

      // console.log(this.DataJsonArtInventario);
      // console.log(idArticulo);
      this.dataEditIngrediente.idUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].id_unidad_kardex;

      this.dataEditIngrediente.nombreUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].nombre_unidad_kardex;

      if (this.dataEditIngrediente.unidad != null || this.dataEditIngrediente.unidad != '' || this.dataEditIngrediente.unidad != undefined) {
        this.consultarTablaConversionEdit(this.dataEditIngrediente.idUniKardex, this.dataEditIngrediente.unidad)
      }
      this.existeIngredienteEdit = false;
    } else {
      this.existeIngredienteEdit = true;
      this.toastr.warning('El ingrediente ya existe en la receta', 'Verificar');
    }
  }

  consultarTablaConversionEdit(idUndKardex, idUndIngrediente) {
    // console.log(idUndKardex + ' , ' + idUndIngrediente);
    if (idUndIngrediente === '' || idUndIngrediente === null || idUndIngrediente === undefined) {

    } else if (idUndKardex === '' || idUndKardex === null || idUndKardex === undefined) {
      this.toastr.warning('Verificar', 'No ha seleccionado el articulo');
    } else {
      this.ConsultaConversionEdit = true;
      this.dataEditIngrediente.nom_unidad = this.DataJsonUndKardexIngredientes.filter(x =>
        parseInt(x.id, 0) === parseInt(idUndIngrediente, 0))[0].nombre;

      this.modificarartoculosService.getTablaConversion(idUndKardex, idUndIngrediente).subscribe(
        data => {
          // console.log(data);
          if (data.length >= 1) {
            this.dataEditIngrediente.idTablaConversion = data[0].id;
            this.dataEditIngrediente.operando = data[0].operando;
            this.dataEditIngrediente.factor = data[0].cantidad_compra;
            this.dataEditIngrediente.conConversion = true;
            this.crearCon = false;
          } else {
            this.dataEditIngrediente.conConversion = false;
            this.crearCon = true;
          }
          this.ConsultaConversionEdit = false;
        }
      );
    }
  }

  ModificarIngrediente(datoIngrediente) {

    const nombreArticulo = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datoIngrediente.id_art, 0))[0].nombre_articulo;

    if (datoIngrediente.conConversion === false) {
      const articuloinv = {
        tblConversion: []
      };
      articuloinv.tblConversion.push({
        unidadByIdUnidadKardex: {
          id: datoIngrediente.idUniKardex
        },
        cantidadKardex: datoIngrediente.cantConvKardex,
        unidadByIdUnidadCompra: {
          id: datoIngrediente.unidad
        },
        /* operando: datoIngrediente.crearoperando, */
        cantidadCompra: datoIngrediente.cantConvCompra
      });

      this.modificarartoculosService.createTablaConversion(articuloinv.tblConversion).subscribe(
        data => {
          let cantidad_cal = 0;
          /* if (datoIngrediente.crearoperando.toUpperCase() === 'M') {
            cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) * parseInt(datoIngrediente.cantConvCompra, 0);
          } else if (datoIngrediente.crearoperando.toUpperCase() === 'D') {
            cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) / parseInt(datoIngrediente.cantConvCompra, 0);
          } */

          if (datoIngrediente.cantConvKardex >= datoIngrediente.cantConvCompra) {
            datoIngrediente.crearoperando = 'M';
            cantidad_cal = parseInt(datoIngrediente.cantidadIngrediente, 0) * parseInt(datoIngrediente.cantConvCompra, 0);
          } else if (datoIngrediente.cantConvKardex < datoIngrediente.cantConvCompra) {
            datoIngrediente.crearoperando = 'D';
            cantidad_cal = parseInt(datoIngrediente.cantidadIngrediente, 0) / parseInt(datoIngrediente.cantConvCompra, 0);
          }
          for (let i = 0; i < this.ListaIngredientes.length; i++) {
            if (parseInt(datoIngrediente.id, 0) === this.ListaIngredientes[i].id) {
              this.ListaIngredientes[i].id = datoIngrediente.id;
              this.ListaIngredientes[i].id_articulo = datoIngrediente.id_articulo;
              this.ListaIngredientes[i].nombre_articulo = nombreArticulo;
              this.ListaIngredientes[i].cantidad = datoIngrediente.cantidadIngre;
              this.ListaIngredientes[i].unidad = datoIngrediente.unidad;
              this.ListaIngredientes[i].nom_unidad = datoIngrediente.nom_unidad;
              this.ListaIngredientes[i].idTablaConversion = data.text();
              this.ListaIngredientes[i].operando = datoIngrediente.crearoperando;
              this.ListaIngredientes[i].factor = datoIngrediente.cantConvCompra;
              this.ListaIngredientes[i].cantidadCal = cantidad_cal;
            }
          }
        }
      );
    } else {
      let cantidad_cal = 0;
      /* if (datoIngrediente.operando.toUpperCase() === 'M') {
        cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) * parseInt(datoIngrediente.factor, 0);
      } else if (datoIngrediente.operando.toUpperCase() === 'D') {
        cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) / parseInt(datoIngrediente.factor, 0);
      } */

      /* if (datoIngrediente.cantConvKardex >= datoIngrediente.cantConvCompra) {
        datoIngrediente.crearoperando = 'M';
        cantidad_cal = parseInt(datoIngrediente.cantidadIngrediente, 0) * parseInt(datoIngrediente.factor, 0);
      } else if (datoIngrediente.cantConvKardex < datoIngrediente.cantConvCompra) {
        datoIngrediente.crearoperando = 'D';
        cantidad_cal = parseInt(datoIngrediente.cantidadIngrediente, 0) / parseInt(datoIngrediente.factor, 0);
      } */

      if (datoIngrediente.operando === 'M') {
        // datosIngredientes.operando = 'M';
        cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) * parseInt(datoIngrediente.factor, 0);
      } else if (datoIngrediente.operando === 'D') {
        // datosIngredientes.operando = 'D';
        cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) / parseInt(datoIngrediente.factor, 0);
      }
      for (let i = 0; i < this.ListaIngredientes.length; i++) {
        if (parseInt(datoIngrediente.id, 0) === this.ListaIngredientes[i].id) {
          this.ListaIngredientes[i].id = datoIngrediente.id;
          this.ListaIngredientes[i].id_articulo = datoIngrediente.id_articulo;
          this.ListaIngredientes[i].nombre_articulo = nombreArticulo;
          this.ListaIngredientes[i].cantidad = datoIngrediente.cantidadIngre;
          this.ListaIngredientes[i].unidad = datoIngrediente.unidad;
          this.ListaIngredientes[i].nom_unidad = datoIngrediente.nom_unidad;
          this.ListaIngredientes[i].idTablaConversion = datoIngrediente.idTablaConversion;
          this.ListaIngredientes[i].operando = datoIngrediente.operando;
          this.ListaIngredientes[i].factor = datoIngrediente.factor;
          this.ListaIngredientes[i].cantidadCal = cantidad_cal;
        }
      }
    }



    /* this.modificarartoculosService.getTablaConversion(idUniKardex, datoIngrediente.unidad).subscribe(
      data => {
        console.log(data);
        let cantidad_cal;
        if (data[0].operando.toUpperCase() === 'M') {
          cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) * parseInt(data[0].cantidad_compra, 0);
        } else if (data[0].operando.toUpperCase() === 'D') {
          cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) / parseInt(data[0].cantidad_compra, 0);

        }
        for (let i = 0; i < this.ListaIngredientes.length; i++) {
          if (parseInt(datoIngrediente.id, 0) === this.ListaIngredientes[i].id) {
            this.ListaIngredientes[i].id = datoIngrediente.id;
            this.ListaIngredientes[i].id_articulo = datoIngrediente.id_art;
            this.ListaIngredientes[i].nombre_articulo = nombreArticulo;
            this.ListaIngredientes[i].cantidad = datoIngrediente.cantidadIngre;
            this.ListaIngredientes[i].unidad = datoIngrediente.unidad;
            this.ListaIngredientes[i].nom_unidad = datoIngrediente.nom_unidad;
            this.ListaIngredientes[i].idTablaConversion = data[0].id;
            this.ListaIngredientes[i].operando = data[0].operando;
            this.ListaIngredientes[i].factor = data[0].cantidad_compra;
            this.ListaIngredientes[i].cantidadCal = cantidad_cal;
          }
        }
      }); */
  }

  QuitarIngrediente(datos) {
    for (let i = 0; i < this.ListaIngredientes.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaIngredientes[i].id, 0)) {
        index = this.ListaIngredientes.indexOf(this.ListaIngredientes[i]);
        this.ListaIngredientes.splice(index, 1);
      }
    }
  }

  crearReceta(DataNewReceta) {
    // console.log(this.ListaIngredientes);
    DataNewReceta.ingredientes = this.ListaIngredientes;
    DataNewReceta.canales = this.ListaCanalesReceta;

    if (DataNewReceta.nombreReceta === undefined) {
      DataNewReceta.nombreReceta = this.DataNewArticulo.nombre;
    }

    const existeUnidad = this.DataArrayUnidadBase.filter(x =>
      parseInt(x.id, 0) === parseInt(DataNewReceta.unidadBase, 0));

    if (existeUnidad.length >= 1) {
      DataNewReceta.nombre_unidad = this.DataArrayUnidadBase.filter(x =>
        parseInt(x.id, 0) === parseInt(DataNewReceta.unidadBase, 0))[0].nombre;
    } else {
      DataNewReceta.nombre_unidad = '';
    }

    if (this.DataNewArticulo.receta_dif_canal === true) {
      this.DataJsonReceta.push(
        {
          'id': this.registrosrecetasactivas.length,
          'nombre': DataNewReceta.nombreReceta,
          'id_unidad': DataNewReceta.unidadBase,
          'nombre_unidad': DataNewReceta.nombre_unidad,
          'cantidad': DataNewReceta.cantidadReceta,
          'preparacion': DataNewReceta.preparacion,
          'ingredientes': DataNewReceta.ingredientes,
          'canales': DataNewReceta.canales
        }
      );
      this.registrosrecetasactivas.push('recetasactivas');
    } else {
      if (this.DataJsonReceta.length === 0) {
        this.DataJsonReceta.push(
          {
            'id': this.registrosrecetasactivas.length,
            'nombre': DataNewReceta.nombreReceta,
            'id_unidad': DataNewReceta.unidadBase,
            'nombre_unidad': DataNewReceta.nombre_unidad,
            'cantidad': DataNewReceta.cantidadReceta,
            'preparacion': DataNewReceta.preparacion,
            'ingredientes': DataNewReceta.ingredientes,
            'canales': DataNewReceta.canales
          }
        );
        this.registrosrecetasactivas.push('recetasactivas1');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'El articulo ya tiene una receta',
          type: 'error',
        });
      }
    }

    this.LimpiarFormReceta();
  }

  LimpiarFormReceta() {
    this.DataNewReceta = [];
    this.ListaIngredientes = [];
    this.ListaCanalesReceta = [];
  }

  bindingModificarReceta(datosReceta) {
    this.ListaIngredientesAnterior = [];
    this.ListaCanalesAnterior = [];
    this.bindingUnidadBase();
    this.LoadUnidadIngredientes();
    this.DataEditReceta = datosReceta;
    this.DataEditReceta.nombreReceta = datosReceta.nombre;
    this.DataEditReceta.cantidadReceta = datosReceta.cantidad;
    this.DataEditReceta.id_unidadReceta = datosReceta.id_unidad;
    this.DataEditReceta.preparacionReceta = datosReceta.preparacion;
    this.DataEditReceta.id_unidadReceta = datosReceta.id_unidad;
    this.DataEditReceta.preparacionReceta = datosReceta.preparacion;
    this.DataEditReceta.idTablaConversion = datosReceta.idTablaConversion;
    this.ListaCanalesReceta = datosReceta.canales;

    this.ListaIngredientes = datosReceta.ingredientes;

    for (const key of datosReceta.ingredientes) {
      this.ListaIngredientesAnterior.push({
        'cantidad': key.cantidad,
        'cantidadIngre': key.cantidad,
        'id': key.id,
        'id_articulo': key.id_articulo,
        'nom_unidad': key.nom_unidad,
        'nombre_articulo': key.nombre_articulo,
        'unidad': key.unidad,
        'idTablaConversion': key.idTablaConversion,
        'operando': key.operando,
        'factor': key.factor,
        'cantidadCal': key.cantidadCal
      });
    }
    for (const key of datosReceta.canales) {
      this.ListaCanalesAnterior.push({
        'id': key.id,
        'id_canal': key.id_canal,
        'nombre': key.nombre_canal
      });
    }
  }

  devolverReceta(dataEditReceta) {
    const existeUnidad = this.DataArrayUnidadBase.filter(x =>
      parseInt(x.id, 0) === parseInt(dataEditReceta.id_unidadReceta, 0));

    if (existeUnidad.length >= 1) {
      dataEditReceta.nombre_unidad = this.DataArrayUnidadBase.filter(x =>
        parseInt(x.id, 0) === parseInt(dataEditReceta.id_unidadReceta, 0))[0].nombre;
    } else {
      dataEditReceta.nombre_unidad = '';
    }

    for (let i = 0; i < this.DataJsonReceta.length; i++) {
      if (parseInt(dataEditReceta.id, 0) === this.DataJsonReceta[i].id) {
        this.DataJsonReceta[i].id = dataEditReceta.id;
        this.DataJsonReceta[i].nombre = dataEditReceta.nombreReceta;
        this.DataJsonReceta[i].id_unidad = dataEditReceta.id_unidadReceta;
        this.DataJsonReceta[i].nombre_unidad = dataEditReceta.nombre_unidad;
        this.DataJsonReceta[i].cantidad = dataEditReceta.cantidadReceta;
        this.DataJsonReceta[i].preparacion = dataEditReceta.preparacionReceta;
        this.DataJsonReceta[i].ingredientes = this.ListaIngredientesAnterior;
        this.DataJsonReceta[i].canales = this.ListaCanalesAnterior;
      }
    }
  }

  modifcarReceta(dataEditReceta) {
    const existeUnidad = this.DataArrayUnidadBase.filter(x =>
      parseInt(x.id, 0) === parseInt(dataEditReceta.id_unidadReceta, 0));

    if (existeUnidad.length >= 1) {
      dataEditReceta.nombre_unidad = this.DataArrayUnidadBase.filter(x =>
        parseInt(x.id, 0) === parseInt(dataEditReceta.id_unidadReceta, 0))[0].nombre;
    } else {
      dataEditReceta.nombre_unidad = '';
    }

    for (let i = 0; i < this.DataJsonReceta.length; i++) {
      if (parseInt(dataEditReceta.id, 0) === this.DataJsonReceta[i].id) {
        this.DataJsonReceta[i].id = dataEditReceta.id;
        this.DataJsonReceta[i].nombre = dataEditReceta.nombreReceta;
        this.DataJsonReceta[i].id_unidad = dataEditReceta.id_unidadReceta;
        this.DataJsonReceta[i].nombre_unidad = dataEditReceta.nombre_unidad;
        this.DataJsonReceta[i].cantidad = dataEditReceta.cantidadReceta;
        this.DataJsonReceta[i].preparacion = dataEditReceta.preparacionReceta;
        this.DataJsonReceta[i].ingredientes = dataEditReceta.ingredientes;
        this.DataJsonReceta[i].canales = dataEditReceta.canales;
      }
    }
  }

  /* ********************************************************************************* */
  /* ******************************* METODOS EMPAQUES ******************************** */
  /* ********************************************************************************* */

  LoadGruposEmpaque() {
    this.modificarartoculosService.getGruposEmpaque().subscribe(
      data => {
        this.DataArrayArtEmpaque = data;
        this.DataJsonGruposEmpaque = [];
        for (const key of this.DataArrayArtEmpaque) {
          this.DataJsonGruposEmpaque.push({
            'creado_por': key.creado_por,
            'estado': key.estado,
            'fecha_creacion': key.fecha_creacion,
            'fecha_modificacion': key.fecha_modificacion,
            'id': key.id,
            'id_cliente': key.id_cliente,
            'modificado_por': key.modificado_por,
            'nombre': key.nombre
          });
        }
      }
    );
  }

  clickFilaEmpaques(id) {
    // console.log(id);
    this.dataEmpaque.id = id.toString();
  }

  MostrarEmpaques(datos) {
    const datosGrupo = this.DataJsonGruposEmpaque.filter(x => parseInt(x.id, 0) === parseInt(datos.id, 0));
    if (datosGrupo.length === 1) {
      for (const key of datosGrupo) {
        this.ListaEmpaques.push({
          'id': key.id,
          'nombre': key.nombre,
          'estado': key.estado,
          'creado_por': key.creado_por,
          'fecha_creacion': key.fecha_creacion,
          'id_cliente': key.id_cliente
        });
      }
    }
  }

  clickBotonImportar() {
    this.clickImportar = !this.clickImportar;
  }

  LoadArticulosEmpaque() {
    this.modificarartoculosService.getArticulosEmpaque().subscribe(
      data => {
        this.DataJsonArticulosGrupo = [];
        this.registrosArticulosGrupo = [];
        for (const key of data) {
          this.DataJsonArticulosGrupo.push({
            'id': this.registrosArticulosGrupo.length,
            'id_art': key.id,
            'nombre': key.nombre,
            'cantidad': 0,
            'id_unidad_kardex': key.id_unidad_kardex,
            'checked': false
          });
          this.registrosArticulosGrupo.push('articulos1');
        }
        this.DataJsonArticulosGrupo.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      }
    );
  }

  updateProductoModal(data, property: string, event: any) {
    const editField = event.target.textContent;
    for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
      let index;
      if (parseInt(data.id_art, 0) === parseInt(this.DataJsonArticulosGrupo[i].id_art, 0)) {
        index = this.DataJsonArticulosGrupo.indexOf(this.DataJsonArticulosGrupo[i]);
        this.DataJsonArticulosGrupo[index][property] = editField.trim();
      }
    }

    if (editField === '') {
      this.toastr.info('La cantidad del producto no puede estar vacio', 'Verificar');
      this.onChangeGrupoEmp(data, false);
    } else if (parseInt(editField, 0) === 0) {
      this.toastr.info('La cantidad producto no puede ser 0', 'Verificar');
      this.onChangeGrupoEmp(data, false);
    } else {
      this.onChangeGrupoEmp(data, true);
    }
  }

  onChangeGrupoEmp(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonArtGruSel.filter(x => parseInt(x.id, 0) === data.id_art);
      if (existe.length === 0) {
        this.DataJsonArtGruSel.push(
          {
            'id': data.id_art,
            'nombre': data.nombre,
            'cantidad': data.cantidad
          }
        );
      }
    } else {
      for (let i = 0; i < this.DataJsonArtGruSel.length; i++) {

        let index;
        if (data.id_art === parseInt(this.DataJsonArtGruSel[i].id, 0) && isChecked === false) {
          index = this.DataJsonArtGruSel.indexOf(this.DataJsonArtGruSel[i]);
          this.DataJsonArtGruSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
      if (data.id_art === this.DataJsonArticulosGrupo[i].id_art) {
        this.DataJsonArticulosGrupo[i].checked = isChecked;
      }
    }
  }

  crearGrupoEmpaque(DatosGrupo, botonImportar) {
    const postData = {
      'nombre': DatosGrupo.nombre
    };
    this.modificarartoculosService.postEmpaque(postData).subscribe(
      data => {
        if (data === 'El grupo empaque ya existe para el cliente') {
          Swal.fire({
            title: 'Error',
            text: 'El grupo empaque ya existe para el cliente',
            type: 'error',
          });
        } else if (data === 'No se pudo crear el grupo') {
        } else {
          if (botonImportar === 1) {
            this.importarGrupo(DatosGrupo, data);
            Swal.fire({
              title: 'Exitoso',
              text: 'El grupo de empaque se importo con exito',
              type: 'success',
            });
          } else {
            this.createArticulosGrupo(data);
            Swal.fire({
              title: 'Exitoso',
              text: 'El grupo de empaque se creo con exito',
              type: 'success',
            });
          }
        }
      }
    );
  }

  createArticulosGrupo(idGrupo) {
    const grupo = {
      articulos: []
    };

    for (const key of this.DataJsonArtGruSel) {
      const idUnidad = this.DataJsonArticulosGrupo.filter(x => parseInt(x.id_art, 0) === parseInt(key.id, 0))[0].id_unidad_kardex;
      grupo.articulos.push(
        {
          'id_grupo_empaque': idGrupo,
          'id_articulo': key.id,
          'cantidad': key.cantidad,
          'id_unidad': idUnidad
        });
    }
    this.modificarartoculosService.postArticulosEmpaque(grupo.articulos).subscribe(
      data => {
        this.LoadGruposEmpaque();
        this.LimpiarFormGrupoEmpaque();
      }
    );
  }

  importarGrupo(datosGrupo, idGrupo) {
    this.modificarartoculosService.importarGrupoEmpaque(datosGrupo.grupo_importar, idGrupo).subscribe(
      data => {
        this.LoadGruposEmpaque();
        this.LimpiarFormGrupoEmpaque();
      }
    );
  }

  bindingDataModificarGrupo(data) {
    this.DataModificar = data;
    this.DataModificar.nombreGrupo = data.nombre;
    this.LoadArticulosGrupoEmp(data.id);
  }

  LoadArticulosGrupoEmp(idGrupo) {
    this.modificarartoculosService.getArticulosGrupo(idGrupo).subscribe(
      data => {
        this.DataArticulosGrupEmp = [];
        this.registrosEditArticulos = [];
        this.DataJsonArtGruSel = [];
        this.DataArrayArtGrupos = data;

        for (const key1 of this.DataArrayArtGrupos) {
          this.DataArticulosGrupEmp.push({
            'id_art': key1.id_articulo,
            'nombre': key1.nombre_articulo,
            'cantidad': key1.cantidad,
            'id_unidad_kardex': key1.id_unidad,
            'checked': true
          });

          this.DataJsonArtGruSel.push(
            {
              'id': key1.id_articulo,
              'nombre': key1.nombre_articulo,
              'cantidad': key1.cantidad
            });
        }

        for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
          const p = this.DataArticulosGrupEmp.filter(x => x.id_art === this.DataJsonArticulosGrupo[i].id_art);
          if (p.length === 0) {
            this.DataArticulosGrupEmp.push(
              {
                'id_art': this.DataJsonArticulosGrupo[i].id_art,
                'nombre': this.DataJsonArticulosGrupo[i].nombre,
                'cantidad': 0,
                'id_unidad_kardex': this.DataJsonArticulosGrupo[i].id_unidad_kardex,
                'checked': false
              }
            );
          }
        }
        this.DataArticulosGrupEmp.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      }
    );
  }

  updateEditProductoModal(data, property: string, event: any) {
    const editField = event.target.textContent;
    for (let i = 0; i < this.DataArticulosGrupEmp.length; i++) {
      let index;
      if (parseInt(data.id_art, 0) === parseInt(this.DataArticulosGrupEmp[i].id_art, 0)) {
        index = this.DataArticulosGrupEmp.indexOf(this.DataArticulosGrupEmp[i]);
        this.DataArticulosGrupEmp[index][property] = editField.trim();
      }
    }

    if (editField === '') {
      this.toastr.info('La cantidad del producto no puede estar vacio', 'Verificar');
      this.onChangeEdit(data, false);
    } else if (parseInt(editField, 0) === 0) {
      this.toastr.info('La cantidad producto no puede ser 0', 'Verificar');
      this.onChangeEdit(data, false);
    } else {
      this.onChangeEdit(data, true);
    }
  }

  onChangeEdit(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonArtGruSel.filter(x => parseInt(x.id, 0) === parseInt(data.id_art, 0));
      if (existe.length === 0) {
        this.DataJsonArtGruSel.push(
          {
            'id': data.id_art,
            'nombre': data.nombre,
            'cantidad': data.cantidad
          }
        );
      } else {
        for (let i = 0; i < this.DataJsonArtGruSel.length; i++) {
          if (parseInt(data.id_art, 0) === parseInt(this.DataJsonArtGruSel[i].id, 0)) {
            this.DataJsonArtGruSel[i].cantidad = data.cantidad;
          }
        }
      }
    } else {
      for (let i = 0; i < this.DataJsonArtGruSel.length; i++) {

        let index;
        if (data.id_art === parseInt(this.DataJsonArtGruSel[i].id, 0) && isChecked === false) {
          index = this.DataJsonArtGruSel.indexOf(this.DataJsonArtGruSel[i]);
          this.DataJsonArtGruSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataArticulosGrupEmp.length; i++) {
      if (parseInt(data.id_art, 0) === parseInt(this.DataArticulosGrupEmp[i].id_art, 0)) {
        this.DataArticulosGrupEmp[i].checked = isChecked;
      }
    }
  }

  onSubmitModificar(datosGrupo) {
    const postData = {
      'id': datosGrupo.id,
      'nombre': datosGrupo.nombre,
      'estado': datosGrupo.estado,
      'creadoPor': datosGrupo.creado_por,
      'fechaCreacion': datosGrupo.fecha_creacion
    };
    this.modificarartoculosService.updateEmpaque(postData).subscribe(
      data => {
        if (data.text() === 'No se pudo mdificar el grupo') {
        } else if (data.text() === 'El nombre pertenece a otro grupo') {
          Swal.fire({
            title: 'Error',
            text: 'El nombre pertenece a otro grupo',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Exitoso',
            text: 'El grupo se modifico exitosamente',
            type: 'success',
          });
          this.updateArticulosGrupo(datosGrupo.id);
        }
      }
    );
  }

  updateArticulosGrupo(idGrupo) {
    const grupo = {
      articulos: []
    };

    for (const key of this.DataJsonArtGruSel) {
      const idUnidad = this.DataJsonArticulosGrupo.filter(x => parseInt(x.id_art, 0) === parseInt(key.id, 0))[0].id_unidad_kardex;
      grupo.articulos.push(
        {
          'id_grupo_empaque': idGrupo,
          'id_articulo': key.id,
          'cantidad': key.cantidad,
          'id_unidad': idUnidad
        });
    }
    this.modificarartoculosService.updateArticulosEmpaque(grupo.articulos, idGrupo).subscribe(
      data => {
        this.LoadGruposEmpaque();
      }
    );
  }

  QuitarEmpaque(datos) {
    for (let i = 0; i < this.ListaEmpaques.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaEmpaques[i].id, 0)) {
        index = this.ListaEmpaques.indexOf(this.ListaEmpaques[i]);
        this.ListaEmpaques.splice(index, 1);
      }
    }
  }




  /* ********************************************************************************* */
  /* **************************** METODOS MODIFICAR ARTICULO ***************************** */
  /* ********************************************************************************* */




  validarCodigoPlu(DataArticulo) {
    // console.log(DataArticulo);
    // console.log(DataArticulo.codigoplu);
    // console.log(DataArticulo.codPluAnterior);
    if (DataArticulo.codigoplu !== undefined && DataArticulo.codigoplu !== DataArticulo.codPluAnterior) {
      this.modificarartoculosService.validarCodigoPlu(DataArticulo.codigoplu).subscribe(
        data => {
          if (data.text() === '0') {
            this.onSubmit(DataArticulo);
          } else if (data.text() === '1') {
            this.toastr.error('El codigo plu ya existe', 'Verificar');
            // alerta ya existe codigo plu
          } else {
            console.log('error');
            // error
          }
        }
      );
    } else {
      this.onSubmit(DataArticulo);
    }
  }

  onSubmit(DataArticulo) {
    console.log(DataArticulo);
    // console.log(this.DataNewArticulo.imagen);

    if (DataArticulo.imgBinding === null || DataArticulo.imgBinding === undefined || DataArticulo.imgBinding === '') {
      DataArticulo.imgBinding = this.DataNewArticulo.imagen;
    } else {
      DataArticulo.imgBinding = this.image;
    }


    if (DataArticulo.codBarras === '' || DataArticulo.codBarras === undefined || DataArticulo.codBarras === null) {
      DataArticulo.codBarras = 'N/A';
    }
    if (DataArticulo.id_unidad_kardex === undefined || DataArticulo.id_unidad_kardex === null) {
      DataArticulo.id_unidad_kardex = 0;
    }

    if (DataArticulo.inventario === false) {
      DataArticulo.id_unidad_kardex = 0;
    }
    if (DataArticulo.venta === false) {
      DataArticulo.idUnidadVenta = 0;
    }

    let impuesto;
    let tarifa;
    if (DataArticulo.impdif === undefined) {
      DataArticulo.impdif = 1;
      impuesto = 0;
      tarifa = 0;
    } else if (DataArticulo.impdif === 0) {
      impuesto = 1;
      tarifa = 1;
    } else {
      impuesto = DataArticulo.id_impuesto;
      tarifa = DataArticulo.id_tarifa;
    }
    let image;
    let image2;
    if (this.imageUrl != DataArticulo.imagen) {
      image = this.imageUrl.split(",");
      image2 = image[1];
    } else {
      image2 = DataArticulo.imagen;
    }

    const data = {
      'id': this.idArticulo,
      'nombre': DataArticulo.nombre.trim(),
      'cliente': {
        'id': DataArticulo.id_cliente
      },
      'codBarras': DataArticulo.codBarras,
      'descripcion': 'N/A',
      'venta': DataArticulo.venta,
      'compra': DataArticulo.compra,
      'inventario': DataArticulo.inventario,
      'receta': DataArticulo.receta,
      'seleccion': DataArticulo.seleccion,
      'utilizaEmpaque': DataArticulo.utilizaEmpaque,
      'empaque': DataArticulo.empaque,
      'estado': true,
      'unidadByIdUnidadKardex': {
        'id': DataArticulo.id_unidad_kardex
      },
      'unidadByIdUnidadVenta': {
        'id': DataArticulo.idUnidadVenta
      },
      'texto': 'N/A',
      'costoEstimado': DataArticulo.costoEstimado,
      'nombreImpresion': 'N/A',
      'impDifCanal': DataArticulo.impdif,
      'idImpuesto': impuesto,
      'idTarifa': tarifa,
      'codPlu': DataArticulo.codigoplu,
      'maneja_comision': DataArticulo.maneja_comision,
      'manejaUnidadesPresentacion': DataArticulo.maneja_und_presentacion,
      'esUnidadPresentacion': false,
      'manejaFraccion': DataArticulo.maneja_fraccion,
      'imagen': image2
    };

    this.modificarartoculosService.updateArticulo(data).subscribe(
      resul => {
        if (resul.text() === 'No se ha podido modificar el Articulo') {
          Swal.fire({
            title: 'Articulo',
            text: 'No se ha podido modificar el Articulo',
            type: 'error',
          });
        } else if (resul.text() === 'el nombre digitado para el articulo ya esta en uso para otro registro') {
          Swal.fire({
            title: 'Articulo',
            text: 'El articulo ya existe para el cliente',
            type: 'error',
          });
        } else if (resul.text() === 'Se modifico el articulo con exito') {
          this.updatePuntoArticulos();


          if (DataArticulo.inventario === true && DataArticulo.compra === false) {

            this.updateArticuloInventario(DataArticulo); // Crea en tabla articuloinventario
            this.updateArticuloGrupo(DataArticulo, 2); // Crea en tabla articuloinventario_grupo

          }
          if (DataArticulo.inventario === false && DataArticulo.compra === true) {

            this.updateArticuloGrupo(DataArticulo, 3); // Crea en tabla articuloinventario_grupo
            this.updateArticuloUnidadCompra(); // crea en tabla ?????????????

          }
          if (DataArticulo.inventario === true && DataArticulo.compra === true) {

            this.updateArticuloInventario(DataArticulo); // Crea en tabla articuloinventario
            this.updateArticuloGrupo(DataArticulo, 2); // Crea en tabla articuloinventario_grupo
            this.updateArticuloConversion();
            this.updateArticuloUnidadCompra(); // crea en tabla ?????????????

          }
          if (DataArticulo.venta === true) {

            this.updateArticuloGrupo(DataArticulo, 1);
            this.updateArticuloVentaCanal(DataArticulo);
            this.updateArticuloListaPrecios();
            this.updateArticuloVentaGrupoSel();
            this.createArticuloUnidadesPresentacion(DataArticulo);

          }
          if (DataArticulo.receta === true) {

            this.updateArticuloReceta(DataArticulo);

          }
          if (DataArticulo.utilizaEmpaque === true) {

            this.updateArticuloEmpaque(DataArticulo);
          }
          if (DataArticulo.maneja_fraccion) {
            this.updateArticuloUnidadAlterna();
          }

          if (this.origen == '2') {
            this.router.navigate(['/configuraciones2/procesosesp']);
          } else if (this.origen == '1') {
            this.router.navigate(['/configuraciones2/articulos']);
          }
          Swal.fire({
            title: 'Articulo',
            text: 'Fue modificado el articulo  con exito',
            type: 'success',
          });
        }
      }
    );
  }

  updatePuntoArticulos() {
    const Punto = {
      articulo: []
    };
    if (this.ListaPuntos.length >= 1) {
      for (const key of this.ListaPuntos) {
        Punto.articulo.push(
          {
            'id_punto': key.id_punto,
            'id_articulo': this.idArticulo
          }
        );
      }
      this.modificarartoculosService.updatePuntoArticulo(this.idArticulo, Punto.articulo).subscribe(
        resul => {
          if (resul.text() === 'success') {
            console.log(resul.text());
          } else if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear PuntoArticulos') {
            console.log('No se pudo crear PuntoArticulos' + resul.text());
          } else {
            console.log(resul.text());
          }
        }
      );

    }
  }

  updateArticuloInventario(datos) {
    console.log(datos);

    if (datos.unidadAlterna === '' || datos.unidadAlterna === undefined || datos.unidadAlterna === null) {
      datos.unidadAlterna = 0;
    }

    const data = {
      'id': this.idArticuloInv,
      'articulos': {
        'id': this.idArticulo
      },
      'unidadByIdUnidadKardex': {
        'id': datos.id_unidad_kardex
      },
      'unidadByIdUnidadAlterna': {
        'id': datos.unidadAlterna
      },
      'unidadByIdUnidadCompra': {
        'id': 1
      },
      'manejaMaxMin': datos.MaxMin,
      'descargaReceta': datos.descarga_receta,
      'estado': true
    };

    this.modificarartoculosService.updateArticuloInventario(data).subscribe(
      resul => {
        if (resul.text() === 'No se ha podido modificar el articulo de inventario') {
          Swal.fire({
            title: 'ArticuloInventario',
            text: 'No se ha podido ArticuloInventario',
            type: 'error',
          });
        } else {
          console.log('ArticuloInventario creados');
          this.updateArticuloPuntoMaxMin(resul.text());
          // this.updateArticuloInventarioBodegas(this.idArticulo); OJO se debe habilita cuando se deshabilite la funcionalidad en sab
        }
      });
  }

  updateArticuloPuntoMaxMin(idArtInv) {
    const articuloinvMaxMin = {
      punto: []
    };

    if (this.ListaMaximosMinimos.length >= 1) {
      for (const key of this.ListaMaximosMinimos) {
        articuloinvMaxMin.punto.push(
          {
            'punto': {
              'id': key.idPunto
            },
            'articuloinventario': {
              'id': idArtInv
            },
            'maximosMinimos': {
              'id': key.idMaxMin
            }
          }
        );
      }
      this.modificarartoculosService.updateArticuloPuntoMaxMin(this.idArticuloInv, articuloinvMaxMin.punto).subscribe(
        resul => {
          if (resul.text() === 'No se ha podido modificar el puntoArticulosMaxmin') {
            Swal.fire({
              title: 'puntoArticulosMaxmin',
              text: 'No se ha podido puntoArticulosMaxmin',
              type: 'error',
            });
          } else if (resul.text() === 'success') {
            console.log('success');
          } else {
            console.log('puntoArticulosMaxmin creados');
          }
        }
      );
    }
  }

  updateArticuloInventarioBodegas(idArt) {
    const articuloinv = {
      bodegas: []
    };

    // console.log(this.ListaSitios);
    if (this.ListaSitios.length >= 1) {
      for (const key of this.ListaSitios) {
        articuloinv.bodegas.push(
          {
            'articulos': {
              'id': idArt
            },
            'bodega': {
              'id': key.id_bodega
            }
          }
        );
      }
      this.modificarartoculosService.updateArticuloInventarioBodegas(idArt, articuloinv.bodegas).subscribe(
        resul => {
          // console.log(resul);
          // this.LoadDatosArticuloInventarioBodega(this.idArticuloInv);
        }
      );
    }
  }

  updateArticuloGrupo(datos, tipo) {
    // console.log(datos);
    let grupo;
    let idTablaArtGru;
    if (tipo === 1) {
      grupo = datos.grupoVenta;
      idTablaArtGru = datos.idarticuloGrupoVen;
    } else {
      grupo = datos.grupo;
      idTablaArtGru = datos.idarticuloGrupoInv;
    }
    // console.log(grupo);
    // console.log(idTablaArtGru);

    if (idTablaArtGru === undefined || idTablaArtGru === '') {
      this.createArticuloGrupo(datos, tipo);
    } else {

      const articuloinv = {
        grupo: []
      };

      if (grupo !== undefined) {
        const grupoart = {
          'id': idTablaArtGru,
          'articulos': {
            'id': this.idArticulo
          },
          'grupoVentaInv': {
            'id': grupo
          },
          'tipo': tipo
        };
        this.modificarartoculosService.updateArticuloGrupo(grupoart).subscribe(
          resul => {
            if (resul.text() === 'No se ha podido modificar el articulo grupo') {
              console.log('No se ha podido modificar el articulo grupo');
            } else {
              console.log(resul.text());
            }
          }
        );
      }
    }
  }

  createArticuloGrupo(datos, tipo) {
    console.log('entro a creAR');
    console.log(datos);
    console.log(tipo);
    let grupo;
    if (tipo === 1) {
      grupo = datos.grupoVenta;
    } else {
      grupo = datos.grupo;
    }
    const articuloinv = {
      grupo: []
    };
    console.log(grupo);
    if (grupo !== undefined) {
      articuloinv.grupo.push(
        {
          'id_articulo': this.idArticulo,
          'id_grupo_venta_inv': grupo,
          'tipo': tipo
        }
      );

      this.modificarartoculosService.createArticuloGrupo(articuloinv.grupo).subscribe(
        resul => {
          if (resul.text() === 'articulos_grupos creados correctamente') {
            console.log('articulos_grupos creados correctamente');
          } else {
            console.log(resul.text());
          }
        }
      );

    }
  }

  updateArticuloConversion() {
    const articuloinv = {
      tblConversion: []
    };

    if (this.ListaUnidadesCompra.length >= 1) {
      for (const key of this.ListaUnidadesCompra) {
        articuloinv.tblConversion.push(
          {
            'articulos': {
              'id': this.idArticulo
            },
            'tablaConversion': {
              'id': key.idtablaConversion
            }
          }
        );
      }
      this.modificarartoculosService.updateArticuloConversion(articuloinv.tblConversion, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
        }
      );
    }
  }

  updateArticuloUnidadCompra() {
    const articuloinv = {
      UniCompra: []
    };

    if (this.ListaUnidadesCompra.length >= 1) {
      for (const key of this.ListaUnidadesCompra) {
        articuloinv.UniCompra.push(
          {
            'articulos': {
              'id': this.idArticulo
            },
            'unidad': {
              'id': key.idUniCompra
            }
          }
        );
      }

      this.modificarartoculosService.updateArticuloUnidadCompra(articuloinv.UniCompra, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
        }
      );
    }
  }

  updateArticuloVentaCanal(datos) {
    const articulo = {
      ventacanal: []
    };
    // console.log(datos);

    if (datos.impdif === 1) {
      if (datos.id_impuestoIns !== undefined) {
        articulo.ventacanal.push({
          'articulos': {
            'id': this.idArticulo
          },
          'canal': {
            'id': 6
          },
          'impuesto': {
            'id': datos.id_impuestoIns
          },
          'tarifa': {
            'id': datos.id_tarifaIns
          }
        });
      }
    } else {
      for (const key of this.ListaArticuloCanal) {
        articulo.ventacanal.push({
          'articulos': {
            'id': this.idArticulo
          },
          'canal': {
            'id': key.id_canal
          },
          'impuesto': {
            'id': key.id_impuesto
          },
          'tarifa': {
            'id': key.id_tarifa
          }
        });
      }
    }
    if (articulo.ventacanal.length >= 1) {

      this.modificarartoculosService.updateArticuloVentaCanal(articulo.ventacanal, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
          /*  if (resul.text() === 'Error') {
             console.log(resul.text());
           } else if (resul.text() === 'exitoso') {
             console.log(resul.text());
           } else if (resul.text() === 'No se pudo crear articuloventa_canal_impuesto') {
             console.log(resul.text());
           } else {
             console.log('articuloventa_canal_impuesto creados correctamente');
           } */
        }
      );
    }
  }

  /*   updateArticuloVentaCanal() {
      const articulo = {
        ventacanal: []
      };

      if (this.ListaArticuloCanal.length >= 1) {
        for (const key of this.ListaArticuloCanal) {
          articulo.ventacanal.push(
            {
              'id_articulo': this.idArticulo,
              'id_canal_impuesto': key.id_canal_imp
            }
          );
        }

        this.modificarartoculosService.updateArticuloVentaCanal(articulo.ventacanal, this.idArticulo).subscribe(
          resul => {
            console.log(resul.text());
            if (resul.text() === 'success') {
              console.log(resul.text());
            } else if (resul.text() === 'No se pudo crear articuloventa_canal_impuesto') {
              console.log(resul.text());
            } else {
              console.log('articuloventa_canal_impuesto creados correctamente');
            }
          }
        );
      }
    } */

  updateArticuloListaPrecios() {
    const articulo = {
      lista: []
    };

    if (this.ListaUnidadesPrincipales.length >= 1) {
      for (const key of this.ListaUnidadesPrincipales) {
        articulo.lista.push(
          {
            'id_articulo': this.idArticulo,
            'id_lista_precios': key.idListaPrecios,
            'valor_venta': key.valorventa
          }
        );
      }
      this.modificarartoculosService.updateArticuloListaPrecios(articulo.lista, this.idArticulo).subscribe(
        resul => {
          if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articulos_lista_precios') {
            console.log(resul.text());
          } else {
            console.log('articulos_lista_precios creados correctamente');
          }
        }
      );
    }
  }

  updateArticuloUnidadAlterna() {
    const articuloventa = {
      unidadalterna: []
    };

    if (this.ListaUnidadesAlternaVenta.length >= 1) {
      for (const key of this.ListaUnidadesAlternaVenta) {
        articuloventa.unidadalterna.push(
          {
            'id_articulo': this.idArticulo,
            'id_unidad_alterna': key.idUnidadAlterna,
            'id_lista_precios': key.idListaPrecios,
            'equivalencia': key.idTablaConversion,
            'valor_venta': key.valorVen
          }
        );
      }
      this.modificarartoculosService.updateArticuloVentaUnidadAlterna(articuloventa.unidadalterna, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
          if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articuloventa_unidad_alterna') {
            console.log(resul.text());
          } else {
            console.log('articuloventa_unidad_alterna creados correctamente');
          }
        }
      );
    }
  }

  updateArticuloVentaGrupoSel() {
    const articuloventa = {
      gruposelcant: []
    };

    if (this.ListaGruposSelVenta.length >= 1) {
      for (const key of this.ListaGruposSelVenta) {
        articuloventa.gruposelcant.push(
          {
            'id_articulo': this.idArticulo,
            'id_grupo_seleccion': key.id_grupo,
            'cantidad': key.cantidad,
            'iord': key.imprimir,
            'orimver': key.ver
          }
        );
      }
      this.modificarartoculosService.updateArticuloGrupoSeleccionCant(articuloventa.gruposelcant, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
          if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articulos_grupo_seleccion_cantidad') {
            console.log(resul.text());
          } else {
            console.log('articulos_grupo_seleccion_cantidad creados correctamente');
          }
        }
      );
    }
  }

  createArticuloUnidadesPresentacion(datos) {
    /* const unidades = {
      presentacion: []
    };

    console.log(this.ListaUnidadesPresentacion);

    if (this.ListaUnidadesPresentacion.length >= 1) {

      for (const key of this.ListaUnidadesPresentacion) {
        unidades.presentacion.push(
          {
            'articulos': {
              'id': this.idArticulo
            },
            'idUnidadPresentacion': key.idUnidadPresentacion,
            'idUnidadKardex': key.idUnidadKardex,
            'idListaPrecios': key.idListaPrecios,
            'valorVenta': key.valorventa,
            'idTablaConversion': key.idtablaConversion
          }
        );
      }
      this.modificarartoculosService.createArticuloUnidadesPresentacion(unidades.presentacion).subscribe(
        resul => {
          console.log(resul.text()); */
    this.createArticulosPresentacion(datos);
    /*  if (resul.text() === 'Error') {
       console.log(resul.text());
     } else if (resul.text() === 'exitoso') {
       console.log(resul.text());
     } else if (resul.text() === 'No se pudo crear articuloventa_unidad_alterna') {
       console.log(resul.text());
     } else {
       console.log('articuloventa_unidad_alterna creados correctamente');
     } */
    /* }
  );
} */
  }

  createArticulosPresentacion(DataArticulo) {
    if (DataArticulo.codBarras === '' || DataArticulo.codBarras === undefined || DataArticulo.codBarras === null) {
      DataArticulo.codBarras = 'N/A';
    }
    if (DataArticulo.unidadKardex === undefined || DataArticulo.unidadKardex === null) {
      DataArticulo.unidadKardex = 0;
    }

    // console.log(DataArticulo);

    let impuesto;
    let tarifa;
    let impdif;
    if (DataArticulo.impdif === undefined) {
      impdif = 0;
      impuesto = 0;
      tarifa = 0;
    } else if (DataArticulo.impdif === 0) {
      impdif = DataArticulo.impdif;
      impuesto = 1;
      tarifa = 1;
    } else {
      impdif = DataArticulo.impdif;
      impuesto = DataArticulo.id_impuesto;
      tarifa = DataArticulo.id_tarifa;
    }
    // console.log(impuesto);
    // console.log(tarifa);

    let codPlu;
    if (DataArticulo.codigoplu >= DataArticulo.codigopluanterior) {
      codPlu = parseInt(DataArticulo.codigoplu, 0);
    } else {
      codPlu = parseInt(DataArticulo.codigopluanterior, 0);
    }
    let data;

    for (const key of this.ListaUnidadesPresentacion) {

      data = {
        'nombre': DataArticulo.nombre + ' ' + key.nombreUniPresentacion,
        'codBarras': DataArticulo.codBarras,
        'descripcion': 'N/A',
        'venta': DataArticulo.venta,
        'compra': DataArticulo.compra,
        'inventario': DataArticulo.inventario,
        'receta': DataArticulo.receta,
        'seleccion': DataArticulo.seleccion,
        'utilizaEmpaque': DataArticulo.utilizaEmpaque,
        'empaque': DataArticulo.empaque,
        'estado': true,
        'unidadByIdUnidadKardex': {
          'id': key.idUnidadKardex
        },
        'unidadByIdUnidadVenta': {
          'id': key.idUnidadPresentacion
        },
        'texto': 'N/A',
        'costoEstimado': DataArticulo.costoEstimado,
        'nombreImpresion': 'nada',
        'impDifCanal': impdif,
        'idImpuesto': impuesto,
        'idTarifa': tarifa,
        'codPlu': codPlu + 1,
        'maneja_comision': DataArticulo.maneja_comision,
        'manejaUnidadesPresentacion': false,
        'esUnidadPresentacion': true,
        'manejaFraccion': DataArticulo.maneja_fraccion
      };
      //  console.log(data);
      this.modificarartoculosService.postArticulo(data).subscribe(
        resul => {
          if (resul.text() === 'No se ha podido crear el articulo') {
            console.log(resul.text());
          } else if (resul.text() === 'El articulo ya existe para el cliente') {
            console.log(resul.text());
          } else {
            this.createPuntoArticulo(resul.text()); // Crea en tabla punto_articulos

            if (DataArticulo.inventario === true && DataArticulo.compras === false) {

              this.createArticuloInventario(DataArticulo, resul.text()); // Crea en tabla articuloinventario
              this.createTablaArticulosGrupo(DataArticulo, resul.text(), 2); // Crea en tabla articuloinventario_grupo

            }
            if (DataArticulo.inventario === false && DataArticulo.compras === true) {

              this.createTablaArticulosGrupo(DataArticulo, resul.text(), 3); // Crea en tabla articuloinventario_grupo
              this.createArticuloUnidadCompra(resul.text()); // crea en tabla ?????????????

            }
            if (DataArticulo.inventario === true && DataArticulo.compras === true) {

              this.createArticuloInventario(DataArticulo, resul.text()); // Crea en tabla articuloinventario
              this.createTablaArticulosGrupo(DataArticulo, resul.text(), 2); // Crea en tabla articuloinventario_grupo
              this.createArticuloConversion(DataArticulo, resul.text());
              this.createArticuloUnidadCompra(resul.text()); // crea en tabla ?????????????

            }
            if (DataArticulo.ventas === true) {

              this.createTablaArticulosGrupo(DataArticulo, resul.text(), 1);
              this.createArticuloVentaCanal(DataArticulo, resul.text());
              this.createArticuloListaPreciosUnidadPresentacion(key, resul.text());
              this.createArticuloUnidadAlterna(DataArticulo, resul.text());
              // this.createArticuloUnidadesPresentacion(DataArticulo, resul.text());
              this.createArticuloVentaGrupoSel(DataArticulo, resul.text());

            }
            /*  if (DataArticulo.receta === true) {

               this.createArticuloReceta(resul.text());

             }
             if (DataArticulo.utilizaEmpaque === true) {

               this.createArticuloEmpaque(resul.text());
             } */

            // this.router.navigate(['/dashboard/articulos']);


            const unidades = {
              presentacion: []
            };
            unidades.presentacion.push(
              {
                'articulos': {
                  'id': this.idArticulo
                },
                'idArticuloNuevo': resul.text(),
                'idUnidadPresentacion': key.idUnidadPresentacion,
                'idUnidadKardex': key.idUnidadKardex,
                'idListaPrecios': key.idListaPrecios,
                'valorVenta': key.valorventa,
                'idTablaConversion': key.idtablaConversion
              }
            );
            this.modificarartoculosService.createArticuloUnidadesPresentacion(unidades.presentacion).subscribe(
              resul2 => {
                console.log(resul2);
              });
          }
        });
      if (key.id_tabla !== undefined) {
        this.modificarartoculosService.updateEstadoUnidadPresentacion(key.estado, key.id_tabla).subscribe(
          resul2 => {
            console.log(resul2);
          });
        this.modificarartoculosService.updateEstadoArticulo(key.estado, key.idArticuloNuevo).subscribe(
          resul2 => {
            console.log(resul2);
          });
      }

    }
  }


  updateArticuloReceta(datos) {
    // console.log(this.idArticulo);

    const articulos = {
      receta: []
    };
    const art = {
      recetainac: []
    };
    const ingre = {
      receta: []
    };
    const canal = {
      receta: []
    };
    // console.log(this.DataJsonReceta);
    // faltan las inactivas
    /* if (this.DataJsonReceta.length >= 1) { */
    for (const key of this.DataJsonReceta) {
      ingre.receta = [];
      canal.receta = [];
      if (key.preparacion === undefined || key.preparacion === '' || key.preparacion === null) {
        key.preparacion = '';
      }
      for (const keyIngre of key.ingredientes) {
        // console.log(key.ingredientes);
        ingre.receta.push({
          'id_articulo': keyIngre.id_articulo,
          'nombre_articulo': keyIngre.nombre_articulo,
          'cantidad': keyIngre.cantidad,
          'id_unidad': keyIngre.unidad,
          'id_tabla_conversion': keyIngre.idTablaConversion,
          'operando': keyIngre.operando,
          'factor': keyIngre.factor,
          'cantidadCal': keyIngre.cantidadCal
        });
      }
      for (const keyCanal of key.canales) {
        canal.receta.push({
          'id_canal': keyCanal.id_canal,
          'nombre': keyCanal.nombre
        });
      }

      articulos.receta.push({
        // 'id': key.idReceta,
        'nombre': key.nombre,
        'cantidad': key.cantidad,
        'unidad': {
          'id': key.id_unidad
        },
        'articulos': {
          'id': this.idArticulo
        },
        'preparacion': key.preparacion,
        'estado': 1,
        'articulorecetaCanalPojo': canal.receta,
        'articulorecetaIngredientesPojo': ingre.receta
      });
    }

    this.modificarartoculosService.updateArticuloReceta(articulos.receta, this.idArticulo).subscribe(
      resul => {
        console.log(resul.text());
        if (resul.text() === 'No se ha podido crear el articulo receta') {
          console.log(resul.text());
        } else {
          console.log('ArticuloReceta creados');
          // this.updateArticuloRecetaPunto(datos.idReceta);
          // this.updateArticuloRecetaCanal(key.idReceta, key.canales);
          // this.updateArticuloRecetaIngredientes(key.idReceta, key.ingredientes);
        }
      }
    );
    /* } */
    // console.log(this.DataJsonRecetaInactivas);
    if (this.DataJsonRecetaInactivas.length >= 1) {
      for (const key of this.DataJsonRecetaInactivas) {
        ingre.receta = [];
        canal.receta = [];
        if (key.preparacion === undefined || key.preparacion === '' || key.preparacion === null) {
          key.preparacion = '';
        }
        for (const keyIngre of key.ingredientes) {
          ingre.receta.push({
            'id_articulo': keyIngre.id_articulo,
            'nombre_articulo': keyIngre.nombre_articulo,
            'cantidad': keyIngre.cantidad,
            'id_unidad': keyIngre.unidad,
            'id_tabla_conversion': keyIngre.idTablaConversion,
            'operando': keyIngre.operando,
            'factor': keyIngre.factor,
            'cantidadCal': keyIngre.cantidadCal
          });
        }
        for (const keyCanal of key.canales) {
          canal.receta.push({
            'id_canal': keyCanal.id_canal,
            'nombre': keyCanal.nombre
          });
        }

        art.recetainac.push({
          // 'id': key.idReceta,
          'nombre': key.nombre,
          'cantidad': key.cantidad,
          'unidad': {
            'id': key.id_unidad
          },
          'articulos': {
            'id': this.idArticulo
          },
          'preparacion': key.preparacion,
          'estado': 0,
          'articulorecetaCanalPojo': canal.receta,
          'articulorecetaIngredientesPojo': ingre.receta
        });
      }

      this.modificarartoculosService.updateArticuloReceta(art.recetainac, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
          if (resul.text() === 'No se ha podido crear el articulo receta') {
            console.log(resul.text());
          } else {
            console.log('ArticuloReceta creados');
          }
        }
      );
    }
  }




  /* ********************** CREAR ARTICULO UNIDAD PRESENTACION ************************ */


  createPuntoArticulo(idArticulo) {
    const Punto = {
      articulo: []
    };
    if (this.ListaPuntos.length >= 1) {
      for (const key of this.ListaPuntos) {
        Punto.articulo.push(
          {
            'id_punto': key.id_punto,
            'id_articulo': idArticulo
          });
      }
      this.modificarartoculosService.createPuntoArticulo(Punto.articulo).subscribe(
        resul => {
          if (resul.text() === 'PuntoArticulos creados correctamente' || resul.text() === 'exitoso') {
            console.log('puntoarticulos creados');
          } else {
            console.log(resul.text());
          }
        }
      );
    }
  }

  createArticuloInventario(datos, idArticulo) {
    if (datos.unidadAlterna === '' || datos.unidadAlterna === undefined || datos.unidadAlterna === null) {
      datos.unidadAlterna = 0;
    }

    const data = {
      'articulos': {
        'id': idArticulo
      },
      'unidadByIdUnidadKardex': {
        'id': datos.unidadKardex
      },
      'unidadByIdUnidadAlterna': {
        'id': datos.unidadAlterna
      },
      'unidadByIdUnidadCompra': {
        'id': 1
      },
      'manejaMaxMin': datos.MaxMin,
      'descargaReceta': datos.descarga_receta,
      'estado': true
    };

    this.modificarartoculosService.createArticuloInventario(data).subscribe(
      resul => {
        if (resul.text() === 'No se ha podido crear el articulo de inentario') {
          console.log(resul.text());
        } else if (resul.text() === 'El articulo de inventario ya existe para el cliente') {
          console.log(resul.text());
        } else {
          console.log('ArticuloInventario creados');
          this.createArticuloTablaPuntoMaxMin(resul.text()); // crea en tabla punto_art_max_min
          // this.createArticuloInventarioBodegas(idArticulo); // OJO! se debe habilitar cuando se deshabilite esta funcionalidad en sab
        }
      });
  }

  createArticuloTablaPuntoMaxMin(idArticuloInv) {
    const articuloinvMaxMin = {
      punto: []
    };

    if (this.ListaMaximosMinimos.length >= 1) {
      for (const key of this.ListaMaximosMinimos) {
        articuloinvMaxMin.punto.push(
          {
            'punto': {
              'id': key.idPunto
            },
            'articuloinventario': {
              'id': idArticuloInv
            },
            'maximosMinimos': {
              'id': key.idMaxMin
            }
          }
        );
      }

      this.modificarartoculosService.createArticuloPuntoMaxMin(articuloinvMaxMin.punto).subscribe(
        resul => {
          if (resul.text() === 'No se pudo crear puntoArticulosMaxmin') {
            console.log(resul.text());
          } else if (resul.text() === 'Error') {
            console.log(resul.text());
          } else {
            console.log('puntoArticulosMaxmin creados');
          }
        }
      );
    }
  }

  createArticuloInventarioBodegas(idArticulo) {
    const articuloinv = {
      bodegas: []
    };
    if (this.ListaSitios.length >= 1) {

      for (const key of this.ListaSitios) {
        articuloinv.bodegas.push(
          {
            'articulos': {
              'id': idArticulo
            },
            'bodega': {
              'id': key.id_bodega
            }
          }
        );
      }
      this.modificarartoculosService.createArticuloInventarioBodegas(articuloinv.bodegas).subscribe(
        resul => {
          if (resul.text() === 'No se ha podido crear el articulo') {
            console.log(resul.text());
          } else if (resul.text() === 'ya existe') {
            console.log(resul.text());
          } else if (resul.text() === 'Error') {
            console.log(resul.text());
          } else {
            console.log('Bodegas creados');
          }
        }
      );
    }
  }

  createTablaArticulosGrupo(datos, idArticulo, tipo) {
    let grupo;
    if (tipo === 1) {
      grupo = datos.grupoVenta;
    } else {
      grupo = datos.grupo;
    }
    if (grupo !== undefined) {

      const articuloinv = {
        grupo: []
      };
      articuloinv.grupo.push(
        {
          'id_articulo': idArticulo,
          'id_grupo_venta_inv': grupo,
          'tipo': tipo
        }
      );

      this.modificarartoculosService.createArticuloGrupo(articuloinv.grupo).subscribe(
        resul => {
          if (resul.text() === 'articulos_grupos creados correctamente') {
            console.log('articulos_grupos creados correctamente');
          } else {
            console.log(resul.text());
          }
        }
      );
    }
  }

  createArticuloConversion(datos, idArticulo) {
    const articuloinv = {
      tblConversion: []
    };
    if (this.ListaUnidadesCompra.length >= 1) {
      for (const key of this.ListaUnidadesCompra) {
        articuloinv.tblConversion.push(
          {
            'articulos': {
              'id': idArticulo
            },
            'tablaConversion': {
              'id': key.idtablaConversion
            }
          }
        );
      }

      this.modificarartoculosService.createArticuloConversion(articuloinv.tblConversion).subscribe(
        resul => {
          if (resul.text() === 'No se ha podido crear el ArticulocomprasConversion') {
            console.log(resul.text());
          } else if (resul.text() === 'EXISTE DIFERENTE A 0') {
            console.log(resul.text());
          } else if (resul.text() === 'Error') {
            console.log(resul.text());
          } else {
            console.log('conversion creados');
          }
        }
      );
    }
  }

  createArticuloUnidadCompra(idArticulo) {
    const articuloinv = {
      UniCompra: []
    };
    if (this.ListaUnidadesCompra.length >= 1) {
      for (const key of this.ListaUnidadesCompra) {
        articuloinv.UniCompra.push(
          {
            'articulos': {
              'id': idArticulo
            },
            'unidad': {
              'id': key.idUniCompra
            }
          }
        );
      }
      this.modificarartoculosService.createArticuloUnidadCompra(articuloinv.UniCompra).subscribe(
        resul => {
          if (resul.text() === 'No se ha podido crear el articulo compra unidad compra') {
            console.log(resul.text());
          } else if (resul.text() === 'Error') {
            console.log(resul.text());
          } else {
            console.log('conversion creados');
          }
        }
      );
    }
  }

  createArticuloVentaCanal(datos, idArticulo) {
    const articulo = {
      ventacanal: []
    };
    // console.log(datos);

    if (datos.impdif === 1) {
      if (datos.id_impuestoIns !== undefined) {
        articulo.ventacanal.push({
          'articulos': {
            'id': idArticulo
          },
          'canal': {
            'id': 6
          },
          'impuesto': {
            'id': datos.id_impuestoIns
          },
          'tarifa': {
            'id': datos.id_tarifaIns
          }
        });
      }
    } else {
      for (const key of this.ListaArticuloCanal) {
        articulo.ventacanal.push({
          'articulos': {
            'id': idArticulo
          },
          'canal': {
            'id': key.id_canal
          },
          'impuesto': {
            'id': key.id_impuesto
          },
          'tarifa': {
            'id': key.id_tarifa
          }
        });
      }
    }
    if (articulo.ventacanal.length >= 1) {

      this.modificarartoculosService.createArticuloVentaCanal(articulo.ventacanal).subscribe(
        resul => {
          console.log(resul.text());
          /*  if (resul.text() === 'Error') {
             console.log(resul.text());
           } else if (resul.text() === 'exitoso') {
             console.log(resul.text());
           } else if (resul.text() === 'No se pudo crear articuloventa_canal_impuesto') {
             console.log(resul.text());
           } else {
             console.log('articuloventa_canal_impuesto creados correctamente');
           } */
        }
      );
    }
  }

  createArticuloListaPreciosUnidadPresentacion(datos, idArticulo) {
    const articulo = {
      lista: []
    };
    articulo.lista.push(
      {
        'id_articulo': idArticulo,
        'id_lista_precios': datos.idListaPrecios,
        'valor_venta': datos.valorventa
      }
    );
    this.modificarartoculosService.createArticuloListaPrecios(articulo.lista).subscribe(
      resul => {
        if (resul.text() === 'Error') {
          console.log(resul.text());
        } else if (resul.text() === 'exitoso') {
          console.log(resul.text());
        } else if (resul.text() === 'No se pudo crear articulos_lista_precios') {
          console.log(resul.text());
        } else {
          console.log('articulos_lista_precios creados correctamente');
        }
      }
    );
  }

  createArticuloUnidadAlterna(datos, idArticulo) {
    const articuloventa = {
      unidadalterna: []
    };
    if (this.ListaUnidadesAlternaVenta.length >= 1) {

      for (const key of this.ListaUnidadesAlternaVenta) {
        articuloventa.unidadalterna.push(
          {
            'id_articulo': idArticulo,
            'id_unidad_alterna': key.idUnidadAlterna,
            'id_lista_precios': key.idListaPrecios,
            'equivalencia': key.idTablaConversion,
            'valor_venta': key.valorVen
          }
        );
      }
      this.modificarartoculosService.createArticuloVentaUnidadAlterna(articuloventa.unidadalterna).subscribe(
        resul => {
          if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articuloventa_unidad_alterna') {
            console.log(resul.text());
          } else {
            console.log('articuloventa_unidad_alterna creados correctamente');
          }
        }
      );
    }
  }

  createArticuloVentaGrupoSel(datos, idArticulo) {
    const articuloventa = {
      gruposelcant: []
    };
    if (this.ListaGruposSelVenta.length >= 1) {

      for (const key of this.ListaGruposSelVenta) {
        articuloventa.gruposelcant.push(
          {
            'id_articulo': idArticulo,
            'id_grupo_seleccion': key.id_grupo,
            'cantidad': key.cantidad,
            'iord': key.imprimir,
            'orimver': key.ver
          }
        );
      }
      this.modificarartoculosService.createArticuloGrupoSeleccionCant(articuloventa.gruposelcant).subscribe(
        resul => {
          if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articulos_grupo_seleccion_cantidad') {
            console.log(resul.text());
          } else {
            console.log('articulos_grupo_seleccion_cantidad creados correctamente');
          }
        }
      );
    }
  }
  /* updateArticuloRecetaCanal(idArticuloRec, data) {
    const articuloreceta = {
      canal: []
    };
    for (const key of data) {
      articuloreceta.canal.push(
        {
          'id_articuloreceta': idArticuloRec,
          'id_canal': key.id_canal
        }
      );
    }
    this.modificarartoculosService.updateArticuloRecetaCanal(articuloreceta.canal, idArticuloRec).subscribe(
      resul => {
        console.log(resul.text());
        if (resul.text() === 'Error') {
          console.log(resul.text());
        } else if (resul.text() === 'exitoso') {
          console.log(resul.text());
        } else if (resul.text() === 'No se pudo crear articuloreceta_canal') {
          console.log(resul.text());
        } else {
          console.log('articuloreceta_canal creados correctamente');
        }
      });
  }


  updateArticuloRecetaIngredientes(idArticuloRec, data) {
    const articuloreceta = {
      ingredientes: []
    };
    for (const key of data) {
      articuloreceta.ingredientes.push(
        {
          'id_articuloreceta': idArticuloRec,
          'id_articulo': key.id_articulo,
          'cantidad': key.cantidad,
          'id_unidad': key.unidad
        }
      );
    }
    this.modificarartoculosService.updateArticuloRecetaIngredientes(articuloreceta.ingredientes, idArticuloRec).subscribe(
      resul => {
        console.log(resul.text());
        if (resul.text() === 'Error') {
          console.log(resul.text());
        } else if (resul.text() === 'exitoso') {
          console.log(resul.text());
        } else if (resul.text() === 'No se pudo crear articuloreceta_ingredientes') {
          console.log(resul.text());
        } else {
          console.log('articuloreceta_ingredientes creados correctamente');
        }
      });
  } */
  updateArticuloEmpaque(datos) {
    // console.log(this.ListaEmpaques);
    const articulo = {
      empaques: []
    };
    if (this.ListaEmpaques.length >= 1) {
      for (const key of this.ListaEmpaques) {
        articulo.empaques.push({
          'articulos': {
            'id': this.idArticulo
          },
          'gruposEmpaque': {
            'id': key.id
          }
        });
      }
      this.modificarartoculosService.updateArticuloEmpaque(articulo.empaques, this.idArticulo).subscribe(
        resul => {
          console.log(resul.text());
          if (resul.text() === 'No se ha podido crear el articulo empaque') {
            console.log(resul.text());
          } else {
            console.log('articulo empaque creados correctamente');
            // this.updateArticuloEmpaqueArticulos(datos.idEmpaque);
          }
        }
      );
    }
  }

  LimpiarFormPuntos() {
    this.TodoPuntos = false;
    this.onChangeAll(this.DataJsonPuntos, false);
    this.ListaPuntosSel = [];
  }

  LimpiarFormMaximosMinimos() {
    this.MaxMinForm.reset();
    this.TodoMaxPuntos = false;
    this.onChangeAllMaximos(this.ListaPuntos, false);
  }

  LimpiarFormUnidadCompra() {
    this.UnidadForm.reset();
    this.faltaConversionCompra = false;
    this.clickTablaUnidades = false;
  }

  LimpiarFormSitios() {
    this.TodoSitios = false;
    this.onChangeAllSitios(this.ListaSitiosAlmacenaje, false);
    this.ListaSitiosSel = [];
    this.ListaSitiosAlmacenaje = [];
  }

  LimpiarFormClases() {
    this.ClasesForm.reset();
  }

  SetClases() {
    this.paraVenta = true;
    this.paraInv = true;
  }
  setGrupos() {
    this.DataNewGrupoClase.paraVenta = true;
    this.DataNewGrupoClase.paraInv = true;
  }

  LimpiarFormGrupos() {
    this.GrupoForm.reset();
  }

  LimpiarFormCanalesVenta() {
    this.TodoCanalesImp = false;
    // this.onChangeAllCanalesVenta(this.DataCanalesImp, false);
    this.ListaCanalesImpSel = [];
  }

  LimpiarFormUnidadPrincipal() {
    this.uniVenForm.reset();
  }

  LimpiarFormUnidadAlternaVenta() {
    this.UnidAltVentaForm.reset();
  }

  LimpiarFormGruposSeleccion() { // para limpiar campo cantidad
    this.GrupoSelForm.reset();
  }

  LimpiarFormGruSeleccion() { // para limpiar todo el formulario
    this.DataGupoSel = [];
    this.GrupoSelForm.reset();
  }

  LimpiarFormGruposSeleccionEdit() {
    this.GrupoSelEditForm.reset();
  }

  LimpiarFormCanalesReceta() {
    this.onChangeAllCanalesReceta(this.DataJsonClienteCanal, false);
    this.ListaCanalRec = [];
  }

  LimpiarFormIngredientes() {
    this.DataIngredientes = [];
    this.IngredientesForm.reset();
  }

  LimpiarFormEmpaques() {
    this.dataEmpaque = [];
  }

  LimpiarFormGrupoEmpaque() {
    this.LoadArticulosEmpaque();
    this.clickImportar = false;
    this.gruposEmpaqueForm.reset();
    this.DataJsonArtGruSel = [];
  }

  LimpiarFormDifCanal() {
    this.difCanalForm.reset();
  }
}
