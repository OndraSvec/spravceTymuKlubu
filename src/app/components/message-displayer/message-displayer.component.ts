import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-displayer',
  standalone: true,
  imports: [],
  templateUrl: './message-displayer.component.html',
  styleUrl: './message-displayer.component.css',
})
export class MessageDisplayerComponent {
  @Input('message')
  message!: string;
}
