import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatList, MatListItem } from '@angular/material/list';
import { Member } from '../../members/member.type';
import { Team } from '../../teams/team.type';
import { LineUp } from '../../line-ups/line-up.type';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatExpansionModule,
    MatList,
    MatListItem,
    TableComponent,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.css',
})
export class ExpansionPanelComponent {
  @Input('inputMembers')
  inputMembers: Member[] = [];

  @Input('input')
  input!: Team | LineUp;

  @Input('description')
  description!: string;

  @Input('actionable')
  actionable!: boolean;

  @Input('editInput')
  editInput!: (editMode: boolean, input: Team | LineUp) => void;

  @Input('deleteInput')
  deleteInput!: () => void;

  @Input('columnsToDisplay')
  columnsToDisplay: string[] = [];

  @Input('titlesToDisplay')
  titlesToDisplay: string[] = [];
}
