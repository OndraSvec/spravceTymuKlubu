import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatPrefix,
} from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormField, MatIcon, MatInput, MatLabel, MatPrefix],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Output()
  searchValueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value;
    this.searchValueChange.emit(searchVal);
  }
}
