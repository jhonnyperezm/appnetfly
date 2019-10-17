import { Component, OnInit, ViewChild } from '@angular/core';
import { PuntoconfiggeneralService } from './puntoconfiggeneral.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntoconfiggeneral',
  templateUrl: './puntoconfiggeneral.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [PuntoconfiggeneralService, SidebarComponent]
})
export class PuntoconfiggeneralComponent implements OnInit {

  DataPuntos: any = [];
  id: any;
  nombreCliente: any;
  itempage = 5;
  LoadError: boolean;
  loader: boolean;
  LoadTabla: boolean;
  error: any;
  rol: boolean;
  idPunto: any;
  nombrePunto: any;
  searchString: any;
  DataArrayPuntos: any = [];
  DataJsonPuntos: any = [];
  DataJsonOrdenPuntos: any = [];
  DataPuntoSel: any = [];
  registrosordenpuntos: any = [];
  DataPuntoOrdenSel: any = [];
  DataArrayPuntoPosicion: any = [];
  tp:number=1;
  tpo:number=1;

  @ViewChild('ConfPuntoForm', {static:true})
  private ConfPuntoForm: NgForm;

  constructor(public router: Router,
    private route: ActivatedRoute,
    public puntoconfiggeneralService: PuntoconfiggeneralService,
    public SidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.id = this.route.snapshot.params.idCliente;
    this.nombreCliente = this.route.snapshot.params.nombreCliente;

    this.DataPuntos.codDel = '';
    this.DataPuntos.codAl = '';
    this.DataPuntos.cantDel = '';
    this.DataPuntos.cantAl = '';
    this.DataPuntos.preDel = '';
    this.DataPuntos.preAl = '';
    this.LoadPuntos();
  }

  ngOnInit() {
    this.LoadConfiguraciones();
    this.LoadPuntosOrden();
  }

