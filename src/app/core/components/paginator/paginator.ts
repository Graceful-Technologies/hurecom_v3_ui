import { Component, computed, input, output } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [SelectModule, FormsModule],
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