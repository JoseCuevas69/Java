import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecimpRoutingModule } from './secimp-routing.module';
import { FCAPROG017MWComponent } from './pages/fcaprog017-mw/fcaprog017-mw.component';


@NgModule({
  declarations: [FCAPROG017MWComponent],
  imports: [
    CommonModule,
    SecimpRoutingModule
  ]
})
export class SecimpModule { }
