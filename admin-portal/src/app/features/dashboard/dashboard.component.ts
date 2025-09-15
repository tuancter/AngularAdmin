import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgFor, CurrencyPipe } from '@angular/common';

interface MetricCard {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, NgFor, CurrencyPipe],
  template: `
    <div class="metrics-grid">
      <mat-card *ngFor="let m of metrics">
        <mat-card-header>
          <mat-icon>{{ m.icon }}</mat-icon>
          <mat-card-title>{{ m.value }}</mat-card-title>
          <mat-card-subtitle>{{ m.label }}</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
    </div>

    <mat-card>
      <mat-card-title>Recent Orders</mat-card-title>
      <table mat-table [dataSource]="orders" class="mat-elevation-z1">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>#</th>
          <td mat-cell *matCellDef="let o">{{ o.id }}</td>
        </ng-container>
        <ng-container matColumnDef="customer">
          <th mat-header-cell *matHeaderCellDef>Customer</th>
          <td mat-cell *matCellDef="let o">{{ o.customer }}</td>
        </ng-container>
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let o">{{ o.total | currency }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  `,
  styles: [`
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }
    mat-card mat-card-header {
      align-items: center;
      gap: 8px;
    }
    table { width: 100%; }
  `]
})
export class DashboardComponent {
  metrics: MetricCard[] = [
    { icon: 'group', label: 'Users', value: '1,248' },
    { icon: 'inventory_2', label: 'Products', value: '542' },
    { icon: 'shopping_cart', label: 'Orders', value: '9,876' },
    { icon: 'attach_money', label: 'Revenue', value: '$123K' },
  ];

  displayedColumns = ['id', 'customer', 'total'];
  orders = [
    { id: 1001, customer: 'Alice Johnson', total: 199.99 },
    { id: 1002, customer: 'Bob Smith', total: 79.49 },
    { id: 1003, customer: 'Chris Evans', total: 49.00 },
  ];
}
