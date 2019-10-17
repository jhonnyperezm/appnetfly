import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProveedoresService } from './proveedores.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {RutasService} from '../../../services/rutas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ProveedoresService, RutasService, SidebarComponent]
})
export class ProveedoresComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  ListadoProveedores: any = [];
  ProveedoresconNegociacion: any = [];
  idProveedor: any;
  nombreProveedor: any;
  articulosnuevosproveedor: any = [];
  articulosnuevosproveedor2: any = [];
  articulosproveedor: any = [];
  articulosporproveedor = [];
  alerta: any;
  public searchString: any;
  itempage = 5;
  tipo: any;
  mensaje: any;
  idproveedores = [];
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  constructor(public router: Router,
    public proveedoresService: ProveedoresService,
    public rutasService: RutasService,
    public sidebarComponent: SidebarComponent,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    public route: ActivatedRoute) {
    this.LoadProveedoresData();
  }

  ngOnInit() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
  }

  LoadProveedoresData() {
    this.proveedoresService.getProveedores().subscribe(
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

  InactivarProveedor(id, nombre) {
    this.proveedoresService.putProveedorInactivar(id).subscribe();
    Swal.fire({
      title: 'Proveedor inactivado',
      text: 'Proceso realizado de manera Exitosa, el proveedor ' + nombre + 'fue inactivado',
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

export class Articulo {
  nombre: string;
  acuerdoNegocio: boolean;
  nombreArticulo: string;
  acuerdoNegocioartiuculo: boolean;


  constructor(nombre: string, acuerdoNegocio: boolean, nombreArticulo: string, acuerdoNegocioartiuculo: boolean) {
    this.nombre = nombre;
    this.acuerdoNegocio = acuerdoNegocio;
    this.nombreArticulo = nombreArticulo;
    this.acuerdoNegocioartiuculo = acuerdoNegocioartiuculo;
  }

}
