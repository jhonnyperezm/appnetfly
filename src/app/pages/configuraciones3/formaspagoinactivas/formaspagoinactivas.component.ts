import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormaspagoinactivasService } from './formaspagoinactivas.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-formaspagoinactivas',
  templateUrl: './formaspagoinactivas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [FormaspagoinactivasService, SidebarComponent]
})
export class FormaspagoinactivasComponent implements OnInit {
  p:number=1;
  loader: boolean;
  LoadTabla: boolean;
  LoadError: boolean;
  error: any;

  idGrupoFP: any;
  nombreGrupoFP: any;
  DataJson: any = [];
  idActivar: any;
  nombreActivar: any;
  searchString: any;
  itempage = 5;
  noHayRegistros = false;

  constructor(
    public router: Router,
    public sidebarComponent: SidebarComponent,
    private route: ActivatedRoute,
    public formaspagoinactivasService: FormaspagoinactivasService, public toastr: ToastrService) {
    this.loader = true;
    this.LoadTabla = false;
    this.idGrupoFP = this.route.snapshot.params.idGrupoFP;
    this.nombreGrupoFP = this.route.snapshot.params.nombreGrupoFP;
  }

  ngOnInit() {
    this.LoadFormasPago();
  }

  LoadFormasPago() {
    this.formaspagoinactivasService.getFormasPago(this.idGrupoFP).subscribe(
      data => {
        this.DataJson = [];
        console.log(data);
        if (data.length !== 0) {
          for (const key of data) {
            this.DataJson.push({
              camoin: key.camoin,
              codigo: key.codigo,
              codigoGrupo: key.codigoGrupo,
              comban: key.comban,
              complementarios: key.complementarios,
              creadoPor: key.creadoPor,
              descue: key.descue,
              estado: key.estado,
              fechaCreacion: key.fechaCreacion,
              fechaModificacion: key.fechaModificacion,
              fobase: key.fobase,
              forcap: key.forcap,
              id: key.id,
              idClienteConf: key.idClienteConf,
              impresionFactura: key.impresionFactura,
              modificadoPor: key.modificadoPor,
              nombre: key.nombre,
              nombreGrupo: key.nombreGrupo,
              pagexa: key.pagexa,
              porbas: key.porbas,
              porcom: key.porcom,
              retfue: key.retfue,
              retica: key.retica,
              retiva: key.retiva,
              rffoba: key.rffoba,
              rfpoba: key.rfpoba,
              rfpoco: key.rfpoco,
              ricfoba: key.ricfoba,
              ricpoba: key.ricpoba,
              ricpoco: key.ricpoco,
              rifoba: key.rifoba,
              ripoba: key.ripoba,
              ripoco: key.ripoco,
              vadac1: key.vadac1,
              vadac2: key.vadac2,
              vadac3: key.vadac3,
              vadac4: key.vadac4,
              vadac5: key.vadac5
            });
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
  bindingDataActivar(id, nombre) {
    this.idActivar = id;
    this.nombreActivar = nombre;
  }

  Activar(id, nombre) {
    this.formaspagoinactivasService.putActivar(id).subscribe();
    Swal.fire({
      title: 'Forma de pago Activada',
      text: 'Proceso realizado de manera Exitosa, la forma de pago ' + nombre + ' fue activada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataJson[i].id, 0)) {
        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);

      }
    }
  }

}
