import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { DesperdiciosRoutingModule } from './catdesperdicios-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { Fcaprodcat011cwComponent } from './pages/fcaprodcat011cw/fcaprodcat011cw.component';


// Components
import { MdlDesperdiciosComponent } from './components/mdl-desperdicios/mdl-desperdicios.component';
import { PantallaprincipalComponent } from './pantallaprincipal/pantallaprincipal.component';
import { MldconfigAreaDesperdicioComponent } from './components/mldconfig-area-desperdicio/mldconfig-area-desperdicio.component';
import { MldagregarareadesperdicioComponent } from './components/mldagregarareadesperdicio/mldagregarareadesperdicio.component';
import { CatareasdesperdicioComponent } from './catareasdesperdicio/catareasdesperdicio.component';

@NgModule({
  declarations: [Fcaprodcat011cwComponent, MdlDesperdiciosComponent, PantallaprincipalComponent, MldconfigAreaDesperdicioComponent, MldagregarareadesperdicioComponent, CatareasdesperdicioComponent],
  imports: [
    CommonModule,
    DesperdiciosRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})
export class CatdesperdiciosModule { }
