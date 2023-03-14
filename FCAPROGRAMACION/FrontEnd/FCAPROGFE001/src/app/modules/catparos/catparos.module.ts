import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ParosRoutingModule } from './catparos-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprodcat012cwComponent } from './pages/fcaprodcat012cw/fcaprodcat012cw.component';
import { MdlParosComponent } from './components/mdl-paros/mdl-paros.component';

// Components

@NgModule({
  declarations: [Fcaprodcat012cwComponent, MdlParosComponent],
  imports: [
    CommonModule,
    ParosRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class CatparosModule { }
