import { Component, OnInit, inject } from '@angular/core';
import { Team } from './team.type';
import { Member } from '../members/member.type';
import { forkJoin } from 'rxjs';
import { ClubService } from '../services/club.service';
import { TeamComponent } from './team/team.component';
import { MessageDisplayerComponent } from '../components/message-displayer/message-displayer.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../components/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [LoadingSpinnerComponent, MessageDisplayerComponent, TeamComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit {
  private clubService: ClubService = inject(ClubService);
  private dialog: MatDialog = inject(MatDialog);
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

  // Arrow function so as not to lose the context of 'this'
  onDelete = (teamId: string) => {
    this.teams = this.teams.filter((team) => team.id !== teamId);
    return this.clubService.deleteTeam(teamId);
  };

  // Arrow function so as not to lose the context of 'this'
  openDialog = (editMode: boolean, team: Team) => {
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      data: { editMode, team },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.editMode) {
          this.teams = this.teams.map((team) =>
            team.id === res.data.id
              ? {
                  ...team,
                  name: res.data.name,
                }
              : team
          );
        } else {
          // Use concat to trigger the OnChanges mechanism
          // this.members = ([] as Member[]).concat(sortMembers(this.members));
        }
      }
    });
  };
}
