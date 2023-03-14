import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import {CatmaquinasRoutingModule} from '../catmaquinas/catmaquinas-routing.module';
import { FCAPROGCAT008CWComponent } from './pages/fcaprogcat008-cw/fcaprogcat008-cw.component';



@NgModule({
  declarations: [FCAPROGCAT008CWComponent],
  imports: [
    CommonModule,
    CatmaquinasRoutingModule,
    FormsModule,
    SharedModule,
    BlockUIModule.forRoot()
  ]
})
export class CatmaquinasModule { }
