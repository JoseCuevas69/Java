//------------------------------------------
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ModfolioscombinacionestandarRoutingModule } from './modfolioscombinacionestandar-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatDatepickerModule } from '@angular/material/datepicker';



// Module
import { Fcaprog099mwComponent } from './pages/fcaprog099mw/fcaprog099mw.component';

// Components
//import { MdlParomaquinaComponent } from './components/mdl-paromaquina/mdl-paromaquina.component';



import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@shtian/ng-pick-datetime';
import { TabfolioComponent } from './components/tabfolio/tabfolio.component';
import { TabEstandaresvspropuestasComponent } from './components/tab-estandaresvspropuestas/tab-estandaresvspropuestas.component';
import { TabcomentariosComponent } from './components/tabcomentarios/tabcomentarios.component';
import { TabreporteComponent } from './components/tabreporte/tabreporte.component';

//import { TabfolioComponent } from './components/tabfolio/tabfolio.component';



export class DefaultIntl extends OwlDateTimeIntl {
  cancelBtnLabel = 'Cancelar';
  setBtnLabel = 'Seleccionar';
}

@NgModule({
  declarations: [Fcaprog099mwComponent, TabfolioComponent, TabEstandaresvspropuestasComponent, TabcomentariosComponent, TabreporteComponent],
  imports: [
    CommonModule,
    ModfolioscombinacionestandarRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    BlockUIModule.forRoot()
  ],  
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'es-ES'},
  {provide: OwlDateTimeIntl, useClass: DefaultIntl}],
  

})

export class ModfolioscombinacionestandarModule { }