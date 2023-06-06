import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownTimer',
})
export class CountdownTimerPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const strMinutes = minutes.toString();
    const strSeconds = (value - minutes * 60).toString();
    return `${strMinutes.padStart(2, '0')}:${strSeconds.padStart(2, '0')}`
  }
}
