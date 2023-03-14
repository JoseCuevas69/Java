import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule } from '../../shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// routing.module
import { reporteartmedidasRoutingModule} from './reporteartmedidas-routing.module';
// component
import { Fcaprog002rwComponent } from './pages/FCAPROG002RW/FCAPROG002RW.component';
// Modal
//import { MdlReporteartmedidasComponent } from './components/mdl-reporteartmedidas/mdl-reporteartmedidas.component';


@NgModule({
  declarations: [Fcaprog002rwComponent/*, MdlReporteartmedidasComponent*/],
  imports: [
    CommonModule,
    reporteartmedidasRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})

export class ReporteartmedidasModule { }
