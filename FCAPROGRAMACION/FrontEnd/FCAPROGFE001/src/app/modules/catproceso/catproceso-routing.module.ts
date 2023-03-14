import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprogcat009cwComponent } from './pages/fcaprogcat009cw/fcaprogcat009cw.component';

const routes: Routes = [
    {  path: 'fcaprogcat009cw', component: Fcaprogcat009cwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoRoutingModule { }
