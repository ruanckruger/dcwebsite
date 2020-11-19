import { ColorComponent } from './color-component.model';

export interface StopperPoint {
    color: ColorComponent,
    offset: number,
    percentage?: number
}