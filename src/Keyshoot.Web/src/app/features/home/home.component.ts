import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    console.log('home')
    // this.data = this.accountService.userData;
  }
}
