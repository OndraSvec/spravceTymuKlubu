import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Member } from '../../members/member.type';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input('inputMembers')
  inputMembers: Member[] = [];

  @Input('columnsToDisplay')
  columnsToDisplay: string[] = [];

  @Input('titlesToDisplay')
  titlesToDisplay: string[] = [];
}
