import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CONFIGURACIONES_ROUTES } from './router';

//DEPENDENCIAS
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';

//COMPONENTES
import { ClientesComponent } from './clientes/clientes.component';
import { IngresarclientesComponent } from './ingresarclientes/ingresarclientes.component';
import { ModificarclientesComponent } from './modificarclientes/modificarclientes.component';
import { ConfigurarclienteComponent } from './configurarcliente/configurarcliente.component';
import { ClientesinactivosComponent } from './clientesinactivos/clientesinactivos.component';
import { ClientespendientesaprobarComponent } from './clientespendientesaprobar/clientespendientesaprobar.component';
import { PuntosComponent } from './puntos/puntos.component';
import { ConfigurarpuntoComponent } from './configurarpunto/configurarpunto.component';
import { IngresarpuntosComponent } from './ingresarpuntos/ingresarpuntos.component';
import { PuntosinactivosComponent } from './puntosinactivos/puntosinactivos.component';
import { PuntoconfiggeneralComponent } from './puntoconfiggeneral/puntoconfiggeneral.component';
import { ModificarpuntosComponent } from './modificarpuntos/modificarpuntos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcasinactivasComponent } from './marcasinactivas/marcasinactivas.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { AgrupamientoComponent } from './agrupamiento/agrupamiento.component';
import { RolesComponent } from './roles/roles.component';
import { AsignarpermisosrolComponent } from './asignarpermisosrol/asignarpermisosrol.component';
import { RolesinactivosComponent } from './rolesinactivos/rolesinactivos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosinactivosComponent } from './usuariosinactivos/usuariosinactivos.component';
import { GruposcorporativosComponent } from './gruposcorporativos/gruposcorporativos.component';
import { GruposcorporativosinactivosComponent } from './gruposcorporativosinactivos/gruposcorporativosinactivos.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';
import { ImpuestosinactivosComponent } from './impuestosinactivos/impuestosinactivos.component';



//PIPES
import { ClientesPipe } from './clientes/clientes.pipe';
import { AplicacionesnewclientePipe } from './ingresarclientes/aplicacionesnewcliente.pipe';
import { CanalesclientePipe } from './ingresarclientes/canalescliente.pipe';
import { ClienteimpuestoPipe } from './ingresarclientes/clienteimpuesto.pipe';
import { ClienteimpuestocanalPipe } from './ingresarclientes/clienteimpuestocanal.pipe';

import { ModalaplicacionesnewclientePipe } from './ingresarclientes/modalaplicacionesnewcliente.pipe';
import { ModalmensajeingclientePipe  } from './ingresarclientes/modalmensajeingcliente.pipe';
import { ModaltarifasingclientePipe } from './ingresarclientes/modaltarifasingcliente.pipe';
import { TablemarcasingcliPipe } from './ingresarclientes/tablemarcasingcli.pipe';
import { AplicacioneseditclientePipe } from './modificarclientes/aplicacioneseditcliente.pipe';
import { ModalaplicacioneseditclientePipe } from './modificarclientes/modalaplicacioneseditcliente.pipe';
import { TablemarcaseditcliPipe } from './modificarclientes/tablemarcaseditcli.pipe';
import { EditcanalesclientePipe } from './configurarcliente/editcanalescliente.pipe';
import { EditclientecanalPipe } from './configurarcliente/editclientecanal.pipe';
import { EditclienteimpuestoPipe } from './configurarcliente/editclienteimpuesto.pipe';
import { EditclienteimpuestocanalPipe } from './configurarcliente/editclienteimpuestocanal.pipe';
import { ModalmensajeeditclientePipe } from './configurarcliente/modalmensajeeditcliente.pipe';
import { ModaltarifaseditclientePipe } from './configurarcliente/modaltarifaseditcliente.pipe';
import { ClientesinactivosPipe } from './clientesinactivos/clientesinactivos.pipe';
import { ClientespendientesaprobarPipe } from './clientespendientesaprobar/clientespendientesaprobar.pipe';
import { PuntosPipe } from './puntos/puntos.pipe';
import { BodegaslicenciaeditpuntoPipe } from './configurarpunto/bodegaslicenciaeditpunto.pipe';
import { EditbodegaspuntosPipe } from './configurarpunto/editbodegaspuntos.pipe';
import { EditconfigingresarpuntosPipe } from './configurarpunto/editconfigingresarpuntos.pipe';
import { EditresolucionespuntosPipe } from './configurarpunto/editresolucionespuntos.pipe';
import { HoraseditpuntosPipe } from './configurarpunto/horaseditpuntos.pipe';
import { LicenciasconfpunPipe } from './configurarpunto/licenciasconfpun.pipe';
import { LicenciasinaconfpunPipe } from './configurarpunto/licenciasinaconfpun.pipe';
import { EditconfiguracionespuntosPipe } from './configurarpunto/editconfiguracionespuntos.pipe';
import { LicenciaspuntosPipe } from './ingresarpuntos/licenciaspuntos.pipe';
import { PuntosinactivosPipe } from './puntosinactivos/puntosinactivos.pipe';
import { EditmarcaspuntosPipe } from './modificarpuntos/editmarcaspuntos.pipe';
import { LicenciasinactivaseditpunPipe } from './modificarpuntos/licenciasinactivaseditpun.pipe';
import { MarcasPipe } from './marcas/marcas.pipe';
import { MarcasinactivosPipe } from './marcasinactivas/marcasinactivas.pipe';
import { LicenciaseditpunPipe } from './modificarpuntos/licenciaseditpun.pipe';
import { AplicacionesPipe } from './aplicaciones/aplicaciones.pipe';
import { AgrupamientoPipe } from './agrupamiento/agrupamiento.pipe';
import { ModalpuntosagrupPipe } from './agrupamiento/modalpuntosagrup.pipe';
import { PermisosPipe } from './roles/permisos.pipe';
import { RolesPipe } from './roles/roles.pipe';
import { AsignarpermisosrolPipe } from './asignarpermisosrol/asignarpermisosrol.pipe';
import { RolesinactivosPipe } from './rolesinactivos/rolesinactivos.pipe';
import { ModalclientesusuarioPipe } from './usuarios/modalclientesusuario.pipe';
import { ModalpuntosusuarioPipe } from './usuarios/modalpuntosusuario.pipe';
import { UsuariosPipe } from './usuarios/usuarios.pipe';
import { UsuariosinactivosPipe } from './usuariosinactivos/usuariosinactivos.pipe';
import { ClientescorporativosPipe } from './gruposcorporativos/clientescorporativos.pipe';
import { GruposcorporativosPipe } from './gruposcorporativos/gruposcorporativos.pipe';
import { GruposcorporativosinactivosPipe } from './gruposcorporativosinactivos/gruposcorporativosinactivos.pipe';
import { ImpuestosPipe } from './impuestos/impuestos.pipe';
import { TarifasimpuestosPipe } from './impuestos/tarifasimpuestos.pipe';
import { ImpuestosinactivosPipe } from './impuestosinactivos/impuestosinactivos.pipe';
import { ClientemensajePipe } from './configurarcliente/clientemensaje.pipe';
import { EditlicenciaspuntosPipe } from './configurarpunto/editlicenciaspuntos.pipe';
import { PuntoconfiggeneralPipe } from './puntoconfiggeneral/puntoconfiggeneral.pipe';
import { ClientecanalPipe } from './ingresarclientes/clientecanal.pipe';




