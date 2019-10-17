import { Component, OnInit, ViewChild } from '@angular/core';
import { GruposcorporativosService } from './gruposcorporativos.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gruposcorporativos',
  templateUrl: './gruposcorporativos.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [GruposcorporativosService, SidebarComponent]
})
export class GruposcorporativosComponent implements OnInit {
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
  noHayRegistros = false;
  LoadError: boolean;
  error: any;
  searchString: any;
  itempage = 5;
  idInactivar: any;
  nombreInactivar: any;
  searchStringClientes: any;
  idGrupo: any;
  nombreGrupo: any;
  DataJsonClientes: any = [];
  DataGrupoNew: any = [];
  DataClientesGrupo: any = [];
  DataJsonGrupo: any = [];
  DataRolNew: any = [];
  q: any;
  y: any;


  @ViewChild('gruposCorForm',{static:true})
  private margruposCorFormcasForm: NgForm;

  @ViewChild('gruposCorEditForm',{static:true})
  private gruposCorEditForm: NgForm;

  constructor(public gruposcorporativosService: GruposcorporativosService,
    public SidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
  }

  ngOnInit() {
    this.LoadGrupos();
    this.LoadClientes();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadClientes() {
    this.gruposcorporativosService.getClientes().subscribe(
      data => {
        this.DataClientes = data;

        this.DataClientes.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      }
    );
  }

  LoadGrupos() {
    this.gruposcorporativosService.getGrupos().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];


        if (this.DataArray.length !== 0) {
          for (const key of this.DataArray) {
            this.DataJson.push(
              {
                'creadoPor': key.creadoPor,
                'estado': key.estado,
                'fechaCreacion': key.fechaCreacion,
                'fechaModificacion': key.fechaModificacion,
                'id': key.id,
                'modificadoPor': key.modificadoPor,
                'nombre': key.nombre
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

  onChange(id: number, isChecked: boolean) {
    if (isChecked === true) {
      this.DataJsonClientes.push(
        {
          'id': id
        });
    } else {
      for (let i = 0; i < this.DataJsonClientes.length; i++) {

        let index;
        if (id === this.DataJsonClientes[i].id && isChecked === false) {
          index = this.DataJsonClientes.indexOf(this.DataJsonClientes[i]);
          this.DataJsonClientes.splice(index, 1);
        }
      }
    }
  }

  onSubmit(nombreGrupo) {
    this.DataGrupoNew = {
      'nombre': nombreGrupo
    };

    this.gruposcorporativosService.createGrupo(this.DataGrupoNew).subscribe(data => {
      if (data.text() !== '0') {
        this.createClienteGrupo(data.text());
      } else {
        Swal.fire({
          title: 'Grupo No Creado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
      this.LoadGrupos();
    });
  }

  createClienteGrupo(idGrupo) {
    const clientes = {
      cliente: []
    };

    for (const key of this.DataJsonClientes) {
      clientes.cliente.push(
        {
          'id_grupo': idGrupo,
          'id_cliente': key.id
        });
    }

    this.gruposcorporativosService.createClientesGrupo(clientes.cliente).subscribe(res => {
      if (res.text() === 'exitoso') {
        Swal.fire({
          title: 'Clientes del Grupo Creados',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });

      } else {
        Swal.fire({
          title: 'Clientes del Grupo No se Crearon',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
      this.LoadGrupos();
      this.LoadClientes();
      this.nombreGrupo = '';
    });

  }

  bindingDataInactivar(id, grupo) {
    this.idInactivar = id;
    this.nombreInactivar = grupo;
  }

  Inactivar(id, nombre) {
    this.gruposcorporativosService.putInactivarGrupo(id).subscribe();
    Swal.fire({
      title: 'Grupo inactivado',
      text: 'Proceso realizado de manera Exitosa, el Grupo ' + nombre + 'fue inactivado',
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
    this.LoadClientesGrupo(data.id);
  }

  LoadClientesGrupo(idGrupo) {
    this.gruposcorporativosService.getClientesPorGrupo(idGrupo).subscribe(
      data => {
        this.DataArray = data;
        this.DataClientesGrupo = [];

        for (const key1 of this.DataArray) {
          this.DataClientesGrupo.push(
            {
              'id': key1.id_cliente,
              'nombre': key1.nombre_cliente,
              'checked': true
            });
          this.DataJsonClientes.push(
            {
              'id': key1.id_cliente
            });
        }

        for (let i = 0; i < this.DataClientes.length; i++) {
          const p = this.DataClientesGrupo.filter(x => x.id === this.DataClientes[i].id);
          if (p.length === 0) {
            this.DataClientesGrupo.push(
              {
                'id': this.DataClientes[i].id,
                'nombre': this.DataClientes[i].nombre,
                'checked': false
              }
            );
          }
        }
        this.DataClientesGrupo.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      }
    );
  }

  onSubmitModificar(DataGrupo) {
    this.DataJsonGrupo = {
      'id': DataGrupo.id,
      'nombre': DataGrupo.nombre,
      'fechaCreacion': DataGrupo.fechaCreacion,
      'creadoPor': DataGrupo.creadoPor
    };
    this.gruposcorporativosService.updateGrupo(this.DataJsonGrupo).subscribe(data => {
      if (data.text() !== '0') {
        for (const key of this.DataClientesGrupo) {
          if (key.checked === true) {
            const existe = this.DataJsonClientes.filter(x => x.id === key.id);
            if (existe.length === 0) {
              this.eliminarClienteGrupo(DataGrupo.id, key.id);
            }
          } else {
            const existe = this.DataJsonClientes.filter(x => x.id === key.id);
            if (existe.length >= 1) {
              this.createClienteGrupo(DataGrupo.id);
            }
          }
        }
        this.LoadClientes();
      } else {
        Swal.fire({
          title: 'Grupo No Modificado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
      this.clearClientesGrupo();
    });
  }

  clearClientesGrupo() {
    this.DataJsonClientes = [];
  }

  eliminarClienteGrupo(grupo, cliente) {
    this.gruposcorporativosService.eliminarClienteGrupo(grupo, cliente).subscribe(data => {
      if (data.text() === 'El cliente fue eliminado del grupo con exito') {
        Swal.fire({
          title: 'Clientes  del Grupo Modificados',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Clientes del Grupo No se Modificaron',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  LimpiarFormulario() {
    this.LoadGrupos();
    this.LoadClientes();
    this.nombreGrupo = '';
    this.DataJsonClientes = [];
  }

}
