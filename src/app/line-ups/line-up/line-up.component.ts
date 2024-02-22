import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../teams/team.type';
import { Member } from '../../members/member.type';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { outputLineUpInfo } from '../../../utils/helpers';

@Component({
  selector: 'app-line-up',
  standalone: true,
  imports: [ExpansionPanelComponent],
  templateUrl: './line-up.component.html',
  styleUrl: './line-up.component.css',
})
export class LineUpComponent implements OnInit {
  @Input('members')
  public members!: Member[];

  @Input('team')
  public team!: Team;

  public lineUpMembers: Member[] = [];
  public description!: string;
  public tableColumns = ['name', 'lineUpRole', 'lineUpPosition'];
  public tableTitles = ['Jméno', 'Role', 'Pozice'];

  ngOnInit(): void {
    this.lineUpMembers = this.members.filter(
      (member) => member.teamId === this.team.id && member.isInLineUp
    );

    this.description = outputLineUpInfo(this.lineUpMembers, this.team.name);
  }
}
