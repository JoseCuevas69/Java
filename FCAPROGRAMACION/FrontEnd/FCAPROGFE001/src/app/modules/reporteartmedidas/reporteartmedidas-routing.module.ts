import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprog002rwComponent } from './pages/FCAPROG002RW/FCAPROG002RW.component';

const routes: Routes = [
  { path: 'fcaprog002rw', component: Fcaprog002rwComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class reporteartmedidasRoutingModule { }