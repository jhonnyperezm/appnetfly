import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {DashboardhomeComponent} from './dashboardhome/dashboardhome.component';


const pagesRoutes: Routes = [

  { path: 'dashboard', component: DashboardhomeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


export const DASHBOARD_ROUTES = RouterModule.forChild(pagesRoutes);

