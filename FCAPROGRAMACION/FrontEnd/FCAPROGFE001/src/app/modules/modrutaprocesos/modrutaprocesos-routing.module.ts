import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { FCAPROG008MWComponent } from './pages/fcaprog008-mw/fcaprog008-mw.component';

const routes: Routes =[
    {path:'fcaprog008mw',component:FCAPROG008MWComponent,canActivate:[AuthGuard]}

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class modrutaprocesosRoutingModule{}