import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HowToComponent implements OnInit {
  infoVisible = false;
  modal: any;

  constructor(private modalService: NgbModal) {
    this.modalService.activeInstances.subscribe((list) => {
      list[0].on
    });
  }

  ngOnInit(): void {
  }

  hideInfo() {
    this.infoVisible = false;
  }

  showInfo(longContent) {
    this.infoVisible = true;
    this.modal = this.modalService.open(longContent, { scrollable: true, windowClass: 'wide-modal' });
  }
}
