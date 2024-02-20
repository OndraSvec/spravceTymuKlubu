import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ClubService } from '../services/club.service';
import { Subscription } from 'rxjs';
import { Member } from './member.type';
import { AgePipe } from '../pipes/age.pipe';
import { DateOfBirthPipe } from '../pipes/date-of-birth.pipe';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AsyncPipe } from '@angular/common';
import { MessageDisplayerComponent } from '../message-displayer/message-displayer.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatTableModule,
    AgePipe,
    AsyncPipe,
    DateOfBirthPipe,
    LoadingSpinnerComponent,
    MessageDisplayerComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit, OnDestroy {
  private clubService: ClubService = inject(ClubService);
  private membersSub!: Subscription;
  public members: Member[] = [];
  public columnsToDisplay = ['name', 'dob', 'age'];
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
}
