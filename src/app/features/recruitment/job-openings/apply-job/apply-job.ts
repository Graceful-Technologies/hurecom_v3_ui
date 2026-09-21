import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apply-job',
  imports: [],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.scss',
})
export class ApplyJob {
  private api = inject(ApiService);
  public global = inject(GlobalService);
  private route = inject(ActivatedRoute);

  job = signal<JobResponse | null>(null);

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.getJobById(parseInt(jobId));
    }
  }

  getJobById(id: number) {
    const route = `/api/recruitment/jobs/${id}`;

    this.api.get<JobResponse>(route).subscribe({
      next: response => {
        this.job.set(response);
      },
      error: error => {
        this.job.set(null);
      }
    });
  }


}
