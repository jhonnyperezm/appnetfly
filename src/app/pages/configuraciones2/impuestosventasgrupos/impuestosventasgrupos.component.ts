import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ImpuestosventasgruposService} from './impuestosventasgrupos.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';


@Component({
  selector: 'app-impuestosventasgrupos',
  templateUrl: './impuestosventasgrupos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ImpuestosventasgruposService, SidebarComponent]
})
export class ImpuestosventasgruposComponent implements OnInit {

  searchStringTImpVen: any;
  itempageTImpVen = 5;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  DataJsonImpVen: any = [];
  idClase: any;
  noHayRegistros = false;
  imp:number=1;

  constructor(public router: Router,
              public sidebarComponent: SidebarComponent,
              public impuestosventasgruposService: ImpuestosventasgruposService,
              public toastr: ToastrService,
              private route: ActivatedRoute) {
    this.idClase = this.route.snapshot.params.idClase;
  }

  ngOnInit() {
    this.LoadImpuestosVenta();
  }

  LoadImpuestosVenta() {
    this.impuestosventasgruposService.getImpuestosVenta(this.idClase).subscribe(
      data => {
        console.log(data);
        // this.DataJsonImpVen = data;
        if (data.length !== 0) {
          for (const key of data) {
            const existe = this.DataJsonImpVen.filter(x => x.idGrupoVentaInv === key.idGrupoVentaInv);
            if (existe.length === 0) {
              this.DataJsonImpVen.push({
                'idGrupoVentaInv': key.idGrupoVentaInv,
                'nombreGrupoVentaInv': key.nombreGrupoVentaInv
              });
            }
          }
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
