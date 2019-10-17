import { Component, OnInit, ViewChild } from '@angular/core';
import { AsignarpermisosrolService } from './asignarpermisosrol.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignarpermisosrol',
  templateUrl: './asignarpermisosrol.component.html',
  styleUrls: ['../../estilosgeneral.css'],
  providers: [AsignarpermisosrolService]
})
export class AsignarpermisosrolComponent implements OnInit {
  per:number=1
  LoadError: boolean;
  error: any;
  loader: boolean;
  LoadTabla: boolean;

  idRol: any;
  nombreRol: any;
  DataNewRol: any = [];
  searchStringPermisos: any;
  itempagePermisos = 20;
  DataPermisos: any = [];
  arrayPrincipal: any = [];
  DataArrayAplicaciones: any = [];
  DataPermisosRol: any = [];
  ListaPermisosSel: any = [];
  DataArrayPermisos: any = [];
  TodoPermisos = false;
  DataJsonPermisosRol: any = [];

  @ViewChild('rolesForm',{static:true})
  private rolesForm: NgForm;

  @ViewChild('rolesApliForm',{static:true})
  private rolesApliForm: NgForm;

  constructor(public router: Router,
    public asignarpermisosrolService: AsignarpermisosrolService,
    public toastr: ToastrService,
    private route: ActivatedRoute) {
    this.idRol = this.route.snapshot.params.idRol;
    this.nombreRol = this.route.snapshot.params.nombreRol;
    this.DataNewRol.nombre = this.nombreRol;
  }

  ngOnInit() {
    this.LoadAplicaciones();
    this.LoadPermisosRol();
  }

  Regresar() {
    this.router.navigate(['/configuraciones/roles']);
  }

  kPLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  LoadAplicaciones() {
    this.asignarpermisosrolService.getAplicaciones().subscribe(
      data => {
        console.log(data);
        this.DataArrayAplicaciones = data;
      }
    );
  }

  capturapipe(dato) {
    this.arrayPrincipal = [];
    this.arrayPrincipal = this.DataPermisos.filter(data => {
      return data.nombre.toLowerCase().includes(dato.toLowerCase());
    });
  }

  LoadPermisosRol() {
    this.LoadError = false;
    this.loader = true;
    this.LoadTabla = false;
    this.asignarpermisosrolService.getPermisosRol(this.idRol).subscribe(
      data => {
        console.log(data);
        this.DataPermisosRol = data;
        for (const key of this.DataPermisosRol) {
          this.DataJsonPermisosRol.push({
            'id': key.id_permiso,
            'nombre': key.nombre_permiso
          });
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


  LoadPermisos(idAplicacion) {
    console.log(idAplicacion);
    if (idAplicacion !== null) {

      this.asignarpermisosrolService.getPermisos(idAplicacion).subscribe(
        data => {
          console.log(data);
          this.arrayPrincipal = [];
          this.DataPermisos = [];
          this.DataArrayPermisos = data;
          let tipo;
          let checked;
          for (const key of this.DataArrayPermisos) {
            if (key.orden_submenu !== 0 && key.orden_accion === 0) {
              tipo = 1;
            } else if (key.orden_submenu !== 0 && key.orden_accion !== 0) {
              tipo = 2;
            }
            const existe = this.DataJsonPermisosRol.filter(x => x.id === key.id);
            if (existe.length >= 1) {
              checked = true;
              for (const key2 of existe) {
                this.onChange(key2, true);
              }
            } else {
              checked = false;
            }
            this.DataPermisos.push({
              'estado': key.estado,
              'id': key.id,
              'nombre': key.nombre,
              'orden_accion': key.orden_accion,
              'id_aplicacion': key.id_aplicacion,
              'orden_submenu': key.orden_submenu,
              'tipo': tipo,
              'checked': checked
            });

          }
          this.arrayPrincipal = this.DataPermisos;

          console.log(this.DataPermisos);
        }
      );

    }
  }


  onChangeAll(data, isChecked: boolean) {
    this.TodoPermisos = isChecked;
    for (let i = 0; i < data.length; i++) {
      data.checked = isChecked;
      this.onChange(data[i], isChecked);
    }
  }

  onChange(data, isChecked) {
    if (isChecked === true) {
      const existe = this.DataJsonPermisosRol.filter(x => parseInt(x.id, 0) === parseInt(data.id, 0));
      if (existe.length === 0) {
        this.DataJsonPermisosRol.push(
          {
            'id': data.id,
            'nombre': data.nombre
          });
      }
    } else {
      for (let i = 0; i < this.DataJsonPermisosRol.length; i++) {
        let index;
        if (parseInt(data.id, 0) === parseInt(this.DataJsonPermisosRol[i].id, 0) && isChecked === false) {
          index = this.DataJsonPermisosRol.indexOf(this.DataJsonPermisosRol[i]);
          this.DataJsonPermisosRol.splice(index, 1);
        }
      }
    }
    for (let i = 0; i < this.DataPermisos.length; i++) {
      if (data.id === this.DataPermisos[i].id) {
        this.DataPermisos[i].checked = isChecked;
      }
    }
    console.log(this.DataJsonPermisosRol);
  }

  onSubmit(datosRol) {
    const permisos = {
      permiso: []
    };

    console.log(this.DataJsonPermisosRol);
    for (const key of this.DataJsonPermisosRol) {
      permisos.permiso.push(
        {
          'id_rol': this.idRol,
          'id_permiso': key.id
        });
    }
    Swal.fire({
      title: 'Permisos del Rol',
      text: 'Porfavor espera mientras se realiza la solicitud',
      type: 'info',
      showCancelButton: false,
      showConfirmButton: false
    });
    this.asignarpermisosrolService.updatePermisosRol(permisos.permiso, this.idRol).subscribe(
      res => {
      if (res.text() === 'success') {
          this.router.navigate(['/configuraciones/roles']);
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
    },
    );
  }

  /* LimpiarFormRoles() {
    this.rolesApliForm.reset();
    this.TodoPermisos = false;
    this.ListaPermisosSel = [];
    this.DataPermisos = [];
  } */


}
