import {Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ModificarimpuestoventasService} from './modificarimpuestoventas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modificarimpuestoventas',
  templateUrl: './modificarimpuestoventas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ModificarimpuestoventasService]
})
export class ModificarimpuestoventasComponent implements OnInit {

  idClase: any;
  idGrupo: any;

  DataNewImp: any = [];
  searchStringClases: any;
  itempageClases = 5;
  DataJsonClases: any = [];
  DataCliente: any = [];
  DataImpuestoDif: any = [];

  regitrosImpuestos: any = [];
  DataArrayImpuesto: any = [];
  DataCanales: any = [];
  canalInstitucional = false;
  DataTarifas: any = [];
  DataJsonImpVen: any = [];
  DataImpuestosVentaClase: any = [];
  formaAsig: any;
  searchStringTI: any;
  itempageTI = 5;
  registrosCanalImp: any = [];
  DataJsonGrupos: any = [];
  DataImpuestosCanalIns: any = [];
  DataImpuestosVenta: any = [];
  searchStringGrupos: any;
  itempageGrupos = 5;
  DataArticulos: any = [];

  ti :number=1;
  mc :number=1;
  mg :number=1;
  


  @ViewChild('difCanalForm', {static: true})
  private difCanalForm: NgForm;

  @ViewChild('todosCanalForm', {static: true})
  private todosCanalForm: NgForm;


  constructor(public router: Router,
              public toastr: ToastrService,
              public modificarimpuestoventasService: ModificarimpuestoventasService,
              vcr: ViewContainerRef,
              private route: ActivatedRoute) {
    this.idClase = this.route.snapshot.params.idClase;
    this.idGrupo = this.route.snapshot.params.idGrupo;
    this.formaAsig = this.route.snapshot.params.formaAsignacion;
    this.LoadDatosCliente();
  }

  ngOnInit() {
    if (this.formaAsig === '1') {
      this.LoadImpuestosVentasClase();
    } else {
      this.LoadImpuestosVentas();
    }
    this.LoadClases();
    this.LoadGrupos(this.idClase);
  }

  Regresar() {
    this.router.navigate(['configuraciones2/impuestosventas']);
  }

  LoadClases() {
    this.modificarimpuestoventasService.getClases().subscribe(
      data => {
        console.log(data);
        this.DataJsonClases = data;
      }
    );
  }

  clickFilaClases(id) {
    this.DataNewImp.id_clase = id.toString();
  }

  GuardarClase(idClase) {
    this.DataNewImp.clase = this.DataJsonClases.filter(x => parseInt(x.id, 0) === parseInt(idClase, 0))[0].nombre;
    this.LoadGrupos(idClase);
  }

  LoadGrupos(idClase) {
    this.modificarimpuestoventasService.getGrupos(idClase).subscribe(
      data => {
        console.log(data);
        // this.DataJsonGrupos = data;
        for (const key of data) {
          this.DataJsonGrupos.push({
            'id': key.id,
            'nombre': key.nombre
          });
        }
      }
    );
  }

  clickFilaGrupos(id) {
    this.DataNewImp.id_grupo = id.toString();
  }

  GuardarGrupo(idGrupo) {
    this.DataNewImp.grupo = this.DataJsonGrupos.filter(x => parseInt(x.id, 0) === parseInt(idGrupo, 0))[0].nombre;
  }

