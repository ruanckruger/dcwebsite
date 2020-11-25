import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { AnimationObj } from 'src/app/models/animation.model';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  @Input('visible') visible: boolean;
  @Input('animObs') animObs: AnimationObj[];
  @Input('activeAnimations') activeAnimations: string[];
  animationStrings: string[] = [];

  easeOptions: string[] = ['linear', 'ease', 'easeinout', 'easein', 'easeout'];

  @Output() UpdateAnimation = new EventEmitter<string[]>();
  @Output() UpdateActiveAnimation = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void { }

  addAnimation(anim: string) {
    if (this.activeAnimations.indexOf(anim) < 0) {
      this.activeAnimations.push(anim);
    } else {
      this.activeAnimations.splice(this.activeAnimations.indexOf(anim), 1);
    }
    this.updateAnimation();
  }

  updateAnimation() {
    this.animationStrings = [];
    this.activeAnimations.forEach((anim) => {
      this.animationStrings.push(this.animObjToStr(this.getAnimObjFromName(anim)));
    });
    this.UpdateAnimation.emit(this.animationStrings);
    this.UpdateActiveAnimation.emit(this.activeAnimations);
  }

  getAnimObjFromName(name: string): AnimationObj {
    return this.animObs.find(a => a.name == name);
  }

  animObjToStr(animObj: AnimationObj): string {
    return `${animObj.name} ${animObj.duration}ms ${animObj.delay}ms ${animObj.timing} infinite`
  }

  trimString(inString: string): string {
    return inString.trim().replace(/ +/g, "");
  }
}
