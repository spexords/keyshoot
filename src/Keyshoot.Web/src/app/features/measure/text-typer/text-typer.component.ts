import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { Word, WordState } from '../models';

const EMPTY_STRING = ' ';

@Component({
  selector: 'app-text-typer',
  templateUrl: './text-typer.component.html',
  styleUrls: ['./text-typer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextTyperComponent {
  @ViewChild('input') input!: ElementRef;
  @Input({ required: true }) pastWords!: Word[];
  @Input({ required: true }) futureWords!: Word[];
  @Input({ required: true }) set currentWord(word: Word) {
    this.currentInputSignal.set('');
    this.currentWordSignal.set(word.value);
  }
  @Output() wordSubmitted = new EventEmitter<string>();

  wordStates = WordState;
  currentInputSignal = signal('');
  currentWordSignal = signal('');
  currentWordDisplay = computed(() => {
    const inputWord = this.currentInputSignal();
    const word = this.currentWordSignal();
    let i = 0;
    for (i = 0; i < inputWord.length && i < word.length; i++) {
      if (inputWord[i] !== word[i]) {
        break;
      }
    }
    return word.substring(i);
  });

  validInput = computed(() => {
    const inputWord = this.currentInputSignal();
    const word = this.currentWordSignal();
    return word.startsWith(inputWord) && inputWord.length <= word.length;
  });

  onInputChange(event: Event): void {
    const e = event as InputEvent;
    this.input.nativeElement.value = '';
    const value = e.data;
    if (value === EMPTY_STRING) {
      return;
    }

    this.currentInputSignal.update((input) => input + value);
  }

  handleSpaceKey(): void {
    this.wordSubmitted.emit(this.currentInputSignal());
  }

  handleBackspaceKey(): void {
    this.currentInputSignal.update((input) => input.slice(0, -1));
  }

  focus(): void {
    this.input.nativeElement.focus();
  }
}
