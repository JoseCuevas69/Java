import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprog006mwComponent } from './pages/fcaprog006mw/fcaprog006mw.component';

const routes: Routes = [
    {  path: 'fcaprog006mw', component: Fcaprog006mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModdisponibilidadmaquinaRoutingModule { }
