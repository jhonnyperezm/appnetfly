import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompraComponent} from './compra/compra.component';
import {COMPRAS_ROUTES} from './router';
import {DevolucionesComponent} from './devoluciones/devoluciones.component';
import {DevolucionesPipe} from './devoluciones/devoluciones.pipe';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { IngresarcompraComponent } from './ingresarcompra/ingresarcompra.component';
import {DevolucionesingcompraPipe} from './ingresarcompra/devolucionesingcompra.pipe';
import {IngresarcompraPipe} from './ingresarcompra/ingresarcompra.pipe';
import {ModalarticulosingcompraPipe} from './ingresarcompra/modalarticulosingcompra.pipe';
import {PendientesingcompraPipe} from './ingresarcompra/pendientesingcompra.pipe';
import {ProveedoresingcompraPipe} from './ingresarcompra/proveedoresingcompra.pipe';
import {ModalultcomprasingcompraPipe} from './ingresarcompra/modalultcomprasingcompra.pipe';
import {ModalpuntoscomPipe} from './compra/modalpuntoscom.pipe';
import {CompraPipe} from './compra/compra.pipe';
import {ArchwizardModule} from 'angular-archwizard';
import {MyDatePickerModule} from 'mydatepicker';
import { IngresarordencompraComponent } from './ingresarordencompra/ingresarordencompra.component';
import {ArticulosagregadosPipe} from './ingresarordencompra/articulosagregados.pipe';
import {ArticulosmodalPipe} from './ingresarordencompra/articulosmodal.pipe';
import {IngresarordencompraPipe} from './ingresarordencompra/ingresarordencompra.pipe';
import {ModalarticulosingocPipe} from './ingresarordencompra/modalarticulosingoc.pipe';
import {OrdencompraproveedorPipe} from './ingresarordencompra/ordencompraproveedor.pipe';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import {ProveedoresPipe} from './proveedores/proveedores.pipe';
import { IngresarproveedorComponent } from './ingresarproveedor/ingresarproveedor.component';
import {IngresarproveedorPipe} from './ingresarproveedor/ingresarproveedor.pipe';
import {ModalarticulosingproveedorPipe} from './ingresarproveedor/modalarticulosingproveedor.pipe';
import { ProveedoresinactivosComponent } from './proveedoresinactivos/proveedoresinactivos.component';
import {ProveedoresinactivosPipe} from './proveedoresinactivos/proveedoresinactivos.pipe';
import { ModificarproveedorComponent } from './modificarproveedor/modificarproveedor.component';
import {ModalarticuloseditproveedorPipe} from './modificarproveedor/modalarticuloseditproveedor.pipe';
import {ModificarproveedorPipe} from './modificarproveedor/modificarproveedor.pipe';
import { OrdencompraComponent } from './ordencompra/ordencompra.component';
import {OrdencompraPipe} from './ordencompra/ordencompra.pipe';
import { ModificarordencompraComponent } from './modificarordencompra/modificarordencompra.component';
import {EditordencompraarticulosagregadosPipe} from './modificarordencompra/editordencompraarticulosagregados.pipe';
import {EditordencompraarticulosfinalizadosPipe} from './modificarordencompra/editordencompraarticulosfinalizados.pipe';
import {EditordencompraproveedorPipe} from './modificarordencompra/editordencompraproveedor.pipe';
import {ModalarticuloseditocPipe} from './modificarordencompra/modalarticuloseditoc.pipe';
import {ModificarordencompraPipe} from './modificarordencompra/modificarordencompra.pipe';
import { OrdencompracerradasComponent } from './ordencompracerradas/ordencompracerradas.component';
import {ArticulosordencompracerradasPipe} from './ordencompracerradas/articulosordencompracerradas.pipe';
import {OrdencompracerradasPipe} from './ordencompracerradas/ordencompracerradas.pipe';
import { ModificarcompraComponent } from './modificarcompra/modificarcompra.component';
import {ArticulosagregadoseditcompraPipe} from './modificarcompra/articulosagregadoseditcompra.pipe';
import {ArticulosfineditcompraPipe} from './modificarcompra/articulosfineditcompra.pipe';
import {ModificarcompraPipe} from './modificarcompra/modificarcompra.pipe';
import {ProveedoreseditcompraPipe} from './modificarcompra/proveedoreseditcompra.pipe';
import { OrdencomprapendientesComponent } from './ordencomprapendientes/ordencomprapendientes.component';
import {OrdencomprapendientesPipe} from './ordencomprapendientes/ordencomprapendientes.pipe';
import { ModificarordencomprapendienteComponent } from './modificarordencomprapendiente/modificarordencomprapendiente.component';
import {ArticuloseditocpendientePipe} from './modificarordencomprapendiente/articuloseditocpendiente.pipe';
import {ArticulosfineditocpendientePipe} from './modificarordencomprapendiente/articulosfineditocpendiente.pipe';
import {PendienteseditocpendientePipe} from './modificarordencomprapendiente/pendienteseditocpendiente.pipe';
import {DevolucioneseditocpendientePipe} from './modificarordencomprapendiente/devolucioneseditocpendiente.pipe';
import {ModalarticuloseditocpendientePipe} from './modificarordencomprapendiente/modalarticuloseditocpendiente.pipe';
import { PendientesComponent } from './pendientes/pendientes.component';
import {PendientesPipe} from './pendientes/pendientes.pipe';
import { ModificarpendienteComponent } from './modificarpendiente/modificarpendiente.component';
import {ModificarpendientePipe} from './modificarpendiente/modificarpendiente.pipe';
import { ModificardevolucionComponent } from './modificardevolucion/modificardevolucion.component';
import {ModificardevolucionPipe} from './modificardevolucion/modificardevolucion.pipe';


