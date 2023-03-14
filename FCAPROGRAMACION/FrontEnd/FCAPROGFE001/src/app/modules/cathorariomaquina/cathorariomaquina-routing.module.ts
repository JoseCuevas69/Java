import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import {Fcaprogcat006cwComponent } from './pages/fcaprogcat006cw/fcaprogcat006cw.component';
//import {}
const routes: Routes = [
    {  path: 'fcaprogcat006cw', component: Fcaprogcat006cwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// cathorariomaquinaRoutingModule
// modparomaquinaRoutingModule
export class cathorariomaquinaRoutingModule { }