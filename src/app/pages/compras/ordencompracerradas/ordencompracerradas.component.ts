import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrdencompracerradasService } from './ordencompracerradas.service';
import { RutasService } from '../../../services/rutas.service';


@Component({
  selector: 'app-ordencompracerradas',
  templateUrl: './ordencompracerradas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [OrdencompracerradasService, RutasService]
})
export class OrdencompracerradasComponent implements OnInit {

  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  ListaOrdenesCerradas: any = [];
  DetalleOrdenesCerradas: any = [];
  ArticulosOrdenesCerradas: any = [];
  public searchString: any;
  public searchStringArticulo: any;
  itempage = 5;
  p: any;

  constructor(
    public router: Router,
    public ordencompracerradasService: OrdencompracerradasService,
    public rutasService: RutasService,
    public toastr: ToastrService) {

  }

  ngOnInit() {
    this.LoadOrdenescerradasData();
  }

  LoadOrdenescerradasData() {
    this.ordencompracerradasService.getOrdenescerradas().subscribe(
      data => {
        this.ListaOrdenesCerradas = data;
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

  VerOrdenCerrada(info_orden) {
    this.DetalleOrdenesCerradas = this.ListaOrdenesCerradas.filter(x => x.id == info_orden.id);
    this.ordencompracerradasService.getArticulosOrdenescerradasByIdMovimiento(this.DetalleOrdenesCerradas[0].id).subscribe(
      data => {
        this.ArticulosOrdenesCerradas = data;
        console.log(data);
      }
    );
  }
}
