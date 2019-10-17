import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ConfigurarclienteService } from './configurarcliente.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutasService } from '../../../services/rutas.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configurarcliente',
  templateUrl: './configurarcliente.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ConfigurarclienteService, RutasService]
})
export class ConfigurarclienteComponent implements OnInit {

  id: any;
  DataArrayCliente: any = [];
  DataJson: any = [];
  itempageImpuesto = 5;
  itempageCanal = 5;
  // itempageImpuestoCanal = 5;
  itempageListaCanales = 10; // Modal canales
  itempageMensajes = 5;
  searchStringImpuesto: any;
  searchStringCanal: any;
  searchStringMensajes: any;
  // searchStringImpuestoCanal: any;
  searchStringListaCanales: any;
  c : number = 1;
  reim : number = 1;
  men : number = 1;
  tar : number = 1;
  p : number = 1;

  DataArrayImpuestos: any = [];
  DataArrayRegimen: any = [];
  DataArrayCanales: any = [];
  DataArrayMensajes: any = [];
  DataMensajes: any = [];
  LoadError = false;
  error: any;
  loader = true;
  LoadTabla = true;
  tablaImpuestoRegimen = false;
  tablaCanales = false;
  // tablaOperaImpuesto = false;
  DataArrayImp: any = [];
  DataArrayCan: any = [];
  DataArrayImpCan: any = [];
  DataArrayImpuesto: any = [];
  DataArrayReg: any = [];
  DataJsonCanales: any = [];
  DataCanales: any = [];
  DataCanalImpuesto: any = [];
  DataJsonRegimen: any = [];
  ValorUnicaTar: any;
  impMasUsado: Boolean;
  unicaTarCanal: Boolean;
  paisReg: any;
  DataArrayImpuestoRegimen: any = [];
  DataJsonTarifas: any = [];
  ValorUnicaTarCanal: any;
  impuestoCanales: any;
  Canal: any;
  regimen: any;
  impuesto: any;
  DataJsonTarSel: any = [];
  searchStringTarifas: any;
  itempageTarifas = 5;
  regitrosImpuestos: any = [];
  DataJsonRpt: any = [];

  // tablaMensajes: Boolean;

  mensajesLegales: any = [];
  marca: boolean;
  ListaMensajesLegales: any = [];
  registrosMensajes: any = [];
  checkedAll = false;
  DataArrayPaises: any = [];

  @ViewChild('clienteDosForm',{static:true})
  private clienteDosForm: NgForm;

  @ViewChild('confRegimenForm',{static:true})
  private confRegimenForm: NgForm;

  @ViewChild('ImpuestoCanalForm',{static:true})
  private ImpuestoCanalForm: NgForm;

  @ViewChild('paisRegimenForm',{static:true})
  private paisRegimenForm: NgForm;

