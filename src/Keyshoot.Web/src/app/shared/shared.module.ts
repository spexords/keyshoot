import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CountdownTimerPipe } from './pipes/countdown-timer.pipe';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [TextInputComponent, CountdownTimerPipe, SelectComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    TextInputComponent,
    SelectComponent,
    ReactiveFormsModule,
    FormsModule,
    CountdownTimerPipe,
  ],
})
export class SharedModule {}
