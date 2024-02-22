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
import { nanoid } from 'nanoid';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Team } from '../../teams/team.type';

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
    MatSelect,
    MatOption,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  public lineUpRoles = ['Hráč', 'Trenér'];
  private clubService: ClubService = inject(ClubService);
  private dialogRef: MatDialogRef<DialogComponent> = inject(MatDialogRef);
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { member: Member; editMode: boolean; teams: Team[] }
  ) {}

  get isInLineUp() {
    return this.form.get('isInLineUp');
  }

  get lineUpRole() {
    return this.form.get('lineUpRole');
  }

  ngOnInit(): void {
    const { member, editMode, teams } = this.data;

    this.form = new FormGroup({
      firstName: new FormControl(editMode ? member.firstName : '', [
        Validators.required,
      ]),
      lastName: new FormControl(editMode ? member.lastName : '', [
        Validators.required,
      ]),
      dob: new FormControl(editMode ? datePickerFormatter(member.dob) : '', [
        Validators.required,
      ]),
      selectedTeam: new FormControl(
        editMode ? teams.find((team) => team.id === member.teamId)?.id : ''
      ),
      isInLineUp: new FormControl(editMode ? member.isInLineUp : false),
      lineUpRole: new FormControl(editMode ? member.lineUpRole : ''),
      lineUpPosition: new FormControl(editMode ? member.lineUpPosition : ''),
    });
  }

  onSubmit() {
    const { editMode } = this.data;
    const newId = nanoid();

    this.dialogRef.close({
      editMode,
      data: {
        id: editMode ? this.data.member.id : newId,
        ...this.form.value,
      },
    });
    return this.data.editMode
      ? this.clubService.editMember(this.data.member.id, this.form.value)
      : this.clubService.addMember(newId, this.form.value);
  }
}
