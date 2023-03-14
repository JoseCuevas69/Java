import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';

import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { CatpapelesRoutingModule } from './catpapeles-routing.module';
//import { Fcaprogcat020cwComponent } from './pages/fcaprogcat020cw/fcaprogcat020cw.component';
//import { Fcaprogcat009cwComponent } from './pages/fcaprogcat009cw/fcaprogcat009cw.component';
import { MdlpapelesComponent } from './components/mdlpapeles/mdlpapeles.component';
import { Fcaprogcat020cwComponent } from './pages/fcaprogcat020cw/fcaprogcat020cw.component';



@NgModule({
    declarations: [Fcaprogcat020cwComponent, MdlpapelesComponent],
    imports: [
      CommonModule,
      CatpapelesRoutingModule,
      FormsModule,
      SharedModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatInputModule,
      BlockUIModule.forRoot()
    ]
  })

  export class CatpapelesModule { }
  