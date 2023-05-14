import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeroSection } from '../models';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  @Input() section!: HeroSection;
}
