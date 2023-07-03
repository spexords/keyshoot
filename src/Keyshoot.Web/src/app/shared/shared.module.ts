import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CountdownTimerPipe } from './pipes/countdown-timer.pipe';

@NgModule({
  declarations: [TextInputComponent, CountdownTimerPipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule,
    CountdownTimerPipe,
  ],
})
export class SharedModule {}
