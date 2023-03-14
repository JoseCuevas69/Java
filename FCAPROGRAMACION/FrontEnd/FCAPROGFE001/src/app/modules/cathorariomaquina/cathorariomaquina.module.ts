//------------------------------------------
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import {SharedModule} from 'src/app/shared/shared.module';
import { cathorariomaquinaRoutingModule } from './cathorariomaquina-routing.module';
import { BlockUIModule } from 'ng-block-ui';


// Material
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatDatepickerModule } from '@angular/material/datepicker';



// Module
import { Fcaprogcat006cwComponent } from './pages/fcaprogcat006cw/fcaprogcat006cw.component';

// Components
//import { MdlParomaquinaComponent } from './components/mdl-paromaquina/mdl-paromaquina.component';



import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@shtian/ng-pick-datetime';



export class DefaultIntl extends OwlDateTimeIntl {
  cancelBtnLabel = 'Cancelar';
  setBtnLabel = 'Seleccionar';
}

@NgModule({
  declarations: [Fcaprogcat006cwComponent],
  imports: [
    CommonModule,
    cathorariomaquinaRoutingModule,
    FormsModule,
    //SharedModule,
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


export class CathorariomaquinaModule { }