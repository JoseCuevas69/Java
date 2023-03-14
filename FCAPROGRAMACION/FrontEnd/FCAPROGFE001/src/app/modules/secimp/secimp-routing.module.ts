import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FCAPROG017MWComponent } from './pages/fcaprog017-mw/fcaprog017-mw.component';

const routes: Routes = [
  { path: 'fcaprog017mw', component: FCAPROG017MWComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecimpRoutingModule { }
