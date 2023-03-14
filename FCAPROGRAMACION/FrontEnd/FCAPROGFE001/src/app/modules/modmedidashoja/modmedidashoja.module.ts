import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ModmedidashojaRoutingModule } from './modmedidashoja-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprog004mwComponent } from './pages/fcaprog004mw/fcaprog004mw.component';

// Components


@NgModule({
  declarations: [Fcaprog004mwComponent],
  imports: [
    CommonModule,
    ModmedidashojaRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class ModmedidashojaModule { }
