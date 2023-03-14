import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-pagina',
  templateUrl: './pie-pagina.component.html',
  styleUrls: ['./pie-pagina.component.css']
})
export class PiePaginaComponent implements OnInit {
  @Input() pVersion: string = '';
  @Input() pTitulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
