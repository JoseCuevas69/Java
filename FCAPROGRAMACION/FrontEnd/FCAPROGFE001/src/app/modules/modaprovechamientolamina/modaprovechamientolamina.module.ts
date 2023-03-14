import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ModaprovechamientolaminaRoutingModule } from './modaprovechamientolamina-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PagPricipalComponent } from './pages/pag-pricipal/pag-pricipal.component';

// Module


// Components


@NgModule({
  declarations: [PagPricipalComponent],
  imports: [
    CommonModule,
    ModaprovechamientolaminaRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class ModaprovechamientolaminaModule { }
