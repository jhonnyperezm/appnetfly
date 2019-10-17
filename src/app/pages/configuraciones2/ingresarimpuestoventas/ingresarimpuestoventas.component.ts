import {Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {IngresarimpuestoventasService} from './ingresarimpuestoventas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresarimpuestoventas',
  templateUrl: './ingresarimpuestoventas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [IngresarimpuestoventasService]
})
export class IngresarimpuestoventasComponent implements OnInit {

  formaAsig: any;
  DataNewImp: any = [];
  searchStringClases: any;
  itempageClases = 5;
  DataJsonClases: any = [];
  searchStringGrupos: any;
  itempageGrupos = 5;
  DataJsonGrupos: any = [];
  DataCliente: any = [];
  DataArrayImpuesto: any = [];
  regitrosImpuestos: any = [];
  DataCanales: any = [];
  DataTarifas: any = [];
  DataImpuesto: any = [];
  DataImpuestosVentaClase: any = [];
  searchStringTI: any;
  itempageTI = 5;
  DataImpuestosVentaGrupo: any = [];
  ListaGruposSel: any = [];
  ListaGrupos: any = [];
  searchStringTGrupos: any;
  itempageTGrupos = 5;
  DataImpuestoIns: any = [];
  DataImpuestoDif: any = [];
  canalInstitucional = false;
  DataImpuestosVenta: any = [];
  postImpuestos: any = [];
  registrosCanalImp: any = [];
  DataImpuestosCanalIns: any = [];
  ti:number=1;
  mc :number=1;
  mg :number=1;
  imp:number=1;

  @ViewChild('paisRegimenForm', {static: true})
  private paisRegimenForm: NgForm;

  @ViewChild('difCanalForm', {static: true})
  private difCanalForm: NgForm;

  @ViewChild('todosCanalForm', {static: true})
  private todosCanalForm: NgForm;

  constructor(public router: Router,
              public toastr: ToastrService,
              public ingresarimpuestoventasService: IngresarimpuestoventasService,
              vcr: ViewContainerRef,
              private route: ActivatedRoute) {
    this.formaAsig = this.route.snapshot.params.formaAsignacion;
    /* this.DataNewImp.impdif = 1; */
  }

  ngOnInit() {
    this.LoadClases();
    this.LoadDatosCliente();
  }

  Regresar() {
    this.router.navigate(['configuraciones2/impuestosventas']);
  }

