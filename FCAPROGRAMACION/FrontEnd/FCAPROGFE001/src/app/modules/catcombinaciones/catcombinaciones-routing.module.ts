import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprogcat004cwComponent } from './pages/fcaprogcat004cw/fcaprogcat004cw.component';


const routes: Routes = [
    {  path: 'fcaprogcat004cw', component: Fcaprogcat004cwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CombinacionesRoutingModule { }
