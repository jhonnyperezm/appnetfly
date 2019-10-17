import { Routes, RouterModule } from '@angular/router';
import { ClasesComponent } from './clases/clases.component';
import { ClasesinactivasComponent } from './clasesinactivas/clasesinactivas.component';
import { GruposclasesComponent } from './gruposclases/gruposclases.component';
import { GruposclasesinactivosComponent } from './gruposclasesinactivos/gruposclasesinactivos.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticulosinactivosComponent } from './articulosinactivos/articulosinactivos.component';
import { IngresararticulosComponent } from './ingresararticulos/ingresararticulos.component';
import { IngresararticuloscandeactiveguardService } from './ingresararticulos/ingresararticuloscandeactiveguard.service';
import { ModificararticulosComponent } from './modificararticulos/modificararticulos.component';
import { CostosestimadosComponent } from './costosestimados/costosestimados.component';
import { GruposempaqueinactivosComponent } from './gruposempaqueinactivos/gruposempaqueinactivos.component';
import { GruposempaqueComponent } from './gruposempaque/gruposempaque.component';
import { BodegasinactivasComponent } from './bodegasinactivas/bodegasinactivas.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { ModificargruposeleccionComponent } from './modificargruposeleccion/modificargruposeleccion.component';
import { GruposseleccioninactivosComponent } from './gruposseleccioninactivos/gruposseleccioninactivos.component';
import { IngresargruposeleccionComponent } from './ingresargruposeleccion/ingresargruposeleccion.component';
import { GruposseleccionComponent } from './gruposseleccion/gruposseleccion.component';
import {ImpuestosventasComponent} from './impuestosventas/impuestosventas.component';
import {IngresarimpuestoventasComponent} from './ingresarimpuestoventas/ingresarimpuestoventas.component';
import {ModificarimpuestoventasComponent} from './modificarimpuestoventas/modificarimpuestoventas.component';
import {ImpuestosventasgruposComponent} from './impuestosventasgrupos/impuestosventasgrupos.component';
import {ListapreciosComponent} from './listaprecios/listaprecios.component';
import {ListapreciosinactivosComponent} from './listapreciosinactivos/listapreciosinactivos.component';
import {ListadescuentosComponent} from './listadescuentos/listadescuentos.component';
import {ListadescuentosinactivosComponent} from './listadescuentosinactivos/listadescuentosinactivos.component';
import {ModificararticuloslistapreciosComponent} from './modificararticuloslistaprecios/modificararticuloslistaprecios.component';
import {ImportarlistapreciosComponent} from './importarlistaprecios/importarlistaprecios.component';
import { ArticulosrecetaComponent } from './articulosreceta/articulosreceta.component';
import { ModificaringredientesComponent } from './modificaringredientes/modificaringredientes.component';
import { RecetasactivasComponent } from './recetasactivas/recetasactivas.component';
import { IngresarrecetaComponent } from './ingresarreceta/ingresarreceta.component';
import { RecetasinactivasComponent } from './recetasinactivas/recetasinactivas.component';
import { ModificarrecetaComponent } from './modificarreceta/modificarreceta.component';





