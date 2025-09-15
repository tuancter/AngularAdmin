import { Component, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface OrderRow {
  id: number;
  customer: string;
  total: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencyPipe
  ],
  template: `
    <mat-form-field appearance="outline" style="width: 300px; margin-bottom: 12px;">
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Search orders" />
    </mat-form-field>

    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z1">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>#</th>
        <td mat-cell *matCellDef="let row">{{ row.id }}</td>
      </ng-container>
      <ng-container matColumnDef="customer">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Customer</th>
        <td mat-cell *matCellDef="let row">{{ row.customer }}</td>
      </ng-container>
      <ng-container matColumnDef="total">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Total</th>
        <td mat-cell *matCellDef="let row">{{ row.total | currency }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 25]" [pageSize]="5"></mat-paginator>
  `
})
export class OrdersComponent {
  displayedColumns = ['id', 'customer', 'total'];
  dataSource = new MatTableDataSource<OrderRow>([
    { id: 2001, customer: 'Alice Johnson', total: 199.99 },
    { id: 2002, customer: 'Bob Smith', total: 79.49 },
    { id: 2003, customer: 'Chris Evans', total: 49.00 },
    { id: 2004, customer: 'Dana Lee', total: 289.00 },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
