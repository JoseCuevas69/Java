//------------------------------------------
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { modparomaquinaRoutingModule } from './modparomaquina-routing.module';
import { BlockUIModule } from 'ng-block-ui';
// Material
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';


// Module
import { Fcaprog001mwComponent } from './pages/fcaprog001mw/fcaprog001mw.component';

// Components
import { MdlParomaquinaComponent } from './components/mdl-paromaquina/mdl-paromaquina.component';
import { Fcaprog019mwComponent } from './pages/fcaprog019mw/fcaprog019mw.component';
import { Fcaprog019mwsupComponent } from './pages/fcaprog019mwsup/fcaprog019mwsup.component';
import { Fcaprog018mwComponent } from './pages/fcaprog018mw/fcaprog018mw.component';
import { Fcaprog019mwimpComponent } from './pages/fcaprog019mwimp/fcaprog019mwimp.component';
import { DatePipe } from '@angular/common';
import { MdlfrmDesperdiciocptComponent } from './components/mdlfrm-desperdiciocpt/mdlfrm-desperdiciocpt.component';

@NgModule({
  declarations: [Fcaprog001mwComponent,MdlParomaquinaComponent,Fcaprog019mwComponent, Fcaprog018mwComponent, Fcaprog019mwsupComponent,Fcaprog019mwimpComponent,MdlfrmDesperdiciocptComponent],
  imports: [
    CommonModule,
    modparomaquinaRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatInputModule,
    BlockUIModule.forRoot()
  ],
  providers: [DatePipe]
})

export class ModparomaquinaModule { }



