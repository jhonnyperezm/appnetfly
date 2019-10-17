import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesService } from './roles.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [ RolesService, SidebarComponent ]
})

export class RolesComponent implements OnInit {
  p:number=1;
  DataArray: any = [];
  DataArrayPermisos: any = [];
  DataJson: any = [];
  DataRolNew: any = [];
  DataRol: any = [];
  DataJsonRol: any = [];
  DataPermisos: any = [];
  DataJsonPermisos: any = [];
  DataPermisosRol: any = [];
  DataPermisosRolTabla: any = [];
  loader: boolean;
  LoadTabla: boolean;
  roles: any;
  LoadError: boolean;
  error: any;

  itempagePermisos = 5;
  itempage = 5;
  itempageEditPermisos = 5;

  searchString: any;
  searchStringPermisos: any;
  searchStringEditPermisos: any;

  idRol: any;
  nombreRol: any;
  frmRoles2: NgForm;
  frmRoles: FormGroup;
  frmEditRoles: FormGroup;
  DataNewRol: any = [];
  checkedAll: Boolean;
  per: any;
  y: any;
  noHayRegistros = false;

  @ViewChild('rolesForm',{static:true})
  private rolesForm: NgForm;

  @ViewChild('editRolesForm',{static:true})
  private editRolesForm: NgForm;

  constructor(public rolesService: RolesService,
    public SidebarComponent: SidebarComponent,
    public toastr: ToastrService) {
    this.DataJson = [];
    this.loader = true;
    this.LoadTabla = false;
    this.checkedAll = false;
  }

