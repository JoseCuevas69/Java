import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprog003mwComponent } from './pages/fcaprog003mw/fcaprog003mw.component';

const routes: Routes = [
    {  path: 'fcaprog003mw', component: Fcaprog003mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class modParametrosProgrmacionRoutingModule { }
