import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  signal,
} from '@angular/core';

const EMPTY_STRING = ' ';

@Component({
  selector: 'app-text-typer',
  templateUrl: './text-typer.component.html',
  styleUrls: ['./text-typer.component.scss'],
})
export class TextTyperComponent {
  @ViewChild('input') input!: ElementRef;
  pastWords = ['Ala', 'ma', 'super', 'kota'];
  wordsToType = [
    'kot',
    'ali',
    'jest',
    'kotem',
    'fajnym',
    ',zostal',
    'na',
    'drzewie',
    'i',
    'miauczy',
  ];

  currentInput = signal('');

  currentWord = computed(() => {
    const word = this.wordsToType[0];
    const inputWord = this.currentInput();
    let i = 0;
    for (i = 0; i < inputWord.length && i < word.length; i++) {
      if (inputWord[i] !== word[i]) {
        break;
      }
    }
    return word.substring(i);
  });

  validInput = computed(() => {
    const inputWord = this.currentInput();
    const word = this.wordsToType[0];
    return (
      word[0] === inputWord[0] &&
      word.includes(inputWord) &&
      inputWord.length <= word.length
    );
  });

  get restWords(): string[] {
    return this.wordsToType.slice(1);
  }

  onInputChange(event: Event): void {
    const e = event as InputEvent;
    this.input.nativeElement.value = '';
    const value = e.data;
    if (value === EMPTY_STRING) {
      return;
    }

    this.currentInput.update((input) => input + value);
  }

  handleSpaceKey(): void {
    this.pastWords.push(this.currentInput());
    this.wordsToType.splice(0, 1);
    this.currentInput.set('');
  }

  handleBackspaceKey(): void {
    this.currentInput.update((input) => input.slice(0, -1));
  }
}
