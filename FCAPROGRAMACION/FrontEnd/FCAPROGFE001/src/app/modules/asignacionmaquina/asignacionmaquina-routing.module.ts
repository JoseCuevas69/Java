import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Fcaprog007mwComponent} from './pages/fcaprog007mw/fcaprog007mw.component';
import { AuthGuard } from '../../helpers/auth.guard';

const routes: Routes = [
  {  path: 'fcaprog007mw', component:  Fcaprog007mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionmaquinaRoutingModule { }
