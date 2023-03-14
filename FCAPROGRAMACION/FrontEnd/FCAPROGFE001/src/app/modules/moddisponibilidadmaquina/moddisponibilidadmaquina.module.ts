import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ModdisponibilidadmaquinaRoutingModule } from './moddisponibilidadmaquina-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprog006mwComponent } from './pages/fcaprog006mw/fcaprog006mw.component';
import { MdlcopiarComponent } from './components/mdlcopiar/mdlcopiar.component';

// Components

@NgModule({
  declarations: [Fcaprog006mwComponent, MdlcopiarComponent],
  imports: [
    CommonModule,
    ModdisponibilidadmaquinaRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class ModdisponibilidadmaquinaModule { }
