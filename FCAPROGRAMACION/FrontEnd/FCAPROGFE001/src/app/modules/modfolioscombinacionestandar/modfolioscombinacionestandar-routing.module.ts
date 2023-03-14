import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
//import {Fcaprog005mwComponent } from './pages/fcaprog005mw/fcaprog005mw.component';
import { Fcaprog099mwComponent } from './pages/fcaprog099mw/fcaprog099mw.component';

const routes: Routes = [
    {  path: 'fcaprog099mw', component: Fcaprog099mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ModfolioscombinacionestandarRoutingModule { }