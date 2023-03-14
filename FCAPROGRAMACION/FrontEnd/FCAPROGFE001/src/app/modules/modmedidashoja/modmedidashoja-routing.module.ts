import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprog004mwComponent } from './pages/fcaprog004mw/fcaprog004mw.component';

const routes: Routes = [
    {  path: 'fcaprog004mw', component: Fcaprog004mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModmedidashojaRoutingModule { }
