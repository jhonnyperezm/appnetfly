import { Component, OnInit } from '@angular/core';
import { PuntosinactivosService } from './puntosinactivos.service';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntosinactivos',
  templateUrl: './puntosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [PuntosinactivosService,SidebarComponent]
})
export class PuntosinactivosComponent implements OnInit {
  p:number=1;
  DataPuntosInactivos: any = [];
  id: any;
  nombreCliente: any;
  itempage = 5;
  searchString: any;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  idPunto: any;
  noHayRegistros = false;
  nombrePunto: any;

  constructor(public puntosinactivosService: PuntosinactivosService,
    public SidebarComponent: SidebarComponent,
    public router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.id = this.route.snapshot.params.idCliente;
    this.nombreCliente = this.route.snapshot.params.nombreCliente;
  }


  ngOnInit() {
    this.LoadPuntosInactivos();
    this.rol = true;
  }

  LoadPuntosInactivos() {
    this.puntosinactivosService.getPuntosInactivos(this.id).subscribe(
      data => {
        console.log(data);
        this.DataPuntosInactivos = data;
        if (this.DataPuntosInactivos.length !== 0) {
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
    this.idPunto = id;
    this.nombrePunto = nombre;
  }

  ActivarPunto(idPunto, nombrePunto) {
    this.puntosinactivosService.putActivarPunto(idPunto).subscribe();
    Swal.fire({
      title: 'Punto activado',
      text: 'Proceso realizado de manera Exitosa, el punto ' + nombrePunto + 'fue activado',
      type: 'success',
    });
    for (let i = 0; i < this.DataPuntosInactivos.length; i++) {
      let index;
      if (idPunto === this.DataPuntosInactivos[i].idPunto) {
        index = this.DataPuntosInactivos.indexOf(this.DataPuntosInactivos[i]);
        this.DataPuntosInactivos.splice(index, 1);

      }
    }
  }

}
