import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ModificaringredientesService } from './modificaringredientes.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificaringredientes',
  templateUrl: './modificaringredientes.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificaringredientesService, RutasService]
})
export class ModificaringredientesComponent implements OnInit {

  DataArrayArtInventario: any = [];
  DataJsonArtInventario: any = [];
  searchStringIngre: any;
  itempageIngre = 5;
  DataIngrediente: any = [];
  DataArrayRecetas: any = [];
  DataJsonRecetas: any = [];
  searchStringRec: any;
  itempageRec = 5;
  searchStringIngreNew: any;
  itempageIngreNew = 5;
  DataEditIngrediente: any = [];
  DataJsonEquivalenciaUnidad: any = [];
  DataArrayEquivalenciaUnidad: any = [];
  existeIngrediente: boolean;
  registrosRecetas: any = [];
  // existeIngrediente = true;

  tr :number=1;
  mi :number=1;
  mic :number=1;


  @ViewChild('cambioIngredientesForm',{static:true})
  private cambioIngredientesForm: NgForm;

  constructor(public router: Router,
    public toastr: ToastrService,
    public modificaringredientesService: ModificaringredientesService,
    vcr: ViewContainerRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.LoadArticulosInventario();
  }

  Regresar() {
    this.router.navigate(['/configuraciones/articulosreceta']);
  }

