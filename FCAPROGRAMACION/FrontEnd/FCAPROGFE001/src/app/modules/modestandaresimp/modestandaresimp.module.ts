import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {modestandaresimpRoutingModudle} from './modestandaresimp-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { FCAPROD002MWComponent } from './pages/fcaprod002-mw/fcaprod002-mw.component';



@NgModule({
  declarations: [FCAPROD002MWComponent],
  imports: [
    CommonModule,
    modestandaresimpRoutingModudle,
    FormsModule,
    SharedModule,
    BlockUIModule.forRoot()    
  ]
})
export class ModestandaresimpModule { }
