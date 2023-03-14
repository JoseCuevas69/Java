import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModsecuenciacorrugadoraRoutingModule } from './modsecuenciacorrugadora-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Module
import { PagprincipalComponent } from './pages/pagprincipal/pagprincipal.component';
import { MdldetallesComponent } from './components/mdldetalles/mdldetalles.component';
import { MdlbuscaropComponent } from './components/mdlbuscarop/mdlbuscarop.component';
import { MdlposicionEspComponent } from './components/mdlposicion-esp/mdlposicion-esp.component';
import { MdladdprogramaComponent } from './components/mdladdprograma/mdladdprograma.component';
import { MdlmodpreparacionComponent } from './components/mdlmodpreparacion/mdlmodpreparacion.component';
import { MdlconfieliminacionComponent } from './components/mdlconfieliminacion/mdlconfieliminacion.component';
import { MdlimprimirComponent } from './components/mdlimprimir/mdlimprimir.component';
import { MdlfiltroreporteComponent } from './components/mdlfiltroreporte/mdlfiltroreporte.component';
import { MdlobservacionesprogimpresoraComponent } from './components/mdlobservacionesprogimpresora/mdlobservacionesprogimpresora.component';
import { MdlverificadorpapelesComponent } from './components/mdlverificadorpapeles/mdlverificadorpapeles.component';
import { MdlfoliocombinacionComponent } from './components/mdlfoliocombinacion/mdlfoliocombinacion.component';

// Components

@NgModule({
  declarations: [
    PagprincipalComponent,
    MdldetallesComponent,
    MdlbuscaropComponent,
    MdlposicionEspComponent,
    MdladdprogramaComponent,
    MdlmodpreparacionComponent,
    MdlconfieliminacionComponent,
    MdlimprimirComponent,
    MdlfiltroreporteComponent,
    MdlobservacionesprogimpresoraComponent,
    MdlverificadorpapelesComponent,
    MdlfoliocombinacionComponent,
  ],
  imports: [
    CommonModule,
    ModsecuenciacorrugadoraRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot(),
  ],
})
export class ModsecuenciacorrugadoraModule {}