  LoadDatosCliente() {
    this.ingresarimpuestoventasService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
        this.LoadImpuestoCliente(this.DataCliente.id);
        this.LoadCanalesCliente(this.DataCliente.id);
      }
    );
  }

  LoadImpuestoCliente(idCliente) {
    this.ingresarimpuestoventasService.getImpuestosPorCliente(idCliente).subscribe(
      data => {
        console.log(data);
        // this.DataTarifas = [];
        for (const key of data) {
          const existe = this.DataArrayImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(key.id_impuesto, 0)
            && parseInt(x.id_regimen, 0) === parseInt(key.id_regimen, 0));
          if (existe.length === 0) {
            this.DataArrayImpuesto.push(
              {
                'id': this.regitrosImpuestos.length,
                // 'id': key.id,
                // 'id_imp_reg': key.id_imp_reg,
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
    this.ingresarimpuestoventasService.getCanalesPorCliente(idCliente).subscribe(
      data => {
        for (const key of data) {
          this.DataCanales.push({
            'id': key.id_canal,
            'nombre': key.nombre_canal
          });
        }

        const existeInstitucional = this.DataCanales.filter(x => parseInt(x.id, 0) === 6);
        if (existeInstitucional.length >= 1) {
          this.canalInstitucional = true;
        }
      }
    );
  }

  LoadClases() {
    this.ingresarimpuestoventasService.getClases().subscribe(
      data => {
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
    this.ingresarimpuestoventasService.getGrupos(idClase).subscribe(
      data => {
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

  clickFilaGrupo(id) {
    this.DataNewImp.id_grupo = id.toString();
  }

  GuardarGrupo(idGrupo) {
    this.DataNewImp.grupo = this.DataJsonGrupos.filter(x => parseInt(x.id, 0) === parseInt(idGrupo, 0))[0].nombre;
  }

  MostarCanalDiferente(datosImpuesto, dataPrincipal) {

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

  onSubmit(datosImpuesto) {
    if (datosImpuesto.impdif === undefined) {
      datosImpuesto.impdif = 1;
    }
    let impuesto;
    let tarifa;

    if (datosImpuesto.impdif === 0) {
      impuesto = 1;
      tarifa = 1;
    } else {
      impuesto = datosImpuesto.id_impuesto;
      tarifa = datosImpuesto.id_tarifa;
    }

    if (this.formaAsig === '1') {
      for (const key of this.DataCanales) {
        if (parseInt(key.id, 0) === 6) {
          this.DataImpuestosCanalIns.push({
            'id_canal': key.id,
            'id_impuesto': datosImpuesto.id_impuestoIns,
            'id_tarifa': datosImpuesto.id_tarifaIns
          });
        }
      }

      for (const gru of this.DataJsonGrupos) {
        this.DataImpuestosVenta.push({
          'id_clase': datosImpuesto.id_clase,
          'id_grupo': gru.id,
          'id_impuesto': datosImpuesto.id_impuesto,
          'id_tarifa': datosImpuesto.id_tarifa
        });

      }
      this.updateArticulosClase(datosImpuesto, datosImpuesto.id_impuesto, datosImpuesto.id_tarifa);
    } else {
      this.DataImpuestosVenta.push({
        'id_clase': datosImpuesto.id_clase,
        'id_grupo': datosImpuesto.id_grupo,
        'id_impuesto': datosImpuesto.id_impuesto,
        'id_tarifa': datosImpuesto.id_tarifa
      });
      this.updateArticulosGrupo(datosImpuesto, datosImpuesto.id_impuesto, datosImpuesto.id_tarifa);
    }

    let postImpuestos;
    for (const key of this.DataImpuestosVenta) {
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
    this.ingresarimpuestoventasService.postImpuestoVenta(DataList).subscribe(
      resul => {
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

  createImpuestoCanal(idImpVen, impuestoDiferencial) {
    const impuestosventas = {
      canal: []
    };
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
    this.ingresarimpuestoventasService.postImpuestoVentaCanal(impuestosventas.canal).subscribe(
      resul => {
        console.log(resul);
      });
  }

  updateArticulosClase(datosImpuesto, impuesto, tarifa) {
    console.log('updateArticulosClase');
    let impDif;
    if (datosImpuesto.impdif === 1) {
      impDif = true;
    } else {
      impDif = false;
    }
    this.ingresarimpuestoventasService.updateArticulosClase(datosImpuesto.id_clase, impDif, impuesto, tarifa).subscribe(
      resul => {
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
    this.ingresarimpuestoventasService.updateArticulosGrupo(datosImpuesto.id_grupo, impDif, impuesto, tarifa).subscribe(
      resul => {
        this.updateAriculosVentaCanalGrupo(datosImpuesto.id_grupo, datosImpuesto.impdif);
      }
    );
  }

  updateAriculosVentaCanalClase(idClase, impuestoDiferencial) {

    const impuestosventas = {
      canal: []
    };
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
    this.ingresarimpuestoventasService.updateArticuloVentaCanalClase(idClase, impuestosventas.canal).subscribe(
      resul => {
        console.log(resul);
      });
  }


  updateAriculosVentaCanalGrupo(idGrupo, impuestoDiferencial) {

    const impuestosventas = {
      canal: []
    };
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
    this.ingresarimpuestoventasService.updateArticuloVentaCanalGrupo(idGrupo, impuestosventas.canal).subscribe(
      resul => {
        console.log(resul);
      });
  }

  LimpiarFormDifCanal() {
    this.difCanalForm.reset();
  }

  LimpiarFormTodosCanales() {
    this.todosCanalForm.reset();
  }

  LimpiarTablaDifCanal() {
    this.DataImpuestosVentaClase = [];
  }

  LimpiarFormClases() {
    this.DataNewImp.id_clase = undefined;
  }

  LimpiarFormGrupo() {
    this.DataNewImp.id_grupo = undefined;
  }
}
