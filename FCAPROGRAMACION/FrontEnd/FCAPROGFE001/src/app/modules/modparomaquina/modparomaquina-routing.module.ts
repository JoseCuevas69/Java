import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import {Fcaprog001mwComponent } from './pages/fcaprog001mw/fcaprog001mw.component';
//import {}
const routes: Routes = [
    {  path: 'fcaprog001mw', component: Fcaprog001mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class modparomaquinaRoutingModule { }