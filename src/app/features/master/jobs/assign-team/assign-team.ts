import { TeamResponse } from '@/app/core/models/admin/team-response';
import { JobAssignmentResponse } from '@/app/core/models/recruitment/job-assignment-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-assign-team',
  imports: [TableModule, ButtonModule],
  templateUrl: './assign-team.html',
  styleUrl: './assign-team.scss',
})
export class AssignTeam {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  public global = inject(GlobalService);

  job = signal<JobResponse | null>(null);
  availableTeams = signal<TeamResponse[]>([]);
  selectedTeams: TeamResponse[] = [];

  ngOnInit() {
    this.job.set(this.config.data.job);
    this.availableTeams.set(this.config.data.availableTeams);
  }

  assign() {
    this.loader.show();
    const route = "/api/recruitment/job-assignments";
    const payload = {
      jobId: this.job()!.id,
      teamIds: this.selectedTeams.map(member => member.id)
    };

    this.api.post<JobAssignmentResponse>(route, payload)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.ref.close(true);
        }
      });
  }

  closeDialog() {
    this.ref.close();
  }
}
