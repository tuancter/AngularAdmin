import { Component, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface ProductRow {
  sku: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-products',
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
      <input matInput (keyup)="applyFilter($event)" placeholder="Search products" />
    </mat-form-field>

    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z1">
      <ng-container matColumnDef="sku">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>SKU</th>
        <td mat-cell *matCellDef="let row">{{ row.sku }}</td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th>
        <td mat-cell *matCellDef="let row">{{ row.price | currency }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 25]" [pageSize]="5"></mat-paginator>
  `
})
export class ProductsComponent {
  displayedColumns = ['sku', 'name', 'price'];
  dataSource = new MatTableDataSource<ProductRow>([
    { sku: 'SKU-1001', name: 'Wireless Mouse', price: 29.99 },
    { sku: 'SKU-1002', name: 'Mechanical Keyboard', price: 89.00 },
    { sku: 'SKU-1003', name: 'USB-C Hub', price: 49.50 },
    { sku: 'SKU-1004', name: '4K Monitor', price: 299.99 },
    { sku: 'SKU-1005', name: 'Webcam', price: 59.00 },
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
