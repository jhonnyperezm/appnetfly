import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModificargruposeleccionService} from './modificargruposeleccion.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificargruposeleccion',
  templateUrl: './modificargruposeleccion.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificargruposeleccionService]
})
export class ModificargruposeleccionComponent implements OnInit {

  idGrupo: any;
  nombreGrupo: any;
  searchStringArt: any;
  itempageArt = 5;
  tart: number=1;
  DataArrayGrupos: any = [];
  DataNewGrupo: any = [];
  DataNewArticulo: any = [];
  DataEditArticulo: any = [];
  DataJsonArticulos: any = [];
  DataJsonArticulosGrupo: any = [];
  DataArrayArticulos: any = [];

  searchStringTablaArt: any;
  itempageTablaArt = 5;
  tblArticulos: any = [];

  DataArrayArticulosGrupo: any = [];
  tablaArticulosGrupo = false;

  nombreEliminar: any;
  idEliminar: any;
  art: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              public modificargruposeleccionService: ModificargruposeleccionService,
              private route: ActivatedRoute) {
    this.idGrupo = this.route.snapshot.params.idGrupo;
    this.nombreGrupo = this.route.snapshot.params.nombreGrupo;
    this.DataNewArticulo.incarticulo = 0;
    this.DataNewArticulo.receta = false;
    this.DataNewArticulo.inventario = false;
    this.DataNewArticulo.descargaKardex = 0;
  }

  ngOnInit() {
    this.LoadDataGrupo();
    this.LoadDataArticulosGrupo();
    this.LoadArticulosSeleccion();
  }

  Regresar() {
    this.router.navigate(['configuraciones2/gruposseleccion']);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  kPNumerosPunto(event: any) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadDataGrupo() {
    this.modificargruposeleccionService.getGrupo(this.idGrupo).subscribe(
      data => {
        console.log(data);
        this.DataArrayGrupos = data[0];
        if (this.DataArrayGrupos.incremento_articulo === true) {
          this.DataNewGrupo.caracteristica = 1;
        } else if (this.DataArrayGrupos.incremento_grupo === true) {
          this.DataNewGrupo.caracteristica = 2;
        } else if (this.DataArrayGrupos.precio_mas_alto === true) {
          this.DataNewGrupo.caracteristica = 3;
        } else if (this.DataArrayGrupos.no_aplica === true) {
          this.DataNewGrupo.caracteristica = 4;
        }

        if (this.DataArrayGrupos.tipo_seleccion === true) {
          this.DataNewGrupo.tiposel = 1;
        } else {
          this.DataNewGrupo.tiposel = 0;
        }

        if (this.DataArrayGrupos.maneja_orden === true) {
          this.DataNewGrupo.manOrden = 1;
        } else {
          this.DataNewGrupo.manOrden = 0;
        }

        this.DataNewGrupo.nombre = this.DataArrayGrupos.nombre;
        this.DataNewGrupo.valorincgrupo = this.DataArrayGrupos.valor_incremento;
        this.DataNewGrupo.creado_por = this.DataArrayGrupos.creado_por;
        this.DataNewGrupo.estado = this.DataArrayGrupos.estado;
        this.DataNewGrupo.fecha_creacion = this.DataArrayGrupos.fecha_creacion;
        this.DataNewGrupo.id = this.DataArrayGrupos.id;
        this.DataNewGrupo.cord = this.DataArrayGrupos.cord;
      }
    );
  }

  LoadDataArticulosGrupo() {
    this.modificargruposeleccionService.getArticulosGrupo(this.idGrupo).subscribe(
      data => {
        this.DataArrayArticulosGrupo = data;
        for (const key of this.DataArrayArticulosGrupo) {
          this.DataJsonArticulosGrupo.push({
            'id_tabla': this.tblArticulos.length + 1,
            'id_articulo': key.id_articulo.toString(),
            'nombre': key.nombre,
            'descarga_kardex': key.descarga_kardex,
            'id_unidad_kardex': key.id_unidad_kardex,
            'nombre_uni_kardex': key.unidad_kardex,
            'incremento': key.incrementa,
            'id_unidad_venta': key.id_unidad_venta,
            'nombre_uni_venta': key.unidad_venta,
            'imprimir': key.iord,
            'ver': key.orimver
          });
          this.tblArticulos.push('articulos1');
          if (this.DataJsonArticulosGrupo.length !== 0) {
            this.tablaArticulosGrupo = true;
          } else {
            this.tablaArticulosGrupo = false;
          }
        }
      }
    );
  }

  LoadArticulosSeleccion() {
    this.modificargruposeleccionService.getArticulosSeleccion().subscribe(
      data => {
        this.DataArrayArticulos = data;
        this.DataJsonArticulos = [];
        for (const key of this.DataArrayArticulos) {
          this.DataJsonArticulos.push({
            'id': key.id,
            'nombre': key.nombre,
            'id_unidad_venta': key.id_unidad_venta,
            'nombre_venta': key.nombre_venta,
            'id_unidad_kardex': key.id_unidad_kardex,
            'nombre_kardex': key.nombre_kardex,
            'receta': key.receta,
            'inventario': key.inventario
          });
        }
      }
    );
  }

  cargarUnidadKardex(idArt) {
    const nomUniKardex = this.DataJsonArticulos.filter(x => x.id === parseInt(idArt, 0))[0].nombre_kardex;
    this.DataNewArticulo.unikardex = nomUniKardex;
    this.DataNewArticulo.receta = this.DataJsonArticulos.filter(x => x.id === parseInt(idArt, 0))[0].receta;
    this.DataNewArticulo.inventario = this.DataJsonArticulos.filter(x => x.id === parseInt(idArt, 0))[0].inventario;

    this.DataEditArticulo.nom_uni_kard = nomUniKardex;
    this.DataEditArticulo.receta = this.DataJsonArticulos.filter(x => x.id === parseInt(idArt, 0))[0].receta;
    this.DataEditArticulo.inventario = this.DataJsonArticulos.filter(x => x.id === parseInt(idArt, 0))[0].inventario;
  }

  clickFila(id) {
    this.DataNewArticulo.id_articulo = id.toString();
  }

  MostrarArticuloSel(DataArticulo) {
    const nombreArt = this.DataJsonArticulos.filter(x => x.id === parseInt(DataArticulo.id_articulo, 0))[0].nombre;
    const idUniKardex = this.DataJsonArticulos.filter(x => x.id === parseInt(DataArticulo.id_articulo, 0))[0].id_unidad_kardex;
    const nomUniKardex = this.DataJsonArticulos.filter(x => x.id === parseInt(DataArticulo.id_articulo, 0))[0].nombre_kardex;
    const idUniVenta = this.DataJsonArticulos.filter(x => x.id === parseInt(DataArticulo.id_articulo, 0))[0].id_unidad_venta;
    const nomUniVenta = this.DataJsonArticulos.filter(x => x.id === parseInt(DataArticulo.id_articulo, 0))[0].nombre_venta;

    const existe = this.DataJsonArticulosGrupo.filter(x => parseInt(x.id_articulo, 0) === parseInt(DataArticulo.id_articulo, 0));
    if (existe.length === 0) {

      this.DataJsonArticulosGrupo.push({
        'id_tabla': this.tblArticulos.length + 1,
        'id_articulo': DataArticulo.id_articulo,
        'nombre': nombreArt,
        'descarga_kardex': DataArticulo.descargaKardex,
        'id_unidad_kardex': idUniKardex,
        'nombre_uni_kardex': nomUniKardex,
        'incremento': DataArticulo.incarticulo,
        'id_unidad_venta': idUniVenta,
        'nombre_uni_venta': nomUniVenta,
        'imprimir': this.tblArticulos.length + 1,
        'ver': this.tblArticulos.length + 1
      });
      this.tblArticulos.push('articulos1');
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El articulo ya existe para el grupo',
        type: 'error',
      });
    }
    if (this.DataJsonArticulosGrupo.length !== 0) {
      this.tablaArticulosGrupo = true;
    } else {
      this.tablaArticulosGrupo = false;
    }
  }

  BindingDataArticulo(datosArticulo) {
    this.DataEditArticulo = datosArticulo;
    this.DataEditArticulo.id_art = datosArticulo.id_articulo;
    this.DataEditArticulo.des_kard = datosArticulo.descarga_kardex;
    this.DataEditArticulo.nom_uni_kard = datosArticulo.nombre_uni_kardex;
    this.DataEditArticulo.id_uni_kard = datosArticulo.id_unidad_kardex;
    this.DataEditArticulo.incre = datosArticulo.incremento;
    this.idEliminar = datosArticulo.id_tabla;
    this.nombreEliminar = datosArticulo.nombre;
    this.cargarUnidadKardex(this.DataEditArticulo.id_art);
  }

  ModificarArticulo(DatosArticulo) {
    const nombreArt = this.DataJsonArticulos.filter(x => x.id === parseInt(DatosArticulo.id_art, 0))[0].nombre;
    const idUniKardex = this.DataJsonArticulos.filter(x => x.id === parseInt(DatosArticulo.id_art, 0))[0].id_unidad_kardex;
    const nomUniKardex = this.DataJsonArticulos.filter(x => x.id === parseInt(DatosArticulo.id_art, 0))[0].nombre_kardex;
    const idUniVenta = this.DataJsonArticulos.filter(x => x.id === parseInt(DatosArticulo.id_art, 0))[0].id_unidad_venta;
    const nomUniVenta = this.DataJsonArticulos.filter(x => x.id === parseInt(DatosArticulo.id_art, 0))[0].nombre_venta;

    for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
      if (parseInt(DatosArticulo.id_tabla, 0) === this.DataJsonArticulosGrupo[i].id_tabla) {
        this.DataJsonArticulosGrupo[i].id_tabla = DatosArticulo.id_tabla;
        this.DataJsonArticulosGrupo[i].id_articulo = DatosArticulo.id_art;
        /* this.DataJsonArticulosGrupo[i].id_tabla_conversion = data.text(); */
        this.DataJsonArticulosGrupo[i].nombre = nombreArt;
        this.DataJsonArticulosGrupo[i].descarga_kardex = DatosArticulo.des_kard;
        this.DataJsonArticulosGrupo[i].id_unidad_kardex = idUniKardex;
        this.DataJsonArticulosGrupo[i].nombre_uni_kardex = nomUniKardex;
        this.DataJsonArticulosGrupo[i].incremento = DatosArticulo.incre;
        this.DataJsonArticulosGrupo[i].id_unidad_venta = idUniVenta;
        this.DataJsonArticulosGrupo[i].nombre_uni_venta = nomUniVenta;
        this.DataJsonArticulosGrupo[i].imprimir = DatosArticulo.imprimir;
        this.DataJsonArticulosGrupo[i].ver = DatosArticulo.ver;
      }
    }
  }

  QuitarArticulo(idTabla) {
    for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
      let index;
      if (parseInt(idTabla, 0) === parseInt(this.DataJsonArticulosGrupo[i].id_tabla, 0)) {
        index = this.DataJsonArticulosGrupo.indexOf(this.DataJsonArticulosGrupo[i]);
        this.DataJsonArticulosGrupo.splice(index, 1);
      }
    }
  }

  Ascender(datos) {
    console.log(datos);
    const registro_anterior: any = {};

    for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
      let index;
      if (parseInt(datos.id_tabla, 0) === parseInt(this.DataJsonArticulosGrupo[i].id_tabla, 0)) {
        index = this.DataJsonArticulosGrupo.indexOf(this.DataJsonArticulosGrupo[i]);
        console.log(index);
        if (index >= 1) {
          registro_anterior.id_articulo = this.DataJsonArticulosGrupo[index - 1].id_articulo;
          registro_anterior.nombre = this.DataJsonArticulosGrupo[index - 1].nombre;
          registro_anterior.descarga_kardex = this.DataJsonArticulosGrupo[index - 1].descarga_kardex;
          registro_anterior.id_unidad_kardex = this.DataJsonArticulosGrupo[index - 1].id_unidad_kardex;
          registro_anterior.nombre_uni_kardex = this.DataJsonArticulosGrupo[index - 1].nombre_uni_kardex;
          registro_anterior.incremento = this.DataJsonArticulosGrupo[index - 1].incremento;
          registro_anterior.id_unidad_venta = this.DataJsonArticulosGrupo[index - 1].id_unidad_venta;
          registro_anterior.nombre_uni_venta = this.DataJsonArticulosGrupo[index - 1].nombre_uni_venta;
          registro_anterior.imprimir = this.DataJsonArticulosGrupo[index - 1].imprimir;
          registro_anterior.ver = this.DataJsonArticulosGrupo[index - 1].ver;

          console.log(registro_anterior);
          console.log(registro_anterior.nombre);
          this.DataJsonArticulosGrupo[index - 1].id_articulo = datos.id_articulo;
          this.DataJsonArticulosGrupo[index - 1].nombre = datos.nombre;
          this.DataJsonArticulosGrupo[index - 1].descarga_kardex = datos.descarga_kardex;
          this.DataJsonArticulosGrupo[index - 1].id_unidad_kardex = datos.id_unidad_kardex;
          this.DataJsonArticulosGrupo[index - 1].nombre_uni_kardex = datos.nombre_uni_kardex;
          this.DataJsonArticulosGrupo[index - 1].incremento = datos.incremento;
          this.DataJsonArticulosGrupo[index - 1].id_unidad_venta = datos.id_unidad_venta;
          this.DataJsonArticulosGrupo[index - 1].nombre_uni_venta = datos.nombre_uni_venta;
          this.DataJsonArticulosGrupo[index - 1].imprimir = datos.imprimir - 1;
          this.DataJsonArticulosGrupo[index - 1].ver = datos.ver - 1;

          this.DataJsonArticulosGrupo[index].id_articulo = registro_anterior.id_articulo;
          this.DataJsonArticulosGrupo[index].nombre = registro_anterior.nombre;
          this.DataJsonArticulosGrupo[index].descarga_kardex = registro_anterior.descarga_kardex;
          this.DataJsonArticulosGrupo[index].id_unidad_kardex = registro_anterior.id_unidad_kardex;
          this.DataJsonArticulosGrupo[index].nombre_uni_kardex = registro_anterior.nombre_uni_kardex;
          this.DataJsonArticulosGrupo[index].incremento = registro_anterior.incremento;
          this.DataJsonArticulosGrupo[index].id_unidad_venta = registro_anterior.id_unidad_venta;
          this.DataJsonArticulosGrupo[index].nombre_uni_venta = registro_anterior.nombre_uni_venta;
          this.DataJsonArticulosGrupo[index].imprimir = registro_anterior.imprimir + 1;
          this.DataJsonArticulosGrupo[index].ver = registro_anterior.ver + 1;
        }
      }
    }
  }

  Descender(datos) {
    console.log(datos);
    const registro_siguiente: any = {};

    for (let i = 0; i < this.DataJsonArticulosGrupo.length; i++) {
      let index;
      if (parseInt(datos.id_tabla, 0) === parseInt(this.DataJsonArticulosGrupo[i].id_tabla, 0)) {
        index = this.DataJsonArticulosGrupo.indexOf(this.DataJsonArticulosGrupo[i]);
        console.log(index);
        if (index < this.DataJsonArticulosGrupo.length) {
          registro_siguiente.id_articulo = this.DataJsonArticulosGrupo[index + 1].id_articulo;
          registro_siguiente.nombre = this.DataJsonArticulosGrupo[index + 1].nombre;
          registro_siguiente.descarga_kardex = this.DataJsonArticulosGrupo[index + 1].descarga_kardex;
          registro_siguiente.id_unidad_kardex = this.DataJsonArticulosGrupo[index + 1].id_unidad_kardex;
          registro_siguiente.nombre_uni_kardex = this.DataJsonArticulosGrupo[index + 1].nombre_uni_kardex;
          registro_siguiente.incremento = this.DataJsonArticulosGrupo[index + 1].incremento;
          registro_siguiente.id_unidad_venta = this.DataJsonArticulosGrupo[index + 1].id_unidad_venta;
          registro_siguiente.nombre_uni_venta = this.DataJsonArticulosGrupo[index + 1].nombre_uni_venta;
          registro_siguiente.imprimir = this.DataJsonArticulosGrupo[index + 1].imprimir;
          registro_siguiente.ver = this.DataJsonArticulosGrupo[index + 1].ver;

          console.log(registro_siguiente);
          console.log(registro_siguiente.nombre);
          this.DataJsonArticulosGrupo[index + 1].id_articulo = datos.id_articulo;
          this.DataJsonArticulosGrupo[index + 1].nombre = datos.nombre;
          this.DataJsonArticulosGrupo[index + 1].descarga_kardex = datos.descarga_kardex;
          this.DataJsonArticulosGrupo[index + 1].id_unidad_kardex = datos.id_unidad_kardex;
          this.DataJsonArticulosGrupo[index + 1].nombre_uni_kardex = datos.nombre_uni_kardex;
          this.DataJsonArticulosGrupo[index + 1].incremento = datos.incremento;
          this.DataJsonArticulosGrupo[index + 1].id_unidad_venta = datos.id_unidad_venta;
          this.DataJsonArticulosGrupo[index + 1].nombre_uni_venta = datos.nombre_uni_venta;
          this.DataJsonArticulosGrupo[index + 1].imprimir = datos.imprimir + 1;
          this.DataJsonArticulosGrupo[index + 1].ver = datos.ver + 1;


          this.DataJsonArticulosGrupo[index].id_articulo = registro_siguiente.id_articulo;
          this.DataJsonArticulosGrupo[index].nombre = registro_siguiente.nombre;
          this.DataJsonArticulosGrupo[index].descarga_kardex = registro_siguiente.descarga_kardex;
          this.DataJsonArticulosGrupo[index].id_unidad_kardex = registro_siguiente.id_unidad_kardex;
          this.DataJsonArticulosGrupo[index].nombre_uni_kardex = registro_siguiente.nombre_uni_kardex;
          this.DataJsonArticulosGrupo[index].incremento = registro_siguiente.incremento;
          this.DataJsonArticulosGrupo[index].id_unidad_venta = registro_siguiente.id_unidad_venta;
          this.DataJsonArticulosGrupo[index].nombre_uni_venta = registro_siguiente.nombre_uni_venta;
          this.DataJsonArticulosGrupo[index].imprimir = registro_siguiente.imprimir - 1;
          this.DataJsonArticulosGrupo[index].ver = registro_siguiente.ver - 1;
        }
      }
    }
  }

  onSubmit(DatosGrupo) {
    let incrementoArt = 0;
    let incrementoGrupo = 0;
    let precioMasAlto = 0;
    let noAplica = 0;
    let cord;
    if (DatosGrupo.caracteristica === 1) {
      incrementoArt = 1;
    } else if (DatosGrupo.caracteristica === 2) {
      incrementoGrupo = 1;
    } else if (DatosGrupo.caracteristica === 3) {
      precioMasAlto = 1;
    } else if (DatosGrupo.caracteristica === 4) {
      noAplica = 1;
    }

    if (DatosGrupo.manOrden === 1) {

      cord = 'M';
    } else {
      cord = '';

    }

    const data = {
      'id': DatosGrupo.id,
      'nombre': DatosGrupo.nombre,
      'incrementoArticulo': incrementoArt,
      'incrementoGrupo': incrementoGrupo,
      'precioMasAlto': precioMasAlto,
      'noAplica': noAplica,
      'valorIncremento': DatosGrupo.valorincgrupo,
      'tipoSeleccion': DatosGrupo.tiposel,
      'creadoPor': DatosGrupo.creado_por,
      'estado': DatosGrupo.estado,
      'fechaCreacion': DatosGrupo.fecha_creacion,
      'manejaOrden': DatosGrupo.manOrden,
      'cord': cord
    };

    this.modificargruposeleccionService.updateGrupoSeleccion(data).subscribe(
      resul => {
        if (resul.text() === 'No se ha podido crear el grupo de seleccion') {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido modificar el grupo de seleccion',
            type: 'error',
          });
        } else {
          this.updateArticulosGrupo(data);
          this.router.navigate(['configuraciones2/gruposseleccion']);
          Swal.fire({
            title: 'Grupo de seleccion',
            text: 'Se modifico el grupo de seleccion con exito',
            type: 'success',
          });
        }
      }
    );
  }

  updateArticulosGrupo(datos) {
    const Grupo = {
      articulo: []
    };
    for (const key of this.DataJsonArticulosGrupo) {
      let incremento = 0;
      if (datos.incrementoArticulo === 1) {
        incremento = key.incremento;
      } else if (datos.incrementoGrupo === 1) {
        incremento = 0;
      }
      Grupo.articulo.push(
        {
          'id_articulo': key.id_articulo,
          'id_grupo_seleccion': this.idGrupo,
          'descarga_kardex': key.descarga_kardex,
          'incrementa': incremento,
          'iord': key.imprimir,
          'orimver': key.ver
        });
    }
    this.modificargruposeleccionService.updateGrupoArticulo(Grupo.articulo, this.idGrupo).subscribe(
      resul => {
        if (resul.text() === 'success') {
          console.log('success');
        } else if (resul.text() === 'no se pudo crear Articulo Grupo Seleccion') {
          console.log('no se pudo crear Articulo Grupo Seleccion');
        } else {
          console.log('grupo articulos creados');
        }
      });
  }

  LimpiarFormArticulos() {
    this.DataNewArticulo = [];
    this.DataNewArticulo.incarticulo = 0;
    this.DataNewArticulo.receta = false;
    this.DataNewArticulo.inventario = false;
    this.DataNewArticulo.descargaKardex = 0;
  }
}
