import { Routes, RouterModule } from '@angular/router';
import { ClientecomensalComponent } from './clientecomensal/clientecomensal.component';
import { ClientecomensalinactivosComponent } from './clientecomensalinactivos/clientecomensalinactivos.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { TablaconversionComponent } from './tablaconversion/tablaconversion.component';
import { ClientedomicilioComponent } from './clientedomicilio/clientedomicilio.component';
import { ClientedomicilioinactivosComponent } from './clientedomicilioinactivos/clientedomicilioinactivos.component';
import { AsignarproductosComponent } from './asignarproductos/asignarproductos.component';
import { ProcesosespComponent } from './procesosesp/procesosesp.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { IngresartransaccionesComponent } from './ingresartransacciones/ingresartransacciones.component';
import { TransaccionesinactivasComponent } from './transaccionesinactivas/transaccionesinactivas.component';
import { ModificartransaccionComponent } from './modificartransaccion/modificartransaccion.component';
import { CostosestimadosComponent } from './costosestimados/costosestimados.component';
import { GruposformaspagoComponent } from './gruposformaspago/gruposformaspago.component';
import { GruposformaspagoinactivasComponent } from './gruposformaspagoinactivas/gruposformaspagoinactivas.component';
import { FormaspagoComponent } from './formaspago/formaspago.component';
import { IngresarformapagoComponent } from './ingresarformapago/ingresarformapago.component';
import { ModificarformapagoComponent } from './modificarformapago/modificarformapago.component';
import { FormaspagoinactivasComponent } from './formaspagoinactivas/formaspagoinactivas.component';

const pagesRoutes: Routes = [
  // COSTOS ESTIMADOS
  { path: 'costosestimados', component: CostosestimadosComponent, data: { breadcrumb: 'Costos estimados' } },

  // GRUPOS FORMAS DE PAGO
  {
    path: 'gruposformaspago', data: { breadcrumb: 'Grupos formas pago' },
    children: [
      { path: '', component: GruposformaspagoComponent },
      {
        path: 'gruposformaspagoinactivas',
        component: GruposformaspagoinactivasComponent,
        data: { breadcrumb: 'Grupos formas pago inactivos' }
      },
      {
        path: 'formaspago', data: { skipBreadcrumb: true },
        children: [
          {
            path: ':idGrupoFP', data: { breadcrumb: 'Formas pago' },
            children: [
              { path: '', component: FormaspagoComponent },
              {
                path: 'ingresarformapago/:idGrupoFP/:nombreGrupoFP',
                component: IngresarformapagoComponent,
                data: { breadcrumb: 'Crear forma pago' }
              },
              {
                path: 'modificarformapago/:idFormaPago/:nombreFormaPago/:idGrupoFP/:nombreGrupoFP',
                component: ModificarformapagoComponent,
                data: { breadcrumb: 'Modificar forma pago' }
              },
              {
                path: 'formaspagoinactivas/:idGrupoFP/:nombreGrupoFP',
                component: FormaspagoinactivasComponent,
                data: { breadcrumb: 'Formas pago inactivas' }
              },
            ]
          },
        ]
      },
    ]
  },

  // TRANSACCIONES
  {
    path: 'transacciones', data: { breadcrumb: 'Transacciones' },
    children: [
      { path: '', component: TransaccionesComponent },
      { path: 'ingresartransacciones', component: IngresartransaccionesComponent, data: { breadcrumb: 'Crear transacción' } },
      { path: 'transaccionesinactivas', component: TransaccionesinactivasComponent, data: { breadcrumb: 'Transacciones inactivas' } },
      {
        path: 'modificartransaccion/:idTransaccion',
        component: ModificartransaccionComponent,
        data: { breadcrumb: 'Modificar transacción' }
      },
    ]
  },

  // ASIGNAR PRODUCTOS
  { path: 'asignarproductos', component: AsignarproductosComponent, data: { breadcrumb: 'Asignar productos' } },
  // PROCESOSESP
  { path: 'procesosesp', component: ProcesosespComponent, data: { breadcrumb: 'Procesos especiales' } },

  // CLIENTE DOMICILIO
  {
    path: 'clientedomicilio', data: { breadcrumb: 'Clientes domicilio' },
    children: [
      { path: '', component: ClientedomicilioComponent },
      {
        path: 'clientedomicilioinactivos',
        component: ClientedomicilioinactivosComponent,
        data: { breadcrumb: 'Clientes domicilio inactivos' }
      }
    ]
  },


  // UNIDADES
  {
    path: 'unidades', data: { breadcrumb: 'Unidades' },
    children: [
      { path: '', component: UnidadesComponent },
      { path: 'tablaconversion/:idUnidad/:nombreUnidad', component: TablaconversionComponent, data: { breadcrumb: 'Tabla de conversión' } }
    ]
  },

  // CLIENTE COMENSAL
  {
    path: 'clientecomensal', data: { breadcrumb: 'Clientes' },
    children: [
      { path: '', component: ClientecomensalComponent },
      { path: 'clientecomensalinactivos', component: ClientecomensalinactivosComponent, data: { breadcrumb: 'Clientes inactivos' } }
    ]
  },
];


export const CONFIGURACIONES3_ROUTES = RouterModule.forChild(pagesRoutes);

