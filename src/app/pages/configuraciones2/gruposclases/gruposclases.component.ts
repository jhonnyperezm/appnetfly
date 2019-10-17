import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GruposclasesService } from './gruposclases.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
declare const $;


@Component({
  selector: 'app-gruposclases',
  templateUrl: './gruposclases.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposclasesService, SidebarComponent, DatePipe]
})
export class GruposclasesComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataJson: any = [];
  DataNew: any = [];
  DataClases: any = [];
  DataModificar: any = [];
  postDatos: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  idInactivar: any;
  nombreInactivar: any;
  idClase: any;
  idGrupo: any;
  nombreClase: any;
  nombreGrupo: any;
  checkedAll: boolean;
  rol: boolean;
  tipo: any;
  itemsPerPage = 5;
  searchString: any;
  itempage = 5;
  itempageTGrupos = 5;
  searchStringTGrupos: any;
  fechaCre: any;
  creado: any;
  modifi: any;
  Grupo: any;
  DataCliente: any = [];
  DataArrayImpuesto: any = [];
  regitrosImpuestos: any = [];
  DataCanales: any = [];
  imageUrl = 'assets/images/default-image.png';
  fileToUpload: File = null;
  imagen: any;
  loaderImagen = true;
  // imagenGrupo: any;
  orden: any;
  oculto: any;
  noHayRegistros = false;
  DataNewGrupo: any = [];
  noImage: Boolean;

  @ViewChild('gruposclasesForm',{static:true})
  private gruposclasesForm: NgForm;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public SidebarComponent: SidebarComponent,
    public gruposclasesService: GruposclasesService, public toastr: ToastrService) {
    this.loader = true;
    this.DataArray = [];
    this.loader = true;
    this.LoadTabla = false;
    this.idClase = this.route.snapshot.params.idClase;
    // this.nombreClase = this.route.snapshot.params.nombreClase;
    this.gruposclasesService.getDatosClase(this.idClase).subscribe(
      data => {
        console.log(data);
        this.nombreClase = data[0].nombre;
      });
    this.DataNewGrupo.paraVenta = true;
    this.DataNewGrupo.paraInven = true;
  }

  ngOnInit() {
    this.loadGruposClases();
    this.LoadDatosCliente();
    this.rol = true;
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadDatosCliente() {
    this.gruposclasesService.getDatosCliente().subscribe(
      data => {
        this.DataCliente = data[0];
        this.LoadImpuestoCliente(this.DataCliente.id);
        this.LoadCanalesCliente(this.DataCliente.id);
      }
    );
  }

  LoadImpuestoCliente(idCliente) {
    this.gruposclasesService.getImpuestosPorCliente(idCliente).subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          /* const existe = this.DataArrayImpuesto.filter(x => parseInt(x.id_impuesto, 0) === parseInt(key.id_impuesto, 0)
            && parseInt(x.id_regimen, 0) === parseInt(key.id_regimen, 0));
          if (existe.length === 0) { */
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
          /* } */
          this.regitrosImpuestos.push('impuestos1');
          /*  this.DataTarifas.push({
             'id_tarifa': key.id_tarifa,
             'valor_tarifa': key.valor_tarifa
           }); */
        }
      });
  }

  LoadCanalesCliente(idCliente) {
    this.gruposclasesService.getCanalesPorCliente(idCliente).subscribe(
      data => {
        console.log(data);
        for (const key of data) {
          this.DataCanales.push({
            'id': key.id_canal,
            'nombre': key.nombre_canal
          });
        }
      }
    );
  }

  loadGruposClases() {
    this.gruposclasesService.getGruposClases(this.idClase).subscribe(
      data => {
        console.log(data);
        this.DataClases = data;
        if (this.DataClases.length !== 0) {
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

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.gruposclasesService.putInactivarGruposClases(id).subscribe();
    Swal.fire({
      title: 'grupo inactivado',
      text: 'Proceso realizado de manera Exitosa, el grupo ' + nombre + 'fue inactivado',
      type: 'success',
    });

    for (let i = 0; i < this.DataClases.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataClases[i].id, 0)) {

        index = this.DataClases.indexOf(this.DataClases[i]);
        this.DataClases.splice(index, 1);

      }
    }
  }


  handleFileInput(file: FileList) {

    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    $('.custom-file-label').html(this.fileToUpload.name);
    // Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.imageUrl);

  }

  CrearGrupo(DataGrupo) {

    const image = this.imageUrl.split(',');

    let tipoGrupo;
    if (DataGrupo.paraVenta === true && DataGrupo.paraInven === true) {
      tipoGrupo = 3; // Ambos

    } else if (DataGrupo.paraVenta === true && DataGrupo.paraInven === false) {
      tipoGrupo = 1; // Ventas

    } else if (DataGrupo.paraVenta === false && DataGrupo.paraInven === true) {
      tipoGrupo = 2; // Inventarios
    }

    this.DataNew = {
      clase: {
        id: this.idClase
      },
      nombre: DataGrupo.nombre,
      imagen: image[1],
      tipo: tipoGrupo
    };

    this.gruposclasesService.createGrupo(this.DataNew).subscribe(
      data => {
        if (data.text() === 'El Grupo ya existe para el cliente') {
          Swal.fire({
            title: 'Grupo',
            text: 'No se ha podido el Grupo, ya existe en BD',
            type: 'error'
          });
        } else if (data.text() === 'No se pudo crear el grupo') {
          Swal.fire({
            title: 'Grupo',
            text: 'No se pudo crear el grupo',
            type: 'error'
          });
        } else {

          Swal.fire({
            title: 'Grupo',
            text: 'El Grupo ha sido creada con exito',
            type: 'success'
          });

          this.loadGruposClases();
          this.crearImpuestoVenta(this.idClase, data.text());
          this.LimpiarFormularioGruposclases();
        }
        this.loadGruposClases();
      }
    );
    console.log(this.DataNew);

  }

  crearImpuestoVenta(idClase, idGrupo) {

    /* const impuestos = {
      venta: []
    }; */
    let postImpuestos;
    /* for (const can of this.DataCanales) { */
    console.log(this.DataArrayImpuesto);
    if (this.DataArrayImpuesto.length === 1) {
      for (const imp of this.DataArrayImpuesto) {
        postImpuestos = {
          'clases': {
            'id': idClase
          },
          'impDifCanal': 1,
          'grupoVentaInv': {
            'id': idGrupo
          },
          'impuesto': {
            'id': imp.id_impuesto
          },
          'tarifa': {
            'id': imp.id_tarifa
          }
        };

      }
    } else {
      for (const imp of this.DataArrayImpuesto) {
        if (imp.impuesto_mas_usado === true) {
          postImpuestos = {
            'clases': {
              'id': idClase
            },
            'impDifCanal': 1,
            'grupoVentaInv': {
              'id': idGrupo
            },
            'impuesto': {
              'id': imp.id_impuesto
            },
            'tarifa': {
              'id': imp.id_tarifa
            }
          };
        }
      }
      /* } */
    }

    this.gruposclasesService.postImpuestoVenta(postImpuestos).subscribe(
      resul => {
        console.log(resul);
        /* if (resul.text() === 'success') {
          this.router.navigate(['/dashboard/impuestosventas']);
          Swal.fire({
            title: 'Exitoso',
            text: 'El proceso se realizo exitosamente',
            type: 'success',
          });
        } else {
          console.log(resul.text());
        } */
      });
  }

  bindingDataModificar(data) {
    console.log(data);
    this.DataModificar = data;
    this.DataModificar.nombreGrupo = data.nombre;

    if (data.tipo == 1) {
      this.DataModificar.paraVenta = true;
      this.DataModificar.paraInven = false;

    } else if (data.tipo == 2) {
      this.DataModificar.paraVenta = false;
      this.DataModificar.paraInven = true;

    } else if (data.tipo == 3) {
      this.DataModificar.paraVenta = true;
      this.DataModificar.paraInven = true;

    } else {
      this.DataModificar.paraVenta = false;
      this.DataModificar.paraInven = false;
    }


    this.loaderImagen = true;
    if (data.imagen === undefined || data.imagen === '' || data.imagen === null) {
      // this.imagen = 'assets/images/default-image.png';
      this.noImage = true;
      this.loaderImagen = false;
    } else {
      this.noImage = false;
      this.imagen = 'data:image/png;base64,' + data.imagen;
      this.loaderImagen = false;
    }


  }

  handleFileInputEdit(file: FileList) {

    this.noImage = false;
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    $('.custom-file-label').html(this.fileToUpload.name);
    // Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagen = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.imagen);

  }


  onSubmitModificar(datosGrupoEdit) {
    console.log(datosGrupoEdit);
    console.log(this.imagen);
    // console.log(this.imagenGrupo);
    let image;
    let image2;
    if (this.imagen === undefined || this.imagen === '' || this.imagen === null) {
      image2 = null;
    } else {
      image = this.imagen.split(',');
      image2 = image[1];
    }


    let tipoGrupo;
    if (datosGrupoEdit.paraVenta === true && datosGrupoEdit.paraInven === true) {
      tipoGrupo = 3; // Ambos

    } else if (datosGrupoEdit.paraVenta === true && datosGrupoEdit.paraInven === false) {
      tipoGrupo = 1; // Ventas

    } else if (datosGrupoEdit.paraVenta === false && datosGrupoEdit.paraInven === true) {
      tipoGrupo = 2; // Inventarios
    }


    this.postDatos = {
      id: datosGrupoEdit.id,
      clase: {
        id: this.idClase
      },
      nombre: datosGrupoEdit.nombreGrupo,
      estado: true,
      creadoPor: datosGrupoEdit.creado_por,
      fechaCreacion:  this.datePipe.transform(datosGrupoEdit.fecha_creacion, 'yyyy-MM-dd') + 'T00:00:00',
      imagen: image2,
      oculto: datosGrupoEdit.oculto,
      orden: datosGrupoEdit.orden,
      tipo: tipoGrupo
    };
    this.gruposclasesService.updateGruposclases(this.postDatos).subscribe(data => {

      if (data.text() === 'No se pudo crear el grupo') {
        Swal.fire({
          title: 'Grupo No Modificado',
          text: 'No se pudo modificar el grupo',
          type: 'error'
        });
      } else {
        Swal.fire({
          title: 'Grupo Modificado',
          text: 'Se modifico el grupo exitosamente',
          type: 'success'
        });
      }
      this.loadGruposClases();
    }
    );
  }

  LimpiarFormularioGruposclases() {
    this.gruposclasesForm.reset();
    this.imageUrl = "assets/images/default-image.png";
  }

}
