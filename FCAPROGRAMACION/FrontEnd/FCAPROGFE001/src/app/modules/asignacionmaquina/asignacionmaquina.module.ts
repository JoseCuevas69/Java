import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionmaquinaRoutingModule } from './asignacionmaquina-routing.module';
import { Fcaprog007mwComponent } from './pages/fcaprog007mw/fcaprog007mw.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [Fcaprog007mwComponent],
  imports: [
    CommonModule,
    AsignacionmaquinaRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    BlockUIModule.forRoot(),
  ]
})
export class AsignacionmaquinaModule { }
