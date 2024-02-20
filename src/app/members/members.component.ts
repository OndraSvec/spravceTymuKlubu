import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClubService } from '../services/club.service';
import { Subscription } from 'rxjs';
import { Member } from './member.type';
import { AgePipe } from '../pipes/age.pipe';
import { DateOfBirthPipe } from '../pipes/date-of-birth.pipe';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AsyncPipe } from '@angular/common';
import { MessageDisplayerComponent } from '../message-displayer/message-displayer.component';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';

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
    LoadingSpinnerComponent,
    MessageDisplayerComponent,
    DialogComponent,
    MatMiniFabButton,
    MatIcon,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit, OnDestroy {
  private clubService: ClubService = inject(ClubService);
  private dialog: MatDialog = inject(MatDialog);
  private membersSub!: Subscription;
  public members: Member[] = [];
  public columnsToDisplay = ['name', 'dob', 'age', 'actions'];
  public loading = false;
  public error = false;

  ngOnInit(): void {
    this.loading = true;
    this.membersSub = this.clubService.getMembers().subscribe({
      next: (members) => {
        this.members = members;
        this.loading = false;
      },
      error: () => (this.error = true),
    });
  }

  ngOnDestroy(): void {
    this.membersSub.unsubscribe();
  }

  onDelete(id: string) {
    this.clubService.deleteMember(id);
    this.members = this.members.filter((member) => member.id !== id);
  }

  openDialog(member: Member) {
    const dialogRef = this.dialog.open(DialogComponent, { data: { member } });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.members = this.members.map((member) =>
          member.id === res.data.id
            ? {
                ...member,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                dob: res.data.dob,
              }
            : member
        );
      }
    });
  }
}
