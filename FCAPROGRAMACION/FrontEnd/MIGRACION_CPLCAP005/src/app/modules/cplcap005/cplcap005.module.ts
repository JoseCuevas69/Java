import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { Cplcap005RoutingModule } from './cplcap005-routing.module';
import { FprocsComponent } from './components/fprocs/fprocs.component';
import { CabeceraPaginaComponent } from './components/cabecera-pagina/cabecera-pagina.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';
import { BlockUIModule } from 'ng-block-ui';
import { Cplcap001Component } from './pages/cplcap001/cplcap001.component';
import { Cplcap002Component } from './pages/cplcap002/cplcap002.component';
import { Cplcap003Component } from './pages/cplcap003/cplcap003.component';
import { Cplcap005Component } from './pages/cplcap005/cplcap005.component';
import { Cplcap009Component } from './pages/cplcap009/cplcap009.component';

@NgModule({
  declarations: [
    FprocsComponent,
    PiePaginaComponent,
    CabeceraPaginaComponent,
    Cplcap001Component,
    Cplcap002Component,
    Cplcap003Component,
    Cplcap005Component,
    Cplcap009Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    Cplcap005RoutingModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    FprocsComponent,
    PiePaginaComponent,
    CabeceraPaginaComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Cplcap005Module { }
