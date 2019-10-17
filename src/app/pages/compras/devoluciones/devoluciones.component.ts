import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DevolucionesService} from './devoluciones.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {RutasService} from '../../../services/rutas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [DevolucionesService, RutasService, SidebarComponent]
})
export class DevolucionesComponent implements OnInit {

  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  tipo: any;
  info: any;
  mensaje: any;

  DataArrayDevoluciones: any = [];
  searchStringDevoluciones: any;
  itempageDevoluciones = 5;
  DataArrayArticulos: any = [];
  estado: any;

  dev:number=1;
  constructor(public router: Router,
              public devolucionesService: DevolucionesService,
              public rutasService: RutasService,
              public sidevarComponent: SidebarComponent,
              private toastr: ToastrService,
              vcr: ViewContainerRef,
              public route: ActivatedRoute) {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadDevolucionesData();
  }

  LoadDevolucionesData() {
    this.devolucionesService.getDevoluciones().subscribe(
      data => {
        this.DataArrayDevoluciones = data;

        this.DataArrayDevoluciones.sort(function(a, b) {
            if (a.id < b.id) {
              return 1;
            }
            if (a.id > b.id) {
              return -1;
            }
            return 0;
          }
        );
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
