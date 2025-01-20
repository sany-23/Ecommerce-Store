// src/app/components/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
      });
      return;
    }

    const { username, email, password } = this.registerForm.value;
    this.authService.register({ username, email, password }).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.snackBar.open('Registration successful', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        console.error('Registration failed', error);
        this.snackBar.open('Registration failed', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
