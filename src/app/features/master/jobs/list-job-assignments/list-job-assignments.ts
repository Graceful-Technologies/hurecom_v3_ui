import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AssignTeam } from '../assign-team/assign-team';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { JobAssignmentResponse } from '@/app/core/models/recruitment/job-assignment-response';
import { TeamResponse } from '@/app/core/models/admin/team-response';
import { finalize } from 'rxjs';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-job-assignments',
  imports: [
    MatTableModule,
    MatButtonModule,
    DatePipe
],
  templateUrl: './list-job-assignments.html',
  styleUrl: './list-job-assignments.scss',
})
export class ListJobAssignments {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  public global = inject(GlobalService);
  private dialog = inject(MatDialog);

  job = input<JobResponse | null>(null);
  assignments = signal<JobAssignmentResponse[]>([]);
  availableTeams = signal<TeamResponse[]>([]);

  ngAfterViewInit() {
    this.getAssignments();
    this.getUnassignedTeams();
  }

  getAssignments() {
    const route = "/api/recruitment/job-assignments";
    const param = { jobId: this.job()?.id };
    this.api.get<JobAssignmentResponse[]>(route, param).subscribe({
      next: response => {
        this.assignments.set(response);
      },
      error: error => {
        this.assignments.set([]);
      }
    });
  }

  getUnassignedTeams() {
    const route = "/api/admin/teams/unassigned";
    const param = { jobId: this.job()?.id };
    this.api.get<TeamResponse[]>(route, param).subscribe({
      next: response => {
        this.availableTeams.set(response);
      },
      error: error => {
        this.availableTeams.set([]);
      }
    });
  }

  openAssignTeamDialog() {
    const ref = this.dialog.open(AssignTeam, {
      width: '420px',
      disableClose: true,
      data: { job: this.job(), availableTeams: this.availableTeams() },
    });

    ref.afterClosed().subscribe((response) => {
      if (response) {
        this.getAssignments();
      }
    });
  }

  removeAssignment(assignment: JobAssignmentResponse) {
    this.loader.show();
    const route = `/api/recruitment/job-assignments/${assignment.id}`;
    this.api.delete<ApiResponse<void>>(route)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.getAssignments();
          this.getUnassignedTeams();
        }
      });
  }

}
