import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {RutasService} from '../../../services/rutas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import { ProveedoresinactivosService } from './proveedoresinactivos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedoresinactivos',
  templateUrl: './proveedoresinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ProveedoresinactivosService, RutasService, SidebarComponent]
})
export class ProveedoresinactivosComponent implements OnInit {

  DataArray: any = [];
  searchString: any;
  itempage = 5;
  idProveedor: any;
  nombreProveedor: any;
  tipo: any;
  mensaje: any;
  p: any;

  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  constructor(
    public router: Router,
    public proveedoresinactivosService: ProveedoresinactivosService,
    public rutasService: RutasService,
    public sidebarComponent: SidebarComponent,
    public toastr: ToastrService,
    public route: ActivatedRoute,
    vcr: ViewContainerRef) {
    this.tipo = this.route.snapshot.params.tipo;
    this.mensaje = this.route.snapshot.params.mensaje;
  }

  ngOnInit() {
    setTimeout(() => this.toastr.clear());
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['compras/proveedores/proveedoresinactivos']);
    }
    if (this.tipo === 'success') {
      setTimeout(() => this.toastr.success(this.mensaje));
    }
    this.LoadProveedoresinactivosData();
  }

  LoadProveedoresinactivosData() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
    this.proveedoresinactivosService.getProveedoresinactivos().subscribe(
      data => {
        this.DataArray = data;
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

  bindingDataProveedor(id, nombre) {
    this.idProveedor = id;
    this.nombreProveedor = nombre;
  }

  ActivarProveedor(id, nombre) {
    this.proveedoresinactivosService.putProveedorActivar(id).subscribe();
    Swal.fire({
      title: 'Proveedor activado',
      text: 'Proceso realizado de manera Exitosa, el proveedor ' + nombre + 'fue activado',
      type: 'success',
    });
    for (let i = 0; i < this.DataArray.length; i++) {
      let index;
      if (id === this.DataArray[i].id) {
        index = this.DataArray.indexOf(this.DataArray[i]);
        this.DataArray.splice(index, 1);
      }
    }
  }

}
