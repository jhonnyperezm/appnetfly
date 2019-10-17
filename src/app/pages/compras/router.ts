import {Routes, RouterModule} from '@angular/router';

// COMPONENTES
import {CompraComponent} from './compra/compra.component';
import {DevolucionesComponent} from './devoluciones/devoluciones.component';
import {IngresarcompraComponent} from './ingresarcompra/ingresarcompra.component';
import {IngresarordencompraComponent} from './ingresarordencompra/ingresarordencompra.component';
import {ProveedoresComponent} from './proveedores/proveedores.component';
import {IngresarproveedorComponent} from './ingresarproveedor/ingresarproveedor.component';
import {ProveedoresinactivosComponent} from './proveedoresinactivos/proveedoresinactivos.component';
import {ModificarproveedorComponent} from './modificarproveedor/modificarproveedor.component';
import {OrdencompraComponent} from './ordencompra/ordencompra.component';
import {ModificarordencompraComponent} from './modificarordencompra/modificarordencompra.component';
import {OrdencompracerradasComponent} from './ordencompracerradas/ordencompracerradas.component';
import {ModificarcompraComponent} from './modificarcompra/modificarcompra.component';
import {OrdencomprapendientesComponent} from './ordencomprapendientes/ordencomprapendientes.component';
import {ModificarordencomprapendienteComponent} from './modificarordencomprapendiente/modificarordencomprapendiente.component';
// GUARDS
import {IngresarproveedorcandeactiveguardService} from './ingresarproveedor/ingresarproveedorcandeactiveguard.service';
import {IngresarordencompracandeactiveguardService} from './ingresarordencompra/ingresarordencompracandeactiveguard.service';
import {IngresarcompracandeactiveguardService} from './ingresarcompra/ingresarcompracandeactiveguard.service';
import {PendientesComponent} from './pendientes/pendientes.component';
import {ModificarpendienteComponent} from './modificarpendiente/modificarpendiente.component';




const pagesRoutes: Routes = [

  // PROVEEDORERES
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'proveedores/ingresarproveedor', component: IngresarproveedorComponent, canDeactivate: [IngresarproveedorcandeactiveguardService]},
  {path: 'proveedores/proveedoresinactivos', component: ProveedoresinactivosComponent},
  {path: 'proveedores/modificarproveedor/:idProveedor/:nombreProveedor', component: ModificarproveedorComponent},
  // ORDEN DE COMPRA
  {path: 'ordencompra', component: OrdencompraComponent},
  {path: 'ordencompra/ingresarordencompra', component: IngresarordencompraComponent, canDeactivate: [IngresarordencompracandeactiveguardService]},
  {path: 'ordencompra/modificarordencompra/:idOrden/:idProveedor', component: ModificarordencompraComponent},
  {path: 'ordencompra/ordencompracerradas', component: OrdencompracerradasComponent},

  // COMPRAS
  {path: 'compra', component: CompraComponent},
  {path: 'compra/ingresarcompra', component: IngresarcompraComponent, canDeactivate: [IngresarcompracandeactiveguardService] },
  {path: 'compra/modificarcompra/:idCompra/:idProveedor', component: ModificarcompraComponent},
  {path: 'compra/ordencomprapendientes', component: OrdencomprapendientesComponent},
  {path: 'compra/ordencomprapendientes/modificarordencomprapendiente/:id/:idProveedor', component: ModificarordencomprapendienteComponent},
  // PENDIENTES
  {path: 'pendientes', component: PendientesComponent},
  {path: 'pendientes/modificarpendiente/:idPendiente/:idProveedor', component: ModificarpendienteComponent},
  // DEVOLUCIONES
  {path: 'devoluciones', component: DevolucionesComponent},

  {path: '', redirectTo: '/proveedores', pathMatch: 'full'}
];


export const COMPRAS_ROUTES = RouterModule.forChild(pagesRoutes);
