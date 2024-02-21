import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-dbentry-button',
  standalone: true,
  imports: [MatFabButton, MatIcon],
  templateUrl: './add-dbentry-button.component.html',
  styleUrl: './add-dbentry-button.component.css',
})
export class AddDBEntryButtonComponent {}
