import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'custom-textbox',
  templateUrl: './custom-textbox.component.html',
  styleUrls: ['./custom-textbox.component.css']
})
export class CustomTextboxComponent implements OnInit {
  private textValue = '';
  @Input() textBoxId: string;
  @Input() maxlength: number | string = '';
  @Input() buttonId = '';
  @Input() placeholder = ' ';
  @Input() textBoxClass = '';
  @Input() buttonClass = 'btn btn-outline-secondary';
  @Input() iconClass = 'fas fa-search';
  @Input() closeClass = 'color-secondary';
  @Input() buttonType = 'button';
  @Input() autocomplete = true;
  @Input() enableSearch = false;
  @Input() focus = false;
  @Input() disabled = false;
  @Input() disabledButton = false;
  @Input() readonly = false;
  @Output() textBoxClick = new EventEmitter<any>();
  @Output() searchClick = new EventEmitter<any>();
  @Output() clearClick = new EventEmitter<any>();
  @Output() textChange = new EventEmitter<string>();
  @Input() get text(): string {
    return this.textValue;
  }
  set text(value: string) {
    this.textValue = value;
    this.textChange.emit(this.textValue);
  }

  constructor() { }

  ngOnInit(): void { }

  click(evt: any): void {
    this.textBoxClick.emit(evt);
  }

  search(evt: any): void {
    this.searchClick.emit(evt);
  }

  clear(evt: any): void {
    this.text = '';
    this.clearClick.emit(evt);
  }
}
