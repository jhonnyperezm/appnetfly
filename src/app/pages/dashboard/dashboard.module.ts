import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { DashboardhomePipe } from './dashboardhome/dashboardhome.pipe';
import {DASHBOARD_ROUTES} from './router';



@NgModule({
  declarations: [DashboardhomeComponent, DashboardhomePipe],
  imports: [
    CommonModule,
    DASHBOARD_ROUTES
  ]
})
export class DashboardModule { }
