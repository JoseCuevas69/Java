import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fprocs',
  templateUrl: './fprocs.component.html',
  styleUrls: ['./fprocs.component.css']
})
export class FprocsComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() texto: string = '';

  @ViewChild('modal') modal: any;
  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalRef = this.modalService.open(this.modal, {
      size: 'md',
      backdrop: 'static',
      keyboard: false
    });
    this.modalRef.result.then(() => { });
  }

  closeModal(): void {
    this.modalRef.close();
  }

}
