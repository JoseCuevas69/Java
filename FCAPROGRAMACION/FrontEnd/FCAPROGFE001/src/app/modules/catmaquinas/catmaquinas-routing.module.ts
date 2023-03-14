import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import {FCAPROGCAT008CWComponent} from './pages/fcaprogcat008-cw/fcaprogcat008-cw.component';

const routes: Routes = [
    {path: 'fcaprogcat008cw',component: FCAPROGCAT008CWComponent,canActivate:[AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatmaquinasRoutingModule{}