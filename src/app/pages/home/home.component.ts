import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';


// Rutas de servicios
import {HomeService} from './home.service';
import {DashboardService} from '../../services/dashboard.service';

declare const $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchStringCli: any;
  itempageCli = 10;
  DataArrayClientes: any = [];
  DataJsonClientes: any = [];
  DataCliente: any = [];
  rol: any;
  DataArrayUsuarios: any = [];
  token: any;
  datosToken: any;
  privateIP: any;
  cli: any;
  id_rol: any;
  is: any;
  usuario: any;
  idUsuario: any;
  DataNewUser: any = [];
  DataArrayPermisos: any = [];
  tieneClientesAsignados: Boolean;

  @ViewChild('UsuarioForm', {static: true})
  private UsuarioForm: NgForm;

  constructor(public router: Router, private route: ActivatedRoute,
              public homeService: HomeService,
              public dashboardService: DashboardService,
              public toastr: ToastrService) {
    this.privateIP = sessionStorage.getItem('IpLocal');
    this.id_rol = localStorage.getItem('id_rol');
    this.is = localStorage.getItem('is');
    this.usuario = localStorage.getItem('user');
    this.idUsuario = localStorage.getItem('idU');
    this.DataNewUser.nombre = this.usuario;
    this.DataNewUser.idUsuario = this.idUsuario;

  }

  ngOnInit() {
    this.rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['']);
    } else {
      this.consultarPermisos();
    }
  }


  consultarPermisos() {
    console.log('consulta permisos');
    this.dashboardService.getPermisos(this.id_rol).subscribe(
      data => {
        console.log('Que llega data', data);
        this.DataArrayPermisos = data;

        const existe = this.DataArrayPermisos.filter(x => parseInt(x.id_permiso, 0) === 292);
        console.log('que llega permisos', existe);
        if (existe.length >= 1) {
          this.LoadClientesUsuario();
          $('#ClienteModal').modal({backdrop: 'static'});
        } else {
          if (this.id_rol !== '1' && this.is === 'false') {
            console.log('entro el modal');
            $('#CambioClaveModal').modal({backdrop: 'static'});
          } else {
            this.router.navigate(['dashboard']);
          }
        }
      }
    );
  }


  LoadClientesUsuario() {
    this.homeService.getClientesUsuario(this.idUsuario).subscribe(
      data => {
        this.DataArrayClientes = data;
        console.log(this.DataArrayClientes);

        if (this.DataArrayClientes.length === 0) {
          this.tieneClientesAsignados = false;
        } else {
          this.tieneClientesAsignados = true;
        }
      }
    );
  }

  clickFila(idCliente) {
    this.DataCliente.idCliente = idCliente.toString();
    this.homeService.getUsuarioCliente(this.DataCliente.idCliente).subscribe(
      data => {
        this.DataArrayUsuarios = data[0];
        this.VerificarConfiguraciones(this.DataArrayUsuarios.usuario, this.DataArrayUsuarios.clave);
      }
    );
  }


  VerificarConfiguraciones(username, password) {
    this.homeService.postLogin(username, password, this.privateIP).subscribe(
      data => {
        this.token = data.text();
        if (this.token === 'usuario o clave incorrecta') {
          this.toastr.error('Error! Usuario o  Contraseña  Incorrectos, verifique e intente nuevamente ');
        } else if (this.token === 'El usuario esta desctivado') {
          this.toastr.error('Error! El usuario esta desactivado');
        } else {
          this.homeService.decodeToken(this.token).subscribe(
            data2 => {
              $('#ClienteModal').modal('hide');
              this.router.navigate(['dashboard']);
              this.datosToken = data2;

              localStorage.setItem('tokenCliente', this.token);
              localStorage.setItem('user_email', this.datosToken.user_email);
              localStorage.setItem('creadoPor', this.datosToken.creadoPor);
              localStorage.setItem('cli', this.datosToken.idCliente);
              localStorage.setItem('logConf', '1');

            }
          );
        }
      }
    );
  }

  CerrarSession() {
    console.log(this.DataArrayUsuarios.usuario);
    this.dashboardService.logout(this.DataArrayUsuarios.usuario).subscribe(
      data => {
      });
  }

  CambiarClave(datosUsuario) {
    if (datosUsuario.claveNew === datosUsuario.confirmacion) {
      this.homeService.updateClavesesion(datosUsuario.idUsuario, datosUsuario.claveAnt, datosUsuario.claveNew).subscribe(
        data => {
          if (data.text() === 'Clave Modificada con exito') {
            this.toastr.success('Exitoso! La clave fue modificada con exito');
          } else if (data.text() === 'no existe el usuario') {
            this.toastr.error('Error! Error validando el usuario');
          } else {
            this.toastr.error('Error! La clave no se puedo modificar con exito');
          }
        });
    } else {
      this.toastr.warning('Verificar! Las claves no son iguales');
    }
    this.router.navigate(['dashboard']);
  }

}
