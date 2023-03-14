import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fcaprog010mwComponent } from './pages/fcaprog010mw/fcaprog010mw.component';
import { CommonModule } from '@angular/common';
import {SharedModule } from '../../shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';

// module
import { capprodrepgerencialRoutingModule} from './capprodrepgerencial-routing.module';

// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Modal
import { MdlCapprodrepgerencialComponent } from './components/mdl-capprodrepgerencial/mdl-capprodrepgerencial.component';




@NgModule({
  declarations: [ fcaprog010mwComponent, MdlCapprodrepgerencialComponent],
  imports: [
    CommonModule,
    capprodrepgerencialRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ]
})

export class CapprodrepgerencialModule { }
