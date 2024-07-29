import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'maps', 
    loadChildren: () => import('./maps/maps.module').then( modulo => modulo.MapsModule),  
  },
  { 
    path: 'alone', 
    loadComponent: () => import('./alone/pages/alone-pages/alone-pages.component').then( modulo => modulo.AlonePagesComponent),  
  },
  {
    path: '**',
    redirectTo: 'maps'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
