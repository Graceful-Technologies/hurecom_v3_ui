import { Paginator } from '@/app/core/components/paginator/paginator';
import { PageResponse } from '@/app/core/models/common/page-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideBriefcase, LucideIdCard, LucideUsers, LucideMonitor, LucideMap, LucideMapPin, LucideBuilding2, LucideUser } from '@lucide/angular';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogService } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddEditJob } from '../add-edit-job/add-edit-job';

@Component({
  selector: 'app-list-jobs',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    ChipModule,
    RouterLink,
    Paginator,
    LucideUsers,
    LucideBriefcase,
    LucideIdCard,
    LucideMonitor,
    LucideMapPin,
    LucideBuilding2,
    LucideUser
  ],
  templateUrl: './list-jobs.html',
  styleUrl: './list-jobs.scss',
})
export class ListJobs {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private dialog = inject(DialogService);

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
      header: "Create Job",
      data: null,
      modal: true,
      closable: true,
      width: '85vw',
      breakpoints: {
        '1200px': '85vw',
        '768px': '95vw'
      }
    });

    ref?.onClose.subscribe((response: any) => {
      if (response) {
        this.searchJobs();
      }
    });
  }

}
