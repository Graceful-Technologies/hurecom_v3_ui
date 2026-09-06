import { TeamResponse } from '@/app/core/models/admin/team-response';
import { UserResponse } from '@/app/core/models/admin/user-response';
import { ApiResponse } from '@/app/core/models/common/api-response';
import { ApiService } from '@/app/core/services/api-service';
import { GlobalService } from '@/app/core/services/global-service';
import { LoaderService } from '@/app/core/services/loader-service';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-team-members',
  imports: [TableModule, ButtonModule],
  templateUrl: './add-team-members.html',
  styleUrl: './add-team-members.scss',
})
export class AddTeamMembers {
  private api = inject(ApiService);
  private loader = inject(LoaderService);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  public global = inject(GlobalService);

  team = signal<TeamResponse | null>(null);
  availableUsers = signal<UserResponse[]>([]);
  selectedMembers: UserResponse[] = [];

  ngOnInit() {
    this.team.set(this.config.data.team);
    this.availableUsers.set(this.config.data.availableUsers);
  }

  addTeamMembers() {
    this.loader.show();
    const route = "/api/admin/team-members";
    const payload = {
      teamId: this.team()!.id,
      userIds: this.selectedMembers.map(member => member.id)
    };

    this.api.post<ApiResponse<void>>(route, payload)
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
