import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';



const routes: Routes = [
  {
    path: 'auth/:module/:component',
    component: AuthComponent
  },
  {
    path: 'auth/:module',
    component: AuthComponent
  },
  {
    path: 'tipocaja',
    loadChildren: () =>
      import('./modules/cattipocaja/cattipocaja.module').then(
        (m) => m.CattipocajaModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'proceso',
    loadChildren: () =>
      import('./modules/catproceso/catproceso.module').then(
        (m) => m.CatprocesoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'paromaquina',
    loadChildren: () => import('./modules/modparomaquina/modparomaquina.module').then(m => m.ModparomaquinaModule),

  },
  {
    path: 'horariomaquina',
    loadChildren: () => import('./modules/cathorariomaquina/cathorariomaquina.module').then(m => m.CathorariomaquinaModule),
  },
  {
    path: 'combinaciones',
    loadChildren: () =>
      import('./modules/catcombinaciones/catcombinaciones.module').then(
        (m) => m.CatcombinacionesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'combinaciones',
    loadChildren: () =>
      import('./modules/catcombinaciones/catcombinaciones.module').then(
        (m) => m.CatcombinacionesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'desperdicios',
    loadChildren: () =>
      import('./modules/catdesperdicios/catdesperdicios.module').then(
        (m) => m.CatdesperdiciosModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'parametrosprogramacion',
    loadChildren: () =>
      import(
        './modules/modparametrosprogramacion/modparametrosprogramacion.module'
      ).then((m) => m.ModparametrosprogramacionModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'paros',
    loadChildren: () =>
      import(
        './modules/catparos/catparos.module'
      ).then((m) => m.CatparosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'medidashoja',
    loadChildren: () =>
      import(
        './modules/modmedidashoja/modmedidashoja.module'
      ).then((m) => m.ModmedidashojaModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'disponibilidadmaquina',
    loadChildren: () =>
      import(
        './modules/moddisponibilidadmaquina/moddisponibilidadmaquina.module'
      ).then((m) => m.ModdisponibilidadmaquinaModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'flautas',
    loadChildren: () => import('./modules/catflautas/catflautas.module').then(m => m.CatFlautaModule),
  },
  {
    path: 'capprodrepgerencial',
    loadChildren: () =>
      import(
        './modules/capprodrepgerencial/capprodrepgerencial.module'
    ).then((m) => m.CapprodrepgerencialModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'autorizarcombinacionpapel',
    loadChildren: () =>
      import(
        './modules/modautorizarcombinacionpapel/modautorizarcombinacionpapel.module'
      ).then((m) => m.ModautorizarcombinacionpapelModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'aprovechamientolamina',
    loadChildren: () =>
      import(
        './modules/modaprovechamientolamina/modaprovechamientolamina.module'
      ).then((m) => m.ModaprovechamientolaminaModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'importacionprogsolicitada',
    loadChildren: () =>
      import(
        './modules/modimportacionprogsolicitada/modimportacionprogsolicitada.module'
      ).then((m) => m.ModimportacionprogsolicitadaModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'secuenciacorrugadora',
    loadChildren: () =>
      import(
        './modules/modsecuenciacorrugadora/modsecuenciacorrugadora.module'
      ).then((m) => m.ModsecuenciacorrugadoraModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'catmaquinas',
    loadChildren: () => import('./modules/catmaquinas/catmaquinas.module').then(m => m.CatmaquinasModule),
    canActivate: [AuthGuard]
  },{
    path: 'estandares',
    loadChildren: () => import('./modules/modestandaresimp/modestandaresimp.module').then(m => m.ModestandaresimpModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rutaproceso',
    loadChildren: () => import('./modules/modrutaprocesos/modrutaprocesos.module').then(m => m.ModrutaprocesosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'consumorolloscorrugadora',
    loadChildren: () => import('./modules/repconsumorolloscorrugadora/consumorolloscorrugadora.module').then((m) => m.ConsumorolloscorrugadoraModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'combestandarpapel',
    loadChildren: () => import('./modules/estandarpapel/estandarpapel.module').then(m => m.EstandarpapelModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignacionmaquina',
    loadChildren: () => import('./modules/asignacionmaquina/asignacionmaquina.module').then(m => m.AsignacionmaquinaModule),
    canActivate: [AuthGuard]
  },
  //------------------------------------------------------------------------------------
  {
    path: 'reservacarga',
    loadChildren: () => import('./modules/modreservacarga/modreservacarga.module').then(m => m.ModreservacargaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'articulosespeciales',
    loadChildren: () => import('./modules/modarticulosespeciales/modarticulosespeciales.module').then(m => m.ModarticulosespecialesModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'papeles',
    loadChildren: () => import('./modules/catpapeles/catpapeles.module').then(m => m.CatpapelesModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'folioscombinacionestandar',
    loadChildren: () => import('./modules/modfolioscombinacionestandar/modfolioscombinacionestandar.module').then(m => m.ModfolioscombinacionestandarModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'laminaterceros',
    loadChildren: () => import('./modules/modLaminaTerceros/modLaminaTerceros.module').then(m => m.ModlaminatercerosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'varentorno',
    loadChildren: () => import('./modules/varentorno/varentorno.module').then(m => m.VarEntornoModule),
  },
  {
    path: 'reporteartmedidas',
    loadChildren: () => import('./modules/reporteartmedidas/reporteartmedidas.module').then((m) => m.ReporteartmedidasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'progauto',
    loadChildren: () => import('./modules/progauto/progauto.module').then((m) => m.ProgautoModule),
    canActivate: [AuthGuard]
  }
  //------------------------------------------------------------------------------------





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
