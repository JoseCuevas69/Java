import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprogcat020cwComponent } from './pages/fcaprogcat020cw/fcaprogcat020cw.component';

const routes: Routes = [
    {  path: 'fcaprogcat020cw', component: Fcaprogcat020cwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

//catpapeles-routing.module
export class CatpapelesRoutingModule { }