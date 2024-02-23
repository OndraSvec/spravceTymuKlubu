import { Component, OnInit, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClubService } from '../services/club.service';
import { forkJoin } from 'rxjs';
import { Member } from './member.type';
import { AgePipe } from '../pipes/age.pipe';
import { DateOfBirthPipe } from '../pipes/date-of-birth.pipe';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { AsyncPipe } from '@angular/common';
import { MessageDisplayerComponent } from '../components/message-displayer/message-displayer.component';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogComponent } from '../components/dialog/dialog.component';
import { AddDBEntryButtonComponent } from '../components/add-dbentry-button/add-dbentry-button.component';
import {
  datePickerFormatter,
  filterMembers,
  sortMembers,
} from '../../utils/helpers';
import { Team } from '../teams/team.type';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    AddDBEntryButtonComponent,
    AgePipe,
    AsyncPipe,
    DateOfBirthPipe,
    DialogComponent,
    LoadingSpinnerComponent,
    MatDialogModule,
    MatIcon,
    MatList,
    MatListItem,
    MatMiniFabButton,
    MatTableModule,
    MessageDisplayerComponent,
    SearchBarComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit {
  private clubService: ClubService = inject(ClubService);
  private teams: Team[] = [];
  private dialog: MatDialog = inject(MatDialog);
  public members: Member[] = [];
  public filteredMembers: Member[] = [];
  public columnsToDisplay = ['name', 'dob', 'age', 'actions'];
  public titlesToDisplay = ['Jméno', 'Datum narození', 'Věk', 'Akce'];
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
        this.filteredMembers = membersReq;
        this.teams = teamsReq;
        this.loading = false;
      },
      error: () => (this.error = true),
    });
  }

  onSearch(searchVal: string) {
    this.filteredMembers = filterMembers(this.members, searchVal);
  }

  onDelete(id: string) {
    this.clubService.deleteMember(id);
    this.members = this.members.filter((member) => member.id !== id);
  }

  // Use an arrow function so as not to lose 'this'
  openDialog = (member: Member, editMode: boolean) => {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { member, editMode, teams: this.teams },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.editMode) {
          this.members = this.members.map((member) =>
            member.id === res.data.id
              ? {
                  ...member,
                  firstName: res.data.firstName,
                  lastName: res.data.lastName,
                  dob: datePickerFormatter(res.data.dob),
                  teamId: res.data.selectedTeam,
                  isInLineUp: res.data.isInLineUp ? res.data.isInLineUp : false,
                  lineUpRole:
                    res.data.lineUpRole && res.data.isInLineUp
                      ? res.data.lineUpRole
                      : [],
                  lineUpPosition:
                    res.data.lineUpPosition && res.data.isInLineUp
                      ? res.data.lineUpPosition
                      : '',
                }
              : member
          );
          this.filteredMembers = this.members;
        } else {
          this.members.push({
            ...res.data,
            dob: datePickerFormatter(res.data.dob),
            teamId: res.data.selectedTeam,
            isInLineUp: res.data.isInLineUp ? res.data.isInLineUp : false,
            lineUpRole: res.data.lineUpRole ? res.data.lineUpRole : [],
            lineUpPosition: res.data.lineUpPosition
              ? res.data.lineUpPosition
              : '',
          });
          // Use concat to trigger the OnChanges mechanism
          this.filteredMembers = this.members;
          this.filteredMembers = ([] as Member[]).concat(
            sortMembers(this.filteredMembers)
          );
        }
      }
    });
  };
}
