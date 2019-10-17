import { Component, OnInit } from '@angular/core';
import { ArticulosinactivosService } from './articulosinactivos.service';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulosinactivos',
  templateUrl: './articulosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ArticulosinactivosService, SidebarComponent]
})
export class ArticulosinactivosComponent implements OnInit {
  p:number=1;
  DataArticulos: any = [];
  checkPermiso: boolean;
  itempage = 5;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  noHayRegistros = false;
  idArticulo: any;
  nombreArticulo: any;
  searchString: any;

  constructor(public articulosinactivosService: ArticulosinactivosService,
    public toastr: ToastrService,
    public SidebarComponent: SidebarComponent) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }
  ngOnInit() {
    this.LoadArticulosInactivos();
    this.rol = true;
  }

  LoadArticulosInactivos() {
    this.articulosinactivosService.getArticulos().subscribe(
      data => {
        this.DataArticulos = data;
        if (this.DataArticulos.length !== 0) {
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

  bindingDataArticulo(id, nombre) {
    this.idArticulo = id;
    this.nombreArticulo = nombre;
  }

  ActivarArticulo(idArticulo, nombreArticulo) {

    this.articulosinactivosService.putActivarArticulo(idArticulo).subscribe();
    Swal.fire({
      title: 'Articulo activado',
      text: 'Proceso realizado de manera Exitosa, el Articulo ' + nombreArticulo + 'fue activado',
      type: 'success',
    });
    for (let i = 0; i < this.DataArticulos.length; i++) {

      let index;
      if (idArticulo === this.DataArticulos[i].id) {

        index = this.DataArticulos.indexOf(this.DataArticulos[i]);
        this.DataArticulos.splice(index, 1);

      }
    }
  }

}
