import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureComponent } from './measure.component';
import { MeasureRoutingModule } from './measure-routing.module';

@NgModule({
  declarations: [
    MeasureComponent
  ],
  imports: [
    CommonModule,
    MeasureRoutingModule
  ]
})
export class MeasureModule { }
