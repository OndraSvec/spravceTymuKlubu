import { Component, Inject, inject } from '@angular/core';
import { ClubService } from '../../services/club.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Team } from '../../teams/team.type';
import { nanoid } from 'nanoid';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [
    MatButton,
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
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.css',
})
export class SimpleDialogComponent {
  private clubService: ClubService = inject(ClubService);
  private dialogRef: MatDialogRef<SimpleDialogComponent> = inject(MatDialogRef);
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { editMode: boolean; team: Team }
  ) {}

  ngOnInit(): void {
    const { editMode, team } = this.data;

    this.form = new FormGroup({
      name: new FormControl(editMode ? team.name : '', [Validators.required]),
    });
  }

  onSubmit() {
    const { editMode } = this.data;
    const newId = nanoid();

    this.dialogRef.close({
      editMode,
      data: {
        id: editMode ? this.data.team.id : newId,
        ...this.form.value,
      },
    });
    return this.data.editMode
      ? this.clubService.editTeam(this.data.team.id, this.form.value.name)
      : this.clubService.addTeam(newId, this.form.value.name);
  }
}
