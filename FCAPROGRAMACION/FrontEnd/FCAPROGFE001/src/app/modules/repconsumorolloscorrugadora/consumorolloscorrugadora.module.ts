import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule } from '../../shared/shared.module';

// Material

// routing.module
import {consumorolloscorrugadoraRoutingModule} from './consumorolloscorrugadora-routing.module';

// Component
import {FCAPROG001RWComponent  } from './pages/fcaprog001-rw/fcaprog001-rw.component';




@NgModule({
  declarations: [FCAPROG001RWComponent],
  imports: [
    CommonModule,
    consumorolloscorrugadoraRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ConsumorolloscorrugadoraModule { }
