import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopperPointComponent } from './stopper-point.component';

describe('StopperPointComponent', () => {
  let component: StopperPointComponent;
  let fixture: ComponentFixture<StopperPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopperPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopperPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
