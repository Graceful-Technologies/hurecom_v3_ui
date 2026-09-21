import { Paginator } from '@/app/core/components/paginator/paginator';
import { PageResponse } from '@/app/core/models/common/page-response';
import { JobOpeningResponse } from '@/app/core/models/recruitment/job-opening-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-job-openings',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    Paginator,
  ],
  templateUrl: './list-job-openings.html',
  styleUrl: './list-job-openings.scss',
})
export class ListJobOpenings {
  private api = inject(ApiService);
  public global = inject(GlobalService);

  jobOpenings = signal<any[]>([]);
  currentPage = signal(0);
  totalRecords = signal(0);
  rowsPerPage = signal(10);
  displayedColumns = ['job', 'hiring', 'pipeline', 'employment', 'client', 'action'];

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
        this.jobOpenings.set(response.content);
        this.totalRecords.set(response.totalElements);
      },
      error: error => {
        this.jobOpenings.set([]);
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

  getRemainingSkillCount(skills: string[]): number {
    return Math.max(skills.length - 3, 0);
  }

  getInitials(title: string): string {

    if (!title) {
      return 'JO';
    }

    const words = title
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    ).toUpperCase();
  }


  createJob(): void {
    // Navigate to create job screen
    console.log('Create Job');
  }

  applyForJob(job: JobOpeningResponse): void {
    console.log('Apply for:', job);
  }

  viewJob(job: JobOpeningResponse): void {
    console.log('View job:', job);
  }
}
