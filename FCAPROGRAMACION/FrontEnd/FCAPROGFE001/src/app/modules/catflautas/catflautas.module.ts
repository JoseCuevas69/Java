import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { CatFlautasRoutingModule } from './catflautas-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprogcat007cwComponent } from './pages/fcaprogcat007cw/fcaprogcat007cw.component';

// Components
import { MldFlautasComponent } from './components/mld-flautas/mld-flautas.component';


@NgModule({
  declarations: [Fcaprogcat007cwComponent, MldFlautasComponent],
  imports: [
    CommonModule,
    CatFlautasRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class CatFlautaModule { }
