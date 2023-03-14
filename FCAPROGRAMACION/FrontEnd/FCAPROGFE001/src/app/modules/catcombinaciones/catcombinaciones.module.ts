import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { CombinacionesRoutingModule } from './catcombinaciones-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprogcat004cwComponent } from './pages/fcaprogcat004cw/fcaprogcat004cw.component';
import { MdlCombinacionesComponent } from './components/mdl-combinaciones/mdl-combinaciones.component';

// Components
// import { MldProcesoComponent } from './components/mld-proceso/mld-proceso.component';

@NgModule({
  declarations: [Fcaprogcat004cwComponent, MdlCombinacionesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CombinacionesRoutingModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class CatcombinacionesModule { }
