import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-typer',
  templateUrl: './text-typer.component.html',
  styleUrls: ['./text-typer.component.scss']
})
export class TextTyperComponent {
  @ViewChild('input') input!: ElementRef;
  pastWords = ['Wegiel', 'drzewny', 'jest', 'super'];
  currentInput = '';
  currentWord = 'samba';
  wordsToType = 'samba jest tancem latynoamerykanskim, zostala wymyslona w chile lub'

  onInputChange(event: Event ) {
    const e = event as InputEvent;
    console.log(event)
    this.currentInput += e.data;
    this.input.nativeElement.value = '';
  }

}
