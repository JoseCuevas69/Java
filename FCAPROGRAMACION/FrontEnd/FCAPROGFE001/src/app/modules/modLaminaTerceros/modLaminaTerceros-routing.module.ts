import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Cmo084mwComponent } from './pages/cmo084mw/cmo084mw.component';
import { Cmo085mwComponent } from './pages/cmo085mw/cmo085mw.component';
//import {Fcaprog005mwComponent } from './pages/fcaprog005mw/fcaprog005mw.component';
// CMO084MW - cmo084mw
const routes: Routes = [
    {  path: 'cmo084mw', component: Cmo084mwComponent, canActivate: [AuthGuard] },
    {  path: 'cmo085mw', component: Cmo085mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

// modLaminaTerceros-routing.module
export class ModLaminaTercerosRoutingModule { }