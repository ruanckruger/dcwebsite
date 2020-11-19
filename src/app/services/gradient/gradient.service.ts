import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StopperPoint } from 'src/app/models/stopper-point.model';
import { Stopper } from 'src/app/models/stopper.model';

@Injectable({
  providedIn: 'root'
})
export class GradientService {
  private gradientObs = new Subject<string>();
  public gradient$ = this.gradientObs.asObservable();

  constructor() { }

  setGradient(gradient: string) {
    this.gradientObs.next(gradient);
  }
}
