import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {CostosestimadosService} from './costosestimados.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-costosestimados',
  templateUrl: './costosestimados.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [CostosestimadosService, SidebarComponent]
})
export class CostosestimadosComponent implements OnInit {

  p:number=1;
  mc :number=1;
  mg:number=1;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  DataArticulos: any = [];
  searchString: any;
  itempage = 5;
  noHayRegistros = false;

  // CostoTablaVacia = false;
  ListaArticulos: any = [];
  // idClase: any;
  // idGrupo: any;

  DataArrayClases: any = [];
  DataJsonClases: any = [];
  ListaClasesSel: any = [];
  DataArrayGrupos: any = [];
  DataJsonGrupos: any = [];
  ListaGruposSel: any = [];
  searchStringClases: any;
  itempageClases = 5;

  searchStringGrupos: any;
  itempageGrupos = 5;

  // DataFiltro: any = [];

  DataEditCosto: any = [];

  @ViewChild('editCostoForm', {static: true})
  public editCostoForm: NgForm;

  constructor(public costosestimadosService: CostosestimadosService,
              public toastr: ToastrService,
              public sidebarComponent: SidebarComponent) {
    this.loader = true;
    this.LoadTabla = false;
    // this.idClase = 0;
    // this.idGrupo = 0;
  }

  ngOnInit() {
    this.LoadArticulos();
    this.LoadClases();
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

  LoadClases() {
    this.costosestimadosService.getClasesCliente().subscribe(
      data => {
        console.log(data);
        this.DataArrayClases = data;
        this.DataJsonClases = [];
        if (this.DataArrayClases.length !== 0) {
          for (const key of this.DataArrayClases) {
            this.DataJsonClases.push({
              'creado_por': key.creado_por,
              'estado': key.estado,
              'fecha_creacion': key.fecha_creacion,
              'fecha_modificacion': key.fecha_modificacion,
              'id': key.id,
              'id_cliente': key.id_cliente,
              'modificado_por': key.modificado_por,
              'nombre': key.nombre,
              'tipo': key.tipo,
              'checked': false
            });
          }
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = false;
        } else {
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = true;
        }
      }
    );
  }

  onChangeClases(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaClasesSel.filter(x => parseInt(x.id_clase, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.ListaClasesSel.push(
          {
            'id_clase': data.id
          });
      }
    } else {
      for (let i = 0; i < this.ListaClasesSel.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.ListaClasesSel[i].id_clase, 0) && isChecked === false) {
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

  /*  GuardarClase(datos) {
     this.LoadArticulos(datos.id_clase, 0);
   } */

  LoadGrupos(ListaClases) {
    if (ListaClases.length === 0) {

    } else {
      this.costosestimadosService.getGrupoPorListaClase(ListaClases).subscribe(
        data => {
          console.log(data);
          this.DataArrayGrupos = data;
          this.DataJsonGrupos = [];
          for (const key of this.DataArrayGrupos) {
            this.DataJsonGrupos.push({
              'creado_por': key.creado_por,
              'estado': key.estado,
              'fecha_creacion': key.fecha_creacion,
              'fecha_modificacion': key.fecha_modificacion,
              'id': key.id,
              'id_clase': key.id_clase,
              'modificado_por': key.modificado_por,
              'nombre': key.nombre,
              'checked': false
            });
          }
        });
    }
    /* if (idClase === '' || idClase === null || idClase === undefined) {
    } else {
      this.costosestimadosService.getGrupoPorClase(idClase).subscribe(
        data => {
          console.log(data);
          this.DataArrayGrupos = data;
          for (const key of this.DataArrayGrupos) {

          }
        });
    } */
  }

  onChangeGrupos(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaGruposSel.filter(x => parseInt(x.id_grupo_venta_inv, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.ListaGruposSel.push(
          {
            'id_grupo_venta_inv': data.id
          });
      }
    } else {
      for (let i = 0; i < this.ListaGruposSel.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.ListaGruposSel[i].id_grupo_venta_inv, 0) && isChecked === false) {
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


  /*  GuardarGrupo(datos) {
     this.LoadArticulos(datos.id_clase, datos.id_grupo);
   }
  */
  LoadArticulos() {
    console.log(this.ListaClasesSel);
    console.log(this.ListaGruposSel);
    const listageneral = {
      personalizada: []
    };
    const clases = {
      articulos: []
    };

    for (const key of this.ListaClasesSel) {
      clases.articulos.push({
        'idClase': key.id_clase
      });
    }
    const grupos = {
      articulos: []
    };

    for (const key of this.ListaGruposSel) {
      grupos.articulos.push({
        'idGrupo': key.id_grupo_venta_inv
      });
    }
    listageneral.personalizada.push({
      'clasesPojoUtil': clases.articulos,
      'gruposPojoUtil': grupos.articulos
    });

    this.costosestimadosService.getArticulos(listageneral.personalizada).subscribe(
      data => {
        console.log(data);
        this.ListaArticulos = [];
        this.DataArticulos = data;

        for (const key of this.DataArticulos) {
          this.ListaArticulos.push({
            'cod_barras': key.cod_barras,
            'costo_estimado': key.costo_estimado,
            'descripcion': key.descripcion,
            'empaque': key.empaque,
            'estado': key.estado,
            'id': key.id,
            'id_cliente': key.id_cliente,
            'id_unidad_kardex': key.id_unidad_kardex,
            'id_unidad_venta': key.id_unidad_venta,
            'inventario': key.inventario,
            'nombre': key.nombre,
            'nombre_impresion': key.nombre_impresion,
            'nombre_kardex': key.nombre_kardex,
            'nombre_venta': key.nombre_venta,
            'receta': key.receta,
            'seleccion': key.seleccion,
            'texto': key.texto,
            'utiliza_empaque': key.utiliza_empaque,
            'venta': key.venta,
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

  changeValueTabla(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    if (editField === '') {
      this.toastr.info('El costo no puede estar vacio', 'Verificar');
    } else {
    }
  }

  updateArticuloTabla(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    if (editField !== '') {
      for (let i = 0; i < this.ListaArticulos.length; i++) {
        let index;
        if (id === this.ListaArticulos[i].id) {
          index = this.ListaArticulos.indexOf(this.ListaArticulos[i]);
          this.ListaArticulos[index][property] = editField.trim();
        }
      }
      this.costosestimadosService.putCostoEstimado(id, editField).subscribe(
        data => {
          console.log(data);
          if (data.text() === 'success') {
            this.toastr.success('El costo se modifico exitosamente', 'Exitoso');
          }
        }
      );
    }
  }

  ModificarCosto(datosModificacion) {
    console.log(this.ListaArticulos);
    const articulo = {
      costo: []
    };
    for (const key of this.ListaArticulos) {
      articulo.costo.push({
        'id': key.id,
        'costoEstimado': key.costo_estimado
      });
    }
    this.costosestimadosService.updateCostosEstimados(datosModificacion.caracteristica,
      datosModificacion.tipovalor, datosModificacion.cantidad, datosModificacion.redondeo,
      articulo.costo).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'success') {
          this.toastr.success('El costo se modifico exitosamente', 'Exitoso');
          this.LoadArticulos();
        }
      }
    );
  }

  LimpiarModales() {
    for (const key of this.DataJsonClases) {
      this.onChangeClases(key, false);
    }
    for (const key of this.DataJsonGrupos) {
      this.onChangeGrupos(key, false);
    }
    this.LoadArticulos();
  }

  LimpiarModificacionCosto() {
    this.editCostoForm.reset();
  }
}
