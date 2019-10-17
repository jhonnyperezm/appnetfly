import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {AsignarproductosService} from './asignarproductos.service';

@Component({
  selector: 'app-asignarproductos',
  templateUrl: './asignarproductos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [AsignarproductosService, SidebarComponent]
})
export class AsignarproductosComponent implements OnInit {

  asignarPuntos: any;
  cambioDatos: any;
  DataAsignacion: any = [];
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  DataArrayPuntos: any = [];
  DataJsonPuntos: any = [];
  searchStringPuntos: any;
  itempagePuntos = 5;
  searchStringPuntosCopy: any;
  itempagePuntosCopy = 5;
  searchStringClases: any;
  itempageClases = 5;
  DataArrayClases: any = [];
  DataJsonClases: any = [];
  ListaClasesSel: any = [];
  ListaClases: any = [];
  searchStringTClases: any;
  itempageTClases = 5;
  DataArrayGrupos: any = [];
  DataJsonGrupos: any = [];
  searchStringGrupos: any;
  itempageGrupos = 5;
  ListaGruposSel: any = [];
  ListaGrupos: any = [];
  searchStringTGrupos: any;
  itempageTGrupos = 5;
  confirmacion: any;
  msjConfirmacion: any;

  DataArrayClasesCambio: any = [];
  DataJsonClasesCambio: any = [];
  DataCambio: any = [];
  ListaClasesCambioSel: any = [];
  /* ListaClasesCambio: any = []; */
  DataArrayGruposCambio: any = [];
  DataJsonGruposCambio: any = [];
  ListaGruposCambioSel: any = [];
  ListaGruposCambio: any = [];
  DataArrayArtClase: any = [];
  DataArrayArtGrupo: any = [];

  tc :number=1;
  tg :number=1;
  mp :number=1;
  mpc :number=1;
  mc :number=1;
  mg :number=1;

  @ViewChild('asignarProductosForm', {static: true})
  public asignarProductosForm: NgForm;

  @ViewChild('articulosForm', {static: false})
  public articulosForm: NgForm;

  @ViewChild('cambioDatosForm', {static: true})
  public cambioDatosForm: NgForm;

  @ViewChild('asignarForm', {static: true})
  public asignarForm: NgForm;

  constructor(public router: Router, public asignarproductosService: AsignarproductosService,
              public toastr: ToastrService,
              public sidebarComponent: SidebarComponent) {
    this.loader = true;
    this.LoadTabla = false;
    this.asignarPuntos = false;
    this.cambioDatos = false;
  }

  ngOnInit() {
    this.LoadPuntos();
    this.LoadClases();
    this.LoadClasesCambio();
  }

  Regresar() {
    this.router.navigate(['configuracion/articulos']);
  }

  clickAP() {
    this.asignarPuntos = !this.asignarPuntos;
    this.cambioDatos = false;
  }

  clickCD() {
    this.cambioDatos = !this.cambioDatos;
    this.asignarPuntos = false;
  }

