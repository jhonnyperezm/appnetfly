import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {RutasService} from '../../../services/rutas.service';
import {CompraService} from './compra.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [CompraService, RutasService, SidebarComponent]
})
export class CompraComponent implements OnInit {
 c:number=1;
 pun:number=1;
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  tipo: any;
  info: any;
  mensaje: any;

  DataArrayGeneral: any = [];
  DataArrayCompras: any = [];
  searchStringCompras: any;
  itempageCompras = 5;
  contadorOCP: any;
  DataPuntosCliente: any = [];
  searchStringPun: any;
  itempagePun = 5;
  DataPuntoSel: any = [];
  DatosPuntoCompra: any = [];


  constructor(public router: Router,
              public compraService: CompraService,
              public sidevarComponent: SidebarComponent,
              public rutasService: RutasService,
              private toastr: ToastrService,
              public route: ActivatedRoute) {
    this.LoadComprasData();
    this.LoadContador();
    this.LoadPuntos();
  }

  ngOnInit() {
    this.tipo = this.route.snapshot.params.tipo;
    this.mensaje = this.route.snapshot.params.mensaje;
    this.info = this.route.snapshot.params.info;
    if (this.tipo == 'compracreada') {
      setTimeout(() => this.toastr.success(this.mensaje, this.info));
    }
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
  }

  LoadComprasData() {

    this.compraService.getCompras().subscribe(
      data => {
        this.DataArrayCompras = [];
        this.DataArrayGeneral = data;
        for (const key of this.DataArrayGeneral) {
          this.DataArrayCompras.push({
            'afecta': key.afecta,
            'descripcion': key.descripcion,
            'estado_cierre': key.estado_cierre,
            'estado_email': key.estado_email,
            'estado_generarcompra': key.estado_generarcompra,
            'fecha_compra': key.fecha_compra,
            'fecha_kardex': key.fecha_kardex,
            'fecha_vencimiento': key.fecha_vencimiento,
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
            'idPunto': key.idPunto,
            'estadoInventario': key.estadoInventario,
            'nombrePunto': key.nombrePunto
          });
        }
        this.DataArrayCompras.sort(function(a, b) {
          if (a.id_compra < b.id_compra) {
            return 1;
          }
          if (a.id_compra > b.id_compra) {
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

  LoadContador() {
    this.compraService.getCountOrdenesPendientes().subscribe(
      data => {
        this.contadorOCP = data.length;
      }
    );
  }

  clickFilaPuntos(id) {
    this.DataPuntoSel.id_punto = id.toString();
  }

  LoadPuntos() {
    this.DataPuntosCliente = [];
    this.compraService.getPuntosCliente().subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          this.DataPuntosCliente.push({
            'id_punto': key.id_punto,
            'nombre': key.nombre
          });
        }
      }
    );
  }

  bindingPuntos(datos) {
    this.DataPuntoSel.id_compra = datos.id;
  }

  bindingDatosPunto(data) {
    this.DatosPuntoCompra = data;
  }

  guardarPunto(datos) {
    console.log(datos);
    this.compraService.updatePuntoCompra(datos.id_compra, datos.id_punto).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'success') {
          Swal.fire({
            title: 'Exitoso',
            text: 'Se envio compra a inventario exitosamente',
            type: 'success',
          });
        } else if (data.text() === 'error') {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo enviar compra a inventario',
            type: 'error',
          });
        }
        this.LoadComprasData();
        this.DataPuntoSel = [];
      }
    );
  }


}
