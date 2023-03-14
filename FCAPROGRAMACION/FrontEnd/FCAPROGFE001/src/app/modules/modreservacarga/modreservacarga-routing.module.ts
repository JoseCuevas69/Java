import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import {Fcaprog005mwComponent } from './pages/fcaprog005mw/fcaprog005mw.component';

const routes: Routes = [
    {  path: 'fcaprog005mw', component: Fcaprog005mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ModreservacargaRoutingModule { }