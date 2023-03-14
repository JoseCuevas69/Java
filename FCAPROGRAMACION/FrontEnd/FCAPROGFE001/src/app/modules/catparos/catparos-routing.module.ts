import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
//import { Fcaprodcat012cwComponent } from './pages/fcaprodcat012cw/fcaprodcat012cw.component';
import { Fcaprodcat012cwComponent } from './pages/fcaprodcat012cw/fcaprodcat012cw.component';





const routes: Routes = [
    {  path: 'fcaprodcat012cw', component: Fcaprodcat012cwComponent, canActivate: [AuthGuard] }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParosRoutingModule { }
