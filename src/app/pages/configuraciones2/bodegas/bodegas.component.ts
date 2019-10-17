import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {BodegasService} from './bodegas.service';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [BodegasService, SidebarComponent]
})

export class BodegasComponent implements OnInit {

  DataArray: any = [];
  DataJson: any = [];
  p:number=1;
  DataArrayPunto: any = [];
  DataJsonPunto: any = [];
  DataJsonPuntoSel: any = [];
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
  itempageTBodegas = 5;
  itempageTPuntos = 5;
  itempageTEditPuntos = 5;
  searchStringTBodegas: any;
  searchStringTPuntos: any;
  searchStringTEditPuntos: any;
  idInactivar: any;
  nombreInactivar: any;
  checkedAll: boolean;
  DataPuntosSeleccionados: any = [];
  q: any;
  pu: any;

  @ViewChild('bodegasForm', {static: true})
  private bodegasForm: NgForm;

  @ViewChild('bodegasEditForm', {static: false})
  private bodegasEditForm: NgForm;

  constructor(public router: Router,
              public bodegasService: BodegasService,
              public sidebarComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadPuntoBodegas();
    this.LoadPuntos();
    this.checkedAll = false;
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadPuntoBodegas() {
    this.bodegasService.getPuntoBodegas().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            if (key.bodega_interna === false) {
              this.DataJson.push(
                {
                  'id': parseInt(key.id, 0),
                  'id_punto': parseInt(key.id_punto, 0),
                  'id_bodega': key.id_bodega,
                  'nombre_bodega': key.nombre,
                  'nombre_punto': key.nombre_punto,
                  'bodega_interna': key.bodega_interna,
                  'creado_por': key.creado_por,
                  'fecha_creacion': key.fecha_creacion,
                  'modificado_por': key.modificado_por,
                  'fecha_modificacion': key.fecha_modificacion,
                  'permite_facturar': key.permite_facturar,
                  'estado': key.estado
                }
              );
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

  LoadPuntos() {
    this.bodegasService.getPuntos().subscribe(
      data => {
        this.DataArrayPunto = data;
        this.DataJsonPunto = [];

        for (const key of this.DataArrayPunto) {
          this.DataJsonPunto.push(
            {
              'id': parseInt(key.id, 0),
              'id_punto': parseInt(key.id_punto, 0),
              'nombre': key.nombre
            }
          );
        }
        this.loader = false;
        this.LoadTabla = true;
      },
      error => {
        this.loader = false;
        this.LoadError = true;
        this.error = error;
        this.toastr.error(error, 'Error ' + error.status);
      }
    );
  }

  clickFilaBodega(id) {
    this.DataNew.idPunto = id.toString();
  }

  onSubmit(datosBodega) {
    const fecha = new Date();
    const existeBodega = this.DataJson.filter(x => x.nombre_bodega.toLowerCase() === datosBodega.nombre.toLowerCase()
      && parseInt(x.id_punto, 0) === parseInt(datosBodega.idPunto, 0));
    if (existeBodega.length === 1) {
      Swal.fire({
        title: 'Sitio de Almacenaje',
        text: 'El nombre del sitio de almacenaje ya existe para el punto',
        type: 'error',
      });
    } else {
      const data = {
        'nombre': datosBodega.nombre,
        'permiteFacturar': datosBodega.facturar,
        'bodegaInterna': false,
        'estado': true,
        'creadoPor': 1,
        'fechaCreacion': fecha.toLocaleDateString(),
        'modificadoPor': 1,
        'fechaModificacion': fecha.toLocaleDateString()
      };
      this.bodegasService.createBodega(data).subscribe(
        res => {
          if (res === 'La bodegano se ha podido crear') {
            Swal.fire({
              title: 'Sitio de Almacenaje',
              text: 'No se ha podido crear el Sitio de Almacenaje',
              type: 'error',
            });
          } else {
            this.createPuntoBodega(res, datosBodega.idPunto); // Crea en tabla punto_bodega
            Swal.fire({
              title: 'Sitio de Almacenaje',
              text: 'El Sitio de Almacenaje ha sido creada con exito',
              type: 'success',
            });
            this.LoadPuntoBodegas();
          }
        }
      );
    }
  }

  createPuntoBodega(IdBodega, IdPunto) {
    const punto = {
      bodega: []
    };

    punto.bodega.push(
      {
        'id_punto': IdPunto,
        'id_bodega': IdBodega
      });

    this.bodegasService.createPuntoBodega(punto.bodega).subscribe(res => {
      if (res.text() === 'No se pudo crear puntoBodega') {
        Swal.fire({
          title: 'Punto Sitio de Almacenaje No se Crearon',
          text: 'El Sitio de Almacenaje no se pudo asociar al punto',
          type: 'error',
        });

      } else {
        console.log('Punto Sitio de Almacenaje creada');
      }
      this.LoadPuntoBodegas();
    });
  }

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.bodegasService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'Sitio de Almacenaje inactivado',
      text: 'Proceso realizado de manera Exitosa, el Sitio de Almacenaje ' + nombre + 'fue inactivada',
      type: 'success',
    });

    for (let i = 0; i < this.DataJson.length; i++) {
      let index;
      if (parseInt(id, 0) === parseInt(this.DataJson[i].id_bodega, 0)) {

        index = this.DataJson.indexOf(this.DataJson[i]);
        this.DataJson.splice(index, 1);

      }
    }
  }

