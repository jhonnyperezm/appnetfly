import { Component, OnInit } from '@angular/core';
import { ImpuestosinactivosService } from './impuestosinactivos.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuestosinactivos',
  templateUrl: './impuestosinactivos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ImpuestosinactivosService, SidebarComponent]
})
export class ImpuestosinactivosComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;
  searchString: any;
  itempage = 5;
  idActivar: any;
  nombreActivar: any;
  noHayRegistros = false;

  constructor(public impuestosinactivosService: ImpuestosinactivosService,
    public SidebarComponent: SidebarComponent, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadImpuestosInactivos();
  }

  LoadImpuestosInactivos() {
    this.impuestosinactivosService.getImpuestosRegimen().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        let nombreModulo = '';
        if (this.DataArray.length !== 0) {
        for (const key of this.DataArray) {
          if (key.tipo_modulo === 1) {
            nombreModulo = 'Configuraciones';
          } else if (key.tipo_modulo === 2) {
            nombreModulo = 'Compras';
          }
          this.DataJson.push(
            {
              'id': key.id,
              'id_impuesto': key.id_impuesto,
              'nombre_impuesto': key.nombre_imp,
              'id_pais': key.id_pais,
              'nombre_pais': key.nombre_pais,
              'id_regimen': key.id_regimen,
              'nombre_regimen': key.nombre_reg,
              'tipo_modulo': key.tipo_modulo,
              'nombre_modulo': nombreModulo
            }
          );
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

  bindingDataActivar(id, nombreImp, nombreReg) {
    this.idActivar = id;
    this.nombreActivar = nombreImp + ' ' + nombreReg;
  }

  Activar(id, nombre) {
    this.impuestosinactivosService.putActivar(id).subscribe(data => {
      if (data.text() !== '0') {
        Swal.fire({
          title: 'Impuesto',
          text: 'Proceso realizado de manera Exitosa, El impuesto ' + nombre + 'fue Activado',
          type: 'success',
        });
        for (let i = 0; i < this.DataJson.length; i++) {
          let index;
          if (id === this.DataJson[i].id) {
            index = this.DataJson.indexOf(this.DataJson[i]);
            this.DataJson.splice(index, 1);
          }
        }
      } else {
        Swal.fire({
          title: 'Impuesto ',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

}