  LoadImpuestosVentasClase() {
    this.modificarimpuestoventasService.getImpuestosVentaClase(this.idClase).subscribe(
      data => {
        console.log(data);
        this.DataJsonImpVen = data[0];
        this.DataNewImp.id = this.DataJsonImpVen.id;
        this.DataNewImp.id_clase = this.DataJsonImpVen.idClase;
        this.DataNewImp.clase = this.DataJsonImpVen.nombreClase;
        this.DataNewImp.id_grupo = this.DataJsonImpVen.idGrupoVentaInv;
        this.DataNewImp.grupo = this.DataJsonImpVen.nombreGrupoVentaInv;
        console.log(this.DataCliente.impuesto_dif_canal);
        console.log(this.DataJsonImpVen.impDifCanal);
        if (this.DataCliente.impuesto_dif_canal === true && this.DataJsonImpVen.impDifCanal === true) {
          this.DataNewImp.impdif = 1;
          this.DataNewImp.id_impuesto = this.DataJsonImpVen.idImpuesto;
          this.DataNewImp.id_tarifa = this.DataJsonImpVen.idTarifa;
        } else if (this.DataCliente.impuesto_dif_canal === true && this.DataJsonImpVen.impDifCanal === false) {
          this.DataNewImp.impdif = 0;
          this.DataNewImp.id_impuesto = undefined;
          this.DataNewImp.id_tarifa = undefined;
        } else if (this.DataCliente.impuesto_dif_canal === false) {
          this.DataNewImp.impdif = 1;
          this.DataNewImp.id_impuesto = this.DataJsonImpVen.idImpuesto;
          this.DataNewImp.id_tarifa = this.DataJsonImpVen.idTarifa;
        }

        this.LoadImpuestosVentaCanal(this.DataJsonImpVen.id);
      },
      error => {
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  LoadImpuestosVentas() {
    this.modificarimpuestoventasService.getImpuestosVenta(this.idClase, this.idGrupo).subscribe(
      data => {
        console.log(data);
        this.DataJsonImpVen = data[0];
        this.DataNewImp.id = this.DataJsonImpVen.id;
        this.DataNewImp.id_clase = this.DataJsonImpVen.idClase;
        this.DataNewImp.clase = this.DataJsonImpVen.nombreClase;
        this.DataNewImp.id_grupo = this.DataJsonImpVen.idGrupoVentaInv;
        this.DataNewImp.grupo = this.DataJsonImpVen.nombreGrupoVentaInv;
        if (this.DataCliente.impuesto_dif_canal === true && this.DataJsonImpVen.impDifCanal === true) {
          this.DataNewImp.impdif = 1;
          this.DataNewImp.id_impuesto = this.DataJsonImpVen.idImpuesto;
          this.DataNewImp.id_tarifa = this.DataJsonImpVen.idTarifa;
        } else if (this.DataCliente.impuesto_dif_canal === true && this.DataJsonImpVen.impDifCanal === false) {
          this.DataNewImp.impdif = 0;
          this.DataNewImp.id_impuesto = undefined;
          this.DataNewImp.id_tarifa = undefined;
        } else if (this.DataCliente.impuesto_dif_canal === false) {
          this.DataNewImp.impdif = 1;
          this.DataNewImp.id_impuesto = this.DataJsonImpVen.idImpuesto;
          this.DataNewImp.id_tarifa = this.DataJsonImpVen.idTarifa;
        }
        this.LoadImpuestosVentaCanal(this.DataJsonImpVen.id);
      },
      error => {
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  LoadImpuestosVentaCanal(idImpVen) {

    this.modificarimpuestoventasService.getImpuestosVentaCanal(idImpVen).subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          if (key.idCanal === 6) {
            this.DataNewImp.id_impuestoIns = key.idImpuesto;
            this.DataNewImp.id_tarifaIns = key.idTarifa;
          } else {
            this.DataImpuestosVentaClase.push({
              /* 'id_clase': dataPrincipal.id_clase,
              'clase': dataPrincipal.clase,
              'id_grupo': dataPrincipal.id_grupo,
              'grupo': dataPrincipal.grupo, */
              'id': this.registrosCanalImp.length,
              'id_canal': key.idCanal,
              'canal': key.nombreCanal,
              'id_impuesto': key.idImpuesto,
              'impuesto': key.nombreImpuesto,
              'id_tarifa': key.idTarifa,
              'valor_tarifa': key.valorTarifa
            });
            this.registrosCanalImp.push('registrosCanalImp2');
          }
        }
      });
  }

  LoadDatosCliente() {
    this.modificarimpuestoventasService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
        console.log(this.DataCliente);
        this.LoadImpuestoCliente(this.DataCliente.id);
        this.LoadCanalesCliente(this.DataCliente.id);
      }
    );
  }

  LoadImpuestoCliente(idCliente) {
    this.modificarimpuestoventasService.getImpuestosPorCliente(idCliente).subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          const existe = this.DataArrayImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(key.id_impuesto, 0)
            && parseInt(x.id_regimen, 0) === parseInt(key.id_regimen, 0));
          if (existe.length === 0) {
            this.DataArrayImpuesto.push(
              {
                'id': this.regitrosImpuestos.length,
                'id_impuesto': key.id_impuesto,
                'nombre_impuesto': key.nombre_impuesto,
                'id_regimen': key.id_regimen,
                'nombre_regimen': key.nombre_regimen,
                'id_pais': key.id_pais,
                'nombre_pais': key.nombre_pais,
                'id_tarifa': key.id_tarifa,
                'valor_tarifa': key.valor_tarifa,
                'impuesto_mas_usado': key.impuesto_mas_usado
              }
            );
            this.regitrosImpuestos.push('impuestos1');
          }
          this.DataTarifas.push({
            'id_tarifa': key.id_tarifa,
            'valor_tarifa': key.valor_tarifa
          });
        }
      });
  }

  LoadCanalesCliente(idCliente) {
    this.modificarimpuestoventasService.getCanalesPorCliente(idCliente).subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          this.DataCanales.push({
            'id': key.id_canal,
            'nombre': key.nombre_canal
          });
        }

        const existeInstitucional = this.DataCanales.filter(x => parseInt(x.id, 0) === 6);
        console.log(existeInstitucional);
        if (existeInstitucional.length >= 1) {
          this.canalInstitucional = true;
        }
      }
    );
  }

  MostarCanalDiferente(datosImpuesto, dataPrincipal) {
    console.log(dataPrincipal);

    const impuesto = this.DataArrayImpuesto.filter(x =>
      parseInt(x.id_impuesto, 0) === parseInt(datosImpuesto.id_impuesto, 0))[0].nombre_impuesto;
    const tarifa = this.DataTarifas.filter(x => parseInt(x.id_tarifa, 0) === parseInt(datosImpuesto.id_tarifa, 0))[0].valor_tarifa;
    const canal = this.DataCanales.filter(x => parseInt(x.id, 0) === parseInt(datosImpuesto.id_canal, 0))[0].nombre;

    this.DataImpuestosVentaClase.push({
      /* 'id_clase': dataPrincipal.id_clase,
      'clase': dataPrincipal.clase,
      'id_grupo': dataPrincipal.id_grupo,
      'grupo': dataPrincipal.grupo, */
      'id': this.registrosCanalImp.length,
      'id_canal': datosImpuesto.id_canal,
      'canal': canal,
      'id_impuesto': datosImpuesto.id_impuesto,
      'impuesto': impuesto,
      'id_tarifa': datosImpuesto.id_tarifa,
      'valor_tarifa': tarifa
    });
    this.registrosCanalImp.push('registrosCanalImp1');
    console.log(this.DataImpuestosVentaClase);
  }

  QuitarCanalImpuesto(datos) {
    for (let i = 0; i < this.DataImpuestosVentaClase.length; i++) {
      let index = '';
      if (parseInt(datos.id, 0) === parseInt(this.DataImpuestosVentaClase[i].id, 0)) {
        index = this.DataImpuestosVentaClase.indexOf(this.DataImpuestosVentaClase[i]);
        this.DataImpuestosVentaClase.splice(index, 1);
      }
    }
  }

  update(datosImpuesto) {
    console.log(datosImpuesto);
    console.log(this.formaAsig);
    if (this.formaAsig === '1') {
      this.updateClase(datosImpuesto);
    } else {
      this.updateGrupo(datosImpuesto);
    }
  }

  updateClase(datosImpuesto) {

    this.modificarimpuestoventasService.updateClase(datosImpuesto.id_clase).subscribe(
      data => {
        console.log(data);
        this.onSubmit(datosImpuesto);
      });
  }

  updateGrupo(datosImpuesto) {

    this.modificarimpuestoventasService.updateGrupo(datosImpuesto.id_clase, datosImpuesto.id_grupo).subscribe(
      data => {
        console.log(data);
        this.onSubmit(datosImpuesto);
      });
  }

  onSubmit(datosImpuesto) {
    console.log(datosImpuesto);
    if (datosImpuesto.impdif === undefined) {
      datosImpuesto.impdif = 1;
    }

    let impuesto;
    let tarifa;
    if (this.DataCliente.impuesto_dif_canal === true && datosImpuesto.impdif === 0) {
      impuesto = 1;
      tarifa = 1;
    } else if (this.DataCliente.impuesto_dif_canal === true && datosImpuesto.impdif === 1) {
      impuesto = datosImpuesto.id_impuesto;
      tarifa = datosImpuesto.id_tarifa;
    } else if (this.DataCliente.impuesto_dif_canal === false) {
      impuesto = datosImpuesto.id_impuesto;
      tarifa = datosImpuesto.id_tarifa;
    }


    if (this.canalInstitucional === true) {
      for (const key of this.DataCanales) {
        if (parseInt(key.id, 0) === 6) {
          this.DataImpuestosCanalIns.push({
            'id_canal': key.id,
            'id_impuesto': datosImpuesto.id_impuestoIns,
            'id_tarifa': datosImpuesto.id_tarifaIns
          });
        }
      }
    }

    if (this.formaAsig === '1') {
      for (const gru of this.DataJsonGrupos) {
        this.DataImpuestosVenta.push({
          'id_clase': datosImpuesto.id_clase,
          'id_grupo': gru.id,
          'id_impuesto': datosImpuesto.id_impuesto,
          'id_tarifa': datosImpuesto.id_tarifa
        });

      }
      this.updateArticulosClase(datosImpuesto, impuesto, tarifa);
    } else {
      this.DataImpuestosVenta.push({
        'id_clase': datosImpuesto.id_clase,
        'id_grupo': datosImpuesto.id_grupo,
        'id_impuesto': datosImpuesto.id_impuesto,
        'id_tarifa': datosImpuesto.id_tarifa
      });
      this.updateArticulosGrupo(datosImpuesto, impuesto, tarifa);
    }

    let postImpuestos;
    console.log(this.DataImpuestosVenta);
    for (const key of this.DataImpuestosVenta) {
      console.log(datosImpuesto.impdif);
      postImpuestos = {
        'clases': {
          'id': key.id_clase
        },
        'impDifCanal': datosImpuesto.impdif,
        'grupoVentaInv': {
          'id': key.id_grupo
        },
        'impuesto': {
          'id': impuesto
        },
        'tarifa': {
          'id': tarifa
        }
      };
      this.createImpuesto(postImpuestos, datosImpuesto.impdif);
    }
  }

  createImpuesto(DataList, impDif) {
    console.log(DataList);
    this.modificarimpuestoventasService.postImpuestoVenta(DataList).subscribe(
      resul => {
        console.log(resul);
        if (resul.text() !== '0') {
          this.createImpuestoCanal(resul.text(), impDif);
          this.router.navigate(['configuraciones2/impuestosventas']);
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo exitosamente',
            type: 'success',
          });
        } else {
          console.log(resul.text());
        }
      });
  }

  updateArticulosClase(datosImpuesto, impuesto, tarifa) {
    let impDif;
    if (datosImpuesto.impdif === 1) {
      impDif = true;
    } else {
      impDif = false;
    }
    this.modificarimpuestoventasService.updateArticulosClase(datosImpuesto.id_clase, impDif, impuesto, tarifa).subscribe(
      resul => {
        console.log(resul);
        this.updateAriculosVentaCanalClase(datosImpuesto.id_clase, datosImpuesto.impdif);
      }
    );
  }

  updateArticulosGrupo(datosImpuesto, impuesto, tarifa) {
    let impDif;
    if (datosImpuesto.impdif === 1) {
      impDif = true;
    } else {
      impDif = false;
    }
    this.modificarimpuestoventasService.updateArticulosGrupo(datosImpuesto.id_grupo, impDif, impuesto, tarifa).subscribe(
      resul => {
        console.log(resul);
        this.updateAriculosVentaCanalGrupo(datosImpuesto.id_grupo, datosImpuesto.impdif);
      }
    );
  }

  createImpuestoCanal(idImpVen, impuestoDiferencial) {
    console.log(this.DataImpuestosVentaClase);

    const impuestosventas = {
      canal: []
    };
    console.log(impuestoDiferencial);
    console.log(this.DataImpuestosCanalIns);
    if (impuestoDiferencial === 1) {
      for (const key of this.DataImpuestosCanalIns) {
        impuestosventas.canal.push({
          'impuestosventas': {
            'id': idImpVen
          },
          'canal': {
            'id': key.id_canal
          },
          'impuesto': {
            'id': key.id_impuesto
          },
          'tarifa': {
            'id': key.id_tarifa
          }
        });
      }
    } else {
      for (const key of this.DataImpuestosVentaClase) {
        impuestosventas.canal.push({
          'impuestosventas': {
            'id': idImpVen
          },
          'canal': {
            'id': key.id_canal
          },
          'impuesto': {
            'id': key.id_impuesto
          },
          'tarifa': {
            'id': key.id_tarifa
          }
        });
      }
    }
    this.modificarimpuestoventasService.postImpuestoVentaCanal(impuestosventas.canal).subscribe(
      resul => {
        console.log(resul);
      });
  }

  updateAriculosVentaCanalClase(idClase, impuestoDiferencial) {

    const impuestosventas = {
      canal: []
    };
    console.log(impuestoDiferencial);
    console.log(this.DataImpuestosCanalIns);
    if (impuestoDiferencial === 1) {
      for (const key of this.DataImpuestosCanalIns) {
        impuestosventas.canal.push({
          'id_canal': key.id_canal,
          'id_impuesto': key.id_impuesto,
          'id_tarifa': key.id_tarifa
        });
      }
    } else {
      for (const key of this.DataImpuestosVentaClase) {
        impuestosventas.canal.push({
          'id_canal': key.id_canal,
          'id_impuesto': key.id_impuesto,
          'id_tarifa': key.id_tarifa
        });
      }
    }
    this.modificarimpuestoventasService.updateArticuloVentaCanalClase(idClase, impuestosventas.canal).subscribe(
      resul => {
        console.log(resul);
      });
  }


  updateAriculosVentaCanalGrupo(idGrupo, impuestoDiferencial) {

    const impuestosventas = {
      canal: []
    };
    console.log(impuestoDiferencial);
    console.log(this.DataImpuestosCanalIns);
    if (impuestoDiferencial === 1) {
      for (const key of this.DataImpuestosCanalIns) {
        impuestosventas.canal.push({
          'canal': {
            'id': key.id_canal
          },
          'impuesto': {
            'id': key.id_impuesto
          },
          'tarifa': {
            'id': key.id_tarifa
          }
        });
      }
    } else {
      for (const key of this.DataImpuestosVentaClase) {
        impuestosventas.canal.push({
          'canal': {
            'id': key.id_canal
          },
          'impuesto': {
            'id': key.id_impuesto
          },
          'tarifa': {
            'id': key.id_tarifa
          }
        });
      }
    }
    this.modificarimpuestoventasService.updateArticuloVentaCanalGrupo(idGrupo, impuestosventas.canal).subscribe(
      resul => {
        console.log(resul);
      });
  }

  LimpiarFormDifCanal() {
    this.difCanalForm.reset();
  }

  LimpiarFormClases() {
    this.DataNewImp.id_clase = undefined;
  }

  LimpiarFormGrupo() {
    this.DataNewImp.id_grupo = undefined;
  }
}
