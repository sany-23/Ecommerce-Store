// // src/app/components/login/login.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { CartService } from '../../services/cart.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private cartService: CartService,
//     private snackBar: MatSnackBar,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   login(): void {
//     if (this.loginForm.invalid) {
//       this.snackBar.open('Please fill in all required fields', 'Close', {
//         duration: 3000,
//       });
//       return;
//     }

//     const { username, password } = this.loginForm.value;
//     this.authService.login(username, password).subscribe(
//       (response) => {
//         console.log('Login successful', response);
//         this.snackBar.open('Login successful', 'Close', {
//           duration: 3000,
//         });

//         // Load the user's cart after successful login
//         const userId = this.authService.getUserId();
//         this.cartService.getCartByUserId(userId).subscribe(
//           (cart) => {
//             console.log('Cart loaded', cart);
//             // Redirect based on user role
//             if (response.role === 'ROLE_ADMIN') {
//               this.router.navigate(['/admin-dashboard']);
//             } else if (response.role === 'ROLE_CUSTOMER') {
//               this.router.navigate(['/user-dashboard']);
//             } else {
//               this.router.navigate(['/']);
//             }
//           },
//           (error) => {
//             console.error('Failed to load cart', error);
//           }
//         );
//       },
//       (error) => {
//         console.error('Login failed', error);
//         this.snackBar.open('Login failed', 'Close', {
//           duration: 3000,
//         });
//       }
//     );
//   }
// }

// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createParticles();
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
      });
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
        });

        // Load the user's cart after successful login
        const userId = this.authService.getUserId();
        this.cartService.getCartByUserId(userId).subscribe(
          (cart) => {
            console.log('Cart loaded', cart);
            // Redirect based on user role
            if (response.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin-dashboard']);
            } else if (response.role === 'ROLE_CUSTOMER') {
              this.router.navigate(['/user-dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          },
          (error) => {
            console.error('Failed to load cart', error);
          }
        );
      },
      (error) => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  handleSocialLogin(provider: string): void {
    alert(`${provider} login would be implemented here`);
  }

  handleForgotPassword(): void {
    alert('Password reset would be implemented here');
  }

  handleSignUp(): void {
    alert('Sign up would be implemented here');
  }

  createParticles(): void {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      if (container) {
        container.appendChild(particle);

      }
    }
  }
}
