import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { FCAPROG001RWComponent  } from './pages/fcaprog001-rw/fcaprog001-rw.component';

const routes: Routes = [
  { path: 'fcaprog001rw', component: FCAPROG001RWComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class consumorolloscorrugadoraRoutingModule { }