import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GradientService } from 'src/app/services/gradient/gradient.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  gradient: string;
  width = 1920;
  height = 1080;
  radius = 0;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  PrevieGradient(gradient) {
    this.gradient = gradient;
    this.cdr.detectChanges();
  }

}
