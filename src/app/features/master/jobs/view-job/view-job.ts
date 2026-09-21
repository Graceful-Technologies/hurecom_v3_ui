import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ListJobAssignments } from '../list-job-assignments/list-job-assignments';
import { ListJobAttachments } from '../list-job-attachments/list-job-attachments';
import { ListJobCommissions } from '../list-job-commissions/list-job-commissions';
import { ViewJobDetails } from '../view-job-details/view-job-details';

@Component({
  selector: 'app-view-job',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ViewJobDetails,
    ListJobAttachments,
    ListJobAssignments,
    ListJobCommissions,
  ],
  templateUrl: './view-job.html',
  styleUrl: './view-job.scss',
})
export class ViewJob {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);

  job = signal<JobResponse | null>(null);
  jobId = signal<number | null>(null);

  ngOnInit() {
    this.jobId.set(Number(this.route.snapshot.paramMap.get('id')));
    this.getJob();
  }

  getJob() {
    this.loader.show();
    const route = `/api/recruitment/jobs/${this.jobId()}`;
    this.api.get<JobResponse>(route).subscribe({
      next: response => {
        this.job.set(response);
        this.loader.hide();
      },
      error: error => {
        this.loader.hide();
      }
    });
  }
}
