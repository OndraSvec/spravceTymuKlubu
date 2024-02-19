import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private httpClient: HttpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/';

  constructor() {}

  getMembers() {
    return this.httpClient.get(this.baseUrl + 'members');
  }
}
