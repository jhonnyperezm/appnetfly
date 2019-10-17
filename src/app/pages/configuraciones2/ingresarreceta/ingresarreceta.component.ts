import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IngresarrecetaService } from './ingresarreceta.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ingresarreceta',
  templateUrl: './ingresarreceta.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarrecetaService, RutasService]
})
export class IngresarrecetaComponent implements OnInit {

  idArticulo: any;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  DataNewReceta: any = [];
  DataCliente: any = [];
  ListaCanalRec: any = [];
  DataJsonClienteCanal: any = [];
  tablaCanalesReceta = false;
  registrosCanalRec: any = [];
  ListaCanalesReceta: any = [];
  TodoRecCanal: boolean;
  DataArrayClienteCanal: any = [];
  searchStringCanales: any;
  itempageCanales = 5;
  DataJsonArtInventario: any = [];
  DataArrayArtInventario: any = [];
  DataIngredientes: any = [];
  dataEditIngrediente: any = [];
  searchStringArtInv: any;
  itempageArtInv = 5;
  searchStringEditArtInv: any;
  itempageEditArtInv = 5;
  DataArrayUnidades: any = [];

  DataJsonUndKardexIngredientes: any = [];
  DataArrayUndKardexIngredientes: any = [];
  crearCon: boolean;

  ListaIngredientes: any = [];
  registrosIngredientes: any = [];
  // tablaIngredientes: boolean;
  searchStringTIngredientes: any;
  itempageTIngredientes = 5;
  searchStringTCanalReceta: any;
  itempageTCanalReceta = 5;
  nombreArticulo: any;
  /* existeIngrediente = false; */
  DataArrayUnidadesVenta: any = [];
  DataArrayUnidadesKardex: any = [];
  DataArticulo: any = [];
  cantidadRecetas: any;
  ConsultaConversion = true;
  ConsultaConversionEdit = true;
  existeIngrediente = false;
  existeIngredienteEdit = false;

  tcr :number=1;
  ti :number=1;
  mcr :number=1;
  mai :number=1;
  meai :number=1;

  @ViewChild('recetaForm',{static:true})
  private recetaForm: NgForm;

  @ViewChild('IngredientesForm',{static:true})
  private IngredientesForm: NgForm;

  @ViewChild('IngredientesEditForm',{static:true})
  private IngredientesEditForm: NgForm;

  constructor(public router: Router,
    public toastr: ToastrService,
    public ingresarrecetaService: IngresarrecetaService,
    vcr: ViewContainerRef,
    public rutasService: RutasService,
    private route: ActivatedRoute) {
    this.loader = true;
    this.LoadTabla = false;
    this.idArticulo = this.route.snapshot.params.idArticulo;
    this.nombreArticulo = this.route.snapshot.params.nombreArticulo;
    this.cantidadRecetas = this.route.snapshot.params.cantidadRecetas;
  }

  ngOnInit() {
    this.LoadDataCliente();
    this.LoadUnidadesVenta();
    this.LoadUnidadesKardex();
    this.LoadDataArticulo();
    this.LoadCanalesCliente();
    this.LoadArticulosInventario();
    this.LoadUnidadIngredientes();
  }

  Regresar() {
    this.router.navigate(['/configuraciones/articulosreceta/recetasactivas/' + this.idArticulo]);
  }

  kPNumerosPuntos(event: any) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadDataCliente() {
    this.ingresarrecetaService.getDatosCliente().subscribe(
      data => {
        this.DataCliente.receta_dif_canal = data[0].receta_dif_canal;
      }
    );
  }

  LoadDataArticulo() {
    this.ingresarrecetaService.getDatosArticulo(this.idArticulo).subscribe(
      data => {
        console.log(data);
        this.DataArticulo = data[0];
        this.bindingUnidadBase();
      }
    );
  }

  LoadUnidadesVenta() {
    this.ingresarrecetaService.getUnidadesVenta().subscribe(
      data => {
        this.DataArrayUnidadesVenta = data;
        console.log(this.DataArrayUnidadesVenta);
      }
    );
  }

