import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SidebarComponent} from '../../../shared/sidebar/sidebar.component';
import {ListapreciosService} from './listaprecios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listaprecios',
  templateUrl: './listaprecios.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ListapreciosService, SidebarComponent]
})
export class ListapreciosComponent implements OnInit {
  p:number=1;
  pun:number=1;
  DataArray: any = [];
  punEdit:number=1;
  DataJson: any = [];
  DataNew: any = [];
  DataModificar: any = [];
  DataClientes: any = [];
  DataDescuento: any = [];
  postDatos: any = [];
  postDatosDescuento: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;
  searchStringLista: any;
  itempageLista = 5;
  idInactivar: any;
  nombreInactivar: any;
  noHayRegistros = false;
  searchStringPuntos: any;
  itempagePuntos = 5;
  TodosPuntos: boolean;
  DataPuntosCliente: any = [];
  ListaPuntosSel: any = [];
  searchStringPuntosEdit: any;
  itempagePuntosEdit = 5;
  DataPuntosLista: any = [];

  @ViewChild('listapreciosForm', {static: true})
  private listapreciosForm: NgForm;

  @ViewChild('listapreciosEditForm', {static: true})
  private listapreciosEditForm: NgForm;

  @ViewChild('descForm', {static: true})
  public descForm: NgForm;