  @ViewChild('msgLegalesForm',{static:true})
  private msgLegalesForm: NgForm;

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public configurarclienteService: ConfigurarclienteService,
    vcr: ViewContainerRef,
    public rutasService: RutasService,
    private route: ActivatedRoute) {
    this.loader = true;
    this.id = this.route.snapshot.params.idCliente;
    this.unicaTarCanal = false;
    this.impMasUsado = false;
    }

  ngOnInit() {
    this.LoadClientesData(this.id);
    this.LoadImpuestoCliente(this.id);
    this.LoadCanalesCliente(this.id);
    this.LoadMensajesLegales(this.id);
    this.loadCanales();
    this.loadRegimen();
    this.loadImpuestoRegimen();
    this.loadPaises();
  }

  Regresar() {
    this.router.navigate(['/configuraciones/clientes']);
  }
  LoadClientesData(idCliente) {
    this.configurarclienteService.getCliente(idCliente).subscribe(
      data => {
        console.log(data);
        this.DataArrayCliente = data;
        this.DataJson = this.DataArrayCliente[0];
        if (this.DataJson.digito_checkeo === 0) {
          this.DataJson.digito_checkeo = '0';
        }
        if (this.DataJson.celular === 'N/A') {
          this.DataJson.celular = '';
        }
        if (this.DataJson.email_dueno === 'N/A') {
          this.DataJson.email_dueno = '';
        }
        if (this.DataJson.cel_dueno === 'N/A') {
          this.DataJson.cel_dueno = '';
        }
        if (this.DataJson.manejaCodplu === true) {
          this.DataJson.manejaCodplu = 1;
        } else {
          this.DataJson.manejaCodplu = 0;
        }
        /* this.loadDepartamento(this.DataJson.id_pais);
        this.loadMunicipio(this.DataJson.id_departamento); */
      }
    );
  }
  loadPaises() {
    this.configurarclienteService.getPaises().subscribe(
      data => {
        this.DataArrayPaises = data;
      }
    );
  }

  LoadImpuestoCliente(idCliente) {
    this.configurarclienteService.getImpuestosPorCliente(idCliente).subscribe(
      data => {
        this.DataArrayImp = data;

        this.DataArrayImpuesto = [];
        for (const key of this.DataArrayImp) {
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
              'valor_tarifa': key.valor_tarifa
            }
          );
          this.regitrosImpuestos.push('impuestos1');
        }

        if (this.DataArrayImpuesto.length === 0) {
          this.tablaImpuestoRegimen = false;
        } else {
          this.tablaImpuestoRegimen = true;
        }
      });
  }

  LoadCanalesCliente(idCliente) {
    this.configurarclienteService.getCanalesPorCliente(idCliente).subscribe(
      data => {
        this.DataArrayCan = data;
        for (const key of this.DataArrayCan) {
          this.DataCanales.push({
            'id': key.id_canal,
            'nombre': key.nombre_canal
          });
        }
        if (this.DataCanales.length === 0) {
          this.tablaCanales = false;
        } else {
          this.tablaCanales = true;
          this.loader = false;
        }
      }
    );
  }

  LoadMensajesLegales(idCliente) {
    this.configurarclienteService.getMensajesLegales(idCliente).subscribe(
      data => {
        console.log(data);
        this.DataArrayMensajes = data;
        for (const key of this.DataArrayMensajes) {
          this.ListaMensajesLegales.push({
            'id': this.registrosMensajes.length,
            'codigo': key.codigo,
            'mensaje': key.responsabilidad
          });
          this.mensajesLegales.push({
            'id': this.registrosMensajes.length,
            'codigo': key.codigo,
            'mensaje': key.responsabilidad
          });
          this.registrosMensajes.push('MensajesLegales1');
        }
        /* if(this.DataArrayMensajes.length > 0){
          this.tablaMensajes=true;
        }else{
          this.tablaMensajes=false;
        } */

      }
    );
  }

  /* LoadImpuestoCanalCliente(idCliente) {
    this.modificarclientesService.getImpuestoCanalPorCliente(idCliente).subscribe(
      data => {
        this.DataArrayImpCan = data;
        this.DataOperaImpuesto = [];

        for (const key of this.DataArrayImpCan) {
          let ImpuestoMasUsado;
          if (key.imp_usado === true) {
            ImpuestoMasUsado = 'Si';
          } else {
            ImpuestoMasUsado = 'No';
          }
          let UnicaTarifaCanal;
          if (key.unica_tarifa === true) {
            UnicaTarifaCanal = 'Si';
          } else {
            UnicaTarifaCanal = 'No';
          }
          this.DataOperaImpuesto.push({
            'id': key.id,
            'id_cliente': key.id_cliente,
            'id_canal': key.id_canal,
            'nombre_canal': key.nombre_canal,
            'id_impuesto': key.id_impuesto,
            'nombre_impuesto': key.nombre_impuesto,
            'id_regimen': key.id_regimen,
            'impuestoCanales': key.id_imp_reg,
            'nombre_regimen': key.nombre_regimen,
            'impMasUsado': key.imp_usado, // true
            'ImpuestoMasUsado': ImpuestoMasUsado, // Si
            'unicaTarCanal': key.unica_tarifa, // true
            'UnicaTarifaCanal': UnicaTarifaCanal, // No
            'ValorUnicaTarCanal': key.valor_unica_tarifa
          });
        }
        if (this.DataOperaImpuesto.length === 0) {
          this.tablaOperaImpuesto = false;
        } else {
          this.tablaOperaImpuesto = true;
          this.loader = false;
        }
      }
    );
  } */


  loadCanales() {
    this.configurarclienteService.getCanales().subscribe(
      data => {
        this.DataArrayCanales = data;
        this.loader = false;
        this.LoadTabla = true;

        this.DataJsonRpt = [];
        for (const key of this.DataArrayCanales) {
          const existe = this.DataCanales.filter(x => parseInt(x.id, 0) === parseInt(key.id, 0));

          if (existe.length === 0) {
            this.DataJsonRpt.push(
              {
                'id': key.id,
                'id_cliente': key.id_cliente,
                'nombre': String(key.nombre),
                'nombre_cliente': key.nombre_cliente,
                'checked': false
              });
          }
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

  loadImpuesto(idPais) {
    if (idPais === '' || idPais === null || idPais === undefined) {
    } else {
      this.configurarclienteService.getImpuestos(idPais).subscribe(
        data => {
          this.DataArrayImpuestos = data;
        });
    }
  }

  loadRegimen() {
    this.configurarclienteService.getRegimen().subscribe(
      data => {
        this.DataArrayRegimen = data;
        for (const key of this.DataArrayRegimen) {
          if (key.id !== 3) {
            this.DataJsonRegimen.push({
              'id': key.id,
              'nombre': key.nombre
            });
          }
        }
      });
  }

  onChangeAll(isChecked: boolean) {
    this.checkedAll = isChecked;
    for (let i = 0; i < this.DataJsonRpt.length; i++) {
      this.DataJsonRpt[i].checked = isChecked;
      this.onChange(this.DataJsonRpt[i].id, isChecked);
    }
  }

  onChange(id: String, isChecked: boolean) {
    if (isChecked === true) {
      this.DataJsonCanales.push(
        {
          'id': id
        });
    } else {
      for (let i = 0; i < this.DataJsonCanales.length; i++) {
        let index;
        if (id === this.DataJsonCanales[i].id && isChecked === false) {
          index = this.DataJsonCanales.indexOf(this.DataJsonCanales[i]);
          this.DataJsonCanales.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonRpt.length; i++) {
      if (id === this.DataJsonRpt[i].id) {
        this.DataJsonRpt[i].checked = isChecked;
      }
    }
  }

  loadImpuestoRegimen() {
    this.configurarclienteService.getImpuestosRegimen().subscribe(
      data => {
        this.DataArrayImp = data;
        for (const key of this.DataArrayImp) {
          this.DataArrayImpuestoRegimen.push(
            {
              'id': key.id,
              'id_impuesto': key.id_impuesto,
              'nombre_impuesto': key.nombre_imp,
              'id_pais': key.id_pais,
              'id_regimen': key.id_regimen,
              'nombre_pais': key.nombre_pais,
              'nombre_regimen': key.nombre_reg
            }
          );
        }
        this.LimpiarFormRegimen();
      }
    );
  }

  bindingConfRegimen(paisReg, impuesto, regimen) {
    // this.DataArrayImpuesto = [];
    const nombrePais = this.DataArrayPaises.filter(x => parseInt(x.id, 0) === parseInt(paisReg, 0))[0].nombre;
    const nombreImpuesto = this.DataArrayImpuestos.filter(x => parseInt(x.id, 0) === parseInt(impuesto, 0))[0].nombre;
    const nombreRegimen = this.DataJsonRegimen.filter(x => parseInt(x.id, 0) === parseInt(regimen, 0))[0].nombre;

    /* this.ingresarclientesService.getImpuestoRegimen(impuesto, regimen).subscribe(
      data => { */
    // this.DataArrayImpuesto = data;
    console.log(this.DataJsonTarSel);

    for (const key of this.DataJsonTarSel) {
      const existe = this.DataArrayImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(impuesto, 0)
        && parseInt(x.id_regimen, 0) === parseInt(regimen, 0) && parseInt(x.id_tarifa, 0) === parseInt(key.id, 0));

      if (existe.length === 0) {
        this.DataArrayImpuesto.push({
          'id': this.regitrosImpuestos.length,
          'id_impuesto': impuesto,
          'nombre_impuesto': nombreImpuesto,
          'id_pais': paisReg,
          'nombre_pais': nombrePais,
          'id_regimen': regimen,
          'nombre_regimen': nombreRegimen,
          'id_tarifa': key.id,
          'valor_tarifa': key.valor
        });
        this.regitrosImpuestos.push('impuestos2');
      }
    }
    console.log(this.DataArrayImpuesto);
    this.tablaImpuestoRegimen = true;
    // this.LimpiarFormRegimen();
    /* }); */
    /* } else {
      swal({
        title: 'No se puede Agregar',
        text: 'Los datos ingresados ya estan en la tabla',
        icon: 'error',
      });
    } */
    // this.LimpiarFormRegimen();
  }

  /*  bindingConfRegimen(paisReg, impuesto, regimen) {
     const p = this.DataArrayImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(impuesto, 0)
       && parseInt(x.id_regimen, 0) === parseInt(regimen, 0));

     if (p.length === 0) {
       this.modificarclientesService.getImpuestoRegimen(impuesto, regimen).subscribe(
         data => {
           this.DataArrayImp = data;
           for (const key of this.DataArrayImp) {
             this.DataArrayImpuesto.push(
               {
                 'id': key.id,
                 'id_impuesto': key.id_impuesto,
                 'nombre_impuesto': key.nombre_imp,
                 'id_pais': key.id_pais,
                 'id_regimen': key.id_regimen,
                 'nombre_pais': key.nombre_pais,
                 'nombre_regimen': key.nombre_reg
               }
             );
           }
           this.tablaImpuestoRegimen = true;
           this.LimpiarFormRegimen();
         }
       );
     } else {
       swal({
         title: 'No se puede Agregar',
         text: 'Los datos ingresados ya estan en la tabla',
         icon: 'error',
       });
     }
   } */


  QuitarImpuesto(id) {
    /* const p = this.DataOperaImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(id, 0));

    if (p.length >= 1) {
      swal({
        title: 'No se puede Eliminar',
        text: 'El impuesto existe en otra tabla',
        icon: 'error',
      });
    } else { */

    for (let i = 0; i < this.DataArrayImpuesto.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataArrayImpuesto[i].id, 0)) {
        index = this.DataArrayImpuesto.indexOf(this.DataArrayImpuesto[i]);
        this.DataArrayImpuesto.splice(index, 1);
      }
    }
    if (this.DataArrayImpuesto.length === 0) {
      this.tablaImpuestoRegimen = false;
    }
    /* } */
  }
  /* QuitarImpuesto(idImpuesto, idRegimen) {
      this.modificarclientesService.deleteClienteImpuesto(this.id, idImpuesto, idRegimen).subscribe(
        data => {
          if (data.text() === 'El ClienteImpuesto fue eliminado con exito') {
            swal({
              title: 'ClienteImpuesto Modificados',
              text: 'Proceso realizado de manera Exitosa',
              icon: 'success',
            });
          } else {
            swal({
              title: 'Los impuestos de clietne No se Modificaron',
              text: 'Proceso no se realizó de manera Exitosa',
              icon: 'error',
            });
          }
        }
      );

      for (let i = 0; i < this.DataArrayImpuesto.length; i++) {
        let index;
        if (idImpuesto === this.DataArrayImpuesto[i].id) {
          index = this.DataArrayImpuesto.indexOf(this.DataArrayImpuesto[i]);
          this.DataArrayImpuesto.splice(index, 1);
        }
      }
      if (this.DataArrayImpuesto.length === 0) {
        this.tablaImpuestoRegimen = false;
      }
  } */

  bindingCanales() {
    for (const key of this.DataJsonRpt) {
      const p = this.DataJsonCanales.filter(x => x.id === key.id);
      if (p.length >= 1) {
        this.DataCanales.push({
          'id': key.id,
          'nombre': key.nombre
        });
      }
    }
    this.tablaCanales = true;
  }

  QuitarCanal(idCanal) {
    /* const p = this.DataOperaImpuesto.filter(x => parseInt(x.id_canal, 0) === parseInt(idCanal, 0));
    if (p.length >= 1) {
      swal({
        title: 'No se puede Eliminar',
        text: 'El canal existe en otra tabla',
        icon: 'error',
      });
    } else { */

    this.configurarclienteService.deleteClienteCanal(this.id, idCanal).subscribe(
      data => {
        if (data.text() === 'El ClienteCanal fue eliminado con exito') {
          console.log('El ClienteCanal fue eliminado con exito');
        } else {
          console.log('El ClienteCanal no fue eliminado');
        }
      }
    );
    for (let i = 0; i < this.DataCanales.length; i++) {
      let index;
      if (idCanal === this.DataCanales[i].id) {
        index = this.DataCanales.indexOf(this.DataCanales[i]);
        this.DataCanales.splice(index, 1);
      }
    }
    if (this.DataCanales.length === 0) {
      this.tablaCanales = false;
    }
    /* } */
  }

  /* calcularTarifa(TodosCanales, Canal, impuestoCanales, impMasUsado, unicaTarCanal, valor) {
    let regimen;
    let id_impuesto;
    const i = this.DataArrayImpuesto.filter(x => parseInt(x.id, 0) === parseInt(impuestoCanales, 0));
    for (const k2 of i) {
      regimen = k2.id_regimen;
      id_impuesto = k2.id_impuesto;
    }

    const existe = this.DataOperaImpuesto.filter(x => parseInt(x.id_canal, 0) === parseInt(Canal, 0)
      && parseInt(x.id_impuesto, 0) === parseInt(id_impuesto, 0)
      && parseInt(x.id_regimen, 0) === parseInt(regimen, 0));

    if (existe.length === 0) {

      if (unicaTarCanal === false) {
        this.modificarclientesService.buscarTarifa(id_impuesto, regimen).subscribe(
          resul => {
            this.ValorUnicaTar = parseInt(resul.value, 0);
            this.bindingCanalesImpuesto(TodosCanales, Canal, impuestoCanales, impMasUsado, unicaTarCanal, this.ValorUnicaTar);

          });
      } else {
        this.bindingCanalesImpuesto(TodosCanales, Canal, impuestoCanales, impMasUsado, unicaTarCanal, valor);
      }
    } else {
      swal({
        title: 'No se puede Agregar',
        text: 'Los datos ingresados ya estan en la tabla',
        icon: 'error',
      });

    }

  } */

  LoadTarifas(impuesto, regimen) {
    this.DataJsonTarifas = [];
    // usar en nuevo
    if ((impuesto === null || regimen === null) || (impuesto === '' || regimen === '')) {

    } else {
      this.configurarclienteService.getTarifas(impuesto, regimen).subscribe(
        data => {
          console.log(data);
          // this.DataArrayRegimen = data;
          for (const key of data) {
            this.DataJsonTarifas.push({
              'id': key.id_tarifa,
              'valor': key.valor,
              'checked': false
            });
          }
        }
      );
    }
  }

  onChangeTarifas(data, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonTarSel.filter(x => parseInt(x.id, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.DataJsonTarSel.push(
          {
            'id': data.id,
            'valor': data.valor
          });
      }
    } else {
      for (let i = 0; i < this.DataJsonTarSel.length; i++) {
        let index;
        if (data.id === this.DataJsonTarSel[i].id && isChecked === false) {
          index = this.DataJsonTarSel.indexOf(this.DataJsonTarSel[i]);
          this.DataJsonTarSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataJsonTarifas.length; i++) {
      if (data.id === this.DataJsonTarifas[i].id) {
        this.DataJsonTarifas[i].checked = isChecked;
      }
    }
  }
  /*
    bindingCanalesImpuesto(TodosCanales, Canal, impuestoCanales, impMasUsado, unicaTarCanal, valor) {
      let nombreImpuesto;
      let nombreCanal;
      let id_impuesto;
      let regimen;
      let nombre_regimen;
      let ValorUnicaTarCanal;

      const i = this.DataArrayImpuesto.filter(x => parseInt(x.id, 0) === parseInt(impuestoCanales, 0));
      for (const k2 of i) {
        nombreImpuesto = k2.nombre_impuesto;
        regimen = k2.id_regimen;
        id_impuesto = k2.id_impuesto;
        nombre_regimen = k2.nombre_regimen;
      }

      const c = this.DataCanales.filter(x => parseInt(x.id, 0) === parseInt(Canal, 0));
      for (const k of c) {
        nombreCanal = k.nombre;
      }

      let ImpuestoMasUsado;
      if (impMasUsado === true) {
        ImpuestoMasUsado = 'Si';
      } else {
        ImpuestoMasUsado = 'No';
      }

      let UnicaTarifaCanal;
      if (unicaTarCanal === true) {
        UnicaTarifaCanal = 'Si';
      } else {
        UnicaTarifaCanal = 'No';
      }

      if (valor === '' || valor === null || valor === undefined) {
        ValorUnicaTarCanal = 0;
      } else {
        ValorUnicaTarCanal = valor;
      }

      if (TodosCanales === true) {
        for (const key of this.DataCanales) {
          const p = this.DataOperaImpuesto.filter(x => parseInt(x.id_canal, 0) === parseInt(key.id, 0)
            && parseInt(x.id_impuesto, 0) === parseInt(id_impuesto, 0)
            && parseInt(x.id_regimen, 0) === parseInt(regimen, 0));
          if (p.length === 0) {
            this.DataOperaImpuesto.push({
              'id_canal': key.id,
              'nombre_canal': key.nombre,
              'id_cliente': this.id,
              'impuestoCanales': impuestoCanales,
              'id_impuesto': id_impuesto,
              'id_regimen': regimen,
              'nombre_regimen': nombre_regimen,
              'nombre_impuesto': nombreImpuesto,
              'impMasUsado': impMasUsado, // true
              'ImpuestoMasUsado': ImpuestoMasUsado, // Si
              'unicaTarCanal': unicaTarCanal, // true
              'UnicaTarifaCanal': UnicaTarifaCanal, // No
              'ValorUnicaTarCanal': ValorUnicaTarCanal
            });
          }
        }
      } else {
        this.DataOperaImpuesto.push({
          'id_canal': Canal,
          'nombre_canal': nombreCanal,
          'id_cliente': this.id,
          'impuestoCanales': impuestoCanales,
          'id_impuesto': id_impuesto,
          'id_regimen': regimen,
          'nombre_regimen': nombre_regimen,
          'nombre_impuesto': nombreImpuesto,
          'impMasUsado': impMasUsado, // true
          'ImpuestoMasUsado': ImpuestoMasUsado, // Si
          'unicaTarCanal': unicaTarCanal, // true
          'UnicaTarifaCanal': UnicaTarifaCanal, // No
          'ValorUnicaTarCanal': ValorUnicaTarCanal
        });
      }
      this.tablaOperaImpuesto = true;
    } */
  /*
    BindingCanalesImpuesto(data, i) {
      this.DataCanalImpuesto = data;
      this.DataCanalImpuesto.idTabla = parseInt(i, 0);
      this.DataCanalImpuesto.id_canal_anterior = data.id_canal;
      this.DataCanalImpuesto.id_imp_anterior = data.id_impuesto;
      this.DataCanalImpuesto.id_reg_anterior = data.id_imp_id_reg;
    }
   */
  /*  ModificarCanalesImpuesto(data) {
     let regimen;
     let id_impuesto;
     const i = this.DataArrayImpuesto.filter(x => parseInt(x.id_imp_reg, 0) === parseInt(data.impuestoCanales, 0));
     for (const k2 of i) {
       regimen = k2.id_regimen;
       id_impuesto = k2.id_impuesto;
     }

     if (data.unicaTarCanal === false) {
       this.modificarclientesService.buscarTarifa(id_impuesto, regimen).subscribe(
         resul => {
           data.ValorUnicaTarCanal = parseInt(resul.value, 0);
           this.ModificarCanalImp(data, parseInt(resul.value, 0));
         });
     } else {
       this.ModificarCanalImp(data, data.ValorUnicaTarCanal);
     }
   }

  ModificarCanalImp(data, valor) {
    let nombreImpuesto;
    let nombreCanal;
    let id_impuesto;
    let regimen;
    let nombre_regimen;
    let ValorUnicaTarCanal;

    const im = this.DataArrayImpuesto.filter(x => parseInt(x.id_imp_reg, 0) === parseInt(data.impuestoCanales, 0));
    for (const k2 of im) {
      nombreImpuesto = k2.nombre_impuesto;
      regimen = k2.id_regimen;
      id_impuesto = k2.id_impuesto;
      nombre_regimen = k2.nombre_regimen;
    }

    const c = this.DataCanales.filter(x => parseInt(x.id, 0) === parseInt(data.id_canal, 0));
    for (const k of c) {
      nombreCanal = k.nombre;
    }

    let ImpuestoMasUsado;
    if (data.impMasUsado === true) {
      ImpuestoMasUsado = 'Si';
    } else {
      ImpuestoMasUsado = 'No';
    }

    let UnicaTarifaCanal;
    if (data.unicaTarCanal === true) {
      UnicaTarifaCanal = 'Si';
    } else {
      UnicaTarifaCanal = 'No';
    }

    if (valor === '' || valor === null || valor === undefined) {
      ValorUnicaTarCanal = 0;
    } else {
      ValorUnicaTarCanal = valor;
    }

    if (data.id === '' || data.id === null || data.id === undefined) {
      for (let i = 0; i < this.DataOperaImpuesto.length; i++) {
        if (i === data.idTabla) {
          this.DataOperaImpuesto[i].id_canal = data.id_canal,
            this.DataOperaImpuesto[i].nombre_canal = nombreCanal,
            this.DataOperaImpuesto[i].id_cliente = this.id,
            this.DataOperaImpuesto[i].id_impuesto = id_impuesto,
            this.DataOperaImpuesto[i].nombre_impuesto = nombreImpuesto,
            this.DataOperaImpuesto[i].impuestoCanales = data.impuestoCanales,
            this.DataOperaImpuesto[i].id_regimen = regimen,
            this.DataOperaImpuesto[i].nombre_regimen = nombre_regimen,
            this.DataOperaImpuesto[i].impMasUsado = data.impMasUsado, // true,
            this.DataOperaImpuesto[i].ImpuestoMasUsado = ImpuestoMasUsado, // Si
            this.DataOperaImpuesto[i].unicaTarCanal = data.unicaTarCanal, // true
            this.DataOperaImpuesto[i].UnicaTarifaCanal = UnicaTarifaCanal, // No
            this.DataOperaImpuesto[i].ValorUnicaTarCanal = ValorUnicaTarCanal;

        }
      }

    } else {
      const canalesImpuesto = {
        'id': data.id,
        'id_cliente': data.id_cliente,
        'id_canal': data.id_canal,
        'id_impuesto': id_impuesto,
        'id_regimen': regimen,
        'imp_usado': data.impMasUsado,
        'unica_tarifa': data.unicaTarCanal,
        'valor_unica_tarifa': valor
      };

      this.modificarclientesService.updateCanalImpuesto(canalesImpuesto).subscribe(res => {
        if (res.text() === 'No se pudo crear Los canales impuestos') {
          swal({
            title: 'Canales No se Crearon',
            text: 'La asignacion del impuesto a los canales no se creo correctamente',
            icon: 'error',
          });
        } else {
          console.log('canal impuesto creado');
        }
      });
      this.LoadImpuestoCanalCliente(this.id);
    }
    this.LoadImpuestoCanalCliente(this.id);
  } */

  /*  QuitarCanalImpuesto(index, id, idCanal, idImpuesto, idRegimen) {
     if (id !== '' || id !== null || id !== undefined) {
       this.modificarclientesService.deleteClienteImpuestoCanal(this.id, idCanal, idImpuesto, idRegimen).subscribe(
         data => {
           if (data.text() === 'El CanalImpuesto fue eliminado con exito') {
             console.log('El CanalImpuesto fue eliminado con exito');
           } else {
             console.log('El CanalImpuesto no fue eliminado');
           }
         }
       );
     }
     for (let i = 0; i < this.DataOperaImpuesto.length; i++) {
       if (i === index) {
         this.DataOperaImpuesto.splice(index, 1);
       }
     }
     if (this.DataOperaImpuesto.length === 0) {
       this.tablaOperaImpuesto = false;
     }
   } */

  MostrarArraymensajes() {
    this.mensajesLegales = [];
    for (const key of this.ListaMensajesLegales) {
      this.mensajesLegales.push({
        'id': key.id,
        'codigo': key.codigo,
        'mensaje': key.mensaje
      });
    }
  }


  BindingMensajes(mensajes) {
    if (this.mensajesLegales.length === 0) {
      this.mensajesLegales.push({
        'id': this.registrosMensajes.length,
        'codigo': mensajes.codigo,
        'mensaje': mensajes.mensaje
      });
      this.registrosMensajes.push('mensajeLegal1');
    } else {

      const existeCodigo = this.mensajesLegales.filter(x => x.codigo === mensajes.codigo);
      const existeMensaje = this.mensajesLegales.filter(x => x.mensaje === mensajes.mensaje);

      if (existeCodigo.length >= 1) {
        this.toastr.error('Error! El codigo ya ha sido agregado a la tabla');
      } else if (existeMensaje.length >= 1) {
        this.toastr.error('Error! El mensaje ya ha sido agregado a la tabla');
      } else {
        this.mensajesLegales.push({
          'id': this.registrosMensajes.length,
          'codigo': mensajes.codigo,
          'mensaje': mensajes.mensaje
        });
        this.registrosMensajes.push('mensajeLegal2');
      }
    }
    this.LimpiarFormMensajes();
  }


  QuitarMensajeModal(id) {
    for (let i = 0; i < this.mensajesLegales.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.mensajesLegales[i].id, 0)) {
        index = this.mensajesLegales.indexOf(this.mensajesLegales[i]);
        this.mensajesLegales.splice(index, 1);
      }
    }
  }

  MostrarTablaMensajes() {
    // this.tablaMensajes = true;
    this.ListaMensajesLegales = [];
    for (const key of this.mensajesLegales) {
      this.ListaMensajesLegales.push({
        'id': key.id,
        'codigo': key.codigo,
        'mensaje': key.mensaje
      });
    }
    // this.LimpiarArrayMensajes();
  }

  QuitarMensajeTabla(id) {
    for (let i = 0; i < this.ListaMensajesLegales.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.ListaMensajesLegales[i].id, 0)) {
        index = this.ListaMensajesLegales.indexOf(this.ListaMensajesLegales[i]);
        this.ListaMensajesLegales.splice(index, 1);
      }
    }
  }


  onSubmit(cliente) {
    if (cliente.cel_dueno === '' || cliente.cel_dueno === undefined || cliente.cel_dueno === null) {
      cliente.celular = 'N/A';
    }
    if (cliente.extension === '' || cliente.extension === undefined || cliente.extension === null) {
      cliente.extension = 0;
    }
    if (cliente.email_dueno === '' || cliente.email_dueno === undefined || cliente.email_dueno === null) {
      cliente.email_dueno = 'N/A';
    }
    if (cliente.cel_dueno === '' || cliente.cel_dueno === undefined || cliente.cel_dueno === null) {
      cliente.cel_dueno = 'N/A';
    }

    if (cliente.token_empresa === '' || cliente.token_empresa === undefined || cliente.token_empresa === null) {
      cliente.token_empresa = 'N/A';
    }

    if (cliente.token_password === '' || cliente.token_password === undefined || cliente.token_password === null) {
      cliente.token_password = 'N/A';
    }
    const fecha = new Date();

    const data = {
      'id': cliente.id,
      'cargoContacto': cliente.cargo_contacto,
      'celDueno': cliente.cel_dueno,
      'celular': cliente.celular,
      'celularContacto': cliente.celular_contacto,
      'contacto': cliente.contacto,
      'creadoPor': cliente.creado_por,
      'digitoCheckeo': cliente.digito_checkeo,
      'direccion': cliente.direccion,
      'documentoRepresentante': cliente.documento_representante,
      'email': cliente.email,
      'emailContacto': cliente.email_contacto,
      'emailDueno': cliente.email_dueno,
      'empaqueDifCanal': cliente.empaque_dif_canal,
      'empaqueDifPunto': cliente.empaque_dif_punto,
      'estado': cliente.estado,
      'extension': cliente.extension,
      'extension2': cliente.extension2,
      'fechaCrecion': cliente.fecha_crecion,
      'fechaModificacion': cliente.fecha_modificacion,
      'modificadoPor': cliente.modificado_por,
      'nit': cliente.nit,
      'nombre': cliente.nombre,
      'nombreDueno': cliente.nombre_dueno,
      'nombreRepresentante': cliente.nombre_representante,
      'recetaDifCanal': cliente.receta_dif_canal,
      'recetaDifPunto': cliente.receta_dif_punto,
      'impuestoDifCanal': cliente.impuesto_dif_canal,
      'telefono': cliente.telefono,
      'telefono2': cliente.telefono2,
      'unicoImpuestoCanal': cliente.unico_impuesto_canal,
      'tokenEmpresa': cliente.token_empresa,
      'tokenPassword': cliente.token_password,
      'estadoInst': cliente.estado_inst,
      'municipio': {
        'id': cliente.id_municipio
      },
      'regimen': {
        'id': '1'
      },
      'franquiciador': cliente.franquiciador,
      'franquiciado': cliente.franquiciado,
      'manejaCodplu': cliente.manejaCodplu
    };

    this.configurarclienteService.updateCliente(data).subscribe(
      resul => {
        const res = resul.text();
        if (res === 'No se pudo modificar el cliente') {
          Swal.fire({
            title: 'Cliente',
            text: 'No se ha podido crear el cliente',
            type: 'error',
          });
        } else {
          // this.createCanalImpuesto(res); // crea en tabla canalimpuesto
          this.updateImpuesto(res); // Crea en tabla cliente impuesto
          this.updateCanales(res); // Crea en tabla cliente canal
          this.updateMensajesLegales(res); // Crea en tabla mensajes legales
          this.router.navigate(['/configuraciones/clientes']);
          Swal.fire({
            title: 'Cliente',
            text: 'Fue modificado el cliente ' + cliente.nombre + ' con exito',
            type: 'success',
          });
        }
      }
    );
  }

  updateImpuesto(IdCliente) {
    const impuestos = {
      impuesto: []
    };
    for (const key of this.DataArrayImpuesto) {
      impuestos.impuesto.push(
        {
          'id_cliente': IdCliente,
          'id_impuesto': key.id_impuesto,
          'id_regimen': key.id_regimen,
          'id_tarifa': key.id_tarifa
        });
    }

    this.configurarclienteService.updateClienteImpuesto(impuestos.impuesto, IdCliente).subscribe(res => {
      if (res.text() === 'error') {
        console.log(res.text());
        /*  swal({
           title: 'Impuestos No se Crearon',
           text: 'Los impuestos del cliente no se crearon correctamente',
           icon: 'error',
         }); */

      } else {
        console.log('Cliente impuesto creado');
      }
    });
  }

  updateCanales(IdCliente) {
    const canales = {
      canal: []
    };
    for (const key of this.DataCanales) {
      canales.canal.push(
        {
          'id_cliente': IdCliente,
          'id_canal': key.id
        });
    }

    this.configurarclienteService.uodateClienteCanales(canales.canal, IdCliente).subscribe(res => {
      if (res.text() === 'error') {
        console.log(res.text());
        /* swal({
          title: 'Canales No se Crearon',
          text: 'Los canales del cliente no se crearon correctamente',
          icon: 'error',
        }); */

      } else {
        // console.log('Cliente canal creado');
      }
    });
  }

  updateMensajesLegales(idCliente) {
    const mensajesLeg = {
      msjLegales: []
    };
    console.log(this.mensajesLegales);
    for (const key of this.mensajesLegales) {
      mensajesLeg.msjLegales.push({
        'codigo': key.codigo,
        'responsabilidad': key.mensaje
      });
    }
    console.log(mensajesLeg.msjLegales);
    this.configurarclienteService.updateMensajesLegales(mensajesLeg.msjLegales, idCliente).subscribe(res => {
      console.log('Mensajes Crados');
    });
  }

  /*   createCanalImpuesto(IdCliente) {
      const canalesImpuesto = {
        canalImp: []
      };

      for (const key of this.DataOperaImpuesto) {
        canalesImpuesto.canalImp.push(
          {
            'id_cliente': IdCliente,
            'id_canal': key.id_canal,
            'id_impuesto': key.id_impuesto,
            'id_regimen': key.id_regimen,
            'imp_usado': key.impMasUsado,
            'unica_tarifa': key.unicaTarCanal,
            'valor_unica_tarifa': key.ValorUnicaTarCanal
          });
      }
      this.modificarclientesService.createCanalImpuesto(canalesImpuesto.canalImp).subscribe(res => {
        if (res.text() === 'No se pudo crear Los canales impuestos') {
          swal({
            title: 'Canales No se Crearon',
            text: 'La asignacion del impuesto a los canales no se creo correctamente',
            icon: 'error',
          });
        } else {
          console.log('canal impuesto creado');
        }
      });
    } */

  LimpiarFormRegimen() {
    this.DataJsonTarifas = [];
    this.DataJsonTarSel = [];
    this.confRegimenForm.reset();
    this.cargarPais();
    /* this.confRegimenForm.reset();
    this.paisReg = 42;
    this.loadImpuesto(this.paisReg);
    this.loadPaises(); */
  }

  cargarPais() {
    this.paisReg = 42;
    this.loadImpuesto(this.paisReg);
  }

  LimpiarFormCanal() {
    this.loadCanales();
    this.onChangeAll(false);
  }

  /* LimpiarFormImpuestoCanal() {
    this.ImpuestoCanalForm.reset();
    this.unicaTarCanal = false;
    this.impMasUsado = false;
    this.DataJson.unico_impuesto_canal = false;
  } */

  LimpiarFormMensajes() {
    this.msgLegalesForm.reset();
    /* this.DataArrayMensajes.codigo = '';
    this.DataArrayMensajes.mensaje = ''; */
  }

}
