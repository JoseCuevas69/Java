import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReporteartmedidasService } from '../../../../services/Programacion/reporteartmedidas.service';
//import { TipoIndustria } from 'src/app/models/Programacion/ReporteArticuloMedidas/tabla-TipoIndustria'
import { OrdenarPor } from 'src/app/models/Programacion/ReporteArticuloMedidas/tabla_OrdenarPor';
import { IArticulosMaster  } from 'src/app/models/Programacion/ReporteArticuloMedidas/IArticulosMaster';
import { IArticulosMasterParametros  } from 'src/app/models/Programacion/ReporteArticuloMedidas/IArticulosMasterParametros';

import swal from 'sweetalert2';
import { IClaveDescripcion } from 'src/app/models/Programacion/ReporteArticuloMedidas/IClaveDescripcion';
import { now } from 'lodash-es';

interface Filtros {
  filtro: string;
}

@Component({
  selector: 'app-FCAPROG002RW',
  templateUrl: './FCAPROG002RW.component.html',
  styleUrls: ['./FCAPROG002RW.component.css']
})



export class Fcaprog002rwComponent implements OnInit {

  // PPricipal
  filtros: Filtros = { filtro: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  Datos: Array<IArticulosMaster> = [
    {
      industria: '',
      op: '',
      ancho: null,
      largo: null,
      clavearticulo: '',
      fecha: null,
      articulo: '',
      resistencia: '',
      flauta: '',
    }
  ];

  //valueFormatter: this.datepipe.transform(this.Datos[0].fecha, 'dd/MM/yyyy') 

  @Input() set Datos2(value: any) {
    if (Object.keys(value).length !== 0) {
      this.DatosParametros = value;
    }
  }
  
  
DatosParametros: IArticulosMasterParametros = 
  {
        TipoDeConsulta: '',
        Ancho: null,
        AnchoMin: 0,
        AnchoMax: 0,
        Largo: null,
        LargoMin: 0,
        LargoMax: 0,
        TipoIndustria: 'AGR',
        FechaIni: null,
        FechaFin: null,
        OrderByfiltro1: 'Ancho',
        OrderByfiltro2: '',
        OrderByfiltro3: '',
        OrderBy: ''
  }
;

  DataTipoIndustria : Array<IClaveDescripcion>;

  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';


  //tipoIndustria = TipoIndustria;
  ordenarPor = OrdenarPor;
  
  constructor(public Servicio: ReporteartmedidasService) {
    
    
    this.columnDefs = [
      {
        headerName: 'industria',
        field: 'industria',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
        sortable: true,
      },
      {
        headerName: 'op',
        field: 'op',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        sortable: true,
      },
      {
        headerName: 'largo',
        field: 'largo',
        flex: 3,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        sortable: true,
      },
      {
        headerName: 'ancho',
        field: 'ancho',
        flex: 4,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        sortable: true,
      },
      {
        headerName: 'Cve. Art.',
        field: 'clavearticulo',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      { 
        headerName: 'Fecha Prod.',
        field: 'fecha',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        sortable: true,
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString('en-GB') : '';
      }
      },
      {
        headerName: 'Artículo',
        field: 'articulo',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        sortable: true,
      },
      {
        headerName: 'Resistencia',
        field: 'resistencia',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        sortable: true,

      },
      {
        headerName: 'Flauta',
        field: 'flauta',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center',

      },
    ];
  }
 
  SetFirstAndLastDayOfMonth():void{
    var date = new Date();
    this.DatosParametros.FechaIni =  new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substr(0, 10);
    this.DatosParametros.FechaFin =  date.toISOString().substr(0, 10);
  }




  LoadTipoIndustria() {
    this.Servicio.GetDataTipoIndustria().subscribe(
      (data: any) => {
        this.DataTipoIndustria = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar Tipos de Industria, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
      );
    }
    
  
  tempTipoIndustria  :string;
  Validaciones(): any {
    let rbCajas = (<HTMLInputElement>document.getElementById('rbCajas'));
    this.DatosParametros.TipoDeConsulta = (rbCajas.checked) ? 'Cajas' : 'Lamina';
    
    
    // Tipo de Industria
    let chkTipoIndustria = (<HTMLInputElement>document.getElementById('chkTipoIndustria'));
    //let 
    this.tempTipoIndustria = this.DatosParametros.TipoIndustria;
    if (!chkTipoIndustria.checked){
      this.DatosParametros.TipoIndustria = null;
    }


    // Validaciones largo y ancho
    // Largo
    let chkLargo = (<HTMLInputElement>document.getElementById('chkLargo'));
    if (chkLargo.checked){
      this.DatosParametros.LargoMin = Number(this.DatosParametros.Largo) - (Number(this.DatosParametros.Largo) * 0.1);
      this.DatosParametros.LargoMax = Number(this.DatosParametros.Largo) + (Number(this.DatosParametros.Largo) * 0.1);
    }else{
      // si no esta marcado el check, le pasamos el mismo valor como maximo y minimo
      if (this.DatosParametros.Largo > 0){
        this.DatosParametros.LargoMin = Number(this.DatosParametros.Largo);
        this.DatosParametros.LargoMax = Number(this.DatosParametros.Largo);
      }else{
        this.DatosParametros.LargoMin = null;
        this.DatosParametros.LargoMax = null;
      }
    }

    // Ancho
    let chkAncho = (<HTMLInputElement>document.getElementById('chkAncho'));
    if (chkAncho.checked){
      this.DatosParametros.AnchoMin = Number(this.DatosParametros.Ancho) - (Number(this.DatosParametros.Ancho) * 0.1);
      this.DatosParametros.AnchoMax = Number(this.DatosParametros.Ancho) + (Number(this.DatosParametros.Ancho) * 0.1);
    }else{
      // si no esta marcado el check, le pasamos el mismo valor como maximo y minimo
      if (this.DatosParametros.Ancho > 0){
        this.DatosParametros.AnchoMin = Number(this.DatosParametros.Ancho);
        this.DatosParametros.AnchoMax = Number(this.DatosParametros.Ancho);
      }else{
        this.DatosParametros.AnchoMin = null;
        this.DatosParametros.AnchoMax = null;
      }
    }
    

    // --------------------------------------------------------------------
    // validaciones de fecha ya no aplica, siempre se debe indicar un rango
    // --------------------------------------------------------------------
    
    // Valida si selecciona Información por Fechas de Producción
    // si no esta marcado el check, se van null
    // let chkFechas = (<HTMLInputElement>document.getElementById('chkFechas'));
    // if (chkFechas.checked === false){
    //   // se validaba por zona en el modulo migrado pero eso ahora lo aplico en el SP (05 -> B.fechaGen, otras zonas -> B.fecha)
    //     this.DatosParametros.FechaIni = null;
    //     this.DatosParametros.FechaFin = null;
    //    }
    

    // filtros del ORDER BY
    let filtro1 = this.DatosParametros.OrderByfiltro1;
    let filtro2 = this.DatosParametros.OrderByfiltro2;
    let filtro3 = this.DatosParametros.OrderByfiltro3;

    //this.DatosParametros.OrderBy = filtro1 + (filtro2 !== "" ? ', ' + filtro2 : "") + (filtro3 !== "" ? ', ' + filtro3 : "");
    this.DatosParametros.OrderBy = filtro1 + (filtro2 !== "" ? '|' + filtro2 : "") + (filtro3 !== "" ? '|' + filtro3 : "");

    
  }
  // Le enviamo el modelo al SP para que cargue con los filtros indicados.
  GetData(): any{

    this.Validaciones();

    this.Servicio.GetDataArticulosMaster(this.DatosParametros).subscribe(
      (data: any) => {
        this.Datos = data.data
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Articulos Master, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    )

    // Setear valor que tenian
    this.DatosParametros.TipoIndustria = this.tempTipoIndustria;
    
  }
  

  ReporteArticulosMaster(): void {
    
    var pZona = localStorage.getItem('Zona');
    this.Validaciones();

    /*
  let  urlReporte="http://intranet2.cecso.com.mx/erpweb2012/Sistemas/ASS005MW/OpenSRS.aspx?"+
    "servidorSRS=http://datosnv2008.cecso.com.mx/ReportServer&usuarioSRS=reportes&pswSRS=reportes&NombreSRS=Prueba_Manuel&"+
    "rutaSRS=/Cajas01/Prueba/Prueba_Manuel&parametrosSRS=" +
    "Zona?01" +
    */
   // localStorage.setItem('pZona', this.UserJwt.Zona);
    
    let  urlReporte="http://intranet2.cecso.com.mx/erpweb2012/Sistemas/ASS005MW/OpenSRS.aspx?servidorSRS="+
                "http://datos.cecso.com.mx/ServerRS&usuarioSRS=reportes&pswSRS=R3portes16&NombreSRS=FCAPROG007RS&rutaSRS="+
                "/FCACAJAS" + pZona + "/FCAPROGRAMACION/FCAPROG007RS&parametrosSRS=" +
    "Zona?" + pZona +
    ((this.DatosParametros.TipoDeConsulta===null)?"":",TipoDeConsulta?" + this.DatosParametros.TipoDeConsulta) +
    ((this.DatosParametros.AnchoMin===null)?"":",AnchoMin?" + this.DatosParametros.AnchoMin) +
    ((this.DatosParametros.AnchoMax===null)?"":",AnchoMax?" + this.DatosParametros.AnchoMax) +
    ((this.DatosParametros.LargoMin===null)?"":",LargoMin?" + this.DatosParametros.LargoMin) +
    ((this.DatosParametros.LargoMax===null)?"":",LargoMax?" + this.DatosParametros.LargoMax) +
    ((this.DatosParametros.TipoIndustria===null)?"":",TipoIndustria?" + this.DatosParametros.TipoIndustria) +
    ",FechaIni?" + this.DatosParametros.FechaIni +
    ",FechaFin?" + this.DatosParametros.FechaFin +
    ((this.DatosParametros.OrderBy===null)?"":",OrderBy?" + this.DatosParametros.OrderBy) +
    "&val=ITEwISE5IYm6EzYVbD1SSzdhl50s";
    //ITEwISE5IYm6EzYVbEfJq0iuWExA -> NO oculta el header donde se ponen los parametros en reporte
    //ITEwISE5IYm6EzYVbD1SSzdhl50s -> oculta el header donde se ponen los parametros en reporte

    //let urlReporte: string = "http://datos.cecso.com.mx/ServerRS/Pages/ReportViewer.aspx?/FCACajas01/FCAPROGCAT020RW/FCAPROGCAT020RW&rs:Command=Render"
    window.open(urlReporte, "_blank");

  }


  habiltarCboTipoIndustria(event):void{
    let cboTipoIndustria = document.getElementById('cboTipoIndustria');
    (<HTMLInputElement>cboTipoIndustria).disabled=!event.target.checked;
  }
  habiltarDatePickers(event):void{
    let dttFechaInicial = document.getElementById('dttfechaInicial');
    let dttfechaFinal = document.getElementById('dttfechaFinal');
    (<HTMLInputElement>dttFechaInicial).disabled=!event.target.checked;
    (<HTMLInputElement>dttfechaFinal).disabled=!event.target.checked;
  }
  habiltarValores(event, numberChk: number):void{
    let txtLargo = document.getElementById('txtLargo');
    let txtAncho = document.getElementById('txtAncho');
    // valido para check = 1
    if (numberChk === 1)
      (<HTMLInputElement>txtLargo).disabled=!event.target.checked;
    // valido para check = 2
    if (numberChk === 2)
      (<HTMLInputElement>txtAncho).disabled=!event.target.checked;
  }

  // chklargo
  ngOnInit(): void { 

    this.SetFirstAndLastDayOfMonth();
    this.LoadTipoIndustria();
    //this.GetData();
    
    
  }

  // =================Grid=================//
  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;
    this.mdl.openModal();
  }

  // =================PPrincipal=================//
  btnBuscar(): void {
    this.Grid.refreshData();
  }

  // =================Modal=================//
  btnCerrarModal(): void {
    this.btnBuscar();
    this.mdl.closeModal();
  }

  
}



