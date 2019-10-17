import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImpuestosService } from './impuestos.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ImpuestosService, SidebarComponent]
})
export class ImpuestosComponent implements OnInit {

  im:number=1;
  q:number=1;
  y:number=1;


  DataArray: any = [];
  DataJson: any = [];
  DataNew: any = [];
  DataModificar: any = [];
  DataClientes: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  noHayRegistros = false;
  searchString: any;
  itempage = 5;
  idInactivar: any;
  nombreInactivar: any;
  DataTarifas: any = [];
  DataRegimen: any = [];
  searchStringTarifas: any;
  clickTarifa: boolean;
  DataNewTarifa: any = [];
  PostTarifa: any = [];
  PostImpuesto: any = [];
  DataJsonTarifas: any = [];
  DataArrayTarifas: any = [];
  DataImpuestoTarifa: any = [];
  DataModificada: any = [];

  @ViewChild('impuestosForm',{static:true})
  private impuestosForm: NgForm;

  @ViewChild('impuestosEditForm',{static:true})
  private impuestosEditForm: NgForm;

  constructor(public impuestosService: ImpuestosService, public toastr: ToastrService,
    public SidebarComponent: SidebarComponent) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadImpuestos();
    this.LoadTarifas();
    this.LoadRegimen();
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadImpuestos() {
    this.impuestosService.getImpuestosRegimen().subscribe(
      data => {
        console.log(data);
        this.DataArray = data;
        this.DataJson = [];
        let nombreModulo = '';
        let nombreRegimen = '';
        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            if (key.tipo_modulo === 1) {
              nombreModulo = 'Configuraciones';
            } else if (key.tipo_modulo === 2) {
              nombreModulo = 'Compras';
            }
            if (key.nombre_reg === 'Ambos') {
              nombreRegimen = ' ';
            } else {
              nombreRegimen = key.nombre_reg;
            }
            this.DataJson.push(
              {
                'id': key.id,
                'id_impuesto': key.id_impuesto,
                'nombre_impuesto': key.nombre_imp,
                'id_pais': key.id_pais,
                'nombre_pais': key.nombre_pais,
                'id_regimen': key.id_regimen,
                'nombre_regimen': nombreRegimen,
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

  LoadTarifas() {
    this.DataTarifas = [];
    this.impuestosService.getTarifas().subscribe(data => {
      console.log(data);
      // this.DataTarifas = data;
      for (const key of data) {
        this.DataTarifas.push({
          'id': key.id,
          'tipo': key.tipo,
          'valor': key.valor,
          'checked': false
        });
      }
      if (this.DataTarifas.length === 1) {
        this.DataNew.impmasUsado = this.DataTarifas[0].id.toString();
      }
      this.DataTarifas.sort(function (a, b) {
        if (a.valor > b.valor) {
          return 1;
        }
        if (a.valor < b.valor) {
          return -1;
        }
        return 0;
      });
    });
  }

  LoadRegimen() {
    this.impuestosService.getRegimen().subscribe(data => {
      this.DataRegimen = data;
    });
  }

  clickCrearTarifa() {
    if (this.clickTarifa === true) {
      this.clickTarifa = false;
    } else {
      this.clickTarifa = true;
    }
  }

  crearTarifa(datosTarifa, origen, datosModificar) {
    this.clickTarifa = false;
    this.PostTarifa = {
      'valor': datosTarifa.valor,
      'tipo': datosTarifa.tipo
    };

    this.impuestosService.createTarifa(this.PostTarifa).subscribe(data => {
      if (data.text() !== '0') {

      } else {
        Swal.fire({
          title: 'Tarifa No Creado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
      if (origen === 1) {
        this.LoadTarifas();
      } else {
        this.LoadTarifas();
        this.LoadImpuestoTarifa(datosModificar.id_impuesto, datosModificar.id_regimen);
      }
      this.DataNewTarifa = [];
    });
  }

  onChange(id: number, isChecked: boolean) {
    if (isChecked === true) {
      this.DataJsonTarifas.push(
        {
          'id': id
        });
    } else {
      for (let i = 0; i < this.DataJsonTarifas.length; i++) {

        let index;
        if (id === this.DataJsonTarifas[i].id && isChecked === false) {
          index = this.DataJsonTarifas.indexOf(this.DataJsonTarifas[i]);
          this.DataJsonTarifas.splice(index, 1);
        }
      }
      if (id === parseInt(this.DataNew.impmasUsado, 0)) {
        this.DataNew.impmasUsado = undefined;
      }
    }
    for (let i = 0; i < this.DataTarifas.length; i++) {
      if (id === this.DataTarifas[i].id) {
        this.DataTarifas[i].checked = isChecked;
      }
    }
  }

  onSubmit(dataImpuesto) {
    let regimen;
    if (parseInt(dataImpuesto.modulo, 0) === 2 ||
      dataImpuesto.regimen === 0 || dataImpuesto.regimen === null || dataImpuesto.regimen === undefined) {
      regimen = 3;
    } else {
      regimen = dataImpuesto.regimen;
    }
    this.PostImpuesto = {
      'nombre': dataImpuesto.nombre,
      'estado': true,
      'pais': {
        'id': 42,
        'nombre': 'Colombia'
      }
    };

    this.impuestosService.createImpuesto(this.PostImpuesto).subscribe(data => {
      if (data.text() !== '0') {
        this.createImpuestoRegimen(data.text(), regimen, dataImpuesto.modulo);
        this.createImpuestoTarifa(data.text(), regimen, dataImpuesto.id_tarifa,
          dataImpuesto.modulo, dataImpuesto.impmasUsado);
      } else {
        Swal.fire({
          title: 'Impuesto No Creado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  createImpuestoRegimen(idImpuesto, idRegimen, modulo) {
    const Regimen = {
      reg: []
    };

    Regimen.reg.push(
      {
        'id_impuesto': idImpuesto,
        'id_regimen': idRegimen,
        'tipo_modulo': modulo,
        'estado': true
      });

    this.impuestosService.createImpuestoRegimen(Regimen.reg).subscribe(res => {
      if (res.text() === 'exitoso') {
        console.log('regimen del impuesto creado');
      } else {
        console.log('regimen del impuesto no se pudo crear');
      }
    });
  }

  createImpuestoTarifa(idImpuesto, regimen, tarifa, modulo, imp_usado) {
    const Tarifas = {
      tarifa: []
    };
    /* if (parseInt(modulo, 0) === 1) {
      Tarifas.tarifa.push(
        {
          'id_impuesto': idImpuesto,
          'id_regimen': regimen,
          'id_tarifa': tarifa,
          'tipo_mod': modulo
        });
    } else { */
    let imp_mas_usado;
    console.log(this.DataJsonTarifas);
    for (const key of this.DataJsonTarifas) {
      if (parseInt(key.id, 0) === parseInt(imp_usado, 0)) {
        imp_mas_usado = true;
      } else {
        imp_mas_usado = false;
      }
      Tarifas.tarifa.push(
        {
          'id_impuesto': idImpuesto,
          'id_regimen': regimen,
          'id_tarifa': key.id,
          'impuesto_mas_usado': imp_mas_usado,
          'tipo_mod': modulo
        }
      );
    }
    /*  } */

    this.impuestosService.createImpuestoTarifa(Tarifas.tarifa).subscribe(res => {
      if (res.text() === 'exitoso') {
        Swal.fire({
          title: 'Tarifas del Impuesto Creadas',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Tarifas del Impuesto No se Crearon',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
      this.LoadImpuestos();
      this.LoadTarifas();
      this.LimpiarFormulario();
    });
  }

  bindingDataInactivar(id, nombreImp, nombreReg) {
    this.idInactivar = id;
    this.nombreInactivar = nombreImp + ' ' + nombreReg;
  }

  Inactivar(id, nombre) {
    this.impuestosService.putInactivarImpuesto(id).subscribe();
    Swal.fire({
      title: 'Impuesto inactivado',
      text: 'Proceso realizado de manera Exitosa, el Impuesto ' + nombre + 'fue inactivado',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (id === this.DataJson[i].id) {
        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);
      }
    }
  }

  bindingDataModificar(datos) {
    console.log(datos);
    /* if (parseInt(datos.tipo_modulo, 0) === 1) {
      this.impuestosService.getImpTarifa(datos.id_impuesto, datos.id_regimen).subscribe(
        data => {
          this.DataModificar.id_tarifa = 1;
        });
    } else { */
    this.LoadImpuestoTarifa(datos.id_impuesto, datos.id_regimen);
    /* } */
    this.DataModificar = datos;
    this.DataModificar.id_regimen_ant = datos.id_regimen;
  }

  LoadImpuestoTarifa(idImpuesto, idRegimen) {
    this.impuestosService.getImpuestoTarifa(idImpuesto, idRegimen).subscribe(
      data => {
        this.DataArrayTarifas = data;
        // this.DataImpuestoTarifa = [];
        console.log(data);
        for (const key1 of this.DataArrayTarifas) {
          if (key1.impuesto_mas_usado === true) {
            this.DataModificar.impmasUsado = key1.id_tarifa.toString();
          }
          console.log(key1.id_tarifa);
          console.log(this.DataTarifas);
          /* const marcados = this.DataTarifas.filter(x => parseInt(x.id, 0) === parseInt(key1.id_tarifa, 0));
          console.log(marcados); */
          for (let i = 0; i < this.DataTarifas.length; i++) {
            console.log(this.DataTarifas[i].id);
            console.log(key1.id_tarifa);
            if(parseInt(this.DataTarifas[i].id, 0) === parseInt(key1.id_tarifa, 0)) {
              this.onChangeEdit(this.DataTarifas[i].id, true);
            }
          }
          /* this.DataImpuestoTarifa.push(
            {
              'id': key1.id_tarifa,
              'valor': key1.valor,
              'checked': true
            }
          ); */
          /* this.DataJsonTarifas.push(
            {
              'id': key1.id_tarifa
            }
          ); */
        }

        /* for (let i = 0; i < this.DataTarifas.length; i++) {
          const p = this.DataImpuestoTarifa.filter(x => x.id === this.DataTarifas[i].id);
          if (p.length === 0) {
            this.DataImpuestoTarifa.push(
              {
                'id': this.DataTarifas[i].id,
                'valor': this.DataTarifas[i].valor,
                'checked': false
              }
            );
          }
        } */
        /* this.DataImpuestoTarifa.sort(function (a, b) {
          if (a.valor > b.valor) {
            return 1;
          }
          if (a.valor < b.valor) {
            return -1;
          }
          return 0;
        }); */
      }
    );
  }

  onChangeEdit(id: number, isChecked: boolean) {
    if (isChecked === true) {
      this.DataJsonTarifas.push(
        {
          'id': id
        });
    } else {
      for (let i = 0; i < this.DataJsonTarifas.length; i++) {

        let index;
        if (id === this.DataJsonTarifas[i].id && isChecked === false) {
          index = this.DataJsonTarifas.indexOf(this.DataJsonTarifas[i]);
          this.DataJsonTarifas.splice(index, 1);
        }
      }
      if (id === parseInt(this.DataModificar.impmasUsado, 0)) {
        this.DataModificar.impmasUsado = undefined;
      }
    }
    for (let i = 0; i < this.DataTarifas.length; i++) {
      if (id === this.DataTarifas[i].id) {
        this.DataTarifas[i].checked = isChecked;
      }
    }
  }

  onSubmitModificar(DataImpuesto) {
    let regimen;
    if (DataImpuesto.id_regimen === 0 || DataImpuesto.id_regimen === null || DataImpuesto.id_regimen === undefined) {
      regimen = 3;
    } else {
      regimen = DataImpuesto.id_regimen;
    }
    /* if (parseInt(DataImpuesto.tipo_modulo, 0) === 2 ||
      DataImpuesto.id_regimen === 0 || DataImpuesto.id_regimen === null || DataImpuesto.id_regimen === undefined) {
      regimen = 3;
    } else {
      regimen = DataImpuesto.id_regimen;
    } */

    this.PostImpuesto = {
      'id': DataImpuesto.id_impuesto,
      'nombre': DataImpuesto.nombre_impuesto,
      'estado': true,
      'pais': {
        'id': 42,
        'nombre': 'Colombia'
      }
    };

    this.impuestosService.updateImpuesto(this.PostImpuesto).subscribe(data => {
      if (data.text() === 'el nombre digitado ya esta en uso para otro registro') {
        Swal.fire({
          title: 'Impuesto No Modificado',
          text: 'el nombre digitado ya esta en uso para otro registro',
          type: 'error',
        });
      } else if (data.text() === 'No se ha podido modificar el impuesto') {
        Swal.fire({
          title: 'Impuesto No Modificado',
          text: 'No se ha podido modificar el impuesto',
          type: 'error',
        });
      } else if (data.text() === '0') {
        Swal.fire({
          title: 'Impuesto No Modificado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      } else {
        Swal.fire({
          title: 'Impuesto Modificado',
          text: 'Proceso se realizó de manera Exitosa',
          type: 'success',
        });
        this.updateImpuestoRegimen(DataImpuesto.id_impuesto, DataImpuesto.id_regimen,
          DataImpuesto.id_regimen_ant, DataImpuesto.tipo_modulo);
        this.updateImpuestoTarifa(DataImpuesto.id_impuesto, DataImpuesto.id_regimen,
          DataImpuesto.id_regimen_ant, DataImpuesto.tipo_modulo, DataImpuesto.impmasUsado);
        this.LoadImpuestos();
      }
      this.clearTarifasImpuesto();
    });
  }

  updateImpuestoRegimen(idImpuesto, idRegimen, idRegimenAnt, modulo) {
    const Regimen = {
      reg: []
    };

    Regimen.reg.push(
      {
        'id_impuesto': idImpuesto,
        'id_regimen': idRegimen,
        'tipo_modulo': modulo,
        'estado': true
      });

    this.impuestosService.updateImpuestoRegimen(Regimen.reg, idImpuesto, idRegimenAnt).subscribe(res => {
      if (res.text() === 'success') {
        console.log('regimen del impuesto creado');
      } else {
        console.log('regimen del impuesto no se pudo crear');
      }
    });
  }

  updateImpuestoTarifa(idImpuesto, regimen, regimenAnt, modulo, imp_usado) {
    const Tarifas = {
      tarifa: []
    };
    let imp_mas_usado;
    console.log(this.DataJsonTarifas);
    for (const key of this.DataJsonTarifas) {
      if (parseInt(key.id, 0) === parseInt(imp_usado, 0)) {
        imp_mas_usado = true;
      } else {
        imp_mas_usado = false;
      }
      Tarifas.tarifa.push(
        {
          'id_impuesto': idImpuesto,
          'id_regimen': regimen,
          'id_tarifa': key.id,
          'impuesto_mas_usado': imp_mas_usado,
          'tipo_mod': modulo
        }
      );
    }

    this.impuestosService.updateImpuestoTarifa(Tarifas.tarifa, idImpuesto, regimenAnt).subscribe(res => {
      if (res.text() === 'success') {
        /* swal({
          title: 'Tarifas del Impuesto Creadas',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        }); */
      } else {
        console.log(res.text());
        /*  swal({
           title: 'Tarifas del Impuesto No se Crearon',
           text: 'Proceso no se realizó de manera Exitosa',
           type: 'error',
         }); */
      }
      this.LoadImpuestos();
      this.LoadTarifas();
      this.LimpiarFormulario();
    });
  }



  clearTarifasImpuesto() {
    this.DataJsonTarifas = [];
  }

  /* eliminarImpuestoTarifa(impuesto, regimen, tarifa) {
    this.impuestosService.eliminarImpuestoTarifa(impuesto, tarifa, regimen).subscribe(data => {
      if (data.text() === 'La tarifa fue eliminada con exito') {
        swal({
          title: 'Impuesto Modificado',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
      } else {
        swal({
          title: 'Impuesto No se pudo Modificar',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  } */

  setTarifas() {
    console.log(this.DataTarifas);
    for (const key of this.DataTarifas) {
      this.onChangeEdit(key.id, false);
    }
  }

  LimpiarFormulario() {
    /* this.LoadImpuestos();
    this.LoadTarifas(); */
    this.impuestosForm.reset();
    this.DataJsonTarifas = [];
    this.DataNew = [];
  }

}