  LoadUnidadesKardex() {
    this.ingresarrecetaService.getUnidadKardex().subscribe(
      data => {
        this.DataArrayUnidadesKardex = data;
        console.log(this.DataArrayUnidadesKardex);
      }
    );
  }


  bindingUnidadBase() {
    if (this.DataArticulo.seleccion) {
      this.DataArrayUnidades = this.DataArrayUnidadesVenta;
    }
    if (this.DataArticulo.venta) {
      this.DataArrayUnidades = this.DataArrayUnidadesVenta;
    }
    if (this.DataArticulo.venta && !this.DataArticulo.inventario) {
      this.DataArrayUnidades = this.DataArrayUnidadesVenta;
    }
    if (!this.DataArticulo.venta && this.DataArticulo.inventario) {
      this.DataArrayUnidades = this.DataArrayUnidadesKardex;
    }
  }

  /* LoadUnidades() {
    this.ingresarrecetaService.getUnidades().subscribe(
      data => {
        this.DataArrayUnidades = data;
      }
    );
  } */

  LoadUnidadIngredientes() {
    this.ingresarrecetaService.getUnidadesIngredientes().subscribe(
      data => {
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
    /* this.ingresarrecetaService.getUnidadEquivalencia(unidadKerdex).subscribe(
      data => {
        this.DataJsonEquivalenciaUnidad = [];
        this.DataArrayEquivalenciaUnidad = data;
        for (const key of this.DataArrayEquivalenciaUnidad) {
          const existeUnidad = this.DataJsonEquivalenciaUnidad.filter(x => parseInt(x.id, 0) === parseInt(key.id, 0));
          if (existeUnidad.length === 0) {
            this.DataJsonEquivalenciaUnidad.push({
              'id': key.id,
              'nombre': key.nombre
            });
          }
        }
      }
    ); */
  }

  LoadCanalesCliente() {
    this.ingresarrecetaService.getCanalesCliente().subscribe(
      data => {
        this.DataArrayClienteCanal = data;
        for (const key of this.DataArrayClienteCanal) {
          this.DataJsonClienteCanal.push({
            'id': key.id,
            'id_canal': key.id_canal,
            'nombre_canal': key.nombre_canal,
            'checkedRec': false
          });
        }

        if (this.DataArrayClienteCanal.length === 1) {
          for (const key of this.DataJsonClienteCanal) {
            this.ListaCanalesReceta.push(
              {
                'id': this.registrosCanalRec.length + 1,
                'id_canal': key.id_canal,
                'nombre': key.nombre_canal
              }
            );
            this.registrosCanalRec.push('registrosCanalRec1');
          }
        } else {
          this.ListaCanalesReceta = [];
        }
        this.loader = false;
        this.LoadTabla = true;
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

  QuitarCanal(datos) {
    for (let i = 0; i < this.ListaCanalesReceta.length; i++) {
      let index;
      if (parseInt(datos.id, 0) === parseInt(this.ListaCanalesReceta[i].id, 0)) {
        index = this.ListaCanalesReceta.indexOf(this.ListaCanalesReceta[i]);
        this.ListaCanalesReceta.splice(index, 1);
      }
    }
    if (this.ListaCanalesReceta.length === 0) {
      this.tablaCanalesReceta = false;
    } else {
      this.tablaCanalesReceta = true;
    }
  }

  LoadArticulosInventario() {
    this.ingresarrecetaService.getArticulosInventario().subscribe(
      data => {
        this.DataArrayArtInventario = data;
        for (const key of this.DataArrayArtInventario) {
          if (key.id_unidad_alterna === 0) {
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
    );
  }

  /* ValidarUnidadIngrediente(Ingrediente) {
    const existeIngrediente = this.DataJsonEquivalenciaUnidad.filter(x => x.nombre === Ingrediente);
    if (existeIngrediente.length === 0) {
      this.existeIngrediente = false;
    } else {
      this.existeIngrediente = true;
    }
  } */

  selUnidadKardex(idArticulo) {
    const existeIngrediente = this.ListaIngredientes.filter(x => parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))
    if (existeIngrediente.length === 0) {
      console.log(this.DataJsonArtInventario);
      console.log(idArticulo);
      this.DataIngredientes.idUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].id_unidad_kardex;

      this.DataIngredientes.nombreUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].nombre_unidad_kardex;

      if (this.DataIngredientes.unidad != null || this.DataIngredientes.unidad != '' || this.DataIngredientes.unidad != undefined) {
        this.consultarTablaConversion(this.DataIngredientes.idUniKardex, this.DataIngredientes.unidad);
      }
      this.existeIngrediente = false;
    } else {
      this.existeIngrediente = true;
      this.toastr.warning('El ingrediente ya existe en la receta', 'Verificar');
    }
  }

  consultarTablaConversion(idUndKardex, idUndIngrediente) {
    console.log(idUndKardex + ' , ' + idUndIngrediente);
    if (idUndIngrediente === '' || idUndIngrediente === null || idUndIngrediente === undefined) {

    } else if (idUndKardex === '' || idUndKardex === null || idUndKardex === undefined) {
      this.toastr.warning('Verificar', 'No ha seleccionado el articulo');
    } else {
      this.ConsultaConversion = true;
      this.DataIngredientes.nom_unidad = this.DataJsonUndKardexIngredientes.filter(x =>
        parseInt(x.id, 0) === parseInt(idUndIngrediente, 0))[0].nombre;

      this.ingresarrecetaService.getTablaConversion(idUndKardex, idUndIngrediente).subscribe(
        data => {
          console.log(data);
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

  clickFilaIngredientes(id) {
    this.DataIngredientes.id_articulo = id.toString();
  }

  MostrarIngredientes(datosIngredientes) {

    const nombreArticulo = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngredientes.id_articulo, 0))[0].nombre_articulo;

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
        operando: datosIngredientes.crearoperando,
        cantidadCompra: datosIngredientes.cantConvCompra
      });

      this.ingresarrecetaService.createTablaConversion(articuloinv.tblConversion).subscribe(
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
      }
      */
      if (datosIngredientes.operando === 'M') {
        cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(datosIngredientes.factor, 0);
      } else if (datosIngredientes.operando === 'D') {
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

    /*  this.ingresarrecetaService.getTablaConversion(idUniKardex, datosIngredientes.unidad).subscribe(
       data => {
         console.log(data);
         let cantidad_cal = 0;
         if (data[0].operando.toUpperCase() === 'M') {
           cantidad_cal = parseInt(datosIngredientes.cantidadIngrediente, 0) * parseInt(data[0].cantidad_compra, 0);
         } else if (data[0].operando.toUpperCase() === 'D'){
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
       });
  */
  }

  BindingIngrediente(datosIngrediente) {
    this.crearCon = false;
    this.ConsultaConversionEdit = false;
    this.dataEditIngrediente = datosIngrediente;
    this.dataEditIngrediente.cantidadIngre = datosIngrediente.cantidad;
    this.dataEditIngrediente.idTablaConversion = datosIngrediente.idTablaConversion;
    // this.dataEditIngrediente.nombre_unidad = datosIngrediente.nom_unidad;

    this.dataEditIngrediente.idUniKardex = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngrediente.id_articulo, 0))[0].id_unidad_kardex;

    this.dataEditIngrediente.nombreUniKardex = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datosIngrediente.id_articulo, 0))[0].nombre_unidad_kardex;

    //this.LoadUnidadEquivalencias(uniKardex);
  }


  selUnidadKardexEdit(idArticulo) {
    const existeIngrediente = this.ListaIngredientes.filter(x => parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))
    if (existeIngrediente.length === 0) {

      console.log(this.DataJsonArtInventario);
      console.log(idArticulo);
      this.dataEditIngrediente.idUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].id_unidad_kardex;

      this.dataEditIngrediente.nombreUniKardex = this.DataJsonArtInventario.filter(x =>
        parseInt(x.id_articulo, 0) === parseInt(idArticulo, 0))[0].nombre_unidad_kardex;

      if (this.dataEditIngrediente.unidad != null || this.dataEditIngrediente.unidad != '' || this.dataEditIngrediente.unidad != undefined) {
        this.consultarTablaConversionEdit(this.dataEditIngrediente.idUniKardex, this.dataEditIngrediente.unidad);
      }
      this.existeIngredienteEdit = false;
    } else {
      this.existeIngredienteEdit = true;
      this.toastr.warning('El ingrediente ya existe en la receta', 'Verificar');
    }
  }

