import { Component, OnInit, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { datePickerFormatter, sortMembers } from '../../utils/helpers';
import { Team } from '../teams/team.type';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatDialogModule,
    MatTableModule,
    AgePipe,
    AsyncPipe,
    DateOfBirthPipe,
    AddDBEntryButtonComponent,
    LoadingSpinnerComponent,
    MessageDisplayerComponent,
    DialogComponent,
    MatMiniFabButton,
    MatIcon,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit {
  private clubService: ClubService = inject(ClubService);
  private teams: Team[] = [];
  protected dialog: MatDialog = inject(MatDialog);
  protected dialogRef!: MatDialogRef<DialogComponent, any>;
  public members: Member[] = [];
  public columnsToDisplay = ['name', 'dob', 'age', 'actions'];
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
                }
              : member
          );
        } else {
          this.members.push({
            ...res.data,
            dob: datePickerFormatter(res.data.dob),
            teamId: res.data.selectedTeam,
            lineUpId: '',
            lineUpPosition: '',
            lineUpRole: [],
          });
          // Use concat to trigger the OnChanges mechanism
          this.members = ([] as Member[]).concat(sortMembers(this.members));
        }
      }
    });
  };
}
