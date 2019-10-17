import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GruposempaqueService} from './gruposempaque.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-gruposempaque',
  templateUrl: './gruposempaque.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposempaqueService, SidebarComponent]
})
export class GruposempaqueComponent implements OnInit {
  p:number=1;
  ag :number=1;
  eg: number=1;
  DataArray: any = [];
  DataJson: any = [];
  DataNewGrupoEmp: any = [];
  DataModificar: any = [];
  DataClientes: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  searchStringGrupo: any;
  itempageGrupo = 5;
  idInactivar: any;
  nombreInactivar: any;
  noHayRegistros = false;
  searchStringArtGrupo: any;
  itempageArtGrupo = 5;
  DataJsonArtSel: any = [];
  DataJsonArticulos: any = [];
  registrosArticulos: any = [];
  DataArticulosGrupo: any = [];
  DataArrayArtGrupos: any = [];
  searchStringEditGrupo: any;
  itempageEditGrupo = 5;
  registrosEditArticulos: any = [];
  clickImportar = false;

  @ViewChild('articulosForm', {static: true})
  private articulosForm: NgForm;

  @ViewChild('editGruposForm', {static: true})
  private editGruposForm: NgForm;

  constructor(public gruposempaqueService: GruposempaqueService,
              public sidebarComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadGruposEmpaque();
    this.LoadArticulosEmpaque();
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  clickBotonImportar() {
    this.clickImportar = !this.clickImportar;
  }

  LoadGruposEmpaque() {
    this.gruposempaqueService.getGruposEmpaque().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];
        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            this.DataJson.push(
              {
                'id': key.id,
                'nombre': key.nombre,
                'creado_por': key.creado_por,
                'estado': key.estado,
                'fecha_creacion': key.fecha_creacion
              }
            );
          }
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = false;
        } else {
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = true;
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

  LoadArticulosEmpaque() {
    this.gruposempaqueService.getArticulosEmpaque().subscribe(
      data => {
        this.DataJsonArticulos = [];
        this.registrosArticulos = [];
        for (const key of data) {
          this.DataJsonArticulos.push({
            'id': this.registrosArticulos.length,
            'id_art': key.id,
            'nombre': key.nombre,
            'cantidad': 0,
            'id_unidad_kardex': key.id_unidad_kardex,
            'checked': false
          });
          this.registrosArticulos.push('articulos1');
        }
        this.DataJsonArticulos.sort(function(a, b) {
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

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.gruposempaqueService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'Grupos empaque inactivado',
      text: 'Proceso realizado de manera Exitosa, el Grupo de empaque  ' + nombre + 'fue inactivado',
      type: 'success',
    });
    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (id === this.DataJson[i].id) {
        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);
      }
    }
  }

  updateProductoModal(data, property: string, event: any) {
    const editField = event.target.textContent;
    for (let i = 0; i < this.DataJsonArticulos.length; i++) {
      let index;
      if (parseInt(data.id_art, 0) === parseInt(this.DataJsonArticulos[i].id_art, 0)) {
        index = this.DataJsonArticulos.indexOf(this.DataJsonArticulos[i]);
        this.DataJsonArticulos[index][property] = editField.trim();
      }
    }


    if (editField === '') {
      this.toastr.info('La cantidad del producto no puede estar vacio', 'Verificar');
      this.onChange(data, false);
    } else if (parseInt(editField, 0) === 0) {
      this.toastr.info('La cantidad producto no puede ser 0', 'Verificar');
      this.onChange(data, false);
    } else {
      this.onChange(data, true);
    }
  }

  onChange(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonArtSel.filter(x => parseInt(x.id, 0) === data.id_art);
      if (existe.length === 0) {
        this.DataJsonArtSel.push(
          {
            'id': data.id_art,
            'nombre': data.nombre,
            'cantidad': data.cantidad
          }
        );
      }
    } else {
      for (let i = 0; i < this.DataJsonArtSel.length; i++) {

        let index;
        if (data.id_art === parseInt(this.DataJsonArtSel[i].id, 0) && isChecked === false) {
          index = this.DataJsonArtSel.indexOf(this.DataJsonArtSel[i]);
          this.DataJsonArtSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonArticulos.length; i++) {
      if (data.id_art === this.DataJsonArticulos[i].id_art) {
        this.DataJsonArticulos[i].checked = isChecked;
      }
    }
  }

  onSubmit(DatosGrupo, botonImportar) {
    const postData = {
      'nombre': DatosGrupo.nombre
    };
    this.gruposempaqueService.postEmpaque(postData).subscribe(
      data => {
        if (data === 'El grupo empaque ya existe para el cliente') {
          Swal.fire({
            title: 'Error',
            text: 'El grupo empaque ya existe para el cliente',
            type: 'error',
          });
        } else if (data === 'No se pudo crear el grupo') {
          console.log(data);
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

    for (const key of this.DataJsonArtSel) {
      const idUnidad = this.DataJsonArticulos.filter(x => parseInt(x.id_art, 0) === parseInt(key.id, 0))[0].id_unidad_kardex;
      grupo.articulos.push(
        {
          'id_grupo_empaque': idGrupo,
          'id_articulo': key.id,
          'cantidad': key.cantidad,
          'id_unidad': idUnidad
        });
    }
    this.gruposempaqueService.postArticulosEmpaque(grupo.articulos).subscribe(
      data => {
        this.LoadGruposEmpaque();
        this.LimpiarFormGrupoEmpaque();
      }
    );
  }

  importarGrupo(datosGrupo, idGrupo) {
    this.gruposempaqueService.importarGrupoEmpaque(datosGrupo.grupo_importar, idGrupo).subscribe(
      data => {
        console.log(data.text());
        this.LoadGruposEmpaque();
        this.LimpiarFormGrupoEmpaque();
      }
    );
  }

  bindingDataModificar(data) {
    this.DataModificar = data;
    this.DataModificar.nombreGrupo = data.nombre;
    this.LoadArticulosGrupo(data.id);
  }

  LoadArticulosGrupo(idGrupo) {
    this.gruposempaqueService.getArticulosGrupo(idGrupo).subscribe(
      data => {
        this.DataArticulosGrupo = [];
        this.registrosEditArticulos = [];
        this.DataJsonArtSel = [];
        this.DataArrayArtGrupos = data;

        for (const key1 of this.DataArrayArtGrupos) {
          this.DataArticulosGrupo.push({
            'id_art': key1.id_articulo,
            'nombre': key1.nombre_articulo,
            'cantidad': key1.cantidad,
            'id_unidad_kardex': key1.id_unidad,
            'checked': true
          });

          this.DataJsonArtSel.push(
            {
              'id': key1.id_articulo,
              'nombre': key1.nombre_articulo,
              'cantidad': key1.cantidad
            });
        }

        for (let i = 0; i < this.DataJsonArticulos.length; i++) {
          const p = this.DataArticulosGrupo.filter(x => x.id_art === this.DataJsonArticulos[i].id_art);
          if (p.length === 0) {
            this.DataArticulosGrupo.push(
              {
                'id_art': this.DataJsonArticulos[i].id_art,
                'nombre': this.DataJsonArticulos[i].nombre,
                'cantidad': 0,
                'id_unidad_kardex': this.DataJsonArticulos[i].id_unidad_kardex,
                'checked': false
              }
            );
          }
        }
        this.DataArticulosGrupo.sort(function(a, b) {
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
    for (let i = 0; i < this.DataArticulosGrupo.length; i++) {
      let index;
      if (parseInt(data.id_art, 0) === parseInt(this.DataArticulosGrupo[i].id_art, 0)) {
        index = this.DataArticulosGrupo.indexOf(this.DataArticulosGrupo[i]);
        this.DataArticulosGrupo[index][property] = editField.trim();
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
      const existe = this.DataJsonArtSel.filter(x => parseInt(x.id, 0) === parseInt(data.id_art, 0));
      if (existe.length === 0) {
        this.DataJsonArtSel.push(
          {
            'id': data.id_art,
            'nombre': data.nombre,
            'cantidad': data.cantidad
          }
        );
      } else {
        for (let i = 0; i < this.DataJsonArtSel.length; i++) {
          if (parseInt(data.id_art, 0) === parseInt(this.DataJsonArtSel[i].id, 0)) {
            this.DataJsonArtSel[i].cantidad = data.cantidad;
          }
        }
      }
    } else {
      for (let i = 0; i < this.DataJsonArtSel.length; i++) {

        let index;
        if (data.id_art === parseInt(this.DataJsonArtSel[i].id, 0) && isChecked === false) {
          index = this.DataJsonArtSel.indexOf(this.DataJsonArtSel[i]);
          this.DataJsonArtSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataArticulosGrupo.length; i++) {
      if (parseInt(data.id_art, 0) === parseInt(this.DataArticulosGrupo[i].id_art, 0)) {
        this.DataArticulosGrupo[i].checked = isChecked;
      }
    }
  }

  onSubmitModificar(datosGrupo) {
    const postData = {
      'id': datosGrupo.id,
      'nombre': datosGrupo.nombreGrupo,
      'estado': datosGrupo.estado,
      'creadoPor': datosGrupo.creado_por,
      'fechaCreacion': datosGrupo.fecha_creacion
    };
    this.gruposempaqueService.updateEmpaque(postData).subscribe(
      data => {
        if (data.text() === 'No se pudo mdificar el grupo') {
          console.log(data.text());
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

    for (const key of this.DataJsonArtSel) {
      const idUnidad = this.DataJsonArticulos.filter(x => parseInt(x.id_art, 0) === parseInt(key.id, 0))[0].id_unidad_kardex;
      grupo.articulos.push(
        {
          'id_grupo_empaque': idGrupo,
          'id_articulo': key.id,
          'cantidad': key.cantidad,
          'id_unidad': idUnidad
        });
    }
    this.gruposempaqueService.updateArticulosEmpaque(grupo.articulos, idGrupo).subscribe(
      data => {
        console.log(data);
        this.LoadGruposEmpaque();
      }
    );
  }

  LimpiarFormGrupoEmpaque() {
    this.LoadArticulosEmpaque();
    this.clickImportar = false;
    this.articulosForm.reset();
    this.DataJsonArtSel = [];
  }
}
