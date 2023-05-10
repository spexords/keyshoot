import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureComponent } from './measure.component';
import { MeasureRoutingModule } from './measure-routing.module';
import { StatsRectComponent } from './stats-rect/stats-rect.component';
import { TextTyperComponent } from './text-typer/text-typer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MeasureComponent,
    StatsRectComponent,
    TextTyperComponent
  ],
  imports: [
    CommonModule,
    MeasureRoutingModule,
    SharedModule
  ]
})
export class MeasureModule { }
