import {Component, OnInit} from '@angular/core';
import {ListadescuentosinactivosService} from './listadescuentosinactivos.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';


@Component({
  selector: 'app-listadescuentosinactivos',
  templateUrl: './listadescuentosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ListadescuentosinactivosService, SidebarComponent]
})
export class ListadescuentosinactivosComponent implements OnInit {
  p:number=1;
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;
  noHayRegistros = false;

  DataDescuentoInactivo: any = [];
  lisDescuentosArray: any = [];

  itempageLista = 5;
  searchStringLista: any;

  constructor(
    public listadescuentos: ListadescuentosinactivosService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadDescuentos();
  }

  loadDescuentos() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
    this.listadescuentos.findDescuentos().subscribe(
      data => {
        this.lisDescuentosArray = data;
        if (this.lisDescuentosArray.length !== 0) {
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
    console.log(this.lisDescuentosArray);
  }

  bindingDataActivar(data) {
    this.DataDescuentoInactivo.idAc = data.id;
    this.DataDescuentoInactivo.porcentajeAc = data.porcentaje;
    this.DataDescuentoInactivo.nombreAc = data.nombre;
  }

  Activar(id, nombre) {
    this.listadescuentos.putActivarDescativarDescuentos(id).subscribe();
    Swal.fire({
      title: 'Descuento Activado',
      text: 'Proceso realizado de manera Exitosa, el Descuento ' + nombre + ' fue Activado',
      type: 'success',
    });

    for (let i = 0; i < this.lisDescuentosArray.length; i++) {
      let index;
      if (id === this.lisDescuentosArray[i].id) {
        index = this.lisDescuentosArray.indexOf(this.lisDescuentosArray[i]);
        this.lisDescuentosArray.splice(index, 1);
      }
    }
  }

}
