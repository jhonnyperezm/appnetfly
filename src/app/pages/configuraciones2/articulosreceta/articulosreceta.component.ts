import { Component, OnInit } from '@angular/core';
import { ArticulosrecetaService } from './articulosreceta.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-articulosreceta',
  templateUrl: './articulosreceta.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ ArticulosrecetaService, SidebarComponent ]
})
export class ArticulosrecetaComponent implements OnInit {
  p:number=1;
  DataArticulos: any = [];
  checkPermiso: boolean;
  itempage = 5;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  noHayRegistros = false;
  idArticulo: any;
  nombreArticulo: any;
  searchString: any;

  constructor(public articulosrecetaService: ArticulosrecetaService,
    public SidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
      this.loader = true;
      this.LoadTabla = false;
      this.checkPermiso = false;
    }

  ngOnInit() {
    this.LoadArticulosReceta();
  }
  LoadArticulosReceta() {
    this.articulosrecetaService.getArticulosReceta().subscribe(
      data => {
        this.DataArticulos = data;
        if (this.DataArticulos.length !== 0) {
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
}
