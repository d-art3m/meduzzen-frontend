import { Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserProfileComponent },
];