  constructor(public listapreciosService: ListapreciosService,
              public sidebarComponent: SidebarComponent,
              public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadClientes();
    this.LoadListaPrecios();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadClientes() {
    this.listapreciosService.getClientes().subscribe(
      data => {
        this.DataClientes = data[0];
        console.log(this.DataClientes);
        this.LoadPuntos(this.DataClientes.id);
      }
    );
  }

  LoadListaPrecios() {
    this.listapreciosService.getListaPrecios().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];
        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            const exist = this.DataJson.filter(x => x.id === key.id);
            if (exist.length === 0) {
              this.DataJson.push(
                {
                  'id': key.id,
                  'nombre': key.nombre,
                  'creado_por': key.creado_por,
                  'estado': key.estado,
                  'fecha_creacion': key.fecha_creacion,
                  'codigo': key.codigo,
                  'id_articulo_lista': key.id_articulo_lista
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

  LoadPuntos(idCliente) {
    console.log(idCliente);
    // console.log(this.DataClientes.id);
    this.DataPuntosCliente = [];
    // this.DataListaPreciosPunto = datosUsuario;
    this.listapreciosService.getPuntosCliente(idCliente).subscribe(
      data => {
        for (const key of data) {
          this.DataPuntosCliente.push({
            'id_punto': key.id_punto,
            'nombre': key.nombre,
            'checked': false
          });
        }
        this.DataPuntosCliente.sort(function(a, b) {
          if (a.id_punto > b.id_punto) {
            return 1;
          }
          if (a.id_punto < b.id_punto) {
            return -1;
          }
          return 0;
        });
        // this.LoadPuntosListaPrecios(datosUsuario.id);
      }
    );
  }

  onChangeAllPuntos(data, isChecked: boolean) {
    console.log('hola2');
    this.TodosPuntos = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChangePunto(data[i], isChecked);
    }
  }

  onChangePunto(data, isChecked) {
    if (isChecked === true) {
      const existe = this.ListaPuntosSel.filter(x => parseInt(x.id, 0) === parseInt(data.id_punto, 0));
      if (existe.length === 0) {
        this.ListaPuntosSel.push(
          {
            'id': data.id_punto,
            'nombre': data.nombre
          });
      }
    } else {
      for (let i = 0; i < this.ListaPuntosSel.length; i++) {
        let index;
        if (parseInt(data.id_punto, 0) === parseInt(this.ListaPuntosSel[i].id, 0) && isChecked === false) {
          index = this.ListaPuntosSel.indexOf(this.ListaPuntosSel[i]);
          this.ListaPuntosSel.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataPuntosCliente.length; i++) {
      if (data.id_punto === this.DataPuntosCliente[i].id_punto) {
        this.DataPuntosCliente[i].checked = isChecked;
      }
    }

    console.log(this.ListaPuntosSel);

  }


  onSubmit(datos) {
    this.postDatos = {
      'nombre': datos.nombre
    };

    this.listapreciosService.createListaPrecios(this.postDatos).subscribe(
      data => {
        if (data.text() === 'La lista de Precio ya existe para el cliente') {
          Swal.fire({
            title: 'Error',
            text: 'La lista de Precio ya existe para el cliente',
            type: 'error',
          });
        } else if (data.text() === 'No se ha podido crear la lista precio') {
          Swal.fire({
            title: 'Error',
            text: 'No se creo el registro correctamente',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Lista de precios Creada',
            text: 'se creo la Lista de precios exitosamente',
            type: 'success',
          });
          this.createPuntosListaPrecios(data.text());
        }
        this.LoadListaPrecios();
        this.LimpiarFormularioListaPrecios();
      }
    );
  }

  createPuntosListaPrecios(idListaPrecios) {
    const puntos = {
      listaprecios: []
    };
    if (this.ListaPuntosSel.length >= 1) {
      for (const key of this.ListaPuntosSel) {
        puntos.listaprecios.push(
          {
            'listaPrecios': {
              'id': idListaPrecios
            },
            'punto': {
              'id': key.id
            }
          }
        );
      }
      this.listapreciosService.createPuntoListaPrecios(puntos.listaprecios).subscribe(
        resul => {
          console.log(resul.text());
          /* if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articuloreceta_canal') {
            console.log(resul.text());
          } else {
            console.log('articuloreceta_canal creados correctamente');
          } */
        }
      );
    }
  }

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.listapreciosService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'Lista de precios inactivada',
      text: 'Proceso realizado de manera Exitosa, la Lista de precios ' + nombre + 'fue inactivada',
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

  bindingDataModificar(data) {
    this.DataModificar = data;
    this.DataModificar.nombreList = data.nombre;
    this.LoadPuntosListaPrecios(this.DataModificar.id);
  }


  LoadPuntosListaPrecios(idListaPrecios) {
    this.DataPuntosLista = [];
    // this.onChangeAllPuntos(this.DataPuntosCliente, false);
    console.log('hola');
    this.ListaPuntosSel = [];
    this.listapreciosService.getPuntosListaPrecios(idListaPrecios).subscribe(
      data => {
        // this.DataArrayPuntosUser = data;
        console.log(data);

        for (const key of data) {
          this.DataPuntosLista.push({
            'id_punto': key.idPunto,
            'nombre': key.nombrePunto,
            'checked': true
          });
          this.ListaPuntosSel.push(
            {
              'id': key.idPunto,
              'nombre': key.nombrePunto
            });
        }
        for (let i = 0; i < this.DataPuntosCliente.length; i++) {
          const p = this.DataPuntosLista.filter(x => x.id_punto === this.DataPuntosCliente[i].id_punto);
          if (p.length === 0) {
            this.DataPuntosLista.push(
              {
                'id_punto': this.DataPuntosCliente[i].id_punto,
                'nombre': this.DataPuntosCliente[i].nombre,
                'checked': false
              }
            );
          }
        }

        this.DataPuntosLista.sort(function(a, b) {
          if (a.id_punto > b.id_punto) {
            return 1;
          }
          if (a.id_punto < b.id_punto) {
            return -1;
          }
          return 0;
        });
        /*  for (const key of this.DataPuntosLista) {
           const existe = this.DataPuntosCliente.filter(x => parseInt(x.id_punto, 0) === parseInt(key.id_punto, 0));
           if (existe.length === 0) {
             this.onChangePunto(key, false);
           } else {
             this.onChangePunto(key, true);
           }
         } */
      }
    );
  }


  onSubmitModificar(datos) {
    this.postDatos = {
      'id': datos.id,
      'nombre': datos.nombreList,
      'estado': datos.estado,
      'creadoPor': datos.creado_por,
      'fechaCreacion': datos.fecha_creacion,
      'codigo': datos.codigo
    };
    this.listapreciosService.updateListaPrecios(this.postDatos).subscribe(data => {
      if (data.text() === 'La lista de Precio ya existe para el cliente') {
        Swal.fire({
          title: 'Error',
          text: 'No se creo el registro correctamente',
          type: 'error',
        });
      } else if (data.text() === 'No se ha podido modificar la lista precio') {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido modificar la lista precio',
          type: 'error',
        });
      } else {
        Swal.fire({
          title: 'Lista de precios Modificada',
          text: 'Se modifico lista precios exitosamente',
          type: 'success',
        });
        this.updatePuntosListaPrecios(data.text());
      }
      this.LoadListaPrecios();
    });
  }

  updatePuntosListaPrecios(idListaPrecios) {
    const puntos = {
      listaprecios: []
    };
    if (this.ListaPuntosSel.length >= 1) {
      for (const key of this.ListaPuntosSel) {
        puntos.listaprecios.push(
          {
            'listaPrecios': {
              'id': idListaPrecios
            },
            'punto': {
              'id': key.id
            }
          }
        );
      }
      this.listapreciosService.updatePuntoListaPrecios(puntos.listaprecios, idListaPrecios).subscribe(
        resul => {
          console.log(resul);
          /* if (resul.text() === 'Error') {
            console.log(resul.text());
          } else if (resul.text() === 'exitoso') {
            console.log(resul.text());
          } else if (resul.text() === 'No se pudo crear articuloreceta_canal') {
            console.log(resul.text());
          } else {
            console.log('articuloreceta_canal creados correctamente');
          } */
        }
      );
    }
  }

  LimpiarFormularioListaPrecios() {
    this.listapreciosForm.reset();
    this.onChangeAllPuntos(this.DataPuntosCliente, false);
  }

  LimpiarFormDescuento() {
    this.descForm.reset();
  }

  onSubmitDesc(dataDescuento) {

    console.log(dataDescuento);

    if (dataDescuento.addDesc === 1) {
      dataDescuento.addDesc = true;
    } else {
      dataDescuento.addDesc = false;
    }

    if (dataDescuento.descripcion === undefined) {
      dataDescuento.descripcion = 'n/a';
    }

    this.postDatosDescuento = {
      'codigo': dataDescuento.codigo,
      'nombre': dataDescuento.nombre,
      'porcentaje': dataDescuento.porcentaje,
      'addDescripcion': dataDescuento.addDesc,
      'descripcion': dataDescuento.descripcion
    };

    this.listapreciosService.createDescuentos(this.postDatosDescuento).subscribe(
      data => {
        if (data.text() === 'error') {
          Swal.fire({
            title: 'No se pudo crear el descuento',
            text: 'El descuento no pudo ser creado',
            type: 'error',
          });
        } else {
          Swal.fire({
            title: 'Descuento creado con exito',
            text: 'Descuento creado con exito',
            type: 'success',
          });
        }
      }
    );
  }

}
