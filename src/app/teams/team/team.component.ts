import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Team } from '../team.type';
import { Member } from '../../members/member.type';
import { OutputTeamMembersCountPipe } from '../../pipes/output-team-members-count.pipe';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [MatExpansionModule, OutputTeamMembersCountPipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  @Input('members')
  public members!: Member[];
  @Input('team')
  public team!: Team;
  public teamMembers: Member[] = [];

  ngOnInit(): void {
    this.teamMembers = this.members.filter(
      (member) => member.teamId === this.team.id
    );
  }
}
