import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-border',
  templateUrl: './view-border.component.html',
  styleUrls: ['./view-border.component.scss']
})
export class ViewBorderComponent implements OnInit, AfterViewInit {
  @ViewChild("outer", { static: false }) outer: ElementRef;
  radius = "";
  gradient = "";
  blur = "";
  opacity = 1;

  innerAnim = "";
  outerAnim = "";

  inWidth = 0;
  inHeight = 0;
  width = 0;
  height = 0;
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.radius = params.radius ? params.radius : 0;
      this.gradient = params.gradient ? params.gradient : "";
      this.innerAnim = params.innerAnim ? params.innerAnim : "";
      this.outerAnim = params.outerAnim ? params.outerAnim : "";
      this.blur = params.blur ? params.blur : 0;
      this.opacity = params.opacity ? params.opacity : 1;
    });
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.calculateSize();
  }

  calculateSize() {
    this.width = this.outer.nativeElement.offsetWidth;
    this.height = this.outer.nativeElement.offsetHeight;
    if (this.innerAnim.indexOf('spin') >= 0) {
      this.inWidth = Math.ceil(Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2))) + 100;
      this.inHeight = this.inWidth;
    } else {
      this.inWidth = this.width;
      this.inHeight = this.height;
    }
    this.cdr.detectChanges();
  }
}
