import { Component, OnInit, inject } from '@angular/core';
import { Team } from './team.type';
import { Member } from '../members/member.type';
import { forkJoin } from 'rxjs';
import { ClubService } from '../services/club.service';
import { TeamComponent } from './team/team.component';
import { MessageDisplayerComponent } from '../components/message-displayer/message-displayer.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [LoadingSpinnerComponent, MessageDisplayerComponent, TeamComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit {
  private clubService: ClubService = inject(ClubService);
  public teams: Team[] = [];
  public members: Member[] = [];
  public loading = false;
  public error = false;

  ngOnInit(): void {
    this.loading = true;
    forkJoin({
      membersReq: this.clubService.getMembers(),
      teamsReq: this.clubService.getTeams(),
    }).subscribe({
      next: ({ membersReq, teamsReq }) => {
        this.members = membersReq;
        this.teams = teamsReq;
        this.loading = false;
        console.log(this.members, this.teams);
      },
      error: () => (this.error = true),
    });
  }
}
