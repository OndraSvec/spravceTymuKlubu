import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Team } from '../team.type';
import { Member } from '../../members/member.type';
import { OutputTeamMembersCountPipe } from '../../pipes/output-team-members-count.pipe';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { outputTeamMembersCount } from '../../../utils/helpers';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatExpansionModule,
    MatList,
    MatListItem,
    OutputTeamMembersCountPipe,
    ExpansionPanelComponent,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  @Input('members')
  public members!: Member[];

  @Input('team')
  public team!: Team;

  @Input('onDelete')
  onDelete!: (teamId: string) => void;

  @Input('openDialog')
  openDialog!: (editMode: boolean, team: Team) => void;

  public teamMembers: Member[] = [];
  public description!: string;

  ngOnInit(): void {
    this.teamMembers = this.members.filter(
      (member) => member.teamId === this.team.id
    );
    this.description = outputTeamMembersCount(
      this.teamMembers.length,
      this.team.name
    );
  }

  // Arrow function so as not to lose the context of 'this'
  deleteTeam = () => {
    this.onDelete(this.team.id);
  };

  // Arrow function so as not to lose the context of 'this'
  editTeam = (editMode: boolean, team: Team) => {
    this.openDialog(editMode, team);
  };
}
