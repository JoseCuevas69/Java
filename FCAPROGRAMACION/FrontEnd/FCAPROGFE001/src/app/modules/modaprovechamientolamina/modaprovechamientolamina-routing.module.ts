import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { PagPricipalComponent } from './pages/pag-pricipal/pag-pricipal.component';

const routes: Routes = [
    {  path: 'pagprincipal', component: PagPricipalComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModaprovechamientolaminaRoutingModule { }
