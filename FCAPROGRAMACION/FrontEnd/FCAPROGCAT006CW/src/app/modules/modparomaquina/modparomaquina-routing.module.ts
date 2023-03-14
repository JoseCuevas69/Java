import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import {Fcaprog001mwComponent } from './pages/fcaprog001mw/fcaprog001mw.component';
import { Fcaprog018mwComponent } from './pages/fcaprog018mw/fcaprog018mw.component';
import { Fcaprog019mwComponent } from './pages/fcaprog019mw/fcaprog019mw.component';
import { Fcaprog019mwimpComponent } from './pages/fcaprog019mwimp/fcaprog019mwimp.component';
import { Fcaprog019mwsupComponent } from './pages/fcaprog019mwsup/fcaprog019mwsup.component';
//import {}
const routes: Routes = [
  {  path: 'fcaprog001mw', component: Fcaprog001mwComponent, canActivate: [AuthGuard] },
  {  path: 'fcaprog019mw', component: Fcaprog019mwComponent, canActivate: [AuthGuard] },
  {  path: 'fcaprog019mwsup', component: Fcaprog019mwsupComponent, canActivate: [AuthGuard] },
  {  path: 'fcaprog019mwimp', component: Fcaprog019mwimpComponent, canActivate: [AuthGuard] },
  {  path: 'fcaprog018mw', component: Fcaprog018mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class modparomaquinaRoutingModule { }