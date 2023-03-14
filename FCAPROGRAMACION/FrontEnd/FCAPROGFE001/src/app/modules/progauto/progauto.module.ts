import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';

import { ProgautoRoutingModule } from './progauto-routing.module';
import { FCAPROG012MWComponent } from './pages/fcaprog012-mw/fcaprog012-mw.component';
import { FCAPROG013MWComponent } from './pages/fcaprog013-mw/fcaprog013-mw.component';
import { FCAPROG014MWComponent } from './pages/fcaprog014-mw/fcaprog014-mw.component';
import { FCAPROG015MWComponent } from './pages/fcaprog015-mw/fcaprog015-mw.component';
import { FCAPROG016MWComponent } from './pages/fcaprog016-mw/fcaprog016-mw.component';
import { CabeceraPaginaComponent } from './components/cabecera-pagina/cabecera-pagina.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';


@NgModule({
  declarations: [
    FCAPROG012MWComponent,
    FCAPROG013MWComponent,
    FCAPROG014MWComponent,
    FCAPROG015MWComponent,
    FCAPROG016MWComponent,
    CabeceraPaginaComponent,
    PiePaginaComponent
  ],
  imports: [
    CommonModule,
    ProgautoRoutingModule,
    SharedModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    PiePaginaComponent,
    CabeceraPaginaComponent
  ]
})
export class ProgautoModule { }
