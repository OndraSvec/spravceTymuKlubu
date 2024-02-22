import { Component, Input } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Member } from '../../members/member.type';
import { Team } from '../../teams/team.type';

@Component({
  selector: 'app-add-dbentry-button',
  standalone: true,
  imports: [MatFabButton, MatIcon],
  templateUrl: './add-dbentry-button.component.html',
  styleUrl: './add-dbentry-button.component.css',
})
export class AddDBEntryButtonComponent {
  public dummyMember = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    teamId: '',
    lineUpId: '',
    lineUpPosition: '',
    lineUpRole: [],
  };

  @Input('openDialog')
  openDialog!: (member: Member, editMode: boolean) => void;

  @Input('openTeamDialog')
  openTeamDialog!: (editMode: boolean, team: Team) => void;

  @Input('entry')
  entry!: string;
}
