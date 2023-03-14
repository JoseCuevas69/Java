import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../helpers/auth.guard';
import { Cplcap001Component } from './pages/cplcap001/cplcap001.component';
import { Cplcap002Component } from './pages/cplcap002/cplcap002.component';
import { Cplcap003Component } from './pages/cplcap003/cplcap003.component';
import { Cplcap005Component } from './pages/cplcap005/cplcap005.component';

const routes: Routes = [
  // {  path: 'cplcap005', component: Cplcap005Component, canActivate: [AuthGuard] },
  {  path: 'cplcap001', component: Cplcap001Component },
  {  path: 'cplcap002', component: Cplcap002Component },
  {  path: 'cplcap003', component: Cplcap003Component },
  {  path: 'cplcap005', component: Cplcap005Component },
  {  path: 'cplcap009', component: Cplcap005Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Cplcap005RoutingModule { }
