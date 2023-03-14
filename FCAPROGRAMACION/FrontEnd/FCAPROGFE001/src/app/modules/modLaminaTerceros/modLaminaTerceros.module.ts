//------------------------------------------
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { ModLaminaTercerosRoutingModule } from './modLaminaTerceros-routing.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatDatepickerModule } from '@angular/material/datepicker';



// Module
import { Cmo084mwComponent } from './pages/cmo084mw/cmo084mw.component';

// Components
//import { MdlParomaquinaComponent } from './components/mdl-paromaquina/mdl-paromaquina.component';



import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@shtian/ng-pick-datetime';
import { Cmo085mwComponent } from './pages/cmo085mw/cmo085mw.component';
//import { MdlreservacargaComponent } from './components/mdlreservacarga/mdlreservacarga.component';



export class DefaultIntl extends OwlDateTimeIntl {
  cancelBtnLabel = 'Cancelar';
  setBtnLabel = 'Seleccionar';
}

@NgModule({
  declarations: [Cmo084mwComponent, Cmo085mwComponent],
  imports: [
    CommonModule,
    ModLaminaTercerosRoutingModule,
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


//ModreservacargaModule
// modLaminaTerceros.module
export class ModlaminatercerosModule { }
