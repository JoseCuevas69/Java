import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprogcat010cwComponent } from './pages/fcaprogcat010cw/fcaprogcat010cw.component';

const routes: Routes = [
    {  path: 'fcaprogcat010cw', component: Fcaprogcat010cwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CattipocajaRoutingModule { }
