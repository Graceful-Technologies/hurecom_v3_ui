import { Component, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditJob } from '../add-edit-job/add-edit-job';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GlobalService } from '@/app/core/services/global-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-job-details',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './view-job-details.html',
  styleUrl: './view-job-details.scss',
})
export class ViewJobDetails {
  private dialog = inject(MatDialog);
  public global = inject(GlobalService);
  job = input<JobResponse | null>(null);
  jobUpdated = output<void>();
  jobDescription: string | undefined;

  ngAfterViewInit() {
    this.jobDescription = this.job()?.jobDescription;
  }

  openEditJobDialog() {
    const ref = this.dialog.open(AddEditJob, {
      width: '85vw',
      maxWidth: '85vw',
      disableClose: true,
      data: { job: this.job() },
    });

    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.jobUpdated.emit();
      }
    });
  }
}
