import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MarcasService } from './marcas.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [MarcasService, SidebarComponent]
})
export class MarcasComponent implements OnInit {

  p:number=1;
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
  searchString: any;
  itempage = 5;
  noHayRegistros = false;
  idInactivar: any;
  nombreInactivar: any;
  // existeCliente = false;

  @ViewChild('marcasForm',{static:true})
  private marcasForm: NgForm;

  @ViewChild('marcasEditForm',{static:true})
  private marcasEditForm: NgForm;

  constructor(public marcasService: MarcasService,
    public SidebarComponent: SidebarComponent, public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadClientes();
    this.LoadMarcas();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z& ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadClientes() {
    this.marcasService.getClientes().subscribe(
      data => {
        this.DataClientes = data;
      }
    );
  }

  LoadMarcas() {
    this.marcasService.getMarcas().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            this.DataJson.push(
              {
                'id': key.id,
                'nombre_marca': key.nombre_marca,
                'id_cliente': key.id_cliente,
                'nombre_cliente': key.nombre_cliente,
                'creado_por': key.creado_por,
                'fecha_creacion': key.fecha_creacion
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

  /* ValidarCliente(Cliente) {    console.log(Cliente);
    const existeCliente = this.DataClientes.filter(x => x.nombre == Cliente);
    if (existeCliente.length === 0) {
      this.existeCliente = false;
    } else {
      this.existeCliente = true;
    }
  } */

  onSubmit(datos) {
    // datos.idCliente = this.DataClientes.filter(x => x.nombre == datos.nomCliente)[0].id;
    this.postDatos = {
      'nombre': datos.nombre,
      'idCliente': datos.id_cliente
    };

    this.marcasService.createMarca(this.postDatos).subscribe(
      data => {
        if (data.text() === 'La marca fue creada con exito') {
          Swal.fire({
            title: 'Marca Creada',
            text: data.text(),
            type: 'success',
          });
        } else {
          Swal.fire({
            title: 'Marca No Creada',
            text: data.text(),
            type: 'error',
          });
        }
        this.LoadMarcas();
        this.LimpiarFormularioMarcas();
      }
    );
  }

  bindingDataInactivar(id, nombre) {
    this.idInactivar = id;
    this.nombreInactivar = nombre;
  }

  Inactivar(id, nombre) {
    this.marcasService.putInactivar(id).subscribe();
    Swal.fire({
      title: 'Marca inactivada',
      text: 'Proceso realizado de manera Exitosa, la Marca ' + nombre + 'fue inactivada',
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
  }

  onSubmitModificar(datos) {
    this.postDatos = {
      'id': datos.id,
      'nombre': datos.nombre_marca,
      'id_cliente': datos.id_cliente
    };
    this.marcasService.updateMarca(this.postDatos).subscribe(data => {
      if (data.text() === 'La marca fue modificada con exito') {
        Swal.fire({
          title: 'Marca Modificada',
          text: data.text(),
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Marca No Modificada',
          text: data.text(),
          type: 'error',
        });
      }
      this.LoadMarcas();
    });
  }

  LimpiarFormularioMarcas() {
    this.marcasForm.reset();
  }
}
