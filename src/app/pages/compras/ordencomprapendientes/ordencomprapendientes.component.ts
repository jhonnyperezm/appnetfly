import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { RutasService } from '../../../services/rutas.service';
import { OrdencomprapendientesService } from './ordencomprapendientes.service';


@Component({
  selector: 'app-ordencomprapendientes',
  templateUrl: './ordencomprapendientes.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [OrdencomprapendientesService, RutasService, SidebarComponent ]
})
export class OrdencomprapendientesComponent implements OnInit {
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  DataArrayOrdenesPendientes: any = [];
  searchStringOCpendientes: any;
  itempageOCpendientes = 5;

  ocp:number=1;

  constructor(public router: Router,
    public sidebarComponent: SidebarComponent,
    public ordencomprapendientesService: OrdencomprapendientesService,
    public rutasService: RutasService,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    public route: ActivatedRoute) {
    this.LoadOCPendientesData();
  }

  ngOnInit() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
  }

  LoadOCPendientesData() {
    this.ordencomprapendientesService.getOCPendientes().subscribe(
      data => {
        this.DataArrayOrdenesPendientes = data;
        this.loader = false;
        this.LoadTabla = true;
        this.DataArrayOrdenesPendientes.sort(function (a, b) {
          if (a.id_orden < b.id_orden) {
            return 1;
          }
          if (a.id_orden > b.id_orden) {
            return -1;
          }
          return 0;
        });
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
