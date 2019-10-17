import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CofiguracionesComponent } from './pages/configuraciones/cofiguraciones.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Configuraciones2Component } from './pages/configuraciones2/configuraciones2.component';
import { Configuraciones3Component } from './pages/configuraciones3/configuraciones3.component';





const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: DashboardComponent,
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'configuraciones',
    component: CofiguracionesComponent,
    loadChildren: () => import('./pages/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule)
  },
  {
    path: 'configuraciones2',
    component: Configuraciones2Component,
    loadChildren: () => import('./pages/configuraciones2/configuraciones2.module').then(m => m.Configuraciones2Module)
  },
  {
    path: 'configuraciones3',
    component: Configuraciones3Component,
    loadChildren: () => import('./pages/configuraciones3/configuraciones3.module').then(m => m.Configuraciones3Module)
  },
  {
    path: 'compras',
    component: ComprasComponent,
    loadChildren: () => import('./pages/compras/compras.module').then(m => m.ComprasModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
