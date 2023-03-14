import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FloatLabelTextboxComponent } from './components/float-label-textbox/float-label-textbox.component';

import { RangedateselectionComponent } from './components/rangedateselection/rangedateselection.component';

// Achivos
import { NgccsArchivosModule } from 'ngccs-archivos';

// Grid
import { AgGridModule } from 'ag-grid-angular';
import { GridCsComponent } from './components/grid-cs/grid-cs.component';
import { GridSsComponent } from './components/grid-ss/grid-ss.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BtnCellRenderComponent } from './components/btn-cell-render/btn-cell-render.component';

// Directive
import { AgregarIdFTPDirective } from './directives/AgregarIdFTP.directive';
import { FocusDirective } from './directives/focus.directive';
import { OcultarDatosFTPDirective } from './directives/OcultarDatosFTP.directive';
import { OnlynumberDirective } from './directives/onlynumber.directive';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Componentes
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { BuscarUsuarioERPComponent } from './components/buscar-usuario-erp/buscar-usuario-erp.component';
import { Modal } from './components/mldusuario/mldusuario.component';
import { ModalEjecutivo } from './components/mldejecutivo/mldejecutivo.component';
import { ZonaComponent } from './components/zona/zona.component';
import { MldusuarioComponent } from './components/mldusuario/mldusuario.component';
import { MldejecutivoComponent } from './components/mldejecutivo/mldejecutivo.component';
import { LstejecutivoComponent } from './components/lstejecutivo/lstejecutivo.component';
import { TipoindustriaComponent } from './components/tipoindustria/tipoindustria.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { TipoclienteComponent } from './components/tipocliente/tipocliente.component';
import { ListaCFDIComponent } from './components/lista-cfdi/lista-cfdi.component';
import { ListaMonedasComponent } from './components/lista-monedas/lista-monedas.component';
import { ListaIVAComponent } from './components/lista-iva/lista-iva.component';
import { UmfacturacionComponent } from './components/umfacturacion/umfacturacion.component';
import { NgModalComponent } from './components/ng-modal/ng-modal.component';
import { ListaFormaPagoComponent } from './components/lista-forma-pago/lista-forma-pago.component';
import { ListaPaisComponent } from './components/lista-pais/lista-pais.component';
import { ListaEstadoComponent } from './components/lista-estado/lista-estado.component';
import { ListaCiudadComponent } from './components/lista-ciudad/lista-ciudad.component';
import { ListaCreditoComponent } from './components/lista-credito/lista-credito.component';
import { ListaRepresentantesComponent } from './components/lista-representantes/lista-representantes.component';
import { ListaAlmacenComponent } from './components/lista-almacen/lista-almacen.component';
import { ListaAlmacenstockComponent } from './components/lista-almacenstock/lista-almacenstock.component';
import { ListaTiporemisionadoComponent } from './components/lista-tiporemisionado/lista-tiporemisionado.component';
import { ListaDiasinventarioComponent } from './components/lista-diasinventario/lista-diasinventario.component';
import { ListaVariacionComponent } from './components/lista-variacion/lista-variacion.component';
import { ListaTipovariacionComponent } from './components/lista-tipovariacion/lista-tipovariacion.component';
import { CustomTextboxComponent } from './components/custom-textbox/custom-textbox.component';
import { ModalClientesProspectosComponent } from './components/modal-clientes-prospectos/modal-clientes-prospectos.component';
import { ModalResistenciasComponent } from './components/modal-resistencias/modal-resistencias.component';
import { InputCamposobligatoriosComponent } from './components/input-camposobligatorios/input-camposobligatorios.component';
import { ListaClasificacionComponent } from './components/lista-clasificacion/lista-clasificacion.component';
import { ModalRepresentantesComponent } from './components/modal-representantes/modal-representantes.component';
import { ListaTipodatoComponent } from './components/lista-tipodato/lista-tipodato.component';
import { CmbEditorComponent } from './components/cmb-editor/cmb-editor.component';
import { ListaUnidadmedidaComponent } from './components/lista-unidadmedida/lista-unidadmedida.component';
import { ListaAreasSolicitudComponent } from './components/lista-areas-solicitud/lista-areas-solicitud.component';
import { ListaTiposSolicitudComponent } from './components/lista-tipos-solicitud/lista-tipos-solicitud.component';
import { ModalContactosClienteComponent } from './components/modal-contactos-cliente/modal-contactos-cliente.component';
import { ChkCellRenderComponent } from './components/chk-cell-render/chk-cell-render.component';
import { HybridCellRenderComponent } from './components/hybrid-cell-render/hybrid-cell-render.component';
import { ListaTipoproductoComponent } from './components/lista-tipoproducto/lista-tipoproducto.component';
import { ListaSubcodigoComponent } from './components/lista-subcodigo/lista-subcodigo.component';
import { ListaResistenciasComponent } from './components/lista-resistencias/lista-resistencias.component';
import { ListaTipocajaComponent } from './components/lista-tipocaja/lista-tipocaja.component';
import { ListaTipograbadoComponent } from './components/lista-tipograbado/lista-tipograbado.component';
import { ListaPresentacionComponent } from './components/lista-presentacion/lista-presentacion.component';
import { ListaProcesosComponent } from './components/lista-procesos/lista-procesos.component';
import { ListaFlautaComponent } from './components/lista-flauta/lista-flauta.component';
import { ListaTipounionComponent } from './components/lista-tipounion/lista-tipounion.component';
import { ListaColorComponent } from './components/lista-color/lista-color.component';
import { ListaTipopaletizadoComponent } from './components/lista-tipopaletizado/lista-tipopaletizado.component';
import { ListaLlenadopalletComponent } from './components/lista-llenadopallet/lista-llenadopallet.component';
import { ListaTipopalletComponent } from './components/lista-tipopallet/lista-tipopallet.component';
import { ListaTintaComponent } from './components/lista-tinta/lista-tinta.component';
import {ListaConfigprocesoComponent} from './components/lista-configproceso/lista-configproceso.component';
import {ProveedorComponent} from './components/proveedor/proveedor.component';
import {ListaAcomodoComponent} from './components/lista-acomodo/lista-acomodo.component';
import {MdlbuscararticuloComponent} from './components/mdlbuscararticulo/mdlbuscararticulo.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import {ListaEstadossolicitudComponent} from './components/lista-estadossolicitud/lista-estadossolicitud.component';
import {ModalResponsableComponent} from './components/modal-responsable/modal-responsable.component';
import { ListaMetodoPagoComponent } from './components/lista-metodo-pago/lista-metodo-pago.component';
import { ListaMaestranoComponent } from './components/lista-maestrano/lista-maestrano.component';