  consultarTablaConversionEdit(idUndKardex, idUndIngrediente) {
    console.log(idUndKardex + ' , ' + idUndIngrediente);
    if (idUndIngrediente === '' || idUndIngrediente === null || idUndIngrediente === undefined) {

    } else if (idUndKardex === '' || idUndKardex === null || idUndKardex === undefined) {
      this.toastr.warning('Verificar', 'No ha seleccionado el articulo');
    } else {
      this.ConsultaConversionEdit = true;
      this.dataEditIngrediente.nom_unidad = this.DataJsonUndKardexIngredientes.filter(x =>
        parseInt(x.id, 0) === parseInt(idUndIngrediente, 0))[0].nombre;

      this.ingresarrecetaService.getTablaConversion(idUndKardex, idUndIngrediente).subscribe(
        data => {
          console.log(data);
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

  clickFilaIngredientesEdit(id) {
    this.dataEditIngrediente.id_articulo = id.toString();
  }

  ModificarIngrediente(datoIngrediente) {

    const nombreArticulo = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datoIngrediente.id_articulo, 0))[0].nombre_articulo;


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
        operando: datoIngrediente.crearoperando,
        cantidadCompra: datoIngrediente.cantConvCompra
      });

      this.ingresarrecetaService.createTablaConversion(articuloinv.tblConversion).subscribe(
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
        cantidad_cal = parseInt(datoIngrediente.cantidadIngrediente, 0) * parseInt(datoIngrediente.factor, 0);
      } else if (datoIngrediente.operando === 'D') {
        cantidad_cal = parseInt(datoIngrediente.cantidadIngrediente, 0) / parseInt(datoIngrediente.factor, 0);
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

    /*  this.ingresarrecetaService.getTablaConversion(idUniKardex, datoIngrediente.unidad).subscribe(
       data => {
         console.log(data);
         let cantidad_cal = 0;
         if (data[0].operando.toUpperCase() === 'M') {
           cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) * parseInt(data[0].cantidad_compra, 0);
         } else if (data[0].operando.toUpperCase() === 'D') {
           cantidad_cal = parseInt(datoIngrediente.cantidadIngre, 0) / parseInt(data[0].cantidad_compra, 0);
         }
         for (let i = 0; i < this.ListaIngredientes.length; i++) {
           if (parseInt(datoIngrediente.id, 0) === this.ListaIngredientes[i].id) {
             this.ListaIngredientes[i].id = datoIngrediente.id;
             this.ListaIngredientes[i].id_articulo = datoIngrediente.id_articulo;
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
    /* if (this.ListaIngredientes.length === 0) {
      this.tablaIngredientes = false;
    } else {
      this.tablaIngredientes = true;
    } */
  }

  onSubmit(datos) {
    if (datos.preparacion === undefined || datos.preparacion === '' || datos.preparacion === null) {
      datos.preparacion = '';
    }
    if (datos.nombreReceta === undefined) {
      datos.nombreReceta = this.nombreArticulo;
    }
    const data = {
      'nombre': datos.nombreReceta,
      'cantidad': datos.cantidadReceta,
      'unidad': {
        'id': datos.idUnidad
      },
      'articulos': {
        'id': this.idArticulo
      },
      'preparacion': datos.preparacion,
      'estado': 1
    };
    if (this.DataCliente.receta_dif_canal === true) {
      this.ingresarrecetaService.createArticuloReceta(data).subscribe(
        resul => {
          if (resul.text() === 'No se ha podido crear el articulo receta') {
            console.log(resul.text());
          } else {
            console.log('ArticuloReceta creados');
            this.router.navigate(['/configuraciones/articulosreceta/recetasactivas/' + this.idArticulo]);
            Swal.fire({
              title: 'Exitoso',
              text: 'La receta fue creada con exito',
              type: 'success',
            });
            this.createArticuloRecetaCanal(resul.text());
            this.createArticuloRecetaIngredientes(resul.text());
            this.createHistoricoIngredientes(resul.text());
          }
        });
    } else {
      console.log(this.cantidadRecetas);
      if (parseInt(this.cantidadRecetas, 0) === 0) {
        this.ingresarrecetaService.createArticuloReceta(data).subscribe(
          resul => {
            if (resul.text() === 'No se ha podido crear el articulo receta') {
              console.log(resul.text());
            } else {
              console.log('ArticuloReceta creados');
              this.router.navigate(['/configuraciones/articulosreceta/recetasactivas/' + this.idArticulo]);
              Swal.fire({
                title: 'Exitoso',
                text: 'La receta fue creada con exito',
                type: 'success',
              });
              this.createArticuloRecetaCanal(resul.text());
              this.createArticuloRecetaIngredientes(resul.text());
              this.createHistoricoIngredientes(resul.text());
            }
          });
      } else {
        this.router.navigate(['/configuraciones/articulosreceta/recetasactivas/' + this.idArticulo]);
        Swal.fire({
          title: 'Error',
          text: 'El articulo ya tiene una receta',
          type: 'error',
        });
      }
    }

  }

  createArticuloRecetaCanal(idArticuloRec) {
    const articuloreceta = {
      canal: []
    };
    for (const key of this.ListaCanalesReceta) {
      articuloreceta.canal.push(
        {
          'id_articuloreceta': idArticuloRec,
          'id_canal': key.id_canal
        }
      );
    }
    this.ingresarrecetaService.createArticuloRecetaCanal(articuloreceta.canal).subscribe(
      resul => {
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

  createArticuloRecetaIngredientes(idArticuloRec) {
    const articuloreceta = {
      ingredientes: []
    };
    for (const key of this.ListaIngredientes) {
      articuloreceta.ingredientes.push(
        {
          'id_articuloreceta': idArticuloRec,
          'id_articulo': key.id_articulo,
          'cantidad': key.cantidad,
          'id_unidad': key.unidad,
          'id_tabla_conversion': key.idTablaConversion,
          'operando': key.operando,
          'factor': key.factor,
          'cantidadCal': key.cantidadCal
        }
      );
    }
    this.ingresarrecetaService.createArticuloRecetaIngredientes(articuloreceta.ingredientes).subscribe(
      resul => {
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
  }

  createHistoricoIngredientes(idArticuloRec) {
    const articuloreceta = {
      ingredientes: []
    };
    for (const key of this.ListaIngredientes) {
      articuloreceta.ingredientes.push(
        {
          'idArticuloPrincipal': this.idArticulo,
          'idArticuloReceta': idArticuloRec,
          'idArticuloOld': key.id_articulo,
          'idArticuloNew': key.id_articulo,
          'cantidad': key.cantidad,
          'idUnidad': key.unidad,
          'borrado': false
        }
      );
    }
    this.ingresarrecetaService.createHistoricoIngredientes(articuloreceta.ingredientes).subscribe(
      resul => {
        if (resul.text() === 'error') {
          console.log(resul.text());
        } else {
          console.log('historico ingredientes creados correctamente');
        }
      }
    );
  }

  LimpiarFormCanalesReceta() {
    this.onChangeAllCanalesReceta(this.DataJsonClienteCanal, false);
    this.ListaCanalRec = [];
  }

  LimpiarFormIngredientes() {
    this.DataIngredientes = [];
    this.IngredientesForm.reset();
  }
}
