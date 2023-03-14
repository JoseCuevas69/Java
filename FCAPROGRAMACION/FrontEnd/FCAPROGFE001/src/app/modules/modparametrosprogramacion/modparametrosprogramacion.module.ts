import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { modParametrosProgrmacionRoutingModule } from './modparametrosprogramacion-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprog003mwComponent } from './pages/fcaprog003mw/fcaprog003mw.component';
import { MldModvariacionesComponent } from './components/mld-modvariaciones/mld-modvariaciones.component';

// Components




@NgModule({
  declarations: [Fcaprog003mwComponent, MldModvariacionesComponent],
  imports: [
    CommonModule,
    modParametrosProgrmacionRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class ModparametrosprogramacionModule { }
