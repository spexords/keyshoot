import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FooterComponent } from './footer/footer.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    FooterComponent,
    ForbiddenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
