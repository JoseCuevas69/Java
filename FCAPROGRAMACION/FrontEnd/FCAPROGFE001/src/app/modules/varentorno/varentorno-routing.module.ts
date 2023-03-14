import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprog010mwComponent } from './pages/fcaprog010mw/fcaprog010mw.component';

const routes: Routes = [
    {  path: 'fcaprog010mw', component: Fcaprog010mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VarEntornoRoutingModule { }
