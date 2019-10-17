import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { CONFIGURACIONES2_ROUTES } from './router';


import { ClasesComponent } from './clases/clases.component';
import { ClasesinactivasComponent } from './clasesinactivas/clasesinactivas.component';
import { GruposclasesComponent } from './gruposclases/gruposclases.component';
import { GruposclasesinactivosComponent } from './gruposclasesinactivos/gruposclasesinactivos.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticulosinactivosComponent } from './articulosinactivos/articulosinactivos.component';
import { GruposseleccionComponent } from './gruposseleccion/gruposseleccion.component';
import { IngresargruposeleccionComponent } from './ingresargruposeleccion/ingresargruposeleccion.component';
import { GruposseleccioninactivosComponent } from './gruposseleccioninactivos/gruposseleccioninactivos.component';
import { ModificargruposeleccionComponent } from './modificargruposeleccion/modificargruposeleccion.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { BodegasinactivasComponent } from './bodegasinactivas/bodegasinactivas.component';
import { CostosestimadosComponent } from './costosestimados/costosestimados.component';
import { GruposempaqueinactivosComponent } from './gruposempaqueinactivos/gruposempaqueinactivos.component';
import { GruposempaqueComponent } from './gruposempaque/gruposempaque.component';
import { ImpuestosventasComponent } from './impuestosventas/impuestosventas.component';
import { IngresarimpuestoventasComponent } from './ingresarimpuestoventas/ingresarimpuestoventas.component';
import { ModificarimpuestoventasComponent } from './modificarimpuestoventas/modificarimpuestoventas.component';
import { ImpuestosventasgruposComponent } from './impuestosventasgrupos/impuestosventasgrupos.component';
import {ImpuestosventasgruposPipe} from './impuestosventasgrupos/impuestosventasgrupos.pipe';
import {ImpuestosventasPipe} from './impuestosventas/impuestosventas.pipe';
import {ModalgruposingimpvenPipe} from './ingresarimpuestoventas/modalgruposingimpven.pipe';
import {ModalclasesingimpvenPipe} from './ingresarimpuestoventas/modalclasesingimpven.pipe';
import {IngresarimpuestoventasPipe} from './ingresarimpuestoventas/ingresarimpuestoventas.pipe';
import {ModificarimpuestoventasPipe} from './modificarimpuestoventas/modificarimpuestoventas.pipe';
import { ListapreciosComponent } from './listaprecios/listaprecios.component';
import { ListapreciosinactivosComponent } from './listapreciosinactivos/listapreciosinactivos.component';
import { ListadescuentosComponent } from './listadescuentos/listadescuentos.component';
import { ListadescuentosinactivosComponent } from './listadescuentosinactivos/listadescuentosinactivos.component';
import { ModificararticuloslistapreciosComponent } from './modificararticuloslistaprecios/modificararticuloslistaprecios.component';
import { ImportarlistapreciosComponent } from './importarlistaprecios/importarlistaprecios.component';
import {ModalclasesPipe} from './importarlistaprecios/modalclases.pipe';
import {ClasesilpPipe} from './importarlistaprecios/clasesilp.pipe';
import {ListadescuentosPipe} from './listadescuentos/listadescuentos.pipe';
import {ModalpuntoslpPipe} from './listaprecios/modalpuntoslp.pipe';
import {ListapreciosPipe} from './listaprecios/listaprecios.pipe';
import {ListapreciosinactivosPipe} from './listapreciosinactivos/listapreciosinactivos.pipe';
import {ModalclasesmalpPipe} from './modificararticuloslistaprecios/modalclasesmalp.pipe';
import {TablaclasesmalpPipe} from './modificararticuloslistaprecios/tablaclasesmalp.pipe';
import { CostosestimadosPipe } from './costosestimados/costosestimados.pipe';
import { ModalclasescostosPipe } from './costosestimados/modalclasescostos.pipe';
import { ModalgruposcostosPipe } from './costosestimados/modalgruposcostos.pipe';
import { GruposempaquePipe } from './gruposempaque/gruposempaque.pipe';
import { ModalarticulosgruPipe } from './gruposempaque/modalarticulosgru.pipe';
import { GruposempaqueinactivosPipe } from './gruposempaqueinactivos/gruposempaqueinactivos.pipe';
import { BodegasPipe } from './bodegas/bodegas.pipe';
import { PuntosbodegasPipe } from './bodegas/puntosbodegas.pipe';
import { BodegasinactivasPipe } from './bodegasinactivas/bodegasinactivas.pipe';
import { GruposseleccionPipe } from './gruposseleccion/gruposseleccion.pipe';
import { GruposseleccioninactivosPipe } from './gruposseleccioninactivos/gruposseleccioninactivos.pipe';
import { IngresargruposseleccionPipe } from './ingresargruposeleccion/ingresargruposseleccion.pipe';
import { ModalarticulosinggruposelPipe } from './ingresargruposeleccion/modalarticulosinggruposel.pipe';
import { ModificargruposeleccionPipe } from './modificargruposeleccion/modificargruposeleccion.pipe';
import { ModalarticuloseditgruposelPipe } from './modificargruposeleccion/modalarticuloseditgruposel.pipe';
import { ClasesPipe } from './clases/clases.pipe';
import { ClasesinactivasPipe } from './clasesinactivas/clasesinactivas.pipe';
import { GruposclasesPipe } from './gruposclases/gruposclases.pipe';
import { GruposclasesinactivosPipe } from './gruposclasesinactivos/gruposclasesinactivos.pipe';
import { ArticulosPipe } from './articulos/articulos.pipe';
import { PuntosarticulosPipe } from './articulos/puntosarticulos.pipe';
import { ArticulosinactivosPipe } from './articulosinactivos/articulosinactivos.pipe';
import { IngresararticulosComponent } from './ingresararticulos/ingresararticulos.component';
import { MaxminingresarartPipe } from './ingresararticulos/maxminingresarart.pipe';
import { ModalcanalesempaqueingartPipe } from './ingresararticulos/modalcanalesempaqueingart.pipe';
import { ModalcanalesrecetaingartPipe } from './ingresararticulos/modalcanalesrecetaingart.pipe';
import { ModalcanalimpuestoventaingartPipe } from './ingresararticulos/modalcanalimpuestoventaingart.pipe';
import { ModaleditempaquesingartPipe } from './ingresararticulos/modaleditempaquesingart.pipe';
import { ModaleditgruposseleccioningartPipe } from './ingresararticulos/modaleditgruposseleccioningart.pipe';
import { ModaleditingredientesrecetaingartPipe } from './ingresararticulos/modaleditingredientesrecetaingart.pipe';
import { ModalempaquesingartPipe } from './ingresararticulos/modalempaquesingart.pipe';
import { ModalgruposseleccioningartPipe } from './ingresararticulos/modalgruposseleccioningart.pipe';
import { ModalingredientesrecetaingartPipe } from './ingresararticulos/modalingredientesrecetaingart.pipe';
import { ModalpuntosempaqueingartPipe } from './ingresararticulos/modalpuntosempaqueingart.pipe';
import { ModalpuntosrecetaingartPipe } from './ingresararticulos/modalpuntosrecetaingart.pipe';
import { PuntosbodegasingresarartPipe } from './ingresararticulos/puntosbodegasingresarart.pipe';
import { PuntosingresarartPipe } from './ingresararticulos/puntosingresarart.pipe';
import { PuntosmaxminingresarartPipe } from './ingresararticulos/puntosmaxminingresarart.pipe';
import { PuntosselingresarartPipe } from './ingresararticulos/puntosselingresarart.pipe';
import { RecetasactivasingartPipe } from './ingresararticulos/recetasactivasingart.pipe';
import { RecetasinactivasingartPipe } from './ingresararticulos/recetasinactivasingart.pipe';
import { SitiosalmingresarartPipe } from './ingresararticulos/sitiosalmingresarart.pipe';
import { TablacostosestimadoingartPipe } from './ingresararticulos/tablacostosestimadoingart.pipe';
import { TablapersonalizadaunidadesPipe } from './ingresararticulos/tablapersonalizadaunidades.pipe';
import { TablaunidadespresentacionPipe } from './ingresararticulos/tablaunidadespresentacion.pipe';
import { UnidadesingresarartPipe } from './ingresararticulos/unidadesingresarart.pipe';
import { ModificararticulosComponent } from './modificararticulos/modificararticulos.component';
import { MaxmineditartPipe } from './modificararticulos/maxmineditart.pipe';
import { ModalcanalesrecetaeditartPipe } from './modificararticulos/modalcanalesrecetaeditart.pipe';
import { ModalcanalimpuestoventaeditartPipe } from './modificararticulos/modalcanalimpuestoventaeditart.pipe';
import { ModaleditempaqueseditartPipe } from './modificararticulos/modaleditempaqueseditart.pipe';
import { ModaleditgruposseleccioneditartPipe } from './modificararticulos/modaleditgruposseleccioneditart.pipe';
import { ModaleditingredienteseditartPipe } from './modificararticulos/modaleditingredienteseditart.pipe';
import { ModalempaqueseditartPipe } from './modificararticulos/modalempaqueseditart.pipe';
import { ModalgruposseleccioneditartPipe } from './modificararticulos/modalgruposseleccioneditart.pipe';
import { ModalingredienteseditartPipe } from './modificararticulos/modalingredienteseditart.pipe';
import { ModalpuntosrecetaeditartPipe } from './modificararticulos/modalpuntosrecetaeditart.pipe';
import { PuntosbodegaseditartPipe } from './modificararticulos/puntosbodegaseditart.pipe';
import { PuntoseditartPipe } from './modificararticulos/puntoseditart.pipe';
import { PuntosmaxmineditartPipe } from './modificararticulos/puntosmaxmineditart.pipe';
import { PuntosseleditartPipe } from './modificararticulos/puntosseleditart.pipe';
import { SitiosalmeditartPipe } from './modificararticulos/sitiosalmeditart.pipe';
import { TablacostoestimadoeditartPipe } from './modificararticulos/tablacostoestimadoeditart.pipe';
import { UnidadeseditartPipe } from './modificararticulos/unidadeseditart.pipe';
import { IngresararticuloscandeactiveguardService } from './ingresararticulos/ingresararticuloscandeactiveguard.service';


