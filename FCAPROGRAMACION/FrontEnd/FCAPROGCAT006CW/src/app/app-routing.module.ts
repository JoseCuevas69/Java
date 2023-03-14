import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';

//import { AuthComponent } from './shared/components/auth/auth.component';

const routes: Routes = [
  // {  path: 'auth/:module/:component/:user/:zone', component: AuthComponent },
  // {  path: 'auth/:module/:user/:zone', component: AuthComponent },
  {
    path: 'auth/:module/:component',
    component: AuthComponent
  },
  {
    path: 'auth/:module',
    component: AuthComponent
  },
  {
    path: 'paromaquina',
    loadChildren: () => import('./modules/modparomaquina/modparomaquina.module').then(m => m.ModparomaquinaModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
