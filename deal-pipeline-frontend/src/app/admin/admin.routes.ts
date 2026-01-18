import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { authGuard } from '../shared/guards/auth.guard';
import { roleGuard } from '../shared/guards/role.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'users/create',
    component: UserCreateComponent,
    canActivate: [authGuard, roleGuard],
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
