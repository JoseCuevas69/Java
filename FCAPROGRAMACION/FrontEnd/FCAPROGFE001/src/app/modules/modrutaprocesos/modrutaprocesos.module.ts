import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FCAPROG008MWComponent } from './pages/fcaprog008-mw/fcaprog008-mw.component';
import { FormsModule } from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import {modrutaprocesosRoutingModule} from './modrutaprocesos-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [FCAPROG008MWComponent],
  imports: [
    CommonModule,
    modrutaprocesosRoutingModule,
    FormsModule,
    SharedModule,
    MatCheckboxModule,
    BlockUIModule.forRoot()
  ]
})
export class ModrutaprocesosModule { }
