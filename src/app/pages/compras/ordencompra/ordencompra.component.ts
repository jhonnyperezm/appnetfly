import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {OrdencompraService} from './ordencompra.service';

@Component({
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [SidebarComponent, OrdencompraService]
})
export class OrdencompraComponent implements OnInit {
  p:number=1;
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  DataArrayGeneral: any = [];
  DataArray: any = [];
  itempage = 5;
  id_eliminar: any;

  tipo: any;
  mensaje: any;
  info: any;

  public searchString: any;

  constructor(public router: Router,
              public ordencompraService: OrdencompraService,
              private route: ActivatedRoute,
              public sidebardComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.tipo = this.route.snapshot.params.tipo;
    this.mensaje = this.route.snapshot.params.mensaje;
    this.info = this.route.snapshot.params.info;
  }

  ngOnInit() {
    this.LoadOrdenesCompra();
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
    if (this.tipo === 'success') {
      setTimeout(() => this.toastr.success(this.mensaje, this.info));
    }
  }

  LoadOrdenesCompra() {
    this.ordencompraService.getOrdenesCompra().subscribe(
      data => {
        this.DataArrayGeneral = data;
        for (const key of this.DataArrayGeneral) {
          this.DataArray.push({
            'afecta': key.afecta,
            'descripcion': key.descripcion,
            'estado_cierre': key.estado_cierre,
            'estado_email': key.estado_email,
            'estado_generarcompra': key.estado_generarcompra,
            'fecha_entrega': key.fecha_entrega,
            'fecha_pedido': key.fecha_pedido,
            'forma_pago': key.forma_pago,
            'id': key.id,
            'idCompra': key.idCompra,
            'idOrden': key.idOrden,
            'id_cliente': key.id_cliente,
            'id_compra': key.id_compra,
            'id_orden': key.id_orden,
            'id_proveedor': key.id_proveedor,
            'leido_sab': key.leido_sab,
            'modificada': key.modificada,
            'num_factura': key.num_factura,
            'razon_comercial': key.razon_comercial,
            'razon_social': key.razon_social,
            'tipo': key.tipo,
          });
        }
        this.DataArray.sort(function(a, b) {
          if (a.id_orden < b.id_orden) {
            return 1;
          }
          if (a.id_orden > b.id_orden) {
            return -1;
          }
          return 0;
        });
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

  bindingEliminarOrden(id_orden) {
    this.id_eliminar = id_orden;
  }

  deleteOrden(id_eliminar) {
    this.ordencompraService.deleteOrdenesCompra(id_eliminar).subscribe(
      data => {
        if (data.text() === 'success') {
          for (let i = 0; i < this.DataArray.length; i++) {
            let index;
            if (id_eliminar === this.DataArray[i].id) {
              index = this.DataArray.indexOf(this.DataArray[i]);
              this.DataArray.splice(index, 1);
            }
          }
          Swal.fire({
            title: 'Orden Compra',
            text: 'La orden de compra fue eliminada con exito',
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Orden Compra',
            text: 'La orden de compra con id de orden  no se pudo eliminar',
            type: 'error',
          });
        }
      }
    );
  }

}
