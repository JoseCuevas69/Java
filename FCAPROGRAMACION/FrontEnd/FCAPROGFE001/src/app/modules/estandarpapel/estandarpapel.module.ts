import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstandarpapelRoutingModule } from './estandarpapel-routing.module';
import { Fcaprog002mwComponent } from './pages/fcaprog002mw/fcaprog002mw.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [Fcaprog002mwComponent],
  imports: [
    CommonModule,
    EstandarpapelRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    BlockUIModule.forRoot(),
  ]
})
export class EstandarpapelModule { }
