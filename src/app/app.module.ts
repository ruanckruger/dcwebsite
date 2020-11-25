import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SliderComponent } from './partials/slider/slider.component';
import { ColorPickerComponent } from './partials/color-picker/color-picker.component';
import { BuilderComponent } from './border/builder/builder.component';
import { ViewBorderComponent } from './border/view-border/view-border.component';
import { StopperComponent } from './partials/stopper/stopper.component';
import { StopperPointComponent } from './partials/stopper/stopper-point/stopper-point.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { GradientService } from './services/gradient/gradient.service';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

import { enableRipple } from '@syncfusion/ej2-base';
import { AnimationComponent } from './partials/animation/animation.component';
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './partials/nav/nav.component';
import { PromoComponent } from './partials/promo/promo.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './border/how-to/how-to.component';
enableRipple(true);

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ColorPickerComponent,
    BuilderComponent,
    ViewBorderComponent,
    StopperComponent,
    StopperPointComponent,
    AnimationComponent,
    NavComponent,
    PromoComponent,
    HomeComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DragDropModule,
    ColorPickerModule,
    CircularGaugeModule,
    FormsModule
  ],
  providers: [GradientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