@NgModule({
  declarations: [
    CompraComponent,
    DevolucionesComponent,
    DevolucionesPipe,
    IngresarcompraComponent,
    DevolucionesingcompraPipe,
    IngresarcompraPipe,
    ModalarticulosingcompraPipe,
    PendientesingcompraPipe,
    ProveedoresingcompraPipe,
    ModalultcomprasingcompraPipe,
    ModalpuntoscomPipe,
    CompraPipe,
    IngresarordencompraComponent,
    ArticulosagregadosPipe,
    ArticulosmodalPipe,
    IngresarordencompraPipe,
    ModalarticulosingocPipe,
    OrdencompraproveedorPipe,
    ProveedoresComponent,
    ProveedoresPipe,
    IngresarproveedorComponent,
    IngresarproveedorPipe,
    ModalarticulosingproveedorPipe,
    ProveedoresinactivosComponent,
    ProveedoresinactivosPipe,
    ModalarticuloseditproveedorPipe,
    ModificarproveedorComponent,
    ModificarproveedorPipe,
    OrdencompraComponent,
    OrdencompraPipe,
    ModificarordencompraComponent,
    EditordencompraarticulosagregadosPipe,
    EditordencompraarticulosfinalizadosPipe,
    EditordencompraproveedorPipe,
    ModalarticuloseditocPipe,
    ModificarordencompraPipe,
    OrdencompracerradasComponent,
    ArticulosordencompracerradasPipe,
    OrdencompracerradasPipe,
    ModificarcompraComponent,
    ArticulosagregadoseditcompraPipe,
    ArticulosfineditcompraPipe,
    ModificarcompraPipe,
    ProveedoreseditcompraPipe,
    OrdencomprapendientesComponent,
    OrdencomprapendientesPipe,
    ModificarordencomprapendienteComponent,
    ArticuloseditocpendientePipe,
    ArticulosfineditocpendientePipe,
    DevolucioneseditocpendientePipe,
    ModalarticuloseditocpendientePipe,
    PendienteseditocpendientePipe,
    PendientesComponent,
    PendientesPipe,
    ModificarpendienteComponent,
    ModificarpendientePipe,
    ModificardevolucionComponent,
    ModificardevolucionPipe
  ],
  imports: [
    CommonModule,
    COMPRAS_ROUTES,
    FormsModule,
    NgxPaginationModule,
    ArchwizardModule,
    MyDatePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComprasModule {
}
