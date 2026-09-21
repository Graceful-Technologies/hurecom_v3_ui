import { TeamResponse } from '@/app/core/models/admin/team-response';
import { JobAssignmentResponse } from '@/app/core/models/recruitment/job-assignment-response';
import { JobResponse } from '@/app/core/models/recruitment/job-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-assign-team',
  imports: [MatTableModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './assign-team.html',
  styleUrl: './assign-team.scss',
})
export class AssignTeam {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef);
  public global = inject(GlobalService);

  job = signal<JobResponse | null>(null);
  availableTeams = signal<TeamResponse[]>([]);
  selectedTeams: TeamResponse[] = [];

  ngOnInit() {
    this.job.set(this.config?.job);
    this.availableTeams.set(this.config?.availableTeams || []);
  }

  toggleTeam(team: TeamResponse) {
    const exists = this.selectedTeams.some(item => item.id === team.id);
    if (exists) {
      this.selectedTeams = this.selectedTeams.filter(item => item.id !== team.id);
      return;
    }
    this.selectedTeams = [...this.selectedTeams, team];
  }

  isSelected(team: TeamResponse): boolean {
    return this.selectedTeams.some(item => item.id === team.id);
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
