import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImpuestosventasService } from './impuestosventas.service';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';


@Component({
  selector: 'app-impuestosventas',
  templateUrl: './impuestosventas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ImpuestosventasService, SidebarComponent]
})
export class ImpuestosventasComponent implements OnInit {

  imp:number=1;
  ti:number=1;
  mc :number=1;
  mg :number=1;




  searchStringTImpVen: any;
  itempageTImpVen = 5;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  noHayRegistros = false;
  DataJsonImpVen: any = [];

  constructor(public router: Router,
    public sidebarComponent: SidebarComponent,
    public impuestosventasService: ImpuestosventasService,
    public toastr: ToastrService) {
      this.loader = true;
      this.LoadTabla = false;
    }

  ngOnInit() {
    this.LoadImpuestosVenta();
  }

  LoadImpuestosVenta() {
    this.impuestosventasService.getImpuestosVenta().subscribe(
      data => {
        console.log(data);
        // this.DataJsonImpVen = data;
        if (data.length !== 0) {
        for (const key of data) {
          const existe = this.DataJsonImpVen.filter(x => x.idClase === key.idClase);
          if (existe.length === 0) {
            this.DataJsonImpVen.push({
              'idClase': key.idClase,
              'nombreClase': key.nombreClase
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
