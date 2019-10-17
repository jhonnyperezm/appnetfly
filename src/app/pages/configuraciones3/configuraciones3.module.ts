import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONFIGURACIONES3_ROUTES } from './router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientecomensalPipe } from './clientecomensal/clientecomensal.pipe';
import { ClientecomensalComponent } from './clientecomensal/clientecomensal.component';
import { ClientecomensalinactivosPipe } from './clientecomensalinactivos/clientecomensalinactivos.pipe';
import { ClientecomensalinactivosComponent } from './clientecomensalinactivos/clientecomensalinactivos.component';
import { FormsModule } from '@angular/forms';
import { UnidadesPipe } from './unidades/unidades.pipe';
import { TablaconversionPipe } from './tablaconversion/tablaconversion.pipe';
import { TablaconversionComponent } from './tablaconversion/tablaconversion.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { ClientedomicilioComponent } from './clientedomicilio/clientedomicilio.component';
import { ClientedomicilioinactivosComponent } from './clientedomicilioinactivos/clientedomicilioinactivos.component';
import { ClientedomicilioPipe } from './clientedomicilio/clientedomicilio.pipe';
import { ClientedomicilioinactivosPipe } from './clientedomicilioinactivos/clientedomicilioinactivos.pipe';
import { AsignarproductosComponent } from './asignarproductos/asignarproductos.component';
import { ProcesosespComponent } from './procesosesp/procesosesp.component';
import { ModalclasesapPipe } from './asignarproductos/modalclasesap.pipe';
import { ValidacionartPipe } from './procesosesp/validacionart.pipe';
import { TablaclasesapPipe } from './asignarproductos/tablaclasesap.pipe';
import { TablagruposapPipe } from './asignarproductos/tablagruposap.pipe';
import { ModalpuntosapPipe } from './asignarproductos/modalpuntosap.pipe';
import { ModalpuntoscopiarapPipe } from './asignarproductos/modalpuntoscopiarap.pipe';
import { ModalgruposapPipe } from './asignarproductos/modalgruposap.pipe';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { TransaccionesinactivasComponent } from './transaccionesinactivas/transaccionesinactivas.component';
import { ModificartransaccionComponent } from './modificartransaccion/modificartransaccion.component';
import { IngresartransaccionesComponent } from './ingresartransacciones/ingresartransacciones.component';
import { TransaccionesPipe } from './transacciones/transacciones.pipe';
import { TransaccionesinactivasPipe } from './transaccionesinactivas/transaccionesinactivas.pipe';
import { ModificarformapagoComponent } from './modificarformapago/modificarformapago.component';
import { FormaspagoinactivasComponent } from './formaspagoinactivas/formaspagoinactivas.component';
import { FormaspagoComponent } from './formaspago/formaspago.component';
import { GruposformaspagoComponent } from './gruposformaspago/gruposformaspago.component';
import { GruposformaspagoinactivasComponent } from './gruposformaspagoinactivas/gruposformaspagoinactivas.component';
import { IngresarformapagoComponent } from './ingresarformapago/ingresarformapago.component';
import { CostosestimadosComponent } from './costosestimados/costosestimados.component';
import { FormaspagoPipe } from './formaspago/formaspago.pipe';
import { GruposformaspagoPipe } from './gruposformaspago/gruposformaspago.pipe';
import { GruposformaspagoinactivasPipe } from './gruposformaspagoinactivas/gruposformaspagoinactivas.pipe';
import { CostosestimadosPipe } from './costosestimados/costosestimados.pipe';
import { ModalclasescostosPipe } from './costosestimados/modalclasescostos.pipe';
import { ModalgruposcostosPipe } from './costosestimados/modalgruposcostos.pipe';
import { FormaspagoinactivasPipe } from './formaspagoinactivas/formaspagoinactivas.pipe';
import { ModificartransaccionPipe } from './modificartransaccion/modificartransaccion.pipe';






@NgModule({
  declarations: [
    ClientecomensalPipe,
    ClientecomensalinactivosPipe,
    ClientecomensalinactivosComponent,
    ClientecomensalComponent,
    UnidadesPipe,
    TablaconversionPipe,
    UnidadesComponent,
    TablaconversionComponent,
    ClientedomicilioComponent,
    ClientedomicilioinactivosComponent,
    ClientedomicilioPipe,
    ClientedomicilioinactivosPipe,
    ProcesosespComponent,
    AsignarproductosComponent,
    ValidacionartPipe,
    TablaclasesapPipe,
    TablagruposapPipe,
    ModalpuntosapPipe,
    ModalpuntoscopiarapPipe,
    ModalclasesapPipe,
    ModalgruposapPipe,
    TransaccionesComponent,
    TransaccionesinactivasComponent,
    ModificartransaccionComponent,
    IngresartransaccionesComponent,
    TransaccionesPipe,
    TransaccionesinactivasPipe,
    ModificarformapagoComponent,
    FormaspagoinactivasComponent,
    FormaspagoComponent,
    GruposformaspagoComponent,
    GruposformaspagoinactivasComponent,
    IngresarformapagoComponent,
    CostosestimadosComponent,
    FormaspagoPipe,
    GruposformaspagoPipe,
    GruposformaspagoinactivasPipe,
    CostosestimadosPipe,
    ModalclasescostosPipe,
    ModalgruposcostosPipe,
    FormaspagoinactivasPipe,
    ModificartransaccionPipe,
  

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    CONFIGURACIONES3_ROUTES
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Configuraciones3Module { }
