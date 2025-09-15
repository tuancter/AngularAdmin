import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()" style="max-width: 520px; display: grid; gap: 16px;">
      <mat-form-field appearance="outline">
        <mat-label>Company Name</mat-label>
        <input matInput formControlName="company" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Support Email</mat-label>
        <input matInput formControlName="email" type="email" required />
      </mat-form-field>

      <mat-slide-toggle formControlName="notifications">Enable notifications</mat-slide-toggle>

      <button mat-flat-button color="primary">Save Settings</button>
    </form>
  `
})
export class SettingsComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    company: ['Acme Inc.'],
    email: ['support@example.com'],
    notifications: [true]
  });

  save(): void {
    console.log('Settings saved', this.form.value);
  }
}
