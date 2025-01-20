// src/app/components/admin-users/admin-users.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: any[]) => {
        this.dataSource.data = users.filter(
          (user: any) => user.role === 'ROLE_CUSTOMER'
        );
      },
      (error) => {
        console.error('Failed to load users', error);
      }
    );
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { isEdit: true, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Failed to delete user', error);
        this.snackBar.open('Failed to delete user', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