  bindingDataModificar(data) {
    this.DataModificar = data;
    this.DataModificar.bodega = data.nombre_bodega;
    this.DataModificar.facturar = data.permite_facturar;
  }

  clickFilaBodegaEdit(id) {
    this.DataModificar.id_punto = id.toString();
  }

  onSubmitModificar(datos) {
    /* if (datos.nombre_bodega.toLowerCase() !== datos.bodega.toLowerCase()) { */
    const existeBodega = this.DataJson.filter(x => x.nombre_bodega.toLowerCase() === datos.bodega.toLowerCase()
      && parseInt(x.id_punto, 0) === parseInt(datos.id_punto, 0) && x.permite_facturar === datos.facturar);
    if (existeBodega.length === 1) {
      Swal.fire({
        title: 'Sitio de Almacenaje',
        text: 'El nombre del Sitio de Almacenaje ya existe para el punto',
        type: 'error',
      });
    } else {
      this.postDatos = {
        'id': datos.id_bodega,
        'nombre': datos.bodega,
        'permiteFacturar': datos.facturar,
        'bodegaInterna': datos.bodega_interna,
        'estado': true,
        'creadoPor': 1,
        'fechaCreacion': datos.fecha_creacion,
        'modificadoPor': 1,
        'fechaModificacion': datos.fecha_modificacion
      };

      this.bodegasService.updateBodega(this.postDatos).subscribe(data => {

          if (data.text() === 'La bodega se ha Modificado con exito') {
            this.updatePuntoBodega(datos.id, datos.id_bodega, datos.id_punto);
            Swal.fire({
              title: 'Sitio de Almacenaje Modificada',
              text: data.text(),
              type: 'success',
            });
          } else {
            Swal.fire({
              title: 'Sitio de Almacenaje No Modificada',
              text: data.text(),
              type: 'error',
            });
          }
          this.LoadPuntoBodegas();
        }
      );
    }
    /* } */
  }

  updatePuntoBodega(id, idBodega, idPunto) {
    const puntos = {
      bodegas: []
    };

    puntos.bodegas.push(
      {
        'id': id,
        'id_punto': idPunto,
        'id_bodega': idBodega
      });

    this.bodegasService.updatePuntoBodega(puntos.bodegas).subscribe(res => {
      if (res.text() === 'No se pudo actualizar puntoBodega') {
        Swal.fire({
          title: 'Punto Sitio de Almacenaje No se actualizaron',
          text: 'El Sitio de Almacenaje no se pudo asociar al punto',
          type: 'error',
        });
      } else {
        console.log('Punto Sitio de Almacenaje actualizada');
      }
    });
  }

  LimpiarFormBodegas() {
    this.bodegasForm.reset();
    this.DataNew.facturar = 0;
    this.DataNew.idPunto = '';
  }
}