  ngOnInit() {
    this.LoadRoles();
    this.LoadPermisos();
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadPermisos() {
    this.rolesService.getPermisos().subscribe(
      data => {
        for (const key of data) {
          this.DataPermisos.push({
            'estado': key.estado,
            'id': key.id,
            'nombre': key.nombre,
            'checked': false,
          });
        }
        this.DataPermisos.sort(function (a, b) {
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

  LoadRoles() {
    this.rolesService.getRoles().subscribe(
      data => {
        this.DataArray = data;
        this.DataJson = [];

        if (this.DataArray.length !== 0) {
        for (const key of this.DataArray) {
          this.DataJson.push(
            {
              'id': key.id,
              'nombre': key.nombre,
              'creadoPor': key.creado_por,
              'modificadoPor': key.modificadoPor,
              'fechaCreacion': key.fecha_creacion
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

  onChangeAll(isChecked: boolean) {
    this.checkedAll = isChecked;
    for (let i = 0; i < this.DataPermisos.length; i++) {
      this.DataPermisos[i].checked = isChecked;
      this.onChange(this.DataPermisos[i].id, isChecked);
    }
  }

  onChange(id: number, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonPermisos.filter(x => parseInt(x.id, 0) === id);
      if (existe.length === 0) {
        this.DataJsonPermisos.push(
          {
            'id': id
          }
        );
      }
    } else {
      for (let i = 0; i < this.DataJsonPermisos.length; i++) {

        let index;
        if (id === parseInt(this.DataJsonPermisos[i].id, 0) && isChecked === false) {
          index = this.DataJsonPermisos.indexOf(this.DataJsonPermisos[i]);
          this.DataJsonPermisos.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataPermisos.length; i++) {
      if (id === this.DataPermisos[i].id) {
        this.DataPermisos[i].checked = isChecked;
      }
    }
  }

  onChangeEdit(id: number, isChecked: boolean) {
    if (isChecked === true) {
      const existe = this.DataJsonPermisos.filter(x => parseInt(x.id, 0) === id);
      if (existe.length === 0) {
        this.DataJsonPermisos.push(
          {
            'id': id
          }
        );
      }
    } else {
      for (let i = 0; i < this.DataJsonPermisos.length; i++) {

        let index;
        if (id === parseInt(this.DataJsonPermisos[i].id, 0) && isChecked === false) {
          index = this.DataJsonPermisos.indexOf(this.DataJsonPermisos[i]);
          this.DataJsonPermisos.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataPermisosRol.length; i++) {
      if (id === this.DataPermisosRol[i].id) {
        this.DataPermisosRol[i].checked = isChecked;
      }
    }
  }


  onSubmit(datos) {
    this.DataRolNew = {
      'nombre': datos.nombre
    };

    this.rolesService.createRol(this.DataRolNew).subscribe(data => {
      if (data.text() !== '0') {
        // this.createPermisosRol(data.text());
      this.LoadRoles();
        Swal.fire({
          title: 'Rol Creado',
          text: 'Proceso se realizó de manera Exitosa',
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Rol No Creado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  createPermisosRol(idRol) {
    const permisos = {
      permiso: []
    };

    for (const key of this.DataJsonPermisos) {
      permisos.permiso.push(
        {
          'id_rol': idRol,
          'id_permiso': key.id
        });
    }

    this.rolesService.createPermisosRol(permisos.permiso).subscribe(res => {
      if (res.text() === 'exitoso') {
        Swal.fire({
          title: 'Permisos del Rol Creados',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Permisos del Rol No se Crearon',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
      this.LoadRoles();
      this.LoadPermisos();
      this.DataJsonPermisos = [];
    });
  }

  bindingDataRol(id, rol) {
    this.idRol = id;
    this.nombreRol = rol;
  }

  InactivarRol(id, nombre) {
    this.rolesService.putInactivarRol(id).subscribe();
    Swal.fire({
      title: 'Rol inactivado',
      text: 'Proceso realizado de manera Exitosa, el Rol ' + nombre + 'fue inactivado',
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


  bindingDataRolModificar(data) {
    console.log(data);
    this.DataRol = data;
    this.DataRol.nombrerol = data.nombre;
    // this.LoadPermisosRol(data.id);
  }

  LoadPermisosRol(idRol) {
    this.rolesService.getPermisosPorRol(idRol).subscribe(
      data => {
        this.DataArrayPermisos = data;
        this.DataPermisosRol = [];

        for (const key1 of this.DataArrayPermisos) {
          this.DataPermisosRol.push(
            {
              'id': key1.id_permiso,
              'nombre': key1.nombre_permiso,
              'checked': true
            }
          );
          this.DataJsonPermisos.push(
            {
              'id': key1.id_permiso
            });
        }

        for (let i = 0; i < this.DataPermisos.length; i++) {
          const p = this.DataPermisosRol.filter(x => x.id === this.DataPermisos[i].id);
          if (p.length === 0) {
            this.DataPermisosRol.push(
              {
                'id': this.DataPermisos[i].id,
                'nombre': this.DataPermisos[i].nombre,
                'checked': false
              }
            );
          }
        }
        this.DataPermisosRol.sort(function (a, b) {
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

  onSubmitModificar(DataRol) {
    this.DataJsonRol = {
      'id': DataRol.id,
      'nombre': DataRol.nombrerol,
      'fechaCreacion': DataRol.fechaCreacion,
      'creadoPor': DataRol.creadoPor
    };
    this.rolesService.updateRol(this.DataJsonRol).subscribe(data => {
      if (data.text() !== '0') {
        this.LoadRoles();
        // this.updatePermisosRol(data.text());
        Swal.fire({
          title: 'Rol Modificado',
          text: 'Proceso se realizó de manera Exitosa',
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Rol No Modificado',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  updatePermisosRol(idRol) {
    const permisos = {
      permiso: []
    };

    for (const key of this.DataJsonPermisos) {
      permisos.permiso.push(
        {
          'id_rol': idRol,
          'id_permiso': key.id
        });
    }
    this.rolesService.updatePermisoRol(idRol, permisos.permiso).subscribe(data => {
      this.LoadRoles();
      this.DataJsonPermisos = [];
    });
  }

  eliminarPermisoRol(rol, permiso) {
    this.rolesService.eliminarPermisoRol(rol, permiso).subscribe(data => {
      if (data.text() === 'El permiso fue eliminado con exito') {
        Swal.fire({
          title: 'Permisos Modificados',
          text: 'Proceso realizado de manera Exitosa',
          type: 'success',
        });
      } else {
        Swal.fire({
          title: 'Permisos del Rol No se Modificaron',
          text: 'Proceso no se realizó de manera Exitosa',
          type: 'error',
        });
      }
    });
  }

  LimpiarFormRoles() {
    this.DataPermisos = [];
    this.LoadRoles();
    this.rolesForm.reset();
    this.LoadPermisos();
  }

  LimpiarForm() {
    this.LoadRoles();
    this.LoadPermisos();
  }

}
