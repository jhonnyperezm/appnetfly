import { Component, OnInit } from '@angular/core';
import { PuntosService } from './puntos.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import Swal from 'sweetalert2';
import { BreadcrumbService } from 'xng-breadcrumb';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';



@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [PuntosService, SidebarComponent]
})
export class PuntosComponent implements OnInit {
  p :number = 1;
  DataPuntos: any = [];
  id: any;
  idCliente: any = [];
  nombreCliente: any;
  itempage = 5;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  idPunto: any;
  nombrePunto: any;
  searchString: any;
  noHayRegistros = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public puntosService: PuntosService,
    public sidevarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;

    // console.log(this.route.snapshot.params.idCliente);

    this.id = this.route.snapshot.params.idCliente;
    this.puntosService.getDatosCliente(this.id).subscribe(
      data => {
        console.log(data);
        this.nombreCliente = data[0].nombre;
      }
    );
   /*  this.LoadDatosCliente(this.id); */
  }

  ngOnInit() {
    this.LoadPuntos();
    this.rol = true;
  }
  /* LoadDatosCliente(idCliente) {
    this.puntosService.getDatosCliente(idCliente).subscribe(
      data => {
        this.nombreCliente = this.route.snapshot.params.nombreCliente;
      }
    );
  } */

  LoadPuntos() {
    this.puntosService.getPuntos(this.id).subscribe(
      data => {
        console.log(data);
        this.DataPuntos = data;
        if (this.DataPuntos.length !== 0) {
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

  bindingDataPunto(id, nombre) {
    console.log(id);
    this.idPunto = id;
    this.nombrePunto = nombre;
  }

  InactivarPunto(idPunto, nombrePunto) {
    this.puntosService.putInactivarPunto(idPunto).subscribe();
    Swal.fire({
      title: 'Punto inactivado',
      text: 'Proceso realizado de manera Exitosa, el punto ' + nombrePunto + 'fue inactivado',
      type: 'success',
    });
    for (let i = 0; i < this.DataPuntos.length; i++) {
      let index;
      if (idPunto === this.DataPuntos[i].idPunto) {
        index = this.DataPuntos.indexOf(this.DataPuntos[i]);
        this.DataPuntos.splice(index, 1);
      }
    }
  }

}
