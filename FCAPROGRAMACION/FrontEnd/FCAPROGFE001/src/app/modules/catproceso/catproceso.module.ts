import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ProcesoRoutingModule } from './catproceso-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprogcat009cwComponent } from './pages/fcaprogcat009cw/fcaprogcat009cw.component';


// Components
import { MldProcesoComponent } from './components/mld-proceso/mld-proceso.component';


@NgModule({
  declarations: [Fcaprogcat009cwComponent, MldProcesoComponent],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class CatprocesoModule { }
