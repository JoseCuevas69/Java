import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprogcat007cwComponent } from './pages/fcaprogcat007cw/fcaprogcat007cw.component';

const routes: Routes = [
    {  path: 'fcaprogcat007cw', component: Fcaprogcat007cwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatFlautasRoutingModule { }
