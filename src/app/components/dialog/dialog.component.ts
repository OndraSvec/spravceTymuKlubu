import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Member } from '../../members/member.type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { datePickerFormatter } from '../../../utils/helpers';
import { ClubService } from '../../services/club.service';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatHint,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  private clubService: ClubService = inject(ClubService);
  private dialogRef: MatDialogRef<DialogComponent> = inject(MatDialogRef);
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
    this.dialogRef.close({
      data: {
        id: this.data.member.id,
        dob: this.form.value.dob,
        ...this.form.value,
      },
    });
    this.clubService.editMember(this.data.member.id, this.form.value);
  }
}
