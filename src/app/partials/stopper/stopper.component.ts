import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnChanges, OnInit, Output, SimpleChange, ViewChild, ViewChildren } from '@angular/core';
import { ColorComponent } from 'src/app/models/color-component.model';
import { StopperPoint } from 'src/app/models/stopper-point.model';
import { Stopper } from 'src/app/models/stopper.model';
import { GradientService } from 'src/app/services/gradient/gradient.service';

@Component({
  selector: 'app-stopper',
  templateUrl: './stopper.component.html',
  styleUrls: ['./stopper.component.scss']
})
export class StopperComponent implements OnInit, AfterViewInit {
  @ViewChild('stopperEl') stopperEl: ElementRef;
  @ViewChildren('point') pointEls: Array<StopperPoint>;
  @Output() UpdateGradient = new EventEmitter<string>();
  stopper: Stopper;
  stopperInited = false;
  curPoint: StopperPoint = <StopperPoint>{};
  curColor: string = "rgba(122,122,122,1)";
  gradient: string = "";
  sliderGradient: string = "";
  curGradientStyle = "linear-gradient";
  gradientStyles: string[] = ["linear-gradient", "conic-gradient", "radial-gradient"];
  public majorTicks: Object;
  public minorTicks: Object;
  public labelStyle: Object;
  public animation: Object;
  public angle = 90;

  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.stopper = <Stopper>{ points: [] };
    this.initPoints();
    this.gradient = "";
    this.curColor = "rgba(122,122,122,1)";
    this.setupAngle();
  }

  setupAngle() {
    this.majorTicks = {
      interval: 90,
      color: '#777',
      height: 7,
      width: 2
    };
    this.minorTicks = {
      interval: 45,
      color: 'grey',
      height: 5,
      width: 1

    };
    this.labelStyle = {
      position: 'outside',
      hiddenLabel: 'First',
      font: {
        color: "transparent"
      }
    };
    this.animation = {
      enable: false
    }
  }

  ngAfterViewInit() {
    this.stopper.width = this.stopperEl.nativeElement.offsetWidth;
    this.stopper.offset = this.stopperEl.nativeElement.offsetLeft;
    this.stopperInited = true;
    this.cdr.detectChanges();
  }

  initPoints() {
    this.stopper.points.push({
      color: {
        r: 50,
        g: 50,
        b: 50,
        alpha: 1
      },
      offset: 10
    });

    this.stopper.points.push({
      color: {
        r: 210,
        g: 210,
        b: 210,
        alpha: 1
      },
      offset: 90
    });

    this.curPoint = this.stopper.points[0];
    this.curColor = this.getPointColor(this.curPoint);
  }

  percentChange(event) {
    this.stopper = event;
    this.generateGradient();
  }

  changeColor(event) {
    this.curPoint.color = this.getColorObject(event.currentValue.rgba);
    this.cdr.detectChanges();
    this.stopper.points.splice(this.stopper.points.findIndex(p => p == this.curPoint), 1);
    this.stopper.points.push(this.curPoint);
    // this.stopper.points.find(p => p == this.curPoint).color.rgba = event.currentValue.rgba;
    this.cdr.detectChanges();
    this.curColor = event.currentValue.rgba;

    this.generateGradient();
  }

  generateGradient() {
    this.stopper.points.sort((a, b) => a.percentage - b.percentage);
    if (this.curGradientStyle == "linear-gradient") {
      this.gradient = `${this.curGradientStyle}(${this.angle}deg, `;
    } else {
      this.gradient = `${this.curGradientStyle}(`;
    }
    this.sliderGradient = `linear-gradient(90deg, `;

    this.stopper.points.forEach((point, index) => {
      if (index != this.stopper.points.length - 1) {
        this.gradient += `${this.getPointColorAndPer(point)}, `;
        this.sliderGradient += `${this.getPointColorAndPer(point)}, `;
      } else {
        this.gradient += this.getPointColorAndPer(point);
        this.sliderGradient += this.getPointColorAndPer(point);
      }
    });
    this.gradient += ')';
    this.sliderGradient += ')';
    this.cdr.detectChanges();
    this.previeGradient();
  }

  addPoint(event) {
    let target = event.target;
    let offset = Math.round(event.clientX - target.offsetLeft) / target.offsetWidth * 100;

    let newPoint = <StopperPoint>{
      color: this.getColorObject(this.curColor),
      offset: offset
    }
    this.stopper.points.push(newPoint);
    this.curPoint = newPoint;
  }

  changeCurStopper(point) {
    this.curPoint = point;
    this.curColor = this.getPointColor(this.curPoint);
    this.cdr.detectChanges();
  }

  getColorObject(rgba): ColorComponent {
    let color = <ColorComponent>{};
    if (rgba != undefined) {
      let rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim();

      color.r = parseInt(rgb[1]);
      color.g = parseInt(rgb[2]);
      color.b = parseInt(rgb[3]);
      color.alpha = parseFloat(alpha);
      color.rgba = rgba;
    }
    return color;
  }

  getPointColor(point: StopperPoint) {
    return `rgba(${point.color.r},${point.color.g},${point.color.b},${point.color.alpha})`;
  }

  getPointColorAndPer(point: StopperPoint) {
    return `rgba(${point.color.r},${point.color.g},${point.color.b},${point.color.alpha}) ${point.percentage}%`;
  }

  rgba2hex(orig) {
    var a, isPercent,
      rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || "").trim(),
      hex = rgb ?
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    if (alpha !== "") {
      a = alpha;
    } else {
      a = 1;
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1)
    hex = hex + a;

    return hex;
  }

  hex2RgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 4) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2], c[3], c[3]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 32) & 255, (c >> 16) & 255, (c >> 8) & 255, ((c & 255) / 255).toFixed(2)].join(',') + ')';
    }
    throw new Error('Bad Hex');
  }

  previeGradient() {
    this.UpdateGradient.emit(this.gradient);
  }

  checkGaugeChange(event) {
    this.generateGradient();
  }

  test2(event) {
    this.angle = Math.round(event.currentValue);
    this.generateGradient();
  }

  setGradientStyle(style) {
    this.curGradientStyle = style;
    this.generateGradient();
  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.stopper.points.splice(this.stopper.points.findIndex(p => p == this.curPoint),1);
      this.curPoint = this.stopper.points[0];
      this.generateGradient();
    }
  }
}
