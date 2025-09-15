import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  template: `
    <div class="app-shell" [ngClass]="{ 'dark-theme': isDarkMode() }">
      <mat-sidenav-container style="height: 100vh;">
        <mat-sidenav mode="side" opened>
          <div class="logo">
            <mat-icon>admin_panel_settings</mat-icon>
            <span>Admin Portal</span>
          </div>
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/users" routerLinkActive="active">
              <mat-icon matListItemIcon>group</mat-icon>
              <span matListItemTitle>Users</span>
            </a>
            <a mat-list-item routerLink="/products" routerLinkActive="active">
              <mat-icon matListItemIcon>inventory_2</mat-icon>
              <span matListItemTitle>Products</span>
            </a>
            <a mat-list-item routerLink="/orders" routerLinkActive="active">
              <mat-icon matListItemIcon>shopping_cart</mat-icon>
              <span matListItemTitle>Orders</span>
            </a>
            <a mat-list-item routerLink="/settings" routerLinkActive="active">
              <mat-icon matListItemIcon>settings</mat-icon>
              <span matListItemTitle>Settings</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar color="primary">
            <span>Administration</span>
            <span class="spacer"></span>
            <button mat-icon-button (click)="toggleDarkMode()" aria-label="Toggle dark mode">
              <mat-icon>{{ isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
            </button>
          </mat-toolbar>
          <div class="content-container">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      font-weight: 600;
    }
    a.active {
      background: rgba(0,0,0,0.06);
    }
  `]
})
export class AppComponent {
  private dark = signal(false);
  isDarkMode = this.dark.asReadonly();
  toggleDarkMode(): void { this.dark.update((v: boolean) => !v); }
}
