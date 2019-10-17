import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CofiguracionesComponent } from './pages/configuraciones/cofiguraciones.component';
import { Configuraciones2Component } from './pages/configuraciones2/configuraciones2.component';
import { Configuraciones3Component } from './pages/configuraciones3/configuraciones3.component';
import { SharedModule } from './shared/shared.module';
import { ComprasComponent } from './pages/compras/compras.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ToastrModule} from 'ngx-toastr';
import { HomeComponent } from './pages/home/home.component';
import { HomePipe } from './pages/home/home.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BreadcrumbModule } from 'xng-breadcrumb';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Configuraciones2Component,
    Configuraciones3Component,
    CofiguracionesComponent,
    ComprasComponent,
    HomeComponent,
    HomePipe,
    DashboardComponent,
    Configuraciones2Component,
    Configuraciones3Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SharedModule,
    BreadcrumbModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
