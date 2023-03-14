import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprodcat011cwComponent } from './pages/fcaprodcat011cw/fcaprodcat011cw.component';
import { PantallaprincipalComponent } from './pantallaprincipal/pantallaprincipal.component';
import { CatareasdesperdicioComponent } from './catareasdesperdicio/catareasdesperdicio.component';

const routes: Routes = [
    {  path: 'fcaprodcat011cw', component: PantallaprincipalComponent, canActivate: [AuthGuard] },
    {  path: 'areadesperdicio', component: CatareasdesperdicioComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesperdiciosRoutingModule { }
