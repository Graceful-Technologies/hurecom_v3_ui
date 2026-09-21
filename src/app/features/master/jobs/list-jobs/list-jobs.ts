import { Paginator } from '@/app/core/components/paginator/paginator';
import { PageResponse } from '@/app/core/models/common/page-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AddEditJob } from '../add-edit-job/add-edit-job';

@Component({
  selector: 'app-list-jobs',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Paginator,
  ],
  templateUrl: './list-jobs.html',
  styleUrl: './list-jobs.scss',
})
export class ListJobs {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  jobs = signal<JobResponse[]>([]);
  currentPage = signal(0);
  totalRecords = signal(0);
  rowsPerPage = signal(10);

  ngOnInit(): void {
    this.searchJobs();
  }

  searchJobs() {
    const route = "/api/recruitment/jobs/search";
    const payload = {
      page: this.currentPage() + 1,
      limit: this.rowsPerPage(),
    };
    this.api.search<PageResponse<JobResponse>>(route, payload).subscribe({
      next: response => {
        this.jobs.set(response.content);
        this.totalRecords.set(response.totalElements);
      },
      error: error => {
        this.jobs.set([]);
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.rowsPerPage.set(event.rows);
    this.searchJobs();
  }

  getVisibleSkills(skills: string[]): string[] {
    return skills.slice(0, 3);
  }

  getRemainingSkillsCount(skills: string[]): number {
    return Math.max(skills.length - 3, 0);
  }

  openAddJobDialog(): void {
    const ref = this.dialog.open(AddEditJob, {
      width: '85vw',
      maxWidth: '85vw',
      disableClose: true,
      data: null,
    });

    ref.afterClosed().subscribe((response: any) => {
      if (response) {
        this.searchJobs();
      }
    });
  }

}
