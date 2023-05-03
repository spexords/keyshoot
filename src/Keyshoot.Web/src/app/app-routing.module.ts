import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./features/leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'measure',
    loadChildren: () => import('./features/measure/measure.module').then(m => m.MeasureModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
