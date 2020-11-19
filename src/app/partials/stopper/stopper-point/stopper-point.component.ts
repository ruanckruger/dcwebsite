import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-inputs/src/textbox/textbox.component';
import { Observable } from 'rxjs';
import { ColorComponent } from 'src/app/models/color-component.model';
import { StopperPoint } from 'src/app/models/stopper-point.model';
import { Stopper } from 'src/app/models/stopper.model';
import { GradientService } from 'src/app/services/gradient/gradient.service';

@Component({
  selector: 'app-stopper-point',
  templateUrl: './stopper-point.component.html',
  styleUrls: ['./stopper-point.component.scss']
})
export class StopperPointComponent implements OnInit, OnChanges {
  _stopperPoint: StopperPoint;
  @Output() PercentageChange = new EventEmitter<Stopper>();
  @Output() SelectPoint = new EventEmitter<StopperPoint>();
  @Input('stopperPoint')
  set stopperPoint(stopperPoint: StopperPoint) {
    this._stopperPoint = stopperPoint;
    this.updateColor(stopperPoint.color.rgba)
  }
  get stopperPoint() { return this._stopperPoint; };
  @Input() stopper: Stopper;
  dragPosition = { x: 0, y: 0 };
  percentage: number = 0;
  constructor(gradientService: GradientService) { }

  ngOnInit(): void {
    this.dragPosition.x = (this._stopperPoint.offset / 100 * this.stopper.width);
    this.percentage = Math.round(this.dragPosition.x / this.stopper.width * 100);
    this.changePercentage();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'stopper') {
        this.stopper = changes[propName].currentValue
      }
      if (propName === 'stopperPoint') {
        this._stopperPoint = changes[propName].currentValue
      }
    }
  }

  updateColor(rgba) {
    if (rgba != undefined) {
      let rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim();
      this._stopperPoint.color.r = parseInt(rgb[1]);
      this._stopperPoint.color.g = parseInt(rgb[2]);
      this._stopperPoint.color.b = parseInt(rgb[3]);
      this._stopperPoint.color.alpha = parseFloat(alpha);
      this._stopperPoint.color.rgba = rgba;
    }
  }

  changePercentage() {
    this.stopper.points.find(p => p == this._stopperPoint).percentage = this.percentage;
    this.PercentageChange.emit(this.stopper);
  }

  selectPoint(e) {
    e.stopPropagation();
    this.SelectPoint.emit(this._stopperPoint);
  }

  dragMoved(event) {
    this.percentage = Math.round((event.pointerPosition.x - this.stopper.offset) / this.stopper.width * 100);
    this.changePercentage();
  }
}
