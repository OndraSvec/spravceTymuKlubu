import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ClubService } from '../services/club.service';
import { Subscription } from 'rxjs';
import { Member } from './member.type';
import { AgePipe } from '../pipes/age.pipe';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MatList, MatListItem, MatTableModule, AgePipe],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit, OnDestroy {
  private clubService: ClubService = inject(ClubService);
  private membersSub!: Subscription;
  public members: Member[] = [];
  public columnsToDisplay = ['name', 'dob', 'age', 'role'];

  ngOnInit(): void {
    this.membersSub = this.clubService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }

  ngOnDestroy(): void {
    this.membersSub.unsubscribe();
  }
}
