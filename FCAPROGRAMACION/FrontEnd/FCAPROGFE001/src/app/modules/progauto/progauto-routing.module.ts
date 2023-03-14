import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FCAPROG012MWComponent } from './pages/fcaprog012-mw/fcaprog012-mw.component';
import { FCAPROG013MWComponent } from './pages/fcaprog013-mw/fcaprog013-mw.component';
import { FCAPROG014MWComponent } from './pages/fcaprog014-mw/fcaprog014-mw.component';
import { FCAPROG015MWComponent } from './pages/fcaprog015-mw/fcaprog015-mw.component';
import { FCAPROG016MWComponent } from './pages/fcaprog016-mw/fcaprog016-mw.component';

const routes: Routes = [
  { path: 'fcaprog012mw', component: FCAPROG012MWComponent },
  { path: 'fcaprog013mw', component: FCAPROG013MWComponent },
  { path: 'fcaprog014mw', component: FCAPROG014MWComponent },
  { path: 'fcaprog015mw', component: FCAPROG015MWComponent },
  { path: 'fcaprog016mw', component: FCAPROG016MWComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgautoRoutingModule { }
