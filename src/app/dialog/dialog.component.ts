import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Member } from '../members/member.type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { datePickerFormatter } from '../../utils/helpers';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { member: Member }) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.data.member.firstName || '', [
        Validators.required,
      ]),
      lastName: new FormControl(this.data.member.lastName || '', [
        Validators.required,
      ]),
      dob: new FormControl(datePickerFormatter(this.data.member.dob) || '', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
