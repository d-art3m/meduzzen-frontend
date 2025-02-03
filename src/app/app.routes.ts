import { Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', loadChildren: () => import('./domains/auth/auth.routes').then(m => m.routes) },
  { path: 'companies', loadChildren: () => import('./domains/companies/companies.routes').then(m => m.routes) },
  { path: 'users', loadChildren: () => import('./domains/users/users.routes').then(m => m.routes) },
  { path: '**', component: PageNotFoundComponent },
];
