import { Component, OnInit, ViewChild } from '@angular/core';
import { RecetasinactivasService } from './recetasinactivas.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recetasinactivas',
  templateUrl: './recetasinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [RecetasinactivasService, SidebarComponent]
})
export class RecetasinactivasComponent implements OnInit {
  p:number=1;
  idArticulo: any;
  nombreArticulo: any;
  searchString: any;
  itempage = 5;
  idActivar: any;
  nombreActivar: any;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  DataJsonReceta: any = [];
  DataArrayReceta: any = [];
  noHayRegistros = false;

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public recetasinactivasService: RecetasinactivasService,
    public SidebarComponent: SidebarComponent,
    private route: ActivatedRoute) {
    this.idArticulo = this.route.snapshot.params.idArticulo;
    this.nombreArticulo = this.route.snapshot.params.nombreArticulo;
    this.DataJsonReceta = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadRecetasArticulo();
  }

  LoadRecetasArticulo() {
    this.recetasinactivasService.geRecetasArticulo(this.idArticulo).subscribe(
      data => {
        this.DataArrayReceta = data;
        this.DataJsonReceta = [];
        if (this.DataArrayReceta.length !== 0) {
          for (const key of this.DataArrayReceta) {
            const exist = this.DataJsonReceta.filter(x => x.id === key.id);
            if (exist.length === 0) {
              this.DataJsonReceta.push(
                {
                  id: key.id,
                  id_articulo: key.id_articulo,
                  id_unidad: key.id_unidad,
                  nombre: key.nombre,
                  nombre_unidad: key.nombre_unidad,
                  tipo: key.tipo,
                  cantidad: key.cantidad
                }
              );
            }
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

  bindingDataActivar(id, nombre) {
    this.idActivar = id;
    this.nombreActivar = nombre;
  }

  Activar(id, nombre) {
    this.recetasinactivasService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Receta Activada',
      text: 'Proceso realizado de manera Exitosa, la receta ' + nombre + 'fue Activada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJsonReceta.length; i++) {
      let index;
      if (id === this.DataJsonReceta[i].id) {
        index = this.DataJsonReceta.indexOf(this.DataJsonReceta[i]);
        this.DataJsonReceta.splice(index, 1);
      }
    }
  }
}
