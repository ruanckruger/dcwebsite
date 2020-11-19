import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBorderComponent } from './view-border.component';

describe('ViewBorderComponent', () => {
  let component: ViewBorderComponent;
  let fixture: ComponentFixture<ViewBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
