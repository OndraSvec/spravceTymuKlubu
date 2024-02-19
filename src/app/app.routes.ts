import { Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { TeamsComponent } from './teams/teams.component';
import { LineUpsComponent } from './line-ups/line-ups.component';

export const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
  },
  {
    path: 'teams',
    component: TeamsComponent,
  },
  {
    path: 'lineups',
    component: LineUpsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
