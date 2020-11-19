import { ColorComponent } from './color-component.model';
import { StopperPoint } from './stopper-point.model';

export interface Stopper {
    points: StopperPoint[],
    width: number,
    offset: number
}