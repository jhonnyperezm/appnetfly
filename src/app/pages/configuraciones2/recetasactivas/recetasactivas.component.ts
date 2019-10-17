import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RecetasactivasService } from './recetasactivas.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recetasactivas',
  templateUrl: './recetasactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [RecetasactivasService, RutasService, SidebarComponent]
})
export class RecetasactivasComponent implements OnInit {
  p:number=1;
  modalArt:number=1;
  idArticulo: any;
  searchString: any;
  itempage = 5;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  noHayRegistros = false;
  DataJsonReceta: any = [];
  DataArrayReceta: any = [];
  idInactivar: any;
  nombreInactivar: any;
  nombreArticulo: any;
  DataImportar: any = [];
  DataArticulos: any = [];
  searchStringArt: any;
  itempageArt = 5;
  idEliminar: any;
  nombreEliminar: any;
  cantidadRecetas: any;

  constructor(public router: Router,
    public toastr: ToastrService,
    public recetasactivasService: RecetasactivasService,
    public SidebarComponent: SidebarComponent,
    vcr: ViewContainerRef,
    public rutasService: RutasService,
    private route: ActivatedRoute) {
    this.idArticulo = this.route.snapshot.params.idArticulo;
    // this.nombreArticulo = this.route.snapshot.params.nombreArticulo;
    this.recetasactivasService.getDatosArticulo(this.idArticulo).subscribe(
      data => {
        console.log(data);
        this.nombreArticulo = data[0].nombre;
      }
    );
  }

  ngOnInit() {
    this.LoadRecetasArticulo();
    this.LoadArticulosReceta();
  }

  Regresar() {
    this.router.navigate(['/configuraciones/articulosreceta']);
  }

  LoadRecetasArticulo() {
    this.recetasactivasService.geRecetasArticulo(this.idArticulo).subscribe(
      data => {
        console.log(data);
        this.DataArrayReceta = data;
        this.DataJsonReceta = [];
        if (this.DataArrayReceta.length !== 0) {
          this.cantidadRecetas = this.DataArrayReceta.length;
          for (const key of this.DataArrayReceta) {
            const exist = this.DataJsonReceta.filter(x => x.id === key.id);
            if (exist.length === 0) {
              this.DataJsonReceta.push(
                {
                  'id': key.id,
                  'id_articulo': key.id_articulo,
                  'id_unidad': key.id_unidad,
                  'nombre': key.nombre,
                  'nombre_unidad': key.nombre_unidad,
                  'tipo': key.tipo,
                  'cantidad': key.cantidad
                }
              );
            }
          }
          this.loader = false;
          this.LoadTabla = true;
          this.noHayRegistros = false;
        } else {
          this.cantidadRecetas = 0;
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

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.recetasactivasService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'receta inactivada',
      text: 'Proceso realizado de manera Exitosa, la receta ' + nombre + 'fue inactivada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJsonReceta.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataJsonReceta[i].id, 0)) {

        index = this.DataJsonReceta.indexOf(this.DataJsonReceta[i]);
        this.DataJsonReceta.splice(index, 1);

      }
    }

  }
  LoadArticulosReceta() {
    this.recetasactivasService.getArticulosReceta().subscribe(
      data => {
        this.DataArticulos = data;
      }
    );
  }

  bindingDataImportar() {
    // this.DataImportar.idReceta = idArtReceta;
  }

  clickFilaImportar(id) {
    this.DataImportar.id_articulo = id.toString();
  }

  Importar(datosImportar) {
    this.recetasactivasService.importarReceta(datosImportar.id_articulo, this.idArticulo).subscribe(
      data => {
        if (data.text() === 'success') {
          this.LoadRecetasArticulo();
          Swal.fire({
            title: 'Exitoso',
            text: 'La receta se copio correctamente',
            type: 'success',
          });
        } else if (data.text() === 'error') {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo importar la receta',
            type: 'error',
          });
        } else {
          console.log(data);
        }
      }
    );
  }

  LimpiarFormImportar() {
    this.DataImportar = [];
  }

  bindingDataEliminarReceta(id, nombre) {
    this.idEliminar = id;
    this.nombreEliminar = nombre;
  }

  EliminarReceta(id, nombre) {
    this.recetasactivasService.deleteReceta(id).subscribe(
      data => {
        if (data.text() === 'articuloreceta fue eliminado con exito') {
          Swal.fire({
            title: 'receta eliminada',
            text: 'Proceso realizado de manera Exitosa, la receta ' + nombre + 'fue eliminada',
            type: 'success',
          });
          for (let i = 0; i < this.DataJsonReceta.length; i++) {
            let index;
            if (parseInt(id, 0) === parseInt(this.DataJsonReceta[i].id, 0)) {
              index = this.DataJsonReceta.indexOf(this.DataJsonReceta[i]);
              this.DataJsonReceta.splice(index, 1);
            }
          }

        } else {
          console.log(data.text());
        }
      }
    );

  }
}
