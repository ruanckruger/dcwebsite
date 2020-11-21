import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-border',
  templateUrl: './view-border.component.html',
  styleUrls: ['./view-border.component.scss']
})
export class ViewBorderComponent implements OnInit {
  radius = "";
  gradient = "";
  blur = "";
  innerAnim = "";
  outerAnim = "";
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.radius = params.radius;
      this.gradient = params.gradient;
      this.innerAnim = params.innerAnim;
      this.outerAnim = params.outerAnim;
      this.blur = params.blur ? params.blur : 0;
    });

  }

}
