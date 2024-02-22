import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Member } from '../members/member.type';
import { Team } from '../teams/team.type';
import { datePickerFormatter } from '../../utils/helpers';

type MemberFormData = {
  firstName: string;
  lastName: string;
  dob: Date;
  selectedTeam: string;
};

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private httpClient: HttpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/';

  constructor() {}

  getMembers() {
    return this.httpClient.get<Member[]>(
      this.baseUrl + 'members?_sort=lastName, firstName'
    );
  }

  getTeams() {
    return this.httpClient.get<Team[]>(this.baseUrl + 'teams?_sort=name');
  }

  deleteMember(id: string) {
    return this.httpClient.delete(this.baseUrl + 'members/' + id).subscribe();
  }

  editMember(id: string, formData: MemberFormData) {
    return this.httpClient
      .patch(
        this.baseUrl + 'members/' + id,
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: datePickerFormatter(formData.dob),
          teamId: formData.selectedTeam,
        })
      )
      .subscribe();
  }

  addMember(id: string, formData: MemberFormData) {
    return this.httpClient
      .post(
        this.baseUrl + 'members/',
        JSON.stringify({
          id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: datePickerFormatter(formData.dob),
          teamId: formData.selectedTeam,
          lineUpId: '',
          lineUpPosition: '',
          lineUpRole: [],
        })
      )
      .subscribe();
  }
}