@NgModule({
  declarations: [
    ClientesComponent,
    IngresarclientesComponent,
    ModificarclientesComponent,
    ConfigurarclienteComponent,
    ClientesinactivosComponent,
    ClientespendientesaprobarComponent,
    PuntosComponent,
    ConfigurarpuntoComponent,
    IngresarpuntosComponent,
    PuntosinactivosComponent,
    PuntoconfiggeneralComponent,
    ModificarpuntosComponent,
    MarcasComponent,
    MarcasinactivasComponent,
    AplicacionesComponent,
    AgrupamientoComponent,
    RolesComponent,
    AsignarpermisosrolComponent,
    RolesinactivosComponent,
    UsuariosComponent,
    UsuariosinactivosComponent,
    GruposcorporativosComponent,
    GruposcorporativosinactivosComponent,
    ImpuestosComponent,
    ImpuestosinactivosComponent,

    ClientesPipe,
    AplicacionesnewclientePipe,
    CanalesclientePipe,
    ClienteimpuestoPipe,
    ClienteimpuestocanalPipe,
    ClientemensajePipe,
    ModalaplicacionesnewclientePipe,
    ModalmensajeingclientePipe,
    ModaltarifasingclientePipe,
    TablemarcasingcliPipe,
    AplicacioneseditclientePipe,
    ModalaplicacioneseditclientePipe,
    TablemarcaseditcliPipe,
    EditcanalesclientePipe,
    EditclientecanalPipe,
    EditclienteimpuestoPipe,
    EditclienteimpuestocanalPipe,
    ModalmensajeeditclientePipe,
    ModaltarifaseditclientePipe,
    ClientesinactivosPipe,
    ClientespendientesaprobarPipe,
    PuntosPipe,
    BodegaslicenciaeditpuntoPipe,
    EditbodegaspuntosPipe,
    EditconfigingresarpuntosPipe,
    EditconfigingresarpuntosPipe,
    EditconfigingresarpuntosPipe,
    EditresolucionespuntosPipe,
    HoraseditpuntosPipe,
    LicenciasconfpunPipe,
    LicenciasinaconfpunPipe,
    EditconfiguracionespuntosPipe,
    LicenciaspuntosPipe,
    PuntosinactivosPipe,
    EditmarcaspuntosPipe,
    LicenciasconfpunPipe,
    LicenciaseditpunPipe,
    LicenciasinactivaseditpunPipe,
    MarcasPipe,
    MarcasinactivosPipe,
    AplicacionesPipe,
    AgrupamientoPipe,
    ModalpuntosagrupPipe,
    PermisosPipe,
    RolesPipe,
    AsignarpermisosrolPipe,
    RolesinactivosPipe,
    ModalclientesusuarioPipe,
    ModalpuntosusuarioPipe,
    UsuariosPipe,
    UsuariosinactivosPipe,
    ClientescorporativosPipe,
    GruposcorporativosPipe,
    GruposcorporativosinactivosPipe,
    ImpuestosPipe,
    TarifasimpuestosPipe,
    ImpuestosinactivosPipe,
    EditlicenciaspuntosPipe,
    PuntoconfiggeneralPipe,
    ClientecanalPipe
    

  ],

  imports: [
    CommonModule,
    NgxPaginationModule,
    ArchwizardModule,
    MyDatePickerModule,
    FormsModule,
    CONFIGURACIONES_ROUTES,
  ]
})
export class ConfiguracionesModule { }
