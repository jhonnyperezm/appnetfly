import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {LoginService} from './login.service';
import { RutasService } from '../services/rutas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, RutasService]
})
export class LoginComponent  {

  token: any;
  DatosLogin: any;
  datosToken: any;
  app: any;
  datosTokenSec: any;
  privateIP: any;
  DataNewUser: any = [];
  LoadingIndicator = true;


  @ViewChild('UsuarioForm', {static: true})
  private UsuarioForm: NgForm;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
    public toastr: ToastrService) {
    this.privateIP = sessionStorage.getItem('IpLocal');
    const close = localStorage.getItem('close');

  }


  refresh() {
    this.router.navigate(['']);
  }


  LoginUser(e) {

    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    this.loginService.postLoginCartera(username, password).subscribe(
      data => {
        this.token = data.text();
        if (this.token !== '') {
          this.VerificarCartera(this.token);
        } else {
          this.VerificarConfiguraciones(username, password);
        }
      }
    );
  }

  VerificarCartera(token) {
    this.loginService.decodeTokenCi(token).subscribe(
      data => {
        this.datosToken = data;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenCliente', token);
        localStorage.setItem('user_email', this.datosToken.user_email);
        localStorage.setItem('user', this.datosToken.user);
        localStorage.setItem('rol', this.datosToken.rol);
        localStorage.setItem('id_rol', this.datosToken.id_rol);
        localStorage.setItem('creadoPor', this.datosToken.creadoPor);
        localStorage.setItem('cli', this.datosToken.idClienteConf);
        localStorage.setItem('logConf', '0');
        localStorage.setItem('menuConf', '0');
        this.router.navigate(['home']);
      }
    );
  }

  VerificarConfiguraciones(username, password) {
    this.loginService.postLogin(username, password, this.privateIP).subscribe(
      data => {
        this.token = data.text();
        console.log(this.token);
        if (this.token === 'usuario o clave incorrecta') {
          this.toastr.error('Error! Usuario o  Contraseña  Incorrectos, verifique e intente nuevamente ');
        } else if (this.token === 'El usuario esta desctivado') {
          this.toastr.error('Error! El usuario esta desactivado');
        } else {
          this.loginService.decodeToken(this.token).subscribe(
            data2 => {
              console.log(data2);
              this.datosToken = data2;
              this.datosTokenSec = data2;
              localStorage.setItem('token', this.token);
              localStorage.setItem('tokenCliente', this.token);
              localStorage.setItem('user_email', this.datosToken.user_email);
              localStorage.setItem('user', this.datosToken.user);
              localStorage.setItem('rol', this.datosToken.rol);
              localStorage.setItem('id_rol', this.datosToken.id_rol);
              localStorage.setItem('creadoPor', this.datosToken.creadoPor);
              localStorage.setItem('cli', this.datosToken.idCliente);
              localStorage.setItem('idU', this.datosToken.idUsuario);
              localStorage.setItem('logConf', '1');
              localStorage.setItem('close', '1');
              localStorage.setItem('is', this.datosToken.inicioSesion);
              localStorage.setItem('un', this.datosToken.nombre);

              this.router.navigate(['home']);
            }
          );
        }

      }
    );
  }

  CambiarClave(DatosUsuario) {
    console.log(DatosUsuario);
    this.loginService.updateClave(DatosUsuario).subscribe(
      data => {
        console.log(data);
        if (data.text() === 'no se pudo enviar el correo') {
          this.toastr.error('Error! Ocurrio un error enviando el correo, comuniquese con el administrador ');
        } else {
          this.toastr.success('Exitoso! Se ha enviado un mensaje al correo registrado');
        }
      });

  }

  LimpiarFormUsuarios() {
    this.UsuarioForm.reset();
  }

}