import { RecetasactivasPipe } from './recetasactivas/recetasactivas.pipe';
import { IngresarrecetaComponent } from './ingresarreceta/ingresarreceta.component';
import { IngresarrecetaPipe } from './ingresarreceta/ingresarreceta.pipe';
import { ModalcanalesingresarrecetaPipe } from './ingresarreceta/modalcanalesingresarreceta.pipe';
import { ModalingredientesrecetaingrecetaPipe } from './ingresarreceta/modalingredientesrecetaingreceta.pipe';
import { RecetasinactivasComponent } from './recetasinactivas/recetasinactivas.component';
import { RecetasinactivasPipe } from './recetasinactivas/recetasinactivas.pipe';
import { ModificarrecetaComponent } from './modificarreceta/modificarreceta.component';
import { ModificarrecetaPipe } from './modificarreceta/modificarreceta.pipe';
import { RecetasactivasComponent } from './recetasactivas/recetasactivas.component';
import { RouterModule } from '@angular/router';

import { ArticulosrecetaPipe } from './articulosreceta/articulosreceta.pipe';
import { ArticulosrecetaComponent } from './articulosreceta/articulosreceta.component';
import { ModificaringredientesComponent } from './modificaringredientes/modificaringredientes.component';
import { TablarecetasmiPipe } from './modificaringredientes/tablarecetasmi.pipe';
import { ModalingredientesmiPipe } from './modificaringredientes/modalingredientesmi.pipe';
import { ModalingredientescambiomiPipe } from './modificaringredientes/modalingredientescambiomi.pipe';
import { TablaimpuestoventasPipe } from './ingresarimpuestoventas/tablaimpuestoventas.pipe';




