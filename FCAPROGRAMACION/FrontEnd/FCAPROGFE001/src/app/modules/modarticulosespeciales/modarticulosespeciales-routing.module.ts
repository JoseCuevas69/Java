import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
//import {Fcaprog005mwComponent } from './pages/fcaprog005mw/fcaprog005mw.component';
import {Fcaprog009mwComponent } from './pages/fcaprog009mw/fcaprog009mw.component';

const routes: Routes = [
    {  path: 'fcaprog009mw', component: Fcaprog009mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModarticulosespecialesRoutingModule { }
//export class ModreservacargaRoutingModule { }