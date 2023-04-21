import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  text?: string;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getTestMessage().subscribe((text) => (this.text = text));
  }
}
