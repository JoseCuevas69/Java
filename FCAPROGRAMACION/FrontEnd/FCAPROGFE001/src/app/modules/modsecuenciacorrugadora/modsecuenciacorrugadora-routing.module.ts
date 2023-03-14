import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { PagprincipalComponent } from './pages/pagprincipal/pagprincipal.component';

const routes: Routes = [
    {  path: 'pagprincipal', component: PagprincipalComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModsecuenciacorrugadoraRoutingModule { }
