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
  isInLineUp: boolean;
  lineUpRole?: string[];
  lineUpPosition?: string;
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
          isInLineUp: formData.isInLineUp,
          lineUpRole: formData.lineUpRole ? formData.lineUpRole : [],
          lineUpPosition: formData.lineUpPosition
            ? formData.lineUpPosition
            : '',
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
          isInLineUp: formData.isInLineUp,
          lineUpRole: formData.lineUpRole ? formData.lineUpRole : [],
          lineUpPosition: formData.lineUpPosition
            ? formData.lineUpPosition
            : '',
        })
      )
      .subscribe();
  }

  getTeams() {
    return this.httpClient.get<Team[]>(this.baseUrl + 'teams?_sort=name');
  }

  deleteTeam(teamId: string) {
    return this.httpClient.delete(this.baseUrl + 'teams/' + teamId).subscribe();
  }

  editTeam(id: string, name: string) {
    return this.httpClient
      .patch(
        this.baseUrl + 'teams/' + id,
        JSON.stringify({
          name,
        })
      )
      .subscribe();
  }

  addTeam(id: string, name: string) {
    return this.httpClient
      .post(
        this.baseUrl + 'teams/',
        JSON.stringify({
          id,
          name: name,
        })
      )
      .subscribe();
  }
}
