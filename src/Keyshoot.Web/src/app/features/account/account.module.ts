import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class AccountModule {}