  kPNumerosPuntos(event: any) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadArticulosInventario() {
    this.modificaringredientesService.getArticulosInventario().subscribe(
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

  clickFilaIngrediente(id) {
    this.DataIngrediente.id_articulo = id.toString();
  }

  GuardarIngrediente(idArtIngrediente) {
    console.log(idArtIngrediente);
    console.log(this.DataJsonArtInventario);
    this.DataIngrediente.nombreIngrediente = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(idArtIngrediente, 0))[0].nombre_articulo;
  }

  LoadRecetasIngrediente(DatosIngrediente) {
    this.modificaringredientesService.getRecetasIngrediente(DatosIngrediente.id_articulo).subscribe(
      data => {
        console.log(data);
        this.DataArrayRecetas = data;
        this.DataJsonRecetas = [];
        for (const key of this.DataArrayRecetas) {
          this.DataJsonRecetas.push({
            'id_reg': this.registrosRecetas.length,
            'id': key.id,
            'id_articuloreceta': key.id_articuloreceta,
            'nombre_receta': key.articulo_receta,
            'cantidad_receta': key.cantidad_receta,
            'id_unidad_receta': key.unidad_receta,
            'preparacion': key.preparacion,
            'id_articulo': key.id_articulo,
            'nombre_articulo': key.nombre_articulo,
            'cantidad': key.cantidad,
            'id_unidad_ant': key.id_unidad,
            'nombre_unidad_ant': key.unidad_relacion,
            'id_tabla_conversion': key.id_tabla_conversion,
            'id_articulo_cambio':  key.id_articulo,
            'nombre_articulo_cambio': key.nombre_articulo,
            'id_unidad': key.id_unidad,
            'nombre_unidad_ingrediente': key.unidad_relacion,
            'id_unidad_cambio': key.id_unidad,
            'nombre_unidad_cambio': key.unidad_relacion
          });
          this.registrosRecetas.push('recetas1');
          // this.registrosRecetas.push('receta1');
        }
      }
    );
  }

  BorrarIngrediente(datosIngredientes) {
    console.log(datosIngredientes);

    this.modificaringredientesService.deleteIngredienteReceta(datosIngredientes.id_articulo).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/configuraciones/articulosreceta']);
        if (data.text() === 'success') {
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo de exitosamente',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El proceso NO se realizo de exitosamente',
            type: 'error',
          });
        }
      });
  }

  clickFilaCambioIngre(id) {
    this.DataIngrediente.id_articulo_cambio = id.toString();
  }

  GuardarIngredienteCambio(datos) {
    console.log(datos);
    console.log(this.DataJsonArtInventario);
    this.DataIngrediente.nombreIngrediente_cambio = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datos.id_articulo_cambio, 0))[0].nombre_articulo;

    this.DataIngrediente.id_unidad_kardex_cambio = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datos.id_articulo_cambio, 0))[0].id_unidad_kardex;


    this.DataIngrediente.nombre_unidad_kardex_cambio = this.DataJsonArtInventario.filter(x =>
      parseInt(x.id_articulo, 0) === parseInt(datos.id_articulo_cambio, 0))[0].nombre_unidad_kardex;

    /* this.DataIngrediente.idTablaConversionNew = this.consultarTablaConversion(this.DataIngrediente.id_unidad_kardex_cambio,
      this.DataIngrediente.id_unidad_kardex_cambio); */
    this.LoadUnidadEquivalencias(this.DataIngrediente.id_unidad_kardex_cambio);
    this.LoadRecetasIngredienteCambio(this.DataIngrediente);
  }

  LoadRecetasIngredienteCambio(DatosIngrediente) {
    console.log(DatosIngrediente);
    let idTablaConversionNew;

    this.modificaringredientesService.getTablaConversion(DatosIngrediente.id_unidad_kardex_cambio,
      DatosIngrediente.id_unidad_kardex_cambio).subscribe(
        data => {
          console.log(data);
          if (data.length >= 1) {
            idTablaConversionNew = data[0].id;
          }

          this.modificaringredientesService.getRecetasIngrediente(DatosIngrediente.id_articulo).subscribe(
            data2 => {
              console.log(data2);
              this.DataArrayRecetas = data2;
              this.DataJsonRecetas = [];
               for (const key of this.DataArrayRecetas) {
                this.DataJsonRecetas.push({
                  'id_reg': this.registrosRecetas.length,
                  'id': key.id,
                  'id_articuloreceta': key.id_articuloreceta,
                  'nombre_receta': key.articulo_receta,
                  'cantidad_receta': key.cantidad_receta,
                  'id_unidad_receta': key.unidad_receta,
                  'preparacion': key.preparacion,
                  'id_articulo': key.id_articulo,
                  'nombre_articulo': key.nombre_articulo,
                  'cantidad': key.cantidad,
                  'id_unidad_ant': key.id_unidad,
                  'nombre_unidad_ant': key.unidad_relacion,
                  'id_tabla_conversion': key.id_tabla_conversion,
                  'id_articulo_cambio': DatosIngrediente.id_articulo_cambio,
                  'nombre_articulo_cambio': DatosIngrediente.nombreIngrediente_cambio,
                  'nombre_unidad_kardex_cambio': DatosIngrediente.nombre_unidad_kardex_cambio,
                  'id_unidad_kardex_cambio': DatosIngrediente.id_unidad_kardex_cambio,
                  'id_unidad_cambio': DatosIngrediente.id_unidad_kardex_cambio,
                  'nombre_unidad_cambio': DatosIngrediente.nombre_unidad_kardex_cambio,
                  'idTablaConversionNew': idTablaConversionNew
                });
                this.registrosRecetas.push('recetas1');
              }
              console.log(this.DataJsonRecetas);
            }
          );
        }
      );
    /* this.modificaringredientesService.getRecetasIngrediente(DatosIngrediente.id_articulo).subscribe(
      data => {
        console.log(data);
        this.DataArrayRecetas = data;
        this.DataJsonRecetas = [];
         for (const key of this.DataArrayRecetas) {
          this.DataJsonRecetas.push({
            'nombre_receta': key.articulo_receta,
            'cantidad': key.cantidad,
            'cantidad_receta': key.cantidad_receta,
            'id': key.id,
            'id_articulo': key.id_articulo,
            'id_articuloreceta': key.id_articuloreceta,
            'id_tabla_conversion': key.id_tabla_conversion,
            'id_unidad': key.id_unidad,
            'nombre_articulo': key.nombre_articulo,
            'preparacion': key.preparacion,
            'id_unidad_receta': key.unidad_receta,
            'nombre_unidad_ingrediente': key.unidad_relacion,
            'id_articulo_cambio': DatosIngrediente.id_articulo_cambio,
            'nombre_articulo_cambio': DatosIngrediente.nombreIngrediente_cambio,
            'id_unidad_kardex_cambio': DatosIngrediente.id_unidad_kardex_cambio,
            'nombre_unidad_kardex_cambio': DatosIngrediente.nombre_unidad_kardex_cambio,
            'idTablaConversionNew': DatosIngrediente.idTablaConversionNew
          });
        }

        console.log(this.DataJsonRecetas);
      }
    ); */
  }

  /* consultarTablaConversion(unidad_kardex, unidad_compra) {
    console.log(unidad_kardex);
    console.log(unidad_compra);
    this.modificaringredientesService.getTablaConversion(unidad_kardex, unidad_compra).subscribe(
      data => {
        console.log(data);
        if (data.length >= 1) {
          console.log(data[0].id);
          return data[0].id;
        } else {
          return 0;
        }
      }
    );

  } */

  /* CrearTablaConversion(unidad_kardex, cant_kardex, unidad_compra, factor, cantidad) {
    const articuloinv = {
      tblConversion: []
    };
    articuloinv.tblConversion.push({
      'unidadByIdUnidadKardex': {
        'id': unidad_kardex
      },
      'cantidadKardex': cant_kardex,
      'unidadByIdUnidadCompra': {
        'id': unidad_compra
      },
      'factor': factor,
      'cantidadCompra': cantidad
    });

    this.modificaringredientesService.createTablaConversion(articuloinv.tblConversion).subscribe(
      data => {

      }
    );
  } */

  bindingModificarIngrediente(datosRecetaIngrediente) {
    console.log(datosRecetaIngrediente);
    this.DataEditIngrediente = datosRecetaIngrediente;
    this.ValidarUnidadIngrediente(datosRecetaIngrediente.nombre_unidad_ingrediente);
  }

  LoadUnidadEquivalencias(unidadKardex) {
    this.modificaringredientesService.getUnidadEquivalencia(unidadKardex).subscribe(
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
    );
  }

  ValidarUnidadIngrediente(Ingrediente) {
    const existeIngrediente = this.DataJsonEquivalenciaUnidad.filter(x => x.nombre === Ingrediente);
    if (existeIngrediente.length === 0) {
      this.existeIngrediente = false;
    } else {
      this.existeIngrediente = true;
    }
  }

  ModificarIngrediente(datosIngrediente) {
    console.log(datosIngrediente);

    datosIngrediente.id_unidad_cambio = this.DataJsonEquivalenciaUnidad.filter(x =>
      x.nombre === datosIngrediente.nombre_unidad_cambio)[0].id;


    this.modificaringredientesService.getTablaConversion(datosIngrediente.id_unidad_kardex_cambio,
      datosIngrediente.id_unidad_cambio).subscribe(
      data => {
        for (let i = 0; i < this.DataJsonRecetas.length; i++) {
          if (datosIngrediente.id_reg === this.DataJsonRecetas[i].id_reg) {
            this.DataJsonRecetas[i].id_unidad_cambio = datosIngrediente.id_unidad_cambio;
            this.DataJsonRecetas[i].cantidad = datosIngrediente.cantidad;
            this.DataJsonRecetas[i].nombre_unidad_cambio = datosIngrediente.nombre_unidad_cambio;
            this.DataJsonRecetas[i].idTablaConversionNew = data[0].id;
          }
        }
      });
  }

  Cambiar(datosRecetas) {
    console.log(datosRecetas);
    const receta = {
      ingredientes: []
    };
    for (const key of datosRecetas) {
      receta.ingredientes.push({
        'id': key.id,
        'id_articuloreceta': key.id_articuloreceta,
        'id_articulo': key.id_articulo_cambio,
        'cantidad': key.cantidad,
        'id_unidad': key.id_unidad_cambio,
        'id_tabla_conversion': key.idTablaConversionNew
      });
    }

    this.modificaringredientesService.updateArticulosIngredientes(receta.ingredientes).subscribe(
      data => {
        console.log(data);

        this.router.navigate(['/configuraciones/articulosreceta']);
        if (data.text() === 'success') {
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo de exitosamente',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El proceso NO se realizo de exitosamente',
            type: 'error',
          });
        }
      }
    );
  }

  crearHistorico(datosRecetas, DatosIngrediente, borrado) {
    console.log(datosRecetas);
    const receta = {
      ingredientes: []
    };
    for (const key of datosRecetas) {
      receta.ingredientes.push({
        'idArticuloReceta': key.id_articuloreceta,
        'idArticuloOld': key.id_articulo,
        'idArticuloNew': key.id_articulo_cambio,
        'idUnidad': key.id_unidad_cambio,
        'cantidad': key.cantidad,
        'borrado': borrado,
        'idArticuloPrincipal': DatosIngrediente.id_articulo
      });
    }

    this.modificaringredientesService.postHistoricoIngredientes(receta.ingredientes).subscribe(
      data => {
        console.log(data);

        this.router.navigate(['/configuraciones/articulosreceta']);
        if (data.text() === 'success') {
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo de exitosamente',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El proceso NO se realizo de exitosamente',
            type: 'error',
          });
        }
      }
    );
  }

  LimpiarTablaRecetas() {
    this.DataJsonRecetas = [];
  }
}
