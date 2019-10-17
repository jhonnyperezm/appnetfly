import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ArticulosService, SidebarComponent]
})
export class ArticulosComponent implements OnInit {
  p:number=1;
  mp:number=1;
  DataArticulos: any = [];
  checkPermiso: boolean;
  itempage = 5;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  noHayRegistros = false;
  rol: boolean;
  idArticulo: any;
  nombreArticulo: any;
  searchString: any;
  itempagePuntos = 5;
  searchStringPuntos: any;
  DataArrayPuntos: any = [];
  DataJsonPuntos: any = [];

  constructor(public articulosService: ArticulosService,
    public toastr: ToastrService,
    public SidebarComponent: SidebarComponent) {
    this.loader = true;
    this.LoadTabla = false;
    this.checkPermiso = false;
  }

  ngOnInit() {
    this.LoadArticulos();
  }

  LoadArticulos() {
    const nombre = localStorage.getItem('rol');
    if (nombre === 'Franquiciado') {
      this.articulosService.getArticulosFranquiciadoId().subscribe(
        data => {
          const idCliente = data.map(id => id.idCliente);
          this.loadFranquiciador(idCliente);
        });
    } else {
      this.articulosService.getArticulos().subscribe(
        data => {
          console.log(data);
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
  }

  loadFranquiciador(id) {
    this.articulosService.getArticulosFranquiciador(id).subscribe(
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
    )
  }

  bindingDataArticulo(id, nombre) {
    this.idArticulo = id;
    this.nombreArticulo = nombre;
  }

  InactivarArticulo(idArticulo, nombreArticulo) {

    this.articulosService.putInactivarArticulo(idArticulo).subscribe();
    Swal.fire({
      title: 'Articulo inactivado',
      text: 'Proceso realizado de manera Exitosa, el Articulo ' + nombreArticulo + 'fue inactivado',
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

  mostrarPuntos(IdArt) {
    this.articulosService.getPuntosArticulo(IdArt).subscribe(
      data => {
        this.DataJsonPuntos = data;
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
}
