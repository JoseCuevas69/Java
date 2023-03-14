import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import {FCAPROD002MWComponent} from './pages/fcaprod002-mw/fcaprod002-mw.component';

const routes: Routes=[
    {path:'fcaprod002mw',component:FCAPROD002MWComponent,canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class modestandaresimpRoutingModudle { }