@NgModule({
  declarations: [

      ClasesComponent,
      ClasesinactivasComponent,
      GruposclasesComponent,
      GruposclasesinactivosComponent,
      IngresararticulosComponent,
      ArticulosinactivosComponent,
      ModificararticulosComponent,
      GruposseleccionComponent,
      IngresargruposeleccionComponent,
      GruposseleccioninactivosComponent,
      ModificargruposeleccionComponent,
      BodegasComponent,
      BodegasinactivasComponent,
      CostosestimadosComponent,
      GruposempaqueinactivosComponent,
      GruposempaqueComponent,
      ClasesPipe,
      ClasesinactivasPipe,
      GruposclasesPipe,
      GruposclasesinactivosPipe,
      ArticulosComponent,
      ArticulosPipe,
      PuntosarticulosPipe,
      ArticulosinactivosPipe,
      MaxminingresarartPipe,
      ModalcanalesempaqueingartPipe,
      ModalcanalesrecetaingartPipe,
      ModalcanalimpuestoventaingartPipe,
      ModaleditempaquesingartPipe,
      ModaleditgruposseleccioningartPipe,
      ModaleditingredientesrecetaingartPipe,
      ModalempaquesingartPipe,
      ModalgruposseleccioningartPipe,
      ModalingredientesrecetaingartPipe,
      ModalpuntosempaqueingartPipe,
      ModalpuntosrecetaingartPipe,
      PuntosbodegasingresarartPipe,
      PuntosingresarartPipe,
      PuntosmaxminingresarartPipe,
      PuntosselingresarartPipe,
      RecetasactivasingartPipe,
      RecetasinactivasingartPipe,
      SitiosalmingresarartPipe,
      TablacostosestimadoingartPipe,
      TablapersonalizadaunidadesPipe,
      TablaunidadespresentacionPipe,
      UnidadesingresarartPipe,
      MaxmineditartPipe,
      ModalcanalesrecetaeditartPipe,
      ModalcanalimpuestoventaeditartPipe,
      ModaleditempaqueseditartPipe,
      ModaleditgruposseleccioneditartPipe,
      ModaleditingredienteseditartPipe,
      ModalempaqueseditartPipe,
      ModalgruposseleccioneditartPipe,
      ModalingredienteseditartPipe,
      ModalpuntosrecetaeditartPipe,
      PuntosbodegaseditartPipe,
      PuntoseditartPipe,
      PuntosmaxmineditartPipe,
      PuntosseleditartPipe,
      SitiosalmeditartPipe,
      TablacostoestimadoeditartPipe,
      UnidadeseditartPipe,
      CostosestimadosPipe,
      ModalclasescostosPipe,
      ModalgruposcostosPipe,
      GruposempaquePipe,
      ModalarticulosgruPipe,
      GruposempaqueinactivosPipe,
      BodegasPipe,
      PuntosbodegasPipe,
      BodegasinactivasPipe,
      GruposseleccionPipe,
      GruposseleccioninactivosPipe,
      IngresargruposseleccionPipe,
      ModalarticulosinggruposelPipe,
      ModificargruposeleccionPipe,
      ModalarticuloseditgruposelPipe,
      ImpuestosventasComponent,
      IngresarimpuestoventasComponent,
      ModificarimpuestoventasComponent,
      ImpuestosventasgruposComponent,
      ImpuestosventasgruposPipe,
      ImpuestosventasPipe,
      ModalgruposingimpvenPipe,
      ModalclasesingimpvenPipe,
      IngresarimpuestoventasPipe,
      ModificarimpuestoventasPipe,
      ListapreciosComponent,
      ListapreciosinactivosComponent,
      ListadescuentosComponent,
      ListadescuentosinactivosComponent,
      ModificararticuloslistapreciosComponent,
      ImportarlistapreciosComponent,
      ModalclasesPipe,
      ClasesilpPipe,
      ListadescuentosPipe,
      ModalpuntoslpPipe,
      ListapreciosPipe,
      ListapreciosinactivosPipe,
      ModalclasesmalpPipe,
      TablaclasesmalpPipe,
      RecetasactivasPipe,
      IngresarrecetaComponent,
      IngresarrecetaPipe,
      ModalcanalesingresarrecetaPipe,
      ModalingredientesrecetaingrecetaPipe,
      RecetasinactivasComponent,
      RecetasinactivasPipe,
      ModificarrecetaComponent,
      ModificarrecetaPipe,
      RecetasactivasComponent,
      ArticulosrecetaPipe,
      ArticulosrecetaComponent,
      ModificaringredientesComponent,
      TablarecetasmiPipe,
      ModalingredientesmiPipe,
      ModalingredientescambiomiPipe,
      TablaimpuestoventasPipe
       
    
    
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ArchwizardModule,
    MyDatePickerModule,
    FormsModule,
    RouterModule,
    CONFIGURACIONES2_ROUTES
   
  ]
})
export class Configuraciones2Module { }
