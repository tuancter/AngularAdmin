import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface UserRow {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <mat-form-field appearance="outline" style="width: 300px; margin-bottom: 12px;">
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Search users" />
    </mat-form-field>

    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z1">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
        <td mat-cell *matCellDef="let row">{{ row.email }}</td>
      </ng-container>
      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
        <td mat-cell *matCellDef="let row">{{ row.role }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 25]" [pageSize]="5"></mat-paginator>
  `
})
export class UsersComponent {
  displayedColumns = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource<UserRow>([
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'Manager' },
    { name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
    { name: 'Dana Lee', email: 'dana@example.com', role: 'User' },
    { name: 'Ethan Brown', email: 'ethan@example.com', role: 'User' },
    { name: 'Fiona Clark', email: 'fiona@example.com', role: 'Manager' },
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
