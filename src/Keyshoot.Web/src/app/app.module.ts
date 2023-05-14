import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_URL } from './core/tokens/api-url.token';
import { environment } from 'src/environments/environment';
import { HUBS_URL } from './core/tokens/hub-url.token';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule],
  providers: [
    {provide: API_URL, useValue: environment.apiUrl},
    {provide: HUBS_URL, useValue: environment.hubsUrl},

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
