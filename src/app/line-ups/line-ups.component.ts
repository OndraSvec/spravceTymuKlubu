import { Component, inject } from '@angular/core';
import { ClubService } from '../services/club.service';
import { Team } from '../teams/team.type';
import { Member } from '../members/member.type';
import { forkJoin } from 'rxjs';
import { LineUpComponent } from './line-up/line-up.component';
import { MessageDisplayerComponent } from '../components/message-displayer/message-displayer.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-line-ups',
  standalone: true,
  imports: [
    LineUpComponent,
    LoadingSpinnerComponent,
    MessageDisplayerComponent,
  ],
  templateUrl: './line-ups.component.html',
  styleUrl: './line-ups.component.css',
})
export class LineUpsComponent {
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
      },
      error: () => (this.error = true),
    });
  }
}
