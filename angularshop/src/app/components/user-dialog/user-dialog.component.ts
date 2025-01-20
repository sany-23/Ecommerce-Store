// src/app/components/user-dialog/user-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (data.isEdit) {
      this.userForm.patchValue(data.user);
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      if (this.data.isEdit) {
        const updatedUser = {
          ...this.data.user,
          ...this.userForm.value,
        };
        this.userService.updateUser(this.data.user.id, updatedUser).subscribe(
          () => this.dialogRef.close(true),
          (error) => console.error('Failed to update user', error)
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
