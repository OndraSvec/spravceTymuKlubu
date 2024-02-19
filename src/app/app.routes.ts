import { Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';

export const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