  Regresar() {
    this.router.navigate(['/configuraciones/clientes/puntos/' + this.id]);
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadConfiguraciones() {
    this.puntoconfiggeneralService.getConfiguracion(this.id).subscribe(
      data => {
        console.log(data);
        if (data.length >= 1) {
          if (data[0].idocon === true) {
            this.DataPuntos.impcontcons = 1;
          } else if (data[0].idocon === false) {
            this.DataPuntos.impcontcons = 0;
          }
          if (data[0].adicionalCodBarras === true) {
            this.DataPuntos.infoCodBarras = 1;
          } else if (data[0].adicionalCodBarras === false) {
            this.DataPuntos.infoCodBarras = 0;
          }
          this.DataPuntos.codDel = data[0].cobacodel;
          this.DataPuntos.codAl = data[0].cobacoal;
          this.DataPuntos.cantDel = data[0].cobacadel;
          this.DataPuntos.cantAl = data[0].cobacaal;
          this.DataPuntos.preDel = data[0].cobaprdel;
          this.DataPuntos.preAl = data[0].cobapral;
          this.DataPuntos.calculoCosto = data[0].cospun;
          if (data[0].ordenCosteo === true) {
            this.DataPuntos.ordenCosteo = 1;
          } else {
            this.DataPuntos.ordenCosteo = 0;
          }
          this.DataPuntos.idConfiguracionAlm = data[0].id;
        }
      }
    );
  }

  LoadPuntos() {
    this.puntoconfiggeneralService.getPuntos(this.id).subscribe(
      data => {
        console.log(data);
        this.DataArrayPuntos = data;
        // this.DataJsonPuntos = data;
        for (const key of this.DataArrayPuntos) {
          this.DataJsonPuntos.push({
            'cod': key.cod,
            'creado_por': key.creado_por,
            'direccion': key.direccion,
            'estado': key.estado,
            'extension': key.extension,
            'extension2': key.extension2,
            'fecha_creacion': key.fecha_creacion,
            'fecha_modificacion': key.fecha_modificacion,
            'id': key.id,
            'idPunto': key.idPunto,
            'id_centro_costo': key.id_centro_costo,
            'id_cliente': key.id_cliente,
            'id_municipio': key.id_municipio,
            'id_punto': key.id_punto,
            'id_tipo_negocio': key.id_tipo_negocio,
            'modificado_por': key.modificado_por,
            'nombre': key.nombre,
            'nombre_municipio': key.nombre_municipio,
            'nombre_negocio': key.nombre_negocio,
            'telefono': key.telefono,
            'telefono2': key.telefono2,
            'orden': ''
          });
        }
        this.LoadPuntosPosicionOrden();
      }
    );
  }


  LoadPuntosOrden() {
    for (let i = 0; i <= 7; i++) {
      this.DataJsonOrdenPuntos.push({
        'numero': this.registrosordenpuntos.length + 1,
        'id_punto': 0,
        'nombre': 'Disponible'
      });
      this.registrosordenpuntos.push('registrosordenpuntos1');
    }
  }
  LoadPuntosPosicionOrden() {
    this.puntoconfiggeneralService.getPuntosPosiciones(this.id).subscribe(
      data => {
        console.log(data);
        console.log(this.DataJsonPuntos);
        this.DataArrayPuntoPosicion = data;

        for (const key of this.DataArrayPuntoPosicion) {
          for (let i = 0; i < this.DataJsonOrdenPuntos.length; i++) {
            if (this.DataJsonOrdenPuntos[i].numero === key.posicion) {
              this.DataJsonOrdenPuntos[i].id_punto = key.idPunto;
              this.DataJsonOrdenPuntos[i].nombre = key.nombre;
            }
          }
          for (let i = 0; i < this.DataJsonPuntos.length; i++) {
            console.log(key.idPunto);
            if (this.DataJsonPuntos[i].id_punto === key.idPunto) {
              this.DataJsonPuntos[i].orden = key.posicion;
            }
          }
        }
      }
    );
  }

  seleccionarPunto(datos) {
    this.DataPuntoSel.idPunto = datos.id_punto;
    this.DataPuntoSel.nombrePunto = datos.nombre;
  }

  Incluir(datos) {
    let cont = 0;
    const existe = this.DataJsonOrdenPuntos.filter(x => x.id_punto === datos.idPunto);

    if (existe.length === 0) {
      for (let i = 0; i < this.DataJsonOrdenPuntos.length; i++) {
        if (this.DataJsonOrdenPuntos[i].nombre === 'Disponible') {
          cont += 1;
          if (cont === 1) {
            this.DataJsonOrdenPuntos[i].id_punto = datos.idPunto;
            this.DataJsonOrdenPuntos[i].nombre = datos.nombrePunto;
            for (let j = 0; j < this.DataJsonPuntos.length; j++) {
              if (this.DataJsonPuntos[j].id_punto === datos.idPunto) {
                this.DataJsonPuntos[j].orden = this.DataJsonOrdenPuntos[i].numero;
              }
            }
          }
        }
      }
    }

    this.DataPuntoSel = [];
  }

  seleccionarOrdenPunto(datos) {
    console.log(datos);
    this.DataPuntoOrdenSel = datos;
  }

  Ascender(datos) {
    console.log(datos);
    for (let i = 0; i < this.DataJsonOrdenPuntos.length; i++) {
      if (i >= 1) {
        console.log(i);
        if (this.DataJsonOrdenPuntos[i].id_punto === datos.id_punto) {
          const id_punto_anterior = this.DataJsonOrdenPuntos[i - 1].id_punto;
          const nombre_anterior = this.DataJsonOrdenPuntos[i - 1].nombre;
          const numero_anterior = this.DataJsonOrdenPuntos[i - 1].numero;
          this.DataJsonOrdenPuntos[i - 1].id_punto = this.DataJsonOrdenPuntos[i].id_punto;
          this.DataJsonOrdenPuntos[i - 1].nombre = this.DataJsonOrdenPuntos[i].nombre;

          for (let j = 0; j < this.DataJsonPuntos.length; j++) {
            if (this.DataJsonPuntos[j].id_punto === this.DataJsonOrdenPuntos[i].id_punto) {
              this.DataJsonPuntos[j].orden = this.DataJsonOrdenPuntos[i - 1].numero;
            }
          }
          this.DataJsonOrdenPuntos[i].id_punto = id_punto_anterior;
          this.DataJsonOrdenPuntos[i].nombre = nombre_anterior;

          for (let j = 0; j < this.DataJsonPuntos.length; j++) {
            if (this.DataJsonPuntos[j].id_punto === id_punto_anterior) {
              this.DataJsonPuntos[j].orden = this.DataJsonOrdenPuntos[i].numero;
            }
          }

        }

      }
    }
    console.log(this.DataJsonPuntos);
    this.DataPuntoOrdenSel = [];
  }

  Descender(datos) {
    console.log(datos);
    for (let i = 0; i < this.DataJsonOrdenPuntos.length; i++) {
      if (i <= 6) {
        if (this.DataJsonOrdenPuntos[i].id_punto === datos.id_punto) {
          const id_punto_siguiente = this.DataJsonOrdenPuntos[i + 1].id_punto;
          const nombre_siguiente = this.DataJsonOrdenPuntos[i + 1].nombre;
          this.DataJsonOrdenPuntos[i + 1].id_punto = this.DataJsonOrdenPuntos[i].id_punto;
          this.DataJsonOrdenPuntos[i + 1].nombre = this.DataJsonOrdenPuntos[i].nombre;

          for (let j = 0; j < this.DataJsonPuntos.length; j++) {
            if (this.DataJsonPuntos[j].id_punto === this.DataJsonOrdenPuntos[i].id_punto) {
              this.DataJsonPuntos[j].orden = this.DataJsonOrdenPuntos[i + 1].numero;
            }
          }
          this.DataJsonOrdenPuntos[i].id_punto = id_punto_siguiente;
          this.DataJsonOrdenPuntos[i].nombre = nombre_siguiente;

          for (let j = 0; j < this.DataJsonPuntos.length; j++) {
            if (this.DataJsonPuntos[j].id_punto === id_punto_siguiente) {
              this.DataJsonPuntos[j].orden = this.DataJsonOrdenPuntos[i].numero;
            }
          }
        }
      }
    }
    this.DataPuntoOrdenSel = [];
  }

  Normal(datos) {
    console.log(datos);
    console.log(this.DataJsonOrdenPuntos);
    for (let i = 0; i < this.DataJsonPuntos.length; i++) {
      if (this.DataJsonPuntos[i].id_punto === datos.id_punto) {
        this.DataJsonPuntos[i].orden = '';
        for (let j = 0; j < this.DataJsonOrdenPuntos.length; j++) {
          console.log(this.DataJsonOrdenPuntos[j].id_punto);
          console.log(datos.id_punto);
          if (this.DataJsonOrdenPuntos[j].id_punto === datos.id_punto) {
            this.DataJsonOrdenPuntos[j].id_punto = 0;
            this.DataJsonOrdenPuntos[j].nombre = 'Disponible';
          }
        }
      }
    }
  }

  onSubmit(datos) {
    console.log(datos);
    const postData = {
      'id': datos.idConfiguracionAlm,
      'idocon': datos.impcontcons,
      'adicionalCodBarras': datos.infoCodBarras,
      'cospun': datos.calculoCosto,
      'cobacodel': datos.codDel,
      'cobacoal': datos.codAl,
      'cobacadel': datos.cantDel,
      'cobacaal': datos.cantAl,
      'cobaprdel': datos.preDel,
      'cobapral': datos.preAl,
      'ordenCosteo': datos.ordenCosteo,
      'idClienteConf': this.id
    };

    this.puntoconfiggeneralService.createAlmacen(postData).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'success') {
          this.router.navigate(['/configuraciones/clientes/puntos/' + this.id]);
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo exitosamente',
            type: 'success',
          });
          if (datos.ordenCosteo === 1) {
            this.onSubmitPuntos();
          } else {
            this.DataJsonOrdenPuntos = [];
            this.onSubmitPuntos();
          }
        } else {
          this.router.navigate(['/configuraciones/clientes/puntos/' + this.id]);
          Swal.fire({
            title: 'Error',
            text: 'El proceso no se realizo correctamente',
            type: 'error',
          });
        }
      }
    );
  }

  onSubmitPuntos() {
    const puntos = {
      posicion: []
    };
    console.log(this.DataJsonOrdenPuntos);
    for (const key of this.DataJsonOrdenPuntos) {
      if (key.id_punto !== 0) {
        puntos.posicion.push({
          'punto': {
            'id': key.id_punto
          },
          'posicion': key.numero,
          'idClienteConf': this.id
        });
      }
    }

    this.puntoconfiggeneralService.updatePuntoPosicionCosto(puntos.posicion, this.id).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
