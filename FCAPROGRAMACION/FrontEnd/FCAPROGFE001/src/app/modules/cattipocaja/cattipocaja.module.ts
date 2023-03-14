import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { CattipocajaRoutingModule } from './cattipocaja-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprogcat010cwComponent } from './pages/fcaprogcat010cw/fcaprogcat010cw.component';

// Components
import { MdlTipocajaComponent } from './components/mdl-tipocaja/mdl-tipocaja.component';


@NgModule({
  declarations: [Fcaprogcat010cwComponent, MdlTipocajaComponent],
  imports: [
    CommonModule,
    CattipocajaRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class CattipocajaModule { }
