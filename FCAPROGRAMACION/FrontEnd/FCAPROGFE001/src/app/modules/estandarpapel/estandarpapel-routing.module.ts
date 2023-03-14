import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { Fcaprog002mwComponent} from './pages/fcaprog002mw/fcaprog002mw.component';
const routes: Routes = [
  {  path: 'fcaprog002mw', component:  Fcaprog002mwComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstandarpapelRoutingModule { }
