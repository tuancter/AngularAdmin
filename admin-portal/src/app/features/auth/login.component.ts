import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">
        <mat-card-title>Sign in</mat-card-title>
        <form [formGroup]="form" (ngSubmit)="login()" class="login-form">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" required />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" required />
          </mat-form-field>
          <button mat-flat-button color="primary" [disabled]="form.invalid">Login</button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrapper { display: grid; place-items: center; height: calc(100vh - 64px); }
    .login-card { width: 360px; }
    .login-form { display: grid; gap: 12px; margin-top: 12px; }
  `]
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  login(): void {
    console.log('Login', this.form.value);
  }
}
