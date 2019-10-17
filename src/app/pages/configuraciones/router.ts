import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { IngresarclientesComponent } from './ingresarclientes/ingresarclientes.component';
import { ModificarclientesComponent } from './modificarclientes/modificarclientes.component';
import { ConfigurarclienteComponent } from './configurarcliente/configurarcliente.component';
import { IngresarclientescandeactiveguardService } from './ingresarclientes/ingresarclientescandeactiveguard.service';
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





const pagesRoutes: Routes = [

    {
        path: '',
        children: [
          // CLIENTES
          {
            path: 'clientes', data: { breadcrumb: 'Clientes' },
            children: [
              { path: '', component: ClientesComponent },
              { path: 'ingresarclientes', component: IngresarclientesComponent, data: { breadcrumb: 'Crear cliente' }, canDeactivate: [IngresarclientescandeactiveguardService] },
              { path: 'modificarclientes/:idCliente', component: ModificarclientesComponent, data: { breadcrumb: 'Modificar cliente' } },
              { path: 'configurarclientes/:idCliente/:nombreCliente', component: ConfigurarclienteComponent, data: { breadcrumb: 'Configurar cliente' } },
              { path: 'clientesinactivos', component: ClientesinactivosComponent, data: { breadcrumb: 'Clientes inactivos' } },
              { path: 'clientespendientes', component: ClientespendientesaprobarComponent, data: { breadcrumb: 'Clientes pendientes por aprobar' } },
              {
                path: 'puntos', data: { skipBreadcrumb: true },
                children: [
                  {
                    path: ':idCliente', data: { breadcrumb: 'Puntos' },
                    children: [
                      { path: '', component: PuntosComponent },
                      { path: 'ingresarpuntos/:idCliente/:nombreCliente', component: IngresarpuntosComponent, data: { breadcrumb: 'Crear punto' } },
                      { path: 'puntosinactivos/:idCliente/:nombreCliente', component: PuntosinactivosComponent, data: { breadcrumb: 'Puntos inactivos' } },
                      { path: 'puntoconfgeneral/:idCliente/:nombreCliente', component: PuntoconfiggeneralComponent, data: { breadcrumb: 'Configuración general puntos' } },
                      { path: 'modificarpuntos/:idCliente/:nombreCliente/:idPunto/:nomPunto', component: ModificarpuntosComponent, data: { breadcrumb: 'Modificar punto' } },
                      { path: 'configurarpuntos/:idCliente/:nombreCliente/:idPunto/:nomPunto', component: ConfigurarpuntoComponent, data: { breadcrumb: 'Configurar punto' } }
                    ]
                  },
                ]
              },
            ]
          },

          // MARCAS
          {
            path: 'marcas', data: { breadcrumb: 'Marcas' },
            children: [
              { path: '', component: MarcasComponent },
              { path: 'marcasinactivas', component: MarcasinactivasComponent, data: { breadcrumb: 'Marcas inactivas' } }
            ]
          },

          // APLICACIONES
          { path: 'aplicaciones', component: AplicacionesComponent, data: { breadcrumb: 'Aplicaciones' } },

          // AGRUPAMIENTO
          { path: 'agrupamiento', component: AgrupamientoComponent, data: { breadcrumb: 'Agrupamiento' } },

          // ROLES
          {
            path: 'roles', data: { breadcrumb: 'Roles' },
            children: [
              { path: '', component: RolesComponent },
              { path: 'asignarpermisosrol/:idRol/:nombreRol', component: AsignarpermisosrolComponent, data: { breadcrumb: 'Asignar permisos rol' } },
              { path: 'rolesinactivos', component: RolesinactivosComponent, data: { breadcrumb: 'Roles inactivos' } }
            ]
          },

          // USUARIOS
          {
            path: 'usuarios', data: { breadcrumb: 'Usuarios' },
            children: [
              { path: '', component: UsuariosComponent },
              { path: 'usuariosinactivos', component: UsuariosinactivosComponent, data: { breadcrumb: 'Usuarios inactivos' } }
            ]
          },

          // GRUPOS CORPORATIVOS
          {
            path: 'gruposcorporativos', data: { breadcrumb: 'Grupos corporativos' },
            children: [
              { path: '', component: GruposcorporativosComponent },
              { path: 'gruposcorporativosinactivos', component: GruposcorporativosinactivosComponent, data: { breadcrumb: 'Grupos corporativos inactivos' } }
            ]
          },

          // IMPUESTOS
          {
            path: 'impuestos', data: { breadcrumb: 'Impuestos' },
            children: [
              { path: '', component: ImpuestosComponent },
              { path: 'impuestosinactivos', component: ImpuestosinactivosComponent, data: { breadcrumb: 'Impuestos inactivos' } }
            ]
          },

            // CLASES
            

    
        

      ]
    }
];

export const CONFIGURACIONES_ROUTES = RouterModule.forChild(pagesRoutes);
