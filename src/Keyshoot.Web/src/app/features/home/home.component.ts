import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from './models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  sections: HeroSection[] = [
    {
      header: 'Check your capabilities and performance!',
      description: 'Measure your speed and accuracy using Keyshoot. Use your results to see how far a proper typing method could take you. Have a good time and climb to be rank no. 1.',
      image: 'assets/illustrations/growth.svg',
      reverse: false
    },
    {
      header: 'Why should you take a typing speed test?',
      description: 'To find out your typing speed and accuracy, to understand whether you need to improve something. The average typing speed is 40 WPM, try to exceed it! You can take the test several times and see your typing speed improve over time.',
      image: 'assets/illustrations/clock.svg',
      reverse: true
    },
    {
      header: 'How do we measure a typing speed?',
      description: 'We measure your typing speed in WPM (words per minute). It is a calculation of how fast you type words with no typos. We mean by the "word" an average of 5 characters including spaces. We measure gross speed in our typing test.',
      image: 'assets/illustrations/stats.svg',
      reverse: false
    }
  ]
}