import { PopupCellRendererComponent } from './components/popup-cell-renderer/popup-cell-renderer.component';
import { LabelcolCellRenderComponent } from './components/labelcol-cell-render/labelcol-cell-render.component';
@NgModule({
  declarations: [
    PaginationComponent,
    BtnCellRenderComponent,
    ChkCellRenderComponent,
    HybridCellRenderComponent,
    FloatLabelTextboxComponent,
    RangedateselectionComponent,
    GridCsComponent,
    GridSsComponent,
    FocusDirective,
    OnlynumberDirective,
    BuscarUsuarioERPComponent,
    Modal,
    ModalEjecutivo,
    ZonaComponent,
    MldusuarioComponent,
    MldejecutivoComponent,
    LstejecutivoComponent,
    TipoindustriaComponent,
    ImagenesComponent,
    TipoclienteComponent,
    ListaCFDIComponent,
    ListaMonedasComponent,
    ListaIVAComponent,
    UmfacturacionComponent,
    NgModalComponent,
    ListaFormaPagoComponent,
    ListaPaisComponent,
    ListaEstadoComponent,
    ListaCiudadComponent,
    AutoCompleteComponent,
    ListaCreditoComponent,
    ListaRepresentantesComponent,
    ListaAlmacenComponent,
    ListaAlmacenstockComponent,
    ListaTiporemisionadoComponent,
    ListaDiasinventarioComponent,
    ListaVariacionComponent,
    ListaTipovariacionComponent,
    CustomTextboxComponent,
    ModalClientesProspectosComponent,
    ModalResistenciasComponent,
    OcultarDatosFTPDirective,
    AgregarIdFTPDirective,
    InputCamposobligatoriosComponent,
    ListaClasificacionComponent,
    ModalRepresentantesComponent,
    CmbEditorComponent,
    ListaTipodatoComponent,
    CmbEditorComponent,
    ListaUnidadmedidaComponent,
    ListaAreasSolicitudComponent,
    ListaTiposSolicitudComponent,
    ModalContactosClienteComponent,
    HybridCellRenderComponent,
    ListaTipoproductoComponent,
    ListaSubcodigoComponent,
    ListaResistenciasComponent,
    ListaTipocajaComponent,
    ListaTipograbadoComponent,
    ListaPresentacionComponent,
    ListaProcesosComponent,
    ListaFlautaComponent,
    ListaTipounionComponent,
    ListaColorComponent,
    ListaTipopaletizadoComponent,
    ListaLlenadopalletComponent,
    ListaTipopalletComponent,
    ListaTintaComponent,
    ListaConfigprocesoComponent,
    ProveedorComponent,
    ListaAcomodoComponent,
    MdlbuscararticuloComponent,
    DatePickerComponent,
    ListaEstadossolicitudComponent,
    ModalResponsableComponent,
    ListaMetodoPagoComponent,
    ListaMaestranoComponent,
    PopupCellRendererComponent,
    LabelcolCellRenderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([
      BtnCellRenderComponent,
      ChkCellRenderComponent,
      HybridCellRenderComponent,
      CmbEditorComponent
    ]),
    NgccsArchivosModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PaginationComponent,
    BtnCellRenderComponent,
    ChkCellRenderComponent,
    HybridCellRenderComponent,
    CmbEditorComponent,
    FloatLabelTextboxComponent,
    RangedateselectionComponent,
    FocusDirective,
    GridCsComponent,
    GridSsComponent,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule,
    NgccsArchivosModule,
    OnlynumberDirective,
    BuscarUsuarioERPComponent,
    ZonaComponent,
    MldusuarioComponent,
    MldejecutivoComponent,
    LstejecutivoComponent,
    TipoindustriaComponent,
    ImagenesComponent,
    TipoclienteComponent,
    ListaCFDIComponent,
    ListaMonedasComponent,
    ListaIVAComponent,
    UmfacturacionComponent,
    NgModalComponent,
    ListaFormaPagoComponent,
    ListaPaisComponent,
    ListaEstadoComponent,
    ListaCiudadComponent,
    ListaCreditoComponent,
    ListaRepresentantesComponent,
    ListaAlmacenComponent,
    ListaAlmacenstockComponent,
    ListaTiporemisionadoComponent,
    ListaDiasinventarioComponent,
    ListaVariacionComponent,
    ListaTipovariacionComponent,
    OcultarDatosFTPDirective,
    CustomTextboxComponent,
    ModalClientesProspectosComponent,
    ModalResistenciasComponent,
    CustomTextboxComponent,
    ModalClientesProspectosComponent,
    ModalResistenciasComponent,
    AgregarIdFTPDirective,
    InputCamposobligatoriosComponent,
    ListaClasificacionComponent,
    ModalRepresentantesComponent,
    ListaTipodatoComponent,
    ListaUnidadmedidaComponent,
    ListaAreasSolicitudComponent,
    ListaTiposSolicitudComponent,
    ModalContactosClienteComponent,
    ListaTipoproductoComponent,
    ListaSubcodigoComponent,
    ListaResistenciasComponent,
    ListaTipocajaComponent,
    ListaTipograbadoComponent,
    ListaPresentacionComponent,
    ListaFlautaComponent,
    ListaProcesosComponent,
    ListaTipounionComponent,
    ListaColorComponent,
    ListaLlenadopalletComponent,
    ListaTipopaletizadoComponent,
    ListaTipopalletComponent,
    ListaTintaComponent,
    ListaConfigprocesoComponent,
    ProveedorComponent,
    ListaAcomodoComponent,
    MdlbuscararticuloComponent,
    DatePickerComponent,
    ListaEstadossolicitudComponent,
    ModalResponsableComponent,
    ListaMetodoPagoComponent,
    ListaMaestranoComponent
  ],
  bootstrap: [RangedateselectionComponent]
})
export class SharedModule { }