  LoadPuntos() {
    this.asignarproductosService.getPuntos().subscribe(
      data => {
        console.log(data);
        this.DataJsonPuntos = [];
        this.DataArrayPuntos = data;
        for (const key of this.DataArrayPuntos) {
          this.DataJsonPuntos.push({
            'idPunto': key.idPunto,
            'nombre': key.nombre
          });
        }
        console.log(this.DataJsonPuntos);
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

  clickFilaPuntoOp(id) {
    this.DataAsignacion.id_punto_operacion = id.toString();
  }

  guardarPuntoOperacion(id_punto_operacion) {
    this.DataAsignacion.puntooperacion = this.DataJsonPuntos.filter(x =>
      parseInt(x.idPunto, 0) === parseInt(id_punto_operacion, 0))[0].nombre;
  }

  clickFilaPuntoCop(id) {
    this.DataAsignacion.id_punto_copiar = id.toString();
  }

  guardarPuntoCopiar(id_punto_copiar) {
    this.DataAsignacion.puntocopiar = this.DataJsonPuntos.filter(x =>
      parseInt(x.idPunto, 0) === parseInt(id_punto_copiar, 0))[0].nombre;
  }

  LoadClases() {
    this.asignarproductosService.getClases().subscribe(
      data => {
        console.log(data);
        this.DataArrayClases = data;
        for (const key of this.DataArrayClases) {
          this.DataJsonClases.push({
            'id': key.id,
            'nombre': key.nombre,
            'checked': false
          });
        }
      }
    );
  }

  onChangeClases(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaClasesSel.filter(x => parseInt(x.id, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.ListaClasesSel.push(
          {
            'id': data.id,
            'nombre': data.nombre,
            'checked': false
          });
      }
    } else {
      for (let i = 0; i < this.ListaClasesSel.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.ListaClasesSel[i].id, 0) && isChecked === false) {
          index = this.ListaClasesSel.indexOf(this.ListaClasesSel[i]);
          this.ListaClasesSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonClases.length; i++) {
      if (data.id === this.DataJsonClases[i].id) {
        this.DataJsonClases[i].checked = isChecked;
      }
    }
  }

  MostrarClases() {
    for (const key of this.ListaClasesSel) {
      this.ListaClases.push({
        'id': key.id,
        'nombre': key.nombre
      });
    }
  }

  QuitarClase(data) {
    for (let i = 0; i < this.ListaClases.length; i++) {
      let index;
      if (parseInt(data.id, 0) === parseInt(this.ListaClases[i].id, 0)) {
        index = this.ListaClases.indexOf(this.ListaClases[i]);
        this.ListaClases.splice(index, 1);
      }
    }
  }

  LoadGrupos(listaClases) {
    console.log(listaClases);
    const lista = {
      clases: []
    };
    for (const key of listaClases) {
      lista.clases.push({
        'id_clase': key.id
      });
    }
    this.asignarproductosService.getGrupoPorListaClase(lista.clases).subscribe(
      data => {
        console.log(data);
        this.DataArrayGrupos = data;
        this.DataJsonGrupos = [];
        for (const key of this.DataArrayGrupos) {
          this.DataJsonGrupos.push({
            'id': key.id,
            'nombre': key.nombre,
            'checked': false
          });
        }
      }
    );
  }

  onChangeGrupos(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaGruposSel.filter(x => parseInt(x.id, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.ListaGruposSel.push(
          {
            'id': data.id,
            'nombre': data.nombre,
            'checked': false
          });
      }
    } else {
      for (let i = 0; i < this.ListaGruposSel.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.ListaGruposSel[i].id, 0) && isChecked === false) {
          index = this.ListaGruposSel.indexOf(this.ListaGruposSel[i]);
          this.ListaGruposSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonGrupos.length; i++) {
      if (data.id === this.DataJsonGrupos[i].id) {
        this.DataJsonGrupos[i].checked = isChecked;
      }
    }
  }

  MostrarGrupos() {
    for (const key of this.ListaGruposSel) {
      this.ListaGrupos.push({
        'id': key.id,
        'nombre': key.nombre
      });
    }
  }

  QuitarGrupo(data) {
    for (let i = 0; i < this.ListaGrupos.length; i++) {
      let index;
      if (parseInt(data.id, 0) === parseInt(this.ListaGrupos[i].id, 0)) {
        index = this.ListaGrupos.indexOf(this.ListaGrupos[i]);
        this.ListaGrupos.splice(index, 1);
      }
    }
  }

  bindingConfirmacion(datosAsignacion) {
    if (datosAsignacion.accion === 0) {
      this.confirmacion = 'Confirmación para copiar';
      this.msjConfirmacion = 'Se copian los productos del punto ' + datosAsignacion.puntocopiar +
        ' para el punto ' + datosAsignacion.puntooperacion + ' ¿Desea continuar?';
    } else if (datosAsignacion.accion === 1) {
      this.confirmacion = 'Confirmación para activar';
      this.msjConfirmacion = 'Se activan los productos para el punto ' + datosAsignacion.puntooperacion + ' ¿Desea continuar?';
    } else if (datosAsignacion.accion === 2) {
      this.confirmacion = 'Confirmación para desactivar';
      this.msjConfirmacion = 'Se desactivan los productos para el punto ' + datosAsignacion.puntooperacion + ' ¿Desea continuar?';
    }
  }


  onSubmit(datosAsigacion) {
    console.log(datosAsigacion);
    if (datosAsigacion.id_punto_copiar === undefined) {
      datosAsigacion.id_punto_copiar = 0;
    } else if (datosAsigacion.id_punto_copiar === null) {
      datosAsigacion.id_punto_copiar = 0;
    }

    const listageneral = {
      personalizada: []
    };

    if (datosAsigacion.articulos === 0) {
      for (const key of this.ListaClases) {
        listageneral.personalizada.push({
          'idClaseGrupo': key.id_clase
        });
      }
    } else if (datosAsigacion.articulos === 0) {
      for (const key of this.ListaGrupos) {
        listageneral.personalizada.push({
          'idClaseGrupo': key.id_grupo_venta_inv
        });
      }
    }

    this.asignarproductosService.postAsignarProductos(listageneral.personalizada,
      datosAsigacion.accion, datosAsigacion.id_punto_operacion, datosAsigacion.id_punto_copiar,
      datosAsigacion.articulos).subscribe(
      data => {
        console.log(data);
        // this.router.navigate(['/dashboard/articulos']);
        this.LimpiarFormulariosAP();
        if (data.text() === 'success') {
          Swal.fire({
            title: 'Asignar puntos',
            text: 'El proceso se realizo de manera exitosa',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Asignar puntos',
            text: 'El proceso NO se realizo de manera exitosa',
            type: 'error',
          });
        }
      }
    );
  }

  LimpiarModalClases() {
    for (let i = 0; i < this.DataJsonClases.length; i++) {
      this.onChangeClases(this.DataJsonClases[i], false);
    }
  }

  LimpiarModalGrupos() {
    for (let i = 0; i < this.DataJsonGrupos.length; i++) {
      this.onChangeGrupos(this.DataJsonGrupos[i], false);
    }
  }


  /*Cambio Datos*/


  LoadClasesCambio() {
    this.asignarproductosService.getClases().subscribe(
      data => {
        console.log(data);
        this.DataArrayClasesCambio = data;
        this.DataJsonClasesCambio = [];
        for (const key of this.DataArrayClases) {
          this.DataJsonClasesCambio.push({
            'id': key.id,
            'nombre': key.nombre,
            'checked': false
          });
        }
      }
    );
  }

  clickFilaClases(id) {
    this.DataCambio.id_clase = id.toString();
  }

  LoadGruposCambio(idClase) {
    this.DataCambio.nombre_clase = this.DataJsonClasesCambio.filter(x => parseInt(x.id, 0) === parseInt(idClase, 0))[0].nombre;
    const lista = {
      clases: []
    };
    lista.clases.push({
      'id_clase': idClase
    });
    this.asignarproductosService.getGrupoPorListaClase(lista.clases).subscribe(
      data => {
        console.log(data);
        this.DataArrayGruposCambio = data;
        this.DataJsonGruposCambio = [];
        for (const key of this.DataArrayGruposCambio) {
          this.DataJsonGruposCambio.push({
            'id': key.id,
            'nombre': key.nombre,
            'checked': false
          });
        }
      }
    );
  }

  clickFilaGrupos(id) {
    this.DataCambio.id_grupo = id.toString();
  }

  GuardarGrupoCambio(idGrupo) {
    console.log(idGrupo);
    console.log(this.DataJsonGruposCambio);
    this.DataCambio.nombre_grupo = this.DataJsonGruposCambio.filter(x => parseInt(x.id, 0) === parseInt(idGrupo, 0))[0].nombre;
  }

  GuardarGrupoCambioNew(idGrupo) {
    console.log(idGrupo);
    console.log(this.DataJsonGruposCambio);
    this.DataCambio.nombre_grupo_new = this.DataJsonGruposCambio.filter(x => parseInt(x.id, 0) === parseInt(idGrupo, 0))[0].nombre;
  }

  clickFilaGruposNew(id) {
    this.DataCambio.id_grupo_new = id.toString();
  }

  searchArticulos(datos) {
    console.log(datos);
    const lista = {
      grupos: []
    };
    lista.grupos.push({
      'idClaseGrupo': datos.id_grupo
    });

    this.asignarproductosService.getArticulosByGrupo(lista.grupos).subscribe(
      data => {
        console.log(data);
        this.DataArrayArtGrupo = data;
        // this.ListaGruposCambio = [];
        for (const key of this.DataArrayArtGrupo) {
          const existe = this.ListaGruposCambio.filter(x => parseInt(x.id, 0) === parseInt(key.id_articulo, 0));
          if (existe.length === 0) {
            this.ListaGruposCambio.push({
              'id_articulos_grupos': key.id_articulos_grupos,
              'id_articulo': key.id_articulo,
              'nombre': key.nombre,
              'id_clase': key.idClase,
              'nombre_clase': key.nombre_clase,
              'id_grupo_ant': key.id_grupo_venta_inv,
              'nombre_grupo_ant': key.nombre_grupo,
              'id_grupo': datos.id_grupo_new,
              'nombre_grupo': datos.nombre_grupo_new,
              'tipo': key.tipo
            });
          }
        }
        console.log(this.ListaGruposCambio);
      });
  }

  QuitarGrupoCambio(data) {
    for (let i = 0; i < this.ListaGruposCambio.length; i++) {
      let index;
      if (parseInt(data.id_articulo, 0) === parseInt(this.ListaGruposCambio[i].id_articulo, 0)) {
        index = this.ListaGruposCambio.indexOf(this.ListaGruposCambio[i]);
        this.ListaGruposCambio.splice(index, 1);
      }
    }
  }

  onSubmitCambiar(listagrupos) {
    console.log(listagrupos);
    const lista = {
      grupos: []
    };

    for (const key of listagrupos) {
      lista.grupos.push({
        'id': key.id_articulos_grupos,
        'articulos': {
          'id': key.id_articulo
        },
        'grupoVentaInv': {
          'id': key.id_grupo
        },
        'tipo': key.tipo,
      });
    }
    this.asignarproductosService.updateGrupoArticulos(lista.grupos).subscribe(
      data => {
        console.log(data);
        // this.router.navigate(['/dashboard/articulos']);
        this.LimpiarFormulariosCD();
        if (data.text() === 'Success') {
          Swal.fire({
            title: 'Cambio de datos',
            text: 'El proceso se realizo de manera exitosa',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Cambio de datos',
            text: 'El proceso NO se realizo de manera exitosa',
            type: 'error',
          });
        }
      });
  }

  LimpiarFormAP() {
    console.log(this.asignarProductosForm);
    // this.asignarProductosForm.reset();
    this.DataAsignacion = [];
    this.ListaClases = [];
    this.ListaGrupos = [];
  }

  LimpiarFormCD() {
    console.log(this.cambioDatosForm);
    // this.cambioDatosForm.reset();
    this.DataCambio = [];
    this.ListaGruposCambio = [];
  }

  LimpiarCampos() {
    this.asignarForm.reset();
    this.articulosForm.reset();
    this.DataAsignacion.id_punto_operacion = null;
    this.DataAsignacion.id_punto_copiar = null;
  }

  LimpiarFormulariosAP() {
    this.asignarProductosForm.reset();
    this.articulosForm.reset();
    this.asignarForm.reset();
    this.LimpiarModalClases();
    this.LimpiarModalGrupos();
    this.DataAsignacion = [];
    this.ListaClases = [];
    this.ListaGrupos = [];

    this.asignarPuntos = false;
    this.cambioDatos = false;
  }

  LimpiarFormulariosCD() {
    this.cambioDatosForm.reset();
    this.DataCambio = [];

    this.asignarPuntos = false;
    this.cambioDatos = false;
  }

}
