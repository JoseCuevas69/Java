import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera-pagina',
  templateUrl: './cabecera-pagina.component.html',
  styleUrls: ['./cabecera-pagina.component.css']
})
export class CabeceraPaginaComponent implements OnInit {
  @Input() pTitulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
