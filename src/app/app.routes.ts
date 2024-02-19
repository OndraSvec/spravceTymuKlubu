import { Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { TeamsComponent } from './teams/teams.component';
import { LineUpsComponent } from './line-ups/line-ups.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Členové',
    component: MembersComponent,
  },
  {
    path: 'týmy',
    title: 'Týmy',
    component: TeamsComponent,
  },
  {
    path: 'soupisky',
    title: 'Soupisky',
    component: LineUpsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
