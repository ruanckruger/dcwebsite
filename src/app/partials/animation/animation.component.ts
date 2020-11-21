import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { AnimationObj } from 'src/app/models/animation.model';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  activeAnimations: string[] = [];
  animations: string[] = ["spin", "pulse", "blur"];
  animationStrings: string[] = [];

  spinAnim = "";
  blurAnim = "";
  pulseAnim = "";

  spinObj = <AnimationObj>{ name: 'spin', timing: 'linear', duration: 7000, delay: 0 }
  blurObj = <AnimationObj>{ name: 'blur', timing: 'linear', duration: 3000, delay: 0 }
  pulseObj = <AnimationObj>{ name: 'pulse', timing: 'linear', duration: 4000, delay: 0 }
  hueObj = <AnimationObj>{ name: 'hue', timing: 'linear', duration: 4000, delay: 0 }
  // spinObj = <AnimationObj>{ name: 'spin', timing: 'linear', duration: 1000, delay: 0 }

  animObs: AnimationObj[];
  easeOptions: string[] = ['linear', 'ease', 'easeinout', 'easein', 'easeout'];

  @Output() UpdateAnimation = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
    this.animObs = [];
    this.animObs.push(this.spinObj);
    this.animObs.push(this.blurObj);
    this.animObs.push(this.pulseObj);
    this.animObs.push(this.hueObj);
  }

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
      if (anim == "spin") {
        this.animationStrings.push(this.animObjToStr(this.spinObj));
      }
      if (anim == "blur") {
        this.animationStrings.push(this.animObjToStr(this.blurObj));
      }
      if (anim == "pulse") {
        this.animationStrings.push(this.animObjToStr(this.pulseObj));
      }
      if (anim == "hue") {
        this.animationStrings.push(this.animObjToStr(this.hueObj));
      }
    });
    this.UpdateAnimation.emit(this.animationStrings);
  }

  animObjToStr(animObj: AnimationObj): string {
    return `${animObj.name} ${animObj.duration}ms ${animObj.delay}ms ${animObj.timing} infinite`
  }

  trimString(inString: string): string {
    return inString.trim().replace(/ +/g, "");
  }
}
