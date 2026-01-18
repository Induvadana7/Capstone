import { Routes } from '@angular/router';

import { DealListComponent } from './pages/deal-list/deal-list.component';
import { DealCreateComponent } from './pages/deal-create/deal-create.component';
import { DealDetailComponent } from './pages/deal-detail/deal-detail.component';
import { DealEditComponent } from './pages/deal-edit/deal-edit.component';

import { authGuard } from '../shared/guards/auth.guard';

export const DEALS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: DealListComponent },
      { path: 'create', component: DealCreateComponent },
      { path: ':id', component: DealDetailComponent },
      { path: ':id/edit', component: DealEditComponent },
    ],
  },
];
