import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {

  /* Inputs */
  totalRecords = input<number>(0);
  rows = input<number>(10);
  page = input<number>(0);
  rowsOptions = input<number[]>([5, 10, 20, 50]);

  /* Output */
  pageChange = output<{ page: number; rows: number }>();

  /* Derived */
  first = computed(() => this.page() * this.rows());

  firstRecord = computed(() =>
    this.totalRecords() === 0 ? 0 : this.first() + 1
  );

  lastRecord = computed(() =>
    Math.min(this.first() + this.rows(), this.totalRecords())
  );

  hasPrev = computed(() => this.page() > 0);

  hasNext = computed(() =>
    this.first() + this.rows() < this.totalRecords()
  );

  /* Actions */
  prev() {
    if (!this.hasPrev()) return;

    this.pageChange.emit({
      page: this.page() - 1,
      rows: this.rows()
    });
  }

  next() {
    if (!this.hasNext()) return;

    this.pageChange.emit({
      page: this.page() + 1,
      rows: this.rows()
    });
  }

  onRowsChange(value: number) {
    this.pageChange.emit({
      page: 0,
      rows: value
    });
  }
}