const pagesRoutes: Routes = [

    {
        path: '',
        children: [


            {
                path: 'clases', data: { breadcrumb: 'Clases' },
                children: [
                { path: '', component: ClasesComponent },
                { path: 'clasesinactivas', component: ClasesinactivasComponent, data: { breadcrumb: 'Clases inactivas' } },
                {
                    path: 'gruposclases', data: { skipBreadcrumb: true },
                    children: [
                    {
                        path: ':idClase', data: { breadcrumb: 'Grupos' },
                        children: [
                        { path: '', component: GruposclasesComponent },
                        { path: 'gruposclasesinactivos/:idClase/:nombreClase', component: GruposclasesinactivosComponent, data: { breadcrumb: 'Grupos inactivos' } }

                        ]
                    },
                    ]
                },
                ]
            },

            // RECETAS
        {
            path: 'articulosreceta', data: { breadcrumb: 'Recetas' },
            children: [
            { path: '', component: ArticulosrecetaComponent },
            { path: 'modificaringredientes', component: ModificaringredientesComponent, data: { breadcrumb: 'Cambiar ingredientes' } },
              {
                path: 'recetasactivas', data: { skipBreadcrumb: true },
                children: [
                  {
                    path: ':idArticulo', data: { breadcrumb: 'Recetas Activas' },
                    children: [
                      { path: '', component: RecetasactivasComponent },
                      { path: 'ingresarreceta/:idArticulo/:nombreArticulo/:cantidadRecetas', component: IngresarrecetaComponent, data: { breadcrumb: 'Crear receta' } },
                      { path: 'recetasinactivas/:idArticulo/:nombreArticulo', component: RecetasinactivasComponent, data: { breadcrumb: 'Recetas inactivas' } },
                      { path: 'modificarreceta/:idArticulo/:nombreArticulo/:idReceta', component: ModificarrecetaComponent, data: { breadcrumb: 'Modificar receta' } }
                    ]
                  },
                ]
              },
            ]
          },

                // ARTICULOS
            {
            path: 'articulos', data: { breadcrumb: 'Articulos' },
            children: [
                { path: '', component: ArticulosComponent },
                { path: 'ingresararticulos', component: IngresararticulosComponent, canDeactivate: [IngresararticuloscandeactiveguardService], data: { breadcrumb: 'Crear articulo' } },
                { path: 'articulosinactivos', component: ArticulosinactivosComponent, data: { breadcrumb: 'Articulos inactivos' } },
                { path: 'modificararticulos/:idArticulo/:nombreArticulo/:modulo/:origen', component: ModificararticulosComponent, data: { breadcrumb: 'Modificar articulo' } }

            ]
            },
            // LISTA  DE PRECIOS
            {
            path: 'listaprecios', data: { breadcrumb: 'Listas de precios' },
            children: [
                { path: '', component: ListapreciosComponent },
                { path: 'listapreciosinactivos', component: ListapreciosinactivosComponent, data: { breadcrumb: 'Listas de precios inactivas' } },
                { path: 'listadescuentos', component: ListadescuentosComponent, data: { breadcrumb: 'Listas de descuento' } },
                { path: 'listadescuentosinactivos', component: ListadescuentosinactivosComponent, data: { breadcrumb: 'Listas de descuento inactivos' } },
                { path: 'modificararticuloslistaprecios/:idLista/:nombreLista', component: ModificararticuloslistapreciosComponent, data: { breadcrumb: 'Cambio de precio de venta' } },
                { path: 'importarlistaprecios/:idLista/:nombreLista', component: ImportarlistapreciosComponent, data: { breadcrumb: 'Importar lista de precios' } }
            ]
            },
            // IMPUESTOS VENTAS
            {
            path: 'impuestosventas', data: { breadcrumb: 'Impuestos ventas' },
            children: [
                { path: '', component: ImpuestosventasComponent },
                { path: 'ingresarimpuestoventas/:formaAsignacion', component: IngresarimpuestoventasComponent, data: { breadcrumb: 'Asignar impuesto ventas' } },
                { path: 'modificarimpuestoventa/:formaAsignacion/:idClase/:idGrupo', component: ModificarimpuestoventasComponent, data: { breadcrumb: 'Modificar impuestos ventas' } },
                {
                path: 'impuestosventasgrupos', data: { skipBreadcrumb: true },
                children: [
                    {
                    path: ':idClase', data: { breadcrumb: 'Impuestos ventas grupos' },
                    children: [
                        { path: '', component: ImpuestosventasgruposComponent },
                        { path: 'modificarimpuestoventa/:formaAsignacion/:idClase/:idGrupo', component: ModificarimpuestoventasComponent, data: { breadcrumb: 'Modificar impuesto ventas por grupo' } }
                    ]
                    }
                ]
                },
            ]
            },

            // GRUPOS SELECCION
            {
            path: 'gruposseleccion', data: { breadcrumb: 'Grupos selección' },
            children: [
            { path: '', component: GruposseleccionComponent },
            { path: 'ingresargruposeleccion', component: IngresargruposeleccionComponent, data: { breadcrumb: 'Crear grupo seleccion' } },
            { path: 'gruposseleccioninactivos', component: GruposseleccioninactivosComponent, data: { breadcrumb: 'Grupos selección inactivos' } },
            { path: 'modificargruposeleccion/:idGrupo/:nombreGrupo', component: ModificargruposeleccionComponent, data: { breadcrumb: 'Modificar grupo selección' } }
            ]
            },
            // SITIOS DE ALMACENAJE (BODEGAS)
            {
            path: 'bodegas', data: {breadcrumb: 'Sitios de Almacenaje'},
            children: [
            {path: '', component: BodegasComponent},
            {path: 'bodegasinactivas', component: BodegasinactivasComponent, data: {breadcrumb: 'Sitios de almacenaje inactivos'}}
            ]
            },
            // GRUPOS DE EMPAQUE
            {
            path: 'gruposempaque', data: {breadcrumb: 'Grupos de empaque'},
            children: [
            {path: '', component: GruposempaqueComponent},
            {path: 'gruposempaqueinactivos', component: GruposempaqueinactivosComponent, data: {breadcrumb: 'Grupos de empaque inactivos'}}
            ]
            },

            // COSTOS ESTIMADOS
            {path: 'costosestimados', component: CostosestimadosComponent, data: {breadcrumb: 'Costos estimados'}},

        ]
    }
]

export const CONFIGURACIONES2_ROUTES = RouterModule.forChild(pagesRoutes);