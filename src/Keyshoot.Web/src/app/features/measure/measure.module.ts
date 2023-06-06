import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureComponent } from './measure.component';
import { MeasureRoutingModule } from './measure-routing.module';
import { StatsRectComponent } from './stats-rect/stats-rect.component';
import { TextTyperComponent } from './text-typer/text-typer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewMeasureModalComponent } from './new-measure-modal/new-measure-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FinishedMeasureModalComponent } from './finished-measure-modal/finished-measure-modal.component';

@NgModule({
  declarations: [
    MeasureComponent,
    StatsRectComponent,
    TextTyperComponent,
    NewMeasureModalComponent,
    FinishedMeasureModalComponent,
  ],
  imports: [CommonModule, MeasureRoutingModule, MatDialogModule, SharedModule],
})
export class MeasureModule {}
